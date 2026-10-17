# M2L3. Anatomy of a URL (part 1). Design.

**Status.** v0.1. Drafted from brainstorm 2026-05-31. Ready for spec self-review and user review before plan handoff.
**Owner.** Gaurav Trivedi.
**Author of this spec.** Claude (drafting), Gaurav (decisions).
**Last updated.** 2026-05-31.

Per-lesson design spec for Module 2 Lesson 3, the Anatomy-of-a-URL-part-1 rewrite. Source file: `_docs/anatomyofurl.md`. Permalink (preserved): `/anatomyofurl.html`. This spec sits under the parent Phase 2 spec at `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md`; everything in the parent spec applies unless explicitly overridden below.

---

## Section 1. What this lesson is.

**Position.** Module 2 Lesson 3. Third of 8 lessons in Module 2 (REST, HTTP, and the dance). Story-week 6, Tuesday morning. Seven calendar days after M2L2's Tuesday-morning whiteboard scene; fourteen days after M2L1's Tuesday-morning Devon-at-desk scene; eighteen days after Asha's email landed Friday evening of story week 3. Maya did her standing Monday branch visit yesterday (bible-locked); Tuesday morning she is at her own laptop, not at Greenfield's office. Reading time target 14 min (in the 12-18 window).

**Source legacy lesson.** `_docs/anatomyofurl.md`. Legacy title "Understanding URL Anatomy - The Building Blocks of API Endpoints" (hyphen); new title **"Anatomy of a URL (part 1)"** per TOC spec and `_data/modules.yml`. Permalink `/anatomyofurl.html`, preserved; no `redirect_from` needed. The legacy teaches 5 URL parts (protocol, domain, path, query, fragment) via a clickable component widget, then an API-types comparison table, then an FAQ. The rewrite drops the API-types table (M2L2's job), drops fragments (M2L4's job), and reframes URL anatomy as the substrate of URL design.

**What the 2026 reader needs that the legacy version misses.** The legacy is a reference card. It does not connect URL anatomy to designing an endpoint URL, which is what a 2026 API writer is actually being asked to do when an engineer hands them a draft. It also teaches every URL part as equally important when in practice the resource (the noun in the path) and the query string carry 80% of the writer's design decisions, with the version a distant third.

**Teaching frame. Read before you write.** Block 3 reads Greenfield's existing `https://api.greenfield.lib/v1/books?q=mystery` left to right. Block 4 hands the apprentice the advanced-filter URL-design assignment and they design it by applying the parts they just named. Block 5 then sends them to a public third-party API to apply the same reading pattern to a URL they did not write. Doc-page writing (params tables, auth sections, response fields) comes in Module 4; today is URL design only.

**The five URL parts in scope.** Scheme (`https`), host (`api.greenfield.lib`), version (`/v1`), resource (`/books`), query string (`?q=mystery`). **Base path** is named in one sentence ("some APIs prefix everything with `/api` or `/platform`; Greenfield doesn't, so the path starts at the version") but is not one of the five teaching points because Greenfield's URL doesn't have one. **Fragments, port, encoding edge cases, and path-vs-query trade-offs** are deferred to M2L4 explicitly so M2L3 can be tight. Path parameters get one mention (block 3 close, "single-resource endpoints look like `/v1/books/{id}` and we'll see one in Module 4").

**Conceptual spine. Every URL part does work somewhere downstream.** The scheme tells the client what protocol to speak; the host gets resolved by DNS to an IP; the version routes to a server tier; the resource selects the handler; the query string parameterizes the response. The block 3 Mermaid shows this chain; the prose names what each layer reads. The apprentice's writing in block 4 then is "every part I include will be read by something downstream, what does each thing want?"

**Story trigger.** Devon opened a PR Friday afternoon of story week 5 for Greenfield's new advanced-filter endpoint (`GET /v1/books` extended with three new query params: `branch`, `shelf`, `on_shelf`). The PR diff is in `openapi.yaml` (M1L4-locked source of truth for the response contract). The PR description is one line, Devon-voiced. Tuesday morning Devon is in his 9:30 standup (M1L4 callback: Maya reads things on her own while Devon is offstage). Maya opens her laptop, finds the PR in her review queue, and starts. The lesson is Maya reviewing Devon's URL in parallel with the apprentice designing theirs. The PR's hosting platform is not named in the lesson (the bible doesn't lock a code host yet); "the PR" / "the repo" stays generic.

**Apprentice stake.** Today the apprentice writes their first URL. The apprentice's draft URL is the assignment Devon flagged in M2L1 block 1 ("next week you write the docs for Greenfield's new advanced-filter endpoint"). **Only the URL-design slice is delivered here** — params tables, response fields, auth sections, and error pages all wait for Module 4. The lesson is honest about that scope so the apprentice does not feel handed a Module 4 deliverable.

**M2L1 promise lineage.** M2L1 block 1 made the writing promise. M2L2 deferred by design (block 1's apprentice-stake paragraph in M2L2 said "today, recognize the shape; this week, start the advanced filter assignment"). M2L3 delivers the URL-design slice. Tracked here so future retros can audit the chain.

**Block 6 trap pointer.** Each lesson's trap targets the recognition failure the lesson sets up. For URL anatomy, the trap is **URLs that name actions in the path** (`/v1/books/get`, `/v1/books/searchBooks`, `/v1/getBooks`) — RPC in a REST jacket, Devon's locked M2L2 image. Connecting M2L3's trap to M2L2's Devon-image is intentional reuse, not repetition.

**Block 1 earned joke pointer.** Devon's one-line PR description is the joke vector. v0.1 candidate: PR description text "advanced filter, take 4. no POST. yes query string. yes `branch_north` not `north`. yes I read RFC 3986." Construction is "what the engineer leaves in the PR description because they know the writer is the next reader." The joke lands on the `yes`/`no` stack (preempts every review nit). Lands in block 1; needs human laugh-test before merge (parent-spec DoD). Final wording during drafting; backup constructions in Section 4.4.

**Cross-module bridge.** Opener picks up M2L2 block 10 verbatim ("Next week we open the URL the catalog actually ships under and read it left to right. Devon has feelings about every part of it."). Closer hands off to M2L4: *"Next week the URL gets harder. The parts we skipped today (fragments, port, path parameters) and the parts that hurt when they go wrong (encoding, traversal, ambiguous slashes) all show up. Devon has opinions about those too."* Final wording during drafting.

**Scope perimeter.** Does not teach fragments, port, encoding edge cases, path-vs-query trade-offs in depth, path traversal, or absolute-vs-relative URLs (all M2L4). Does not teach response shapes (M2L5). Does not teach pagination, idempotency, or rate limits (M2L6). Does not teach cURL flags or auth (M2L7, M2L8). Does not teach doc-page writing (Module 4). **Introduces one new Greenfield API entity**: the advanced-filter extension of `GET /v1/books` with three new query params (`branch`, `shelf`, `on_shelf`). Bible delta in Section 4.

---

## Section 2. The ten-block outline.

**Naming.** Block numbers follow parent spec Section 2. Each block in the published lesson is preceded by `{% comment %}block:N{% endcomment %}` for grep-ability and reviewer navigation.

### Block 1. Diary opener (60-120w, soft cap).

**H2.** `## Friday's PR`.

**Scene.** Tuesday morning week 6. Maya opens her laptop. Devon's PR sits at the top of her review queue, opened Friday afternoon of week 5. Devon is in his 9:30 standup (M1L4 callback). Apprentice stake: today the apprentice writes their first URL, the one Devon flagged the week we first talked about REST.

**Earned-joke construction.** Devon's one-line PR description: terse, deadpan, leading `yes`/`no` stack to preempt review questions. v0.1: "advanced filter, take 4. no POST. yes query string. yes `branch_north` not `north`. yes I read RFC 3986." Needs human laugh-test before merge; backups in Section 4.4.

**Working copy** (lesson voice, present-tense, M2L1/M2L2-aligned):

> ## Friday's PR
>
> Tuesday morning of story week 6. I open my laptop. Devon's PR is at the top of my review queue. He opened it Friday afternoon with one line: "advanced filter, take 4. no POST. yes query string. yes `branch_north` not `north`. yes I read RFC 3986."
>
> The URL is in the OpenAPI diff: `https://api.greenfield.lib/v1/books?q=mystery&branch=branch_north&shelf=fiction&on_shelf=true`. It's 9:30. Devon is in standup. He won't be back for forty minutes. Today you start your own URL, the one Devon flagged the week we first talked about REST. You can't write a URL until you can read one. So we read his left to right.

Word count: ~123. Within the soft cap.

### Block 2. Today you will leave with (≤30w).

**H2.** `## Today you will leave with` (M2L1/M2L2 convention, used verbatim).

**Working copy:**

> ## Today you will leave with
>
> - How to read a URL left to right and name the five parts.
> - What each part commits to and who reads it downstream.
> - One URL you wrote yourself.

Followed by `{% include ad-slot.html slot="lesson-mid-1" format="auto" %}`.

Word count: ~28. Under cap.

### Block 3. Read it left to right (200-400w + Mermaid).

**H2.** `## Read it left to right`.

**Structure.** Walk the URL `https://api.greenfield.lib/v1/books?q=mystery` left to right. Five subsections (scheme, host, version, resource, query string), each one paragraph: what the part is, what reads it downstream, one Greenfield-specific detail, one alternative form some other API uses. Base path named inside the version subsection in one sentence ("Greenfield doesn't have one"). Closes with a thought-checkpoint sentence pointing at the Mermaid.

**Glossary wraps in this block.** `scheme`, `host`, `resource`, `query string` — each wrapped with `{% include glossary-term.html term="..." %}` on first definitional use. Block 7 wraps them again.

**Working copy** (lesson voice, linter-clean):

> ## Read it left to right
>
> The URL in Devon's diff is `https://api.greenfield.lib/v1/books?q=mystery`. Left to right, it has five parts, and each one tells some piece of the stack what to do.
>
> **{% include glossary-term.html term="scheme" %}.** `https`. This tells the client which protocol to speak. HTTPS means the connection is encrypted; the rest of the URL is unreadable to anything in the middle. Greenfield is HTTPS, like every public API a 2026 reader is calling.
>
> **{% include glossary-term.html term="host" %}.** `api.greenfield.lib`. This is what DNS resolves to an IP address. The `api.` is a subdomain Greenfield uses to separate its API server from its public website at `greenfield.lib`. Two different machines, same registered domain. The subdomain is a Greenfield convention; some APIs use the bare domain and route by path, some put the API on a different domain entirely (`api.github.com`).
>
> **Version.** `/v1`. Devon shipped Greenfield with a version segment from day one because he didn't want his first design to trap him. When Greenfield ships v2, `/v1` keeps working until Devon turns it off. Old clients keep working; new clients opt in. Some APIs hide the version in a header (`Accept: application/vnd.greenfield.v2+json`) instead. Devon doesn't, because the header form hides the version from URL readers (logs, bookmarks, the apprentice reviewing the PR).
>
> **Base path.** Greenfield doesn't have one. The path starts at the version. Some APIs prefix every endpoint with `/api` or `/platform/v1` to keep the API routable behind a load balancer that also serves the marketing site. Greenfield uses a dedicated subdomain for that job, so no extra prefix.
>
> **{% include glossary-term.html term="resource" %}.** `/books`. This is the noun. The handler that serves this URL is the books handler; its job is to know about books. The query string customizes what books come back, but the resource decides what the response is about. M2L1's argument was that the URL names a thing. This is the thing.
>
> **{% include glossary-term.html term="query string" %}.** `?q=mystery`. The `?` opens the query string. After it, `name=value` pairs separated by `&`. `q` is the existing filter; `mystery` is its value. The query string parameterizes the handler. It doesn't change which handler runs. Same handler, different filter.
>
> Look at the diagram. Each layer reads only the part it needs.
>
> [Mermaid here]

Word count: ~395. In window 200-400.

**Mermaid source** (4 participants, 5 messages, 2 notes; under cap; Note text safe — no braces, no quotes):

```liquid
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
```

### Block 4. Now you write (400-700w + interactive SVG).

**H2.** `## Now you write` (imperative, parallel to M2L1's `## Put the promise first` and M2L2's `## Name the shape on page one`).

**Structure.** Opens with the advanced-filter requirements (the same requirements Devon's PR addresses). The apprentice designs the URL by applying the parts. The destination URL appears. SVG follows. Then a "what else you might have written, and what the parts say about each" beat: three counterfactual URL designs, each rejected for a specific URL-anatomy reason. Closes with the doc-page handoff to Module 4 (today is URL design only) and the "Devon shipped the same URL you just wrote" beat.

**Counterfactuals use canonical Greenfield identifiers.** `branch_north` not `north`; `fiction` not generic. Drafter does not substitute.

**Working copy** (lesson voice, linter-clean):

> ## Now you write
>
> Greenfield's advanced filter ships this week. The requirements are short:
>
> - Filter by branch (a branch identifier like `branch_north`).
> - Filter by shelf (Greenfield has fiction, biography, reference, periodicals).
> - Filter by whether the book is on shelf right now or out on loan.
>
> Write the URL.
>
> Read the parts you just named, in order. Scheme: same. Host: same. Version: same. Resource: same. Three new filters means three new query parameters. Add them to the existing query string.
>
> Here is what the parts give you:
>
> ```text
> https://api.greenfield.lib/v1/books?q=mystery&branch=branch_north&shelf=fiction&on_shelf=true
> ```
>
> Three new query parameters: `branch`, `shelf`, `on_shelf`. Each one a `name=value` pair, separated from its neighbor by `&`. Below is the URL with the new parts highlighted. Hover or tap each part to read what it commits to.
>
> [interactive-svg here]
>
> A few things you might have done differently and what the parts say about each:
>
> **Did you write `/v1/books/filter`?** That makes the URL name an action (filter), not the thing being filtered (books). The block 3 rule was: the resource is the noun. Filter belongs in the query string. `/v1/books` is still the resource; the query string says how to look at it.
>
> **Did you write `/v1/books/branch_north/fiction/true`?** Path segments are for resources and their children, not for filter values. Two reasons it goes badly: the order of segments has to be memorized (which one is the branch, which one is the shelf?), and adding a fourth filter next year means breaking every URL anyone has saved. Query string parameters are named and unordered. Adding `?author=connelly` next year is invisible to every existing caller.
>
> **Did you write `?filters=branch:branch_north,shelf:fiction,on_shelf:true`?** That packs the filters into a single query parameter as a string. Greenfield's server would now have to parse that string itself, defining its own grammar (what does the comma mean, what does the colon mean, how do you escape values that contain commas). The URL standard already defines how `&` and `=` work; reusing them is free.
>
> Devon shipped the same URL you just wrote. The PR comment you leave him: nothing. The URL design is right. The doc page that explains what each filter does, what `on_shelf=false` means versus omitting `on_shelf` entirely, what happens when `branch` is misspelled: that is Module 4. Today you wrote the URL.

Word count: ~480. In window 400-700.

**Interactive SVG include:**

```liquid
{% include interactive-svg.html slug="anatomyofurl" alt="The advanced filter URL rendered as visible text wrapped to two lines: line 1 https://api.greenfield.lib/v1/books, line 2 ?q=mystery&branch=branch_north&shelf=fiction&on_shelf=true. The five parts of the URL are individually hoverable regions: scheme (https), host (api.greenfield.lib), version (/v1), resource (/books), and query string (line 2 in its entirety). The three new query parameters added in this PR (branch, shelf, on_shelf) are rendered in copper while the existing q parameter and the rest of the URL are rendered in ink, marking what the apprentice wrote versus what was already there. Hovering or tapping each part reveals what it commits to and who reads it downstream. The version part's tooltip notes the alternative header-based versioning form some APIs use. The query string part's tooltip names the four name=value pairs and their separators." %}
```

Visual specifics in Section 3.

### Block 5. Try it on a public API (100-200w, callout exercise).

Rendered as `{% include callout.html variant="exercise" body=exercise_body %}` (parent-spec Phase 2 prerequisite). The exercise sends the apprentice to public API docs to apply the reading pattern to URLs they did not write.

**Working copy** (lesson voice, linter-clean):

> Pick a public API doc you've used recently. Open one of its endpoint URLs (most reference pages show the full URL right next to the method). Read it left to right. Name the five parts. Then answer: where did the API put its version? Does it have a base path? Does the resource name a thing or an action? Does it use a query string or a body for filters?
>
> Write five lines per URL: one per part, then a one-line verdict on whether the URL was easy to read. Repeat for two more URLs from two different APIs. Notice when one API is harder to read than another. The harder ones usually have a reason. Sometimes the reason is good (the API has been around for fifteen years and changing the URL would break the world). Sometimes the reason is that nobody ever sat down and asked these questions.

Word count: ~155. In window.

### Block 6. The trap (100-200w, callout warning).

Rendered as `{% include callout.html variant="warning" body=trap_body %}`. Devon-voiced. The trap targets URLs that name actions in the path. Connects to M2L2's locked "RPC in a REST jacket" Devon-image.

**Working copy** (lesson voice, linter-clean, Devon-voiced):

> Plenty of APIs have URLs like `POST /v1/users/123/activate`, `POST /v1/orders/cancel`, `GET /v1/books/get?id=bk_184932`. Verbs in the path. That's RPC in a REST jacket, the same trap from last week.
>
> Devon's rule: if the URL has a verb in it, the API is RPC underneath. The doc page owes the reader an operation list, not a resource list. The right move is not to pretend otherwise. Document what the API does, with the words the API uses.
>
> The trap matters for URL design because once an API ships `/v1/users/activate`, every URL after it tends to follow. Patterns set hard. The first URL you write is the URL every URL after it will copy. Pick a noun.

Word count: ~125. In window.

### Block 7. Words you can drop in standups now (3-5 terms).

Four glossary terms wrapped on every use (parent-spec convention; M2L1/M2L2 wrap on block 3 first-use AND in block 7).

**Working copy:**

> ## Words you can drop in standups now
>
> {% include glossary-term.html term="scheme" %}. Use this when you mean "the `https://` part of the URL." More specific than "protocol", less ambiguous to engineers.
>
> {% include glossary-term.html term="host" %}. Use this when you mean "the part that DNS resolves to an IP." Catches all of subdomain, registered domain, and TLD without needing to name each one.
>
> {% include glossary-term.html term="resource" %}. Use this when you mean "the noun in the path that names what the response will be about." The opposite of an action.
>
> {% include glossary-term.html term="query string" %}. Use this when you mean "the part after the `?` that customizes the response without changing which handler runs."

Followed by `{% include ad-slot.html slot="lesson-mid-2" format="auto" %}`. Glossary entries defined in Section 4.2.

Word count: ~105.

### Block 8. AI co pilot tip (150-250w).

**Tool: Cursor.** Rotation analysis:

| Lesson | Tool | Slot |
|---|---|---|
| M1L1 | GPT | shipped |
| M1L2 (pilot) | Claude | shipped |
| M1L3 | Claude | shipped |
| M1L4 | Cursor | shipped |
| M1L5 | Gemini | shipped |
| M2L1 | GPT | shipped |
| M2L2 | Copilot Chat | shipped |
| **M2L3** | **Cursor** | this lesson |

Cursor gap is 6 lessons (longest). Scene fits: Maya is reviewing Devon's PR in her editor; Cursor is the editor. M1L4 used Cursor for codebase questions; M2L3 uses Cursor for URL design review. Different prompt class, same tool. No risk of confusion.

**Section header** in the lesson body reads `## AI co pilot tip` (no hyphen, per M2L1 retro).

**Working copy** (lesson voice, linter-clean):

> ## AI co pilot tip
>
> Tool: Cursor (the code editor with AI built in).
>
> **The situation.** You're reviewing a PR that adds a new endpoint, or you're drafting one yourself. The diff has a URL pattern in it (the OpenAPI YAML, the routes file, a comment block). You want a second opinion on whether the URL design follows the parts.
>
> **The prompt** (highlight the URL or the OpenAPI path entry, open the Cursor chat panel):
>
> ```text
> Here is a URL pattern: <paste>. Read it left to right and name the five parts in left-to-right order. For each part, say one sentence on whether the choice fits common REST conventions. If the URL names an action instead of a resource, say so. If a filter is in the path that should be in the query string, say so. Do not hedge.
> ```
>
> **What to expect back.** Five short lines, one per part, and a one-sentence verdict on the URL as a whole. If Cursor finds a verb in the path, the verdict should say so.
>
> **What to watch for.** Cursor sometimes tries to be diplomatic about a URL that names an action ("this is a stylistic choice"). Push back: "is this URL RPC or REST?" The second pass usually picks one. Cursor is at its best when it has the surrounding code as context, so ask the question with the routes file or the OpenAPI YAML open in the editor.

Word count: ~215. In window 150-250.

### Block 9. Before you go (one self check, 1-2 sentences).

No answer key. The self-check practices the lesson's reading pattern on something the reader already has open.

**Working copy:**

> ## Before you go
>
> Look at the URL bar of any web page you have open. Read it left to right. Name the parts that are there and the parts that aren't.

Word count: ~30.

### Block 10. Next week at Greenfield + signoff.

Bridge to M2L4 (Anatomy of a URL part 2). Sentence drafted in Section 1's cross-module bridge.

**Working copy:**

> ## Next week at Greenfield
>
> Next week the URL gets harder. The parts we skipped today (fragments, port, path parameters) and the parts that hurt when they go wrong (encoding, traversal, ambiguous slashes) all show up. Devon has opinions about those too.
>
> {% include signoff.html %}

Word count: ~38. `{% include signoff.html %}` renders `Maya.` on its own line per parent spec.

**Total lesson word count estimate** (blocks 1-10): 123 + 28 + 395 + 480 + 155 + 125 + 105 + 215 + 30 + 38 ≈ **1,694 words**. ~11.3 min of pure reading; with diagram and SVG processing time, lands in the 12-14 min target window.

---

## Section 3. Visuals.

### 3.1. Mermaid (block 3).

**Storage.** Source inline in `_docs/anatomyofurl.md` via `{% capture mermaid_src %}` + `{% include mermaid.html content=mermaid_src alt="..." %}` (parent-spec Section 6; matches M2L1, M2L2).

**Diagram type.** Sequence diagram. **4 participants** (Atlas, DNS, Greenfield API, books handler), **5 messages**, **2 notes**. Under cap (10 nodes, 12 edges).

**Why this diagram.** Block 3 prose names what each URL part is. The Mermaid shows what each part *does* downstream. The chain (DNS resolving the host, the API server routing on `/v1`, the books handler dispatching on `/books`, the handler filtering on `q=mystery`) makes "every URL part does work somewhere" concrete instead of abstract. Distinct visual labor from block 4's SVG (which labels the URL parts spatially); the Mermaid shows the temporal flow.

**Theme.** Inherits from `assets/js/mermaid-init.js`. No inline color overrides. Renders on cream page background (M1L1 retroactive fix in place).

**Note text safety.** Notes contain only ASCII identifiers and short prose (no braces, no quotes, no GraphQL-style syntax). Parses cleanly (M2L2 retro learning applied).

**Accessibility.** Alt text mirrors prose. The block 3 thought-checkpoint sentence ("Look at the diagram. Each layer reads only the part it needs.") prepares the reader for what to find.

### 3.2. Interactive SVG (block 4).

**Storage.** `assets/svg/anatomyofurl/main.svg`. Hand-authored. ~180 lines (between M2L1's ~150 and M2L2's ~200; lighter than M2L2 because no per-cell stylized envelopes, just URL text with hover overlays).

**Pattern.** `data-svg-pattern="hover-tooltip"`. Framework confirmed via `assets/js/interactive-svg.js` `initHoverTooltip()` at line 71. Five hover regions, one per URL part. Tooltip moved to `document.body` and positioned via `getBoundingClientRect` + scroll offsets (M1L1 retroactive fix in place).

**Pre-flight check.** Pattern just shipped in M2L2 with 4 cells and ~30-45 word tooltips. M2L3 reduces to 5 hover regions with similarly-sized tooltips. Risk reduction since pattern is now in production. **Verify tooltip rendering at 375px, 768px, 1280px widths before drafting.** Edge case: the query-string region is wide; tooltip positioning at the right edge of the viewport should clamp via the framework's existing logic, but verify on touch (tap-and-hold near edge).

**Dimensions.** `viewBox="0 0 900 300"`, `preserveAspectRatio="xMidYMid meet"`. CSS `max-width: 100%; height: auto;`. Two-line wrap of the URL (the URL is ~95 characters; doesn't fit on one line at typical rendered widths). Lines placed via manual `<text>` placement (not CSS-driven flow), so the wrap is identical across devices.

**Layout.** Two lines of URL text, monospace, ~24px in the viewBox:
- **Line 1:** `https://api.greenfield.lib/v1/books`
- **Line 2:** `?q=mystery&branch=branch_north&shelf=fiction&on_shelf=true`

Five hover regions, each a `<g>` with `tabindex="0"`, `role="button"`, `data-tooltip="..."`:

| Region | Where in URL | Color | Tooltip content |
|---|---|---|---|
| **scheme** | `https` (line 1) | ink | The protocol the client speaks. HTTPS means encrypted. Every byte after the `://` is unreadable to anything in the middle. Greenfield is HTTPS like every public API a 2026 reader is calling. (~35w) |
| **host** | `api.greenfield.lib` (line 1) | ink | What DNS resolves to an IP address. The `api.` subdomain separates the API server from Greenfield's public site at greenfield.lib. Two different machines, same registered domain. (~30w) |
| **version** | `/v1` (line 1) | ink | The version segment Devon put in the URL on day one. When Greenfield ships v2, `/v1` keeps working until Devon turns it off. Some APIs hide the version in a header. Devon keeps it visible. (~35w) |
| **resource** | `/books` (line 1) | ink | The noun. The handler that serves this URL is the books handler. The query string changes which books come back; the resource decides the response is about books in the first place. (~35w) |
| **query string** | the whole of line 2 | mixed (see below) | Four `name=value` pairs separated by `&`. The first, `q=mystery`, was already there. You added `branch`, `shelf`, and `on_shelf` this morning. The query string parameterizes the handler. Same handler, different filter. (~40w) |

**Visual hierarchy. The three new params render in copper; everything else renders in ink.** Specifically, on line 2:
- `?q=mystery` in ink (the existing param)
- `&branch=branch_north` in copper (new this PR)
- `&shelf=fiction` in copper (new this PR)
- `&on_shelf=true` in copper (new this PR)

This is the "what you wrote" visual emphasis from the brainstorm. The copper coloring is CSS, not JS-dependent — renders even when JavaScript is off.

**Colors.** Four design tokens only (ink, cream, copper, sage). Ink for existing URL text; copper for the three new params; cream background (matches page); sage reserved for hover-region underline (subtle 1px dotted line under each hover region so the reader sees they're interactive). Color is a secondary indicator; the tooltips carry the meaning for screen readers.

**Animation.** Tooltip reveal: 0.2s ease opacity transition (matches M1L4 and M2L2). `@media (prefers-reduced-motion: reduce)` disables transitions.

**Focus.** 2px copper outline on `g[tabindex="0"]:focus-visible`, outline-offset 4px. Each `<g>` has `tabindex="0"`, `role="button"`, `data-tooltip="..."`. The framework's `initHoverTooltip` does not auto-add `role="button"` (M1L1 retro item 4); the author supplies it per region.

**Performance budget.** Raw SVG under 40KB; gzipped under 12KB. Lighter than M2L2 (50KB / 15KB) because the structure is simpler (text + hover overlays, no cell artwork). Validated at build.

**Alt text.** Drafted in Section 2 block 4. Mirrors the URL parts and the new-param emphasis so screen-reader users get the same information as sighted users.

**Static fallback.** Without JavaScript, the full URL renders with the copper emphasis on the new params. Hover regions are progressive enhancement; the visual emphasis carries the lesson's primary writing payoff regardless.

**Hyphen / linter watch in SVG content.**
- Tooltip text contains no hyphens in prose (compound modifiers rewritten).
- `name=value` backticked — identifier, fine.
- `://`, `api.`, `/v1`, `/books`, `?q=mystery`, `&branch=branch_north`, `&shelf=fiction`, `&on_shelf=true` all identifiers — fine.
- "tap and hold" (no hyphen) where tap-interactions are mentioned.

### 3.3. Legacy visuals and assets cleanup.

The legacy `_docs/anatomyofurl.md` references multiple assets and includes that become orphans when the rewrite ships:

**Candidate orphan assets** (verify via grep before deletion in DoD):
- `_includes/url-anatomy-interactive.html` — the legacy clickable component widget; replaced by the new SVG.
- `_data/url_faqs.yml` — legacy FAQ data file (referenced by `{% include faq-section.html data_file="url_faqs" %}`).
- `_data/anatomyofurl_questions.yml` — legacy quiz data file (referenced by `{% include quiz.html quizDataFile="anatomyofurl_questions" %}`).
- `assets/images/api-docs-anatomyofurl.svg` — legacy OG image referenced in legacy frontmatter `image:` field; new OG will regenerate via `scripts/generate-og.mjs` (stub for now per CLAUDE.md, but the legacy static SVG is no longer needed).

**Candidate partial-edit** (not full delete):
- `_data/questions.yml` — legacy "questions to ask yourself" data, keyed by `protocol`, `domain`, `path`, `query_parameters`, `fragment`. If used only by this lesson, delete entries; if shared with other (still-legacy) lessons, leave alone. Grep before edit.

**DoD enforces** a grep check that none of the candidate paths remain referenced from `_docs/*.md` or `_includes/` before merge (matches the M1L4 and M2L2 orphan-cleanup pattern).

---

## Section 4. Frontmatter, glossary, bible deltas, voice.

### 4.1. Frontmatter (`_docs/anatomyofurl.md`).

```yaml
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
```

Notes:
- `description` is 130 chars (under 155). No AI tells, no em dashes, no emoji.
- Permalink unchanged; no `redirect_from` needed.
- `module: 2`, `lesson: 3` reconcile with `_data/modules.yml`.
- All legacy SEO fields dropped: `keywords` (27 tokens), `image`, `speakable`, `speakable_selectors`, `author_name`, `author_description`, `author_expertise`, `level`, `last_modified_at`. Phase 2 frontmatter is function-only.

### 4.2. Glossary additions (`_data/glossary.yml`, same PR).

Four new entries. Each definition under 30 words. Linter-clean.

```yaml
- term: "scheme"
  definition: "The part of a URL before the ://. Names the protocol the client speaks. For web APIs, https."
  link: "#"
  see_also: [host, query string]

- term: "host"
  definition: "The part of a URL after the scheme and before the path. What DNS resolves to an IP address. Often a subdomain like api.greenfield.lib."
  link: "#"
  see_also: [scheme, resource]

- term: "resource"
  definition: "The noun in a URL's path that names what the response is about. /books names the books resource. The query string filters which books come back."
  link: "#"
  see_also: [query string, REST]

- term: "query string"
  definition: "Everything after the ? in a URL. name=value pairs separated by &. Parameterizes the response without changing which handler runs."
  link: "#"
  see_also: [resource, REST]
```

Voice-linter validation: every `see_also` resolves (REST from M2L1; the other three are this lesson's new terms). Four terms satisfies the parent-spec block 7 requirement (3-5 terms).

Skipped (named in lesson body but not promoted to glossary, to stay under the 5-term cap):
- `version`, `base path`, `path parameter` — explained in block 3 prose where they appear.
- `DNS`, `TLD`, `subdomain` — assumed reader familiarity; passing mentions only.

### 4.3. Greenfield bible deltas (`docs/superpowers/greenfield-bible.md`, same PR).

**Five separate Edit operations** (per M1L5/M2L1/M2L2 retro convention: do not collapse).

**Operation 1. Append to Timeline section:**

```markdown
## Module 2, Lesson 3. Maya reviews Devon's advanced-filter PR.
Story date: Tuesday morning, story week 6. Seven days after M2L2's Tuesday-morning whiteboard scene; fourteen days after M2L1's Tuesday-morning Devon-at-desk scene; eighteen days after Asha's email landed Friday evening of story week 3. Maya did her standing Monday branch visit yesterday.
Event: Devon opened a PR Friday afternoon of story week 5 for Greenfield's new advanced-filter extension of GET /v1/books, adding three new query parameters: branch, shelf, on_shelf. The PR description was one line, terse and Devon-voiced. Tuesday morning Maya opens her laptop, finds the PR in her review queue, and reads the URL left to right while Devon is in standup. The lesson is the URL anatomy reading paired with the apprentice designing their own URL from the same requirements. Honors the advanced-filter writing assignment Devon flagged in M2L1 block 1, delivered in URL-design form; doc-page writing waits for Module 4.
Characters present: Maya (at her own laptop, not at Greenfield's office). Devon offstage (in his 9:30 standup, M1L4 callback). The apprentice (the reader) implicit second observer.
New API entities introduced: GET /v1/books extended with three new optional query parameters — branch (string, branch identifier), shelf (string, one of fiction/biography/reference/periodicals), on_shelf (boolean). Existing q (required) and limit (default 25, max 100) unchanged.
New glossary terms introduced: scheme, host, resource, query string.
Quote: "advanced filter, take 4. no POST. yes query string. yes branch_north not north. yes I read RFC 3986." (Devon, in the PR description, opened Friday afternoon of story week 5.)
```

**Operation 2. In-place edit to the existing "The RFC tradition" Locked detail** (M2L1 lock). Append to the existing bullet:

> "RFC 3986 (URI Generic Syntax, January 2005) is the canonical reference for URL anatomy and was added to the canon story week 6 (M2L3). When a lesson needs to invoke 'the URL spec' or 'the URI spec', cite RFC 3986. Three RFCs total in the Greenfield canon: RFC 1 (1969, origin), RFC 9110 (2022, HTTP semantics), RFC 3986 (2005, URI syntax)."

**Operation 3. Append new Locked detail (shelf taxonomy):**

> **Greenfield's shelf taxonomy.** The catalog classifies books across four shelves: `fiction`, `biography`, `reference`, `periodicals`. The `shelf=` query parameter on `GET /v1/books` (M2L3 advanced-filter extension) accepts one of these four values. Future code samples using shelf names pick from this set. Distinct from the physical aisle order — branches still shelve fiction alphabetically by author per M1L5; shelf taxonomy is the catalog's classification, not the aisle map.

**Operation 4. Append new Locked detail (advanced-filter extension):**

> **Advanced-filter extension of `GET /v1/books`.** Three new optional query parameters shipped story week 6: `branch` (string, branch identifier), `shelf` (string, one of the four taxonomy values), `on_shelf` (boolean, `true` means currently on shelf). Designed and shipped by Devon (PR opened Friday afternoon of story week 5, reviewed by Maya Tuesday morning of week 6). Honors M2L1's "next week you write the docs for Greenfield's new advanced-filter endpoint" promise via URL design; doc-page writing waits for Module 4.

**Operation 5. Append new Locked detail (Devon's PR-description voice):**

> **Devon's PR-description voice.** Terse, deadpan, slightly aggrieved, signals "I already thought about this so don't make me explain." Canonical from M2L3 forward. Pattern: lowercase, sentence fragments separated by periods, leading `yes`/`no` stack to preempt review questions. May reappear when Devon opens a PR in later lessons (likely Module 4 writing-the-docs and Module 8 capstone audit).

**Operation 6. In-place edit to the existing `GET /books` API entities section.** Append to the existing entry:

```markdown
- Additional query parameters (added story week 6, M2L3 advanced-filter extension):
  - branch: string, optional. Branch identifier, e.g. branch_north. Filters results to books currently in the named branch's catalog.
  - shelf: string, optional. One of fiction, biography, reference, periodicals. Filters results to books cataloged on the named shelf.
  - on_shelf: boolean, optional. When true, filters results to books currently on shelf (not on loan, not on hold).
- Canonical advanced-filter URL: https://api.greenfield.lib/v1/books?q=mystery&branch=branch_north&shelf=fiction&on_shelf=true
```

Resulting bible delta totals: **1 Timeline append + 3 new Locked details (shelf taxonomy, advanced-filter extension, Devon's PR voice) + 2 in-place edits (RFC tradition adds RFC 3986, GET /books API entity adds query params) = 6 Edit operations.** Each operation a separate Edit call.

**Resolved Open universe questions.** None opened; none closed.

### 4.4. Voice notes for the writer.

**Earned joke.** Lives in block 1, in Devon's PR description text. v0.1 candidate: `"advanced filter, take 4. no POST. yes query string. yes branch_north not north. yes I read RFC 3986."` Construction: what an engineer leaves in a PR description because they know the writer is the next reader. The joke lands on the `yes`/`no` stack (preempts every review nit). Needs human laugh-test before merge (parent DoD).

**Backup constructions** if the v0.1 candidate does not land:
- `"branch + shelf + on_shelf. URL in the spec. read it left to right."` (drier, less joke-y; pure Devon-rule rather than Devon-joke)
- `"advanced filter. URL only. I will fight anyone who suggests we POST."`
- `"filter by branch shelf availability. yes the URL got long. no it isn't getting shorter."`

**The "read it left to right" spine.** Used in block 1 close (`So we read his left to right.`), block 3 H2 (`## Read it left to right`), block 5 (`Read it left to right.`), block 8 prompt (`Read it left to right and name the five parts`), block 9 (`Read it left to right.`). Five intentional uses. Do not dilute or vary the phrasing.

**The M2L2 "RPC in a REST jacket" image, reused in block 6.** Intentional callback to M2L2's locked Devon-image. Reuse, not repetition. Do not introduce a new variant ("RPC underneath", "RPC dressed up", etc.); the canonical short form is locked.

**"Now you write" as block 4 H2.** Imperative, parallel to M2L1's `## Put the promise first` and M2L2's `## Name the shape on page one`. Do not normalize to "Writing your first URL" or "The apprentice writes." The lesson's voice is direct.

**Maya "I" sentences.** Three this lesson (block 1 "I open my laptop"; the diary frame; block 4 framing). Well under the 5-cap from the parent spec.

**M1L4 callback** (Devon-in-standup) stays subtle. Block 1 says "Devon is in standup. He won't be back for forty minutes." The callback lives in the rhythm, not in narration. Do not add "like that morning I read the codebase while Devon was in standup."

**Counterfactual URLs in block 4** use canonical Greenfield identifiers: `branch_north` (not `north`), `fiction` (not generic placeholder). Do not substitute. The counterfactuals' job is to show "what would happen if you wrote this for Greenfield" — generic placeholders break the lesson's grounding.

**Hyphen / linter watchlist for this lesson** (rewrite candidates flagged during drafting):

| Tempting phrase | Rewrite |
|---|---|
| "left-to-right" | "left to right" |
| "key-value pair" | "`name=value` pair" (backtick the identifier) |
| "color-coding" | "the colors" or "coloring" |
| "URL-encoding" / "URL-encoded" | "`URL-encoding`" (backtick on first use; M2L4 owns this) |
| "two-line wrap" | "wrapped to two lines" |
| "hover-tooltip" | "hover and tooltip" or `data-svg-pattern="hover-tooltip"` (backtick attribute form) |
| "RPC-flavored" | "RPC or REST" or "RPC underneath" |
| "AI-first" | "with AI built in" |
| "five-part URL" | "the five URL parts" |
| "first-version URL" | "the first URL" |
| "load-balancer" | "load balancer" |
| "5-min task" / "five-minute exercise" | "five minute task" or "exercise" |

**Identifiers with literal hyphens to backtick on first use** (M2L2 retro learning):
- `URL-encoding`, `base-64`, `path-traversal`, `query-string` (only the literal name; the phrase "the query string" is fine in prose).
- `application/vnd.greenfield.v2+json` (entire MIME type backticked).

**Code samples.** Base URL `https://api.greenfield.lib/v1`. Real Greenfield identifiers only (`branch_north`, `fiction`, `bk_184932`, `The Quiet Library`). No `example.com`, no `foo`/`bar`. Every fenced block has a language tag (`text` for URLs and prompts, `bash` for curl).

**The PR's code host is not named.** "Devon's PR" / "the repo" / "the OpenAPI diff" stays generic — the Greenfield bible does not lock a code host (GitHub/GitLab/Gitea), and M2L3 should not lock one mid-lesson. Future lessons may lock; M2L3 keeps the option open.

**Tool: Cursor.** Last used M1L4. Do not pivot to a web LLM mid-draft. The rotation logic depends on Cursor being the M2L3 pick (block 8 details in Section 2). Frame as "the code editor with AI built in" (not "the AI assistant in the editor" — Cursor is the editor itself).

---

## Section 5. Definition of Done.

Per parent spec Section 4 (Phase 2). Highlights to triple-check before opening the PR:

- All ten blocks present in order with `{% comment %}block:N{% endcomment %}` markers.
- Voice linter (`scripts/voice-check.rb`) passes on `_docs/anatomyofurl.md`.
- Mermaid renders on the cream page background (M1L1 retroactive fix in place). The Notes (`/v1 routes to the v1 server tier`, `q=mystery filters the response`) render without parser warnings.
- Block 3 wraps `scheme`, `host`, `resource`, `query string` with `{% include glossary-term.html term="..." %}` at first definitional use. Block 7 wraps them again.
- Interactive SVG: hover-tooltip works on touch (tap-and-hold) and desktop (hover). Keyboard navigable (Tab between regions, Enter or Space reveals tooltip, Escape dismisses, outside-click dismisses). Each region has `role="button"`, `tabindex="0"`, `data-tooltip="..."`. Focus ring visible (2px copper, 4px outset). `prefers-reduced-motion` respected.
- Five hover regions render correctly: scheme, host, version, resource, query string. All five regions readable at 375px width.
- **Block 4 SVG: the three new params (`branch`, `shelf`, `on_shelf`) render in copper; the rest of the URL renders in ink.** Visual verified on render at 375px / 768px / 1280px. The copper coloring is CSS, not JS-dependent, so it shows in the static fallback.
- Tooltip rendering verified at 375px, 768px, 1280px widths. **Edge case: the query-string region is wide; tooltip positioning at the right edge of the viewport clamps correctly via the framework's existing logic.** Verify with tap-and-hold near the right edge on touch.
- Static fallback: without JavaScript, the full URL renders with copper emphasis on the three new params. Hover regions are progressive enhancement only.
- All four new glossary terms (`scheme`, `host`, `resource`, `query string`) resolve when wrapped. Each `see_also` entry resolves (REST exists from M2L1).
- Reading time 12 to 18 minutes (`wc -w / 150 + 3` on lesson body only, excluding frontmatter and includes); target 14.
- **Earned joke in block 1 (Devon's PR description) gets a thumbs up from Gaurav at human review.** Backup constructions in Section 4.4 are pre-approved fallbacks.
- **Bible appends: 1 Timeline entry + 3 new Locked details (shelf taxonomy, advanced-filter extension, Devon's PR voice) + 2 in-place edits (RFC tradition adds RFC 3986, GET /books API entity adds three new query params). All six operations are separate Edit calls; do not collapse.**
- **M2L1 promise lineage delivered.** Block 1 references the advanced-filter assignment Devon flagged in M2L1 block 1 ("the one Devon flagged the week we first talked about REST"). Block 4 delivers the URL-design slice of that assignment. Doc-page writing waits for Module 4. Verifies the promise chain stays unbroken across M2L1 → M2L2 (deferred) → M2L3 (delivered).
- **Orphan legacy assets cleanup** (grep before delete):
  - `_includes/url-anatomy-interactive.html` — delete if grep returns no other references.
  - `_data/url_faqs.yml` — delete if grep returns no other references.
  - `_data/anatomyofurl_questions.yml` — delete if grep returns no other references.
  - `assets/images/api-docs-anatomyofurl.svg` — delete if grep returns no other references.
  - `_data/questions.yml` keys `protocol`, `domain`, `path`, `query_parameters`, `fragment` — surgical edit only if grep confirms no other lessons use them; leave alone otherwise.
  - Grep command: `git grep -E 'url-anatomy-interactive|url_faqs|anatomyofurl_questions|api-docs-anatomyofurl|questions\.protocol|questions\.domain|questions\.path|questions\.query_parameters|questions\.fragment' _docs/ _includes/ _layouts/` returns no unexpected hits before merge.
- HTMLProofer clean (`bundle exec htmlproofer _site/anatomyofurl.html --swap-urls '^/apidocumentation:'`).
- Build is green (`npm run build:css && bundle exec jekyll build`).
- `module: 2`, `lesson: 3` frontmatter reconciles with `_data/modules.yml`.
- **Counterfactual URLs in block 4 use canonical Greenfield identifiers**: `branch_north` not `north`, `fiction` not generic. Drafter verifies all three counterfactuals against the canonical advanced-filter URL.
- **"Read it left to right" appears unchanged in five places** (block 1 close, block 3 H2, block 5, block 8 prompt, block 9). Drafter does not vary the phrasing.
- Block 6 uses the M2L2-locked image **"RPC in a REST jacket"** unchanged; no new variants.
- Block 4 H2 reads **`## Now you write`** (imperative, parallel to M2L1's `## Put the promise first` and M2L2's `## Name the shape on page one`).
- The PR's code host is **not named** in lesson body. References stay generic ("the PR", "the repo", "the OpenAPI diff").
- Block 8 names **Cursor** as the tool and frames it as "the code editor with AI built in" (not "AI assistant in the editor" — Cursor is the editor itself). The prompt code fence is `text`-tagged. Block 8 section header reads `## AI co pilot tip` (no hyphen).
- `{% include signoff.html %}` renders `Maya.` on its own line at the end of block 10.

---

## Section 6. Risks and open decisions.

### 6.1. Risks (flagged for the writer to watch).

1. **The query-string hover region is wide.** Tooltip positioning at the right edge of the viewport could clip on mobile. The framework's `getBoundingClientRect` + scroll-offset logic should clamp, but the M2L2 retro flagged tooltip rendering as the load-bearing risk for hover-tooltip patterns. Mitigation: verify at 375px / 768px / 1280px before drafting block 4 content. Specifically test tap-and-hold near the right edge of the URL line on iOS Safari 16.

2. **The advanced-filter URL is 95 characters long.** Two-line wrap is the default; some devices/widths could wrap differently. Mitigation: lock the visual wrap point in the SVG (manual `<text>` placement, not CSS-driven flow), so the wrap is identical across devices. Verify at 375px.

3. **Block 1's earned joke depends on Devon's PR-description voice landing.** The deadpan `yes`/`no` stack is the joke; without prior exposure, it can read as flat instead of dry. Mitigation: human laugh-test before merge (parent DoD). Three backup constructions in Section 4.4.

4. **Cursor hedges on action-in-path URLs.** Block 8 names this in "what to watch for", but the prompt may need iteration to keep Cursor from saying "this is a stylistic choice." Mitigation: the followup prompt ("is this URL RPC or REST?") usually fixes it. If first-pass output is wishy-washy, sharpen with a worked example before merge.

5. **Block 4 counterfactual section is information-dense.** Three rejected URLs each with one-sentence analysis = ~150w of analysis inside a 480w block. Risk: reads like a checklist instead of Maya thinking through what the apprentice might have done. Mitigation: drafter holds to Maya's reflective voice ("**Did you write...?**" framing as if the apprentice is on the other end). If the counterfactuals start feeling listy during drafting, drop one (the bracketed `?filters=...:` one is the easiest to cut without losing the lesson's point).

6. **The two-week gap from M2L1 promise → M2L3 delivery risks the apprentice feeling the wait.** Block 1 honors it lightly ("the one Devon flagged the week we first talked about REST"). Mitigation: drafter does not expand the callback into nostalgia or apology. One reference, then move forward.

7. **Title change SEO impact.** Going from "Understanding URL Anatomy - The Building Blocks of API Endpoints" to "Anatomy of a URL (part 1)" removes 8 keyword tokens from the `<title>`. The URL is unchanged so backlinks survive. The legacy `keywords:` field is no longer needed. Acceptable trade-off; track GA4 30 days post-ship.

8. **Bible delta size is larger than M2L2's** (3 new Locked details + 2 in-place edits + 1 Timeline append, vs M2L2's 4 Locked details with no in-place edits). Mitigation: keep all six operations as separate Edit calls per M1L5/M2L1/M2L2 retro convention. The in-place edits (RFC tradition, GET /books) are straightforward appends to existing entries, not rewrites.

9. **The legacy lesson has heavy include surface area.** Five distinct includes and three distinct data files are candidates for orphan-cleanup. Mitigation: DoD grep step enforces; if any include or data-file key is shared with another lesson, it stays.

10. **M2L4 inherits unfinished URL anatomy work.** Fragments, port, encoding, path parameters, path-vs-query trade-offs, path traversal, ambiguous slashes — all M2L4's job. Block 10's bridge promises them. Mitigation: **the M2L4 spec (next session) must explicitly claim these items in its scope perimeter**, or M2L3's promise goes unredeemed. Flag at the top of the next-lesson queue entry.

11. **Cursor was last used in M1L4 with a different framing** (asking questions about the codebase). M2L3 uses Cursor for URL design review. Same tool, different prompt class. Mitigation: the framing difference is fine — Cursor handles both. The block 8 working copy makes the URL-review use case explicit; no risk of the reader confusing it with M1L4's codebase-question pattern.

12. **The `version` part of the URL gets one paragraph in block 3 that touches on header-based versioning** (`Accept: application/vnd.greenfield.v2+json`). Some readers will not have seen MIME-type versioning. Mitigation: shown as "some APIs hide the version in a header" — the alternative is named but not taught. The reader doesn't need to know what the MIME type means to get the point ("Devon keeps the version visible").

13. **"Devon shipped the same URL you just wrote" beat in block 4 could read as "this was an exercise in matching Devon's PR" instead of "the lesson taught real URL design."** Risk: the apprentice feels they were guessing Devon's URL rather than designing one. Mitigation: the three counterfactuals are what make the writing real — they show the apprentice could have written something different, and the lesson rewards the right thinking (not the right echo). Drafter keeps the counterfactual section vivid; if any counterfactual reads as filler, replace rather than drop. The "PR comment you leave him: nothing" line is the resolution — the apprentice's URL is correct on its own merits, and Devon's matching URL is independent confirmation, not the lesson's source of truth.

### 6.2. Open decisions (deferred to drafting or post-ship retro).

1. **Earned joke wording.** v0.1 commits to `"advanced filter, take 4. no POST. yes query string. yes branch_north not north. yes I read RFC 3986."` Backup constructions in Section 4.4 are pre-approved fallbacks. Pick during drafting after human laugh-test.

2. **`reading_time: 14` final.** Closed in this self-review pass: 14 matches `wc -w / 150 + 3` on ~1,694 words. If the final draft lands above 1,800 words, bump to 15.

3. **Mermaid participant count: 4 or 5.** v0.1 has 4 (Atlas, DNS, Greenfield API, books handler). Adding a 5th (Cache between Atlas and API) would re-emphasize M2L1's caching point at the cost of one more participant and two more messages. The cache's role in URL anatomy is secondary; M2L3's focus is what each URL part does, not where each response gets stored. v0.1 stays at 4. Drafter may add Cache if the diagram reads sparse on render.

4. **Shelf taxonomy size.** v0.1 commits to four shelves (`fiction`, `biography`, `reference`, `periodicals`). If a later lesson needs a fifth (children's, e-books, music, dvd), lock it in that lesson's bible delta. The four are sufficient for M2L3's example.

5. **PR code host.** Deferred. v0.1 keeps "the PR" / "the repo" generic. The bible-canon decision on GitHub/GitLab/Gitea will surface naturally in a later lesson (likely Module 4 writing-the-docs, where the apprentice may PR a doc change; or Module 8 capstone, where the apprentice ships docs as PRs). M2L3 stays open.

6. **SVG URL wrap: one line or two.** v0.1 commits to two lines (URL is 95 characters; won't fit on most mobile widths at readable monospace size). If reviewer sees one-line desktop rendering as more legible and two-line mobile as fine, revisit. Two-line is the safer default.

7. **Whether to lock additional Devon dialog beyond the PR description.** v0.1 has only the PR description quoted. Drafting may surface a Slack message or a code comment worth quoting in the bible Locked details. If so, append in the same PR.

8. **Whether block 5's exercise calls out any specific public API by name (Stripe, GitHub, OpenAI, etc.).** v0.1 keeps the exercise open ("any public API doc you've used recently"). M2L1's block 5 named three specific APIs; M2L2's block 5 named three. M2L3's open-ended version lets the apprentice pick what they actually use; risk is they freeze without examples. If feedback shows freezing, add 2-3 example APIs.

---

## Section 7. Changelog.

- **2026-05-31. v0.1.** Drafted from brainstorm. Frame (read before you write), scope (five URL parts: scheme, host, version, resource, query string; base path named in one sentence; fragments and others deferred to M2L4), advanced-filter endpoint locked (`GET /v1/books` extended with `branch`, `shelf`, `on_shelf`), story-week 6 Tuesday morning timing, scene (Maya at her laptop, Devon offstage in standup, M1L4 callback), AI tool (Cursor; rotation gap 6 lessons), Mermaid (request-routing sequence, 4 participants, 5 messages, 2 notes), SVG (hover-tooltip on the destination URL, 5 hover regions, copper for the 3 new params, ink for the rest), bible deltas (1 Timeline + 3 new Locked details — shelf taxonomy, advanced-filter extension, Devon's PR-description voice — + 2 in-place edits — RFC tradition adds RFC 3986, GET /books adds query params), glossary deltas (4 new terms: scheme, host, resource, query string), frontmatter (function-only, 8 legacy SEO fields dropped), voice notes (5 protect-during-drafting items, 12-row hyphen watchlist), risks (13), and open decisions (8) all locked. Spec self-review pass to follow; user review gates plan handoff.
