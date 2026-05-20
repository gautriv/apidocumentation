require 'minitest/autorun'
require 'tempfile'
require_relative 'voice-check'

class VoiceCheckTest < Minitest::Test
  # Write into _docs/ so the linter's find_glossary_path walker can locate
  # the real _data/glossary.yml. Use a name guaranteed to be ignored by site
  # builds (prefixed with _).
  REPO_ROOT = File.expand_path('..', __dir__)
  DOCS_DIR = File.join(REPO_ROOT, '_docs')

  def lint(content)
    path = File.join(DOCS_DIR, "_voicecheck_test_#{$$}_#{rand(1_000_000)}.md")
    File.write(path, content)
    VoiceCheck.lint_file(path)
  ensure
    File.unlink(path) if path && File.exist?(path)
  end

  def test_passes_clean_minimal_lesson
    content = <<~MD
      ---
      title: Test
      permalink: /test.html
      module: 1
      lesson: 1
      slug: test
      reading_time: 10
      description: A clean test lesson.
      ---
      {% comment %}block:1{% endcomment %}
      Diary opener.

      {% comment %}block:2{% endcomment %}
      Today.

      {% comment %}block:3{% endcomment %}
      What.

      {% comment %}block:4{% endcomment %}
      How.

      {% comment %}block:5{% endcomment %}
      Try.

      {% comment %}block:6{% endcomment %}
      Trap.

      {% comment %}block:7{% endcomment %}
      Words.

      {% comment %}block:8{% endcomment %}
      AI.

      {% comment %}block:9{% endcomment %}
      Before.

      {% comment %}block:10{% endcomment %}
      Next.

      {% include signoff.html %}
    MD
    violations = lint(content)
    assert_empty violations, "expected no violations, got: #{violations.inspect}"
  end

  def test_flags_em_dash
    content = base_lesson.sub('Diary opener.', 'Diary opener — with em dash.')
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'em-dash' }, violations.inspect
  end

  def test_flags_hyphen_in_prose
    content = base_lesson.sub('Diary opener.', 'A schema-driven approach.')
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'hyphen' }, violations.inspect
  end

  def test_allows_hyphen_inside_backticks
    content = base_lesson.sub('Diary opener.', 'See the `X-API-Key` header.')
    violations = lint(content)
    refute violations.any? { |v| v[:rule] == 'hyphen' }, violations.inspect
  end

  def test_allows_hyphen_inside_markdown_link_url
    content = base_lesson.sub('Diary opener.', 'Read [the docs](/some-page-with-hyphens.html).')
    violations = lint(content)
    refute violations.any? { |v| v[:rule] == 'hyphen' }, violations.inspect
  end

  def test_allows_hyphen_inside_liquid_include_param
    content = base_lesson.sub('Diary opener.', '{% include glossary-term.html term="slug-with-dashes" %}')
    violations = lint(content)
    refute violations.any? { |v| v[:rule] == 'hyphen' }, violations.inspect
  end

  def test_flags_ai_tell_phrase
    content = base_lesson.sub('Diary opener.', "Let's dive in.")
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'ai-tell' && v[:matched] =~ /dive in/i }, violations.inspect
  end

  def test_flags_emoji
    content = base_lesson.sub('Diary opener.', 'Diary opener with rocket.') + "\n\nText with emoji here: ✨"
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'emoji' }, violations.inspect
  end

  def test_flags_missing_signoff
    content = base_lesson.sub('{% include signoff.html %}', '')
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'missing-signoff' }, violations.inspect
  end

  def test_flags_missing_block_marker
    content = base_lesson.sub('{% comment %}block:5{% endcomment %}', '')
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'missing-block' && v[:matched] == '5' }, violations.inspect
  end

  def test_flags_missing_frontmatter_field
    content = base_lesson.sub('reading_time: 10', '')
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'missing-frontmatter' && v[:matched] == 'reading_time' }, violations.inspect
  end

  def test_flags_undefined_glossary_term
    # The lesson links a term ("nonexistent-term") that does not exist in _data/glossary.yml.
    content = base_lesson.sub('Diary opener.', 'Words like {% include glossary-term.html term="nonexistent-term" %} should fail.')
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'undefined-glossary-term' && v[:matched] == 'nonexistent-term' }, violations.inspect
  end

  def test_allows_defined_glossary_term
    # JWT exists in _data/glossary.yml; the include should pass the new check.
    content = base_lesson.sub('Diary opener.', 'Tokens like {% include glossary-term.html term="JWT" %} are fine.')
    violations = lint(content)
    refute violations.any? { |v| v[:rule] == 'undefined-glossary-term' }, violations.inspect
  end

  def base_lesson
    <<~MD
      ---
      title: Test
      permalink: /test.html
      module: 1
      lesson: 1
      slug: test
      reading_time: 10
      description: A clean test lesson.
      ---
      {% comment %}block:1{% endcomment %}
      Diary opener.

      {% comment %}block:2{% endcomment %}
      Today.

      {% comment %}block:3{% endcomment %}
      What.

      {% comment %}block:4{% endcomment %}
      How.

      {% comment %}block:5{% endcomment %}
      Try.

      {% comment %}block:6{% endcomment %}
      Trap.

      {% comment %}block:7{% endcomment %}
      Words.

      {% comment %}block:8{% endcomment %}
      AI.

      {% comment %}block:9{% endcomment %}
      Before.

      {% comment %}block:10{% endcomment %}
      Next.

      {% include signoff.html %}
    MD
  end
end
