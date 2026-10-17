# M2L1. REST principles. Design.

**Status.** v0.1. Drafted from brainstorm 2026-05-29. Ready for spec self-review and user review before plan handoff.
**Owner.** Gaurav Trivedi.
**Author of this spec.** Claude (drafting), Gaurav (decisions).
**Last updated.** 2026-05-29.

Per-lesson design spec for Module 2 Lesson 1, the REST-principles rewrite. Source file: `_docs/restAPI.md`. Permalink (preserved): `/restAPI.html`. This spec sits under the parent Phase 2 spec at `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md`; everything in the parent spec applies unless explicitly overridden below.

---

## Section 1. What this lesson is.

**Position.** Module 2 Lesson 1. The opener of Module 2 (REST, HTTP, and the dance), 8 lessons in the final TOC. Second lesson written in story-week-4. Eight calendar days after M1L5's Mira-Monday scene.

**Source legacy lesson.** `_docs/restAPI.md` (current title: "REST APIs Key Concepts and Structure"). Permalink `/restAPI.html`, preserved. Legacy lesson taught REST via three sections: statelessness (with an all-you-can-eat buffet analogy), caching (with a news-article analogy), and three components (URL endpoints, HTTP verbs, body messages — with a librarian analogy that conflicts with Greenfield as the running example). Two interactive elements (a caching simulator, a mobile-friendly code-tab block) and a problem-solution table. SEO-heavy frontmatter (28 keyword tokens). Title change: "REST APIs Key Concepts and Structure" → **"REST principles"** per TOC spec. URL unchanged; no `redirect_from` needed.

**What the 2026 reader needs that the legacy version misses.** The legacy lesson is a textbook tour. It does not name the agreement that the verbs encode and that every cache, browser, and agent reads. It does not connect REST to RFCs, to HTTP, or to the question a working API writer is actually being asked in 2026 ("should this be GET or POST"). The Greenfield rewrite reframes REST as a 55-year-old discipline that disciplines HTTP, and lands the discipline through a single argument the writer's team is having today.

**Teaching frame.** **Conventions-first.** The whole lesson hangs on one question: why is it `GET /books?q=mystery` and not `POST /search`. Four REST principles surface through that argument:

1. **Uniform interface.** Every reader (browser, cache, agent, log) reads the same URL the same way because the verb and path carry the meaning.
2. **Resource orientation.** The URL names a thing (`/books`), not an action. Search is *how* you look at the books; it lives in the query string.
3. **Cacheability.** `GET` responses are cacheable by default. `POST` responses are not.
4. **Safety.** `GET` promises not to change server state. Means it can be retried, prefetched, logged, bookmarked. `POST` makes no such promise.

Statelessness gets one sentence as the property the other four rely on. Idempotency is deferred to M2L6 (pagination, idempotency, rate limits) where it lives in context.

**The conceptual spine.** The RFC tradition. RFC 1 was Steve Crocker, April 1969. The current HTTP semantics spec is RFC 9110 (2022). Greenfield's server library follows it. So does every cache, every browser, every agent reading the URL. The lesson names this tradition once in block 3 to land the weight: 55 years of agreement is why your browser knows what `GET` means without asking.

**The story trigger.** Asha, a senior engineer at Marginalia (Atlas's owning company, locked in M1L5), emailed Devon late Friday: "any chance you could expose `POST /search`? our internal stack expects to send a query in a JSON body." Devon pinged Maya Monday: come by tomorrow morning, I want to think out loud. The lesson is Devon walking Maya through why he is going to politely decline.

**Cross-module bridge.** Opener picks up M1L5's closing teaser ("why GET /books and not POST /search; letters from 1969"). Closer hands off to M2L2 (Types of APIs): "Next week Devon walks me through three other API shapes Greenfield could have shipped, and he has opinions about all three."

**Scope perimeter.** This lesson does not teach URL anatomy (M2L3, M2L4), response shapes (M2L5), pagination or idempotency or rate-limit semantics (M2L6), cURL flags (M2L7), or auth (M2L8). It teaches verb meaning, the four agreements, and the documentation pattern that names them on the page.

---

## Section 2. The ten-block outline.

**Naming.** Block numbers follow parent spec Section 2 (block 5 = "Try it on Greenfield", block 6 = "The trap"). The parent spec's Section 3 reference to "block 5 (the trap)" is an internal numbering inconsistency; this spec follows Section 2 of the parent.

### Block 1. Diary opener (60-120w).

**Scene.** Tuesday morning of story week 4. Maya at Devon's desk on Greenfield's third floor. Devon pinged her Monday afternoon: "Marginalia wrote in. Come by tomorrow morning, I want to think out loud." His laptop is open to one tab. Asha's email is on screen. Devon is composing the reply.

**Asha's email** (working content; final wording during drafting; rendered in lesson as a short blockquote, not a code block):

> *Hi Devon,*
> *Any chance you could expose `POST /search`? Our internal stack expects to send a query in a JSON body and we are doing some string surgery on our side to fit your URL. If you are open to it we can send a spec.*
> *Asha*

**Earned joke** lands here in the texture of Devon's revisions. Working construction: Devon types "We are not building Algolia." out loud, looks at it, deletes it. Maya narrates one short sentence: "He kept the version where it stayed in his head." The joke lands on the strong word ("Algolia"); the cut is the payoff. Final wording during drafting; needs to read as funny to at least one other human (Phase 2 spec Definition of Done).

**Apprentice stake** (last sentence): "Today you need to know why he is saying no, because next week you will write the docs for Greenfield's new advanced-filter endpoint, and you will be making this choice yourself."

### Block 2. Today you will leave with (≤30w).

Three bullets:

- The four agreements every HTTP verb makes.
- The doc pattern that puts the verb's promise first.
- A GPT prompt that audits one of yours.

Word count: ~22w. Under the 30w cap.

`{% include ad-slot.html slot="lesson-mid-1" format="auto" %}`

### Block 3. What just happened (200-400w + Mermaid).

**Opening idea (one sentence).** Every HTTP verb is an agreement.

**The four facets.** Walk each in two to three sentences. Anchor each to Asha-and-Atlas, not to abstraction:

1. **Uniform interface.** `GET` means "read this thing" everywhere on the web. The browser knows it. The cache between Atlas and Greenfield knows it. Greenfield's access log knows it. The verb carries the meaning.
2. **Resource orientation.** The URL names a thing. `/books` is the books. The filter is how you look at them, so it lives in the query string. `POST /search` makes the URL name the action, not the thing.
3. **Cacheability.** `GET` responses are cacheable by default. `POST` responses are not. When Atlas calls `/books?q=mystery` twenty times an hour, every cache between Atlas and Greenfield can serve the second call onwards from a copy. Greenfield's origin sees one of those calls. The other nineteen never reach it.
4. **Safety.** `GET` promises not to change server state. Means it can be retried after a flaky network, prefetched by a browser, logged with the query, bookmarked. `POST` makes no such promise.

**Connect safety and cacheability explicitly.** One sentence: "Safety and cacheability are not two separate ideas. A safe verb is naturally cacheable, because the response does not depend on side effects."

**Statelessness in one sentence.** "Every request stands alone, carrying enough to be understood without context. That is the property the other four rely on."

**The letters from 1969 beat (two sentences).** "The current HTTP method spec is RFC 9110. Steve Crocker wrote the first RFC in April 1969. The chain is unbroken. 55 years of agreement is why your browser knows what `GET` means without asking. REST is the discipline of using HTTP the way the RFCs say to."

**Thought-checkpoint sentence near the end.** "Look at the diagram. Find the cache. It is the one Atlas does not know about and benefits from anyway."

**Mermaid.** Sequence diagram. 3 participants (Atlas, Cache, API). 5 messages. Under the 10-node, 12-edge cap.

```liquid
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
```

Mermaid source travels inline in the lesson Markdown per parent spec Section 6.

### Block 4. How we document it (400-700w + interactive SVG).

**Opening doc pattern (~100w).** Every endpoint's reference page names what the verb commits to in the first three words after the H2. Greenfield's reference page for `/v1/books` opens like this:

> **`GET`. Safe. Cacheable.**

Then the curl. Then a short description of what the endpoint returns. Then the response fields. The verb's promises come first because they are what every reader (dev, agent, cache) needs first. The dev wants to copy a snippet. The agent wants to know whether to retry. The cache wants to know whether to store.

**The canonical curl** (one example, real Greenfield data):

```bash
$ curl -H "Authorization: Bearer $GF_TOKEN" \
       "https://api.greenfield.lib/v1/books?q=mystery"
```

One short sentence on the response shape (one of the canonical results, `bk_184932`, `The Quiet Library`, `branch_north`).

**The contrast (~150w).** What the same page would look like for `POST /search`. Maya shows three short bullets: what changes for the cache, what changes for retries, what changes for the access log. Names what the doc page owes. A `POST /search` page owes the caller three short lines on the page. This looks like a search. Here is why we POST. Here is what you lose.

**The interactive SVG (~50w of lead-in prose + the include).** Lead-in: "Below is the same request in two states. Click to toggle. Watch the five rows flip."

```liquid
{% include interactive-svg.html slug="restAPI" alt="A toggle between two HTTP requests for the same data. State GET shows the request line GET /v1/books?q=mystery with five rows below: URL = full query visible; cache = hit on the second call; retry = safe; access log = method, path, and query; bookmark = works. State POST shows the request line POST /search with body {q: mystery} and the same five rows flipped: URL = method and path only; cache = miss every time; retry = unsafe; access log = method and path; bookmark = does not work. The toggle is the whole SVG; click or press Enter to switch states." %}
```

**Closing sentence of block 4 (~30w).** "The doc page that names what the verb commits to gives every reader, including Asha and Atlas and the cache and Mira, a chance to understand what the call will do before it does it."

Total block 4 word target: ~550w. In the 400-700w window.

### Block 5. Try it on Greenfield (100-200w, 5-min task).

Rendered as `{% include callout.html variant="exercise" body=body %}` (the `exercise` variant added in Phase 2 prerequisites).

**Working copy** (final wording during drafting):

> Open the reference page for one endpoint in any public API doc: Stripe's `/v1/customers`, GitHub's `/repos`, OpenAI's `/v1/chat/completions`, your choice. Find the verb. Read the first three sentences after the verb. Did the page name what the verb commits to: is it safe, is it cacheable, what happens if you retry? Write three sentences in your notes: the verb, the page's answer, your judgment. If the page did not say what the verb commits to, that is the finding. Write that down.
>
> The exercise is not about catching the doc page out. It is about noticing whether the page told you what the call would do before you made it.

Word count: ~110w. In the 100-200w window.

### Block 6. The trap (100-200w).

Rendered as `{% include callout.html variant="warning" body=body %}`. Devon-voiced.

**Working copy** (final wording during drafting):

> `POST /search` exists in production at Stripe, Algolia, Elasticsearch, every endpoint where the filter tree will not fit in a URL. The convention is a default, not a religion.
>
> Devon's rule: break the rule when you have a reason. Do not break it by accident. The first version of Greenfield's `/v1/books` endpoint accepted a JSON body on `POST` because Devon copied a tutorial. The cache never served it. The access log never showed the query. Asha would not have written to him about that version. She would have written to ask why everything was slow.
>
> When you ship a search endpoint that does not fit the agreements, the doc page is where you pay the difference. Three short lines on the page. This looks like a search. Here is why we POST. Here is what you lose.

Word count: ~150w. In the 100-200w window.

### Block 7. Words you can drop in standups now (3-5 terms).

Four terms. Each one sentence on usage (not definition). Each wrapped in `{% include glossary-term.html term="..." %}`.

- **REST.** Use this when someone asks "is our API REST." The real question is "do we follow the HTTP conventions."
- **Safe.** Use this when you mean "I can call this and nothing on the server changes."
- **Cacheable.** Use this when you mean "the cache holds this for me by default, so my next call is fast."
- **Uniform interface.** Use this when you mean "every reader of this URL, including browsers, agents, and caches, knows what to do without us telling them."

No em dashes. No hyphens in prose. Voice linter clean.

`{% include ad-slot.html slot="lesson-mid-2" format="auto" %}`

### Block 8. AI co pilot tip (150-250w).

**Tool: GPT (ChatGPT).** Rotation check: M1L1 GPT, M1L2 Claude, M1L3 Claude, M1L4 Cursor, M1L5 Gemini. GPT is the longest-gap pick and keeps no vendor dominating.

**Section header in the lesson body must read "AI co pilot tip" (no hyphen).** Lesson voice rules apply (parent spec Section 3 + M1L5 retro guidance on spec-to-lesson cargo-culting).

**Working copy.**

> **The situation.** You have an endpoint on your desk and you want a second opinion on whether the verb matches the action. Useful before a doc page goes out; useful when an engineer pushes a PR and the verb feels off.
>
> **The prompt** (copy box):
>
> ```text
> Here is an HTTP method and path: `GET /v1/customers/{id}/subscriptions`. Audit it against four REST principles: uniform interface, resource orientation, cacheability, safety. For each, say in one sentence whether the choice fits. If you would pick a different verb, name it and explain in one sentence why. Do not hedge.
> ```
>
> **What to expect back.** Four short lines, one per principle, and a verdict. The verdict either confirms the verb or names a replacement.
>
> **What to watch for.** GPT sometimes hedges with "both are valid". Push back: "pick one and defend it." The hedged answer is not useful. The defended one is. If the verdict is "GET is correct", ask for one case where POST would be the right call. That second pass forces the model off the default and gives you the trap from block 6 in the model's own words.

Word count: ~230w. In the 150-250w window.

### Block 9. Before you go (one self check, 1-2 sentences).

> Could Greenfield have shipped this catalog without REST? Picture the same `/v1/books?q=mystery` call in a different shape.

Two sentences. No answer key. The answer lives in M2L2's opener.

### Block 10. Next week at Greenfield (one sentence) + signoff.

> Next week Devon walks me through three other API shapes Greenfield could have shipped, and he has opinions about all three.

```liquid
{% include signoff.html %}
```

Renders `Maya.` on its own line.

---

## Section 3. Visuals.

### 3.1. Mermaid (block 3).

Sequence diagram. 3 participants (Atlas, Cache, Greenfield API). 5 to 6 messages. Under the parent spec's 10-node and 12-edge caps. Inherits theme via `assets/js/mermaid-init.js`. No inline color overrides. Labels: sentence case, no hyphens, no em dashes, numerals for HTTP codes.

Source inline in lesson Markdown via `{% capture %}` + `{% include mermaid.html content=src alt="..." %}` pattern (parent spec Section 6).

Accessibility: alt text on the include conveys the same information as the diagram. Prose around the diagram describes what the diagram shows so readers who do not see it are not left behind.

### 3.2. Interactive SVG (block 4).

**Storage.** `assets/svg/restAPI/main.svg`. Hand-authored. ~150 lines.

**Pattern.** `data-svg-pattern="toggle"`, `data-states="GET,POST"`. Whole-SVG-as-switch convention (matches M1L3 `whatwritersdo` and M1L5 `audiences-humans-and-agents`). Root SVG has `role="switch"`, `tabindex="0"`, `aria-checked` flips. Default state on initial render is `GET`; static fallback (no JS) shows the GET state. JS layers the toggle on top.

**Dimensions.** `viewBox="0 0 800 500"`, `preserveAspectRatio="xMidYMid meet"`. CSS sets `max-width: 100%; height: auto;`. Touch target 44x44 minimum at any rendered size; the whole SVG is the touch target.

**Layout** (top to bottom):
- Toggle hint line (~28px from top): "Click the diagram or press Enter to toggle. Current state shown at the top."
- State label (~56px): "GET" or "POST", centered, bold.
- Request line (~100px): `GET /v1/books?q=mystery` or `POST /search` plus `{"q":"mystery"}` body on a second line.
- Five rows below the request line, each ~70px tall, label on the left, state-dependent value on the right:
  1. URL: "full query visible" / "method and path only"
  2. Cache: "hit on second call" / "miss every time"
  3. Retry: "safe to retry" / "not safe; may create twice" (the earlier draft "may double-create" was a compound modifier; the rewrite removes the hyphen and reads cleaner aloud)
  4. Access log: "method, path, and query" / "method and path"
  5. Bookmark: "works" / "does not work"

**Colors.** Four design tokens only (ink, cream, copper, sage). Copper for the highlighted state; ink for the dimmed state. Color is the secondary indicator; the text labels carry the information.

**Animation.** State transitions use 0.2s ease opacity transitions, matching M1L5. `@media (prefers-reduced-motion: reduce)` disables transitions.

**Focus.** 2px copper outline on `svg:focus-visible`, outline-offset 4px. Matches M1L5.

**Performance budget.** Raw SVG under 30KB; gzipped under 10KB. Validated at build.

**Alt text.** Drafted in Section 2 block 4. Conveys the five-row contrast in prose so the SVG is comprehensible to screen-reader users.

**Pre-flight check completed.** `assets/js/interactive-svg.js` confirmed to support `toggle` pattern via `initToggle()` at line 48. M1L3 and M1L5 SVGs reviewed for the whole-SVG-as-switch convention. SVG spec authored to match the framework, not the reverse.

---

## Section 4. Frontmatter, glossary, bible deltas, voice.

### 4.1. Frontmatter (`_docs/restAPI.md`).

```yaml
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
```

Notes:
- `description` is 130 characters (under the 155 cap). No AI tells. No em dashes. No emoji. No colons (no quoting strictly needed for colons, but the value is quoted defensively per M1L5 retro guidance).
- `previous_page.title` contains a colon; quoted for YAML safety.
- `redirect_from` not needed; URL is unchanged.
- `module: 2`, `lesson: 1` reconcile with `_data/modules.yml` (Definition of Done in parent spec Section 4).
- `placeholder: true` was never on this entry (the slot is for a written legacy lesson).

### 4.2. Glossary additions (`_data/glossary.yml`, same PR).

Four new entries. Each under 30 words. Plain English. No voice violations. Each followed by its `see_also` list.

```yaml
- term: "REST"
  definition: "Conventions for using HTTP verbs and URLs the way the RFCs say to, so caches, browsers, and agents all read the same call the same way."
  link: "#"
  see_also: [uniform interface, safe, cacheable]

- term: "safe"
  definition: "An HTTP method that promises not to change the server's state. GET is safe; POST is not. Safe methods can be retried without risk."
  link: "#"
  see_also: [cacheable, REST]

- term: "cacheable"
  definition: "A response a downstream cache or proxy may store and reuse without asking the origin server first."
  link: "#"
  see_also: [safe, REST]

- term: "uniform interface"
  definition: "REST's first agreement. Every caller reads the same URL the same way, because the verb and the path carry the meaning."
  link: "#"
  see_also: [REST]
```

Voice-linter validation: every linked term resolves. The four-term count satisfies the parent-spec block 7 requirement (3-5 terms).

### 4.3. Greenfield bible deltas (`docs/superpowers/greenfield-bible.md`, same PR).

**Append to Timeline section** (per M1L5 retro: append at bottom, do not in-place-replace):

```markdown
## Module 2, Lesson 1. Asha asks for POST /search.
Story date: Tuesday morning, story week 4. Eight days after Mira walked into the branch (M1L5 was Monday of story week 3).
Event: Asha, a senior engineer at Marginalia, emailed Devon late Friday asking Greenfield to expose POST /search because Marginalia's internal stack expects to send a query in a JSON body. Tuesday morning Devon walks Maya through the polite-decline reply and the four agreements every HTTP verb makes. The lesson is the conventions debate, with the RFC tradition (RFC 1, April 1969 → RFC 9110, 2022) as the conceptual spine.
Characters present: Maya, Devon. Asha (offstage, via email). Atlas (offstage, the original reason Asha is writing).
New API entities introduced: none. Greenfield's GET /v1/books is the reference example; no new endpoints ship in this lesson.
New glossary terms introduced: REST, safe, cacheable, uniform interface.
Quote: "We are not building Algolia." (Devon, dry, said out loud while typing the reply, then deleted from the draft.)
```

**Append to Locked details section** (separate Edit operations per M1L5 retro: do not collapse multiple edits into one):

- **Asha.** Senior engineer at Marginalia. She/her. First on-screen via her Friday email in M2L1. Voice: polite, terse, technically specific. Knows enough to ask for a JSON body. May reappear in later Marginalia-Greenfield exchanges (Module 7 likely).
- **The RFC tradition.** RFC 1 was Steve Crocker, April 1969. RFC 9110 (2022) is the current HTTP semantics spec Greenfield's server library follows. Either or both can be cited when a lesson needs to invoke the weight of the convention.
- **Greenfield's advanced filter endpoint.** Mentioned in M2L1 block 1 as next week's writing assignment for the apprentice. Locked here so later lessons can refer to it consistently. Final placement and shape decided in the lesson that ships it (likely M2L3-M2L5).
- **Marginalia's "ask for POST /search" pattern.** Marginalia's internal stack expects JSON bodies and treats POST as the universal request shape. Locked because it explains why Marginalia keeps proposing POST endpoints. Resurfaces in M7 MCP discussions.

**Resolved Open universe questions.** None opened; none closed.

### 4.4. Voice notes for the writer.

**Earned joke** lands in block 1. Construction: Devon types "We are not building Algolia." out loud, looks at it, deletes it. Maya: "He kept the version where it stayed in his head." Joke lands on "Algolia" (the strong word); cut is the payoff. Final wording during drafting; needs human laugh-test (Definition of Done).

**No hyphens, em dashes, en dashes, emoji in body prose.** Hyphens preserved inside code, URLs, headers, identifiers, vendor names: `HTTP/1.1`, `RFC 9110`, `Bearer $GF_TOKEN`, `/v1/books?q=mystery`, `Content-Type`, `X-RateLimit-Limit`.

**Hyphen watchlist for this lesson** (rewrite candidates flagged during drafting):

| Tempting phrase | Rewrite |
|---|---|
| "great-great-grandchild of" | "descends from" |
| "fifty-five years" | "55 years" |
| "client-server" | "client and server" |
| "cache-friendly" | "the cache holds it for you" |
| "state-changing" | "changes the server's state" |
| "real-world" | "in practice" |
| "RFC-based" | "in the RFCs" |
| "double-create" | "create twice" |
| "side-effect-free" | "without side effects" |
| "GET-vs-POST" | "GET vs POST" (the "vs" already separates) |

**Allowed personality words.** "Honestly", "fine", "fair", "look", "here", "in practice", "in production", "in my experience". Used sparingly. Max five Maya "I" sentences per the parent spec.

**Code samples.** Base URL `https://api.greenfield.lib/v1`. Real Greenfield data only (`bk_184932`, `The Quiet Library`, `branch_north`, `lina.varga` where applicable). `$GF_TOKEN` for the bearer. No `example.com`. No `foo`/`bar`. Every fenced block has a language tag (`bash`, `http`, `json`, `text` for the AI prompt).

**Asha's email body** is rendered as a blockquote in the diary opener, not a fenced code block. Code blocks are reserved for the languages above.

---

## Section 5. Definition of Done.

Per parent spec Section 4 (Phase 2). No additional lesson-specific items.

Highlights to triple-check before opening the PR:

- All ten blocks present in order with `{% comment %}block:N{% endcomment %}` markers.
- Voice linter (`scripts/voice-check.rb`) passes on `_docs/restAPI.md`.
- Mermaid renders on the cream page background (theme correctness; M1L1 retroactive fix is in place).
- Interactive SVG: keyboard navigable (Enter and Space both toggle), `aria-checked` reflects state, focus ring visible, `prefers-reduced-motion` respected, static fallback shows GET.
- All four new glossary terms resolve when wrapped in `{% include glossary-term.html term="..." %}`.
- Reading time 12 to 18 minutes (`wc -w / 150 + 3`).
- Earned joke in block 1 gets a thumbs up from Gaurav at human review.
- Bible appends (Timeline + 4 Locked details entries) are separate Edit operations, not collapsed.
- HTMLProofer clean (`bundle exec htmlproofer _site/restAPI.html --swap-urls '^/apidocumentation:'`).
- Build is green (`npm run build:css && bundle exec jekyll build`).
- `module:` and `lesson:` frontmatter reconcile with `_data/modules.yml` (Module 2, Lesson 1).

---

## Section 6. Risks and open decisions.

### 6.1. Risks (flagged for the writer to watch).

1. **The "letters from 1969" beat could feel like history-lesson padding.** Mitigation: the spec locks two sentences total in block 3 (Section 2 block 3). Writer holds the line; if it grows past three sentences it is doing too much.

2. **The polite-decline email tone needs to land Devon's voice without making him snarky.** Devon is dry and slightly cynical (bible cast notes), not mean. Asha is a peer, not an annoyance. Mitigation: draft Asha's email and Devon's reply prose together; if Devon's reply sounds dismissive, it is wrong. The joke lives in the deleted line ("We are not building Algolia."), not in the sent reply.

3. **The interactive SVG has five rows of state-dependent content; touch-target and readability on mobile matter.** Mitigation: hold to the M1L3/M1L5 whole-SVG-as-switch pattern; do not introduce in-SVG buttons. The full 800x500 viewBox is the touch target. Test on iOS Safari 16 and Chrome on Android before shipping.

4. **The AI co pilot prompt may need iteration to keep GPT from hedging.** Mitigation: the prompt already includes "Do not hedge" and the block 8 "what to watch for" section names the failure mode. If first-pass output reads like a textbook, sharpen the prompt with a worked-out example before merge.

5. **Scope leakage into M2L6 (pagination/idempotency/rate limits).** The "Atlas hits 20x/min" framing is shared between M2L1 and M2L6. Mitigation: in M2L1 keep the framing to one sentence per use (block 3 cacheability bullet; block 4 contrast bullet). M2L6 will pick up the rate-limit-response-header beat.

6. **Title change risk for SEO.** Going from "REST APIs Key Concepts and Structure" to "REST principles" removes 5 keyword tokens from the `<title>`. The URL is unchanged so backlinks survive. The legacy `keywords:` field in frontmatter is no longer needed (the rewrite uses a tight `description` instead). Acceptable trade-off; track GA4 30 days post-ship.

### 6.2. Open decisions (deferred to drafting or post-ship retro).

1. **Asha's last name.** Locked at "Asha" first name; surname optional. If the lesson reads better with "Asha Velasco" or similar, lock the surname in the bible append during drafting. If it never comes up in prose, leave first-name-only.

2. **Whether Mira is name-checked in M2L1 block 4.** The proposed closing sentence of block 4 lists "Asha and Atlas and the cache and Mira" as the readers a verb-promise-naming doc page serves. Mira's appearance is M1L5 callback only. If the sentence reads as overstuffed during drafting, drop Mira and keep three readers.

3. **Mermaid: 5 messages or 6.** The spec sketch has 5. If a sixth message ("Note over Cache: cache populated") improves clarity at the second-call moment, add it. Both fit under the edge cap.

---

## Section 7. Changelog.

- **2026-05-29. v0.1.** Drafted from brainstorm. Frame (conventions-first), trigger (Asha's email), principle scope (tight four), SVG pattern (toggle, whole-SVG-as-switch), AI tool (GPT), bible deltas, glossary deltas, frontmatter, and risks all locked. Spec self-review pass to follow; user review gates plan handoff.
