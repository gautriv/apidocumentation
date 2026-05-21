---
title: Information gathering and interviewing the codebase
permalink: /informationgathering.html
module: 1
lesson: 4
slug: informationgathering
reading_time: 16
description: An API writer in 2026 reads the codebase before the engineer. Four sources, the order to read them, and a Cursor prompt for one endpoint.
previous_page:
  url: /whatwritersdo.html
  title: What an API writer does in 2026
next_page:
  url: /audiences-humans-and-agents.html
  title: "Audiences: humans, devs, and agents"
---

{% comment %}block:1{% endcomment %}
<!-- TODO: Block 1 diary opener. Drafted in Task 9. -->

{% comment %}block:2{% endcomment %}
<!-- TODO: Block 2 promise. Drafted in Task 10. -->

{% include ad-slot.html slot="2222222222" format="auto" %}

{% comment %}block:3{% endcomment %}
## The four sources

For my first eight years writing API docs, I did this the wrong way. I would book the engineer for an hour, sit down with a notebook, and ask them to tell me about the endpoint. The engineer gave me broad strokes. I asked the wrong follow up questions because I did not yet know the territory. I left with surface answers and had to come back for the specifics, by which time the engineer had shipped two more things and forgotten the first one.

Then I learned to read the codebase first.

An endpoint reference has four information sources. The route handler (the function the server runs when a call to this endpoint comes in) tells you what the endpoint does. The {% include glossary-term.html term="schema" %} tells you what it sends back. The tests tell you what the team has promised it will not do. The {% include glossary-term.html term="SME" %}, the engineer who built the endpoint, tells you the why, the history, and the intent. Three of the four live in the codebase. One is a person.

Some fields on the doc page have more than one source. When two sources agree on a field, that field is a contract worth documenting carefully. When they disagree, you have a question for the SME. This is what makes the four sources a system rather than a list.

I count four. You may find a fifth in your codebase. The order matters more than the count. Read the three before you book the fourth. Reading code first does not skip the SME interview. It makes the SME interview the sharpest twenty minutes of your week.

{% capture mermaid_src %}
sequenceDiagram
  participant Maya
  participant Code as Codebase
  participant Devon
  Maya->>Code: read route handler
  Code-->>Maya: types, fields, defaults
  Maya->>Code: read schema
  Code-->>Maya: response shape
  Maya->>Code: read tests
  Code-->>Maya: what we have promised
  Maya->>Devon: three sharp questions
  Devon-->>Maya: history, intent, future
{% endcapture %}
{% include mermaid.html content=mermaid_src alt="Maya consults the codebase three times for the route handler, the schema, and the tests before bringing the remaining questions to Devon. The order matters: code first, person last." %}

Look at the diagram. Which source tells you the response shape? Which one tells you why the field is called `available_branches` and not just `branches`? The second question is the one only Devon can answer; the diagram makes the asymmetry visible.

{% comment %}block:4{% endcomment %}
<!-- TODO: Block 4 how we read each one. Drafted in Task 6. -->

{% comment %}block:5{% endcomment %}
<!-- TODO: Block 5 exercise. Drafted in Task 7. -->

{% comment %}block:6{% endcomment %}
<!-- TODO: Block 6 the trap. Drafted in Task 8. -->

{% comment %}block:7{% endcomment %}
<!-- TODO: Block 7 standup terms. Drafted in Task 11. -->

{% comment %}block:8{% endcomment %}
<!-- TODO: Block 8 Cursor co-pilot tip. Drafted in Task 12. -->

{% include ad-slot.html slot="3333333333" format="auto" %}

{% comment %}block:9{% endcomment %}
<!-- TODO: Block 9 self-check. Drafted in Task 13. -->

{% comment %}block:10{% endcomment %}
<!-- TODO: Block 10 teaser + signoff. Drafted in Task 13. -->
