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
## Last week I told you the codebase has opinions

Today we find out which ones.

I am at Devon's desk on Tuesday morning of story week 2. The new `GET /books` endpoint is on his branch; it ships this afternoon at four. He swivels his monitor toward me, points at the branch, then the schema file, then the test file.

"Code is on my branch, tests pass, error handling is regrettable but documented, see what you find. I have a standup. Back in forty minutes."

He leaves.

I think I know what `GET /books` does. Devon described it to me over coffee a week ago. By the time he is back, I will know one thing I did not. Not from a meeting.

What I am about to do in the next forty minutes is the work most writers leave until Thursday's kickoff meeting. Today you do it first.

{% comment %}block:2{% endcomment %}
## Today you will leave with

- Where the information for an endpoint actually lives in a codebase.
- Three sharper questions to walk into your engineer interview with.
- A Cursor prompt that points at one endpoint and surfaces what the doc page needs.

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
## How we read each one

The code below is Python with Flask. Your codebase may be Node or Go. The four sources are the same in any stack.

**The route handler.** I open `routes/books.py`. I knew from Devon's coffee description that the endpoint took a search term and returned books. The handler confirms it.

```python
@app.get("/v1/books")
def search_books():
    q = request.args.get("q")
    if not q:
        return {"error": "q is required"}, 400
    limit = min(int(request.args.get("limit", 25)), 100)
    results = catalog.search(q, limit=limit)
    return {"results": results, "total": len(results)}, 200
```

But the handler also shows `limit=25` defaulting and a cap at `min(limit, 100)`. Devon did not mention either number. First revelation: the endpoint has pagination behavior the SME forgot to mention.

**The schema.** I open `openapi.yaml`. I expect the schema to match the handler. It does not.

```yaml
/v1/books:
  get:
    parameters:
      - name: q
        in: query
        required: true
        schema: { type: string }
    responses:
      '200':
        content:
          application/json:
            schema:
              type: object
              properties:
                results:
                  type: array
                  items: { type: object }
                total:
                  type: integer
```

The schema declares `q` as required and the 200 response shape, but it does not declare `limit` at all. Second revelation: the schema and the handler disagree. This is what last week's lesson meant when it said the codebase has opinions. The handler and the schema disagree, and the code's opinion is louder than the schema's silence.

**The tests.** I open `tests/test_books.py`.

```python
def test_missing_q_returns_400(client):
    r = client.get("/v1/books")
    assert r.status_code == 400

def test_limit_over_100_is_capped(client):
    r = client.get("/v1/books?q=ursula&limit=500")
    assert len(r.json["results"]) <= 100
```

One test asserts `400` when `q` is missing, so the 400 is contractual, not implementation accident. Another sends `limit=500` and asserts the response has at most 100 results, so the cap at 100 is contractual too. Third revelation: the tests pin which behaviors are promises and which are details. The 100 cap is a promise. The default of 25 is currently silent.

**The SME conversation.** I look at the clock. By 9:50 I have read all three code sources. I pull a sticky note from Devon's monitor frame and write three short questions: why 25 and not 50 as the default; why 400 instead of 422 for missing `q`; whether `limit` belongs in the OpenAPI schema or whether the team plans to remove it from the handler. None of these are answerable from code. All three fit on one sticky note.

Three sources took twenty minutes. The questions for Devon fit on a sticky note. When he is back at 10:10, the conversation is sharper than any 60 minute kickoff meeting could be.

I had been ready to write the doc page before reading the code. Reading the code, I realized I had been ready to write a wrong doc page.

{% include interactive-svg.html slug="informationgathering" alt="Sources map for one endpoint reference. A sketched doc page in the centre is connected to four labeled source boxes around it: the route handler, the schema, the tests, and the engineer. Hover any source to see the one sentence it contributes." %}

Hover any source box. Each one shows you what it contributes to the doc page. Some doc page fields are touched by more than one source. Those are the contracts.

{% comment %}block:5{% endcomment %}
## Try it on Greenfield

{% capture exercise %}
**Five minutes, in a real repo.**

Pick any open source API project. If you do not have one in mind, clone `tiangolo/full-stack-fastapi-postgresql`. It is a well maintained FastAPI tutorial repo with both handlers and tests in one project, small enough to scan in five minutes.

If the repo has a README, it usually names the routes file. If not, grep for the URL path you saw in the docs.

Read one endpoint's route handler. Then find the test file for that endpoint and read one test case.

Write down one thing the tests told you that the route handler did not. Write down one question you would still ask the engineer.

That question is the one you would have wasted twenty minutes of the kickoff meeting figuring out you needed to ask.
{% endcapture %}
{% include callout.html variant="exercise" body=exercise %}

{% comment %}block:6{% endcomment %}
## The trap nobody warns you about

{% capture trap %}
The trap is treating the codebase as the whole truth. The codebase tells you what is. It does not tell you why. It does not tell you what was almost shipped and rejected. It does not tell you the agreement that lives only in a Slack thread from two years ago.

I first heard Devon's line on this the week after a postmortem at his last job. The runbook had disagreed with what the on call had actually done during the rollback. A PM asked why the doc had not been updated. Devon said: "The code is honest. People are kind." Then he changed the subject.

Both are needed. Both leave different gaps. The writer's job is to know which gap lives where.

If you work in GraphQL or gRPC, the sources have different names but the count is the same. Resolver, schema in `.graphql`, tests, SME. Method, `.proto`, tests, SME. Read the three before you book the fourth.
{% endcapture %}
{% include callout.html variant="warning" body=trap %}

{% comment %}block:7{% endcomment %}
## Words you can drop in standups now

- {% include glossary-term.html term="source of truth" %}: Use this when you mean the authoritative version of X. "OpenAPI is the source of truth for the schema" settles a debate that "we should agree on the schema" does not.
- {% include glossary-term.html term="SME" %}: Use this when you mean the person who owns the answers your code cannot give you. "I have three questions for the SME" beats "I will ask around."
- {% include glossary-term.html term="schema" %}: Use this when you mean the structural description of the data, separate from any one example of it. "The schema changed" is different from "this response changed."
- {% include glossary-term.html term="OpenAPI" %}: Use this when you mean the standard for describing REST APIs in YAML or JSON, or the file in your repo that holds that description. "Check OpenAPI" is what you say when the question is about contract, not behavior.

{% comment %}block:8{% endcomment %}
## Today's prompt for your AI assistant

Cursor, this time.

**The situation.** You have your team's codebase open in your editor and one endpoint to document. You want everything I gathered this morning, faster.

**The prompt, exactly as written:**

```text
You are reading this codebase as if you were a senior technical writer documenting one endpoint.

The endpoint is GET /v1/books.

In one pass, find and report:

1. The route handler. File path and line. Path params and query params it accepts, with types and defaults.
2. The response schema. File path and line. The exact 200 response shape.
3. The tests. File path and line. Every error case the tests cover.
4. Every status code this endpoint can return (from code, tests, or error catalog if your codebase has one).
5. Three questions a human engineer would still need to answer that this code does not.

Quote line numbers. Do not summarize.
```

**What to expect back.** A report, file by file, with line numbers, because Cursor has the files open. If something is missing from the codebase, Cursor will say so.

**What to watch for.** Cursor will mechanically list items one to three and hedge on five. Press it on five with "name three questions, do not generalize." The hedged version is not useful. The specific one is.

{% include ad-slot.html slot="3333333333" format="auto" %}

{% comment %}block:9{% endcomment %}
## Before you go

Maya saw the 25 item default and the 100 item cap. Should both numbers show up in the doc page, and for which reader: the developer copying a snippet, or the chatbot summarizing the endpoint for a borrower?

Answer it in your head before you read the next lesson.

{% comment %}block:10{% endcomment %}
## Next week at Greenfield

A borrower stops in with a complaint that has nothing to do with the books on the shelf. A chatbot has been reading her the wrong call numbers.

{% include signoff.html %}
