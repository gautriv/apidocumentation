# M2L3 anatomyofurl Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `_docs/anatomyofurl.md` (Module 2 Lesson 3, Anatomy of a URL part 1) end-to-end in Maya's voice against the Phase 2 framework, preserving the `/anatomyofurl.html` permalink, and ship the lesson with its Mermaid request-routing diagram, hand-authored 5-region hover-tooltip URL SVG, four new glossary entries, six bible updates, and legacy orphan-asset cleanup.

**Architecture:** Single lesson rewrite on its own branch `rewrite/anatomyofurl`. The lesson is one Markdown file at `_docs/anatomyofurl.md`, one SVG at `assets/svg/anatomyofurl/main.svg`, four glossary entries appended to `_data/glossary.yml`, and six edits to `docs/superpowers/greenfield-bible.md` (1 Timeline append, 3 new Locked details, 2 in-place edits). Up to four legacy asset files get deleted after grep-verification. No new includes, no framework changes, no config changes.

**Tech Stack:** Jekyll 4.x, Liquid, Tailwind CSS (built via `npm run build:css`), Ruby 3.1+, hand-authored SVG using the existing `hover-tooltip` pattern in `assets/js/interactive-svg.js`. Mermaid renderer loaded by `_includes/mermaid.html`. Voice linter `scripts/voice-check.rb`. HTMLProofer for link verification.

**Source spec:** `docs/superpowers/specs/2026-05-31-m2l3-anatomyofurl-design.md`. This plan does not duplicate the design rationale; it executes the spec.

**Convention vs M2L2:** Tasks 1-6 carry substance (skeleton, SVG stub, glossary, Block 3 with Mermaid, Block 4 with SVG include) and merit independent review. Task 7 batches the eight verbatim-paste blocks (5, 6, 1, 2, 7, 8, 9, 10) into sub-tasks with one commit per block (M2L2 retro pattern). Bible deltas (Tasks 8 and 9) are six separate Edit operations per M1L5/M2L1/M2L2 retro discipline.

---

## Files touched

- **Modify (full rewrite):** `_docs/anatomyofurl.md` — drop legacy content, write the new 10-block lesson.
- **Create:** `assets/svg/anatomyofurl/main.svg` — hand-authored interactive SVG, ~180 lines, `hover-tooltip` pattern, 5 hover regions on a 2-line URL.
- **Modify (append):** `_data/glossary.yml` — append 4 entries (scheme, host, resource, query string).
- **Modify (append + in-place edits):** `docs/superpowers/greenfield-bible.md` — 1 Timeline entry, 3 new Locked details, 2 in-place edits (RFC tradition adds RFC 3986; GET /books entity adds three query params).
- **Delete (orphan, after grep verification):** `_includes/url-anatomy-interactive.html`, `_data/url_faqs.yml`, `_data/anatomyofurl_questions.yml`, `assets/images/api-docs-anatomyofurl.svg`. Plus surgical edits to `_data/questions.yml` if its `protocol`/`domain`/`path`/`query_parameters`/`fragment` keys are unused elsewhere.

No other files are touched. `_data/modules.yml` already has the M2L3 slot; Task 1 verifies this.

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

- [ ] **Step 2: Confirm `_data/modules.yml` has M2L3 at the right slot.**

Run:

```bash
ruby -ryaml -e 'm = YAML.load_file("_data/modules.yml"); puts m[1]["lessons"][2].to_yaml'
```

Expected output includes `slug: anatomyofurl.html` (or matching slug field) and a title that references URL anatomy. If the title differs from "Anatomy of a URL (part 1)", note it; Task 2's frontmatter will set the canonical title.

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
ruby scripts/voice-check.rb _docs/typesofAPI.md && echo "OK"
```

Expected: prints `OK`. (M2L2 is the most recent shipped lesson and should pass cleanly.)

- [ ] **Step 6: Confirm `gh` CLI is authenticated.**

Run:

```bash
gh auth status 2>&1 | head -5
```

Expected: shows the active GitHub account. If not authenticated, run `gh auth login` interactively before opening the PR in Task 13.

- [ ] **Step 7: Probe candidate orphan assets for current state (so Task 10 knows what to delete vs leave alone).**

Run:

```bash
ls -la _includes/url-anatomy-interactive.html _data/url_faqs.yml _data/anatomyofurl_questions.yml assets/images/api-docs-anatomyofurl.svg 2>&1 | tail -20
```

Expected: most or all four files exist. Note any that are already missing — they get removed from Task 10's deletion list.

- [ ] **Step 8: Confirm a clean baseline build.**

Run:

```bash
npm run build:css && bundle exec jekyll build 2>&1 | tail -20
```

Expected: no errors; exit 0. The build produces `_site/anatomyofurl.html` from the legacy `_docs/anatomyofurl.md`.

- [ ] **Step 9: Note the baseline word count of the legacy lesson** (used for the post-ship retro):

```bash
wc -w _docs/anatomyofurl.md
```

Expected: a number (around 2000-2500 words for the legacy lesson, which is over the 12-18 minute target; the rewrite will trim to ~1,700).

No commit yet; this task only verifies state.

---

## Task 2: Create the rewrite branch and lay down the lesson skeleton

**Files:**
- Create branch: `rewrite/anatomyofurl`
- Modify: `_docs/anatomyofurl.md` (full rewrite, skeleton first)

- [ ] **Step 1: Create and switch to the rewrite branch.**

```bash
git checkout -b rewrite/anatomyofurl
```

Expected: switched to a new branch.

- [ ] **Step 2: Replace `_docs/anatomyofurl.md` with the skeleton.**

Replace the entire contents of `_docs/anatomyofurl.md` with this exact content:

```markdown
---
title: "Anatomy of a URL (part 1)"
permalink: /anatomyofurl.html
module: 2
lesson: 3
slug: anatomyofurl
reading_time: 14
description: "Read Greenfield's URL left to right and design your first one. The five parts every API URL ships and what each one commits to."
previous_page:
  url: /typesofAPI.html
  title: "Types of APIs"
next_page:
  url: /anatomyofurltwo.html
  title: "Anatomy of a URL (part 2)"
---

{% comment %}block:1{% endcomment %}
## Friday's PR

<!-- TODO block:1 -->

{% comment %}block:2{% endcomment %}
## Today you will leave with

<!-- TODO block:2 -->

{% include ad-slot.html slot="lesson-mid-1" format="auto" %}

{% comment %}block:3{% endcomment %}
## Read it left to right

<!-- TODO block:3 -->

{% comment %}block:4{% endcomment %}
## Now you write

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

Expected: no errors. The site builds; `_site/anatomyofurl.html` contains the skeleton with `TODO` comments and the empty H2 headings.

- [ ] **Step 4: Verify the voice linter is happy with the skeleton.**

```bash
ruby scripts/voice-check.rb _docs/anatomyofurl.md
```

Expected: passes. (Skeleton has no body prose, so no voice violations possible.)

- [ ] **Step 5: Commit the skeleton.**

```bash
git add _docs/anatomyofurl.md
git commit -m "feat(m2l3): lesson skeleton with frontmatter and block markers"
```

---

## Task 3: Stub the interactive SVG so Block 4 references resolve

**Files:**
- Create: `assets/svg/anatomyofurl/main.svg`

The real SVG lands in Task 11. This stub exists so Block 4's `{% include interactive-svg.html slug="anatomyofurl" %}` resolves at build time without 404.

- [ ] **Step 1: Create the SVG directory.**

```bash
mkdir -p assets/svg/anatomyofurl
```

- [ ] **Step 2: Write the stub SVG file at `assets/svg/anatomyofurl/main.svg`.**

Exact content (a minimal valid SVG with the hover-tooltip pattern declared so the framework binds correctly but renders almost nothing):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;" data-svg-pattern="hover-tooltip" role="img" aria-label="Stub. Real SVG ships in Task 11.">
  <title>Stub SVG for M2L3; real 5-region hover-tooltip URL ships in Task 11.</title>
  <desc>Placeholder so the lesson build does not 404 on the interactive-svg include. Replaced in Task 11 with the URL anatomy hover described in the spec.</desc>
  <rect x="0" y="0" width="900" height="300" fill="#fbf8f3" />
  <text x="450" y="150" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#0c1a2b">Interactive SVG placeholder. Real SVG ships in Task 11.</text>
</svg>
```

- [ ] **Step 3: Verify build still passes.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. The stub is valid SVG.

- [ ] **Step 4: Commit the stub.**

```bash
git add assets/svg/anatomyofurl/main.svg
git commit -m "chore(m2l3): stub SVG so build passes; real SVG lands in Task 11"
```

---

## Task 4: Append the four new glossary entries

**Files:**
- Modify: `_data/glossary.yml`

- [ ] **Step 1: Append the four entries to the end of `_data/glossary.yml`.**

Append exactly these lines at the end of the file (preserve YAML indentation; entries start with `- term:` at column 0):

```yaml
- term: "scheme"
  definition: "The part of a URL before the ://. Names the protocol the client speaks. For web APIs, https."
  link: "#"
- term: "host"
  definition: "The part of a URL after the scheme and before the path. What DNS resolves to an IP address. Often a subdomain like api.greenfield.lib."
  link: "#"
- term: "resource"
  definition: "The noun in a URL's path that names what the response is about. /books names the books resource. The query string filters which books come back."
  link: "#"
- term: "query string"
  definition: "Everything after the ? in a URL. name=value pairs separated by &. Parameterizes the response without changing which handler runs."
  link: "#"
```

Note: the spec's Section 4.2 also lists `see_also` arrays per entry. `_data/glossary.yml` historically has not used `see_also` (M2L1 and M2L2 appended entries don't either). Skip `see_also` to match the existing schema. If a future glossary refactor adds `see_also` support, the spec values can be backfilled then.

- [ ] **Step 2: Verify YAML still parses.**

```bash
ruby -ryaml -e 'g = YAML.load_file("_data/glossary.yml"); puts g.length; puts g.last(4).map { |e| e["term"] }.join(", ")'
```

Expected output: a number (total glossary entries) and `scheme, host, resource, query string`.

- [ ] **Step 3: Verify build still passes.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 4: Commit.**

```bash
git add _data/glossary.yml
git commit -m "feat(m2l3): add 4 glossary entries (scheme, host, resource, query string)"
```

---

## Task 5: Draft Block 3 (Read it left to right) with the Mermaid

**Files:**
- Modify: `_docs/anatomyofurl.md` (replace Block 3 TODO with prose + Mermaid)

Block 3 walks the URL `https://api.greenfield.lib/v1/books?q=mystery` left to right in five subsections (scheme, host, version, resource, query string), with base path named in one sentence inside the version subsection. The Mermaid is a request-routing sequence diagram (4 participants, 5 messages, 2 notes).

- [ ] **Step 1: Replace the Block 3 stub.**

Find the line `<!-- TODO block:3 -->` (under `## Read it left to right`) and replace it with this exact content:

```markdown
The URL in Devon's diff is `https://api.greenfield.lib/v1/books?q=mystery`. Left to right, it has five parts, and each one tells some piece of the stack what to do.

**{% include glossary-term.html term="scheme" %}.** `https`. This tells the client which protocol to speak. HTTPS means the connection is encrypted; the rest of the URL is unreadable to anything in the middle. Greenfield is HTTPS, like every public API a 2026 reader is calling.

**{% include glossary-term.html term="host" %}.** `api.greenfield.lib`. This is what DNS resolves to an IP address. The `api.` is a subdomain Greenfield uses to separate its API server from its public website at `greenfield.lib`. Two different machines, same registered domain. The subdomain is a Greenfield convention; some APIs use the bare domain and route by path, some put the API on a different domain entirely (`api.github.com`).

**Version.** `/v1`. Devon shipped Greenfield with a version segment from day one because he didn't want his first design to trap him. When Greenfield ships v2, `/v1` keeps working until Devon turns it off. Old clients keep working; new clients opt in. Some APIs hide the version in a header (`Accept: application/vnd.greenfield.v2+json`) instead. Devon doesn't, because the header form hides the version from URL readers (logs, bookmarks, the apprentice reviewing the PR).

**Base path.** Greenfield doesn't have one. The path starts at the version. Some APIs prefix every endpoint with `/api` or `/platform/v1` to keep the API routable behind a load balancer that also serves the marketing site. Greenfield uses a dedicated subdomain for that job, so no extra prefix.

**{% include glossary-term.html term="resource" %}.** `/books`. This is the noun. The handler that serves this URL is the books handler; its job is to know about books. The query string customizes what books come back, but the resource decides what the response is about. M2L1's argument was that the URL names a thing. This is the thing.

**{% include glossary-term.html term="query string" %}.** `?q=mystery`. The `?` opens the query string. After it, `name=value` pairs separated by `&`. `q` is the existing filter; `mystery` is its value. The query string parameterizes the handler. It doesn't change which handler runs. Same handler, different filter.

{% capture mermaid_src %}
sequenceDiagram
  participant Atlas
  participant DNS
  participant API as Greenfield API
  participant Handler as books handler
  Atlas->>DNS: resolve api.greenfield.lib
  DNS-->>Atlas: IP address
  Atlas->>API: GET /v1/books?q=mystery over HTTPS
  Note over API: /v1 routes to the v1 server tier
  API->>Handler: dispatch on /books
  Note over Handler: q=mystery filters the response
  Handler-->>Atlas: 200 with matching books
{% endcapture %}
{% include mermaid.html content=mermaid_src alt="A sequence diagram tracing one URL across the network stack. Atlas first asks DNS to resolve api.greenfield.lib and gets back an IP address. Atlas then sends GET /v1/books?q=mystery over HTTPS to Greenfield's API server. The /v1 prefix routes the request to the v1 server tier. The /books segment dispatches the request to the books handler. The query string q=mystery filters which books the handler returns. The handler responds 200 with the matching books back to Atlas. Each layer of the stack reads only the URL part it needs: DNS reads the host, the API server reads the version, the handler reads the resource and the query string." %}

Look at the diagram. Each layer reads only the part it needs.
```

- [ ] **Step 2: Run the voice linter on the lesson.**

```bash
ruby scripts/voice-check.rb _docs/anatomyofurl.md
```

Expected: passes. Common gotchas in this block: any compound modifier like "header-based" or "load-balancer" — rewrite to remove the hyphen. The phrase "left to right" should NOT be hyphenated. Hyphens inside backticks (`vnd.greenfield.v2+json`) are fine.

- [ ] **Step 3: Verify build still passes.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. Mermaid renders (visual verification waits until Task 12).

- [ ] **Step 4: Commit.**

```bash
git add _docs/anatomyofurl.md
git commit -m "feat(m2l3): draft block 3 (read it left to right) with request-routing mermaid"
```

---

## Task 6: Draft Block 4 (Now you write) with the SVG include

**Files:**
- Modify: `_docs/anatomyofurl.md` (replace Block 4 TODO with prose + interactive SVG include)

Block 4 is the writing payoff. Opens with the advanced-filter requirements, walks the apprentice through reusing the parts, shows the destination URL, embeds the SVG, then runs three counterfactual URL designs each rejected for a specific URL-anatomy reason, then closes with the Module 4 handoff. Counterfactuals MUST use canonical Greenfield identifiers (`branch_north` not `north`, `fiction` not generic).

- [ ] **Step 1: Replace the Block 4 stub.**

Find the line `<!-- TODO block:4 -->` (under `## Now you write`) and replace it with this exact content:

````markdown
Greenfield's advanced filter ships this week. The requirements are short:

- Filter by branch (a branch identifier like `branch_north`).
- Filter by shelf (Greenfield has fiction, biography, reference, periodicals).
- Filter by whether the book is on shelf right now or out on loan.

Write the URL.

Read the parts you just named, in order. Scheme: same. Host: same. Version: same. Resource: same. Three new filters means three new query parameters. Add them to the existing query string.

Here is what the parts give you:

```text
https://api.greenfield.lib/v1/books?q=mystery&branch=branch_north&shelf=fiction&on_shelf=true
```

Three new query parameters: `branch`, `shelf`, `on_shelf`. Each one a `name=value` pair, separated from its neighbor by `&`. Below is the URL with the new parts highlighted. Hover or tap each part to read what it commits to.

{% include interactive-svg.html slug="anatomyofurl" alt="The advanced filter URL rendered as visible text wrapped to two lines: line 1 https://api.greenfield.lib/v1/books, line 2 ?q=mystery&branch=branch_north&shelf=fiction&on_shelf=true. The five parts of the URL are individually hoverable regions: scheme (https), host (api.greenfield.lib), version (/v1), resource (/books), and query string (line 2 in its entirety). The three new query parameters added in this PR (branch, shelf, on_shelf) are rendered in copper while the existing q parameter and the rest of the URL are rendered in ink, marking what the apprentice wrote versus what was already there. Hovering or tapping each part reveals what it commits to and who reads it downstream. The version part's tooltip notes the alternative header-based versioning form some APIs use. The query string part's tooltip names the four name=value pairs and their separators." %}

A few things you might have done differently and what the parts say about each:

**Did you write `/v1/books/filter`?** That makes the URL name an action (filter), not the thing being filtered (books). The block 3 rule was: the resource is the noun. Filter belongs in the query string. `/v1/books` is still the resource; the query string says how to look at it.

**Did you write `/v1/books/branch_north/fiction/true`?** Path segments are for resources and their children, not for filter values. Two reasons it goes badly: the order of segments has to be memorized (which one is the branch, which one is the shelf?), and adding a fourth filter next year means breaking every URL anyone has saved. Query string parameters are named and unordered. Adding `?author=connelly` next year is invisible to every existing caller.

**Did you write `?filters=branch:branch_north,shelf:fiction,on_shelf:true`?** That packs the filters into a single query parameter as a string. Greenfield's server would now have to parse that string itself, defining its own grammar (what does the comma mean, what does the colon mean, how do you escape values that contain commas). The URL standard already defines how `&` and `=` work; reusing them is free.

Devon shipped the same URL you just wrote. The PR comment you leave him: nothing. The URL design is right. The doc page that explains what each filter does, what `on_shelf=false` means versus omitting `on_shelf` entirely, what happens when `branch` is misspelled: that is Module 4. Today you wrote the URL.
````

- [ ] **Step 2: Run the voice linter.**

```bash
ruby scripts/voice-check.rb _docs/anatomyofurl.md
```

Expected: passes. Watch for: "name-value pair" (rewrite as "name=value pair" with backticks); "header-based" (drop the hyphen — "in a header" or "via a header"); "URL-encoding" or "URL-encoded" (backtick the identifier on first use); "first-page" (should be "first page"). The phrase "branch_north" with the underscore is a canonical identifier and stays.

- [ ] **Step 3: Verify build.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. The interactive-svg include resolves to the stub from Task 3.

- [ ] **Step 4: Commit.**

```bash
git add _docs/anatomyofurl.md
git commit -m "feat(m2l3): draft block 4 (now you write) with SVG include and three counterfactuals"
```

---

## Task 7: Draft the eight verbatim-paste blocks (5, 6, 1, 2, 7, 8, 9, 10)

**Files:**
- Modify: `_docs/anatomyofurl.md` (replace TODO comments in blocks 5, 6, 1, 2, 7, 8, 9, 10)

Per M2L1/M2L2 retro pattern, the verbatim-paste blocks are batched into one task with one commit per block. Order matches M2L2's drafting order: callouts first (5, 6), then diary (1, 2), then standup-and-AI (7, 8), then close (9, 10).

Each sub-task replaces one block's TODO with its verbatim content, runs the voice linter, verifies build, and commits.

### Sub-task 7A: Block 5 (Try it on a public API, exercise callout)

- [ ] **Step 1: Replace the Block 5 stub.**

Find the line `<!-- TODO block:5 -->` and replace it with this exact content:

```markdown
{% capture body %}
Pick a public API doc you've used recently. Open one of its endpoint URLs (most reference pages show the full URL right next to the method). Read it left to right. Name the five parts. Then answer: where did the API put its version? Does it have a base path? Does the resource name a thing or an action? Does it use a query string or a body for filters?

Write five lines per URL: one per part, then a one-line verdict on whether the URL was easy to read. Repeat for two more URLs from two different APIs. Notice when one API is harder to read than another. The harder ones usually have a reason. Sometimes the reason is good (the API has been around for fifteen years and changing the URL would break the world). Sometimes the reason is that nobody ever sat down and asked these questions.
{% endcapture %}
{% include callout.html variant="exercise" body=body %}
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/anatomyofurl.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: linter passes; build is clean. Watch: "five-line" — should be "five lines" (already in that form); "one-line verdict" → "a one-line verdict" has a hyphen; rewrite as "one line verdict" or "a verdict in one line." Adjust the working copy if the linter flags this.

- [ ] **Step 3: Commit.**

```bash
git add _docs/anatomyofurl.md
git commit -m "feat(m2l3): draft block 5 (try it on a public API exercise)"
```

### Sub-task 7B: Block 6 (The trap, warning callout)

- [ ] **Step 1: Replace the Block 6 stub.**

Find the line `<!-- TODO block:6 -->` and replace it with this exact content:

```markdown
{% capture body %}
Plenty of APIs have URLs like `POST /v1/users/123/activate`, `POST /v1/orders/cancel`, `GET /v1/books/get?id=bk_184932`. Verbs in the path. That's RPC in a REST jacket, the same trap from last week.

Devon's rule: if the URL has a verb in it, the API is RPC underneath. The doc page owes the reader an operation list, not a resource list. The right move is not to pretend otherwise. Document what the API does, with the words the API uses.

The trap matters for URL design because once an API ships `/v1/users/activate`, every URL after it tends to follow. Patterns set hard. The first URL you write is the URL every URL after it will copy. Pick a noun.
{% endcapture %}
{% include callout.html variant="warning" body=body %}
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/anatomyofurl.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes. Note: `/get_user`, `/activate`, `/find` have underscores or are paths inside backticks. The linter should not flag inside-backticks content.

- [ ] **Step 3: Commit.**

```bash
git add _docs/anatomyofurl.md
git commit -m "feat(m2l3): draft block 6 (the trap; verbs in the path)"
```

### Sub-task 7C: Block 1 (Diary opener with Devon's PR description joke)

- [ ] **Step 1: Replace the Block 1 stub.**

Find the line `<!-- TODO block:1 -->` (under `## Friday's PR`) and replace it with this exact content:

```markdown
Tuesday morning of story week 6. I open my laptop. Devon's PR is at the top of my review queue. He opened it Friday afternoon with one line: "advanced filter, take 4. no POST. yes query string. yes `branch_north` not `north`. yes I read RFC 3986."

The URL is in the OpenAPI diff: `https://api.greenfield.lib/v1/books?q=mystery&branch=branch_north&shelf=fiction&on_shelf=true`. It's 9:30. Devon is in standup. He won't be back for forty minutes. Today you start your own URL, the one Devon flagged the week we first talked about REST. You can't write a URL until you can read one. So we read his left to right.
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/anatomyofurl.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes. Watch: "advanced filter" no hyphen (bible-locked form); "story week 6" no hyphen; "Friday afternoon" no hyphen; "forty minutes" no hyphen; "left to right" no hyphen. The PR description content inside double quotes uses identifiers backticked separately; the literal text inside `"..."` should not trip the linter because it reads as a quoted quote.

If the linter flags any compound modifier in the PR description, escape it by adding more backticks around the identifier. The PR description's value depends on the deadpan voice; do NOT rewrite the description into "smoother" prose.

**Earned joke note (for the human reviewer).** This is the lesson's earned joke. The deadpan `yes`/`no` stack is the joke. If at human review the joke does not land, three backup constructions are pre-approved in spec Section 4.4:
- `"branch + shelf + on_shelf. URL in the spec. read it left to right."`
- `"advanced filter. URL only. I will fight anyone who suggests we POST."`
- `"filter by branch shelf availability. yes the URL got long. no it isn't getting shorter."`

- [ ] **Step 3: Commit.**

```bash
git add _docs/anatomyofurl.md
git commit -m "feat(m2l3): draft block 1 (diary opener with Devon's PR description)"
```

### Sub-task 7D: Block 2 (Today you will leave with)

- [ ] **Step 1: Replace the Block 2 stub.**

Find the line `<!-- TODO block:2 -->` (under `## Today you will leave with`) and replace it with this exact content:

```markdown
- How to read a URL left to right and name the five parts.
- What each part commits to and who reads it downstream.
- One URL you wrote yourself.
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/anatomyofurl.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes.

- [ ] **Step 3: Commit.**

```bash
git add _docs/anatomyofurl.md
git commit -m "feat(m2l3): draft block 2 (today you will leave with)"
```

### Sub-task 7E: Block 7 (Words you can drop in standups now)

- [ ] **Step 1: Replace the Block 7 stub.**

Find the line `<!-- TODO block:7 -->` (under `## Words you can drop in standups now`) and replace it with this exact content:

```markdown
{% include glossary-term.html term="scheme" %}. Use this when you mean "the `https://` part of the URL." More specific than "protocol", less ambiguous to engineers.

{% include glossary-term.html term="host" %}. Use this when you mean "the part that DNS resolves to an IP." Catches all of subdomain, registered domain, and TLD without needing to name each one.

{% include glossary-term.html term="resource" %}. Use this when you mean "the noun in the path that names what the response will be about." The opposite of an action.

{% include glossary-term.html term="query string" %}. Use this when you mean "the part after the `?` that customizes the response without changing which handler runs."
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/anatomyofurl.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes. All four glossary terms resolve (added in Task 4).

- [ ] **Step 3: Commit.**

```bash
git add _docs/anatomyofurl.md
git commit -m "feat(m2l3): draft block 7 (standup words with glossary chips)"
```

### Sub-task 7F: Block 8 (AI co pilot tip, Cursor)

- [ ] **Step 1: Replace the Block 8 stub.**

Find the line `<!-- TODO block:8 -->` (under `## AI co pilot tip`) and replace it with this exact content:

````markdown
Tool: Cursor (the code editor with AI built in).

**The situation.** You're reviewing a PR that adds a new endpoint, or you're drafting one yourself. The diff has a URL pattern in it (the OpenAPI YAML, the routes file, a comment block). You want a second opinion on whether the URL design follows the parts.

**The prompt** (highlight the URL or the OpenAPI path entry, open the Cursor chat panel):

```text
Here is a URL pattern: <paste>. Read it left to right and name the five parts in left-to-right order. For each part, say one sentence on whether the choice fits common REST conventions. If the URL names an action instead of a resource, say so. If a filter is in the path that should be in the query string, say so. Do not hedge.
```

**What to expect back.** Five short lines, one per part, and a one-sentence verdict on the URL as a whole. If Cursor finds a verb in the path, the verdict should say so.

**What to watch for.** Cursor sometimes tries to be diplomatic about a URL that names an action ("this is a stylistic choice"). Push back: "is this URL RPC or REST?" The second pass usually picks one. Cursor is at its best when it has the surrounding code as context, so ask the question with the routes file or the OpenAPI YAML open in the editor.
````

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/anatomyofurl.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes. Watch: "one-sentence verdict" — has a hyphen. Rewrite as "a verdict in one sentence" or "the verdict in one line." Adjust the working copy if the linter flags it. The prompt's "left-to-right order" is inside a `text` code fence and the linter skips fenced code.

- [ ] **Step 3: Commit.**

```bash
git add _docs/anatomyofurl.md
git commit -m "feat(m2l3): draft block 8 (Cursor AI co pilot tip)"
```

### Sub-task 7G: Block 9 (Before you go, self check)

- [ ] **Step 1: Replace the Block 9 stub.**

Find the line `<!-- TODO block:9 -->` and replace it with this exact content:

```markdown
Look at the URL bar of any web page you have open. Read it left to right. Name the parts that are there and the parts that aren't.
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/anatomyofurl.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes.

- [ ] **Step 3: Commit.**

```bash
git add _docs/anatomyofurl.md
git commit -m "feat(m2l3): draft block 9 (self check)"
```

### Sub-task 7H: Block 10 (Next week at Greenfield, teaser to M2L4)

- [ ] **Step 1: Replace the Block 10 stub.**

Find the line `<!-- TODO block:10 -->` and replace it with this exact content:

```markdown
Next week the URL gets harder. The parts we skipped today (fragments, port, path parameters) and the parts that hurt when they go wrong (encoding, traversal, ambiguous slashes) all show up. Devon has opinions about those too.
```

- [ ] **Step 2: Voice linter + build.**

```bash
ruby scripts/voice-check.rb _docs/anatomyofurl.md && bundle exec jekyll build 2>&1 | tail -3
```

Expected: passes.

- [ ] **Step 3: Commit.**

```bash
git add _docs/anatomyofurl.md
git commit -m "feat(m2l3): draft block 10 (next week at Greenfield teaser)"
```

After Sub-task 7H, all ten `<!-- TODO block:N -->` markers are gone. The lesson body is complete (modulo SVG replacement in Task 11). Run a final voice-linter pass:

- [ ] **Step 3 (sanity): Final voice-linter pass on the complete lesson body.**

```bash
ruby scripts/voice-check.rb _docs/anatomyofurl.md && echo "ALL CLEAN"
```

Expected: prints `ALL CLEAN`.

---

## Task 8: Append the bible Timeline entry

**Files:**
- Modify: `docs/superpowers/greenfield-bible.md` (append to Timeline section)

Per M1L5/M2L1/M2L2 retro: append at the bottom of the Timeline section, do NOT in-place-replace.

- [ ] **Step 1: Read the current bible to find the insertion point.**

```bash
grep -n "^## " docs/superpowers/greenfield-bible.md | head -20
```

Expected: shows section headers. Locate the line `## API entities` or `## Locked details` — the Timeline section ends just before whichever of those sections appears after it.

- [ ] **Step 2: Append the M2L3 Timeline entry just before the next top-level section.**

Insert this exact content as a new entry at the end of the Timeline section (after the last existing `## Module ...` entry, which is M2L2):

```markdown
## Module 2, Lesson 3. Maya reviews Devon's advanced-filter PR.
Story date: Tuesday morning, story week 6. Seven days after M2L2's Tuesday-morning whiteboard scene; fourteen days after M2L1's Tuesday-morning Devon-at-desk scene; eighteen days after Asha's email landed Friday evening of story week 3. Maya did her standing Monday branch visit yesterday.
Event: Devon opened a PR Friday afternoon of story week 5 for Greenfield's new advanced-filter extension of GET /v1/books, adding three new query parameters: branch, shelf, on_shelf. The PR description was one line, terse and Devon-voiced. Tuesday morning Maya opens her laptop, finds the PR in her review queue, and reads the URL left to right while Devon is in standup. The lesson is the URL anatomy reading paired with the apprentice designing their own URL from the same requirements. Honors the advanced-filter writing assignment Devon flagged in M2L1 block 1, delivered in URL-design form; doc-page writing waits for Module 4.
Characters present: Maya (at her own laptop, not at Greenfield's office). Devon offstage (in his 9:30 standup, M1L4 callback). The apprentice (the reader) implicit second observer.
New API entities introduced: GET /v1/books extended with three new optional query parameters — branch (string, branch identifier), shelf (string, one of fiction/biography/reference/periodicals), on_shelf (boolean). Existing q (required) and limit (default 25, max 100) unchanged.
New glossary terms introduced: scheme, host, resource, query string.
Quote: "advanced filter, take 4. no POST. yes query string. yes branch_north not north. yes I read RFC 3986." (Devon, in the PR description, opened Friday afternoon of story week 5.)
```

- [ ] **Step 3: Verify the bible file is still valid markdown.**

```bash
tail -30 docs/superpowers/greenfield-bible.md
```

Expected: no broken formatting; the new M2L3 entry appears in sequence after M2L2.

- [ ] **Step 4: Verify build still passes** (the bible is `.gitignore`'d so it does not affect the site build, but just to be safe):

```bash
bundle exec jekyll build 2>&1 | tail -3
```

Expected: no errors.

- [ ] **Step 5: No git commit needed (bible is gitignored; workspace canon only).**

Note: `docs/superpowers/` is gitignored (`.gitignore` line 8), so `git add` will refuse to stage the bible file. Move directly to Task 9.

---

## Task 9: Bible Locked details — 3 appends + 2 in-place edits (six separate Edit operations)

**Files:**
- Modify: `docs/superpowers/greenfield-bible.md`

Per M1L5/M2L1/M2L2 retro: each operation is a separate Edit. Do not collapse.

The M2L3 spec calls for 5 operations on Locked details + API entities (in addition to the Timeline append in Task 8): in-place edit to the RFC tradition entry; three appended new Locked details (shelf taxonomy, advanced-filter extension, Devon's PR voice); in-place edit to the GET /books API entity. Total bible deltas across Tasks 8 and 9: 6 operations.

- [ ] **Step 1: Locate the existing RFC tradition Locked detail.**

```bash
grep -n "The RFC tradition" docs/superpowers/greenfield-bible.md
```

Expected: returns one line number (the existing M2L1 lock).

- [ ] **Step 2: Edit operation 1 of 5 — in-place edit to the RFC tradition Locked detail to add RFC 3986.**

The existing entry (locked in M2L1) reads:

> "The RFC tradition. RFC 1 was Steve Crocker, April 1969. RFC 9110 (2022) is the current HTTP semantics spec Greenfield's server library follows. Either or both can be cited when a lesson needs to invoke the weight of the convention."

Replace it with this exact extended content:

> "The RFC tradition. RFC 1 was Steve Crocker, April 1969. RFC 9110 (2022) is the current HTTP semantics spec Greenfield's server library follows. RFC 3986 (URI Generic Syntax, January 2005) is the canonical reference for URL anatomy and was added to the canon story week 6 (M2L3). When a lesson needs to invoke 'the URL spec' or 'the URI spec', cite RFC 3986. Three RFCs total in the Greenfield canon: RFC 1 (1969, origin), RFC 9110 (2022, HTTP semantics), RFC 3986 (2005, URI syntax). Either, several, or all three can be cited when a lesson needs to invoke the weight of the convention."

- [ ] **Step 3: Edit operation 2 of 5 — locate the existing GET /books API entity entry.**

```bash
grep -n "GET /books" docs/superpowers/greenfield-bible.md
```

Expected: returns one or more line numbers under the `## API entities` section. Locate the `### GET /books` heading and its existing body.

- [ ] **Step 4: Edit operation 2 continued — in-place edit to the GET /books API entity to append three new query parameters.**

Find the existing GET /books section. After the last line of the existing body (which should be a "Source of truth for ..." line or similar trailing line), append this exact content as a continuation of the same section (do not start a new `###` heading):

```markdown
- Additional query parameters (added story week 6, M2L3 advanced-filter extension):
  - branch: string, optional. Branch identifier, e.g. branch_north. Filters results to books currently in the named branch's catalog.
  - shelf: string, optional. One of fiction, biography, reference, periodicals. Filters results to books cataloged on the named shelf.
  - on_shelf: boolean, optional. When true, filters results to books currently on shelf (not on loan, not on hold).
- Canonical advanced-filter URL: https://api.greenfield.lib/v1/books?q=mystery&branch=branch_north&shelf=fiction&on_shelf=true
```

- [ ] **Step 5: Edit operation 3 of 5 — append new Locked detail (shelf taxonomy).**

Find the end of the `## Locked details` section (the last bullet item before the `## Open universe questions` section, if present). Append this exact line as a new bullet item at the end:

```markdown
- **Greenfield's shelf taxonomy.** The catalog classifies books across four shelves: `fiction`, `biography`, `reference`, `periodicals`. The `shelf=` query parameter on `GET /v1/books` (M2L3 advanced-filter extension) accepts one of these four values. Future code samples using shelf names pick from this set. Distinct from the physical aisle order — branches still shelve fiction alphabetically by author per M1L5; shelf taxonomy is the catalog's classification, not the aisle map.
```

- [ ] **Step 6: Edit operation 4 of 5 — append new Locked detail (advanced-filter extension).**

Append this exact line as the next bullet:

```markdown
- **Advanced-filter extension of `GET /v1/books`.** Three new optional query parameters shipped story week 6: `branch` (string, branch identifier), `shelf` (string, one of the four taxonomy values), `on_shelf` (boolean, `true` means currently on shelf). Designed and shipped by Devon (PR opened Friday afternoon of story week 5, reviewed by Maya Tuesday morning of week 6). Honors M2L1's "next week you write the docs for Greenfield's new advanced-filter endpoint" promise via URL design; doc-page writing waits for Module 4.
```

- [ ] **Step 7: Edit operation 5 of 5 — append new Locked detail (Devon's PR-description voice).**

Append this exact line as the next bullet:

```markdown
- **Devon's PR-description voice.** Terse, deadpan, slightly aggrieved, signals "I already thought about this so don't make me explain." Canonical from M2L3 forward. Pattern: lowercase, sentence fragments separated by periods, leading `yes`/`no` stack to preempt review questions. May reappear when Devon opens a PR in later lessons (likely Module 4 writing-the-docs and Module 8 capstone audit).
```

- [ ] **Step 8: Verify all six bible changes landed correctly** (this Task's 5 + Task 8's 1 Timeline append).

```bash
grep -c "Module 2, Lesson 3" docs/superpowers/greenfield-bible.md
grep -c "RFC 3986" docs/superpowers/greenfield-bible.md
grep -c "shelf taxonomy" docs/superpowers/greenfield-bible.md
grep -c "Advanced-filter extension" docs/superpowers/greenfield-bible.md
grep -c "PR-description voice" docs/superpowers/greenfield-bible.md
grep -c "Additional query parameters" docs/superpowers/greenfield-bible.md
```

Expected: each grep returns 1 or higher.

- [ ] **Step 9: No git commit needed (bible is gitignored).**

The bible appends and in-place edits exist on disk; they are workspace canon. Move to Task 10.

---

## Task 10: Delete legacy orphan assets (after grep verification)

**Files:** (subject to grep verification in Step 1; any of these that ARE referenced by other lessons get skipped):
- Delete: `_includes/url-anatomy-interactive.html`
- Delete: `_data/url_faqs.yml`
- Delete: `_data/anatomyofurl_questions.yml`
- Delete: `assets/images/api-docs-anatomyofurl.svg`

Plus possibly surgical edits to `_data/questions.yml` if its `protocol`/`domain`/`path`/`query_parameters`/`fragment` keys are unused elsewhere.

Spec Section 3.3 names these as orphan candidates after the rewrite. Grep before deletion to ensure no other lesson references them.

- [ ] **Step 1: Grep for any remaining references to the four delete candidates.**

```bash
git grep -E 'url-anatomy-interactive|url_faqs|anatomyofurl_questions|api-docs-anatomyofurl' _docs/ _includes/ _layouts/ _data/ assets/ 2>/dev/null
```

Expected: the only matches should be inside `_docs/anatomyofurl.md` BEFORE this task — but by this task the lesson is fully rewritten and should not reference any of them. So expected: NO matches.

If any match appears in `_docs/anatomyofurl.md`, that means the new lesson body inadvertently kept a legacy reference; STOP and remove from the lesson body before continuing.

If any match appears in any OTHER file, STOP and remove that file from the delete list below; it is still in use.

- [ ] **Step 2: Grep for the `_data/questions.yml` keys to decide if any need surgical edit.**

```bash
git grep -E 'questions\.protocol|questions\.domain|questions\.path|questions\.query_parameters|questions\.fragment|site\.data\.questions\.' _docs/ _includes/ _layouts/ 2>/dev/null
```

Expected: the legacy lesson's includes referenced these keys via `{% include question_box.html questions=site.data.questions.protocol %}` etc. After this task, no `_docs/*.md` should reference them. If the only remaining references are inside `_data/questions.yml` itself, the keys can be surgically removed in Step 6. If any reference remains in another file, leave the keys alone (they're shared).

- [ ] **Step 3: Confirm the four delete candidates actually exist** (no surprises).

```bash
ls -la _includes/url-anatomy-interactive.html _data/url_faqs.yml _data/anatomyofurl_questions.yml assets/images/api-docs-anatomyofurl.svg 2>&1
```

Expected: all four files listed (or "No such file" for any that already does not exist). Remove missing files from Step 4's deletion list.

- [ ] **Step 4: Delete the orphan files** (skip any that Step 1 flagged as still-in-use or Step 3 showed missing).

```bash
git rm _includes/url-anatomy-interactive.html _data/url_faqs.yml _data/anatomyofurl_questions.yml assets/images/api-docs-anatomyofurl.svg
```

Expected: each existing file removed from working tree and staged for deletion. If any of the four was excluded above, drop it from this command.

- [ ] **Step 5: Verify build still passes (no broken references).**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 6: (Conditional) Surgical edit to `_data/questions.yml` if Step 2 confirmed the keys are unused elsewhere.**

If Step 2 showed the keys `protocol`, `domain`, `path`, `query_parameters`, `fragment` are unused in any `_docs/` file, edit `_data/questions.yml` to remove those five keys. Use the Read tool first to see the structure, then Edit to remove the keys.

If Step 2 showed any of these keys is referenced by another lesson, skip this step; leave `_data/questions.yml` untouched. (Most likely: the keys are only used by the legacy `_includes/url-anatomy-interactive.html` and are now safe to remove. Verify before editing.)

- [ ] **Step 7: Verify HTMLProofer is clean for the new lesson.**

```bash
bundle exec htmlproofer _site/anatomyofurl.html --swap-urls '^/apidocumentation:' 2>&1 | tail -10
```

Expected: 0 errors. If HTMLProofer reports broken image references, search the new lesson for any stray `<img>` or `image:` references that point at deleted paths.

- [ ] **Step 8: Commit.**

```bash
git commit -m "chore(m2l3): delete orphan legacy assets (url-anatomy-interactive, url_faqs, anatomyofurl_questions, api-docs-anatomyofurl)"
```

If Step 6's surgical edit landed, include it in the same commit. The commit message can be adjusted to mention `_data/questions.yml` if needed.

---

## Task 11: Build the real interactive SVG

**Files:**
- Modify: `assets/svg/anatomyofurl/main.svg` (replace the Task 3 stub with the real 5-region hover-tooltip URL)

Spec Section 3.2 specifies the layout, hover content, colors, focus, and performance budget. Color hex values from `tailwind.config.js`:
- ink: `#0c1a2b`
- cream: `#fbf8f3`
- copper: `#b85c38`
- sage: `#5a7a64`

URL layout (re-verified from spec): `viewBox="0 0 900 300"`. The URL `https://api.greenfield.lib/v1/books?q=mystery&branch=branch_north&shelf=fiction&on_shelf=true` (95 chars) is wrapped to two lines via manual `<text>` placement:
- Line 1 (y=120): `https://api.greenfield.lib/v1/books`
- Line 2 (y=180): `?q=mystery&branch=branch_north&shelf=fiction&on_shelf=true`

Five hover regions, each a `<g>` with `tabindex="0"`, `role="button"`, `data-tooltip="..."`. Per the spec, line 2 is rendered with mixed coloring: `?q=mystery` in ink (existing), and `&branch=branch_north`, `&shelf=fiction`, `&on_shelf=true` in copper (new this PR). The query string `<g>` wraps the entire line 2 as a single hover region.

- [ ] **Step 1: Replace the stub SVG with the real implementation.**

Replace the entire contents of `assets/svg/anatomyofurl/main.svg` with this exact content:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;" data-svg-pattern="hover-tooltip" role="img" aria-label="The advanced filter URL rendered as visible text wrapped to two lines, with the five URL parts as hoverable regions and the three new query parameters rendered in copper.">
  <title>Greenfield's advanced filter URL with five hoverable parts</title>
  <desc>The URL https://api.greenfield.lib/v1/books?q=mystery&amp;branch=branch_north&amp;shelf=fiction&amp;on_shelf=true wrapped to two lines. Line 1 carries the scheme (https), host (api.greenfield.lib), version (/v1), and resource (/books). Line 2 carries the query string with q=mystery in ink and the three new query parameters (branch, shelf, on_shelf) in copper. Hovering or tapping each part reveals what it commits to and who reads it downstream.</desc>

  <rect x="0" y="0" width="900" height="300" fill="#fbf8f3" />

  <!-- Title above the URL -->
  <text x="450" y="50" text-anchor="middle" font-family="Georgia, serif" font-size="14" fill="#5a7a64">The advanced filter URL. Hover or tap each part.</text>

  <!-- ===== Line 1: scheme, host, version, resource (all ink) ===== -->
  <!-- The full line 1 text reference (for measuring): https://api.greenfield.lib/v1/books -->
  <!-- We render each hoverable region as its own <text> for layout control, with a separator text in between -->

  <!-- Region: scheme (https) -->
  <g tabindex="0" role="button" aria-label="scheme: https" data-tooltip="The protocol the client speaks. HTTPS means encrypted. Every byte after the :// is unreadable to anything in the middle. Greenfield is HTTPS like every public API a 2026 reader is calling.">
    <rect x="40" y="98" width="60" height="36" fill="transparent" />
    <text x="40" y="124" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="#0c1a2b">https</text>
    <line x1="40" y1="138" x2="100" y2="138" stroke="#5a7a64" stroke-width="1" stroke-dasharray="2,2" />
  </g>

  <!-- Separator: :// -->
  <text x="100" y="124" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="#0c1a2b">://</text>

  <!-- Region: host (api.greenfield.lib) -->
  <g tabindex="0" role="button" aria-label="host: api.greenfield.lib" data-tooltip="What DNS resolves to an IP address. The api. subdomain separates the API server from Greenfield's public site at greenfield.lib. Two different machines, same registered domain.">
    <rect x="138" y="98" width="220" height="36" fill="transparent" />
    <text x="138" y="124" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="#0c1a2b">api.greenfield.lib</text>
    <line x1="138" y1="138" x2="358" y2="138" stroke="#5a7a64" stroke-width="1" stroke-dasharray="2,2" />
  </g>

  <!-- Region: version (/v1) -->
  <g tabindex="0" role="button" aria-label="version: /v1" data-tooltip="The version segment Devon put in the URL on day one. When Greenfield ships v2, /v1 keeps working until Devon turns it off. Some APIs hide the version in a header. Devon keeps it visible.">
    <rect x="358" y="98" width="44" height="36" fill="transparent" />
    <text x="358" y="124" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="#0c1a2b">/v1</text>
    <line x1="358" y1="138" x2="402" y2="138" stroke="#5a7a64" stroke-width="1" stroke-dasharray="2,2" />
  </g>

  <!-- Region: resource (/books) -->
  <g tabindex="0" role="button" aria-label="resource: /books" data-tooltip="The noun. The handler that serves this URL is the books handler. The query string changes which books come back; the resource decides the response is about books in the first place.">
    <rect x="402" y="98" width="80" height="36" fill="transparent" />
    <text x="402" y="124" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="#0c1a2b">/books</text>
    <line x1="402" y1="138" x2="482" y2="138" stroke="#5a7a64" stroke-width="1" stroke-dasharray="2,2" />
  </g>

  <!-- ===== Line 2: query string (one hover region wrapping the whole line) ===== -->
  <!-- Coloring is mixed: ?q=mystery in ink, the three new params in copper -->

  <g tabindex="0" role="button" aria-label="query string: ?q=mystery and three new params" data-tooltip="Four name=value pairs separated by &amp;. The first, q=mystery, was already there. You added branch, shelf, and on_shelf this morning. The query string parameterizes the handler. Same handler, different filter.">
    <rect x="40" y="170" width="820" height="40" fill="transparent" />
    <!-- ?q=mystery in ink (existing) -->
    <text x="40" y="200" font-family="ui-monospace, Menlo, monospace" font-size="20" fill="#0c1a2b">?q=mystery</text>
    <!-- &branch=branch_north in copper (new) -->
    <text x="170" y="200" font-family="ui-monospace, Menlo, monospace" font-size="20" fill="#b85c38">&amp;branch=branch_north</text>
    <!-- &shelf=fiction in copper (new) -->
    <text x="425" y="200" font-family="ui-monospace, Menlo, monospace" font-size="20" fill="#b85c38">&amp;shelf=fiction</text>
    <!-- &on_shelf=true in copper (new) -->
    <text x="605" y="200" font-family="ui-monospace, Menlo, monospace" font-size="20" fill="#b85c38">&amp;on_shelf=true</text>
    <line x1="40" y1="214" x2="780" y2="214" stroke="#5a7a64" stroke-width="1" stroke-dasharray="2,2" />
  </g>

  <!-- Legend below the URL -->
  <text x="40" y="250" font-family="Georgia, serif" font-size="13" fill="#0c1a2b">
    <tspan>Ink: what was already there. </tspan><tspan fill="#b85c38">Copper: what you just wrote.</tspan>
  </text>
</svg>
```

Notes on the SVG:
- `&` in `data-tooltip` values and `<text>` contents is XML-escaped as `&amp;`.
- Each `<g>` cell has `tabindex="0"`, `role="button"`, and `aria-label`; the focus ring is provided by the framework's CSS `:focus-visible`.
- The framework's `initHoverTooltip` reads `data-tooltip` and renders the tooltip on hover/focus.
- Static fallback: with JS off, the full URL renders with copper emphasis on the three new params. No tooltips show but the visual content is intact.
- X-coordinates on line 2 are tuned for a monospace font at 20px. If kerning shifts slightly on render, adjust the four `<text>` x-offsets in Step 4.

- [ ] **Step 2: Verify SVG renders.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. The site builds.

- [ ] **Step 3: Verify SVG file size is under budget.**

```bash
wc -c assets/svg/anatomyofurl/main.svg
```

Expected: under 40,000 bytes (40KB raw). If over, simplify the markup (drop comments, tighten attributes).

Then check gzipped size:

```bash
gzip -c assets/svg/anatomyofurl/main.svg | wc -c
```

Expected: under 12,000 bytes (12KB gzipped).

- [ ] **Step 4: Manual visual verification on desktop.**

Start the dev server:

```bash
bundle exec jekyll serve --baseurl '' --detach
```

Open `http://localhost:4000/anatomyofurl.html` in a browser. Verify:
- Line 1 of the URL renders with all four parts (https, ://, api.greenfield.lib, /v1, /books) in ink.
- Line 2 renders with `?q=mystery` in ink and the three new params (`&branch=branch_north`, `&shelf=fiction`, `&on_shelf=true`) in copper.
- The legend text at the bottom reads "Ink: what was already there. Copper: what you just wrote." with the "Copper:" half in copper color.
- Hover or tap each of the 5 regions — a tooltip appears with the relevant content from the table in spec Section 3.2.
- Tab through the 5 regions — focus ring (copper) is visible on each.
- Press Enter or Space on a focused region — tooltip appears.
- Press Escape — tooltip dismisses.

If any X-coordinate on line 2 produces a visible gap or overlap between the four text spans, adjust the x-offsets in the SVG (most likely `170`, `425`, `605` will need ±10-30px tweaks based on actual font metrics).

Stop the dev server:

```bash
pkill -f "jekyll serve"
```

- [ ] **Step 5: Tooltip rendering at three viewport breakpoints.**

Restart the dev server. Use browser dev tools to set viewport widths and check tooltip rendering:
- 375px (mobile): the SVG scales down via `max-width:100%`. Tooltips should not truncate and should reflow inside viewport. The query-string region's tooltip is the widest at ~40 words; verify it does not clip on the right edge.
- 768px (tablet): tooltips render at natural width.
- 1280px (desktop): tooltips render at natural width.

For the query-string region specifically: tap-and-hold near the right edge of the URL line on iOS Safari 16 (or simulated via dev tools). The framework's `getBoundingClientRect`-based positioning should clamp the tooltip inside the viewport. If it clips, either shorten the tooltip's `data-tooltip` text to ~25 words or extend the framework with a width cap (note framework change in PR description if so).

Stop the dev server when done:

```bash
pkill -f "jekyll serve"
```

- [ ] **Step 6: Commit.**

```bash
git add assets/svg/anatomyofurl/main.svg
git commit -m "feat(m2l3): real interactive SVG (5-region URL with copper-highlighted new params)"
```

---

## Task 12: Full verification pass before PR

**Files:** none modified.

- [ ] **Step 1: Voice linter on the final lesson.**

```bash
ruby scripts/voice-check.rb _docs/anatomyofurl.md && echo "VOICE OK"
```

Expected: prints `VOICE OK`.

- [ ] **Step 2: Verify all ten block markers are present in order.**

```bash
grep -nE 'block:[0-9]+' _docs/anatomyofurl.md
```

Expected: ten matches in order: `block:1`, `block:2`, `block:3`, ..., `block:10`. No `TODO block:N` lines remain.

- [ ] **Step 3: Verify no remaining TODO markers.**

```bash
grep -nE 'TODO|TBD|FIXME' _docs/anatomyofurl.md
```

Expected: no matches.

- [ ] **Step 4: Verify the four glossary terms resolve.**

```bash
ruby -ryaml -e '
g = YAML.load_file("_data/glossary.yml")
terms = g.map { |e| e["term"] }
required = ["scheme", "host", "resource", "query string", "REST"]
missing = required - terms
puts missing.empty? ? "ALL TERMS PRESENT" : "MISSING: #{missing.join(", ")}"
'
```

Expected: prints `ALL TERMS PRESENT`.

- [ ] **Step 5: Verify the "Read it left to right" spine phrase appears in five places.**

```bash
grep -nE 'Read it left to right|read his left to right' _docs/anatomyofurl.md
```

Expected: five matches across blocks 1, 3, 5, 8, 9. If the count differs from five, check the spec's Section 4.4 spine list and reconcile.

- [ ] **Step 6: Verify the bible appends and in-place edits are present (workspace check only since gitignored).**

```bash
grep -c "Module 2, Lesson 3" docs/superpowers/greenfield-bible.md
grep -c "RFC 3986" docs/superpowers/greenfield-bible.md
grep -c "shelf taxonomy" docs/superpowers/greenfield-bible.md
grep -c "Advanced-filter extension" docs/superpowers/greenfield-bible.md
grep -c "PR-description voice" docs/superpowers/greenfield-bible.md
grep -c "Additional query parameters" docs/superpowers/greenfield-bible.md
```

Expected: each grep returns 1 or higher.

- [ ] **Step 7: Verify reading time.**

```bash
words=$(wc -w < _docs/anatomyofurl.md); echo "Words: $words; estimated reading time: $(echo "$words / 150 + 3" | bc) minutes"
```

Expected: estimated reading time is between 12 and 18 minutes. If under 12, the rewrite trimmed too aggressively (check that all blocks have content). If over 18, trim Block 3 or Block 4 (the version subsection in Block 3 is the first trim candidate per spec; the bracketed counterfactual in Block 4 is the second).

- [ ] **Step 8: Full production-style build.**

```bash
npm run build:css && bundle exec jekyll build 2>&1 | tail -10
```

Expected: no errors; exit 0.

- [ ] **Step 9: HTMLProofer on the new lesson.**

```bash
bundle exec htmlproofer _site/anatomyofurl.html --swap-urls '^/apidocumentation:' 2>&1 | tail -10
```

Expected: 0 errors.

- [ ] **Step 10: Confirm orphan assets are gone (only those Task 10 actually deleted).**

```bash
ls _includes/url-anatomy-interactive.html 2>&1 || echo "OK: url-anatomy-interactive.html deleted"
ls _data/url_faqs.yml 2>&1 || echo "OK: url_faqs.yml deleted"
ls _data/anatomyofurl_questions.yml 2>&1 || echo "OK: anatomyofurl_questions.yml deleted"
ls assets/images/api-docs-anatomyofurl.svg 2>&1 || echo "OK: api-docs-anatomyofurl.svg deleted"
```

Expected: "OK: <file> deleted" lines for each file that was in Task 10's actual delete list. Any file Task 10 skipped (because it was in use elsewhere) will print its `ls` output normally.

- [ ] **Step 11: Confirm no stale references in any tracked file.**

```bash
git grep -E 'url-anatomy-interactive|url_faqs|anatomyofurl_questions|api-docs-anatomyofurl'
```

Expected: empty (no matches) for any file Task 10 deleted. Files Task 10 left in place may still appear here — that's expected if they're shared with other lessons.

- [ ] **Step 12: Check the git log of this branch.**

```bash
git log master..HEAD --oneline
```

Expected: shows roughly 14-16 commits — skeleton (1), stub SVG (2), glossary (3), block 3 (4), block 4 (5), eight sub-task commits for blocks 5/6/1/2/7/8/9/10 (6 through 13), orphan deletion (14), real SVG (15). Each commit has a `feat(m2l3):` or `chore(m2l3):` prefix.

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
git push -u origin rewrite/anatomyofurl
```

Expected: branch published; gh sets upstream.

- [ ] **Step 3: Open the PR using `gh`.**

```bash
gh pr create --base master --title "feat(m2l3): rewrite Anatomy of a URL (part 1) in Maya's voice" --body "$(cat <<'EOF'
## Summary

Rewrites `_docs/anatomyofurl.md` (Module 2 Lesson 3) end-to-end against the Phase 2 framework. Drops the legacy 5-component reference card and API-types comparison table. Reframes URL anatomy as the substrate of URL design: block 3 reads Greenfield's URL left to right, block 4 hands the apprentice the advanced-filter URL-design assignment Devon flagged in M2L1 block 1. Delivers the URL-design slice of that promise; doc-page writing waits for Module 4. Permalink `/anatomyofurl.html` preserved.

- Spec: `docs/superpowers/specs/2026-05-31-m2l3-anatomyofurl-design.md`
- Plan: `docs/superpowers/plans/2026-05-31-m2l3-anatomyofurl-plan.md`

## Changes

- **Lesson body.** Full rewrite of `_docs/anatomyofurl.md`. Ten blocks per parent Phase 2 spec. Frame: "read before you write." Five URL parts in scope (scheme, host, version, resource, query string); fragments, port, encoding, path parameters deferred to M2L4.
- **Interactive SVG.** New `assets/svg/anatomyofurl/main.svg` — hand-authored 5-region hover-tooltip URL. Two-line wrap; three new query params (`branch`, `shelf`, `on_shelf`) emphasized in copper; existing parts in ink. Hover or tap each region for the URL part's commitments and downstream readers.
- **Mermaid.** Block 3 sequence diagram showing request routing (4 participants — Atlas, DNS, Greenfield API, books handler — 5 messages, 2 notes). Shows where each URL part is consumed downstream.
- **Greenfield API extension.** GET /v1/books gains three new optional query parameters: `branch` (string), `shelf` (string), `on_shelf` (boolean). Canonical advanced-filter URL: `https://api.greenfield.lib/v1/books?q=mystery&branch=branch_north&shelf=fiction&on_shelf=true`.
- **Glossary.** Four new entries in `_data/glossary.yml`: scheme, host, resource, query string.
- **Bible.** 1 Timeline entry + 3 new Locked details (shelf taxonomy, advanced-filter extension, Devon's PR-description voice) + 2 in-place edits (RFC tradition adds RFC 3986; GET /books entity adds three query params) appended to `docs/superpowers/greenfield-bible.md` (gitignored; workspace canon).
- **AI tip.** Block 8 names Cursor (second appearance in the tool rotation; M1L4 used Cursor for codebase questions, M2L3 uses it for URL design review).
- **Legacy cleanup.** Up to four orphan assets deleted after grep verification: `_includes/url-anatomy-interactive.html`, `_data/url_faqs.yml`, `_data/anatomyofurl_questions.yml`, `assets/images/api-docs-anatomyofurl.svg`. Plus possible surgical edits to `_data/questions.yml` keys.

## Test plan

- [ ] Voice linter passes (`ruby scripts/voice-check.rb _docs/anatomyofurl.md`)
- [ ] Build green (`npm run build:css && bundle exec jekyll build`)
- [ ] HTMLProofer clean (`bundle exec htmlproofer _site/anatomyofurl.html --swap-urls '^/apidocumentation:'`)
- [ ] Mermaid renders on cream background
- [ ] Interactive SVG: all 5 regions hover; three new params visually emphasized in copper; existing parts in ink; legend visible
- [ ] Tooltips render at 375px, 768px, 1280px without truncation (especially the wide query-string region)
- [ ] Keyboard navigable (Tab, Enter, Space, Escape); focus ring visible; `prefers-reduced-motion` respected
- [ ] Static fallback (JS off): full URL renders with copper emphasis on new params
- [ ] Reading time 12 to 18 minutes (`wc -w / 150 + 3`)
- [ ] **Earned joke (Devon's PR description) gets human laugh-test from Gaurav**
- [ ] **M2L1 promise lineage**: Block 1 references "the one Devon flagged the week we first talked about REST"; Block 4 delivers the URL-design slice
- [ ] `module: 2`, `lesson: 3` frontmatter reconciles with `_data/modules.yml`
- [ ] "Read it left to right" spine phrase appears in five places (block 1 close, block 3 H2, block 5, block 8 prompt, block 9)
- [ ] Block 4 counterfactual URLs use canonical Greenfield identifiers (`branch_north`, `fiction`) not generic placeholders
- [ ] Block 6 uses M2L2-locked "RPC in a REST jacket" image unchanged
- [ ] PR code host is NOT named in lesson body (stays generic: "the PR", "the repo", "the OpenAPI diff")
- [ ] No remaining references to deleted orphan assets in any tracked file

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: PR opens, URL printed. Save the URL for the human review step.

- [ ] **Step 4: Tag for human review.**

The PR is ready for Gaurav's review. The DoD checklist in the PR body and Section 5 of the spec is the canonical pre-merge gate. Critical items requiring human judgment:

1. The earned joke in block 1 (Devon's PR description: `"advanced filter, take 4. no POST. yes query string. yes branch_north not north. yes I read RFC 3986."`) needs a thumbs-up. Three backups in spec Section 4.4 if it does not land.
2. The 5-region URL SVG needs visual verification on at least one mobile device (iOS Safari 16 or Chrome on Android). Tap each region; confirm tooltip clamps correctly even at the right edge.
3. The Mermaid renders correctly on the cream page background.
4. Block 6's "RPC in a REST jacket" image reads as a Devon line (not forced).
5. Block 4 counterfactual section reads as Maya thinking through what the apprentice might have done — not as a checklist.

After Gaurav approves, the merge to `master` triggers the GitHub Pages deploy via `.github/workflows/build.yml`. Live site at `https://beingtechnicalwriter.com/apidocumentation/anatomyofurl.html`.

---

## Post-ship checklist (for after the PR merges)

Not part of the implementation; for the post-merge retro session.

- [ ] Confirm live URL serves the rewritten lesson.
- [ ] Spot-check Mermaid and SVG render in the production build.
- [ ] Skim GA4 traffic 30 days post-ship to check the title change (`Understanding URL Anatomy - The Building Blocks of API Endpoints` → `Anatomy of a URL (part 1)`) did not tank search ranking.
- [ ] Write the post-ship retro at `docs/superpowers/specs/retros/anatomyofurl.md` — three notes max (what worked, what to change in spec, what to change in workflow). Following M1L4/M2L1/M2L2 retro format.
- [ ] Strike through M2L3 in CLAUDE.md's "Next-lesson queue" and move to M2L4 brainstorming. **Critical for M2L4 spec**: it must claim fragments, port, path parameters, encoding, traversal, ambiguous slashes explicitly in its scope perimeter, or M2L3's block 10 bridge goes unredeemed.

---

## Notes for the executor

- **Bible commits.** `docs/superpowers/` is in `.gitignore` (line 8). Bible Timeline, Locked details, and in-place edits in Tasks 8 and 9 modify the file on disk but cannot be `git add`'d. The bible is workspace canon, kept locally per-machine.
- **Spec is also gitignored.** Same reason. The spec at `docs/superpowers/specs/2026-05-31-m2l3-anatomyofurl-design.md` exists on disk but does not appear in git status.
- **`p.md` at repo root** is unrelated user notes, not part of this work. Leave untracked.
- **Hyphen watchlist** is in spec Section 4.4. If the voice linter flags something, check the 12-row table first before guessing a rewrite.
- **The "Read it left to right" spine phrase** appears in five intentional places (block 1 close, block 3 H2, block 5, block 8 prompt, block 9). Do not vary the phrasing during drafting; do not dilute by adding a sixth use.
- **Block 4 counterfactuals must use canonical Greenfield identifiers**: `branch_north` not `north`, `fiction` not generic. The spec calls this out as load-bearing for the lesson's grounding.
- **The PR code host stays generic** ("the PR", "the repo", "the OpenAPI diff"). Greenfield's bible does not lock GitHub/GitLab/Gitea, and M2L3 should not lock one mid-lesson.
- **Cursor framing**: "the code editor with AI built in" — Cursor IS the editor, not an assistant inside another editor. Spec Section 4.4 calls this out.
- **M2L4 inheritance**: M2L3's block 10 promises fragments/port/path parameters/encoding/traversal/ambiguous slashes for next week. The M2L4 spec (next session) MUST claim these in its scope perimeter or the bridge goes stale.
