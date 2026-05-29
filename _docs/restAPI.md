---
title: "REST principles"
permalink: /restAPI.html
module: 2
lesson: 1
slug: restAPI
reading_time: 14
description: "REST is the discipline of using HTTP the way the RFCs say. Why GET /books and not POST /search, told in four agreements."
previous_page:
  url: /audiences-humans-and-agents.html
  title: "Audiences: humans, devs, and agents"
next_page:
  url: /typesofAPI.html
  title: "Types of APIs"
---

{% comment %}block:1{% endcomment %}
## Marginalia writes in

Tuesday morning of story week 4. Devon pinged me yesterday. *Marginalia wrote in. Come by tomorrow morning, I want to think out loud.* I find him at his desk with one tab open. Asha's email is on screen.

> *Hi Devon,*
>
> *Any chance you could expose `POST /search`? Our internal stack expects to send a query in a JSON body and we are doing string surgery on our side to fit your URL. If you are open to it we can send a spec.*
>
> *Asha*

Devon types *We are not building Algolia.* into the reply. He looks at it. He deletes it. He kept the version where it stayed in his head.

Last week Mira walked into the branch with a chatbot quoting `813.5`. This morning a Marginalia engineer wants us to switch verbs. Today you need to know why Devon is saying no, because next week you write the docs for Greenfield's new advanced filter endpoint, and the choice will be yours.

{% comment %}block:2{% endcomment %}
## Today you will leave with

- The four agreements every HTTP verb makes.
- The doc pattern that puts the verb's promise first.
- A GPT prompt that audits one of yours.

{% include ad-slot.html slot="lesson-mid-1" format="auto" %}

{% comment %}block:3{% endcomment %}
## Every verb is an agreement

Every HTTP verb is an agreement.

Take `GET`. Across every cache, every browser, every agent reading the URL, `GET` means "read this thing." The verb carries the meaning. That is the first agreement: {% include glossary-term.html term="uniform interface" %}. Asha at Marginalia, the cache between her stack and ours, Greenfield's access log, your browser when you bookmark something. They all read `GET` the same way, because the convention is shared.

The second agreement is about what the URL names. `/v1/books` names a thing, the catalog. The query string is how you look at it. `?q=mystery` is the lens. `POST /search` flips that: the URL names the action, the body holds the thing. Resources first, actions in the verb. That is resource orientation.

The third agreement is {% include glossary-term.html term="cacheable" %}. `GET` responses are cacheable by default. `POST` responses are not. When Atlas calls `/books?q=mystery` twenty times an hour, every cache between Atlas and Greenfield can serve the second call onwards from a copy. Greenfield's origin sees one of those calls. The other nineteen never reach it.

The fourth agreement is being {% include glossary-term.html term="safe" %}. `GET` promises not to change server state. Safe means retryable after a flaky network, prefetchable by a browser, loggable with the query, bookmarkable. `POST` makes no such promise. Safety and cacheability are not two separate ideas. A safe verb is naturally cacheable, because the response does not depend on side effects.

Every request stands alone, carrying enough to be understood without context. That is the property the other four rely on. It is called statelessness, and you have already seen it in every Greenfield call: each request carries its own bearer token, its own query, its own headers. The server holds nothing for you between calls.

The current HTTP method spec is RFC 9110. Steve Crocker wrote the first RFC in April 1969. The chain is unbroken. 55 years of agreement is why your browser knows what `GET` means without asking. {% include glossary-term.html term="REST" %} is the discipline of using HTTP the way the RFCs say to.

{% capture mermaid_src %}
sequenceDiagram
  participant Atlas
  participant Cache
  participant API as Greenfield API
  Atlas->>Cache: GET /v1/books?q=mystery
  Cache->>API: miss; fetch
  API-->>Cache: 200 with results
  Cache-->>Atlas: 200 with results
  Note over Cache: cache populated
  Atlas->>Cache: GET /v1/books?q=mystery (again)
  Cache-->>Atlas: 200 with results (cached)
{% endcapture %}
{% include mermaid.html content=mermaid_src alt="Atlas calls GET /v1/books?q=mystery. The cache misses on the first call, fetches from Greenfield's origin, returns the 200 to Atlas, and stores the response. On the second call Atlas asks the cache for the same URL and gets the cached 200 back without the origin being contacted. The cache sits between Atlas and the origin in the call path." %}

Look at the diagram. Find the cache. It is the one Atlas does not know about and benefits from anyway.

{% comment %}block:4{% endcomment %}
## Put the promise first

Every endpoint's reference page names what the verb commits to in the first three words after the H2. Greenfield's reference page for `/v1/books` opens like this:

> **`GET`. Safe. Cacheable.**

Then the curl. Then a short description of what the endpoint returns. Then the response fields. The verb's promises come first because they are what every reader needs first. The dev wants to copy a snippet. The agent wants to know whether to retry. The cache wants to know whether to store.

Here is the canonical call:

```bash
$ curl -H "Authorization: Bearer $GF_TOKEN" \
       "https://api.greenfield.lib/v1/books?q=mystery"
```

The `200` returns a results array. One of those results is `bk_184932`, *The Quiet Library*, available at `branch_north`.

Now picture the same page for `POST /search`. Same data in, same data out. The differences are in three short bullets.

- **Cache.** Nothing held by default. Every call hits the origin.
- **Retries.** The retry after a flaky network is no longer safe. Two identical retries can create two of whatever the server thinks `POST` does.
- **Access log.** The query lives in the body, which most loggers drop on the floor. You can no longer see which agent asked which question by reading the log.

That names what the doc page owes. A `POST /search` page owes the caller three short lines on the page. This looks like a search. Here is why we POST. Here is what you lose.

Below is the same request in two states. Click to toggle. Watch the five rows flip.

{% include interactive-svg.html slug="restAPI" alt="A toggle between two HTTP requests for the same data. State GET shows the request line GET /v1/books?q=mystery with five rows below: URL = full query visible; cache = hit on the second call; retry = safe; access log = method, path, and query; bookmark = works. State POST shows the request line POST /search with body containing q equals mystery and the same five rows flipped: URL = method and path only; cache = miss every time; retry = not safe; access log = method and path; bookmark = does not work. The toggle is the whole SVG; click or press Enter to switch states." %}

The doc page that names what the verb commits to gives every reader, including Asha and Atlas and the cache, a chance to understand what the call will do before it does it.

{% comment %}block:5{% endcomment %}
{% capture body %}
Open the reference page for one endpoint in any public API doc: Stripe's `/v1/customers`, GitHub's `/repos`, OpenAI's `/v1/chat/completions`, your choice. Find the verb. Read the first three sentences after the verb. Did the page name what the verb commits to: is it safe, is it cacheable, what happens if you retry? Write three sentences in your notes: the verb, the page's answer, your judgment. If the page did not say what the verb commits to, that is the finding. Write that down.

The exercise is not about catching the doc page out. It is about noticing whether the page told you what the call would do before you made it.
{% endcapture %}
{% include callout.html variant="exercise" body=body %}

{% comment %}block:6{% endcomment %}
{% capture body %}
`POST /search` exists in production at Stripe, Algolia, Elasticsearch, every endpoint where the filter tree will not fit in a URL. The convention is a default, not a religion.

Devon's rule: break the rule when you have a reason. Do not break it by accident. The first version of Greenfield's `/v1/books` endpoint accepted a JSON body on `POST` because Devon copied a tutorial. The cache never served it. The access log never showed the query. Asha would not have written to him about that version. She would have written to ask why everything was slow.

When you ship a search endpoint that does not fit the agreements, the doc page is where you pay the difference. Three short lines on the page. This looks like a search. Here is why we POST. Here is what you lose.
{% endcapture %}
{% include callout.html variant="warning" body=body %}

{% comment %}block:7{% endcomment %}
## Words you can drop in standups now

- **{% include glossary-term.html term="REST" %}.** Use this when someone asks "is our API REST." The real question is "do we follow the HTTP conventions."
- **{% include glossary-term.html term="safe" %}.** Use this when you mean "I can call this and nothing on the server changes."
- **{% include glossary-term.html term="cacheable" %}.** Use this when you mean "the cache holds this for me by default, so my next call is fast."
- **{% include glossary-term.html term="uniform interface" %}.** Use this when you mean "every reader of this URL, including browsers, agents, and caches, knows what to do without us telling them."

{% include ad-slot.html slot="lesson-mid-2" format="auto" %}

{% comment %}block:8{% endcomment %}
## AI co pilot tip

GPT, this time.

**The situation.** You have an endpoint on your desk and you want a second opinion on whether the verb matches the action. Useful before a doc page goes out. Useful when an engineer pushes a PR and the verb feels off.

**The prompt** (copy box):

```text
Here is an HTTP method and path: `GET /v1/customers/{id}/subscriptions`. Audit it against four REST principles: uniform interface, resource orientation, cacheability, safety. For each, say in one sentence whether the choice fits. If you would pick a different verb, name it and explain in one sentence why. Do not hedge.
```

**What to expect back.** Four short lines, one per principle, and a verdict. The verdict either confirms the verb or names a replacement.

**What to watch for.** GPT sometimes hedges with "both are valid." Push back: "pick one and defend it." The hedged answer is not useful. The defended one is. If the verdict is "GET is correct," ask for one case where POST would be the right call. That second pass forces the model off the default and gives you the trap from block 6 in the model's own words.

{% comment %}block:9{% endcomment %}
## Before you go

<!-- TODO block:9 -->

{% comment %}block:10{% endcomment %}
## Next week at Greenfield

<!-- TODO block:10 -->

{% include signoff.html %}
