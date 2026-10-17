# Module 1 Lesson 4 ("Information gathering and interviewing the codebase"). Design.

**Status.** v0.1. All five sections drafted, self-reviewed, fixes applied inline. Ready for user review and writing-plans handoff.
**Owner.** Gaurav Trivedi.
**Author of this spec.** Claude (drafting), Gaurav (decisions).
**Last updated.** 2026-05-22.

Per-lesson design spec for rewriting `_docs/informationgathering.md` (permalink `/informationgathering.html`) as Module 1 Lesson 4 in Maya's voice. Implementation plan follows at `docs/superpowers/plans/2026-05-22-m1l4-informationgathering-plan.md`.

**Parent spec.** `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md` (Phase 2 framework: voice, 10-block template, DoD, visual pipeline).

**Sister references.**

- `docs/superpowers/specs/2026-05-20-toc-finalization-design.md` (canonical TOC).
- `docs/superpowers/specs/2026-05-20-m1l1-journey-design.md` (Module 1 Lesson 1 spec).
- `docs/superpowers/specs/2026-05-21-m1l3-whatwritersdo-design.md` (preceding lesson's spec; story-time precedes this lesson by ~4 to 5 days).
- Pilot lesson (voice exemplar): `_docs/whatisanapi.md`.
- Universe canon: `docs/superpowers/greenfield-bible.md`.

---

## Section 1. The ten-block outline.

Step 2 artifact per parent spec Section 5. If any block lacks a clear one-line answer, the lesson is not ready to write.

**Central argument.** An API writer in 2026 gathers from the codebase first and the SME last. The codebase is the most honest source and the cheapest to consult. The SME is the most expensive and the most generous. Save the SME for the questions only a person can answer. **Read code first not to replace the SME interview but to make the SME interview the highest-leverage twenty minutes of your week.**

**Block 1. Diary opener (~160 words). Echo M1L3's closing rhythm, seed the stake.** Opens with a direct callback to M1L3's last line: "Last week I told you the codebase has opinions. Today we find out which ones." Then the scene. Tuesday morning of story week 2, back office at Greenfield. Devon has the new `GET /books` endpoint on his branch; it ships this afternoon at 4 PM. He swivels his monitor toward Maya, points at the branch, the schema file, and the test file, says: "code is on my branch, tests pass, error handling is regrettable but documented, see what you find. I have a standup. Back in forty minutes." He leaves. Maya thinks she knows what `GET /books` does because Devon described it to her over coffee a week ago. By the time he is back, she will know one thing she did not. Not from a meeting. The closer pivots to the apprentice: what Maya is about to do is the work most writers leave until Thursday's kickoff meeting. Today you do it first.

**Block 2. Today you will leave with (~30 words).** Three bullets: (1) where the information for an endpoint actually lives in a codebase; (2) three sharper questions to walk into your engineer interview with; (3) a Cursor prompt that points at one endpoint and surfaces what the doc page needs.

**Block 3. The four sources (~410 words plus one Mermaid). Self-implicating wrong-then-right.** Maya opens by naming her own past mistake: "For my first eight years writing API docs, I did this the wrong way. I would book the engineer for an hour, sit down with a notebook, and ask them to tell me about the endpoint." Why it failed: the engineer gave broad strokes. Maya asked the wrong follow-ups because she did not yet know the territory. She would leave with surface answers and have to come back for the specifics, by which time the engineer had shipped two more things and forgotten the first one. Implicates herself, not the reader, per parent spec voice rule.

Then the shift. An endpoint reference has four information sources. The route handler (the function the server runs when a call to this endpoint comes in) tells you what the endpoint does. The schema tells you what it sends back. The tests tell you what the team has promised it will not do. The SME (the subject matter expert, the engineer who built the endpoint) tells you the why, the history, and the intent. Three of the four live in the codebase. One is a person.

The triangulation insight (moved here from block 4 to keep block 4's close clean). Some doc-page fields have more than one source. When two sources agree, the field is a contract worth documenting carefully. When they disagree, you have a question for the SME. This is what makes the four sources a system rather than a list.

Maya states her opinion plainly: "I count four. You may find a fifth in your codebase. The order matters more than the count. Read the three before you book the fourth. Reading code first does not skip the SME interview. It makes the SME interview the highest-leverage twenty minutes of your week." Defines `source of truth` here (one inline sentence; glossary chip on later appearances). Defines `SME` here (one inline sentence; glossary chip on later appearances). First body appearance of `schema` is also defined inline; glossary chip on later appearances.

Mermaid is a sequenceDiagram between Maya, the codebase, and Devon, showing the order Maya gathers in (not the spatial layout; the SVG covers that).

Thought checkpoint near the end: "Look at the diagram. Which source tells you the response shape? Which one tells you why the field is called `available_branches` and not just `branches`?" The second question is the one only Devon can answer; the diagram makes the asymmetry visible.

**Block 4. How we read each one (~560 words plus interactive SVG). Structured as a progressive revelation, not a list.** Opens with: "The code below is Python with Flask. Your codebase may be Node or Go. The four sources are the same in any stack."

Each source reveals something Maya did not know walking into the morning. The lesson teaches by surfacing the four revelations.

(a) **The route handler.** Maya opens `routes/books.py`. She knew from Devon's coffee description that the endpoint took a search term and returned books. The handler confirms it. But the handler also shows `limit=25` defaulting and a cap at `min(limit, 100)`. Devon did not mention either number. **First revelation: the endpoint has pagination behavior the SME forgot to mention.**

(b) **The schema.** Maya opens `openapi.yaml`. She expects the schema to match the handler. It does not. The schema declares `q` as a required parameter and the 200 response shape, but it does not declare `limit` at all. **Second revelation: the schema and the handler disagree. This is what M1L3 meant when it said the codebase has opinions. The handler and the schema disagree, and the code's opinion is louder than the schema's silence.**

(c) **The tests.** Maya opens `tests/test_books.py`. One test asserts `400` when `q` is missing, so the 400 is contractual, not implementation accident. Another test sends `limit=500` and asserts the response has at most 100 results, so the cap at 100 is contractual too. **Third revelation: the tests pin which behaviors are promises and which are details. The 100 cap is a promise. The default of 25 is currently silent.**

(d) **The SME conversation (no code).** Maya looks at the clock. By 9:50 she has read all three code sources. She pulls a sticky note from Devon's monitor frame and writes three short questions: why 25 and not 50 as the default; why 400 instead of 422 for missing `q`; whether `limit` belongs in the OpenAPI schema or whether the team plans to remove it from the handler. None of these are answerable from code. All three fit on one sticky note.

Block 4 closes with two beats, not three. The asymmetry and one inner-Maya line. (The triangulation insight has been moved up to block 3 where it belongs structurally; block 4's close stays clean.)

The asymmetry, plain: three sources took twenty minutes. The questions for Devon fit on a sticky note. When he is back at 10:10, the conversation is sharper than any 60-minute kickoff meeting could be.

The inner beat: "I had been ready to write the doc page before reading the code. Reading the code, I realized I had been ready to write a wrong doc page." Names the emotional arc the lesson has been carrying since 9:30. Confidence to clarity, with surprise and unsettled in between.

The interactive SVG is the sources map: a small sketched doc page in the centre, four source boxes around it, lines connecting each source to the doc-page fields it contributes to. Hover any source for a one-sentence tooltip. The SVG is the spatial layout of the same teaching beat the Mermaid covers temporally.

**Block 5. Try it on Greenfield (~165 words, exercise callout).** Five minutes in a real repo. Pick any open source API project. If you do not have one in mind, clone `tiangolo/full-stack-fastapi-postgresql` (a well-maintained FastAPI tutorial repo; small, readable, has both handlers and tests in one project). If the repo has a README, it usually names the routes file. If not, grep for the URL path you saw in the docs. Read one endpoint's route handler. Then find the test file for that endpoint and read one test case. Write down one thing the tests told you that the route handler did not. Write down one question you would still ask the engineer. The question is the one you would have wasted twenty minutes of the kickoff meeting figuring out you needed to ask.

**Block 6. The trap (~180 words, warning callout). Earned joke lives here, with context.** The trap is treating the codebase as the whole truth. The codebase tells you what is. It does not tell you why. It does not tell you what was almost shipped and rejected. It does not tell you the agreement that lives only in a Slack thread from two years ago.

Maya tells the reader the moment she first heard Devon's line. It was the week after a postmortem at his last job, where the runbook disagreed with what the on-call had actually done during the rollback. A PM asked why the doc had not been updated. Devon said: **"The code is honest. People are kind."** Then he changed the subject.

Both are needed. Both leave different gaps. The writer's job is to know which gap lives where.

(One line for non-REST writers: if you work in GraphQL the sources have different names but the count is the same. Resolver, schema in `.graphql`, tests, SME. Same for gRPC: method, `.proto`, tests, SME.)

First lesson where the earned joke lands in block 6 rather than block 1; varies the cadence across the module. The joke is dry, contextual, and self-contained; if Gaurav thumbs-down at review, cut entirely and put a different Devon line here (drafted at review).

**Block 7. Words you can drop in standups now (4 terms, ~135 words).** Four chips, each one sentence on usage rather than definition (the definition is in the chip popover). Draft text:

- `source of truth`: Use this when you mean the authoritative version of X. "OpenAPI is the source of truth for the schema" settles a debate that "we should agree on the schema" does not.
- `SME`: Use this when you mean the person who owns the answers your code cannot give you. "I have three questions for the SME" beats "I will ask around."
- `schema`: Use this when you mean the structural description of the data, separate from any one example of it. "The schema changed" is different from "this response changed."
- `OpenAPI`: Use this when you mean the standard for describing REST APIs in YAML or JSON, or the file in your repo that holds that description. "Check OpenAPI" is what you say when the question is about contract, not behavior.

All four glossary entries new in this PR (none previously in `_data/glossary.yml`).

**Block 8. AI co-pilot tip (~225 words).** Tool: Cursor (rotation: GPT in M1L1, Claude in pilot and M1L3, **Cursor in M1L4**; matches the lesson's central act of reading a codebase, widens the rotation). Situation: you have a codebase open in your editor and one endpoint to document. The prompt asks Cursor to find, in one pass: the route handler (with file path and line), the response schema (with file path and line), every error case the tests cover, every status code this endpoint can return (from code, tests, or error catalog if your codebase has one), and three questions a human engineer would still need to answer that the code does not. Maya's note on what to watch for: Cursor will mechanically list items one to three and hedge on five. Press it on five with "name three questions, do not generalize." The hedged version is not useful. The specific one is.

**Block 9. Before you go (one self-check, ~40 words).** One compound question. Tests recall of the 25/100 detail AND seeds M1L5 by surfacing who reads the doc page: "Maya saw the 25 item default and the 100 item cap. Should both numbers show up in the doc page, and for which reader: the developer copying a snippet, or the chatbot summarizing the endpoint for a borrower?" The chatbot half is M1L5's opener.

**Block 10. Next week at Greenfield (one to two sentences) plus signoff.** Teaser: "Next week a borrower stops in with a complaint that has nothing to do with the books on the shelf. A chatbot has been reading her the wrong call numbers." Then `{% include signoff.html %}`. Picks up the M1L5 spec's "chatbot mistranslating call numbers" beat directly.

---

**Word count target.** Block estimates (revised after fourth polish pass): B1 ~160, B2 ~30, B3 ~410, B4 ~600, B5 ~165, B6 ~210, B7 ~135, B8 ~225, B9 ~40, B10 ~35 = **~2,010 words**. Reading time per parent spec Section 2 v0.4 formula: `2010/150 + 3 = 16.4 minutes`. Inside the 12 to 18 minute target. Frontmatter `reading_time: 16`.

**Variety check against M1L1, pilot M1L2, M1L3.**

- Joke owner: M1L1 Devon → pilot M1L2 Maya → M1L3 Priya → **M1L4 Devon** (line narrated by Maya). Rotates back without immediate repeat.
- Joke location: M1L1 block 1 → M1L3 block 1 → **M1L4 block 6**. First lesson where joke lands in the trap.
- SVG pattern: M1L1 hover-tooltip → M1L3 toggle → **M1L4 hover-tooltip**. The pattern returns, on a distinctly different shape (centre-and-spokes sources map vs. M1L1's two REQUEST/RESPONSE cards).
- AI tool: GPT → Claude → Claude → **Cursor**. Rotation widens.

---

## Section 2. Visuals and code samples.

**Mermaid diagram (block 3, 3 participants, 8 messages, well under the 10-node / 12-edge cap).**

```liquid
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
```

The diagram visualizes the **order** of gathering (code first, person last). The SVG in block 4 visualizes the **map** of what each source contributes. Different shapes; no redundancy.

Label check: all labels are sentence case, ≤5 words each, no hyphens, no em dashes, no emoji, no vendor names. Numbers as numerals where applicable.

**In-line code samples (block 4, four artifacts, each under 12 lines).**

Stack pick: **Flask + OpenAPI YAML + pytest**. Reasoning: Flask handlers read like prose to non-engineers (decorator + function + return), separation between handler and schema stays clean (no FastAPI auto-generation conflating two sources), pytest is the most readable test framework. Reader can mentally substitute their own stack.

(a) **The route handler** (`routes/books.py`, ~10 lines):

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

What Maya extracts: `q` is required (handler returns 400 if missing), `limit` defaults to 25 and caps at 100, the 400 response body, the 200 response shape (`results`, `total`).

(b) **The schema** (`openapi.yaml`, ~16 lines, inlined for self-contained reading):

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
                total: { type: integer }
```

What Maya extracts: `q` declared as required (matches handler), 200 declares the response shape (`results` array, `total` integer), no `limit` parameter declared (mismatch with handler; flag for Devon).

(c) **The tests** (`tests/test_books.py`, ~10 lines):

```python
def test_missing_q_returns_400(client):
    r = client.get("/v1/books")
    assert r.status_code == 400

def test_limit_over_100_is_capped(client):
    r = client.get("/v1/books?q=ursula&limit=500")
    assert len(r.json["results"]) <= 100
```

What Maya extracts: 400 case is contractual (the team committed to it in a test). The cap at 100 is enforced by test, not just by handler, so it is a contract, not an implementation detail.

(d) **The SME conversation (no code).** Maya pins three questions for Devon: why 25 and not 50 as the default; why 400 instead of 422 for the missing `q`; whether the `limit` parameter belongs in the OpenAPI schema or whether the team will remove it. None of these are answerable from code. All three are short.

The asymmetry the lesson teaches: three of four sources took ten minutes total. The fourth takes three sentences.

**Interactive SVG (block 4): `assets/svg/informationgathering/main.svg`.**

Pattern: `data-svg-pattern="hover-tooltip"` (M1L1 bug fixed in master at commit 78993c8; safe to reuse). Canvas 800×500 with `preserveAspectRatio="xMidYMid meet"`.

**Include alt parameter** (parent spec requires it):

```liquid
{% include interactive-svg.html slug="informationgathering" alt="Sources map for one endpoint reference. A sketched doc page in the centre is connected to four labeled source boxes around it: the route handler, the schema, the tests, and the engineer. Hover any source to see the one sentence it contributes." %}
```

Layout: a small sketched doc page in the centre (~280×400 pixels), titled `GET /v1/books`, with five labeled fields visible (the heading, the curl line, `q (string, required)`, the 200 response shape, the 400 error). Four source boxes around it (route handler top-left, schema top-right, tests bottom-left, SME bottom-right). Each source box has a label and a connecting line (sage token color, 1.5 pixel stroke, no arrowheads, `aria-hidden="true"`) to the doc-page fields it contributes to.

Source tooltips (one sentence each, voice rules apply, all under 20 words):

- **route handler.** "The function the server runs when the call comes in. You learn what fields exist and how they default."
- **schema.** "The team's written promise about the response shape. You learn the contract."
- **tests.** "Every behavior the team has agreed not to break. You learn the edges."
- **SME.** "The engineer who built it. You learn the why and the history."

Doc-page field tooltips (one sentence each):

- `GET /v1/books` → "Route handler declared this path and this method."
- `q (string, required)` → "Schema marked q required. The handler also returns 400 if it is missing."
- `200 response` → "Schema declared the shape. Tests verified two specific cases."
- `400 error` → "Tests pinned this contract. The handler implements it."

Accessibility (mandatory per parent spec Section 6):

- Each interactive `<g>` (source box and doc-page field) has `tabindex="0"` and `role="button"` (per CLAUDE.md infrastructure habit 4; author-supplied, not framework-added).
- Root `<svg>` `aria-label`: "Sources map showing how the route handler, schema, tests, and engineer each contribute to one doc page."
- Tab order: source boxes 1 to 4 (top-left, top-right, bottom-left, bottom-right), then doc-page fields top to bottom.
- `aria-label` on each interactive group, voice rules apply.
- Focus ring 2 pixel ink (the dark text token, NOT copper). Avoids visual clash with copper source-box highlights when a source has focus.
- Static fallback: no JS, source boxes still visible with their labels; only the tooltips become hidden. The connecting lines and the doc-page fields all render statically.
- Reduced motion: tooltip fade-in degrades to instant.
- Color not the only carrier of information; each highlight also carries a text label.

Style: strokes 1.5 to 2 pixels, corners rounded 4 pixels, token palette only (ink for text, cream for the doc-page card, copper for source highlights, sage for connecting lines and accents). No drop shadows. No gradients.

Performance target: under 12 KB raw, under 5 KB gzipped.

---

## Section 3. Frontmatter, glossary, bible.

**Frontmatter for `_docs/informationgathering.md` (lean, matching pilot and M1L3):**

```yaml
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
```

Notes:

- `permalink` preserved verbatim from legacy (with leading slash for consistency with M1L1 and M1L3; the URL `/<baseurl>/informationgathering.html` resolves the same either way).
- `title` cleaned of em dash. Original modules.yml: "Information gathering — and interviewing the codebase". New title: "Information gathering and interviewing the codebase".
- `description` is 135 characters, under the 155 limit per parent spec DoD. No hyphens, no em dashes, no AI tells, no jargon (uses "the engineer" not "the SME" because the description is meta-content read by search engines, not by readers who have seen the inline definition).
- `next_page` points at the M1L5 placeholder slug. `_docs/audiences-humans-and-agents.md` does NOT currently exist as a file. **Risk: the link will 404 until M1L5 ships or a stub is created.** Logged in Section 5 as Risk 1.
- `previous_page` IS included (M1L4 is not the first lesson).
- `redirect_from` NOT needed. Permalink is unchanged from legacy; only the title and body are rewritten. Per parent spec DoD, `redirect_from` is for URL changes, not title or body changes.
- Stripped from legacy frontmatter (no longer needed under the new layout): `keywords`, `image`, `last_modified_at`, `author_name`, `author_description`, `author_expertise`, `author_image`, `level`, `speakable`, `speakable_selectors`, `schema_markup`. OG images are generated by `scripts/generate-og.mjs`; speakable and schema behaviors are layout defaults.

**Modules.yml update.**

```diff
- - { slug: "informationgathering.html", title: "Information gathering — and interviewing the codebase", reading: "15 min" }
+ - { slug: "informationgathering.html", title: "Information gathering and interviewing the codebase", reading: "16 min" }
```

Em dash removed. Reading time confirmed at 15 minutes. No other modules.yml changes needed for M1L4.

**Glossary additions to `_data/glossary.yml`.**

The actual `_data/glossary.yml` currently contains 14 entries (JWT, MCP, LLM, 429, contract, endpoint, response shape, status code, agent, request, response, caller, server, reader). Neither `schema` nor `OpenAPI` is present, despite parent spec Section 7's "seed glossary" list. M1L4 adds all four block-7 chip terms:

```yaml
- term: "source of truth"
  definition: "The authoritative version of a piece of information. When two places disagree about what something is, the source of truth wins. In a codebase, the route handler is the source of truth for what an endpoint does."
  link: "#"

- term: "SME"
  definition: "Subject matter expert. The person on the team who knows things only people know. An engineer is the SME for an endpoint they built. A PM is the SME for why a feature exists."
  link: "#"

- term: "schema"
  definition: "The structural description of the data sent or received by an API. Names the fields, their types, and which are required. Lives in OpenAPI, JSON Schema, or the code that generates them."
  link: "#"

- term: "OpenAPI"
  definition: "The standard for describing REST APIs in YAML or JSON. Often shipped as a single file in the repo. Both humans and tools can read it; tools generate client libraries from it."
  link: "#"
```

Style check: each definition under 40 words. No hyphens, no em dashes, no emoji, no AI tells. ✓

**Greenfield bible updates at `docs/superpowers/greenfield-bible.md`.**

Append to **Timeline** section, after the existing M1L3 entry:

```markdown
## Module 1, Lesson 4. Maya reads the codebase while Devon is in standup.
Story date: Tuesday morning, story week 2. Five days after Priya's two-graphs conversation in M1L3 (M1L3 was late story week 1, around Thursday).
Event: Devon is finishing the new GET /books endpoint; it ships that afternoon at 4 PM. Before his 9:30 standup, he swivels his monitor toward Maya, points at the branch, the schema, and the tests, and tells her to dig in. He returns at ten. Maya has spent forty minutes reading code, tests, and the OpenAPI schema, and has pinned three sharp questions for him. The endpoint goes live at 4 PM. The first Greenfield API doc page is in draft by the end of the day.
Characters present: Maya, Devon. The apprentice (the reader) is the implicit second observer.
New API entities introduced: GET /v1/books with q (required, string) and limit (default 25, max 100). 400 response when q is missing. 200 response with results and total.
Web entities introduced: the Greenfield codebase, organized illustratively as routes/books.py, openapi.yaml at the repo root, tests/test_books.py. Illustrative file layout, not contractual.
New glossary terms introduced: source of truth, SME, schema, OpenAPI.
Quote: "The code is honest. People are kind." (Devon, originally said in the week after a postmortem at his previous job where the runbook had disagreed with the on-call's actual rollback steps. A PM asked why the doc had not been updated; Devon answered with the line, then changed the subject. Maya quotes it back in M1L4 block 6.)
```

Append to **Locked details** section:

```markdown
- Greenfield's first live API endpoint is GET /v1/books, shipped Tuesday afternoon of story week 2.
- GET /v1/books accepts q (required, string) and limit (default 25, max 100). Returns 400 if q is missing. (Unresolved as of M1L4: whether 400 should be 422; whether limit should appear in the OpenAPI schema. Both questions Maya pinned for Devon. Resolution deferred to Module 4 errors lesson.)
- Greenfield codebase file layout (illustrative, used in lesson code samples): routes/books.py for the handler, openapi.yaml at the repo root for the schema, tests/test_books.py for tests. Not locked as the team's actual layout; later lessons may shorten or restructure, provided the four sources remain distinct.
- Devon's recurring line, now canonical: "The code is honest. People are kind." First quoted in M1L4 block 6. May reappear when SME-vs-codebase tension surfaces in later lessons.
- Maya's gathering habit, now canonical: read the code first, list three sharp questions, then book the SME. Cross-referenced from Module 4 onward when she trains the apprentice on the same habit.
```

Extend the existing `GET /books` entry in **API entities**:

```markdown
### GET /books
Search the catalog.
- Path: GET /v1/books
- Query params: q (string, required, search term). limit (integer, optional, default 25, max 100).
- Auth: Authorization: Bearer $GF_TOKEN.
- 200 response shape: { "results": [ { "id": "bk_184932", "title": "...", "available_branches": ["branch_north"] } ], "total": <int> }.
- 400 response: when q is missing or empty. (Open question Maya pinned for Devon: should this be 422? Resolution deferred.)
- Other errors documented elsewhere: 401, 429 (from pilot M1L2 context).
- Source of truth for handler behavior: routes/books.py. Source of truth for response contract: openapi.yaml.
```

**Legacy assets and includes to handle in the M1L4 PR (grep-confirm before each delete):**

The legacy `informationgathering.md` references the following. Each must be confirmed unique-to-this-lesson via `grep -r` across `_docs/`, `_includes/`, and `_data/` before deletion.

Orphaned image assets (grep-confirm unique to this lesson):

- `assets/images/api-documentation-audience.svg`
- `assets/images/code-samples-example.svg`
- `assets/images/documentation-lifecycle.svg`
- `assets/images/api-documentation-process.svg` (referenced only by the legacy `image:` frontmatter, dropped under the lean schema)
- `assets/images/gaurav.svg`: **shared across many lessons; DO NOT delete.**

Orphaned data files (grep-confirm unique to this lesson):

- `_data/api_documentation_faqs.yml` (referenced by legacy `faq-section.html`).
- `_data/informationgathering_questions.yml` (referenced by legacy `quiz.html`).

To strip from the lesson body during the rewrite (naturally absorbed by replacing the file content):

- All inline `<script>` and `<style>` blocks (~150 lines combined).
- All inline AdSense `<script>` + `<ins>` blocks (replaced by the two `{% include ad-slot.html %}` slots between blocks 2-3 and 8-9).
- References to legacy includes: `enhanced_note.html`, `enhanced_dropdown.html`, `optimized-image.html`, `faq-section.html`, `key_takeaways.html`, `quiz.html`, `related_resources.html`. The includes themselves remain in `_includes/` because other lessons still use them; only this lesson's references are removed.
- The inline "interactive demo" JS for the documentation structure builder (lines 217 to 318 of the legacy file). Replaced by the lesson's `hover-tooltip` sources-map SVG.
- The `<div class="author-cta">` + social share block plus its inline `<style>` (lines 513 to 580 of the legacy file). Not replaced; lesson chrome is layout-controlled.

Tailwind safelist: no additions needed. The hover-tooltip pattern uses classes already in the safelist from M1L1.

---

## Section 4. Sequencing and PR plan.

**Prerequisites. Verify present in master at branch start:**

- `_includes/signoff.html`, `_includes/callout.html` (with `exercise` and `warning` variants), `_includes/mermaid.html`, `_includes/interactive-svg.html`, `_includes/ad-slot.html`, `_includes/glossary-term.html`. All shipped before the pilot.
- `assets/js/interactive-svg.js` supports the `hover-tooltip` pattern, with the M1L1 bug fixes from commits 78993c8 (tooltip clipping) and bbb4fb3 (mermaid contrast, SVG click).
- `assets/js/mermaid-init.js` (theme override).
- `scripts/voice-check.rb` and `scripts/voice-check.sh` (voice linter).
- `docs/superpowers/greenfield-bible.md` (universe canon).
- `_data/glossary.yml` exists. **Confirmed**: neither `schema` nor `OpenAPI` is in the file as of master @ 089e60f; this PR adds them along with `source of truth` and `SME`.
- `_data/modules.yml` contains the M1L4 entry with the em dash; this PR removes it.
- `_docs/audiences-humans-and-agents.md`: **confirmed absent** as of master @ 089e60f. M1L4's `next_page` link will 404 until a stub or the full M1L5 lesson ships. See Section 5 Risk 1.

**Branching state at session start (2026-05-22).**

- M1L1 merged to master at commit `089e60f`.
- M1L3 (`rewrite/whatwritersdo`) merged to master at commit `089e60f` (PR #11).
- M1L4 branches off master at `089e60f`. No carry-over dependencies. No callout-markdownify workaround needed (already fixed). No mermaid-CSS workaround needed (already fixed). No SVG tooltip workaround needed (already fixed).

**Build order (14 steps).** Dependencies are explicit below. Steps marked **[indep]** can run in any order; chained dependencies are explicit.

**[indep]** = independent (can run any time after step 2).
**[chain: X]** = depends on step X.

1. **Switch to master, fast-forward, and create branch.** `git checkout master && git pull origin master && git checkout -b rewrite/informationgathering`. (Current branch at session start was `rewrite/whatwritersdo`; switching required before any M1L4 edits.)
2. **Prerequisite verification.** Confirm each item from the Prerequisites list above. For files expected absent (`_docs/audiences-humans-and-agents.md`), confirm absent. Smoke-build clean master: `npm run build:css && bundle exec jekyll build` exits zero.
3. **Spec and plan are local-only.** Both `docs/superpowers/specs/2026-05-22-m1l4-informationgathering-design.md` and the upcoming `docs/superpowers/plans/2026-05-22-m1l4-informationgathering-plan.md` live under the gitignored `docs/superpowers/` tree (per commit `ca165960`, 2026-05-20: "chore: remove internal files from git tracking"). They are working artifacts, not part of any commit. **No commit step is required for the spec or plan.** The first committed artifact on this branch is the glossary update in step 4.
4. **Glossary additions** to `_data/glossary.yml`. **[indep]** Append `source of truth`, `SME`, `schema`, `OpenAPI` per Section 3. First committed change on the branch.
5. **Modules.yml em-dash cleanup.** **[indep]** Apply the diff in Section 3.
6. **Frontmatter rewrite** of `_docs/informationgathering.md`. **[indep]** Replace the legacy ~35-line frontmatter with the lean Section 3 version. Establishes title, permalink, module, lesson at the top of the file before prose draft.
7. **Prose draft** of blocks in order 3 → 4 → 5 → 6 → 1 → 2 → 7 → 8 → 9 → 10. **[chain: 6]** Substance-first order per parent spec Section 5. Block 4 uses `<!-- SVG: hover-tooltip, doc-page-in-centre, four-source-boxes -->` placeholder until step 9. Two `{% include ad-slot.html %}` inserts at the parent-spec positions (between blocks 2-3 and 8-9). The prose rewrite naturally replaces all inline `<script>`/`<style>` blocks, AdSense inline, legacy include references, the interactive-demo JS, and the author-cta block; no separate strip step needed for in-file content.
8. **Mermaid in block 3** using the 3-participant / 8-message sequenceDiagram from Section 2. **[chain: 7]**
9. **Interactive SVG** at `assets/svg/informationgathering/main.svg`. **[indep, but use step 7 block 4 wording as input once available]** Pattern `hover-tooltip`. Layout, tooltips, accessibility, style, and weight target per Section 2. Can be drafted in parallel with step 7 once block 4 wording is settled.
10. **File-system legacy cleanup.** **[indep]** Grep-confirm orphan status of the five image assets and two data files per Section 3, then delete. Use `grep -rln '<basename>'` across `_docs/`, `_includes/`, `_data/`, `_layouts/`, and `assets/`. If grep returns any reference outside this lesson, do NOT delete; flag in the PR description.
11. **Greenfield bible additions** per Section 3. **[indep]** Timeline M1L4 entry, GET /books API entity extension, three Locked details entries. The bible is also gitignored per commit `ca165960`; this edit is a local-only artifact. Not part of any commit. Track in the PR description as a universe canon update for future writer reference.
12. **Voice pass.** **[chain: 7, 8]** `ruby scripts/voice-check.rb _docs/informationgathering.md` exits zero. Fix every hit. Read the lesson out loud at desk volume. **Watch specifically for hyphenated compound modifiers this lesson invites**: "code-first", "load-bearing", "subject-matter", "doc-page", "open-source", "machine-readable", "Tuesday-morning", "self-implicating", "ten-minute", "sticky-note". Rewrite each as plain text per CLAUDE.md active habit 6. Fallback if `voice-check.rb` errors out: hand-grep for em dashes (`—`), en dashes (`–`), emoji codepoints, and each phrase from the parent spec Section 3 AI tell ban list.
13. **Local build verify.** **[chain: all prior]** `npm run build:css && bundle exec jekyll build` clean. Open `_site/informationgathering.html` in a browser at desktop (1280 pixels) and mobile (375 pixels) widths. Verify each: Mermaid renders with cream background; SVG sources map displays cleanly; each source box hover shows tooltip; tooltip dismisses on Escape, scroll, and outside click; tab order through SVG is source boxes 1 to 4 then doc-page fields top to bottom; focus ring (ink color) visible on each; Enter/Space triggers tooltip; touch tap on mobile shows tooltip and dismisses on tap-outside; reading time chrome shows "15 min".
14. **HTMLProofer.** **[chain: 13]** `bundle exec htmlproofer _site/informationgathering.html --swap-urls '^/apidocumentation:'` exits zero. Per CLAUDE.md infrastructure habit 7.

**PR details.**

- **Branch:** `rewrite/informationgathering`
- **Title:** `Rewrite: Information gathering and interviewing the codebase`
- **Description:** Definition of Done checklist from parent spec Section 4, ticked. Plus a paragraph covering: four new glossary terms (`source of truth`, `SME`, `schema`, `OpenAPI`); bible additions (Timeline M1L4 entry, GET /v1/books extension with `limit`, `400`, Devon's canonical line; Locked details for the first live endpoint and Maya's gathering habit); modules.yml em-dash cleanup; the `next_page` placeholder-link 404 risk and chosen mitigation.

**Pre-merge gates (full list from parent spec Section 4):**

- `bundle exec jekyll build` exits zero.
- `npm run build:css` exits zero.
- `ruby scripts/voice-check.rb _docs/informationgathering.md` exits zero.
- No Liquid errors and no missing-include warnings.
- HTMLProofer clean with `--swap-urls '^/apidocumentation:'`.
- All four block-7 glossary chips resolve (`source of truth`, `SME`, `schema`, `OpenAPI`).
- Frontmatter complete and `module: 1` / `lesson: 4` reconcile with `_data/modules.yml`.

**Human review gate.** Gaurav reads end-to-end at desktop and mobile breakpoints. Devon's earned joke ("The code is honest. People are kind.") gets a thumbs up or thumbs down. The four-source frame either lands or feels too tidy; if too tidy, soften block 3's "I count four" into a more explicit invitation to find a fifth.

**Post-merge tracking (non-blocking under curricular-order phasing per CLAUDE.md):**

- 15-minute retro at `docs/superpowers/specs/retros/informationgathering.md` within 24 hours of merge. Three notes max.
- GA4 engagement against the legacy 30-day baseline for `/informationgathering.html` continues but does not block subsequent lesson rewrites.

**Time estimate.** 10 to 14 hours of writer time across 2 to 3 working days. SVG is the bottleneck (hover-tooltip with four source boxes plus four doc-page-field elements plus four connecting lines, all keyboard-navigable, is slightly more work than M1L1's SVG was). Within parent spec's per-lesson budget.

---

## Section 5. Risks.

Three severity tiers.

**High. Must verify during build:**

1. **`next_page` points to a placeholder URL that 404s until M1L5 ships.** `_docs/audiences-humans-and-agents.md` is confirmed absent from master @ 089e60f. Three mitigation options at PR review time:
   - **(a) Accept the temporary 404** for narrative continuity (the M1L4 teaser sets up M1L5's content; pointing at M2L1 instead creates a worse discontinuity). Re-verify at M1L5 ship.
   - **(b) Point `next_page` at `/restAPI.html`** and revise the diary teaser to be less M1L5-specific.
   - **(c) Create a minimal stub** `_docs/audiences-humans-and-agents.md` in the same PR (frontmatter only, body says "This lesson is being written; see /restAPI.html in the meantime"). Avoids 404 without changing the M1L4 teaser.

   Recommendation: **(c)** if the stub can be authored in under fifteen minutes, otherwise **(a)**. Decision deferred to Gaurav at PR review.

2. **Stack-pick fragility.** Block 4 shows Python with Flask. A reader using JS, Node, Go, or Ruby may dismiss the lesson as "not my stack." Mitigation: explicit one-line disclaimer at the top of block 4 ("The code below is Python with Flask. Your codebase may be Node or Go. The four sources are the same in any stack."). The four-source frame is stack-agnostic; the snippets are illustration only.

3. **Schema-mismatch teaching beat may confuse beginners.** Block 4 shows the OpenAPI YAML declaring `q` as required but not declaring `limit`, while the handler accepts and caps `limit`. Maya pins this as a question for Devon. Risk: a reader unfamiliar with OpenAPI sees the mismatch and concludes "OpenAPI is unreliable." Mitigation: Maya frames it explicitly as a normal occurrence and the exact kind of thing the writer's job is to surface. Voice pass watches for absolute claims either way.

**Medium. Handle in design:**

4. **Devon's earned joke ("The code is honest. People are kind.") is wry, not laugh-out-loud.** Maya's voice favors dry over zany. Parent spec DoD requires the joke to "read as funny to at least one other human." Risk: Gaurav thumbs-down at review. Mitigation: the line is short, self-contained, and load-free; if it fails, cut entirely and put a different Devon line in block 6 (drafted at review time, not pre-built).

5. **SVG visual similarity to M1L1.** Both lessons use `hover-tooltip`. M1L1 was two-card REQUEST/RESPONSE layout; M1L4 is centre-and-spokes sources map. Different layouts, different teaching beats. A reader skimming both lessons may register them as similar at first glance. Mitigation: confirmed via Section 2 layout description that the SVGs visually read as different shapes. Risk is low; track and move on if it surfaces in retro.

6. **Four sources may not generalize to every endpoint.** Some endpoints have no traditional route handler (GraphQL resolvers, generated stubs, webhook receivers). Block 3 acknowledges this with Maya's "I count four. You may find a fifth." But a reader at the very beginning may take "four" as gospel. Mitigation: lock the wording so Maya is clearly stating an opinion. Voice pass enforces.

7. **Devon-as-SME conflation.** "Devon is the SME for the endpoint he built." True for this lesson. But SMEs are not always engineers. Later lessons will introduce PMs and security folks as SMEs. M1L4 should not over-claim "SME equals engineer." Block 7 chip definition handles this ("An engineer is the SME for an endpoint they built."). The hedge is explicit. Voice pass confirms.

**Low. Track and move on:**

8. **AI tool rotation gap.** M1L4 uses Cursor. Lesson sequence so far: GPT (M1L1), Claude (pilot M1L2), Claude (M1L3), Cursor (M1L4). Gemini and other tools have not appeared yet. Risk: rotation lopsided. Mitigation: lock Cursor for M1L4 (best fit); pick Gemini or a competitor for M1L5+.

9. **Voice linter on hyphens this lesson is likely to invite.** Compound modifiers waiting to trip up: "code-first", "load-bearing", "subject-matter", "doc-page", "open-source", "machine-readable", "self-implicating", "ten-minute", "Tuesday-morning". Each must be rewritten as plain text. Mitigation: voice pass step in build order (step 12) catches all.

10. **The 400 vs 422 question Maya pins for Devon is left unresolved in the lesson.** Maya states it as a question, does not answer. Risk: reader expects closure. Mitigation: leaving questions unresolved is part of the lesson's central point ("the questions only a person can answer"). Full resolution surfaces in Module 4's `errors-that-help.html` lesson (per parent spec Section 1 module map).

11. **SEO description change.** Legacy description was ~280 characters and keyword-stuffed (every API-related noun jammed in). New description is 135 characters and human-readable. SEO ranking on this URL may dip short-term. Mitigation: accept the trade. Page body content carries the actual keyword signal. Track in GA4 post-merge.

12. **Code-sample drift.** The Flask handler, OpenAPI YAML, and pytest snippets in block 4 are illustrative. If a later lesson reuses any of them, drift between lessons creates inconsistency. Mitigation: bible's API entities section records the canonical `GET /books` shape (params, response, errors); future lessons reconcile against the bible, not against M1L4's snippet.

---

## Locked decisions log.

- **Central argument.** Read the codebase first, the SME last. Four sources: route handler, schema, tests, SME. (Locked 2026-05-22.)
- **Opening scene.** Tuesday morning of story week 2. Devon swivels his monitor, leaves for standup, Maya alone with the codebase. The first live Greenfield endpoint ships that afternoon at 4 PM. (Locked 2026-05-22.)
- **Block 4 deep dive shape.** Four code snippets (Flask handler, OpenAPI YAML, two pytest cases), then the SVG sources map. Maya narrates what she extracted from each. Block 4 closes with the three-sources-to-the-fourth asymmetry. (Locked 2026-05-22.)
- **Block 8 AI tool.** Cursor. Matches the lesson's central act (reading a codebase). Widens the rotation. (Locked 2026-05-22.)
- **Earned joke.** Devon's line: "The code is honest. People are kind." Lands in block 6 (the trap). First lesson where the joke is not in block 1. Subject to Gaurav's thumbs-up at PR review. (Locked 2026-05-22.)
- **Frontmatter approach.** Lean field set matching M1L3. `previous_page` included; `next_page` points at M1L5 placeholder slug with documented 404 risk and three mitigation options. (Locked 2026-05-22.)
- **Branch name.** `rewrite/informationgathering`. (Locked 2026-05-22.)
- **SVG pattern.** `hover-tooltip` (M1L1 bug fixed in master). Sources map layout (centre-and-spokes), distinct from M1L1's two-card layout. (Locked 2026-05-22.)
- **Glossary additions.** Four entries this PR: `source of truth`, `SME`, `schema`, `OpenAPI`. The actual `_data/glossary.yml` did not contain `schema` or `OpenAPI` despite parent spec Section 7 listing both as seed; this PR brings actual file in line with the spec. (Locked 2026-05-22.)
- **Stack pick.** Python with Flask, OpenAPI YAML, pytest. Illustrative only; lesson opens block 4 with explicit stack-agnostic framing. (Locked 2026-05-22.)
- **Universe additions.** First live Greenfield API endpoint is `GET /v1/books`, ships Tuesday afternoon of story week 2. Maya's gathering habit (code first, three sharp questions, then SME) is now canonical. Devon's "The code is honest. People are kind." is canonical from M1L4 forward. (Locked 2026-05-22.)

---

## Changelog.

- **2026-05-22. v0.1.** All five sections drafted, self-reviewed, fixes applied inline. Branch state at draft time: master @ 089e60f with M1L1 and M1L3 both merged.
- **2026-05-22. v0.4 (fourth polish pass).** Six structural gaps closed.
  - **Block 1 opens with direct M1L3 callback.** "Last week I told you the codebase has opinions. Today we find out which ones." Lesson visibly delivers the previous lesson's promise.
  - **Block 3 self-implicating, not lecturing.** Maya names her own past mistake ("for my first eight years writing API docs, I did this the wrong way") instead of describing what "writers" do wrong. Voice rule: self-deprecating, never aimed at the reader.
  - **Triangulation insight moved from block 4 to block 3.** Block 4 close cleans up to two beats (asymmetry + inner-Maya) rather than three. Block 3 absorbs triangulation as a natural extension of the four-source intro: "some doc-page fields have more than one source; when they agree, the field is a contract; when they disagree, you have a question for the SME."
  - **Block 9 self-check tightened.** ~50 → ~40 words. Compound question, one sentence.
  - **Mermaid label specificity.** "the questions left" → "three sharp questions." Ties to the asymmetry punchline.
  - **Glossary entries land harder.** `source of truth` gets a concrete codebase example. `SME` adds a PM example beside the engineer example, so the term reads as person-not-engineer.
  - **Word count target essentially flat** at ~2,010 words (block 1 +20, block 3 +20, block 4 -40, block 9 -10). Reading time unchanged at 16 minutes.
- **2026-05-22. v0.3 (third polish pass).** Six deeper gaps closed.
  - **Central argument sharpened (block 3).** Added the bolded reframe: "Read code first not to replace the SME interview but to make the SME interview the highest-leverage twenty minutes of your week." Repeats in Maya's block 3 opinion paragraph.
  - **Emotional arc named (block 4 close).** Added inner-Maya beat: "I had been ready to write the doc page before reading the code. Reading the code, I realized I had been ready to write a wrong doc page." Names the arc the lesson has been carrying since 9:30.
  - **Multi-source triangulation insight added (block 4 close).** Where two sources agree, the field is a contract worth documenting. Where they disagree, it is a question for the SME.
  - **Block 5 exercise gets concrete fallback.** `tiangolo/full-stack-fastapi-postgresql` as the recommended repo for readers without their own codebase open. Plus a closing line tying the exercise to the lesson: "the question you would have wasted twenty minutes of the kickoff meeting figuring out you needed to ask."
  - **Block 6 covers non-REST stacks.** One parenthetical line for GraphQL and gRPC writers: same four sources, different file names.
  - **Block 8 AI prompt more resilient.** Status code line softened ("from code, tests, or error catalog if your codebase has one") so the prompt works in codebases without a formal error catalog. Watch-for note sharpened with the exact pushback line ("name three questions, do not generalize").
  - **Word count revised from ~1,860 to ~2,020. Reading time bumped from 15 to 16 minutes.** Inside the 12 to 18 target. Frontmatter and modules.yml diff updated to match.
- **2026-05-22. v0.2 (world-class polish pass).** Sixteen story-craft, teaching, and visual gaps addressed.
  - **Block 1.** Stake seeded: Maya thinks she knows GET /books from Devon's coffee description; by 10:10 she will know one thing she did not. Devon's quote rewritten ("see what you find" replaces dismissive "knock yourself out"). Time math fixed (forty minutes, not 9:30-to-10:00).
  - **Block 3.** Restructured as wrong-then-right per parent spec voice rule. Opens with the failed 60-minute SME interview pattern; introduces the four-source shift.
  - **Block 4.** Reframed as progressive revelation, not list. Four explicit revelations: handler reveals limit defaults, schema reveals the mismatch, tests reveal which behaviors are contractual, SME pin reveals what code cannot say. Adds M1L3 callback ("the codebase has opinions") at the schema-mismatch beat. Adds 9:50 time-check. Asymmetry sharpened: three sources took twenty minutes; the SME questions fit on a sticky note.
  - **Block 6.** Joke given context. Maya tells the reader the postmortem moment where she first heard Devon say "The code is honest. People are kind." Joke lands with weight.
  - **Block 7.** Chip prose drafted in spec, ~135 words.
  - **Block 9.** Self-check collapsed to one question that tests recall (25/100 detail) AND seeds M1L5 (developer reader vs. chatbot reader).
  - **Block 10.** Teaser sharpened to "chatbot reading her the wrong call numbers" per parent spec M1L5 description.
  - **Section 2.** OpenAPI YAML inlined (no `$ref` to undeclared schema). SVG focus ring changed to ink (avoids copper clash). Mermaid alt text adds teaching beat. Interactive-svg include `alt` parameter drafted.
  - **Section 3.** Bible Timeline story-date precision tightened ("five days after Priya's two-graphs conversation"). Bible quote on Devon's "code is honest" line now records the postmortem context.
  - **Section 4.** Step dependencies marked explicit `[indep]` and `[chain: X]`. Sticky-note added to hyphen watchlist.
  - **Word count target.** Revised from ~1,710 to ~1,860 (reading time 15.4 minutes; still inside 12 to 18 target).
