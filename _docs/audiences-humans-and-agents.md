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
## Mira wants the book

It is Monday morning of story week 3. The `GET /v1/books` endpoint Devon shipped on Tuesday has been live almost a week. I am at the branch for my usual Monday morning with Devon; I have claimed a small corner table near the front window.

Mira walks up to the front desk. "The system says you have *The Quiet Library*. Your chatbot said it's at 813.5. There is no 813.5." The librarian walks her to fiction. Mira leaves with the book.

I pull up the doc page on my phone. The example response shows `call_number: "813.5"`. There is no description on the field. There is no sentence on the page about what a call number is.

Last week I asked you which reader the doc page is for: the developer or the chatbot. Today I learned there are three. Her name is Mira.

{% comment %}block:2{% endcomment %}
## Today you will leave with

- The three readers of every API doc page.
- A three edit pattern (schema description, realistic example, one prose sentence) for any ambiguous field.
- A Gemini prompt that reads your page the way an agent will.

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
## How we fix the page

Writing for three readers does not mean writing three pages. It means adding three small things to one page. I write the description text and the prose paragraph. Devon adds them to the schema and pushes.

**The schema description.** The `call_number` field in our {% include glossary-term.html term="schema" %} has no {% include glossary-term.html term="description" %} on it. A description is the sentence on a {% include glossary-term.html term="OpenAPI" %} field that explains what the field is. In 2026 it is also the sentence agents read at runtime. I write one. Devon adds it to `openapi.yaml`:

```yaml
call_number:
  type: string
  description: |
    Dewey decimal subject classification for the title.
    Not a shelf location. Branches shelve fiction alphabetically by author.
  example: "813.5"
```

The field now carries a sentence the agent can quote. "Not a shelf location" is the clause that does the work. An agent reading the schema sees the disambiguation. An agent that does not read the schema sees nothing different yet. That is what the next two edits are for.

**The realistic example.** The legacy doc page shows the response keys with no values. I add an {% include glossary-term.html term="example response" %} with real Greenfield data. A book that exists. A branch that exists. A call number that resolves cleanly:

```json
{
  "results": [
    {
      "id": "bk_184932",
      "title": "The Quiet Library",
      "available_branches": ["branch_north"],
      "call_number": "813.5"
    }
  ],
  "total": 1
}
```

A dev who copies this snippet sees the shape AND the kind of value `call_number` carries. "813.5" reads as a Dewey number to anyone who has been near a library. The example does what no field description can. It shows the value as a number, in context.

**The prose disambiguation.** Below the example response, one paragraph on the doc page itself:

> The `call_number` field returns the Dewey decimal subject classification for the title. It is useful for filtering or grouping titles by subject. It is not a shelf location. Branches shelve fiction alphabetically by author. If you are writing an interface that tells a borrower where to find a book, do not read this field back to them as a location.

The last sentence is the agent aware sentence. It is written for the dev shipping a chatbot AND for the chatbot reading the prose at runtime. Two readers, one paragraph.

Three edits. One page. The next Mira gets an answer that means what it says.

The toggle below shows the two reading acts on the same response. Mira does not read the page; she appears in Atlas's pane as what Atlas told her.

{% include interactive-svg.html slug="audiences-humans-and-agents" alt="Same response JSON, two reader lenses. Toggle between Dev and Atlas. Dev sees all four fields and identifies call_number 813.5 as a Dewey number, then ships. Atlas sees only call_number 813.5 and quotes it literally to Mira; Mira walks to a shelf that does not exist." %}

{% comment %}block:5{% endcomment %}
## Try it on Greenfield

{% capture exercise %}
**Five minutes, in any reference page you have shipped or use regularly.** GitHub's `GET /repos/{owner}/{repo}` is a useful shape: many fields, some ambiguous. `parent`, `source`, `default_branch` all reward a literal reading badly.

Pick one field in the response. Read its value out loud the way an agent would: just the field name and the value, no surrounding sentence. So if the response includes `default_branch: "main"`, you say "default branch main" to your friend.

(Borrow a friend who reads everything too literally. You probably have a candidate in mind.)

Is what your friend just heard a sentence a human would understand? If you can hear them ask "main what?", your doc page has a description to write, an example to enrich, or a sentence to put in the prose.
{% endcapture %}
{% include callout.html variant="exercise" body=exercise %}

{% comment %}block:6{% endcomment %}
## The trap

{% capture trap %}
The trap is writing for the agent at the expense of the dev. Stuff every field with four sentences of warnings to the agent, and the dev's eyes glaze over. They copy the wrong example anyway.

My rule: the description does only the work the field name cannot. If the name is unambiguous, the description is short or absent. If the name is ambiguous, like `call_number`, the description does the disambiguation.

You can also rename the field. `dewey_classification` would have prevented this whole week. I do not rename here because the field is already in production and renames are expensive. In your codebase, before the API ships, rename first; describe second.

The earlier the fix, the cheaper. Rename before shipping: minutes. Description after shipping: an hour. Prose paragraph: a week of agreeing on what to write. And the thing you do not get back is Mira's morning.
{% endcapture %}
{% include callout.html variant="warning" body=trap %}

{% comment %}block:7{% endcomment %}
## Words you can drop in standups now

- {% include glossary-term.html term="audience" %}: Use this when you mean a class of reader, not a single person. "The doc page has three audiences" settles a debate that "we should think about who reads this" does not.
- {% include glossary-term.html term="description" %}: Use this when you mean the sentence on an OpenAPI schema field that explains it. "Add a description to that field" is what you say when an agent quoted a value back wrong.
- {% include glossary-term.html term="example response" %}: Use this when you mean a realistic JSON sample on the doc page, not a placeholder. "The example response is stale" is different from "the field changed."
- {% include glossary-term.html term="user agent" %}: Use this when you mean the string a caller sends to identify itself. "Check the user agents on the access log" is how you find out whether your readers are humans or software.

{% comment %}block:8{% endcomment %}
<!-- TODO: Block 8 Gemini AI co pilot tip. Drafted in Task 12. -->

{% include ad-slot.html slot="3333333333" format="auto" %}

{% comment %}block:9{% endcomment %}
<!-- TODO: Block 9 self check. Drafted in Task 13. -->

{% comment %}block:10{% endcomment %}
<!-- TODO: Block 10 teaser + signoff. Drafted in Task 13. -->
