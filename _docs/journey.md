---
title: The internet, the short version
permalink: /howinternetworks.html
module: 1
lesson: 1
slug: journey
reading_time: 14
description: The smallest useful unit of API documentation. Request, response, status code, and how to describe one interaction in writing.
next_page:
  url: /whatisanapi.html
  title: What an API actually is
---

{% comment %}block:1{% endcomment %}
## The day you start noticing it

I am sitting in the back office at Greenfield Library on a Tuesday afternoon. Devon refreshes the staff catalog page on his monitor. Three books had been borrowed since lunch. The page already knew.

"It used to be paper. I miss the paper. Don't tell Priya," Devon says.

I have written API documentation for ten years and I had never thought to ask the question that came to me at that moment. How did the page know? The browser is just a screen. It has to talk to something else.

That "something else" is the part of the web that everyone uses and nobody learns. Today is the day you learn it.

{% comment %}block:2{% endcomment %}
## Today you will leave with

- Request, response, and status code in plain English.
- The atomic unit. How to describe one interaction in writing.
- An AI prompt that turns a `curl -v` dump into labels.

{% include ad-slot.html slot="2222222222" format="auto" %}

{% comment %}block:3{% endcomment %}
## What just happened, exactly

The web is built on a conversation between two pieces of software. The piece of software that asks for information is the caller. Sometimes the caller is your browser. Sometimes it is a phone app you opened this morning. Sometimes it is a script someone wrote to back up their photos. The web does not care which.

The caller asks a question. That question is the request. The piece of software that listens for the request and decides what to send back is the server.

When Devon refreshed the catalog, his browser sent a request to Greenfield's server. The server looked up the books, packaged the answer into a webpage, and sent it back. That answer is the response.

Every response includes a number that tells the caller if the request succeeded. That number is the status code.

{% capture mermaid_src %}
sequenceDiagram
  participant Browser
  participant Greenfield as Greenfield catalog server
  Browser->>Greenfield: GET /catalog
  Greenfield-->>Browser: "200 OK with HTML"
{% endcapture %}
{% include mermaid.html content=mermaid_src alt="The browser sends a GET request for the catalog. Greenfield returns a 200 OK response with HTML." %}

Look at the diagram. Which arrow is the request?

{% comment %}block:4{% endcomment %}
## How we write down one interaction

The smallest useful artifact a writer of API documentation can produce is a description of one interaction. Two messages: what the caller sent and what came back.

We write these messages using four pieces of information: the method, the path, the status code, and the body. The method, the headers, and the status code are details that support the path.

Personally, I would always lead with the path. The path tells the caller what they are looking for. Method and status code tell you how the question was asked and how it was answered. Everything else is detail.

The catalog page Devon refreshed is part of Greenfield's public website at `greenfield.lib`. It is not an API. The future API ships in a few lessons at `api.greenfield.lib/v1`.

The request:
```http
GET /catalog HTTP/1.1
Host: greenfield.lib
```

The response:
```http
HTTP/1.1 200 OK
Content-Type: text/html

<html>...</html>
```

{% include interactive-svg.html slug="journey" alt="Two cards labeled REQUEST and RESPONSE. The request card shows GET /catalog with the Host header. The response card shows the 200 OK status, the Content-Type header, and the HTML body. Hover or tap any element to see what it is." %}

By hovering over the diagram, you learned exactly what each part of the message does.

{% comment %}block:5{% endcomment %}
## Try it on Greenfield

{% capture exercise %}
**Five minutes, in your terminal.**

Greenfield does not have an API for you to call yet. We will get there. In the meantime, every public web server speaks the same request and response shape.

Pick any public API you have heard of. If you do not have one in mind, run this:

```bash
curl -v https://api.github.com
```

In the verbose output, find:

- A line starting with `>` showing what you sent.
- A line starting with `< HTTP/` showing the status code.
- The JSON body at the end.

Then write one sentence. For example: "I sent GET / to api.github.com. The server responded with 200 OK and a JSON body listing the available endpoints."

If you can write that sentence in your own words, you have written your first atomic unit of API documentation.

If you see `403 rate limit exceeded`, switch to another public API and try again. GitHub caps unauthenticated traffic at 60 requests an hour per IP.
{% endcapture %}
{% include callout.html variant="exercise" body=exercise %}

{% comment %}block:6{% endcomment %}
## The trap nobody warns you about

{% capture trap %}
The trap is thinking of "the internet" as one transaction.

When you visit the Greenfield catalog page, your browser does not send one request. It sends about sixty. One for the HTML, one for the stylesheet, one for the logo, one for each book cover, one for the analytics script, one for the font file. By the time the page is rendered, there is a long ledger of requests and responses in your browser's network panel.

Devon's version, which he says approximately once a month: "When you say 'I visited a website', what you actually did was send a couple hundred requests. The illusion of one transaction is the browser's job, not the internet's."

This matters for documentation. When a caller says "the page failed", they usually mean one specific request in that ledger failed. The whole page rarely fails as a unit. As a writer, your job is to make the ledger inspectable.
{% endcapture %}
{% include callout.html variant="warning" body=trap %}

{% comment %}block:7{% endcomment %}
## Words you can drop in standups now

- {% include glossary-term.html term="caller" %}: Use this when you mean the software making the request, whatever it is. "The caller is misbehaving" works for a browser, a mobile app, or a script. You will also hear "client" used the same way; we use "caller" in this course.
- {% include glossary-term.html term="request" %}: Use this when you mean what the caller sent. "Did the request go through?" is more precise than "did it work?"
- {% include glossary-term.html term="response" %}: Use this when you mean what came back from the server. "What did the response say?" beats "what did the page say?"
- {% include glossary-term.html term="status code" %}: Use this when you want to be specific about what the server said. "We got a 404" is more useful than "the call failed".
- {% include glossary-term.html term="server" %}: Use this when you mean the software that receives the request and decides what to send back. "Server returned a 500" is more useful than "the website broke".

{% comment %}block:8{% endcomment %}
## Today's prompt for your AI assistant

GPT, this time.

**The situation.** You ran your first `curl -v` and the output scrolled past more lines than you expected. Some lines start with `>`, some with `<`, some with `*`. You can read a few of them. Most look like a wall of text.

**The prompt, exactly as written:**

```text
Below is the verbose output of a curl command. Label every line as either request, response, or metadata. For each line, in one sentence, say what the line is telling me. Do not summarize. Label line by line.

OUTPUT:
[paste curl output here]
```

**What to expect back.** A line by line annotation. The first lines (starting with `*`) are usually connection setup: DNS resolution, TLS handshake. Lines starting with `>` are what your terminal sent to the server. Lines starting with `<` are what the server sent back. After the response headers there is usually a blank line, then the body.

**What to watch for.** GPT will sometimes collapse repetitive lines into one with "... (and so on)". Ask it to expand if you want every line. GPT may also add commentary about what "should" come next. Ignore the speculation. Trust only the lines that are actually in your output.

{% include ad-slot.html slot="3333333333" format="auto" %}

{% comment %}block:9{% endcomment %}
## Before you go

Suppose Greenfield wanted to make its catalog available the way GitHub does. Where would that conversation start?

Answer it in your head before you read the next lesson.

{% comment %}block:10{% endcomment %}
## Next week at Greenfield

By next Tuesday, an old friend of Devon's stops by the branch with a returned book and a question.

{% include signoff.html %}