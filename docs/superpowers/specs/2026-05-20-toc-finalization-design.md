# TOC Finalization. Design.

**Status.** v1.0. Approved by Gaurav 2026-05-20.
**Owner.** Gaurav Trivedi.
**Author of this spec.** Claude (drafting), Gaurav (decisions).
**Last updated.** 2026-05-20.

This spec locks the final table of contents for the API Documentation Course before the Phase 2 lesson-by-lesson rewrite begins. It supersedes the lesson list in `_data/modules.yml` as of 2026-05-19 and the lesson list in `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md` Section 1. Both will be updated to match this document.

This spec does not change the rewrite workflow (2026-05-19 spec Section 5), the voice rules (2026-05-19 spec Section 3), the lesson template (2026-05-19 spec Section 2), the Greenfield universe (2026-05-19 spec Section 1), or any voice/punctuation/AI-tell rules. It only changes which lessons exist and in what order.

---

## Section 1. What changed and why.

The 2026-05-19 design landed 43 lesson slots across 8 modules (27 inherited written lessons + 16 new placeholders). A second pass on 2026-05-20 against 2026+ industry trends surfaced three gaps that materially affect whether the course is world-class and future-proof:

1. **No coverage of pagination, idempotency, or rate limits.** Agents retry differently than humans, hammer endpoints harder, and need clear pagination contracts. The most agent-relevant REST patterns were missing entirely.
2. **No dedicated quickstart lesson.** "Getting started in 5 minutes" is the most-Googled API doc pattern and the doc LLMs latch onto first when summarizing an API. The course explained reference docs without explaining the doc readers actually open first.
3. **No coverage of eval-driven docs.** Testing docs against an LLM/agent is a real 2026 practice (doc evals, prompt regression suites). The course teaches writing for LLMs but never how to verify the writing worked.

Three net-new lessons close these gaps. No lessons are removed. No URLs change. The 27 written-lesson URLs are preserved verbatim for SEO and ad revenue. The course moves from 43 to 46 lesson slots. Total work remaining: 26 written lessons to rewrite in Maya's voice (lesson 2, the pilot `whatisanapi`, is already done), 16 original placeholders to write from scratch, and 3 new lessons to write from scratch. That is 45 lessons of work before the course is fully on the new voice.

A fourth decision: the six exercise lessons in Module 8 (`beginnerrestapiexercises` through `expertapitesting`) keep their URLs but are repurposed as one continuous Greenfield capstone story rather than three difficulty passes of the same exercise. The capstone arc is sketched in Section 4 below. This preserves SEO without forcing the rewrite to repeat itself.

## Section 2. The final TOC.

Lesson count: 5 + 8 + 5 + 6 + 5 + 4 + 6 + 7 = **46**. Slugs match the file at `_data/modules.yml` exactly; titles are working titles and may be refined during each lesson's brainstorm.

### Module 1. Foundations. (5 lessons.)

| # | Slug | Title | Status |
|---|---|---|---|
| 1 | `howinternetworks.html` | The internet, the short version | Rewrite (source `_docs/journey.md`) |
| 2 | `whatisanapi.html` | What an API actually is | Done. Shipped 2026-05-20. |
| 3 | `whatwritersdo.html` | What an API writer does in 2026 | Rewrite |
| 4 | `informationgathering.html` | Information gathering and interviewing the codebase | Rewrite |
| 5 | `audiences-humans-and-agents.html` | Audiences: humans, devs, and agents | New placeholder |

### Module 2. REST, HTTP, and the dance. (8 lessons.)

| # | Slug | Title | Status |
|---|---|---|---|
| 1 | `restAPI.html` | REST principles | Rewrite |
| 2 | `typesofAPI.html` | Types of APIs | Rewrite |
| 3 | `anatomyofurl.html` | Anatomy of a URL (part 1) | Rewrite |
| 4 | `anatomyofurltwo.html` | Anatomy of a URL (part 2) | Rewrite |
| 5 | `apirequestsresponses.html` | Request and response | Rewrite (source `_docs/requestandresponse.md`) |
| 6 | `pagination-idempotency-rate-limits.html` | Pagination, idempotency, rate limits | **NEW** |
| 7 | `curl.html` | cURL and why you should still know it | Rewrite |
| 8 | `auth-incl-agents.html` | Auth: keys, OAuth, mTLS, and what agents need | New placeholder |

### Module 3. Data shapes. (5 lessons.)

| # | Slug | Title | Status |
|---|---|---|---|
| 1 | `JSON101.html` | JSON like you mean it | Rewrite (source `_docs/json.md`) |
| 2 | `XML101.html` | XML, and when you'll still meet it | Rewrite (source `_docs/xml.md`). Same 10-block template and 12-to-18 minute target as every other lesson. The narrative angle leans into "when XML still wins" (SOAP legacy, certain regulated industries, RSS, OPDS for libraries) rather than treating it as a general-purpose data format. |
| 3 | `dataformats.html` | Data formats overview | Rewrite |
| 4 | `visualizingdatatypes.html` | Visualizing data types | Rewrite (source `_docs/visualdatatypes.md`) |
| 5 | `json-schema-for-llms.html` | Schemas LLMs love: structured outputs | New placeholder |

### Module 4. Writing the docs. (6 lessons.)

| # | Slug | Title | Status |
|---|---|---|---|
| 1 | `quickstart-that-ships.html` | Quickstart that ships in 5 minutes | **NEW** |
| 2 | `writingapi.html` | The bones of an endpoint reference | Rewrite |
| 3 | `keyconcepts.html` | Bridging the dev/writer gap | Rewrite (source `_docs/bridginggaps.md`) |
| 4 | `openapi-without-tears.html` | OpenAPI without tears | New placeholder |
| 5 | `samples-that-dont-rot.html` | Code samples that don't rot | New placeholder |
| 6 | `errors-that-help.html` | Errors that actually help | New placeholder |

### Module 5. Webhooks and async. (5 lessons.)

| # | Slug | Title | Status |
|---|---|---|---|
| 1 | `webhooks.html` | What webhooks are | Rewrite (source `_docs/webhook.md`) |
| 2 | `beginnerwebhookexercises.html` | Documenting webhooks. Beginner. | Rewrite (source `_docs/bdocumentingwebhook.md`) |
| 3 | `intermediatewebhookexercises.html` | Documenting webhooks. Intermediate. | Rewrite (source `_docs/idocumentingwebhook.md`) |
| 4 | `expertwebhookexercises.html` | Documenting webhooks. Expert. | Rewrite (source `_docs/edocumentingwebhook.md`) |
| 5 | `asyncapi-event-driven.html` | AsyncAPI and event-driven docs | New placeholder |

### Module 6. Modern API shapes. (4 lessons.)

| # | Slug | Title | Status |
|---|---|---|---|
| 1 | `streaming-and-sse.html` | Streaming APIs and Server-Sent Events | New placeholder |
| 2 | `websockets-for-realtime.html` | WebSockets for realtime | New placeholder |
| 3 | `graphql-docs-in-practice.html` | GraphQL docs in practice | New placeholder |
| 4 | `grpc-and-protobuf.html` | gRPC and Protobuf. When, why, how to document. | New placeholder |

### Module 7. AI-native documentation. (6 lessons.)

| # | Slug | Title | Status |
|---|---|---|---|
| 1 | `writing-docs-for-llms.html` | Writing docs for LLMs: agent-friendly patterns | New placeholder |
| 2 | `mcp-what-it-is.html` | Model Context Protocol: what it is, why you care | New placeholder |
| 3 | `tool-use-schemas.html` | Function-calling and tool-use schemas | New placeholder |
| 4 | `prompt-engineering-for-docs.html` | Prompt-engineering for doc generation | New placeholder |
| 5 | `eval-driven-docs.html` | Eval-driven docs: testing docs the way you test code | **NEW** |
| 6 | `ai-doc-assistant.html` | Building an AI doc assistant for your docs site | New placeholder |

### Module 8. Practice and ship. (7 lessons.)

All seven URLs are preserved. Content is rewritten as one continuous Greenfield capstone story across lessons 1 to 6 (the apprentice ships the Greenfield doc set in pieces), then closes with the portfolio guide.

| # | Slug | Title | Status |
|---|---|---|---|
| 1 | `beginnerrestapiexercises.html` | Document a REST API. Beginner pass. | Rewrite as capstone part 1 (source `_docs/bdocumentingrestapi.md`) |
| 2 | `intermediaterestapiexercises.html` | Document a REST API. Intermediate pass. | Rewrite as capstone part 2 (source `_docs/idocumentingrestapi.md`) |
| 3 | `expertrestapiexercises.html` | Document a REST API. Expert pass. | Rewrite as capstone part 3 (source `_docs/edocumentingrestapi.md`) |
| 4 | `beginnertestingapi.html` | Testing your API in Postman. Beginner. | Rewrite as capstone part 4 (source `_docs/btestingapipostman.md`) |
| 5 | `intermediatetestingapi.html` | Testing your API in Postman. Intermediate. | Rewrite as capstone part 5 (source `_docs/itestingapipostman.md`) |
| 6 | `expertapitesting.html` | Testing your API in Postman. Expert. | Rewrite as capstone part 6 (source `_docs/extestingapipostman.md`) |
| 7 | `finalwords.html` | Course completion and portfolio guide | Rewrite (source `_docs/course-completion.md`) |

## Section 3. Placement reasoning, narrative beats, and prerequisites.

The three new lessons must fit Maya's continuing Greenfield diary. Each entry below gives the placement reason, the Greenfield scene the lesson opens with (the diary opener from block 1 of the lesson template), and the lessons it depends on.

### 3.1. Module 2 Lesson 6. Pagination, idempotency, rate limits.

**Placement.** Lands right after request and response (Lesson 5) because the reader needs to understand response shape before they can understand pagination cursors and rate-limit headers. Lands before cURL (Lesson 7) so the cURL lesson can demonstrate pagination cursors and `429` retries with real commands. Lands before auth (Lesson 8) because rate-limit-aware retries are a precursor to the auth conversation about service tokens and quotas.

**Greenfield scene (working diary opener).** Atlas, the third-party reading assistant from Module 1 Lesson 5, has been hitting `/books?q=mystery` twenty times a minute for three days. Devon shows Maya the access log on Monday morning. The endpoint returns the whole catalog every time. Atlas does not know to stop. Greenfield needs pagination, idempotency keys for the few write endpoints Devon has shipped, and rate-limit headers Atlas can actually read.

**Prerequisites.** Module 2 Lesson 5 (request and response). Mentions concepts introduced in Module 1 Lesson 5 (audiences include agents).

**Hands off to.** cURL (Lesson 7) demonstrates `Link: <...>; rel="next"` pagination and `429 Too Many Requests` retries with `curl -i`.

### 3.2. Module 4 Lesson 1. Quickstart that ships in 5 minutes.

**Placement.** Opens the module because a quickstart is pedagogically the simplest doc to write, and in real life it is the first thing the reader ships. The module then progresses from quickstart (Lesson 1) to reference (Lesson 2), to bridging the dev-writer gap (Lesson 3), to OpenAPI (Lesson 4), to samples (Lesson 5), and closes with errors (Lesson 6). This is the order a working writer actually builds a doc set in.

**Greenfield scene (working diary opener and module-opening hire moment).** This is also where the narrative beat from the 2026-05-19 spec lands. Lesson 1 of Module 4 is the day Maya goes full-time at Greenfield and the apprentice (the reader) starts the same day. Maya hands the apprentice their first real task: write the quickstart for the catalog API in five minutes of reader time. Not the reference. Not the spec. The single page a developer or an agent reads first.

**Prerequisites.** All of Module 2 (REST, HTTP) and at least the JSON lesson from Module 3.

**Hands off to.** The bones of an endpoint reference (Lesson 2) picks up the morning of the apprentice's second day at Greenfield, after the quickstart shipped overnight.

### 3.3. Module 7 Lesson 5. Eval-driven docs.

**Placement.** Lands after writing docs for LLMs (Lesson 1), MCP (Lesson 2), tool-use schemas (Lesson 3), and prompt-engineering (Lesson 4). The reader has now written everything an agent would consume. Lesson 5 asks the next question: how do you know it works? Module 7 then closes with the AI doc assistant in Lesson 6 (not Lesson 5 as the 2026-05-19 spec stated; that closer moves down one slot).

**Greenfield scene (working diary opener).** Three weeks after Greenfield's MCP server went live, Priya pulls another log. Atlas is using the catalog API correctly, but their own borrowers using Greenfield's MCP server through Claude have been getting answers like "the book is in branch B-4" when the branch identifier should be the human-readable name "Brookline-4". One field in the docs led the model astray. Maya proposes the team start running their docs through an LLM the way they run code through tests: a doc eval suite. Lesson 5 is Maya writing the first one.

**Prerequisites.** Module 7 Lessons 1 through 4. Concept dependency on the MCP server shipped in Lesson 2 and the tool-use schemas in Lesson 3.

**Hands off to.** Building an AI doc assistant for your docs site (Lesson 6, the module closer with the "Ask Maya" widget).

### 3.4. Cross-module bridge updates.

The 2026-05-19 spec's cross-module bridge rule still holds: every module's first lesson opens with a callback to where the previous module closed, and every module's last lesson teases the next module's opener. The new lessons change three handoffs:

* **Module 3 closer → Module 4 opener.** Was `dataformats` → `writingapi`. Now `json-schema-for-llms` → `quickstart-that-ships`. The new Module 4 Lesson 1 must open with a callback to Module 3 Lesson 5's structured-outputs scene.
* **Module 4 internal handoff.** Was `(nothing)` → `writingapi`. Now `quickstart-that-ships` → `writingapi`. Maya's first full week at Greenfield bridges these two lessons.
* **Module 7 closer.** Was `prompt-engineering-for-docs` → `(next module)`. Now `ai-doc-assistant` → `(next module)`. The "Ask Maya widget" beat still lands; only its module-internal position changes.

Module 2 Lesson 6 (new) does not change a module boundary, so the Module 1 → 2 and Module 2 → 3 bridges are unaffected.

## Section 4. The Module 8 capstone arc.

Module 8 keeps all seven URLs and is rewritten as one continuous capstone in which the apprentice ships pieces of the real Greenfield doc set over five working days. The beginner / intermediate / expert labels in the existing slugs are retained for SEO continuity but no longer mean three difficulty passes of the same exercise; they mean three increasingly senior pieces of work.

| # | URL | Capstone beat |
|---|---|---|
| 1 | `beginnerrestapiexercises.html` | Day 1. The apprentice audits Greenfield's existing public docs, finds the gaps, and writes the audit memo Devon and Priya will read on Monday. |
| 2 | `intermediaterestapiexercises.html` | Day 2. The apprentice writes one full endpoint reference page for `/books/{id}`, in Maya's voice, in the structure Module 4 taught. |
| 3 | `expertrestapiexercises.html` | Day 3. The apprentice writes the OpenAPI spec for the three most-called endpoints, runs it through the linter, and submits the PR. |
| 4 | `beginnertestingapi.html` | Day 4 morning. The apprentice writes Postman tests for the happy paths of the three endpoints from Day 3. |
| 5 | `intermediatetestingapi.html` | Day 4 afternoon. The apprentice writes Postman tests for the error paths (404, 409, 429) using the error catalog from Module 4 Lesson 6. |
| 6 | `expertapitesting.html` | Day 5. The apprentice publishes the docs site to a real URL and posts the Postman collection. Devon reviews and merges. |
| 7 | `finalwords.html` | Course completion. The apprentice writes the portfolio entry that links to the published docs and Postman collection, and lands their first API doc role. |

This arc satisfies the cross-module bridge rule: Module 7 closes with the "Ask Maya" widget going live; Module 8 Lesson 1 opens on Monday morning at Greenfield with the apprentice told to audit the same docs the widget reads from.

## Section 5. Things explicitly left out.

These topics were considered and rejected, with reasoning. Recording them here so they do not get re-litigated in every future TOC review.

* **CORS.** Real but narrow. A working API writer encounters it as a debugging step in the request and response lesson, not as a dedicated subject.
* **OAuth flows in depth.** The auth lesson (Module 2 Lesson 8) covers the doc-writer's view of OAuth. A dedicated OAuth lesson would duplicate what exists in OAuth specifications and product docs of providers like Auth0 and Okta.
* **Date, time, and timezone formats.** A working API writer encounters these inside JSON like you mean it (Module 3 Lesson 1) and inside endpoint references (Module 4 Lesson 2). A dedicated lesson would be one short paragraph stretched to twelve minutes.
* **Voice agents, spatial APIs, CRDTs, real-time collaboration formats.** Too niche for a foundational course. May appear as a Module 6 expansion in a later phase, but not in v1.
* **API versioning and deprecation as a dedicated lesson.** Considered but rejected on 2026-05-20 in favor of folding versioning into Module 4 Lesson 4 (OpenAPI without tears) and into the Module 8 capstone, where deprecation is shown rather than told.
* **RAG patterns and chunking for LLM retrieval as a dedicated lesson.** Considered but rejected on 2026-05-20. Most of this lives inside `writing-docs-for-llms` (Module 7 Lesson 1) and `eval-driven-docs` (Module 7 Lesson 5). A dedicated lesson on chunking would date faster than the rest of the course.

## Section 6. Impact on existing artifacts.

The following will need to be updated when this spec is approved.

1. **`_data/modules.yml`.** Insert three new entries: `pagination-idempotency-rate-limits` at Module 2 position 6, `quickstart-that-ships` at Module 4 position 1, `eval-driven-docs` at Module 7 position 5. Mark all three as `placeholder: true` and `isNew: false` (module-level New pill is reserved for whole new modules).
2. **`CLAUDE.md`.** Update the "Next-lesson queue" section to a 45-item list in curricular order (Lesson 2 / whatisanapi is already done and is not in the queue). Update the count "43 lesson slots" to "46 lesson slots".
3. **`docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md`.** Update Section 1 lesson counts per module (5 / 8 / 5 / 6 / 5 / 4 / 6 / 7) and add a one-line note that the 2026-05-20 TOC-finalization spec overrides the original 43-slot list. Do not rewrite Section 1's narrative beats. Module 2 closes with `auth-incl-agents` as before (now Lesson 8 rather than Lesson 7). Module 4 still opens the apprentice's full-time tenure (now in the new Lesson 1 `quickstart-that-ships` rather than in `writingapi`). Module 7 still closes with the Ask Maya widget (now Lesson 6 rather than Lesson 5).
4. **`_layouts/home.html`.** Two lines reference the old lesson count and must be updated to "46 lessons":
   * Line 24: `4.8 &middot; 152 reviews &middot; 36 lessons &middot; Free, forever &middot; No sign-in` → 46 lessons.
   * Line 98 (Section heading): `Eight modules. Thirty-six lessons. One opinionated point of view.` → Forty-six lessons.
5. **`_docs/whatisanapi.md`.** The pilot's `next_page` frontmatter currently points to `whatwritersdo.html`, which is still correct (Module 1 Lesson 3 is unchanged). No update needed. Confirmed inline as a sanity check.
6. **Schema.org structured data on the home page (`index.md`).** Currently uses generic Course type with no lesson count. No update required, but worth a one-time review for `numberOfLessons` or `coursePrerequisites` properties as a future SEO win.
7. **Phase 2 lesson queue.** The next lesson to rewrite remains Module 1 Lesson 1 (`_docs/journey.md`, permalink `/howinternetworks.html`). The three new lessons enter the queue at their module positions: Module 2 Lesson 6, Module 4 Lesson 1, Module 7 Lesson 5.
8. **Source files for the three new lessons.** Create `_docs/pagination-idempotency-rate-limits.md`, `_docs/quickstart-that-ships.md`, `_docs/eval-driven-docs.md`. Each starts as a placeholder stub with frontmatter (`title`, `permalink`, `module`, `lesson`, `reading_time`, `description`, `previous_page`, `next_page`) and a one-paragraph "Lesson coming in Phase 2" body. The placeholder behavior in `_includes/course-nav.html` already handles `placeholder: true`, so creating the stub files is not strictly required for the nav to render; it is required for `previous_page` / `next_page` chains in adjacent lessons to resolve. Without the stubs, the cURL lesson's `previous_page` pointer would dangle.

**Per-lesson Definition of Done is unchanged.** The Definition of Done for each individual lesson rewrite (voice linter pass, 10-block template complete, Mermaid + interactive SVG, AI co-pilot tip, signoff include) lives in the 2026-05-19 spec Section 5. This spec only locks the TOC; it does not redefine what "lesson done" means.

## Section 7. Definition of Done for this spec.

This spec is done when all six of the following are true:

1. All updates in Section 6 items 1 through 4 and items 7 through 8 are committed and pushed to master. Items 5 and 6 are confirmations only; no code change.
2. `_data/modules.yml` has 46 lesson entries and the local build (`npm run build:css && bundle exec jekyll build`) succeeds with no errors.
3. The homepage curriculum section at `/apidocumentation/#curriculum` renders 8 modules with the lesson counts in Section 2 (5, 8, 5, 6, 5, 4, 6, 7) and the homepage hero reads "46 lessons", not "36 lessons".
4. Three stub markdown files exist under `_docs/` for the new lessons, each with valid frontmatter that resolves into `previous_page` and `next_page` chains in adjacent lessons. The `cURL` lesson's `previous_page` resolves to `pagination-idempotency-rate-limits.html`. The `writingapi` lesson's `previous_page` resolves to `quickstart-that-ships.html`. The `ai-doc-assistant` lesson's `previous_page` resolves to `eval-driven-docs.html`.
5. CLAUDE.md's Next-lesson queue has 45 items and the count "46 lesson slots" replaces "43 lesson slots". The first queue item is `_docs/journey.md` (Module 1 Lesson 1).
6. The Module 1 Lesson 1 rewrite has not yet begun. The brainstorm for that lesson starts only after this spec is approved by Gaurav and the writing-plans skill has produced an implementation plan from this spec.

Maya.
