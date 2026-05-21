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
