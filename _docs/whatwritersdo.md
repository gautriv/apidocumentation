---
title: What an API writer does in 2026
permalink: /whatwritersdo.html
module: 1
lesson: 3
slug: whatwritersdo
reading_time: 14
description: An API writer in 2026 writes for two readers, humans and agents. What that means for the same doc page, and an AI prompt that reads a draft twice.
previous_page:
  url: /whatisanapi.html
  title: What an API actually is
next_page:
  url: /informationgathering.html
  title: Information gathering and interviewing the codebase
---

{% comment %}block:1{% endcomment %}
## The day Priya pulled me into the conference room

Two days after Sam left, Priya pulls me into the Greenfield conference room and turns her monitor toward me. Two graphs are stacked on the screen. The top one is labeled "humans". The bottom one is labeled "agents". The agent line is rising.

"Three weeks ago I would have called this a bot problem. Now it is a customer. I am of two minds about it," Priya says. (Priya is the product manager. She owns the analytics seat. She is the one who notices traffic patterns first.)

I have written API documentation for ten years. For eight of them I was writing for one kind of reader. Today, looking at Priya's graphs, I realize the job changed when the second line started climbing.

This lesson is what changed. And what stayed the same.

{% comment %}block:2{% endcomment %}
## Today you will leave with

- Why an API writer in 2026 writes for two readers, not one.
- What each reader takes from the same page.
- An AI prompt that reads a draft twice and reports what each one missed.

{% include ad-slot.html slot="2222222222" format="auto" %}

{% comment %}block:3{% endcomment %}
## The rule that changed the job

A human reader is a developer. They scan your page for the one sentence that says what the endpoint does, a working code sample they can drop into their terminal, and an English description of what each error means. They read the prose because that is what they understand. The whole reading takes maybe ninety seconds.

An agent reader is software. Not the software that calls the API itself (that is the caller, from Lesson 1). An agent reader is software trying to figure out how to call the API. Code generators reading your docs to scaffold a client library. AI coding assistants reading over a developer's shoulder, suggesting the next line. Tool calling loops inside language models that have to consume a schema before they can act. The agent does not read prose. It reads structure.

The rise of the second reader is recent. Tool use in language models became practical in 2024. The Model Context Protocol shipped that same year. By the time Priya pulled me into the conference room, agent traffic on the Greenfield public site was rising every week. It was not a fringe number. It was the second line on her graph.

Both readers visit the same doc page. They take different things home. The human takes a working call. The agent takes a contract.

{% capture mermaid_src %}
sequenceDiagram
  participant Doc as One doc page
  participant Human as Human reader
  participant Agent as Agent reader
  Doc->>Human: prose, quickstart, sample to copy
  Doc->>Agent: schema, types, error codes
{% endcapture %}
{% include mermaid.html content=mermaid_src alt="One doc page delivers prose, a quickstart, and a sample to a human reader. The same page delivers schema, types, and error codes to an agent reader." %}

Look at the diagram. What are the two extractions? And which one would your last doc page have served well?

{% comment %}block:4{% endcomment %}
## One doc page, two reads

Let me show you what I mean. Here is a tiny version of a Greenfield API reference page. Greenfield does not have this endpoint yet. It will, soon. Treat the page as if it were live.

```markdown
### GET /books
Search the Greenfield catalog.

curl https://api.greenfield.lib/v1/books?q=ursula

**Query parameters**
- q (string, required). Search term.

**Response 200**
{
  "results": [
    { "id": "bk_184932", "title": "...", "available_branches": ["branch_north"] }
  ],
  "total": 1
}

**Errors**
- 401 Unauthorized. Missing or invalid token.
- 429 Rate limited. Slow down.
```

A human reads this page from the top. The heading tells them what they are looking at. The English line under it tells them this endpoint searches the catalog. The curl line is what they will copy and adapt. The errors section is what they will check when something goes wrong. They are scanning. They want to make one working call before their next meeting.

An agent reads the same page differently. The heading is metadata, used to look up the right endpoint. The English line is intent, used to confirm the agent matched the user's question to the right page. The parameter list is type information: `q` is a string, `q` is required. The response sample is a contract: the agent now knows what fields to expect, what types they are, and what shape it can pass to the next call. The error codes are decision points. `401` means stop and ask the caller for a token. `429` means back off and retry.

Both readers find what they need on the same page. They just lock onto different parts of it.

Personally, I treat the schema as the source of truth. I write the structure first: parameter list, response shape, error codes. I write the prose around it. Both readers respect the schema. Only one reads the prose. Skip the structure and you ship a page that only humans can use. Skip the prose and the humans bounce.

The schema is also inspectable. An agent can read the response sample, parse it as JSON, and infer the shape on its own. A human can read the same sample and see what to expect. The same artifact teaches both, with no extra effort from you. That is the trick. The structure is not a tax. It is the part that does the most teaching.

If you have ever wondered why the best API docs feel "easy to read" without feeling thin, that is why. The structure carries the weight. The prose makes the structure approachable. Take either one out and the page tips over.

The new job is not to write less. It is to write twice as much, layered correctly. Structure as the bones, prose as the skin. Both readers walk away with what they came for.

{% include interactive-svg.html slug="whatwritersdo" alt="A mocked Greenfield GET /books reference page with two annotation layers. The HUMAN layer highlights the curl line, the English error descriptions, and the one sentence summary. The AGENT layer highlights the parameter types, the response schema, and the integer error codes. A toggle switches between the two views." %}

Tap the toggle in the diagram. The HUMAN highlights show what a developer's eye lands on. The AGENT highlights show what an agent's parser locks onto. Same page. Two reads.

{% comment %}block:5{% endcomment %}
## Try it on Greenfield

{% capture exercise %}
<p><strong>Five minutes, in your browser.</strong></p>
<p>Pick any API documentation page you have on a bookmark. Stripe is great. So is GitHub, Twilio, Linear, or any docs site you respect. Open one page for one endpoint.</p>
<p>Read it twice.</p>
<p><strong>First pass, as a developer.</strong> You are trying to make one working call before your next meeting. Where is the working code sample? Where is the description of each error? How long does it take to find each one?</p>
<p><strong>Second pass, as an agent.</strong> You are an automated reader that has to parse the response into a schema before deciding what to do next. Where is the JSON schema? Where are the parameter types declared? How long does it take to find each one?</p>
<p>Note which pass was harder. That is where the page is failing one of its readers.</p>
{% endcapture %}
{% include callout.html variant="exercise" body=exercise %}

{% comment %}block:6{% endcomment %}
## The trap nobody warns you about

{% capture trap %}
<p>The trap is hearing "writing for agents" and thinking it means abandoning prose.</p>
<p>It does not. Both readers need both. Agents read prose to understand intent. Humans read structure to understand boundaries. The page that ships only the structure reads as a database dump. The page that ships only the prose reads as a marketing brochure. Both fail the same way. They leave half the audience behind.</p>
<p>Devon's version, which I have heard him say more than once: "If a human cannot read your schema and an agent cannot read your prose, you have two failures, not one improvement."</p>
<p>This matters for documentation. The new job is not to write less. It is to write twice as much, layered correctly. Structure as the bones, prose as the skin. Both readers walk away with what they came for.</p>
{% endcapture %}
{% include callout.html variant="warning" body=trap %}

{% comment %}block:7{% endcomment %}
## Words you can drop in standups now

- {% include glossary-term.html term="reader" %}: Use this when you mean either of the two parties consuming your doc page. "Who is the reader here?" forces a question you should be asking already.
- {% include glossary-term.html term="agent" %}: Use this when you mean software calling an API on someone's behalf. "The agent could not parse the response" is more useful than "the integration broke".
- {% include glossary-term.html term="contract" %}: Use this when you mean the rules two pieces of software agreed to about a call. "We are about to change the contract" gets a different reaction than "we are about to change the API".
- {% include glossary-term.html term="response shape" %}: Use this when you mean the structure of what the server sends back, separate from the status code. "The shape changed" tells the right people the right thing.
- {% include glossary-term.html term="endpoint" %}: Use this when you mean one URL plus one method (like `GET /books`). "Which endpoint is timing out?" beats "which call is slow".

{% comment %}block:8{% endcomment %}
## Today's prompt for your AI assistant

Claude, this lesson.

**The situation.** You have a draft of one doc page. Maybe it is your first reference page for a new endpoint. Maybe it is a page you have been told to modernize for agents. You want to know if the page serves both readers or only one. You do not want a vague pat on the back. You want specific lines.

**The prompt, exactly as written:**

```text
Below is a draft of an API documentation page. Read it twice.

First read: pretend you are a developer who has 60 seconds to make one working API call. Tell me what you find and what is missing. Quote specific lines that helped or confused you.

Second read: pretend you are an automated reader that has to parse the response into a schema before deciding what to do next. Tell me what you find and what is missing. Quote specific lines.

Be specific. Do not summarize. If something is missing, name what is missing.

PAGE:
[paste your draft here]
```

**What to expect back.** Two passes, each one quoting specific lines. The developer pass usually flags missing code samples or missing English error descriptions. The agent pass usually flags missing types, missing response schemas, or status codes mentioned only in prose.

**What to watch for.** Claude will sometimes paper over gaps politely with "this page is well structured overall". Push back: "name three specific lines that confused either reader." The polite version is not useful. The specific one is.

{% include ad-slot.html slot="3333333333" format="auto" %}

{% comment %}block:9{% endcomment %}
## Before you go

Where does the parameter types information for `GET /books` come from? Who actually knows what fields are in the 200 response?

Answer it in your head before you read the next lesson.

{% comment %}block:10{% endcomment %}
## Next week at Greenfield

Next week, I sit down with the codebase. The codebase does all the talking. The codebase has opinions.

{% include signoff.html %}
