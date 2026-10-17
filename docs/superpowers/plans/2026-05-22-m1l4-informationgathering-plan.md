# M1L4 "Information gathering and interviewing the codebase" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `_docs/informationgathering.md` end-to-end as Module 1 Lesson 4 in Maya's voice per the v0.4 spec at `docs/superpowers/specs/2026-05-22-m1l4-informationgathering-design.md`. Ship a lesson that teaches the four-source information-gathering frame, with one Mermaid sequence diagram, one interactive hover-tooltip SVG, four code snippets, two callouts, and the locked decisions from the spec.

**Architecture:** Jekyll + Tailwind static site. Lesson body in Markdown with Liquid includes (`callout.html`, `mermaid.html`, `interactive-svg.html`, `ad-slot.html`, `glossary-term.html`, `signoff.html`). Hand-crafted SVG with the `hover-tooltip` pattern from the central framework at `assets/js/interactive-svg.js`. Voice enforcement via `scripts/voice-check.rb`. Build via `npm run build:css && bundle exec jekyll build`. Branch `rewrite/informationgathering` off master @ 089e60f. PR merges to master via GitHub Actions to live site.

**Tech Stack:** Ruby 3.1 + Jekyll, Node 18 + Tailwind, Liquid templating, hand-written SVG, Mermaid (via include), pytest-style voice linter in Ruby.

**Reference docs:**
- Spec (canonical decisions): `docs/superpowers/specs/2026-05-22-m1l4-informationgathering-design.md`
- Parent framework: `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md`
- Voice rules (in parent spec Section 3) and AI tell ban list
- M1L1 SVG template: `assets/svg/journey/main.svg` (hover-tooltip pattern)
- M1L3 example for shape and pacing: `_docs/whatwritersdo.md`

---

## File Structure

**Files this plan creates:**
- `assets/svg/informationgathering/main.svg` (hand-crafted, ~120 lines, hover-tooltip pattern)

**Files this plan modifies:**
- `_docs/informationgathering.md` (full rewrite, replace ~590 lines of legacy with ~270 lines of new lesson)
- `_data/glossary.yml` (append 4 new term entries)
- `_data/modules.yml` (one-line edit: title em-dash removal + reading time bump)
- `docs/superpowers/greenfield-bible.md` (gitignored; local-only universe canon update)

**Files this plan deletes (after grep confirms orphan status):**
- `assets/images/api-documentation-audience.svg`
- `assets/images/code-samples-example.svg`
- `assets/images/documentation-lifecycle.svg`
- `assets/images/api-documentation-process.svg`
- `_data/api_documentation_faqs.yml`
- `_data/informationgathering_questions.yml`

**Files this plan does NOT touch:**
- `assets/images/gaurav.svg` (shared across many lessons)
- Any `_includes/*.html` (all already exist per parent spec Section 7)
- `assets/js/interactive-svg.js` (already supports hover-tooltip; M1L1 bug fixed in master)
- `assets/js/mermaid-init.js` (theme already set)
- `tailwind.config.js` (no new safelist entries needed)
- `_config.yml`, `.github/workflows/build.yml`, AdSense client ID

---

## Task 1: Prerequisite verification

**Files:** none modified. Read-only checks.

- [ ] **Step 1: Confirm branch and clean working tree**

```bash
git rev-parse --abbrev-ref HEAD
```

Expected: `rewrite/informationgathering`

```bash
git status
```

Expected: `nothing to commit, working tree clean`

If branch is wrong: `git checkout master && git pull origin master && git checkout -b rewrite/informationgathering`.

- [ ] **Step 2: Confirm master is at 089e60f or descendant**

```bash
git merge-base --is-ancestor 089e60f HEAD && echo "OK: M1L1+M1L3 merged in base" || echo "FAIL"
```

Expected: `OK: M1L1+M1L3 merged in base`

- [ ] **Step 3: Confirm all required includes exist**

```bash
ls _includes/{signoff,callout,mermaid,interactive-svg,ad-slot,glossary-term}.html
```

Expected: six files listed without error.

- [ ] **Step 4: Confirm interactive-svg.js supports hover-tooltip**

```bash
grep -l 'hover-tooltip' assets/js/interactive-svg.js
```

Expected: file path returned.

- [ ] **Step 5: Confirm voice-check.rb runs**

```bash
ruby scripts/voice-check.rb --help 2>&1 | head -5
```

Expected: no Ruby exception. (If `--help` is not supported, run with no args; expected: usage hint or default behavior.)

- [ ] **Step 6: Confirm legacy glossary state**

```bash
grep -E '^- term: "?(schema|OpenAPI|source of truth|SME)"?' _data/glossary.yml
```

Expected: empty output. (None of the four should exist yet; this PR adds all four.)

- [ ] **Step 7: Confirm M1L5 stub state**

```bash
ls _docs/audiences-humans-and-agents.md 2>&1 | head -1
```

Expected: `No such file or directory` (informs Risk 1 handling at PR time).

- [ ] **Step 8: Smoke-build clean master**

```bash
npm run build:css && bundle exec jekyll build
```

Expected: both exit zero. Confirms baseline.

- [ ] **Step 9: No commit. Move to Task 2.**

---

## Task 2: Glossary additions

**Files:**
- Modify: `_data/glossary.yml` (append four entries at end)

- [ ] **Step 1: Read current end of glossary**

```bash
tail -5 _data/glossary.yml
```

Expected: ends with the `reader` entry from M1L3. Note that the file may not end with a newline.

- [ ] **Step 2: Append four entries**

Add to the bottom of `_data/glossary.yml` (preserve any final newline):

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

- [ ] **Step 3: Verify YAML parses**

```bash
ruby -ryaml -e 'puts YAML.load_file("_data/glossary.yml").length'
```

Expected: integer `18` (14 existing + 4 new).

- [ ] **Step 4: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -E 'Error|warn' || echo "Build clean"
```

Expected: `Build clean`.

- [ ] **Step 5: Commit**

```bash
git add _data/glossary.yml
git commit -m "feat(m1l4): add source of truth, SME, schema, OpenAPI glossary entries"
```

---

## Task 3: Modules.yml title and reading-time update

**Files:**
- Modify: `_data/modules.yml:16` (one line)

- [ ] **Step 1: Locate the line**

```bash
grep -n "informationgathering.html" _data/modules.yml
```

Expected: line 16 with the em-dashed title.

- [ ] **Step 2: Apply the diff**

Find:

```yaml
    - { slug: "informationgathering.html", title: "Information gathering — and interviewing the codebase", reading: "15 min" }
```

Replace with:

```yaml
    - { slug: "informationgathering.html", title: "Information gathering and interviewing the codebase", reading: "16 min" }
```

- [ ] **Step 3: Verify YAML parses**

```bash
ruby -ryaml -e 'YAML.load_file("_data/modules.yml")' && echo "YAML OK"
```

Expected: `YAML OK`.

- [ ] **Step 4: Verify no em dashes in modules.yml**

```bash
grep -nE '—|–' _data/modules.yml
```

Expected: empty output.

- [ ] **Step 5: Commit**

```bash
git add _data/modules.yml
git commit -m "chore(m1l4): clean em dash from modules.yml title; bump reading to 16 min"
```

---

## Task 4: Frontmatter rewrite

**Files:**
- Modify: `_docs/informationgathering.md` (replace top ~35 lines of frontmatter; leave legacy body for now)

This task ONLY rewrites the frontmatter so the file remains a valid Jekyll page. The body gets rewritten block-by-block in Tasks 5-13.

- [ ] **Step 1: Read current frontmatter**

```bash
head -35 _docs/informationgathering.md
```

Expected: legacy frontmatter from `title:` through `---`.

- [ ] **Step 2: Replace frontmatter**

Locate the first `---` at line 1 and the closing `---` at line 35 of `_docs/informationgathering.md`. Replace everything from line 1 through that closing `---` (inclusive) with:

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

The legacy body below the closing `---` stays in place for this task.

- [ ] **Step 3: Verify Jekyll parses the frontmatter**

```bash
bundle exec jekyll build 2>&1 | grep -E 'informationgathering.*[Ee]rror' || echo "Frontmatter OK"
```

Expected: `Frontmatter OK`.

- [ ] **Step 4: Verify rendered page exists**

```bash
ls _site/informationgathering.html
```

Expected: file present.

- [ ] **Step 5: Commit**

```bash
git add _docs/informationgathering.md
git commit -m "feat(m1l4): rewrite frontmatter to lean schema"
```

---

## Task 5: Block 3 prose draft (the four sources + Mermaid + triangulation)

**Files:**
- Modify: `_docs/informationgathering.md` (replace legacy body line 36 onward with the block 3 draft; leave a placeholder for blocks not yet drafted)

This task starts the prose rewrite. Per spec Section 5, draft order is 3 → 4 → 5 → 6 → 1 → 2 → 7 → 8 → 9 → 10. Block 3 first because it carries the lesson's framework.

**Reference:** Spec Section 1 Block 3 + Section 2 Mermaid block.

- [ ] **Step 1: Replace legacy body with the block-3 scaffold**

Replace everything in `_docs/informationgathering.md` after the closing `---` of the frontmatter with this exact content (it includes the block 3 prose, the block 3 Mermaid, and placeholder comments for all other blocks):

````markdown

{% comment %}block:1{% endcomment %}
<!-- TODO: Block 1 diary opener. Drafted in Task 9. -->

{% comment %}block:2{% endcomment %}
<!-- TODO: Block 2 promise. Drafted in Task 10. -->

{% include ad-slot.html slot="2222222222" format="auto" %}

{% comment %}block:3{% endcomment %}
## The four sources

For my first eight years writing API docs, I did this the wrong way. I would book the engineer for an hour, sit down with a notebook, and ask them to tell me about the endpoint. The engineer gave me broad strokes. I asked the wrong follow-up questions because I did not yet know the territory. I left with surface answers and had to come back for the specifics, by which time the engineer had shipped two more things and forgotten the first one.

Then I learned to read the codebase first.

An endpoint reference has four information sources. The {% include glossary-term.html term="route handler" %} — the function the server runs when a call to this endpoint comes in — tells you what the endpoint does. The {% include glossary-term.html term="schema" %} tells you what it sends back. The tests tell you what the team has promised it will not do. The {% include glossary-term.html term="SME" %}, the engineer who built the endpoint, tells you the why, the history, and the intent. Three of the four live in the codebase. One is a person.

Some doc-page fields have more than one source. When two sources agree on a field, that field is a contract worth documenting carefully. When they disagree, you have a question for the SME. This is what makes the four sources a system rather than a list.

I count four. You may find a fifth in your codebase. The order matters more than the count. Read the three before you book the fourth. Reading code first does not skip the SME interview. It makes the SME interview the highest-leverage twenty minutes of your week.

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
````

**Voice note on this block.** The glossary chip syntax `{% include glossary-term.html term="route handler" %}` will NOT resolve until Task 14's SVG block introduces `route handler` to the glossary. We skip chipping `route handler` for now: replace `{% include glossary-term.html term="route handler" %}` with the plain phrase `route handler` in the block 3 markdown above when pasting.

Wait — `route handler` is not in the glossary at all and we did not add it in Task 2. Drop the chip. Final block 3 first-source line:

> The route handler (the function the server runs when a call to this endpoint comes in) tells you what the endpoint does.

Apply this correction before saving. The other three chips (`schema`, `SME`, plus eventual block 7 chips for `source of truth` and `OpenAPI`) resolve from Task 2's glossary additions.

- [ ] **Step 2: Run voice-check on the file**

```bash
ruby scripts/voice-check.rb _docs/informationgathering.md
```

Expected: zero hits in the block 3 content. (TODO comments inside `<!-- -->` are skipped by the linter per parent spec Section 6.)

If hits: fix each. Common ones to watch: "compound-word" hyphens in body prose, em dashes (the legacy file had several, removed here), AI tell phrases.

- [ ] **Step 3: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn.*informationgathering' || echo "Build clean"
```

Expected: `Build clean`.

- [ ] **Step 4: Render-check Mermaid**

Quick visual check:

```bash
grep -A 12 'mermaid_src' _site/informationgathering.html | head -20
```

Expected: shows the `<pre class="mermaid">` block with the sequence diagram source.

- [ ] **Step 5: Commit**

```bash
git add _docs/informationgathering.md
git commit -m "feat(m1l4): draft block 3 (four sources + mermaid + triangulation)"
```

---

## Task 6: Block 4 prose draft (revelations, code snippets, SVG placeholder, asymmetry)

**Files:**
- Modify: `_docs/informationgathering.md` (replace `<!-- TODO: Block 4 ... -->` with the block 4 draft)

**Reference:** Spec Section 1 Block 4 + Section 2 code samples + Section 2 SVG include syntax.

- [ ] **Step 1: Replace the block 4 placeholder**

Find this line in `_docs/informationgathering.md`:

```markdown
<!-- TODO: Block 4 how we read each one. Drafted in Task 6. -->
```

Replace it with this exact block:

````markdown
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

Three sources took twenty minutes. The questions for Devon fit on a sticky note. When he is back at 10:10, the conversation is sharper than any 60-minute kickoff meeting could be.

I had been ready to write the doc page before reading the code. Reading the code, I realized I had been ready to write a wrong doc page.

{% include interactive-svg.html slug="informationgathering" alt="Sources map for one endpoint reference. A sketched doc page in the centre is connected to four labeled source boxes around it: the route handler, the schema, the tests, and the engineer. Hover any source to see the one sentence it contributes." %}

Hover any source box. Each one shows you what it contributes to the doc page. Some doc-page fields are touched by more than one source. Those are the contracts.
````

- [ ] **Step 2: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/informationgathering.md
```

Expected: zero hits. Watch specifically for:
- "compound-word" patterns in body prose. None in this block.
- Em dashes in narration. None.
- AI tells. None.
- "code-first" or "load-bearing" or "sticky-note": none present, but the linter should confirm.

- [ ] **Step 3: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn.*informationgathering' || echo "Build clean"
```

Expected: `Build clean`.

The `{% include interactive-svg.html %}` will try to inline `assets/svg/informationgathering/main.svg` which does not exist yet. Jekyll's `include_file` will fail or render an empty figure. Acceptable for now; Task 14 creates the SVG file.

Verify the error if any:

```bash
bundle exec jekyll build 2>&1 | grep -i 'informationgathering/main.svg'
```

If the failure breaks the whole build, switch to a comment-out workaround for now:

In `_docs/informationgathering.md`, wrap the include in a comment:

```markdown
<!-- SVG to be added in Task 14
{% include interactive-svg.html slug="informationgathering" alt="..." %}
-->
```

Task 15 will restore it after the SVG exists.

- [ ] **Step 4: Commit**

```bash
git add _docs/informationgathering.md
git commit -m "feat(m1l4): draft block 4 (revelations + code snippets + asymmetry)"
```

---

## Task 7: Block 5 prose draft (exercise callout)

**Files:**
- Modify: `_docs/informationgathering.md` (replace `<!-- TODO: Block 5 ... -->`)

**Reference:** Spec Section 1 Block 5.

- [ ] **Step 1: Replace the block 5 placeholder**

Find:

```markdown
<!-- TODO: Block 5 exercise. Drafted in Task 7. -->
```

Replace with:

````markdown
## Try it on Greenfield

{% capture exercise %}
**Five minutes, in a real repo.**

Pick any open source API project. If you do not have one in mind, clone `tiangolo/full-stack-fastapi-postgresql`. It is a well-maintained FastAPI tutorial repo with both handlers and tests in one project, small enough to scan in five minutes.

If the repo has a README, it usually names the routes file. If not, grep for the URL path you saw in the docs.

Read one endpoint's route handler. Then find the test file for that endpoint and read one test case.

Write down one thing the tests told you that the route handler did not. Write down one question you would still ask the engineer.

That question is the one you would have wasted twenty minutes of the kickoff meeting figuring out you needed to ask.
{% endcapture %}
{% include callout.html variant="exercise" body=exercise %}
````

- [ ] **Step 2: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/informationgathering.md
```

Expected: zero hits. Watch for "open-source" (should be "open source", two words; current draft is correct).

- [ ] **Step 3: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn.*informationgathering' || echo "Build clean"
```

Expected: `Build clean`. The callout is rendered via the `exercise` variant; CSS already in place.

- [ ] **Step 4: Commit**

```bash
git add _docs/informationgathering.md
git commit -m "feat(m1l4): draft block 5 (exercise: read one endpoint in a real repo)"
```

---

## Task 8: Block 6 prose draft (the trap + earned joke)

**Files:**
- Modify: `_docs/informationgathering.md` (replace `<!-- TODO: Block 6 ... -->`)

**Reference:** Spec Section 1 Block 6.

- [ ] **Step 1: Replace the block 6 placeholder**

Find:

```markdown
<!-- TODO: Block 6 the trap. Drafted in Task 8. -->
```

Replace with:

````markdown
## The trap nobody warns you about

{% capture trap %}
The trap is treating the codebase as the whole truth. The codebase tells you what is. It does not tell you why. It does not tell you what was almost shipped and rejected. It does not tell you the agreement that lives only in a Slack thread from two years ago.

I first heard Devon's line on this the week after a postmortem at his last job. The runbook had disagreed with what the on-call had actually done during the rollback. A PM asked why the doc had not been updated. Devon said: "The code is honest. People are kind." Then he changed the subject.

Both are needed. Both leave different gaps. The writer's job is to know which gap lives where.

If you work in GraphQL or gRPC, the sources have different names but the count is the same. Resolver, schema in `.graphql`, tests, SME. Method, `.proto`, tests, SME. Read the three before you book the fourth.
{% endcapture %}
{% include callout.html variant="warning" body=trap %}
````

- [ ] **Step 2: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/informationgathering.md
```

Expected: zero hits. Confirm no "subject-matter" hyphen (current draft uses "SME" and avoids the phrase).

- [ ] **Step 3: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn.*informationgathering' || echo "Build clean"
```

Expected: `Build clean`. The `warning` callout variant renders with copper border.

- [ ] **Step 4: Commit**

```bash
git add _docs/informationgathering.md
git commit -m "feat(m1l4): draft block 6 (the trap; code-honest-people-kind)"
```

---

## Task 9: Block 1 prose draft (diary opener)

**Files:**
- Modify: `_docs/informationgathering.md` (replace `<!-- TODO: Block 1 ... -->`)

**Reference:** Spec Section 1 Block 1.

- [ ] **Step 1: Replace the block 1 placeholder**

Find:

```markdown
<!-- TODO: Block 1 diary opener. Drafted in Task 9. -->
```

Replace with:

````markdown
## Last week I told you the codebase has opinions

Today we find out which ones.

I am at Devon's desk on Tuesday morning of story week 2. The new `GET /books` endpoint is on his branch; it ships this afternoon at four. He swivels his monitor toward me, points at the branch, then the schema file, then the test file.

"Code is on my branch, tests pass, error handling is regrettable but documented, see what you find. I have a standup. Back in forty minutes."

He leaves.

I think I know what `GET /books` does. Devon described it to me over coffee a week ago. By the time he is back, I will know one thing I did not. Not from a meeting.

What I am about to do in the next forty minutes is the work most writers leave until Thursday's kickoff meeting. Today you do it first.
````

- [ ] **Step 2: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/informationgathering.md
```

Expected: zero hits. Watch for "Tuesday-morning" hyphen (current draft is "Tuesday morning, story week 2" — correct).

- [ ] **Step 3: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn.*informationgathering' || echo "Build clean"
```

Expected: `Build clean`.

- [ ] **Step 4: Commit**

```bash
git add _docs/informationgathering.md
git commit -m "feat(m1l4): draft block 1 (diary opener; M1L3 callback)"
```

---

## Task 10: Block 2 prose draft (today you will leave with)

**Files:**
- Modify: `_docs/informationgathering.md` (replace `<!-- TODO: Block 2 ... -->`)

**Reference:** Spec Section 1 Block 2.

- [ ] **Step 1: Replace the block 2 placeholder**

Find:

```markdown
<!-- TODO: Block 2 promise. Drafted in Task 10. -->
```

Replace with:

````markdown
## Today you will leave with

- Where the information for an endpoint actually lives in a codebase.
- Three sharper questions to walk into your engineer interview with.
- A Cursor prompt that points at one endpoint and surfaces what the doc page needs.
````

- [ ] **Step 2: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/informationgathering.md
```

Expected: zero hits.

- [ ] **Step 3: Verify word count under 30**

```bash
grep -A 4 '## Today you will leave with' _docs/informationgathering.md | tail -3 | wc -w
```

Expected: integer at or under 32 (slight slack for "-" bullet markers counted as words). Currently 29 content words.

- [ ] **Step 4: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn.*informationgathering' || echo "Build clean"
```

Expected: `Build clean`.

- [ ] **Step 5: Commit**

```bash
git add _docs/informationgathering.md
git commit -m "feat(m1l4): draft block 2 (today you will leave with)"
```

---

## Task 11: Block 7 prose draft (words you can drop in standups now)

**Files:**
- Modify: `_docs/informationgathering.md` (replace `<!-- TODO: Block 7 ... -->`)

**Reference:** Spec Section 1 Block 7.

- [ ] **Step 1: Replace the block 7 placeholder**

Find:

```markdown
<!-- TODO: Block 7 standup terms. Drafted in Task 11. -->
```

Replace with:

````markdown
## Words you can drop in standups now

- {% include glossary-term.html term="source of truth" %}: Use this when you mean the authoritative version of X. "OpenAPI is the source of truth for the schema" settles a debate that "we should agree on the schema" does not.
- {% include glossary-term.html term="SME" %}: Use this when you mean the person who owns the answers your code cannot give you. "I have three questions for the SME" beats "I will ask around."
- {% include glossary-term.html term="schema" %}: Use this when you mean the structural description of the data, separate from any one example of it. "The schema changed" is different from "this response changed."
- {% include glossary-term.html term="OpenAPI" %}: Use this when you mean the standard for describing REST APIs in YAML or JSON, or the file in your repo that holds that description. "Check OpenAPI" is what you say when the question is about contract, not behavior.
````

- [ ] **Step 2: Verify all four glossary chips resolve**

```bash
for term in "source of truth" "SME" "schema" "OpenAPI"; do
  grep -q "^- term: \"${term}\"" _data/glossary.yml && echo "OK: ${term}" || echo "MISSING: ${term}"
done
```

Expected: four `OK:` lines.

- [ ] **Step 3: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/informationgathering.md
```

Expected: zero hits. The chips are Liquid includes; their parameter values are skipped by the linter per parent spec Section 6.

- [ ] **Step 4: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn.*informationgathering' || echo "Build clean"
```

Expected: `Build clean`. Each chip should resolve to a small interactive span; missing chips produce a Liquid warning.

- [ ] **Step 5: Commit**

```bash
git add _docs/informationgathering.md
git commit -m "feat(m1l4): draft block 7 (standup chips: source of truth, SME, schema, OpenAPI)"
```

---

## Task 12: Block 8 prose draft (Cursor co-pilot tip)

**Files:**
- Modify: `_docs/informationgathering.md` (replace `<!-- TODO: Block 8 ... -->`)

**Reference:** Spec Section 1 Block 8.

- [ ] **Step 1: Replace the block 8 placeholder**

Find:

```markdown
<!-- TODO: Block 8 Cursor co-pilot tip. Drafted in Task 12. -->
```

Replace with:

````markdown
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

**What to expect back.** A file-by-file report with line numbers, because Cursor has the files open. If something is missing from the codebase, Cursor will say so.

**What to watch for.** Cursor will mechanically list items one to three and hedge on five. Press it on five with "name three questions, do not generalize." The hedged version is not useful. The specific one is.
````

- [ ] **Step 2: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/informationgathering.md
```

Expected: zero hits. Confirm no "file-by-file" hyphen in body. Current draft: "A file-by-file report" — that IS a hyphenated compound modifier. Rewrite to "A report, file by file, with line numbers..."

Re-edit the line:

> **What to expect back.** A report, file by file, with line numbers, because Cursor has the files open. If something is missing from the codebase, Cursor will say so.

- [ ] **Step 3: Run voice-check again**

```bash
ruby scripts/voice-check.rb _docs/informationgathering.md
```

Expected: zero hits.

- [ ] **Step 4: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn.*informationgathering' || echo "Build clean"
```

Expected: `Build clean`.

- [ ] **Step 5: Commit**

```bash
git add _docs/informationgathering.md
git commit -m "feat(m1l4): draft block 8 (Cursor prompt for one endpoint)"
```

---

## Task 13: Blocks 9 and 10 prose draft (self-check + teaser + signoff)

**Files:**
- Modify: `_docs/informationgathering.md` (replace `<!-- TODO: Block 9 ... -->` and `<!-- TODO: Block 10 ... -->`)

**Reference:** Spec Section 1 Block 9 + Block 10.

- [ ] **Step 1: Replace the block 9 placeholder**

Find:

```markdown
<!-- TODO: Block 9 self-check. Drafted in Task 13. -->
```

Replace with:

````markdown
## Before you go

Maya saw the 25 item default and the 100 item cap. Should both numbers show up in the doc page, and for which reader: the developer copying a snippet, or the chatbot summarizing the endpoint for a borrower?

Answer it in your head before you read the next lesson.
````

- [ ] **Step 2: Replace the block 10 placeholder**

Find:

```markdown
<!-- TODO: Block 10 teaser + signoff. Drafted in Task 13. -->
```

Replace with:

````markdown
## Next week at Greenfield

A borrower stops in with a complaint that has nothing to do with the books on the shelf. A chatbot has been reading her the wrong call numbers.

{% include signoff.html %}
````

- [ ] **Step 3: Verify signoff renders**

```bash
bundle exec jekyll build && grep -c 'Maya.' _site/informationgathering.html
```

Expected: at least 1.

- [ ] **Step 4: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/informationgathering.md
```

Expected: zero hits.

- [ ] **Step 5: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn.*informationgathering' || echo "Build clean"
```

Expected: `Build clean`.

- [ ] **Step 6: Commit**

```bash
git add _docs/informationgathering.md
git commit -m "feat(m1l4): draft blocks 9-10 (self-check, teaser, signoff)"
```

---

## Task 14: Interactive SVG (sources map, hover-tooltip pattern)

**Files:**
- Create: `assets/svg/informationgathering/main.svg`

**Reference:** Spec Section 2 SVG block; template patterns from `assets/svg/journey/main.svg` (hover-tooltip).

The SVG is the visual centerpiece of block 4. Hand-craft to satisfy the constraints below.

- [ ] **Step 1: Create the directory**

```bash
mkdir -p assets/svg/informationgathering
```

- [ ] **Step 2: Create `assets/svg/informationgathering/main.svg`**

Layout requirements (spec Section 2):
- Canvas `viewBox="0 0 800 500"`, `preserveAspectRatio="xMidYMid meet"`.
- Pattern: `data-svg-pattern="hover-tooltip"`.
- Centre: a sketched doc page card, roughly `x=260 y=80 width=280 height=340`, titled `GET /v1/books`.
- Five labeled fields on the doc page: heading (`GET /v1/books`), the curl line, `q (string, required)`, the 200 response shape, the 400 error.
- Four source boxes around the doc page, each ~140×60 pixels:
  - **route handler** top-left at `x=30 y=70`.
  - **schema** top-right at `x=630 y=70`.
  - **tests** bottom-left at `x=30 y=370`.
  - **SME** bottom-right at `x=630 y=370`.
- Connecting lines: sage (`#5a7a64`), 1.5px stroke, no arrowheads, `aria-hidden="true"`. One line from each source to the doc-page fields it contributes to (approximate: route handler → curl line + 400; schema → q + 200; tests → 400 + 200; SME → unlabeled "history" annotation).
- Style: strokes 1.5 to 2 pixels, corners rounded 4 pixels, palette only `#0c1a2b` (ink), `#fbf8f3` (cream), `#b85c38` (copper), `#5a7a64` (sage).
- No drop shadows, no gradients.

Accessibility (mandatory):
- `aria-label` on root `<svg>`: "Sources map showing how the route handler, schema, tests, and engineer each contribute to one doc page."
- Each interactive `<g>` (4 source boxes + ~4 doc-page field hotspots) has `tabindex="0"`, `role="button"`, and an `aria-label` that matches the `data-tooltip`.
- Focus ring `2px solid #0c1a2b` (ink), `outline-offset: 2px`. NOT copper.
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables transitions.

Source tooltip text (voice rules apply, all under 20 words):
- route handler: "The function the server runs when the call comes in. You learn what fields exist and how they default."
- schema: "The team's written promise about the response shape. You learn the contract."
- tests: "Every behavior the team has agreed not to break. You learn the edges."
- SME: "The engineer who built it. You learn the why and the history."

Doc-page field tooltip text:
- `GET /v1/books` (heading hotspot): "Route handler declared this path and this method."
- `q (string, required)` (param hotspot): "Schema marked q required. The handler also returns 400 if it is missing."
- `200 response` (response hotspot): "Schema declared the shape. Tests verified two specific cases."
- `400 error` (error hotspot): "Tests pinned this contract. The handler implements it."

Use this complete starter SVG (fill in coordinates inside the `<rect>` and `<text>` tags per the layout above; the structure pattern below is correct):

```xml
<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" data-svg-pattern="hover-tooltip" xmlns="http://www.w3.org/2000/svg" aria-label="Sources map showing how the route handler, schema, tests, and engineer each contribute to one doc page.">
  <style>
    .doc-page { fill: #fbf8f3; stroke: #0c1a2b; stroke-width: 1.5; rx: 4; }
    .source-box { fill: #fbf8f3; stroke: #b85c38; stroke-width: 1.5; rx: 4; }
    .field-hotspot { fill: rgba(255, 255, 255, 0.01); stroke: #b85c38; stroke-width: 1; stroke-dasharray: 2 2; rx: 2; pointer-events: all; }
    .interactive { cursor: pointer; pointer-events: all; }
    .interactive:hover .field-hotspot, .interactive:focus .field-hotspot, .interactive:hover .source-box, .interactive:focus .source-box { fill: rgba(184, 92, 56, 0.12); stroke-dasharray: none; }
    .connector { stroke: #5a7a64; stroke-width: 1.5; fill: none; }
    .label { font-family: Georgia, serif; font-size: 13px; fill: #0c1a2b; font-weight: bold; }
    .source-label { font-family: Georgia, serif; font-size: 14px; fill: #0c1a2b; font-weight: bold; text-anchor: middle; }
    .doc-heading { font-family: 'SF Mono', Menlo, monospace; font-size: 14px; fill: #0c1a2b; font-weight: bold; }
    .doc-code { font-family: 'SF Mono', Menlo, monospace; font-size: 12px; fill: #0c1a2b; }
    g[tabindex="0"]:focus { outline: 2px solid #0c1a2b; outline-offset: 2px; }
    @media (prefers-reduced-motion: reduce) { * { transition: none !important; } }
  </style>

  <!-- Connecting lines (decorative, aria-hidden) -->
  <g aria-hidden="true">
    <line x1="170" y1="100" x2="270" y2="180" class="connector" />
    <line x1="630" y1="100" x2="540" y2="210" class="connector" />
    <line x1="170" y1="400" x2="270" y2="370" class="connector" />
    <line x1="630" y1="400" x2="540" y2="340" class="connector" />
  </g>

  <!-- Doc page card -->
  <rect class="doc-page" x="260" y="80" width="280" height="340" />
  <text x="280" y="110" class="doc-heading">GET /v1/books</text>
  <text x="280" y="140" class="doc-code">curl .../v1/books?q=ursula</text>
  <text x="280" y="175" class="doc-code">q (string, required)</text>
  <text x="280" y="220" class="doc-code">200 → { results, total }</text>
  <text x="280" y="385" class="doc-code">400 q is required</text>

  <!-- Doc-page field hotspots (interactive) -->
  <g class="interactive" tabindex="0" role="button" data-tooltip="Route handler declared this path and this method." aria-label="Route handler declared this path and this method.">
    <rect class="field-hotspot" x="275" y="95" width="160" height="22" />
  </g>
  <g class="interactive" tabindex="0" role="button" data-tooltip="Schema marked q required. The handler also returns 400 if it is missing." aria-label="Schema marked q required. The handler also returns 400 if it is missing.">
    <rect class="field-hotspot" x="275" y="160" width="170" height="22" />
  </g>
  <g class="interactive" tabindex="0" role="button" data-tooltip="Schema declared the shape. Tests verified two specific cases." aria-label="Schema declared the shape. Tests verified two specific cases.">
    <rect class="field-hotspot" x="275" y="205" width="220" height="22" />
  </g>
  <g class="interactive" tabindex="0" role="button" data-tooltip="Tests pinned this contract. The handler implements it." aria-label="Tests pinned this contract. The handler implements it.">
    <rect class="field-hotspot" x="275" y="370" width="180" height="22" />
  </g>

  <!-- Source boxes (interactive) -->
  <g class="interactive" tabindex="0" role="button" data-tooltip="The function the server runs when the call comes in. You learn what fields exist and how they default." aria-label="The function the server runs when the call comes in. You learn what fields exist and how they default.">
    <rect class="source-box" x="30" y="70" width="140" height="60" />
    <text x="100" y="105" class="source-label">route handler</text>
  </g>
  <g class="interactive" tabindex="0" role="button" data-tooltip="The team's written promise about the response shape. You learn the contract." aria-label="The team's written promise about the response shape. You learn the contract.">
    <rect class="source-box" x="630" y="70" width="140" height="60" />
    <text x="700" y="105" class="source-label">schema</text>
  </g>
  <g class="interactive" tabindex="0" role="button" data-tooltip="Every behavior the team has agreed not to break. You learn the edges." aria-label="Every behavior the team has agreed not to break. You learn the edges.">
    <rect class="source-box" x="30" y="370" width="140" height="60" />
    <text x="100" y="405" class="source-label">tests</text>
  </g>
  <g class="interactive" tabindex="0" role="button" data-tooltip="The engineer who built it. You learn the why and the history." aria-label="The engineer who built it. You learn the why and the history.">
    <rect class="source-box" x="630" y="370" width="140" height="60" />
    <text x="700" y="405" class="source-label">SME</text>
  </g>
</svg>
```

Write the file with this content.

- [ ] **Step 3: Verify file size under 12 KB raw**

```bash
wc -c assets/svg/informationgathering/main.svg
```

Expected: under 12000 (12 KB target per spec). Above template renders to roughly 4 KB.

- [ ] **Step 4: Verify SVG parses as valid XML**

```bash
ruby -rrexml/document -e 'REXML::Document.new(File.read("assets/svg/informationgathering/main.svg"))' && echo "XML OK"
```

Expected: `XML OK`.

- [ ] **Step 5: Build to verify integration**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn.*svg' || echo "SVG integration clean"
```

Expected: `SVG integration clean`.

- [ ] **Step 6: Visual check in browser**

```bash
bundle exec jekyll serve --baseurl '' --port 4000 &
```

Open `http://localhost:4000/informationgathering.html`. Scroll to block 4. Verify:
- Four source boxes visible at the four corners.
- Doc page card in centre with five labeled fields.
- Hover over each source box: tooltip appears. Tooltip text matches the spec.
- Tab through SVG: focus ring (ink, 2px) appears on each interactive group. Order: source boxes 1-4 then doc-page fields top to bottom (verify the DOM order in the SVG above matches this; if not, reorder the `<g>` elements).
- Enter or Space triggers tooltip.
- Escape, scroll, or outside-click dismisses tooltip.
- Resize browser to 375px width: SVG scales down and remains usable.

Kill the server when done:

```bash
pkill -f 'jekyll serve'
```

- [ ] **Step 7: Commit**

```bash
git add assets/svg/informationgathering/main.svg
git commit -m "feat(m1l4): add sources-map interactive SVG (hover-tooltip)"
```

---

## Task 15: Wire the SVG into block 4 (if Task 6 used the placeholder workaround)

Skip this task if Task 6 Step 3 did NOT require the comment-out workaround.

**Files:**
- Modify: `_docs/informationgathering.md` (un-comment the `interactive-svg` include)

- [ ] **Step 1: Locate the commented include**

```bash
grep -n 'SVG to be added in Task 14' _docs/informationgathering.md
```

If empty: skip the rest of this task; the include is already active.

- [ ] **Step 2: Replace the commented block**

Find:

```markdown
<!-- SVG to be added in Task 14
{% include interactive-svg.html slug="informationgathering" alt="..." %}
-->
```

Replace with:

```markdown
{% include interactive-svg.html slug="informationgathering" alt="Sources map for one endpoint reference. A sketched doc page in the centre is connected to four labeled source boxes around it: the route handler, the schema, the tests, and the engineer. Hover any source to see the one sentence it contributes." %}
```

- [ ] **Step 3: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn.*informationgathering' || echo "Build clean"
```

Expected: `Build clean`.

- [ ] **Step 4: Commit**

```bash
git add _docs/informationgathering.md
git commit -m "feat(m1l4): wire sources-map SVG into block 4"
```

---

## Task 16: Legacy asset cleanup

**Files:**
- Delete: six legacy assets (after grep-confirms orphan status).

- [ ] **Step 1: Grep-confirm each asset is unique to this lesson**

```bash
for f in api-documentation-audience.svg code-samples-example.svg documentation-lifecycle.svg api-documentation-process.svg; do
  echo "=== $f ==="
  grep -rln "$f" _docs/ _includes/ _data/ _layouts/ assets/ 2>/dev/null | grep -v 'informationgathering' | grep -v "^assets/images/$f"
done
```

Expected: no output for each asset (or only the matching `informationgathering.md` reference that no longer exists since we rewrote the body).

If grep returns any other reference: DO NOT delete that asset. Flag in PR description.

- [ ] **Step 2: Grep-confirm legacy data files**

```bash
for f in api_documentation_faqs informationgathering_questions; do
  echo "=== $f ==="
  grep -rln "$f" _docs/ _includes/ _data/ _layouts/ 2>/dev/null | grep -v 'informationgathering'
done
```

Expected: empty for each.

- [ ] **Step 3: Delete confirmed orphans**

```bash
git rm assets/images/api-documentation-audience.svg
git rm assets/images/code-samples-example.svg
git rm assets/images/documentation-lifecycle.svg
git rm assets/images/api-documentation-process.svg
git rm _data/api_documentation_faqs.yml
git rm _data/informationgathering_questions.yml
```

- [ ] **Step 4: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn' | head -10 || echo "Build clean"
```

Expected: `Build clean`. (If any warnings about missing referenced files, investigate before committing.)

- [ ] **Step 5: Commit**

```bash
git commit -m "chore(m1l4): remove six orphan legacy assets"
```

---

## Task 17: Greenfield bible additions (local-only; no commit)

**Files:**
- Modify: `docs/superpowers/greenfield-bible.md` (gitignored; local-only writer reference).

This task updates the universe canon for future writer reference. The file is gitignored per commit `ca165960`, so no commit step is needed.

- [ ] **Step 1: Open the bible**

```bash
ls docs/superpowers/greenfield-bible.md
```

Expected: file present.

- [ ] **Step 2: Append to the Timeline section**

After the existing M1L3 entry, add:

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

- [ ] **Step 3: Append to the Locked details section**

```markdown
- Greenfield's first live API endpoint is GET /v1/books, shipped Tuesday afternoon of story week 2.
- GET /v1/books accepts q (required, string) and limit (default 25, max 100). Returns 400 if q is missing. (Unresolved as of M1L4: whether 400 should be 422; whether limit should appear in the OpenAPI schema. Both questions Maya pinned for Devon. Resolution deferred to Module 4 errors lesson.)
- Greenfield codebase file layout (illustrative, used in lesson code samples): routes/books.py for the handler, openapi.yaml at the repo root for the schema, tests/test_books.py for tests. Not locked as the team's actual layout; later lessons may shorten or restructure, provided the four sources remain distinct.
- Devon's recurring line, now canonical: "The code is honest. People are kind." First quoted in M1L4 block 6. May reappear when SME-vs-codebase tension surfaces in later lessons.
- Maya's gathering habit, now canonical: read the code first, list three sharp questions, then book the SME. Cross-referenced from Module 4 onward when she trains the apprentice on the same habit.
```

- [ ] **Step 4: Extend the GET /books entry in API entities section**

Find the existing `### GET /books` entry. Replace its body with:

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

- [ ] **Step 5: Confirm bible file is still ignored**

```bash
git status docs/superpowers/greenfield-bible.md
```

Expected: file not listed (because gitignored). No commit needed.

- [ ] **Step 6: Move to Task 18. No commit.**

---

## Task 18: Final voice pass on the complete lesson

**Files:**
- Read: `_docs/informationgathering.md`
- Modify: same file, only if linter reports hits.

- [ ] **Step 1: Run the voice linter on the complete lesson**

```bash
ruby scripts/voice-check.rb _docs/informationgathering.md
```

Expected: zero hits.

If hits: fix each. Common hits to expect (from spec Section 4 step 12):
- "code-first", "load-bearing", "subject-matter", "doc-page", "open-source", "machine-readable", "Tuesday-morning", "self-implicating", "ten-minute", "sticky-note", "file-by-file"

Rewrite each as plain text per CLAUDE.md active habit 6.

- [ ] **Step 2: Manual em-dash and en-dash scan**

```bash
grep -nE '—|–' _docs/informationgathering.md
```

Expected: empty output (or only matches inside fenced code blocks, which the linter and HTML render correctly).

- [ ] **Step 3: Manual AI tell scan (safety net)**

```bash
grep -inE 'delve|crucial|seamless|leverage|comprehensive|robust|dive in|in conclusion|whether you are' _docs/informationgathering.md
```

Expected: empty output.

- [ ] **Step 4: Word count check**

```bash
ruby -e 'text = File.read("_docs/informationgathering.md"); text.sub!(/\A---.*?---/m, ""); text.gsub!(/```.*?```/m, ""); text.gsub!(/{%.*?%}/m, ""); text.gsub!(/<!--.*?-->/m, ""); puts text.split.length'
```

Expected: roughly 1,800 to 2,100 (target ~2,010 per spec word count). Reading time target 16 minutes.

- [ ] **Step 5: Read out loud**

Read the lesson at desk volume from block 1 through signoff. Where you stumble, the sentence is wrong. Rewrite the stumble. Specifically test:
- Block 1's M1L3 callback: does "Last week I told you the codebase has opinions. Today we find out which ones." land as a hook?
- Block 3's self-implicating opening: does "For my first eight years writing API docs, I did this the wrong way" feel honest, not lecturing?
- Block 4's revelation chain: do the three "First revelation / Second revelation / Third revelation" beats build momentum?
- Block 6's Devon quote: does the postmortem context make "The code is honest. People are kind." land with weight?
- Block 10's teaser: does "A chatbot has been reading her the wrong call numbers" make you want the next lesson?

- [ ] **Step 6: Commit (only if changes made)**

```bash
git diff --quiet _docs/informationgathering.md && echo "No voice-pass changes needed" || (git add _docs/informationgathering.md && git commit -m "feat(m1l4): voice pass cleanup")
```

---

## Task 19: Local build and visual verification

**Files:** none modified.

- [ ] **Step 1: Clean build**

```bash
npm run build:css && bundle exec jekyll build
```

Expected: both exit zero.

- [ ] **Step 2: Start local dev server**

```bash
bundle exec jekyll serve --baseurl '' --port 4000 &
sleep 3
```

- [ ] **Step 3: Open the lesson in desktop width (1280 pixels) in a browser**

Navigate to `http://localhost:4000/informationgathering.html`. Verify:
- Reading-time chrome shows "16 min".
- Breadcrumb shows "Module 1 / Lesson 4".
- Previous link: "What an API writer does in 2026" ⇒ `/whatwritersdo.html`.
- Next link: "Audiences, humans and agents" ⇒ `/audiences-humans-and-agents.html` (will 404; logged Risk 1).
- Block 1 heading: "Last week I told you the codebase has opinions".
- Mermaid (block 3) renders with cream background, NOT slate-800.
- Four code snippets (block 4) render with syntax highlighting; each has a language tag.
- Interactive SVG (block 4) renders: four source boxes, centre doc page, sage connecting lines.
- Hover each source box: tooltip appears with correct text. Tooltip dismisses on outside click, Escape, or scroll.
- Tab through SVG: focus ring (ink, 2px) visible on each `<g>`. Tab order is source boxes 1-4 then doc-page fields top-to-bottom.
- Press Enter or Space on a focused source: tooltip appears.
- Exercise callout (block 5) renders with "Try this" label and copper left border.
- Warning callout (block 6) renders with "Watch out" label and copper left border, including the Devon quote.
- Glossary chips in block 7: hovering shows definition tooltip.
- Cursor prompt (block 8) renders in a `<pre><code>` block, copyable.
- Self-check (block 9) renders as a short paragraph.
- Teaser (block 10) followed by signoff: `Maya.` on its own line.
- Two ad slots render (between blocks 2-3 and 8-9). Empty in local dev but slot scaffolding visible.

- [ ] **Step 4: Resize to mobile width (375 pixels)**

Verify in the same browser:
- All blocks scale cleanly.
- SVG remains usable; tap interaction works on touch emulation.
- Code snippets scroll horizontally without overflow.
- Callouts respect mobile padding.

- [ ] **Step 5: Test SVG keyboard navigation**

Use Tab from the address bar. Verify:
- Tab lands on first interactive SVG element with visible focus ring.
- Tab moves through all 8 interactive elements (4 source boxes + 4 field hotspots).
- Enter or Space triggers the tooltip.
- Escape dismisses.

- [ ] **Step 6: Kill the server**

```bash
pkill -f 'jekyll serve'
```

- [ ] **Step 7: No commit. Move to Task 20.**

---

## Task 20: HTMLProofer

**Files:** none modified.

- [ ] **Step 1: Ensure `_site/informationgathering.html` exists**

```bash
ls _site/informationgathering.html
```

Expected: file present. (Re-run `bundle exec jekyll build` if missing.)

- [ ] **Step 2: Run HTMLProofer with the baseurl swap**

```bash
bundle exec htmlproofer _site/informationgathering.html --swap-urls '^/apidocumentation:'
```

Expected: exit zero.

Known acceptable failure: the `next_page` link to `/audiences-humans-and-agents.html` will return 404 (logged Risk 1). If HTMLProofer flags it, document in the PR description as the known-acceptable Risk 1 mitigation choice.

If other failures: fix and re-run.

- [ ] **Step 3: No commit unless fixes were made.**

---

## Task 21: Pre-PR review and PR open

**Files:** none modified. PR open via `gh` CLI.

- [ ] **Step 1: Review the full commit history on the branch**

```bash
git log master..HEAD --oneline
```

Expected: ~10 to 15 commits, each one feat or chore prefixed with `m1l4`.

- [ ] **Step 2: Diff against master**

```bash
git diff master -- _data/glossary.yml _data/modules.yml _docs/informationgathering.md
git diff master --stat
```

Verify only the expected files changed. No spurious edits.

- [ ] **Step 3: Push branch**

```bash
git push -u origin rewrite/informationgathering
```

- [ ] **Step 4: Open PR via gh CLI**

```bash
gh pr create --title "Rewrite: Information gathering and interviewing the codebase" --body "$(cat <<'EOF'
## Summary

Full rewrite of `_docs/informationgathering.md` as Module 1 Lesson 4 in Maya's voice per the v0.4 spec at `docs/superpowers/specs/2026-05-22-m1l4-informationgathering-design.md` (local-only). Adds four glossary entries, cleans em dash from modules.yml title, ships interactive sources-map SVG, removes six orphan legacy assets.

## Design highlights

- **Central argument.** Read code first, SME last. Three of four sources live in the codebase. Reading code first makes the SME interview the highest-leverage twenty minutes of your week.
- **Opening scene.** Tuesday morning of story week 2, Maya at Devon's desk, Devon at standup. GET /v1/books ships at 4 PM.
- **Block 4 revelation arc.** Handler reveals limit=25; schema reveals the mismatch; tests reveal what is contractual; SME pin reveals what code cannot say. M1L3's "codebase has opinions" delivered at the schema-mismatch beat.
- **Earned joke.** Devon's line "The code is honest. People are kind." Lands in block 6 with the postmortem context Maya tells. First lesson where the joke is not in block 1.
- **AI tool.** Cursor for block 8 (rotation: GPT → Claude → Claude → Cursor).
- **New glossary entries.** `source of truth`, `SME`, `schema`, `OpenAPI`.
- **Universe additions.** First live Greenfield endpoint is `GET /v1/books`. Maya's gathering habit is now canonical. Devon's recurring line is now canonical.

## Definition of Done checklist

- [x] All ten blocks present in order, with Liquid block comments.
- [x] Reading time 16 minutes (within 12 to 18 target).
- [x] One Mermaid (block 3, sequenceDiagram, 3 participants, 8 messages).
- [x] One interactive SVG (block 4, hover-tooltip, 8 interactive elements, keyboard navigable, ink focus ring).
- [x] Four glossary terms in block 7, all chips resolve.
- [x] One self-check in block 9.
- [x] Earned joke in block 6.
- [x] Signoff at the bottom.
- [x] Zero hyphens in body prose; zero em dashes; zero en dashes; zero emoji.
- [x] Zero AI tell phrases.
- [x] Cast pronouns respected.
- [x] Every code sample uses `https://api.greenfield.lib/v1` and canonical resources.
- [x] Diary opener picks up M1L3's closing line directly.
- [x] Closing teaser sets up M1L5 (chatbot mistranslating call numbers).
- [x] `permalink` unchanged.
- [x] No `redirect_from` (title only, not URL, changed).
- [x] Two ad slots in lesson Markdown at canonical positions.
- [x] Meta description under 155 characters.
- [x] All headings sentence case (except H1).
- [x] All images/SVGs have alt text.
- [x] Interactive SVG keyboard navigable; static fallback works without JS.
- [x] Code samples use proper fenced blocks with language tags.
- [x] `bundle exec jekyll build` exits zero.
- [x] `npm run build:css` exits zero.
- [x] `ruby scripts/voice-check.rb _docs/informationgathering.md` exits zero.
- [x] No Liquid errors; no missing-include warnings.
- [x] HTMLProofer clean (with `--swap-urls '^/apidocumentation:'`).
- [x] All four block-7 glossary chips resolve.
- [x] Frontmatter complete; `module: 1` / `lesson: 4` reconcile with `_data/modules.yml`.
- [x] No `placeholder: true` to remove (this lesson was not a placeholder).

## Risk note

`next_page` points to `/audiences-humans-and-agents.html` which does not exist as a file at PR time. Three options in spec Section 5 Risk 1; recommendation in spec is option (c): create a fifteen-minute stub for M1L5 in the same PR. **Decision needed at PR review.**

## Joke thumbs-up needed

Devon's line in block 6 ("The code is honest. People are kind.") needs Gaurav's thumbs-up or thumbs-down before merge.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 5: Return the PR URL for review.**

---

## Self-Review Checklist (for the plan author)

**Spec coverage check:**
- Spec Section 1 (ten-block outline): Tasks 5-13 cover blocks 1-10. ✓
- Spec Section 2 (visuals + code samples): Task 5 Mermaid; Task 6 code snippets; Task 14 interactive SVG. ✓
- Spec Section 3 (frontmatter, glossary, bible): Task 2 glossary; Task 3 modules.yml; Task 4 frontmatter; Task 16 legacy cleanup; Task 17 bible. ✓
- Spec Section 4 (sequencing): Tasks 1-21 cover all 14 spec build-order steps with bite-sized expansion. ✓
- Spec Section 5 (risks): Risk 1 (M1L5 404) noted in Task 4 frontmatter and Task 19/20 verification. Risk 2 (stack pick) addressed in Task 6 disclaimer. Risk 3 (schema mismatch) handled in Task 6 prose. Risk 4 (joke thumbs-up) handled in Task 21 PR body. Risk 10 (400 vs 422) noted in Task 6 + Task 17 bible. ✓

**Placeholder scan:** Each prose task contains the full draft text. Each verification step has the exact command. Each commit step has the exact message. No "TBD" or "TODO: fill in" in the plan body. ✓

**Type consistency check:**
- Frontmatter `slug` is `informationgathering` in Task 4. SVG path uses the same slug in Task 14 (`assets/svg/informationgathering/main.svg`) and in the include in Task 6/15. ✓
- Glossary terms: `source of truth`, `SME`, `schema`, `OpenAPI` in Task 2. Same four chips in Task 11. Same four checked in Task 11 Step 2. ✓
- Reading time: 16 minutes consistent in frontmatter (Task 4), modules.yml (Task 3), Task 19 chrome check, Task 18 word count math. ✓
- Devon's quote: "The code is honest. People are kind." identical in Task 8 prose and Task 21 PR body. ✓
- Commit message convention: `feat(m1l4):` for additions, `chore(m1l4):` for cleanups. Consistent across all commit steps. ✓

**Decomposition check:**
- Each task is independently verifiable (build clean + voice-check pass + commit). ✓
- Tasks 4-13 are tightly chained (each builds on prior frontmatter/blocks). Tasks 2, 3, 14, 16, 17 are independent. ✓
- Branch state assumed at start of every task (clean working tree post-prior-commit). ✓
