---
title: Question Box Template Example
description: Learn how to use the question box template in your API documentation
keywords: template, question box, API documentation, technical writing
permalink: templates/question_box.html
folder: templates
---

# Question Box Template

The Question Box template provides a standardized way to present questions throughout your documentation. This helps readers consider important aspects of the topic being discussed and encourages critical thinking.

## Basic Usage

To include a basic question box with default styling:

```liquid
{% raw %}
{% include question_box.html 
  title="Questions to consider:" 
  questions=site.data.questions.protocol 
%}
{% endraw %}
```

This will produce:

{% include question_box.html 
  title="Questions to consider:" 
  questions=site.data.questions.protocol 
%}

## Customizing Your Question Box

You can customize the appearance of your question box using the following parameters:

### Custom Icon

```liquid
{% raw %}
{% include question_box.html 
  title="Security considerations:" 
  icon="fas fa-shield-alt"
  questions=site.data.questions.url_security 
%}
{% endraw %}
```

This will produce:

{% include question_box.html 
  title="Security considerations:" 
  icon="fas fa-shield-alt"
  questions=site.data.questions.url_security 
%}

### Custom Color

```liquid
{% raw %}
{% include question_box.html 
  title="Design considerations:" 
  icon="fas fa-pencil-ruler"
  color="#2a7d8c"
  questions=site.data.questions.url_design 
%}
{% endraw %}
```

This will produce:

{% include question_box.html 
  title="Design considerations:" 
  icon="fas fa-pencil-ruler"
  color="#2a7d8c"
  questions=site.data.questions.url_design 
%}

## Available Question Sets

The following question sets are available in `site.data.questions`:

- `protocol`: Questions about URL protocols
- `domain`: Questions about domain names
- `path`: Questions about URL paths
- `query_parameters`: Questions about query parameters
- `fragment`: Questions about fragment identifiers
- `endpoints`: Questions about API endpoints
- `resources`: Questions about API resources
- `url_encoding`: Questions about URL encoding
- `url_design`: Questions about URL design
- `url_security`: Questions about URL security

## Adding Custom Questions

You can also provide questions directly in your include:

```liquid
{% raw %}
{% include question_box.html 
  title="Documentation checklist:"
  icon="fas fa-clipboard-check"
  color="#6a994e"
  questions=my_custom_questions
%}
{% endraw %}
```

Where `my_custom_questions` is defined in your front matter or a data file:

```yaml
my_custom_questions:
  - "Is the documentation clear and concise?"
  - "Are all technical terms properly defined?"
  - "Does the documentation include examples?"
  - "Is the documentation up-to-date?"
```

## Benefits of Using the Question Box Template

1. **Consistency**: Ensures all question sections have the same look and feel
2. **Maintainability**: Makes it easy to update questions across multiple pages
3. **Visual appeal**: Draws attention to important considerations
4. **Flexibility**: Allows customization while maintaining design standards
5. **Organization**: Groups related questions together in a structured format

## Best Practices

- Keep questions concise and focused
- Group related questions together
- Use appropriate icons that relate to the question topics
- Choose colors that complement your documentation design
- Include 5-10 questions per box for optimal readability