---
title: "Audiences: humans, devs, and agents"
permalink: /audiences-humans-and-agents.html
module: 1
lesson: 5
slug: audiences-humans-and-agents
reading_time: 15
description: "Your API doc page has three audiences: devs, agents, and humans. A borrower walks in with a chatbot mistranslating her call numbers."
previous_page:
  url: /informationgathering.html
  title: Information gathering and interviewing the codebase
next_page:
  url: /restAPI.html
  title: REST principles
---

{% comment %}block:1{% endcomment %}
<!-- TODO: Block 1 diary opener. Drafted in Task 9. -->

{% comment %}block:2{% endcomment %}
<!-- TODO: Block 2 promise. Drafted in Task 10. -->

{% include ad-slot.html slot="2222222222" format="auto" %}

{% comment %}block:3{% endcomment %}
## The three readers

I walk back to Devon's desk. By 9:30 Priya pings me in Slack: "user agent breakdown for /v1/books, you should see this." The breakdown is a short list of strings. Near the top: `Marginalia Atlas/0.4`.

Marginalia is a small Goodreads competitor. Atlas is their reading assistant. Borrowers ask Atlas what to read next, and Atlas calls our API to check availability. Atlas read our doc page, hit the endpoint, read `call_number: "813.5"`, and told Mira "It's at 813.5."

Then the lesson. The doc page has at least three readers, and they are not the same kind of reader.

The **dev** is the engineer at Marginalia integrating Greenfield's API into Atlas. They read the page to copy a snippet, ship code, and move on.

The **agent** is Atlas itself, the {% include glossary-term.html term="agent" %} reading the page literally and quoting fields back at runtime.

The **human** is Mira, who never reads the page at all. She hears what Atlas said.

An audience is a class of {% include glossary-term.html term="reader" %}, not a single person. Each of those three is an audience of your doc page. The same field can matter to one audience and not to another.

The user agent string is what told Priya which audience was hitting the endpoint. A user agent is the string a caller sends to identify itself. Browsers send strings like Mozilla/5.0. Atlas sends `Marginalia Atlas/0.4`.

Atlas reads what your schema makes available, what your example response shows, and sometimes your prose. Different agents read different surfaces. The doc page has to do its work in each.

Three is the count I keep coming back to. Slice it differently if your stack demands. The number matters less than knowing which one you wrote for and which one showed up.

On Tuesday I wrote for the dev. By Monday two other readers had shown up.

{% capture mermaid_src %}
sequenceDiagram
  participant Mira
  participant Atlas
  participant Doc as Doc Page
  participant API
  Mira->>Atlas: where is Quiet Library
  Atlas->>Doc: read schema
  Doc-->>Atlas: field meanings
  Atlas->>API: GET /v1/books?q=quiet
  API-->>Atlas: 200 with results
  Atlas->>Mira: it is at 813.5
{% endcapture %}
{% include mermaid.html content=mermaid_src alt="Mira asks Atlas where The Quiet Library is. Atlas reads the doc page schema for field meanings, then calls the API with a query for quiet. The API returns a 200 response with results. Atlas tells Mira the book is at 813.5. The doc page sits between Atlas and the API; Mira hears only what Atlas said." %}

Look at the diagram. Find the doc page. It is the one I get paid to write. Now look at where Mira is. The page reaches her only through what Atlas said.

{% comment %}block:4{% endcomment %}
<!-- TODO: Block 4 how we fix the page. Drafted in Task 6. -->

{% comment %}block:5{% endcomment %}
<!-- TODO: Block 5 exercise. Drafted in Task 7. -->

{% comment %}block:6{% endcomment %}
<!-- TODO: Block 6 the trap. Drafted in Task 8. -->

{% comment %}block:7{% endcomment %}
<!-- TODO: Block 7 standup chips. Drafted in Task 11. -->

{% comment %}block:8{% endcomment %}
<!-- TODO: Block 8 Gemini AI co pilot tip. Drafted in Task 12. -->

{% include ad-slot.html slot="3333333333" format="auto" %}

{% comment %}block:9{% endcomment %}
<!-- TODO: Block 9 self check. Drafted in Task 13. -->

{% comment %}block:10{% endcomment %}
<!-- TODO: Block 10 teaser + signoff. Drafted in Task 13. -->
