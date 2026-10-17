# Module 1 Lesson 3 ("What an API writer does in 2026"). Design.

**Status.** v0.1. All five sections locked; ready for user review and writing-plans handoff.
**Owner.** Gaurav Trivedi.
**Author of this spec.** Claude (drafting), Gaurav (decisions).
**Last updated.** 2026-05-21.

Per-lesson design spec for rewriting `_docs/whatwritersdo.md` (permalink `/whatwritersdo.html`) as Module 1 Lesson 3 in Maya's voice. Implementation plan follows at `docs/superpowers/plans/2026-05-21-m1l3-whatwritersdo-plan.md`.

**Parent spec.** `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md` (Phase 2 framework — voice, 10-block template, DoD, visual pipeline).

**Sister references.**

- `docs/superpowers/specs/2026-05-20-toc-finalization-design.md` (canonical TOC).
- `docs/superpowers/specs/2026-05-20-m1l1-journey-design.md` (preceding lesson's spec; story-time precedes this one by two events).
- Pilot lesson (the voice exemplar): `_docs/whatisanapi.md` (Module 1 Lesson 2; sits between M1L1 and this lesson in story time).
- Universe canon: `docs/superpowers/greenfield-bible.md`.

---

## Section 1. The ten-block outline.

Step 2 artifact per parent spec Section 5. If any block lacks a clear one-line answer, the lesson is not ready to write.

**Central argument.** An API writer in 2026 writes for two readers: humans and agents. Everything else (sourcing, structuring, testing, shipping) is downstream of that one shift.

**Block 1. Diary opener.** Two or three days after Sam's visit (late in the same story week as the pilot). Priya pulls Maya into the conference room. On Priya's monitor: two stacked traffic graphs for `greenfield.lib`. One labeled "humans". One labeled "agents". The agent line is rising and Priya wants Maya to see it. Priya gets her first on-screen scene; her role (product manager, runs the analytics seat) is named in one sentence. The earned joke is Priya's: dry, analytics-flavored, observational. **Seed draft for the joke (lesson author refines):** "Three weeks ago I would have called this a bot problem. Now it is a customer. I am of two minds about it." The closer pivots to the apprentice: "what you are about to learn is that the job changed when the second graph started climbing."

**Block 2. Today you will leave with (under 30 words).** Three bullets: (1) why the job in 2026 writes for two readers; (2) what each reader takes from the same page; (3) an AI prompt that reads a draft twice and reports what each reader missed.

**Block 3. The two-reader rule (~300 words plus one Mermaid diagram).** Defines the rule against the same artifact. A human reader is a developer scanning for a quickstart, a copy-paste sample, an English explanation. An agent reader is software trying to figure out how to call the API: code generators, AI coding assistants reading docs over a developer's shoulder, tool-use loops that consume the schema before they can act. The two reads happen against the same doc page, not two different pages. Same artifact, two extractions. Mermaid sequence diagram with the doc page as one participant and the two readers as the other two; the messages describe what each reader takes away.

**Block 4. One doc page, two reads (~500 words plus one interactive SVG).** Walks through a Greenfield `GET /books` reference page. First read: what a human is hunting for — a one-line summary, a `curl` example, an English description of each error. Second read: what an agent is hunting for — parameter types declared, JSON schema for the 200 response, machine-parseable error codes (`401`, `429`). Maya's locked opinion (about authoring order, distinct from M1L1's claim about leading with the path in a description): "I treat the schema as the source of truth. Write the structure first. Write the prose around it. Both readers respect the schema. Only one reads the prose. Skip the structure and you ship a page that only humans can use."

**Block 5. Try it on Greenfield (~150 words, exercise callout).** Pick any real docs page the reader has heard of (Stripe, GitHub, Twilio). Read it twice. Once as a developer trying to make the call. Once as an agent trying to parse the response. Note which read was harder. Whichever was harder is where the page is failing one of its readers.

**Block 6. The trap (~165 words, warning callout).** The trap is hearing "writing for agents" and assuming it means abandoning prose. It does not. Both readers need both. Agents read prose to understand intent; humans read structure to understand boundaries. Devon's line, narrated by Maya (same pattern as M1L1's "Devon's version, which he says approximately once a month"): "Devon's version: if a human cannot read your schema and an agent cannot read your prose, you have two failures, not one improvement."

**Block 7. Words you can drop in standups (5 terms).** `reader` (new entry; the two-reader frame), `agent` (existing), `endpoint` (existing), `contract` (existing), `response shape` (existing). Each appears as a glossary chip with a "Use this when you mean…" formulation.

**Block 8. AI co-pilot tip (~210 words).** Tool: **Claude** (rotation: GPT was M1L1, the pilot used Claude; Claude lands here again since the pool is small in early lessons). Situation: you have a draft doc page and want to know if it serves both readers. Prompt: paste the draft, ask Claude to read it twice — once as a developer needing to make a working call, once as an agent needing to parse a response — and report what each reader missed. What to watch for: Claude will sometimes paper over gaps politely; press it for specific lines that confused which reader.

**Block 9. Before you go.** Self-check: "Where does the parameter types information for `GET /books` come from? Who knows what a 200 response actually contains?" The reader's silent answer bridges to M1L4's opener.

**Block 10. Next week at Greenfield plus signoff.** Teaser: "Next week, Maya sits down with the codebase. The conversation is one-sided. The codebase has opinions." Then `{% include signoff.html %}`.

---

## Section 2. Visuals and code samples.

**Mermaid diagram (block 3, 4 nodes, well under the 10-node cap).**

```liquid
{% capture mermaid_src %}
sequenceDiagram
  participant Doc as One doc page
  participant Human as Human reader
  participant Agent as Agent reader
  Doc->>Human: prose, quickstart, copy paste
  Doc->>Agent: schema, types, error codes
{% endcapture %}
{% include mermaid.html content=mermaid_src alt="One doc page sends prose, a quickstart and a copy-paste sample to a human reader, and schema, types, and error codes to an agent reader." %}
```

The diagram visualizes the central argument as a one-source-two-extractions shape. Same doc; two readers; different things needed.

**In-line code samples (block 4).**

A skeleton of the `GET /books` reference page that the lesson walks through. Mocked at the level of a real but minimal reference entry, not a full OpenAPI document.

```markdown
### GET /books
Search the Greenfield catalog.

`curl https://api.greenfield.lib/v1/books?q=ursula`

**Query parameters**
- `q` (string, required). Search term.

**Response 200**
{
  "results": [
    { "id": "bk_184932", "title": "...", "available_branches": ["branch_north"] }
  ],
  "total": 1
}

**Errors**
- `401` Unauthorized. Missing or invalid token.
- `429` Rate limited. Slow down.
```

Both readers find what they need in this skeleton: a human gets the curl line and the English error names; an agent gets parameter types, the response schema shape, and integer-coded errors.

**Interactive SVG (block 4): `assets/svg/whatwritersdo/main.svg`.**

Pattern: `data-svg-pattern="toggle"` (one of the four central framework patterns from parent spec Section 6). Canvas 800×320 with `preserveAspectRatio="xMidYMid meet"`. One mocked doc page in the centre with all the elements above (heading, curl line, parameter list, response sample, error list). Around it, two annotation layers that toggle:

- HUMAN state. Copper highlights and short annotations around: the one-line summary, the curl line, the English error names.
- AGENT state. Sage highlights and short annotations around: the parameter type declaration, the response shape, the integer error codes.

A toggle control in the top-right reads `Read as: HUMAN / AGENT`. Tapping or pressing Enter flips which annotations are visible. Default state: HUMAN. Reduced motion respected (no fade animation when user opts out).

Tooltip text on each highlight (one sentence each), pre-rendered into the SVG (no JS-driven floating tooltip; the toggle pattern simply swaps two annotation groups). Avoids the M1L1 tooltip-positioning bug entirely.

Accessibility:
- Toggle target: `<g tabindex="0" role="switch" aria-checked="false">`, flips `aria-checked` on activation.
- Annotations are real text inside the SVG, not images.
- Color is never the only carrier of information; each highlight also has a label.

Style: strokes 1.5 to 2px, corners rounded 4px, token palette only (ink for text, cream for card background, copper for human highlights, sage for agent highlights). No drop shadows. Target weight under 12 KB raw.

**Word count and reading time check.** Block estimates: B1 ~120, B2 29, B3 ~300, B4 ~500, B5 ~150, B6 ~165, B7 ~200, B8 ~210, B9 ~30, B10 ~25. Total ~1,729 words. Reading time per parent spec Section 2 v0.4: `1729/150 + 3 = 14.5 minutes`. Inside the 12-18 minute target. Frontmatter `reading_time: 14`.

---

## Section 3. Frontmatter, glossary, bible.

**Frontmatter for `_docs/whatwritersdo.md` (lean, matches the pilot and M1L1):**

```yaml
---
title: What an API writer does in 2026
permalink: /whatwritersdo.html
module: 1
lesson: 3
slug: whatwritersdo
reading_time: 14
description: An API writer in 2026 writes for two readers, humans and agents. What that means for the same doc page, and an AI prompt that reads a draft twice.
previous_page:
  url: /whatisanapi.html
  title: What an API actually is
next_page:
  url: /informationgathering.html
  title: Information gathering and interviewing the codebase
---
```

`previous_page` IS included (unlike M1L1, this is not the first lesson). Stripped from legacy frontmatter (no longer needed under the new layout): `keywords`, `image`, `last_modified_at`, `author_*`, `schema_markup`, `speakable*`, `level`, `summary`. OG images are generated by `scripts/generate-og.mjs`; `schema_markup` and `speakable` behaviors are layout defaults.

**Glossary additions to `_data/glossary.yml`.** Four of the five terms used in block 7 already exist: `agent`, `endpoint`, `contract`, `response shape`. Only `reader` is new:

```yaml
- term: "reader"
  definition: "The party consuming a piece of documentation. In 2026, a reader is either a human (a developer, support engineer, or another writer) or an agent (software trying to figure out how to call the API: code generators, AI assistants, tool-use loops). A page that serves only one is leaving the other behind."
  link: "#"
```

The definition is intentionally short and frame-establishing; the lesson body carries the deeper teaching.

**Greenfield bible updates at `docs/superpowers/greenfield-bible.md`.**

Append to **Timeline** section, after the existing M1L2 entry:

```markdown
## Module 1, Lesson 3. Priya shows Maya the two graphs.
Story date: two to three days after Sam's visit (late in the same story week as the pilot). Mid-week, mid-morning, the Greenfield conference room.
Event: Priya pulls Maya into the conference room and shows her two stacked traffic graphs for the public Greenfield website. One line for human traffic, one for agent traffic. The agent line is rising. The conversation establishes the two-reader frame that runs through the rest of Module 1 and into Module 7.
Characters present: Maya, Priya. Devon mentioned in Priya's recall.
New API entities introduced: none. The lesson uses a mocked GET /books reference page as a teaching artifact; the real API is still upcoming.
Web entities introduced: agent traffic to the Greenfield public website is something the team watches. Two stacked graphs in Priya's analytics dashboard.
New glossary terms introduced: reader.
Quote: (Priya's earned joke, to be drafted; analytics-flavored, dry.)
```

Append to **Locked details** section:

```markdown
- Greenfield watches agent traffic to the public website as a tracked signal. Lives in Priya's dashboard alongside the human-traffic graph.
- Priya's first on-screen scene is in M1L3. Before that she is mentioned only in Devon's line in M1L1.
- Late in story week 1 (counting M1L1 as week 0, M1L2 pilot as early week 1) is the M1L3 conference-room scene. The pilot and M1L3 share the same week; M1L3 follows the pilot by two or three days.
```

Add to **Cast** (extend Priya's existing entry; do not rewrite from scratch):

```markdown
**Priya.** Product manager. She/her. Owns the analytics seat. The one who notices traffic patterns first. First on-screen in Module 1 Lesson 3, showing Maya the agent-traffic graph.
```

**Legacy assets and includes to delete in the same PR** (after grep-confirming no other lesson references each one):

- `assets/images/api-city-map.svg` (used only by this lesson per grep).
- `assets/images/tech-writer-og.svg` and `assets/images/technical-writer.svg` if grep confirms they are referenced only by this lesson's legacy frontmatter (`image`, `author_image`). Both fields are dropped under the lean frontmatter, so the files become orphans.
- `assets/images/gaurav.svg` is shared across lessons. DO NOT delete.
- Lesson-specific data files in `_data/` (if any): inspect and `grep -r` first.

All inline `<script>` and `<style>` blocks plus references to legacy includes (`enhanced_note.html`, `optimized-image.html`, `faq-section.html`, `key_takeaways.html`, `quiz.html`, `related_resources.html`) get stripped from `_docs/whatwritersdo.md`. The legacy includes themselves remain in `_includes/` because other lessons still use them.

---

## Section 4. Sequencing and PR plan.

**Prerequisites — verify present in the repo before starting:**

- `_includes/signoff.html`, `_includes/callout.html` (with `exercise` and `warning` variants), `_includes/mermaid.html`, `_includes/interactive-svg.html`, `_includes/ad-slot.html`, `_includes/glossary-term.html`.
- `assets/js/interactive-svg.js` supports the `toggle` pattern (used by the pilot already).
- `assets/js/mermaid-init.js`.
- `scripts/voice-check.rb`.
- `docs/superpowers/greenfield-bible.md`.
- `_data/glossary.yml` already contains `agent`, `endpoint`, `contract`, `response shape`.

**Carry-over from `rewrite/journey` (M1L1 PR — pending merge).** The journey PR ships several infrastructure fixes documented in CLAUDE.md → Infrastructure pitfalls. **Decision: M1L3 branches off master and does not depend on `rewrite/journey`.** That means:
- The callout-markdownify bug affects this lesson's exercise (block 5) and warning (block 6) callouts. **Workaround: author both callout bodies in HTML, not markdown.** Use `<p>`, `<strong>`, `<ul><li>`, `<pre><code>` tags. The captured body string is passed through to the include and renders correctly as HTML.
- The mermaid-on-slate background remains a known visual issue until the journey PR merges. Ship anyway.
- The interactive-SVG tooltip-clipping bug does NOT affect M1L3 because the lesson uses the `toggle` pattern, not `hover-tooltip`. Toggle has no floating-div tooltip; annotations live as in-SVG `<g>` groups that toggle visibility.
- The privacy-link bug is a site-wide chrome issue, not M1L3-specific.

**Build order (12 steps, dependency-ordered):**

1. **Wait for or merge `rewrite/journey`.** If already merged, skip. If not, decide: ship M1L3 on top of master and rebase later, or branch off `rewrite/journey` and ship dependent. Author preference: branch off master, rebase if needed.
2. **Branch `rewrite/whatwritersdo`** off master.
3. **Glossary additions** to `_data/glossary.yml` — append only `reader`. No dependencies.
4. **Greenfield bible additions** to `docs/superpowers/greenfield-bible.md`. No dependencies.
5. **Frontmatter rewrite** of `_docs/whatwritersdo.md` — replace top ~35 lines with the lean 14-field frontmatter from Section 3. No dependencies.
6. **Update `_data/modules.yml`** — change `whatwritersdo.html` entry from `reading: "8 min"` (legacy) to `reading: "14 min"`. No dependencies.
7. **Prose draft** of blocks in order 3 → 4 → 5 → 6 → 1 → 2 → 7 → 8 → 9 → 10 (substance before opener). Block 4 uses `<!-- SVG: toggle, 2 states -->` placeholder until step 9. Two AdSense inserts in pilot positions (between blocks 2-3 and 8-9). Depends on step 5.
8. **Mermaid in block 3** using the 4-node sequence diagram from Section 2. Depends on step 7.
9. **Interactive SVG** at `assets/svg/whatwritersdo/main.svg` — `toggle` pattern, two states (HUMAN/AGENT), pre-rendered annotation groups, ≤12 KB target weight. Can be drafted in parallel with step 7 once block 4 wording is settled.
10. **Legacy cleanup**: grep-confirm and delete legacy assets identified in Section 3. Strip all inline `<script>` and `<style>` blocks plus legacy include references from `_docs/whatwritersdo.md`.
11. **Voice pass**: `ruby scripts/voice-check.rb _docs/whatwritersdo.md` → fix every hit. Read out loud. Watch specifically for hyphenated compound modifiers ("two-reader", "machine-readable", "copy-paste") — rewrite as plain text.
12. **Local build verify**: `npm run build:css && bundle exec jekyll build` clean. Open `_site/whatwritersdo.html` at desktop and mobile widths. Tap the SVG toggle; both states render correctly.

**PR details.**

- **Branch:** `rewrite/whatwritersdo`
- **Title:** `Rewrite: What an API writer does in 2026`
- **Description:** Definition of Done checklist from parent spec Section 4. Plus a paragraph covering: new glossary term `reader`, new bible Timeline entry, Priya's first on-screen scene, agent-traffic-graph universe addition, and (if applicable) any dependency on the `rewrite/journey` PR.

**Pre-merge gates (full list from parent spec Section 4):**

- `bundle exec jekyll build` exits zero.
- `npm run build:css` exits zero.
- `ruby scripts/voice-check.rb _docs/whatwritersdo.md` exits zero.
- No Liquid errors and no missing-include warnings.
- HTMLProofer clean on the new lesson with `--swap-urls '^/apidocumentation:'` (see CLAUDE.md infrastructure pitfall 7).
- Glossary chip terms all resolve.
- Frontmatter complete.
- `module: 1` / `lesson: 3` reconcile with `_data/modules.yml`.

**Human review gate.** Gaurav reads end-to-end at desktop and mobile breakpoints. Earned joke (Priya's) thumbs up or thumbs down. The two-reader frame either lands or feels overstated; if overstated, soften block 3's claim before merge.

**Post-merge tracking (non-blocking under curricular-order phasing):**

- 15-minute retro at `docs/superpowers/specs/retros/whatwritersdo.md`. Three notes max.
- GA4 engagement against the legacy 30-day baseline for `/whatwritersdo.html` continues but does not block subsequent lesson rewrites.

**Time estimate.** 10-14 hours of writer time across 2-3 working days. SVG is the bottleneck (toggle SVG with two annotation layers is slightly more work than M1L1's hover-tooltip SVG was).

---

## Section 5. Risks.

Three severity tiers.

**High — must verify during build:**

1. **Spec ordering vs `rewrite/journey` dependency.** If M1L3 branches off master before journey merges, the M1L3 lesson will not have the callout-markdownify or mermaid-CSS fixes. Mitigation: author callout body in HTML (workaround) or wait for the journey PR to merge before starting block 5's exercise callout. Decision deferred to build time.

2. **Two-reader frame over-claim.** The frame is presented as a useful lens, not a hard formula. Block 3 must say "two readers in the practical sense" rather than "exactly two and only two". Risk if not handled: the lesson reads as polemic. Mitigation: voice pass watches for absolute claims.

**Medium — handle in design:**

3. **Priya's voice on debut.** This is her first on-screen scene. Her dialog must feel distinct from Devon's. Locked: analytics-flavored, observational, slightly wry. Less dry than Devon, less narration than Maya. The earned joke is Priya's and must land. Mitigation: draft the joke first; re-read out loud; cut if it falls flat.

4. **SVG annotation layers may clutter.** Two annotation layers on the same doc page mock could make the SVG visually busy in either state. Mitigation: keep each layer to 3-4 annotations max; use minimal lines and single-sentence labels; rely on the toggle pattern to keep only one set visible at a time.

5. **Mermaid sequenceDiagram with thought bubbles.** Mermaid does not have a native thought-bubble shape; the diagram described uses messages, not bubbles. Mitigation: drop the "thought bubble" framing in implementation; just use message arrows with the descriptive labels in the message text. The diagram still teaches the rule.

**Low — track and move on:**

6. **AI tool rotation collision.** Claude was the pilot's tool; using Claude again in M1L3 is repetition. Mitigation: lock now (Claude makes sense for this lesson's prompt content); document the choice for the retro; widen rotation in M1L4 onward.

7. **`reader` term may collide with later usage.** If later lessons need a different framing of "reader" (e.g., a generic "audience" term), the M1L3 entry may need refinement. Track in bible's Open universe questions.

8. **Voice linter on hyphens.** "Two-reader", "machine-readable", "copy-paste", "side-by-side" — all common in this lesson's domain and all banned in body prose. Mitigation: rewrite to "two readers" (article-noun), "machine readable" (no hyphen, allowed only because it's a multi-word adjective in prose), "copy paste" (or in code only), "side by side" (no hyphen).

9. **Legacy file has 438 lines of bespoke content.** Full rewrite drops most of it. Risk: subtle SEO links or referenced concepts get lost. Mitigation: grep for inbound links to `whatwritersdo.html` from other lessons before deleting any content unique to the legacy version.

---

## Locked decisions log.

- **Central argument.** Two-reader rule: humans and agents. (Locked 2026-05-21.)
- **Opening scene.** Priya in the conference room with two stacked traffic graphs. Priya's first on-screen scene. (Locked 2026-05-21.)
- **Block 4 deep dive shape.** One doc page (mocked Greenfield `GET /books` reference), two reads side by side, surfaced via toggle SVG. (Locked 2026-05-21.)
- **Block 8 AI tool.** Claude. Repeats from the pilot's tool because the pool is small in early lessons; rotation widens in M1L4. (Locked 2026-05-21.)
- **Frontmatter approach.** Lean field set matching the pilot. `previous_page` included (M1L3 is not the first lesson). (Locked 2026-05-21.)
- **Branch name.** `rewrite/whatwritersdo`. (Locked 2026-05-21.)
- **Greenfield universe additions.** Public-website agent traffic is a tracked signal in Priya's dashboard. Priya's role as the pattern-spotter is now on-screen canonical. (Locked 2026-05-21.)
- **SVG pattern.** `toggle` (two states: HUMAN, AGENT). Sidesteps the M1L1 hover-tooltip-clipping bug by design. (Locked 2026-05-21.)
- **Glossary additions.** Only one new entry: `reader`. Existing entries (`agent`, `endpoint`, `contract`, `response shape`) reused. (Locked 2026-05-21.)

---
