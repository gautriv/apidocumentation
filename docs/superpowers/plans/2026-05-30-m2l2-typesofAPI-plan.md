# M2L2 typesofAPI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `_docs/typesofAPI.md` (Module 2 Lesson 2, Types of APIs) end-to-end in Maya's voice against the Phase 2 framework, preserving the `/typesofAPI.html` permalink, and ship the lesson with its Mermaid diagram, hand-authored 4-cell interactive SVG, four new glossary entries, bible updates, and four legacy orphan-asset deletions.

**Architecture:** Single lesson rewrite on its own branch `rewrite/typesofAPI`. The lesson is one Markdown file at `_docs/typesofAPI.md`, one SVG at `assets/svg/typesofAPI/main.svg`, four glossary entries appended to `_data/glossary.yml`, and five appended entries in `docs/superpowers/greenfield-bible.md` (one Timeline, four Locked details). Four legacy asset files get deleted. No new includes, no framework changes, no config changes.

**Tech Stack:** Jekyll 4.x, Liquid, Tailwind CSS (built via `npm run build:css`), Ruby 3.1+, hand-authored SVG using the existing `hover-tooltip` pattern in `assets/js/interactive-svg.js`. Mermaid renderer loaded by `_includes/mermaid.html`. Voice linter `scripts/voice-check.rb`. HTMLProofer for link verification.

**Source spec:** `docs/superpowers/specs/2026-05-30-m2l2-typesofAPI-design.md`. This plan does not duplicate the design rationale; it executes the spec.

**Convention vs M2L1:** M2L1's retro flagged that tasks 7-13 (one verbatim-paste task per block) were over-decomposed for the work they represented. M2L2's plan batches the eight verbatim-paste blocks (5, 6, 1, 2, 7, 8, 9, 10) into Task 7 with one sub-commit per block. Blocks 3 and 4 stay as separate tasks (Tasks 5 and 6) because they carry the heaviest substance, the Mermaid, and the SVG include.

---

## Files touched

- **Modify (full rewrite):** `_docs/typesofAPI.md` — drop legacy content, write the new 10-block lesson.
- **Create:** `assets/svg/typesofAPI/main.svg` — hand-authored interactive SVG, ~200 lines, `hover-tooltip` pattern, 4-cell whiteboard.
- **Modify (append):** `_data/glossary.yml` — append 4 entries (SOAP, GraphQL, gRPC, request envelope).
- **Modify (append):** `docs/superpowers/greenfield-bible.md` — append 1 Timeline entry and 4 Locked details entries.
- **Delete (orphan):** `assets/gif/webAPIs.gif`, `assets/images/api-categories-overview.svg`, `assets/images/rest-api-illustration.svg`, `assets/images/api-types-overview.svg`.

No other files are touched. `_data/modules.yml` already has the M2L2 slot; Task 1 verifies this.

---

## Task 1: Prerequisite verification

**Files:** none modified.

- [ ] **Step 1: Confirm working directory and git state.**

Run from the repo root `/Users/gauravtrivedi/Documents/live_projects/apidocumentation`:

```bash
git status
git branch --show-current
```

Expected: working tree clean (only `p.md` may be untracked), current branch is `master`.

- [ ] **Step 2: Confirm `_data/modules.yml` has M2L2 at the right slot.**

Run:

```bash
ruby -ryaml -e 'm = YAML.load_file("_data/modules.yml"); puts m[1]["lessons"][1].to_yaml'
```

Expected output includes `slug: typesofAPI.html` and `title: Types of APIs`.

- [ ] **Step 3: Confirm Phase 2 prerequisites exist on disk.**

Run all four commands:

```bash
ls _includes/callout.html _includes/interactive-svg.html _includes/signoff.html _includes/mermaid.html _includes/glossary-term.html _includes/ad-slot.html
ls assets/js/interactive-svg.js assets/js/mermaid-init.js
ls scripts/voice-check.rb
grep -c "'hover-tooltip'" assets/js/interactive-svg.js
```

Expected: all files listed; `grep` returns 1 or higher (the hover-tooltip pattern is registered).

- [ ] **Step 4: Confirm `callout.html` supports the `exercise` and `warning` variants.**

Run:

```bash
grep -E '"?(exercise|warning)"?' _includes/callout.html | head -5
```

Expected: at least two lines match. If empty, the Phase 2 callout variants have not landed; STOP and add the variants in a separate prerequisite branch before continuing.

- [ ] **Step 5: Confirm the voice linter runs against a known-clean file.**

Run:

```bash
ruby scripts/voice-check.rb _docs/restAPI.md && echo "OK"
```

Expected: prints `OK`. (M2L1 is the most recent shipped lesson and should pass cleanly.)

- [ ] **Step 6: Confirm `gh` CLI is authenticated (per M1L5 retro lesson).**

Run:

```bash
gh auth status 2>&1 | head -5
```

Expected: shows the active GitHub account. If not authenticated, run `gh auth login` interactively before opening the PR in Task 13.

- [ ] **Step 7: Confirm the four legacy orphan assets exist (so Task 10 can delete them).**

Run:

```bash
ls -la assets/gif/webAPIs.gif assets/images/api-categories-overview.svg assets/images/rest-api-illustration.svg assets/images/api-types-overview.svg
```

Expected: all four files exist. If any are missing, skip them in Task 10's deletion list.

- [ ] **Step 8: Confirm a clean baseline build.**

Run:

```bash
npm run build:css && bundle exec jekyll build 2>&1 | tail -20
```

Expected: no errors; exit 0. The build produces `_site/typesofAPI.html` from the legacy `_docs/typesofAPI.md`.

- [ ] **Step 9: Note the baseline reading time and word count of the legacy lesson** (used for the post-ship retro):

```bash
wc -w _docs/typesofAPI.md
```

Expected: a number (around 1800-2200 words for the legacy lesson, which is over the 12-18 minute target; the rewrite will trim).

No commit yet; this task only verifies state.

---

## Task 2: Create the rewrite branch and lay down the lesson skeleton

**Files:**
- Create branch: `rewrite/typesofAPI`
- Modify: `_docs/typesofAPI.md` (full rewrite, skeleton first)

- [ ] **Step 1: Create and switch to the rewrite branch.**

```bash
git checkout -b rewrite/typesofAPI
```

Expected: switched to a new branch.

- [ ] **Step 2: Replace `_docs/typesofAPI.md` with the skeleton.**

Replace the entire contents of `_docs/typesofAPI.md` with this exact content:

```markdown
---
title: "Types of APIs"
permalink: /typesofAPI.html
module: 2
lesson: 2
slug: typesofAPI
reading_time: 14
description: "Four API shapes a writer recognizes in 2026. Why Greenfield is REST, what SOAP, GraphQL, and gRPC would have cost instead."
previous_page:
  url: /restAPI.html
  title: "REST principles"
next_page:
  url: /anatomyofurl.html
  title: "Anatomy of a URL (part 1)"
---

{% comment %}block:1{% endcomment %}
## Three other shapes

<!-- TODO block:1 -->

{% comment %}block:2{% endcomment %}
## Today you will leave with

<!-- TODO block:2 -->

{% include ad-slot.html slot="lesson-mid-1" format="auto" %}

{% comment %}block:3{% endcomment %}
## Every shape is a set of commitments

<!-- TODO block:3 -->

{% comment %}block:4{% endcomment %}
## Name the shape on page one

<!-- TODO block:4 -->

{% comment %}block:5{% endcomment %}
<!-- TODO block:5 -->

{% comment %}block:6{% endcomment %}
<!-- TODO block:6 -->

{% comment %}block:7{% endcomment %}
## Words you can drop in standups now

<!-- TODO block:7 -->

{% include ad-slot.html slot="lesson-mid-2" format="auto" %}

{% comment %}block:8{% endcomment %}
## AI co pilot tip

<!-- TODO block:8 -->

{% comment %}block:9{% endcomment %}
## Before you go

<!-- TODO block:9 -->

{% comment %}block:10{% endcomment %}
## Next week at Greenfield

<!-- TODO block:10 -->

{% include signoff.html %}
```

- [ ] **Step 3: Verify the skeleton builds.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. The site builds; `_site/typesofAPI.html` contains the skeleton with `TODO` comments and the empty H2 headings.

- [ ] **Step 4: Verify the voice linter is happy with the skeleton.**

```bash
ruby scripts/voice-check.rb _docs/typesofAPI.md
```

Expected: passes. (Skeleton has no body prose, so no voice violations possible.)

- [ ] **Step 5: Commit the skeleton.**

```bash
git add _docs/typesofAPI.md
git commit -m "feat(m2l2): lesson skeleton with frontmatter and block markers"
```

---

## Task 3: Stub the interactive SVG so Block 4 references resolve

**Files:**
- Create: `assets/svg/typesofAPI/main.svg`

The real SVG lands in Task 11. This stub exists so Block 4's `{% include interactive-svg.html slug="typesofAPI" %}` resolves at build time without 404.

- [ ] **Step 1: Create the SVG directory.**

```bash
mkdir -p assets/svg/typesofAPI
```

- [ ] **Step 2: Write the stub SVG file at `assets/svg/typesofAPI/main.svg`.**

Exact content (a minimal valid SVG with the hover-tooltip pattern declared so the framework binds correctly but renders almost nothing):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;" data-svg-pattern="hover-tooltip" role="img" aria-label="Stub. Real SVG ships in Task 11.">
  <title>Stub SVG for M2L2; real 4-cell hover-tooltip whiteboard ships in Task 11.</title>
  <desc>Placeholder so the lesson build does not 404 on the interactive-svg include. Replaced in Task 11 with the four-shape comparison described in the spec.</desc>
  <rect x="0" y="0" width="800" height="600" fill="#fbf8f3" />
  <text x="400" y="300" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#0c1a2b">Interactive SVG placeholder. Real SVG ships in Task 11.</text>
</svg>
```

- [ ] **Step 3: Verify build still passes.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. The stub is valid SVG.

- [ ] **Step 4: Commit the stub.**

```bash
git add assets/svg/typesofAPI/main.svg
git commit -m "chore(m2l2): stub SVG so build passes; real SVG lands in Task 11"
```

---

## Task 4: Append the four new glossary entries

**Files:**
- Modify: `_data/glossary.yml`

- [ ] **Step 1: Append the four entries to the end of `_data/glossary.yml`.**

Append exactly these lines at the end of the file (preserve YAML indentation; entries start with `- term:` at column 0):

```yaml
- term: "SOAP"
  definition: "An API shape that wraps every call in an XML envelope. The contract is a WSDL file. Heavyweight, still in production at enterprise systems."
  link: "#"
- term: "GraphQL"
  definition: "An API shape with one endpoint, usually POST /graphql, where the client sends a query in the body and the server returns data shaped to match it."
  link: "#"
- term: "gRPC"
  definition: "An API shape that uses Protocol Buffers over HTTP/2. The contract is a .proto file, and the client is generated from it, not handwritten."
  link: "#"
- term: "request envelope"
  definition: "The shape of one API call before the response: which verb, which URL or endpoint, which headers, and what body or arguments travel with the request."
  link: "#"
```

Note: the spec's Section 4.2 also lists `see_also` arrays per entry. `_data/glossary.yml` historically has not used `see_also` (M2L1's appended entries don't either). Skip `see_also` to match the existing schema. If a future glossary refactor adds `see_also` support, the spec values can be backfilled then.

- [ ] **Step 2: Verify YAML still parses.**

```bash
ruby -ryaml -e 'g = YAML.load_file("_data/glossary.yml"); puts g.length; puts g.last(4).map { |e| e["term"] }.join(", ")'
```

Expected output: a number (total glossary entries) and `SOAP, GraphQL, gRPC, request envelope`.

- [ ] **Step 3: Verify build still passes.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 4: Commit.**

```bash
git add _data/glossary.yml
git commit -m "feat(m2l2): add 4 glossary entries (SOAP, GraphQL, gRPC, request envelope)"
```

---

## Task 5: Draft Block 3 (Every shape is a set of commitments) with the Mermaid

**Files:**
- Modify: `_docs/typesofAPI.md` (replace Block 3 TODO with prose + Mermaid)

Block 3 walks the four shapes (SOAP, GraphQL, gRPC, then REST as anchor) with the Asha-counterfactual frame. The Mermaid Note text is simplified to avoid parser ambiguity; the literal GraphQL query appears in the prose around the diagram in backticks (spec Section 3.1).

- [ ] **Step 1: Replace the Block 3 stub.**

Find the line `<!-- TODO block:3 -->` (under `## Every shape is a set of commitments`) and replace it with this exact content:

```markdown
Every shape is a set of commitments. An API picks one. Each shape commits the server, the client, the cache, and the doc page to a particular way of working. The shape is the contract.

Take {% include glossary-term.html term="SOAP" %} first. SOAP is XML in an envelope. Each call sends an envelope with a header and a body. The SOAPAction header tells the server which operation to run. The contract is a WSDL file. The cache stays out of it (every call is a POST to one URL). If Greenfield had shipped SOAP, Asha's email would have been "send us the WSDL" and Marginalia would have generated a client from it.

{% include glossary-term.html term="GraphQL" %} next. GraphQL is one endpoint, usually `POST /graphql`, with the query in the body. The contract is the schema. The cache stays out of it by default (every call is a POST). If Greenfield had shipped GraphQL, Asha would have asked for the schema and her code would have written a query for the fields she needed.

{% include glossary-term.html term="gRPC" %} last. gRPC is binary over HTTP/2. The contract is a `.proto` file and the wire format is Protocol Buffers. The client is generated from the proto. The cost is HTTP/2 support all the way down: browsers without grpc-web cannot talk to it, proxies that do not speak HTTP/2 drop the connection, and the cache cannot read it. If Greenfield had shipped gRPC, Asha would have asked for the proto file and Marginalia would have built the generated client into the Atlas service.

Two shapes Devon does not sketch this morning. WebSocket is a connection model, not a request shape, and gets its own lesson in Module 6. The older RPC family that gRPC modernized is more concept than working choice today.

{% include glossary-term.html term="REST" %} is the shape Greenfield ships. REST commits to HTTP verbs, URLs, and a body that is usually JSON. The cache holds GETs by default. The schema is optional. Greenfield ships OpenAPI alongside. REST's commitments happen to fit a public catalog API for an open web. That is why Greenfield is REST.

{% capture mermaid_src %}
sequenceDiagram
  participant Atlas
  participant API as Greenfield GraphQL
  Atlas->>API: POST /graphql
  Note over Atlas,API: Body carries a GraphQL query
  API-->>Atlas: 200 with data matching the query
  Note over API: One URL for everything. The query in the body says what to do.
{% endcapture %}
{% include mermaid.html content=mermaid_src alt="A sequence diagram. Atlas calls POST /graphql on Greenfield's GraphQL server. The request body carries a GraphQL query that asks for books matching mystery and asks for their title field. The server returns a 200 response with the data shaped to match the query. The diagram annotates that GraphQL uses one endpoint for everything and the query in the body says what to do. The cache is not depicted because by default it sits outside the call path." %}

Look at the diagram. GraphQL puts the question in the body. The body carries `query { books(q: "mystery") { title } }`. One endpoint, one POST, the query says what to do. The cache stays out of it.
```

- [ ] **Step 2: Run the voice linter on the lesson.**

```bash
ruby scripts/voice-check.rb _docs/typesofAPI.md
```

Expected: passes. Common gotchas to check in this block: any compound modifier like "in-context" or "doc-page" or "high-performance" — rewrite to remove the hyphen.

- [ ] **Step 3: Verify build still passes.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. Mermaid renders (visual verification waits until Task 12).

- [ ] **Step 4: Commit.**

```bash
git add _docs/typesofAPI.md
git commit -m "feat(m2l2): draft block 3 (every shape is a set of commitments) with GraphQL mermaid"
```

---

## Task 6: Draft Block 4 (Name the shape on page one) with the SVG include

**Files:**
- Modify: `_docs/typesofAPI.md` (replace Block 4 TODO with prose + interactive SVG include)

Block 4 is practitioner voice. Opens with the doc pattern, walks the four owing lists (REST, GraphQL, gRPC, SOAP — different order from Block 3 by design; spec Section 4.4), shows Greenfield's REST doc-page example with a curl, then the SVG include. Closes with the recognition pattern.

- [ ] **Step 1: Replace the Block 4 stub.**

Find the line `<!-- TODO block:4 -->` (under `## Name the shape on page one`) and replace it with this exact content:

````markdown
Every API doc has a first page. Its first sentence tells the reader what shape they are reading. Greenfield's reads "Greenfield is a REST API." Three words. Every reader after that sentence knows what to expect: a list of resources, HTTP verbs, JSON, and a cache that holds GETs.

The shape decides what the first page owes the reader.

A REST doc owes a resource list with verbs and paths, a base URL, an auth section, and one sample per resource that shows a successful call. A GraphQL doc owes a schema overview, a list of queries and mutations at the top level, and a playground link so the reader can run a query without writing code. A gRPC doc owes the proto file, the service list, and a code sample per supported language because the client is generated, not written. A SOAP doc owes the WSDL URL, an envelope template, and a list of operations the WSDL declares.

Greenfield's first page does the REST owing list. It opens with "Greenfield is a REST API," lists the six resources, and shows one `GET` example with a JSON response:

```bash
$ curl -H "Authorization: Bearer $GF_TOKEN" \
       "https://api.greenfield.lib/v1/books?q=mystery"
```

The page does the recognition work so the reader does not have to do it.

Devon's whiteboard appears below as a diagram. Four shapes, four request envelopes, one cell per shape. The REST cell is the actual shape Greenfield ships. The other three are counterfactual. Hover or tap a shape to read what Asha's email to Greenfield would have looked like in that shape. The hover text is the same content as the prose above, expressed as a short counterfactual. The prose and the hover are interchangeable.

{% include interactive-svg.html slug="typesofAPI" alt="Devon's whiteboard rendered as a four cell grid. In the top left, REST shows the request line GET /v1/books?q=mystery, with a small badge in the upper right reading the actual to mark it as the shape Greenfield ships. In the top right, SOAP shows the same query wrapped in an XML envelope with a SOAPAction header. In the bottom left, GraphQL shows POST /graphql with a body containing a query for books filtered by mystery, returning the title field. In the bottom right, gRPC shows SearchBooks called with the argument mystery, with a note that the call is binary over HTTP/2. Each cell has a label and a hover region. Hovering or tapping a cell reveals the counterfactual Asha email for that shape and what Greenfield's reply would owe back. Without hovering, the four request envelopes are all visible side by side." %}

The recognition pattern is small. Read the first sentence of the docs. Look at the request envelope of one endpoint. You have placed the API. Once you have placed it, every subsequent decision (which page to write, which sample to ship, which header to call out) follows the shape's owing list.
````

- [ ] **Step 2: Run the voice linter.**

```bash
ruby scripts/voice-check.rb _docs/typesofAPI.md
```

Expected: passes. Watch for: "high-performance" (drop), "top-level" (should be "at the top level"), "first-page" (should be "first page"), "owing list" (Maya's coinage; keep — not a hyphenated compound, just two words).

- [ ] **Step 3: Verify build.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. The interactive-svg include resolves to the stub from Task 3.

- [ ] **Step 4: Commit.**

```bash
git add _docs/typesofAPI.md
git commit -m "feat(m2l2): draft block 4 (name the shape on page one) with SVG include"
```

---

## Task 7: Draft the eight verbatim-paste blocks (5, 6, 1, 2, 7, 8, 9, 10)

**Files:**
- Modify: `_docs/typesofAPI.md` (replace TODO comments in blocks 5, 6, 1, 2, 7, 8, 9, 10)

Per M2L1 retro, the verbatim-paste blocks are batched into one task with one commit per block. Order matches M2L1's drafting order: callouts first (5, 6), then diary (1, 2), then standup-and-AI (7, 8), then close (9, 10).

Each step replaces one block's TODO with its verbatim content, runs the voice linter, verifies build, and commits.

### Sub-task 7A: Block 5 (Try it on Greenfield, exercise callout)

- [ ] **Step 1: Replace the Block 5 stub.**

Find the line `<!-- TODO block:5 -->` and replace it with this exact content:

```markdown
{% capture body %}
Open three public API doc home pages: Stripe at `stripe.com/docs/api`, GitHub's GraphQL API at `docs.github.com/graphql`, and gRPC's quickstart at `grpc.io/docs/what-is-grpc`. For each, find the first sentence or heading. Name the shape. Then pick one thing the page does because of the shape: a playground, a schema overview, a resource list with verbs, or a `.proto` reference. Write three lines per page: shape, evidence, one consequence.

Skipped SOAP on purpose. Most SOAP lives behind enterprise firewalls. If you can find a public SOAP doc home page in under a minute, the WSDL pointer is what you are looking for.
{% endcapture %}
{% include callout.html variant="exercise" body=body %}
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/typesofAPI.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: linter passes; build is clean.

- [ ] **Step 3: Commit.**

```bash
git add _docs/typesofAPI.md
git commit -m "feat(m2l2): draft block 5 (try it on Greenfield exercise)"
```

### Sub-task 7B: Block 6 (The trap, warning callout)

- [ ] **Step 1: Replace the Block 6 stub.**

Find the line `<!-- TODO block:6 -->` and replace it with this exact content:

```markdown
{% capture body %}
Plenty of APIs say they are REST. Many are not. They use HTTP, they return JSON, they have URLs. They also have `POST /users/123/activate`, `POST /products/find`, `GET /api/v1/get_user?id=123`. That is RPC underneath, with a REST sticker on the box.

Devon's check: read the URL pattern of three random endpoints. If the URLs name actions (`/activate`, `/find`, `/get_user`), the API is RPC in a REST jacket. The doc owes the reader an operation list, not a resource list. Pretending the API is REST when it is not makes the doc lie about what every call commits to.

The shape is what the API does, not what the marketing page says it does.
{% endcapture %}
{% include callout.html variant="warning" body=body %}
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/typesofAPI.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes. Note: `/get_user` has an underscore; this is the trap example showing RPC-flavored URLs. The linter should not flag underscores in code identifiers.

- [ ] **Step 3: Commit.**

```bash
git add _docs/typesofAPI.md
git commit -m "feat(m2l2): draft block 6 (the trap; RPC in a REST jacket)"
```

### Sub-task 7C: Block 1 (Diary opener with whiteboard joke)

- [ ] **Step 1: Replace the Block 1 stub.**

Find the line `<!-- TODO block:1 -->` (under `## Three other shapes`) and replace it with this exact content:

```markdown
Tuesday morning of story week 5. Devon pinged me Friday. *Come by Tuesday morning, I want to whiteboard three shapes we passed on.* I find him at the small whiteboard near his desk. Four sketches up: REST, SOAP, GraphQL, gRPC. Under SOAP he has written "1998" and below that, "still in production at your bank."

He turns. "Last week was one argument. Today is three."

Last week Asha wanted `POST /search` and Devon walked me through the verb. This morning he wants to show me the three shapes Greenfield could have shipped instead. Today you need to know which shape Greenfield is, because you start the advanced filter assignment this week, and a word on the doc page only means what it means once you know the shape.
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/typesofAPI.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes. Watch: "advanced filter" has no hyphen (bible-locked form); "story week 5" no hyphen; "still in production at your bank" no compound issues.

- [ ] **Step 3: Commit.**

```bash
git add _docs/typesofAPI.md
git commit -m "feat(m2l2): draft block 1 (diary opener with whiteboard joke)"
```

### Sub-task 7D: Block 2 (Today you will leave with)

- [ ] **Step 1: Replace the Block 2 stub.**

Find the line `<!-- TODO block:2 -->` (under `## Today you will leave with`) and replace it with this exact content:

```markdown
- How to recognize four API shapes by their request envelopes.
- What each shape commits to in one sentence.
- What the docs' first page owes the reader, shape by shape.
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/typesofAPI.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes.

- [ ] **Step 3: Commit.**

```bash
git add _docs/typesofAPI.md
git commit -m "feat(m2l2): draft block 2 (today you will leave with)"
```

### Sub-task 7E: Block 7 (Words you can drop in standups now)

- [ ] **Step 1: Replace the Block 7 stub.**

Find the line `<!-- TODO block:7 -->` (under `## Words you can drop in standups now`) and replace it with this exact content:

```markdown
{% include glossary-term.html term="SOAP" %}. Use this when someone says "the integration is SOAP" and you want to nod and ask "do you have the WSDL."

{% include glossary-term.html term="GraphQL" %}. Use this when someone says "they have a GraphQL endpoint" and you want to know what to ask for next: the schema.

{% include glossary-term.html term="gRPC" %}. Use this when someone says "the service is gRPC" and you want to ask "are we generating clients from the proto."

{% include glossary-term.html term="request envelope" %}. Use this when you mean "the shape of one call before the response comes back."
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/typesofAPI.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes. All four glossary terms resolve (added in Task 4).

- [ ] **Step 3: Commit.**

```bash
git add _docs/typesofAPI.md
git commit -m "feat(m2l2): draft block 7 (standup words with glossary chips)"
```

### Sub-task 7F: Block 8 (AI co pilot tip, GitHub Copilot Chat)

- [ ] **Step 1: Replace the Block 8 stub.**

Find the line `<!-- TODO block:8 -->` (under `## AI co pilot tip`) and replace it with this exact content:

````markdown
Tool: GitHub Copilot Chat (the chat panel in VS Code or your IDE of choice).

**The situation.** You inherit a codebase or a public schema link and you want to know which shape you are looking at before you write a single doc word. Useful when an engineer hands you a `.proto` file and assumes you can read it.

**The prompt** (paste into Copilot Chat with the schema or doc file open):

```text
This file is part of an API. Tell me which shape this API is: REST, GraphQL, gRPC, SOAP, or something else. Quote the line that gave it away. Then in one sentence, name what that shape commits to.
```

**What to expect back.** A shape name, a quoted line, and one commitment sentence. Three lines.

**What to watch for.** Copilot Chat sometimes says "this could be REST or RPC over HTTP." That hedging is the trap from block 6: an API that says REST in the marketing page but ships RPC underneath. Push back: "name the shape based on the URL patterns in this file, not the marketing." The second pass usually picks one and defends it. If it still hedges, the file probably is RPC in a REST jacket. If Copilot paraphrases instead of quoting, ask again: "give me the literal line."
````

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/typesofAPI.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes.

- [ ] **Step 3: Commit.**

```bash
git add _docs/typesofAPI.md
git commit -m "feat(m2l2): draft block 8 (Copilot Chat AI co pilot tip)"
```

### Sub-task 7G: Block 9 (Before you go, self check)

- [ ] **Step 1: Replace the Block 9 stub.**

Find the line `<!-- TODO block:9 -->` (under `## Before you go`) and replace it with this exact content:

```markdown
Pick a public API doc you remember reading. In two sentences, name the shape and name one thing the page does because of the shape.
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/typesofAPI.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes.

- [ ] **Step 3: Commit.**

```bash
git add _docs/typesofAPI.md
git commit -m "feat(m2l2): draft block 9 (self check)"
```

### Sub-task 7H: Block 10 (Next week at Greenfield, teaser)

- [ ] **Step 1: Replace the Block 10 stub.**

Find the line `<!-- TODO block:10 -->` (under `## Next week at Greenfield`) and replace it with this exact content:

```markdown
Next week we open the URL the catalog actually ships under and read it left to right. Devon has feelings about every part of it.
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/typesofAPI.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes.

- [ ] **Step 3: Commit.**

```bash
git add _docs/typesofAPI.md
git commit -m "feat(m2l2): draft block 10 (next week at Greenfield teaser)"
```

After Sub-task 7H, all ten `<!-- TODO block:N -->` markers are gone. The lesson body is complete (modulo SVG replacement in Task 11). Run a final voice-linter pass:

- [ ] **Step 3 (sanity): Final voice-linter pass on the complete lesson body.**

```bash
ruby scripts/voice-check.rb _docs/typesofAPI.md && echo "ALL CLEAN"
```

Expected: prints `ALL CLEAN`.

---

## Task 8: Append the bible Timeline entry

**Files:**
- Modify: `docs/superpowers/greenfield-bible.md` (append to Timeline section)

Per M1L5/M2L1 retro: append at the bottom of the Timeline section, do NOT in-place-replace.

- [ ] **Step 1: Read the current bible to find the insertion point.**

```bash
grep -n "^## " docs/superpowers/greenfield-bible.md | head -20
```

Expected: shows section headers. Locate the line `## API entities` or `## Locked details` — the Timeline section ends just before whichever of those sections appears after it.

- [ ] **Step 2: Append the M2L2 Timeline entry just before the next top-level section.**

Insert this exact content as a new entry at the end of the Timeline section (after the last existing `## Module ...` entry):

```markdown
## Module 2, Lesson 2. Devon whiteboards three other shapes.
Story date: Tuesday morning, story week 5. Seven days after M2L1's Tuesday morning Devon-at-desk scene; eleven days after Asha's email landed Friday evening of story week 3.
Event: Devon pinged Maya Friday evening asking her to come by Tuesday morning to whiteboard the three API shapes Greenfield could have shipped but did not (SOAP, GraphQL, gRPC). Maya finds him at the small whiteboard near his desk with four sketches up: REST plus the three alternatives. Under SOAP, Devon has written "1998" and below it "still in production at your bank." The lesson is the conventions debate widened: every shape is a set of commitments, and Greenfield's shape (REST) happens to fit a public catalog API for an open web. Apprentice stake: today, recognize the shape; this week, start the advanced filter assignment.
Characters present: Maya, Devon. Asha (offstage, referenced via M2L1 callback and via the counterfactual emails Devon imagines on the whiteboard).
New API entities introduced: none. Greenfield's GET /v1/books remains the running example.
New glossary terms introduced: SOAP, GraphQL, gRPC, request envelope.
Quote: "Last week was one argument. Today is three." (Devon, at the whiteboard, when Maya walks in.)
```

- [ ] **Step 3: Verify the bible file is still valid markdown.**

```bash
head -100 docs/superpowers/greenfield-bible.md | tail -30
```

Expected: no broken formatting; the new M2L2 entry appears in sequence after M2L1.

- [ ] **Step 4: Verify build still passes** (the bible is `.gitignore`'d so it does not affect the site build, but just to be safe):

```bash
bundle exec jekyll build 2>&1 | tail -3
```

Expected: no errors.

- [ ] **Step 5: Stage (but do not yet commit — bible deltas commit together with Locked details in Task 9 per M1L5/M2L1 retro).**

Note: the bible file is `.gitignore`'d (`docs/superpowers/` is in `.gitignore`), so `git add` will refuse to stage it. The bible append is for local workspace canon only; no git commit needed. Move directly to Task 9 to append the Locked details entries.

---

## Task 9: Append the four bible Locked details entries (one Edit per entry)

**Files:**
- Modify: `docs/superpowers/greenfield-bible.md` (append to Locked details section, four separate Edit operations)

Per M1L5/M2L1 retro: separate Edit operations per Locked detail; do not collapse into one mega-edit.

- [ ] **Step 1: Locate the Locked details section.**

```bash
grep -n "^## Locked details" docs/superpowers/greenfield-bible.md
```

Expected: returns the line number of the `## Locked details` heading.

- [ ] **Step 2: Edit operation 1 of 4 — append Greenfield's API shape lock.**

Append this exact line to the end of the Locked details section as a bullet item:

```markdown
- **Greenfield's API shape: REST.** Implicit from M1L4 forward; locked explicitly here. M2L2 walks the three shapes Greenfield could have shipped (SOAP, GraphQL, gRPC) and names why REST's commitments fit a public catalog API for an open web. Future lessons referencing "Greenfield is REST" can cite this lock without re-deriving.
```

- [ ] **Step 3: Edit operation 2 of 4 — append Devon's "RPC in a REST jacket" image.**

Append this exact line as the next bullet:

```markdown
- **Devon's recurring image for an API claiming REST but shipping RPC.** "RPC in a REST jacket" and "RPC with a REST sticker on the box" — both forms locked from M2L2 forward. The "REST jacket" form is the canonical short version. May reappear when a non-Greenfield API surfaces in Module 4 (writing the docs) or Module 8 (capstone audit).
```

- [ ] **Step 4: Edit operation 3 of 4 — append the whiteboard convention.**

Append this exact line as the next bullet:

```markdown
- **Whiteboard convention in Devon's workspace.** A small whiteboard near his desk, used for sketch-and-talk sessions. First on-screen in M2L2. Distinct from Priya's M1L3 venue (the conference room, where she shares analytics dashboards, not whiteboard sketches). May reappear when Devon walks Maya through a multi-part concept.
```

- [ ] **Step 5: Edit operation 4 of 4 — append the four shapes Devon opined on.**

Append this exact line as the next bullet:

```markdown
- **The four shapes Devon explicitly opined on.** REST, SOAP, GraphQL, gRPC. The "named-and-opined-on" set for the apprentice. WebSocket and the older RPC family (XML-RPC, JSON-RPC) are mentioned once each but are not Devon's canonical four. Locked because later lessons cross-referencing "the shapes Devon walked through" should not include WebSocket or RPC in that set.
```

- [ ] **Step 6: Verify the four appends landed in order.**

```bash
tail -20 docs/superpowers/greenfield-bible.md
```

Expected: shows the four new bullets in order. The file is `.gitignore`'d so no commit needed; the bible is workspace canon.

---

## Task 10: Delete the four legacy orphan visual assets

**Files:**
- Delete: `assets/gif/webAPIs.gif`
- Delete: `assets/images/api-categories-overview.svg`
- Delete: `assets/images/rest-api-illustration.svg`
- Delete: `assets/images/api-types-overview.svg`

Spec Section 3.3 names these as orphans after the rewrite. Grep check before deletion to ensure no other lesson references them.

- [ ] **Step 1: Grep for any remaining references.**

```bash
git grep -E 'webAPIs\.gif|api-categories-overview|rest-api-illustration|api-types-overview' _docs/ _includes/ _layouts/ _data/ assets/ 2>/dev/null
```

Expected: the only matches should be inside `_docs/typesofAPI.md` — wait, the new lesson does NOT reference any of these. So expected: no matches. If matches appear in any file OTHER than `_docs/typesofAPI.md`, STOP and investigate before deleting (the legacy lesson is fully rewritten by this point, so it should not reference them either).

- [ ] **Step 2: Confirm the files exist before deletion (no surprises).**

```bash
ls -la assets/gif/webAPIs.gif assets/images/api-categories-overview.svg assets/images/rest-api-illustration.svg assets/images/api-types-overview.svg
```

Expected: all four files listed. If any are missing, remove them from the deletion list below.

- [ ] **Step 3: Delete the four files.**

```bash
git rm assets/gif/webAPIs.gif assets/images/api-categories-overview.svg assets/images/rest-api-illustration.svg assets/images/api-types-overview.svg
```

Expected: each file removed from working tree and staged for deletion.

- [ ] **Step 4: Verify build still passes (no broken references).**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 5: Verify HTMLProofer is clean for the new lesson (no broken image links).**

```bash
bundle exec htmlproofer _site/typesofAPI.html --swap-urls '^/apidocumentation:' 2>&1 | tail -10
```

Expected: 0 errors. If HTMLProofer reports broken image references, search the new lesson for any stray `<img>` or `image:` references that point at deleted paths.

- [ ] **Step 6: Commit.**

```bash
git commit -m "chore(m2l2): delete 4 orphan legacy assets (webAPIs.gif, api-categories-overview.svg, rest-api-illustration.svg, api-types-overview.svg)"
```

---

## Task 11: Build the real interactive SVG

**Files:**
- Modify: `assets/svg/typesofAPI/main.svg` (replace the Task 3 stub with the real 4-cell hover-tooltip whiteboard)

Spec Section 3.2 specifies the layout, hover content, colors, focus, and performance budget. Color hex values from `tailwind.config.js`:
- ink: `#0c1a2b`
- cream: `#fbf8f3`
- copper: `#b85c38`
- sage: `#5a7a64`

Cell math (re-verified from spec): `viewBox="0 0 800 600"`, 16px outer padding, 16px inner gutter → each cell is 376x276. Cells positioned at `(16, 16)`, `(408, 16)`, `(16, 308)`, `(408, 308)`.

- [ ] **Step 1: Replace the stub SVG with the real implementation.**

Replace the entire contents of `assets/svg/typesofAPI/main.svg` with this exact content:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;" data-svg-pattern="hover-tooltip" role="img" aria-label="Devon's whiteboard rendered as four cells comparing REST (the actual), SOAP, GraphQL, and gRPC. Each cell shows the shape's request envelope. Hover or tap a cell for the counterfactual Asha email.">
  <title>Four API shapes: REST as the actual; SOAP, GraphQL, gRPC as counterfactuals</title>
  <desc>Devon's whiteboard sketch comparing four API shapes. Top left: REST with a copper badge reading the actual, showing the request line GET /v1/books?q=mystery. Top right: SOAP with a stylized XML envelope wrapping a Search for mystery. Bottom left: GraphQL with POST /graphql and a query for books. Bottom right: gRPC with SearchBooks called for mystery as a binary call over HTTP/2. The REST cell is emphasized with a 2px copper border; the other three cells have 1px sage borders. Hovering or tapping a cell reveals the counterfactual Asha email for that shape and what Greenfield's reply would owe back.</desc>

  <rect x="0" y="0" width="800" height="600" fill="#fbf8f3" />

  <!-- Cell 1: REST (top-left, emphasized as 'the actual') -->
  <g tabindex="0" role="button" aria-label="REST cell, the actual shape Greenfield ships" data-tooltip='Asha emailed Devon asking for POST /search. Devon politely declined. The verb stays GET, the URL stays /v1/books?q=mystery. The cache holds it. Atlas calls it twenty times an hour.' transform="translate(16, 16)">
    <rect width="376" height="276" fill="#fbf8f3" stroke="#b85c38" stroke-width="2" rx="4" />
    <!-- Badge: "the actual" -->
    <g transform="translate(280, 16)">
      <rect width="80" height="22" rx="11" fill="#b85c38" />
      <text x="40" y="15" text-anchor="middle" font-family="Georgia, serif" font-size="11" fill="#fbf8f3">the actual</text>
    </g>
    <!-- Label -->
    <text x="20" y="44" font-family="Georgia, serif" font-size="22" fill="#b85c38" font-weight="bold">REST</text>
    <!-- Request envelope -->
    <text x="20" y="150" font-family="ui-monospace, Menlo, monospace" font-size="14" fill="#0c1a2b">GET /v1/books?q=mystery</text>
  </g>

  <!-- Cell 2: SOAP (top-right) -->
  <g tabindex="0" role="button" aria-label="SOAP cell, counterfactual" data-tooltip='Asha would have asked: "send us the WSDL." Marginalia would have generated a client from the WSDL. Every Atlas call to find a book would have wrapped the query in an XML envelope. The cache would have stayed out of it.' transform="translate(408, 16)">
    <rect width="376" height="276" fill="#fbf8f3" stroke="#5a7a64" stroke-width="1" rx="4" />
    <!-- Label -->
    <text x="20" y="44" font-family="Georgia, serif" font-size="22" fill="#0c1a2b" font-weight="bold">SOAP</text>
    <!-- Request envelope (3-line stylized XML) -->
    <text x="20" y="130" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#0c1a2b">&lt;soap:Envelope&gt;</text>
    <text x="40" y="152" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#0c1a2b">&lt;Search&gt;mystery&lt;/Search&gt;</text>
    <text x="20" y="174" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#0c1a2b">&lt;/soap:Envelope&gt;</text>
  </g>

  <!-- Cell 3: GraphQL (bottom-left) -->
  <g tabindex="0" role="button" aria-label="GraphQL cell, counterfactual" data-tooltip='Asha would have asked for the schema. Atlas would have written a query asking for exactly the fields it needed. One URL for every call. The cache would have stayed out of it because every call is a POST.' transform="translate(16, 308)">
    <rect width="376" height="276" fill="#fbf8f3" stroke="#5a7a64" stroke-width="1" rx="4" />
    <!-- Label -->
    <text x="20" y="44" font-family="Georgia, serif" font-size="22" fill="#0c1a2b" font-weight="bold">GraphQL</text>
    <!-- Request envelope (2 lines) -->
    <text x="20" y="140" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#0c1a2b">POST /graphql</text>
    <text x="20" y="162" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#0c1a2b">query { books(q: "mystery") { title } }</text>
  </g>

  <!-- Cell 4: gRPC (bottom-right) -->
  <g tabindex="0" role="button" aria-label="gRPC cell, counterfactual" data-tooltip='Asha would have asked for the proto file. Marginalia would have built the generated Atlas client from it. The call would have gone binary over HTTP/2. Any browser without grpc-web could not have called it. Any proxy not speaking HTTP/2 would have dropped the connection.' transform="translate(408, 308)">
    <rect width="376" height="276" fill="#fbf8f3" stroke="#5a7a64" stroke-width="1" rx="4" />
    <!-- Label -->
    <text x="20" y="44" font-family="Georgia, serif" font-size="22" fill="#0c1a2b" font-weight="bold">gRPC</text>
    <!-- Request envelope (2 lines) -->
    <text x="20" y="140" font-family="ui-monospace, Menlo, monospace" font-size="13" fill="#0c1a2b">SearchBooks(query: "mystery")</text>
    <text x="20" y="166" font-family="ui-monospace, Menlo, monospace" font-size="12" fill="#5a7a64">(binary over HTTP/2)</text>
  </g>
</svg>
```

Notes on the SVG:
- `<` and `>` in SOAP cell text are HTML-escaped as `&lt;` and `&gt;` because SVG text content is XML.
- `data-tooltip` values use single quotes (`'...'`) on the outside to allow double quotes (`"..."`) inside for Asha's quoted email phrasing without escaping.
- Each `<g>` cell has `tabindex="0"`, `role="button"`, and `aria-label`; the focus ring is provided by the framework's CSS `:focus-visible`.
- The framework's `initHoverTooltip` reads `data-tooltip` and renders the tooltip on hover/focus.
- Static fallback: with JS off, the four cells render with all labels and envelopes visible. No tooltip is shown but the visual content is intact.

- [ ] **Step 2: Verify SVG renders.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. The site builds.

- [ ] **Step 3: Verify SVG file size is under budget.**

```bash
wc -c assets/svg/typesofAPI/main.svg
```

Expected: under 50,000 bytes (50KB raw). If over, simplify the markup (drop comments, tighten attributes).

Then check gzipped size:

```bash
gzip -c assets/svg/typesofAPI/main.svg | wc -c
```

Expected: under 15,000 bytes (15KB gzipped).

- [ ] **Step 4: Manual visual verification.**

Start the dev server:

```bash
bundle exec jekyll serve --baseurl '' --detach
```

Open `http://localhost:4000/typesofAPI.html` in a browser. Verify:
- All four cells render with labels and request envelopes visible.
- The REST cell has a copper border and a "the actual" pill badge upper-right.
- The other three cells have sage borders.
- Hover or tap each cell — tooltip appears with the counterfactual text.
- Tab through the cells — focus ring (copper) is visible on each cell.
- Press Enter or Space on a focused cell — tooltip appears.
- Press Escape — tooltip dismisses.

Stop the dev server:

```bash
pkill -f "jekyll serve"
```

If any check fails, fix inline (most likely culprits: tooltip framework width, badge text positioning, hover region size).

- [ ] **Step 5: Tooltip rendering at three breakpoints.**

Restart the dev server. Use browser dev tools to set viewport widths and check tooltip rendering:
- 375px (mobile): tooltips should not truncate; should reflow inside viewport
- 768px (tablet): tooltips render at natural width
- 1280px (desktop): tooltips render at natural width

If any tooltip truncates at 375px, shorten that tooltip's `data-tooltip` content to ~25 words or extend the framework with a width cap (note framework change in PR description if so).

- [ ] **Step 6: Commit.**

```bash
git add assets/svg/typesofAPI/main.svg
git commit -m "feat(m2l2): real interactive SVG (4-cell whiteboard, REST emphasized, hover counterfactuals)"
```

---

## Task 12: Full verification pass before PR

**Files:** none modified.

- [ ] **Step 1: Voice linter on the final lesson.**

```bash
ruby scripts/voice-check.rb _docs/typesofAPI.md && echo "VOICE OK"
```

Expected: prints `VOICE OK`.

- [ ] **Step 2: Verify all ten block markers are present in order.**

```bash
grep -nE 'block:[0-9]+' _docs/typesofAPI.md
```

Expected: ten matches in order: `block:1`, `block:2`, `block:3`, ..., `block:10`. No `TODO block:N` lines remain.

- [ ] **Step 3: Verify no remaining TODO markers.**

```bash
grep -nE 'TODO|TBD|FIXME' _docs/typesofAPI.md
```

Expected: no matches.

- [ ] **Step 4: Verify the four glossary terms resolve.**

```bash
ruby -ryaml -e '
g = YAML.load_file("_data/glossary.yml")
terms = g.map { |e| e["term"] }
required = ["SOAP", "GraphQL", "gRPC", "request envelope", "REST"]
missing = required - terms
puts missing.empty? ? "ALL TERMS PRESENT" : "MISSING: #{missing.join(", ")}"
'
```

Expected: prints `ALL TERMS PRESENT`.

- [ ] **Step 5: Verify the bible appends are present (workspace check only since gitignored).**

```bash
grep -c "Module 2, Lesson 2" docs/superpowers/greenfield-bible.md
grep -c "RPC in a REST jacket" docs/superpowers/greenfield-bible.md
grep -c "Whiteboard convention in Devon" docs/superpowers/greenfield-bible.md
```

Expected: each grep returns 1 or higher.

- [ ] **Step 6: Verify reading time.**

```bash
words=$(wc -w < _docs/typesofAPI.md); echo "Words: $words; estimated reading time: $(echo "$words / 150 + 3" | bc) minutes"
```

Expected: estimated reading time is between 12 and 18 minutes. If under 12, the rewrite trimmed too aggressively (check that all blocks have content). If over 18, trim block 3 or block 4.

- [ ] **Step 7: Full production-style build.**

```bash
npm run build:css && bundle exec jekyll build 2>&1 | tail -10
```

Expected: no errors; exit 0.

- [ ] **Step 8: HTMLProofer on the new lesson.**

```bash
bundle exec htmlproofer _site/typesofAPI.html --swap-urls '^/apidocumentation:' 2>&1 | tail -10
```

Expected: 0 errors.

- [ ] **Step 9: Confirm orphan assets are gone.**

```bash
ls assets/gif/webAPIs.gif 2>&1 || echo "OK: webAPIs.gif deleted"
ls assets/images/api-categories-overview.svg 2>&1 || echo "OK: api-categories-overview.svg deleted"
ls assets/images/rest-api-illustration.svg 2>&1 || echo "OK: rest-api-illustration.svg deleted"
ls assets/images/api-types-overview.svg 2>&1 || echo "OK: api-types-overview.svg deleted"
```

Expected: four "OK: <file> deleted" lines.

- [ ] **Step 10: Confirm no stale references in any tracked file.**

```bash
git grep -E 'webAPIs\.gif|api-categories-overview|rest-api-illustration|api-types-overview'
```

Expected: empty (no matches).

- [ ] **Step 11: Check the git log of this branch.**

```bash
git log master..HEAD --oneline
```

Expected: shows roughly 11-13 commits (skeleton, stub SVG, glossary, block 3, block 4, 8 sub-task commits for blocks 5/6/1/2/7/8/9/10, orphan deletion, real SVG). Each commit has a `feat(m2l2):` or `chore(m2l2):` prefix.

No commit needed for this task; it is verification only.

---

## Task 13: Open the PR

**Files:** none modified locally; opens a GitHub PR.

- [ ] **Step 1: Confirm clean working tree.**

```bash
git status
```

Expected: working tree clean. Only `p.md` may be untracked (pre-existing).

- [ ] **Step 2: Push the branch to origin.**

```bash
git push -u origin rewrite/typesofAPI
```

Expected: branch published; gh sets upstream.

- [ ] **Step 3: Open the PR using `gh`.**

```bash
gh pr create --base master --title "feat(m2l2): rewrite Types of APIs in Maya's voice" --body "$(cat <<'EOF'
## Summary

Rewrites `_docs/typesofAPI.md` (Module 2 Lesson 2) end-to-end against the Phase 2 framework. Drops the legacy six-category taxonomy and seven-shape card grid; ships four shapes (REST, SOAP, GraphQL, gRPC) taught through the Asha counterfactual ("what would Asha's email from M2L1 have looked like if Greenfield had shipped this shape?"). Permalink `/typesofAPI.html` preserved.

- Spec: `docs/superpowers/specs/2026-05-30-m2l2-typesofAPI-design.md`
- Plan: `docs/superpowers/plans/2026-05-30-m2l2-typesofAPI-plan.md`

## Changes

- **Lesson body.** Full rewrite of `_docs/typesofAPI.md`. Ten blocks per parent Phase 2 spec. Frame: "every shape is a set of commitments" (parallel to M2L1's "every verb is an agreement").
- **Interactive SVG.** New `assets/svg/typesofAPI/main.svg` — hand-authored 4-cell hover-tooltip whiteboard. REST emphasized with copper border + "the actual" pill; SOAP, GraphQL, gRPC are counterfactuals with sage borders. Hover or tap each cell for the counterfactual Asha email.
- **Mermaid.** Block 3 sequence diagram showing GraphQL's request shape (2 participants, 3 messages, 2 notes). Note text simplified to avoid parser ambiguity; literal query lives in surrounding prose.
- **Glossary.** Four new entries in `_data/glossary.yml`: SOAP, GraphQL, gRPC, request envelope.
- **Bible.** Timeline entry + 4 Locked details appended to `docs/superpowers/greenfield-bible.md` (gitignored; workspace canon).
- **AI tip.** Block 8 names GitHub Copilot Chat (first appearance in the tool rotation).
- **Legacy cleanup.** Four orphan visual assets deleted: `webAPIs.gif`, `api-categories-overview.svg`, `rest-api-illustration.svg`, `api-types-overview.svg`.

## Test plan

- [ ] Voice linter passes (`ruby scripts/voice-check.rb _docs/typesofAPI.md`)
- [ ] Build green (`npm run build:css && bundle exec jekyll build`)
- [ ] HTMLProofer clean (`bundle exec htmlproofer _site/typesofAPI.html --swap-urls '^/apidocumentation:'`)
- [ ] Mermaid renders on cream background
- [ ] Interactive SVG: all 4 cells render; REST cell visually emphasized; hover tooltips work on touch and desktop; keyboard navigable (Tab, Enter, Space, Escape); focus ring visible; `prefers-reduced-motion` respected
- [ ] Tooltips render at 375px, 768px, 1280px without truncation
- [ ] Static fallback (JS off): all cells render with labels and request envelopes
- [ ] Reading time 12 to 18 minutes (`wc -w / 150 + 3`)
- [ ] Earned joke (Devon's "1998" + "still in production at your bank") gets human laugh-test from Gaurav
- [ ] `module: 2`, `lesson: 2` frontmatter reconciles with `_data/modules.yml`
- [ ] No remaining references to deleted orphan assets in any tracked file

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: PR opens, URL printed. Save the URL for the human review step.

- [ ] **Step 4: Tag for human review.**

The PR is ready for Gaurav's review. The DoD checklist in the PR body and Section 5 of the spec is the canonical pre-merge gate. Critical items requiring human judgment:

1. The earned joke in block 1 ("1998 / still in production at your bank") needs a thumbs-up.
2. The 4-cell SVG needs visual verification on at least one mobile device (iOS Safari 16 or Chrome on Android).
3. The Mermaid renders correctly on the cream page background.
4. Block 6's "RPC in a REST jacket" image reads as a Devon line (not forced).

After Gaurav approves, the merge to `master` triggers the GitHub Pages deploy via `.github/workflows/build.yml`. Live site at `https://beingtechnicalwriter.com/apidocumentation/typesofAPI.html`.

---

## Post-ship checklist (for after the PR merges)

Not part of the implementation; for the post-merge retro session.

- [ ] Confirm live URL serves the rewritten lesson.
- [ ] Spot-check Mermaid and SVG render in the production build.
- [ ] Skim GA4 traffic 30 days post-ship to check the title change (`Types of APIs - A Complete Overview` → `Types of APIs`) did not tank search ranking.
- [ ] Write the post-ship retro at `docs/superpowers/specs/retros/typesofAPI.md` — three notes max (what worked, what to change in spec, what to change in workflow). Following M1L4/M2L1 retro format.
- [ ] Strike through M2L2 in CLAUDE.md's "Next-lesson queue" and move to M2L3 brainstorming.

---

## Notes for the executor

- **Bible commits.** `docs/superpowers/` is in `.gitignore` (per chore commit `ca16596`). Bible Timeline and Locked details appends in Tasks 8 and 9 modify the file on disk but cannot be `git add`'d. The bible is workspace canon, kept locally per-machine.
- **Spec is also gitignored.** Same reason. The spec at `docs/superpowers/specs/2026-05-30-m2l2-typesofAPI-design.md` exists on disk but does not appear in git status.
- **`p.md` at repo root** is unrelated user notes, not part of this work. Leave untracked.
- **Hyphen watchlist** is in spec Section 4.4. If the voice linter flags something, check the table first before guessing a rewrite.
- **Counterfactual subjunctive.** "If Greenfield had shipped X, Asha would have asked..." — never slip to present-tense. Voice notes in spec Section 4.4 are explicit about this.
- **Two intentional ordering choices.** Block 3 walks SOAP → GraphQL → gRPC → REST. Block 4 walks REST → GraphQL → gRPC → SOAP. Do not normalize during drafting; spec Section 4.4 names this as load-bearing.
