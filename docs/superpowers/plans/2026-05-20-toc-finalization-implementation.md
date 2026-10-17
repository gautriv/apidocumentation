# TOC Finalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lock the 46-lesson TOC by updating `_data/modules.yml`, adjacent lesson frontmatter, three new stub files, the homepage hero copy, `CLAUDE.md`, and the 2026-05-19 spec, then verify all six Definition-of-Done items in Section 7 of the TOC-finalization spec.

**Architecture:** Pure Jekyll content/config edits. No new code. Verification is a local build (`npm run build:css && bundle exec jekyll build`) plus a handful of grep checks against the generated `_site/`. One terminal commit at the end pushes everything that is tracked (CLAUDE.md and the spec files are gitignored and stay local-only).

**Tech Stack:** Jekyll 4, Tailwind 3, YAML (_data/modules.yml), Markdown (_docs/*.md), HTML/Liquid (_layouts/*.html).

**Spec:** `docs/superpowers/specs/2026-05-20-toc-finalization-design.md`.

---

## Files

**Modify (tracked, will be committed):**
- `_data/modules.yml` — insert 3 placeholder lesson entries
- `_docs/requestandresponse.md` — update `next_page` to pagination stub
- `_docs/curl.md` — update `previous_page` to pagination stub; bump `lesson: 6 → 7`
- `_docs/visualdatatypes.md` — update `next_page` to quickstart stub
- `_docs/writingapi.md` — update `previous_page` to quickstart stub; bump `lesson: 1 → 2`
- `_docs/bridginggaps.md` — bump `lesson: 2 → 3`
- `_layouts/home.html` — replace "36 lessons" / "Thirty-six lessons" with 46 / Forty-six on lines 24 and 98

**Create (tracked, will be committed):**
- `_docs/pagination-idempotency-rate-limits.md` — Module 2 Lesson 6 stub
- `_docs/quickstart-that-ships.md` — Module 4 Lesson 1 stub
- `_docs/eval-driven-docs.md` — Module 7 Lesson 5 stub

**Modify (gitignored, local-only):**
- `CLAUDE.md` — update queue to 45 items, "43 lesson slots" → "46 lesson slots"
- `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md` — Section 1 per-module lesson counts and module-closer notes

**Out of scope for this plan:**
- The remaining 27 lesson `previous_page` / `next_page` chains that were already off from the alphabetical-frontmatter era. Only chains affected by the three new insertions are touched here. A separate plan can sweep the full chain later if needed.
- Content of the three new stubs beyond a one-paragraph placeholder. The actual lesson rewrites are out of scope.
- Module 1 Lesson 1 brainstorm. That starts in the NEXT session after this plan executes.

---

## Task 1. Insert the three new placeholders in `_data/modules.yml`.

**Files:**
- Modify: `_data/modules.yml`

- [ ] **Step 1.1. Add `pagination-idempotency-rate-limits` between `apirequestsresponses` and `curl` in Module 2.**

Use Edit tool to replace this string in `_data/modules.yml`:

```yaml
    - { slug: "apirequestsresponses.html", title: "Request & response", reading: "15 min" }
    - { slug: "curl.html", title: "cURL — and why you should still know it", reading: "15 min" }
```

with:

```yaml
    - { slug: "apirequestsresponses.html", title: "Request & response", reading: "15 min" }
    - { slug: "pagination-idempotency-rate-limits.html", title: "Pagination, idempotency, rate limits", reading: "—", placeholder: true }
    - { slug: "curl.html", title: "cURL — and why you should still know it", reading: "15 min" }
```

- [ ] **Step 1.2. Add `quickstart-that-ships` as the first lesson of Module 4.**

Edit `_data/modules.yml`, replace:

```yaml
- n: "04"
  title: "Writing the docs"
  slug: "writing-docs"
  isNew: false
  lessons:
    - { slug: "writingapi.html", title: "The bones of an endpoint reference", reading: "10 min" }
```

with:

```yaml
- n: "04"
  title: "Writing the docs"
  slug: "writing-docs"
  isNew: false
  lessons:
    - { slug: "quickstart-that-ships.html", title: "Quickstart that ships in 5 minutes", reading: "—", placeholder: true }
    - { slug: "writingapi.html", title: "The bones of an endpoint reference", reading: "10 min" }
```

- [ ] **Step 1.3. Add `eval-driven-docs` between `prompt-engineering-for-docs` and `ai-doc-assistant` in Module 7.**

Edit `_data/modules.yml`, replace:

```yaml
    - { slug: "prompt-engineering-for-docs.html", title: "Prompt-engineering for doc generation", reading: "—", placeholder: true }
    - { slug: "ai-doc-assistant.html", title: "Building an AI doc assistant for your docs site", reading: "—", placeholder: true }
```

with:

```yaml
    - { slug: "prompt-engineering-for-docs.html", title: "Prompt-engineering for doc generation", reading: "—", placeholder: true }
    - { slug: "eval-driven-docs.html", title: "Eval-driven docs: testing docs the way you test code", reading: "—", placeholder: true }
    - { slug: "ai-doc-assistant.html", title: "Building an AI doc assistant for your docs site", reading: "—", placeholder: true }
```

- [ ] **Step 1.4. Verify total lesson count is 46.**

Run:

```bash
grep -E '^    - \{ slug:' _data/modules.yml | wc -l
```

Expected output: `46`

- [ ] **Step 1.5. Verify per-module counts are 5, 8, 5, 6, 5, 4, 6, 7.**

Run:

```bash
awk '/^- n:/{if(c)print mod": "c; mod=$0; c=0; next} /^    - \{ slug:/{c++} END{print mod": "c}' _data/modules.yml
```

Expected output:

```
- n: "01": 5
- n: "02": 8
- n: "03": 5
- n: "04": 6
- n: "05": 5
- n: "06": 4
- n: "07": 6
- n: "08": 7
```

If any count is off, re-check that task's edit.

---

## Task 2. Create the three new lesson stub files.

Each stub is a placeholder lesson with valid frontmatter. The body is one sentence so search/feed/sitemap have something but a reader landing on it sees "coming soon." The stubs follow the pilot's frontmatter pattern from `_docs/whatisanapi.md`.

**Files:**
- Create: `_docs/pagination-idempotency-rate-limits.md`
- Create: `_docs/quickstart-that-ships.md`
- Create: `_docs/eval-driven-docs.md`

- [ ] **Step 2.1. Create `_docs/pagination-idempotency-rate-limits.md`.**

Use Write tool with this exact content:

```markdown
---
title: "Pagination, idempotency, rate limits"
permalink: /pagination-idempotency-rate-limits.html
module: 2
lesson: 6
slug: pagination-idempotency-rate-limits
reading_time: 15
description: How agent-heavy APIs survive contact with reality. Pagination cursors, idempotency keys, and the rate-limit headers Atlas can actually read.
previous_page:
  url: /apirequestsresponses.html
  title: Request and response
next_page:
  url: /curl.html
  title: cURL and why you should still know it
placeholder: true
---

This lesson is being written in Phase 2 of the modernization. Check back soon.

{% include signoff.html %}
```

- [ ] **Step 2.2. Create `_docs/quickstart-that-ships.md`.**

Use Write tool with this exact content:

```markdown
---
title: "Quickstart that ships in 5 minutes"
permalink: /quickstart-that-ships.html
module: 4
lesson: 1
slug: quickstart-that-ships
reading_time: 12
description: How to write a quickstart a developer can ship in five minutes and an LLM can summarize without inventing facts. Maya's first task as a full-time hire.
previous_page:
  url: /visualizingdatatypes.html
  title: Visualizing data types
next_page:
  url: /writingapi.html
  title: The bones of an endpoint reference
placeholder: true
---

This lesson is being written in Phase 2 of the modernization. Check back soon.

{% include signoff.html %}
```

- [ ] **Step 2.3. Create `_docs/eval-driven-docs.md`.**

Use Write tool with this exact content:

```markdown
---
title: "Eval-driven docs: testing docs the way you test code"
permalink: /eval-driven-docs.html
module: 7
lesson: 5
slug: eval-driven-docs
reading_time: 16
description: How to verify your docs actually work for an LLM. A small eval suite that runs your docs through an agent and flags the answers that drift.
previous_page:
  url: /prompt-engineering-for-docs.html
  title: Prompt-engineering for doc generation
next_page:
  url: /ai-doc-assistant.html
  title: Building an AI doc assistant for your docs site
placeholder: true
---

This lesson is being written in Phase 2 of the modernization. Check back soon.

{% include signoff.html %}
```

- [ ] **Step 2.4. Verify the three stub files exist.**

Run:

```bash
ls -1 _docs/pagination-idempotency-rate-limits.md _docs/quickstart-that-ships.md _docs/eval-driven-docs.md
```

Expected output: all three filenames listed without errors.

---

## Task 3. Update adjacent lesson chains and lesson numbers.

The three insertions shift the lesson numbers of `curl.md`, `writingapi.md`, and `bridginggaps.md`. They also change two `next_page` / `previous_page` pointers in lessons that surround the new ones.

**Files:**
- Modify: `_docs/requestandresponse.md` (`next_page` target)
- Modify: `_docs/curl.md` (`previous_page` target, `lesson: 6 → 7`)
- Modify: `_docs/visualdatatypes.md` (`next_page` target)
- Modify: `_docs/writingapi.md` (`previous_page` target, `lesson: 1 → 2`)
- Modify: `_docs/bridginggaps.md` (`lesson: 2 → 3`)

- [ ] **Step 3.1. Update `_docs/requestandresponse.md` `next_page`.**

Use Edit tool to replace:

```yaml
next_page:
  url: /writingapi.html
  title: "Writing API Documentation"
```

with:

```yaml
next_page:
  url: /pagination-idempotency-rate-limits.html
  title: "Pagination, idempotency, rate limits"
```

- [ ] **Step 3.2. Update `_docs/curl.md` `previous_page` and bump `lesson`.**

Use Edit tool to replace:

```yaml
module: 2
lesson: 6
```

with:

```yaml
module: 2
lesson: 7
```

Then use Edit tool to replace:

```yaml
previous_page:
  url: /keyconcepts.html
  title: "Key API Concepts"
```

with:

```yaml
previous_page:
  url: /pagination-idempotency-rate-limits.html
  title: "Pagination, idempotency, rate limits"
```

- [ ] **Step 3.3. Update `_docs/visualdatatypes.md` `next_page`.**

Use Edit tool to replace:

```yaml
next_page:
  url: /apirequestsresponses.html
  title: "Understanding API Requests and Responses"
```

with:

```yaml
next_page:
  url: /quickstart-that-ships.html
  title: "Quickstart that ships in 5 minutes"
```

- [ ] **Step 3.4. Update `_docs/writingapi.md` `previous_page` and bump `lesson`.**

Use Edit tool to replace:

```yaml
module: 4
lesson: 1
```

with:

```yaml
module: 4
lesson: 2
```

Then use Edit tool to replace:

```yaml
previous_page:
  url: /apirequestsresponses.html
  title: "API Requests and Responses"
```

with:

```yaml
previous_page:
  url: /quickstart-that-ships.html
  title: "Quickstart that ships in 5 minutes"
```

- [ ] **Step 3.5. Bump `_docs/bridginggaps.md` `lesson` from 2 to 3.**

Use Edit tool to replace:

```yaml
module: 4
lesson: 2
```

with:

```yaml
module: 4
lesson: 3
```

- [ ] **Step 3.6. Verify lesson numbers are correct.**

Run:

```bash
for f in _docs/curl.md _docs/writingapi.md _docs/bridginggaps.md; do
  printf "%-25s " "${f#_docs/}"
  awk '/^---$/{c++; next} c==1 && /^(module|lesson):/' "$f" | tr '\n' ' '
  echo
done
```

Expected output:

```
curl.md                   module: 2 lesson: 7
writingapi.md             module: 4 lesson: 2
bridginggaps.md           module: 4 lesson: 3
```

---

## Task 4. Update `_layouts/home.html` hero counts.

The home hero advertises "36 lessons" in two places. With the TOC at 46, both are stale.

**Files:**
- Modify: `_layouts/home.html:24` and `_layouts/home.html:98`

- [ ] **Step 4.1. Replace the "36 lessons" line in the hero meta.**

Use Edit tool to replace:

```html
        <span>4.8 &middot; 152 reviews &middot; 36 lessons &middot; Free, forever &middot; No sign-in</span>
```

with:

```html
        <span>4.8 &middot; 152 reviews &middot; 46 lessons &middot; Free, forever &middot; No sign-in</span>
```

- [ ] **Step 4.2. Replace the "Thirty-six lessons" line in the What's-Inside section.**

Use Edit tool to replace:

```html
      <h2 class="h-display text-4xl font-medium leading-tight">Eight modules. Thirty-six lessons. One opinionated point of view.</h2>
```

with:

```html
      <h2 class="h-display text-4xl font-medium leading-tight">Eight modules. Forty-six lessons. One opinionated point of view.</h2>
```

- [ ] **Step 4.3. Verify both updates landed.**

Run:

```bash
grep -nE "(36|Thirty-six|46|Forty-six) lessons?" _layouts/home.html
```

Expected output (line numbers approximate; exact match on the words is the contract):

```
24:        <span>4.8 &middot; 152 reviews &middot; 46 lessons &middot; Free, forever &middot; No sign-in</span>
98:      <h2 class="h-display text-4xl font-medium leading-tight">Eight modules. Forty-six lessons. One opinionated point of view.</h2>
```

No line should still contain `36 lessons` or `Thirty-six lessons`.

---

## Task 5. Update `CLAUDE.md` queue and count (local-only, gitignored).

`CLAUDE.md` is not in git tracking (`ca16596 chore: remove internal files from git tracking`), but it is read by Claude at session start and remains the operative source of truth for the queue.

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 5.1. Replace the "43 lesson slots" reference with "46 lesson slots".**

Use Edit tool to replace:

```
`_data/modules.yml` — 8 modules, 43 lesson slots (27 existing, 16 placeholders as of 2026-05-20). The sidebar nav, prev/next, breadcrumbs all read from this.
```

with:

```
`_data/modules.yml` — 8 modules, 46 lesson slots (27 existing, 19 placeholders as of 2026-05-20). The sidebar nav, prev/next, breadcrumbs all read from this.
```

- [ ] **Step 5.2. Replace the existing Next-lesson queue with the 45-item curricular-order queue.**

Use Edit tool to replace the entire block from `## Next-lesson queue (curricular order)` through the line immediately before `## Local dev` with this content:

```markdown
## Next-lesson queue (curricular order)

The order Phase 2 will rewrite the remaining 45 lessons. The pilot (Module 1 Lesson 2 `whatisanapi`) is not in this queue because it shipped 2026-05-20. Strike through after merge; the queue is the source of truth for what is next.

**Module 1. Foundations.**

1. `_docs/journey.md` — M1 L1, "The internet, the short version" (source filename is `journey.md`; permalink is `/howinternetworks.html`)
2. `_docs/whatwritersdo.md` — M1 L3, "What an API writer does in 2026"
3. `_docs/informationgathering.md` — M1 L4, "Information gathering and interviewing the codebase"
4. *new* `_docs/audiences-humans-and-agents.md` — M1 L5, placeholder

**Module 2. REST, HTTP, and the dance.**

5. `_docs/restAPI.md` — M2 L1, "REST principles"
6. `_docs/typesofAPI.md` — M2 L2, "Types of APIs"
7. `_docs/anatomyofurl.md` — M2 L3, "Anatomy of a URL (part 1)"
8. `_docs/anatomyofurltwo.md` — M2 L4, "Anatomy of a URL (part 2)"
9. `_docs/requestandresponse.md` — M2 L5, "Request and response" (slug mismatch: source is `requestandresponse.md`, permalink is `/apirequestsresponses.html`)
10. *new* `_docs/pagination-idempotency-rate-limits.md` — M2 L6, "Pagination, idempotency, rate limits" (stub created 2026-05-20)
11. `_docs/curl.md` — M2 L7, "cURL and why you should still know it"
12. *new* `_docs/auth-incl-agents.md` — M2 L8, placeholder

**Module 3. Data shapes.**

13. `_docs/json.md` — M3 L1, "JSON like you mean it" (slug mismatch with `JSON101.html`)
14. `_docs/xml.md` — M3 L2 (slug mismatch with `XML101.html`)
15. `_docs/dataformats.md` — M3 L3
16. `_docs/visualdatatypes.md` — M3 L4 (slug mismatch with `visualizingdatatypes.html`)
17. *new* `_docs/json-schema-for-llms.md` — M3 L5, placeholder

**Module 4. Writing the docs.**

18. *new* `_docs/quickstart-that-ships.md` — M4 L1, "Quickstart that ships in 5 minutes" (stub created 2026-05-20)
19. `_docs/writingapi.md` — M4 L2
20. `_docs/bridginggaps.md` — M4 L3 (slug mismatch with `keyconcepts.html`)
21. *new* `_docs/openapi-without-tears.md` — M4 L4, placeholder
22. *new* `_docs/samples-that-dont-rot.md` — M4 L5, placeholder
23. *new* `_docs/errors-that-help.md` — M4 L6, placeholder

**Module 5. Webhooks and async.**

24. `_docs/webhook.md` — M5 L1 (slug mismatch with `webhooks.html`)
25. `_docs/bdocumentingwebhook.md` — M5 L2 (slug mismatch)
26. `_docs/idocumentingwebhook.md` — M5 L3 (slug mismatch)
27. `_docs/edocumentingwebhook.md` — M5 L4 (slug mismatch)
28. *new* `_docs/asyncapi-event-driven.md` — M5 L5, placeholder

**Module 6. Modern API shapes.**

29. *new* `_docs/streaming-and-sse.md` — M6 L1, placeholder
30. *new* `_docs/websockets-for-realtime.md` — M6 L2, placeholder
31. *new* `_docs/graphql-docs-in-practice.md` — M6 L3, placeholder
32. *new* `_docs/grpc-and-protobuf.md` — M6 L4, placeholder

**Module 7. AI-native documentation.**

33. *new* `_docs/writing-docs-for-llms.md` — M7 L1, placeholder
34. *new* `_docs/mcp-what-it-is.md` — M7 L2, placeholder
35. *new* `_docs/tool-use-schemas.md` — M7 L3, placeholder
36. *new* `_docs/prompt-engineering-for-docs.md` — M7 L4, placeholder
37. *new* `_docs/eval-driven-docs.md` — M7 L5, "Eval-driven docs: testing docs the way you test code" (stub created 2026-05-20)
38. *new* `_docs/ai-doc-assistant.md` — M7 L6, placeholder

**Module 8. Practice and ship (rewritten as continuous capstone).**

39. `_docs/bdocumentingrestapi.md` — M8 L1, capstone day 1: audit memo
40. `_docs/idocumentingrestapi.md` — M8 L2, capstone day 2: endpoint reference
41. `_docs/edocumentingrestapi.md` — M8 L3, capstone day 3: OpenAPI spec
42. `_docs/btestingapipostman.md` — M8 L4, capstone day 4 morning: Postman happy path
43. `_docs/itestingapipostman.md` — M8 L5, capstone day 4 afternoon: Postman error paths
44. `_docs/extestingapipostman.md` — M8 L6, capstone day 5: publish to a real URL
45. `_docs/course-completion.md` — M8 L7, portfolio entry and finishing the course

```

- [ ] **Step 5.3. Verify CLAUDE.md changes.**

Run:

```bash
grep -c "^[0-9]\+\. " CLAUDE.md
```

Expected: `45` (the queue items).

Run:

```bash
grep -E "(43|46) lesson slots" CLAUDE.md
```

Expected: one line, the 46 version. No 43 left.

---

## Task 6. Update the 2026-05-19 Phase 2 spec (local-only, gitignored).

The earlier spec described the curriculum as 43 lessons across modules of 5/7/5/5/5/4/5/7. With the new spec it is 5/8/5/6/5/4/6/7 totalling 46. The narrative beats stay; only counts shift and three module-closer notes need parenthetical fixes.

**Files:**
- Modify: `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md`

- [ ] **Step 6.1. Update the lesson-count line at the top of the spec.**

Use Edit tool to replace:

```
This spec is the framework for rewriting all 43 lessons of the free API Documentation Course in Maya's voice for the 2026 agent era (27 existing lessons plus 16 placeholder slots in `_data/modules.yml`). It does not contain individual lesson outlines. Each lesson rewrite will follow its own short brainstorm cycle inside this framework.
```

with:

```
This spec is the framework for rewriting all 46 lessons of the free API Documentation Course in Maya's voice for the 2026 agent era (27 existing lessons plus 19 placeholder slots in `_data/modules.yml`). It does not contain individual lesson outlines. Each lesson rewrite will follow its own short brainstorm cycle inside this framework.

> Update 2026-05-20. The 2026-05-20 TOC-finalization spec at `docs/superpowers/specs/2026-05-20-toc-finalization-design.md` overrides the 43-slot list and the per-module counts below. See that spec for the authoritative TOC. Section 1 here retains the narrative beats; Module 2 / Module 4 / Module 7 closer placements have shifted as noted inline.
```

- [ ] **Step 6.2. Update Module 2 line to show 8 lessons and the Lesson 8 closer.**

Use Edit tool to replace:

```
* **Module 2 REST and HTTP (7 lessons).** Greenfield outgrows the tiny endpoint. Real REST API across Lessons 1 to 6. In Lesson 7 Devon ships the first proper OAuth flow. Atlas comes back, this time with credentials.
```

with:

```
* **Module 2 REST and HTTP (8 lessons since 2026-05-20).** Greenfield outgrows the tiny endpoint. Real REST API across Lessons 1 to 5. In Lesson 6 (added 2026-05-20) Atlas hits `/books?q=mystery` twenty times a minute and Devon ships pagination, idempotency, and rate limits. Lesson 7 stays cURL. In Lesson 8 Devon ships the first proper OAuth flow. Atlas comes back, this time with credentials.
```

- [ ] **Step 6.3. Update Module 4 line to show 6 lessons and the new opener.**

Use Edit tool to replace:

```
* **Module 4 Writing the docs (5 lessons).** Lesson 1: Maya is officially hired and the apprentice (the reader) starts the same day. Together they write Greenfield's first real reference docs, error catalog, code samples, and OpenAPI spec.
```

with:

```
* **Module 4 Writing the docs (6 lessons since 2026-05-20).** Lesson 1 (added 2026-05-20, replacing the old Lesson 1 placement): Maya is officially hired and the apprentice (the reader) starts the same day. The apprentice's first task is the Greenfield quickstart in five minutes of reader time. From Lesson 2 onward they write Greenfield's first real reference docs, error catalog, code samples, and OpenAPI spec.
```

- [ ] **Step 6.4. Update Module 7 line to show 6 lessons and the moved closer.**

Use Edit tool to replace:

```
* **Module 7 AI native (5 lessons).** Module opens on Priya's line. A borrower asks Atlas "find me a quiet thriller available at my branch this weekend" and Atlas needs a structured way in. Greenfield publishes their first MCP server in Lesson 2. The module closes in Lesson 5 with Greenfield shipping an "Ask Maya" assistant on their public docs (the same widget the reader can ship on their site).
```

with:

```
* **Module 7 AI native (6 lessons since 2026-05-20).** Module opens on Priya's line. A borrower asks Atlas "find me a quiet thriller available at my branch this weekend" and Atlas needs a structured way in. Greenfield publishes their first MCP server in Lesson 2. Lesson 5 (added 2026-05-20) is Maya writing Greenfield's first doc eval suite after Atlas misinterprets the branch identifier in one endpoint. The module closes in Lesson 6 with Greenfield shipping an "Ask Maya" assistant on their public docs (the same widget the reader can ship on their site).
```

- [ ] **Step 6.5. Verify the four edits landed.**

Run:

```bash
grep -nE "(43|46) lessons|(5|6|7|8) lessons since 2026-05-20|TOC-finalization spec" docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md
```

Expected: at least five matches, including the 46-lessons line and three "since 2026-05-20" markers and one TOC-finalization-spec reference.

---

## Task 7. Local build and verification.

This task runs the full build pipeline locally and checks each Definition-of-Done item in Section 7 of the TOC-finalization spec.

- [ ] **Step 7.1. Build CSS and the Jekyll site.**

Run from the repo root:

```bash
npm run build:css && bundle exec jekyll build
```

Expected: the CSS build finishes in <1s with "Done in NNNms". The Jekyll build finishes with "done in N seconds" and prints no errors or warnings about missing layouts or files. If either step fails, fix the underlying error before continuing.

- [ ] **Step 7.2. DoD item 2: verify `_data/modules.yml` has 46 entries.**

Already verified in Step 1.4. Re-run for safety:

```bash
grep -E '^    - \{ slug:' _data/modules.yml | wc -l
```

Expected: `46`.

- [ ] **Step 7.3. DoD item 3a: verify the homepage curriculum renders 8 modules with the correct lesson counts.**

Run:

```bash
grep -oE "[0-9]+ lessons" _site/index.html | sort | uniq -c
```

Expected: the output includes each lesson count from the per-module right-rail (`5 lessons`, `8 lessons`, `5 lessons`, `6 lessons`, `5 lessons`, `4 lessons`, `6 lessons`, `7 lessons`) and the hero-line `46 lessons`. Total of nine distinct numbers; multiplicities reflect the grid.

- [ ] **Step 7.4. DoD item 3b: verify the homepage hero reads "46 lessons" not "36 lessons".**

Run:

```bash
grep -E "(36|Thirty-six|46|Forty-six) lessons" _site/index.html
```

Expected: lines containing `46 lessons` and `Forty-six lessons` only. No `36 lessons` or `Thirty-six lessons` left.

- [ ] **Step 7.5. DoD item 4a: verify the three stub files are in `_site/`.**

Run:

```bash
ls -1 _site/pagination-idempotency-rate-limits.html _site/quickstart-that-ships.html _site/eval-driven-docs.html
```

Expected: all three filenames listed.

- [ ] **Step 7.6. DoD item 4b: verify the adjacent prev/next chains resolve correctly.**

Run:

```bash
echo "--- curl prev ---"
grep -A1 'class="prev"' _site/curl.html | head -3
echo "--- writingapi prev ---"
grep -A1 'class="prev"' _site/writingapi.html | head -3
echo "--- apirequestsresponses next ---"
grep -A1 'class="next"' _site/apirequestsresponses.html | head -3
echo "--- visualizingdatatypes next ---"
grep -A1 'class="next"' _site/visualizingdatatypes.html | head -3
```

Expected:
* `_site/curl.html` shows `← Previous` linking to `/apidocumentation/pagination-idempotency-rate-limits.html`.
* `_site/writingapi.html` shows `← Previous` linking to `/apidocumentation/quickstart-that-ships.html`.
* `_site/apirequestsresponses.html` shows `Next →` linking to `/apidocumentation/pagination-idempotency-rate-limits.html`.
* `_site/visualizingdatatypes.html` shows `Next →` linking to `/apidocumentation/quickstart-that-ships.html`.

- [ ] **Step 7.7. DoD item 5: verify CLAUDE.md queue length.**

Run:

```bash
grep -c "^[0-9]\+\. " CLAUDE.md
```

Expected: `45`. Also verify the first queue item:

```bash
grep -m1 "^1\. " CLAUDE.md
```

Expected: line beginning with `` 1. `_docs/journey.md` — M1 L1 ``.

- [ ] **Step 7.8. DoD item 6: confirm no Module 1 Lesson 1 rewrite has begun.**

Run:

```bash
git diff --name-only HEAD -- _docs/journey.md
git diff --staged --name-only -- _docs/journey.md
```

Expected: both produce no output. `_docs/journey.md` is untouched. The brainstorm for that lesson starts in the NEXT session, not in this plan.

---

## Task 8. Commit and push.

Single commit covering all tracked changes from Tasks 1 through 4. `CLAUDE.md` and the spec edits in Tasks 5 and 6 are gitignored and stay local.

- [ ] **Step 8.1. Stage the tracked files.**

Run:

```bash
git add _data/modules.yml \
        _docs/pagination-idempotency-rate-limits.md \
        _docs/quickstart-that-ships.md \
        _docs/eval-driven-docs.md \
        _docs/requestandresponse.md \
        _docs/curl.md \
        _docs/visualdatatypes.md \
        _docs/writingapi.md \
        _docs/bridginggaps.md \
        _layouts/home.html
```

Then verify with:

```bash
git status --short
```

Expected: exactly ten files staged with `M` or `A`. No unstaged or untracked entries that should be staged.

- [ ] **Step 8.2. Create the commit.**

Run:

```bash
git commit -m "$(cat <<'EOF'
feat(toc): finalize 46-lesson curriculum

Adds three new placeholder lessons to lock the world-class 2026+ TOC:

- M2 L6 pagination-idempotency-rate-limits (between request/response and cURL)
- M4 L1 quickstart-that-ships (new module opener; apprentice's first day)
- M7 L5 eval-driven-docs (between prompt-engineering and ai-doc-assistant)

Updates _data/modules.yml to 46 entries (was 43). Updates adjacent
lesson previous_page / next_page pointers so the chain resolves through
the new stubs. Bumps lesson numbers in curl.md (6→7), writingapi.md
(1→2), and bridginggaps.md (2→3) to reflect the new positions. Updates
home hero copy from "36 lessons" / "Thirty-six lessons" to 46 /
Forty-six on the two lines that carried the stale count.

The three new stubs are placeholders that render "coming soon"; the
actual lesson rewrites happen in subsequent sessions. The pilot
(whatisanapi) and all 27 inherited URLs are untouched.

Spec: docs/superpowers/specs/2026-05-20-toc-finalization-design.md
(local-only; gitignored as part of the internal-docs convention).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

Expected: commit succeeds with no pre-commit hook failures. If a hook fails, fix the root cause and create a new commit; do not amend.

- [ ] **Step 8.3. Push to master.**

Run:

```bash
git push origin master
```

Expected: push succeeds and reports the new commit hash being added to `origin/master`. The GitHub Action will start the redeploy.

- [ ] **Step 8.4. Confirm clean working tree.**

Run:

```bash
git status --short
```

Expected: empty output. Working tree clean.

---

## Plan complete.

After Task 8, the TOC is locked at 46 lessons across 8 modules. The next session brainstorms Module 1 Lesson 1 (`_docs/journey.md`, permalink `/howinternetworks.html`). That brainstorm is out of scope for this plan.
