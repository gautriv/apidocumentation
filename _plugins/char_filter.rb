module Jekyll
  module CharFilter
    # Filter to convert an ASCII code to a character
    # Usage: {{ 65 | chr }} => 'A'
    def chr(input)
      input.to_i.chr
    rescue
      input.to_s
    end
  end
end

Liquid::Template.register_filter(Jekyll::CharFilter) 