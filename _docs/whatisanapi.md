---
title: What an API actually is
permalink: /whatisanapi.html
module: 1
lesson: 2
slug: whatisanapi
reading_time: 14
description: A first look at what an API is, written through a small library shipping its first endpoint. Concept, contract, and the one page reference doc that makes it usable.
previous_page:
  url: /howinternetworks.html
  title: The internet, the short version
next_page:
  url: /whatwritersdo.html
  title: What an API writer does in 2026
---
{% comment %}block:1{% endcomment %}
Tuesday evening at the branch. I was at the desk updating index cards for the new arrivals. Sam, an old friend of Devon's, came in returning a book and stayed to chat. He watched me for a minute. "You know you could just expose this as an API, right?"

I laughed. Then I stopped laughing, because Sam was looking at the cards the way an engineer looks at things that have been done by hand for too long.

This week, the index cards are still there. By next Tuesday, they will not be. This lesson is for you on the day someone asks the same question about your project.

{% comment %}block:2{% endcomment %}
**Today you will leave with:**

- A clear, one paragraph definition of what an API is, in plain English.
- The shape of a one page endpoint reference you can apply to any API.
- A prompt that turns an engineer's verbal description into a first draft reference doc.

{% include ad-slot.html slot="2222222222" format="auto" %}

{% comment %}block:3{% endcomment %}
An API is a contract between two pieces of software. When you build a system like the Greenfield Library, you have data. Borrowers want to see that data. Instead of letting borrower apps rummage around in the database directly, you expose an API. The API defines exactly who can ask for what, and exactly what arrives back in return.

The rules of engagement matter. A caller sends a request to the server asking for data or asking to change data. The server processes it and sends back a response. That response always includes a status code, which is a three digit number like 200 or 404 that tells the caller if the {% include glossary-term.html term="request" %} succeeded or failed. 

This strict {% include glossary-term.html term="contract" %} is what makes modern software possible. When you know the rules, you can automate anything. A human reading a web page can adapt if a button moves, but a script making a {% include glossary-term.html term="request" %} will crash if the data shape changes without warning. That is why developers obsess over the details of their endpoints. They are promising that the {% include glossary-term.html term="response" %} will look exactly like they documented it.

If a borrower app wants to find a book, it talks to the Greenfield API base URL `https://api.greenfield.lib/v1` and accesses the `/books` resource. 

{% capture mermaid_src %}
sequenceDiagram
  participant Borrower as Borrower app
  participant Greenfield
  Borrower->>Greenfield: GET /books?q=thriller
  Greenfield-->>Borrower: 200 OK and a list of books
{% endcapture %}
{% include mermaid.html content=mermaid_src alt="A borrower app sends a GET request to Greenfield and receives a 200 response with a list of books." %}

Take a look at the diagram. Which arrow is the {% include glossary-term.html term="response" %}? The second arrow, where Greenfield replies with a 200 {% include glossary-term.html term="status code" %}, is what the caller has been waiting for.

{% comment %}block:4{% endcomment %}
When developers build a {% include glossary-term.html term="contract" %}, someone has to write down the rules. That is where we come in. The core of API documentation is the one page endpoint reference. 

A reference page must contain seven specific pieces of information to be useful. Missing even one of these details will break a caller's integration. First, you need the HTTP method and the path. For Greenfield, the method is GET and the path is `/books`. Second, you need the authentication rules. Can anyone search for books, or do they need a token? Third, you need the parameters. How does the caller filter the list to only show thrillers? Fourth, you need a sample request that they can copy and paste into their terminal to test it out. Fifth, you need a sample response showing exactly what the data looks like. Finally, you need to list the error responses so the caller knows what happens when things go wrong.

Personally, I would always put the sample response above the error table. Callers want to see the happy path first. If they want to know what a 400 error looks like, they will scroll down.

Let us look at what the Greenfield `/books` endpoint looks like in practice. Here is a sample request showing how a caller filters the list:

```http
GET /books?q=thriller HTTP/1.1
Host: api.greenfield.lib
Authorization: Bearer $GF_TOKEN
```

And here is the sample response they receive:

```json
{
  "results": [
    { "id": "bk_184932", "title": "The quiet thriller", "available_branches": ["branch_north"] }
  ],
  "total": 1
}
```

The difference between a vague description and a strict reference is massive. A vague guide says "the endpoint returns books." A proper reference tells a script exactly what keys to parse. 

{% include interactive-svg.html slug="whatisanapi" alt="Two versions of the same endpoint description side by side. The vague version says 'returns books'. The documented version shows the method, path, parameters, sample request, and sample response. Click or press Enter to toggle between them." %}

You can see the difference immediately. Writing an API reference means you are documenting the literal machine interface. It has to be perfect. 

{% comment %}block:5{% endcomment %}
{% capture exercise %}
**Five minutes, at your desk.** Take the request and response from the previous section. Open a doc tool of your choice. Write a one paragraph reference for `GET /books`. Cover: what it returns, what `q` does, what a `200` response looks like, what a `401` response means.

When you finish, ask yourself: could a caller make this request and read the response without asking you a question?
{% endcapture %}
{% include callout.html variant="exercise" body=exercise %}

{% comment %}block:6{% endcomment %}
{% capture trap %}
The trap is the description that reads well in a blog post and falls apart the second someone tries to call the endpoint. "Returns books from the catalog" is a sentence a marketing site can publish. It is not documentation.

Devon's version, which he says approximately once a week: "If a caller reads it and still has to come find me, you wrote prose, not documentation." Fine. He is right.

The fix is concrete: every reference page answers four questions before it does anything else. What method and path. What goes in. What comes back on the happy path. What comes back when something is wrong.
{% endcapture %}
{% include callout.html variant="warning" body=trap %}

{% comment %}block:7{% endcomment %}
**Words you can drop in a standup now:**

- {% include glossary-term.html term="contract" %}: Use this when you mean the rules both sides agreed to about what gets sent and what comes back. Stronger than "API" when you want to make the point that breaking it breaks callers.
- {% include glossary-term.html term="endpoint" %}: Use this when you mean a single URL plus method, not an entire API. "We are adding an endpoint" is precise. "We are adding an API" is usually not what you mean.
- {% include glossary-term.html term="response shape" %}: Use this when you mean the structure of the JSON body, not the status code. "The response shape is changing" is a heads up that callers will need to update.
- {% include glossary-term.html term="status code" %}: Use this when you want to be specific about what the server said. Saying "we got a 404" is more useful than "the call failed".
- {% include glossary-term.html term="agent" %}: Use this when the caller is a piece of software acting on behalf of a person, not a person directly. The distinction matters from this lesson forward.

{% comment %}block:8{% endcomment %}
**Today's prompt for your AI assistant** (Claude, this time).

The situation. You have a 5 minute Slack message from an engineer describing a new endpoint, and you need a first draft of the reference page by tomorrow.

The prompt, exactly as written:

```text
I have a description of a new API endpoint from one of our engineers. Below is the transcript. Read it, then produce a first draft of the endpoint reference page covering: method and path, authentication, parameters (with types and whether they are required), a sample request, a sample 200 response, and the most likely error responses. Flag in a separate "Questions for the engineer" section anything you had to guess. Do not invent fields you cannot see in the transcript.

TRANSCRIPT:
[paste the engineer's description here]
```

What to expect back. A structured first draft. Often the method, path, and sample request are usable as is. Parameters and error responses are often partial; that is fine.

What to watch for. Claude will sometimes invent field names that sound plausible. The "questions for the engineer" section is the safety net. If that section is empty, the assistant probably guessed; ask it again with "be more conservative about what you assume".

{% include ad-slot.html slot="3333333333" format="auto" %}

{% comment %}block:9{% endcomment %}
**Before you go.** Look back at the sample `GET /books` response in this lesson. If a caller wants to know whether `thriller` is the only valid value for `q`, where in the reference would they look? Answer it in your head before you read the next lesson.

{% comment %}block:10{% endcomment %}
**Next week at Greenfield.** Sam comes back with a question that does not have an obvious answer: who, on staff, owns the docs once the API is real?

{% include signoff.html %}