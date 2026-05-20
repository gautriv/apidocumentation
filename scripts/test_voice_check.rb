require 'minitest/autorun'
require 'tempfile'
require_relative 'voice-check'

class VoiceCheckTest < Minitest::Test
  def lint(content)
    f = Tempfile.new(['lesson', '.md'])
    f.write(content)
    f.close
    VoiceCheck.lint_file(f.path)
  ensure
    f.unlink if f
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
