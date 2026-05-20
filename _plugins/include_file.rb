# Inline an arbitrary repo-relative file as raw text.
# Usage: {% include_file assets/svg/<slug>/main.svg %}
# Path is resolved relative to the Jekyll site source root.
module Jekyll
  class IncludeFileTag < Liquid::Tag
    def initialize(tag_name, raw, tokens)
      super
      @raw = raw.strip
    end

    def render(context)
      site = context.registers[:site]
      # Allow {% include_file {{ var }} %} by re-rendering the raw text once.
      path = Liquid::Template.parse(@raw).render(context).strip
      # Strip leading slash so the path is relative to the source root.
      path = path.sub(%r{\A/}, '')
      full = File.expand_path(File.join(site.source, path))
      # Prevent path traversal out of the source root.
      raise "include_file: refusing to read outside source: #{path}" unless full.start_with?(File.expand_path(site.source))
      raise "include_file: file not found: #{path}" unless File.exist?(full)
      File.read(full)
    end
  end
end
Liquid::Template.register_tag('include_file', Jekyll::IncludeFileTag)
