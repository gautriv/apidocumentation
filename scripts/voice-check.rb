# Voice-check linter for Phase 2 lessons.
# Spec: docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md (Section 6).

require 'yaml'

module VoiceCheck
  AI_TELL_PHRASES = [
    "let's dive in", "buckle up", "picture this", "imagine this scenario",
    "imagine a world where", "in today's fast paced world", "without further ado",
    "look no further", "here is the thing", "it is worth noting that", "needless to say",
    "it goes without saying", "it is important to understand", "first and foremost",
    "when it comes to", "in essence", "at the end of the day", "on the flip side",
    "in conclusion", "in summary", "to wrap up", "i hope this helps",
    "there you have it", "feel free to", "whether you are a beginner or seasoned pro",
    "crucial", "vital", "essential", "pivotal", "paramount", "robust", "seamless",
    "comprehensive", "holistic", "leverage", "utilize", "delve into", "delve",
    "unlock", "empower", "elevate", "supercharge", "transform", "game changing",
    "cutting edge", "next generation", "state of the art", "the realm of",
    "the landscape of", "the tapestry of", "the world of"
  ].freeze

  REQUIRED_FRONTMATTER = %w[title permalink module lesson slug reading_time description].freeze
  REQUIRED_BLOCKS = (1..10).map(&:to_s).freeze

  # Unicode emoji ranges (BMP plus supplementary planes commonly used).
  EMOJI_REGEX = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B00}-\u{2BFF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}]/

  module_function

  def lint_file(path)
    text = File.read(path)
    violations = []

    fm_match = text.match(/\A---\s*\n(.*?)\n---\s*\n(.*)\z/m)
    if fm_match
      raw_fm, body = fm_match[1], fm_match[2]
      violations.concat(check_frontmatter(raw_fm))
    else
      violations << { rule: 'missing-frontmatter', matched: 'YAML-block', line: 1 }
      body = text
    end

    masked_body = mask_skipped_regions(body)

    violations.concat(check_punctuation(masked_body))
    violations.concat(check_emoji(masked_body))
    violations.concat(check_ai_tells(masked_body))
    violations.concat(check_signoff(body))
    violations.concat(check_block_markers(body))
    violations.concat(check_glossary_terms(body, path))

    violations.each { |v| v[:file] = path }
    violations
  end

  # Walks up from the lesson file to find the repo root (the directory
  # containing _data/glossary.yml). Returns nil if not found.
  def find_glossary_path(start_path)
    dir = File.expand_path(File.dirname(start_path))
    5.times do
      candidate = File.join(dir, '_data', 'glossary.yml')
      return candidate if File.exist?(candidate)
      dir = File.dirname(dir)
    end
    nil
  end

  @glossary_cache = {}

  def known_glossary_terms(glossary_path)
    return [] unless glossary_path && File.exist?(glossary_path)
    @glossary_cache ||= {}
    @glossary_cache[glossary_path] ||= begin
      data = YAML.safe_load(File.read(glossary_path), permitted_classes: [Date, Time]) || []
      data.map { |e| e['term'].to_s }
    end
  end

  def check_glossary_terms(body, path)
    glossary_path = find_glossary_path(path)
    return [] unless glossary_path
    known = known_glossary_terms(glossary_path)
    violations = []
    body.each_line.with_index(1) do |line, lineno|
      line.scan(/\{%\s*include\s+glossary-term\.html\s+term=["']([^"']+)["']\s*%\}/) do |match|
        term = match[0]
        unless known.include?(term)
          violations << { rule: 'undefined-glossary-term', matched: term, line: lineno }
        end
      end
    end
    violations
  end

  def check_frontmatter(raw)
    violations = []
    parsed = YAML.safe_load(raw, permitted_classes: [Date, Time]) || {}
    REQUIRED_FRONTMATTER.each do |field|
      next if parsed.key?(field) && !parsed[field].to_s.strip.empty?
      violations << { rule: 'missing-frontmatter', matched: field, line: 1 }
    end
    violations
  rescue Psych::SyntaxError => e
    [{ rule: 'frontmatter-invalid', matched: e.message, line: 1 }]
  end

  # Replace skipped regions with same-length spaces so line numbers stay accurate.
  def mask_skipped_regions(text)
    out = text.dup
    # Triple-backtick fences.
    out = mask_pattern(out, /```.*?```/m)
    # Inline backticks.
    out = mask_pattern(out, /`[^`\n]+`/)
    # HTML comments.
    out = mask_pattern(out, /<!--.*?-->/m)
    # <pre> blocks.
    out = mask_pattern(out, /<pre.*?<\/pre>/m)
    # Liquid tags (entire {% ... %}). Skips include parameter values.
    out = mask_pattern(out, /\{%.*?%\}/m)
    # Markdown link URLs only: [text](url) — keep the text, mask the (url) parens.
    out = mask_pattern(out, /\[[^\]]*\]\(([^)]+)\)/) { |m| "[#{m[/\[([^\]]*)\]/, 1]}](#{' ' * m[/\(([^)]+)\)/, 1].length})" }
    out
  end

  def mask_pattern(text, regex)
    if block_given?
      text.gsub(regex) { |m| yield(m) }
    else
      text.gsub(regex) { |m| ' ' * m.length }
    end
  end

  def check_punctuation(text)
    violations = []
    text.each_line.with_index(1) do |line, lineno|
      line.scan(/[A-Za-z]-[A-Za-z]/) do |match|
        violations << { rule: 'hyphen', matched: match, line: lineno }
      end
      line.each_char.with_index do |ch, col|
        case ch
        when "—"
          violations << { rule: 'em-dash', matched: ch, line: lineno, col: col + 1 }
        when "–"
          violations << { rule: 'en-dash', matched: ch, line: lineno, col: col + 1 }
        end
      end
    end
    violations
  end

  def check_emoji(text)
    violations = []
    text.each_line.with_index(1) do |line, lineno|
      line.scan(EMOJI_REGEX) do |match|
        violations << { rule: 'emoji', matched: match, line: lineno }
      end
    end
    violations
  end

  def check_ai_tells(text)
    violations = []
    lc = text.downcase
    AI_TELL_PHRASES.each do |phrase|
      offset = 0
      while (idx = lc.index(phrase, offset))
        line = lc[0, idx].count("\n") + 1
        violations << { rule: 'ai-tell', matched: phrase, line: line }
        offset = idx + phrase.length
      end
    end
    violations
  end

  def check_signoff(body)
    return [] if body.lines.last(5).any? { |l| l.include?('{% include signoff.html %}') }
    [{ rule: 'missing-signoff', matched: 'last 5 lines lack signoff include', line: body.lines.count }]
  end

  def check_block_markers(body)
    found = body.scan(/\{%\s*comment\s*%\}\s*block:(\d+)\s*\{%\s*endcomment\s*%\}/).flatten
    missing = REQUIRED_BLOCKS - found
    missing.map { |n| { rule: 'missing-block', matched: n, line: 0 } }
  end
end

if __FILE__ == $PROGRAM_NAME
  if ARGV.empty?
    warn "Usage: ruby scripts/voice-check.rb <lesson.md> [more lessons...]"
    exit 2
  end
  all_violations = ARGV.flat_map { |path| VoiceCheck.lint_file(path) }
  all_violations.each do |v|
    loc = v[:line].to_i > 0 ? ":#{v[:line]}" : ''
    puts "#{v[:file]}#{loc} [#{v[:rule]}] #{v[:matched]}"
  end
  exit(all_violations.empty? ? 0 : 1)
end
