# Module 1 Lesson 1 ("The internet, the short version"). Design.

**Status.** v0.2. All five sections locked; ready for user review and writing-plans handoff.
**Owner.** Gaurav Trivedi.
**Author of this spec.** Claude (drafting), Gaurav (decisions).
**Last updated.** 2026-05-20.

Per-lesson design spec for rewriting `_docs/journey.md` (permalink `/howinternetworks.html`) as Module 1 Lesson 1 in Maya's voice. Implementation plan will follow at `docs/superpowers/plans/2026-05-20-m1l1-journey-plan.md`.

**Parent spec.** `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md` (Phase 2 framework — voice, 10-block template, DoD, visual pipeline).

**Sister references.**

- `docs/superpowers/specs/2026-05-20-toc-finalization-design.md` (canonical TOC).
- Pilot lesson (the voice exemplar): `_docs/whatisanapi.md` (Module 1 Lesson 2).
- Universe canon: `docs/superpowers/greenfield-bible.md`.

---

## Section 1. The ten-block outline.

Step 2 artifact per parent spec Section 5. If any block lacks a clear one-line answer, the lesson is not ready to write.

**Block 1. Diary opener.** Maya in the back office at Greenfield with Devon on a Tuesday afternoon. Devon refreshes the staff catalog page. Three books have been borrowed since lunch. The page already knows. Devon's dry one-liner ("It used to be paper. I miss the paper. Don't tell Priya.") lands as the earned joke. Maya admits she has ten years of API documentation work behind her and had never thought to ask the question that came to her at that moment. The teaser sentence names the apprentice's stake.

**Block 2. Today you will leave with (29 words, under the 30-word cap).** Three bullets: (1) request, response, and status code in plain English; (2) the atomic unit, how to describe one interaction in writing; (3) an AI prompt that turns a `curl -v` dump into labels.

**Block 3. What just happened (~300 words plus one Mermaid sequence diagram).** Defines request, response, and status code. Adds the quiet point that the caller is software (sometimes a browser, sometimes a script, sometimes a phone app), which sets up Atlas (M1L5) and the agent thread (M7) without naming them in this lesson. Thought-checkpoint sentence: "look at the diagram. Which arrow is the request?"

**Block 4. How we document it (~500 words plus one interactive SVG).** Teaches the atomic unit of API documentation: one labeled request plus one labeled response. Concrete written examples in HTTP. Maya's opinion: lead with the path. Method, headers, and status code are introduced as named-but-not-explained details that support the path; full treatment of methods is deferred to Module 2 Lesson 1.

**Block 5. Try it on Greenfield (~130 words, exercise callout).** Five-minute terminal task. Reader runs `curl -v` against any public API (default suggestion `https://api.github.com`, since Greenfield's API does not exist yet at this point in the story). Finds the `>` (sent) and `< HTTP/` (received) lines. Writes one sentence describing the atomic unit.

**Block 6. The trap (~165 words, warning callout).** Devon delivers: "When you say 'I visited a website', what you actually did was send a couple hundred requests. The illusion of one transaction is the browser's job, not the internet's." Sets up debugging mindset for later modules. Voice constraint: a single comma-separated sentence enumerates the per-page-load requests (collapsing the original draft's six consecutive sentence fragments to stay under the lesson's three-fragment cap).

**Block 7. Words you can drop in standups (5 terms).** `caller`, `request`, `response`, `status code`, `server`. Each appears as a glossary chip with a "Use this when you mean..." formulation.

**Block 8. AI co-pilot tip (~210 words).** Tool: **GPT** (kicks off the rotation since the pilot used Claude). Situation: you ran `curl -v` and the output is a wall of text. Prompt: "Below is the verbose output of a curl command. Label every line as either request, response, or metadata. For each line, in one sentence, say what the line is telling me. Do not summarize. Label line by line." What to watch for: GPT collapses repetitive lines, sometimes adds speculation. Trust only lines actually in your output.

**Block 9. Before you go.** Self-check: "Suppose Greenfield wanted to make its catalog available the way GitHub does. Where would the conversation start?" The reader's silent answer bridges directly to the pilot's opening line (Sam: "you know you could expose this as an API, right?").

**Block 10. Next week at Greenfield plus signoff.** Teaser: "By next Tuesday, an old friend of Devon's stops by the branch with a returned book and a question." Then `{% include signoff.html %}`.

---

## Section 2. Visuals and code samples.

**Mermaid diagram (block 3, 4 nodes, well under the 10-node cap).**

```liquid
{% capture mermaid_src %}
sequenceDiagram
  participant Browser
  participant Greenfield as Greenfield catalog server
  Browser->>Greenfield: GET /catalog
  Greenfield-->>Browser: 200 OK with HTML
{% endcapture %}
{% include mermaid.html content=mermaid_src alt="The browser sends a GET request for the catalog. Greenfield returns a 200 OK response with HTML." %}
```

The diagram visualizes what happens under the hood of Devon's catalog refresh in block 1 — same event, different abstraction level. Internal coherence is the design point.

**In-line code samples (block 4).**

Request:
```http
GET /catalog HTTP/1.1
Host: greenfield.lib
```

Response:
```http
HTTP/1.1 200 OK
Content-Type: text/html

<html>...</html>
```

Both are real, copy-pasteable HTTP. The blank line between response headers and body is HTTP convention; we do not explain it in Lesson 1, but it is correct on the page.

**Interactive SVG (block 4): `assets/svg/journey/main.svg`.**

Pattern: `data-svg-pattern="hover-tooltip"` (one of the four central framework patterns from parent spec Section 6). Canvas 800×500 with `preserveAspectRatio="xMidYMid meet"`. Two cards side by side (REQUEST left, RESPONSE right) with a thin directional arrow connecting them.

Seven hover-or-focus targets and their tooltip text:

| Target | Tooltip |
|---|---|
| `GET` | The HTTP method. The verb. We will cover methods properly in Module 2. |
| `/catalog` | The path. What the caller is asking about. Lesson 1's main idea. |
| `HTTP/1.1` | The protocol and version. The shape of the conversation, agreed once and reused. |
| `Host: greenfield.lib` | Tells the server which site you mean, in case one machine hosts many. |
| `200 OK` | The status code. Three digits and a short phrase. 200 means it worked. |
| `Content-Type: text/html` | A header naming the kind of body coming back. HTML in this case. |
| `<html>...</html>` | The body. What the caller actually wanted. HTML, JSON, an image. Anything. |

Accessibility (per parent spec Section 6):

- Tab order: method, path, protocol, host, status, content-type, body.
- Each target is `<g tabindex="0">` with `role="button"` and `aria-label` matching the tooltip text.
- 2px copper-token focus ring; `prefers-reduced-motion` respected (no fade animation when user opts out).
- Static fallback: with JS off, all seven labels render as small inline annotations under each target. Reader still learns the parts without interaction.
- Colors carry no information alone; every part is also positioned and labeled.

Style: strokes 1.5 to 2px, corners rounded 4px, token palette only (ink for text, cream for card background, copper for focus and arrow, sage for response card accent). No drop shadows, no gradients. Target weight under 12 KB raw (well below the 30 KB ceiling).

**Word count and reading time check.** Block estimates: B1 ~120, B2 29, B3 ~300, B4 ~500, B5 ~130, B6 ~165, B7 ~200, B8 ~210, B9 ~30, B10 ~25. Total ~1,709 words. Reading time per parent spec Section 2 v0.4: `1709/150 + 3 = 14.4 minutes`. Inside the 12-18 minute target. Frontmatter `reading_time: 14`.

---

## Section 3. Frontmatter, glossary, bible.

**Frontmatter for `_docs/journey.md` (lean, matches the pilot):**

```yaml
---
title: The internet, the short version
permalink: /howinternetworks.html
module: 1
lesson: 1
slug: journey
reading_time: 14
description: The smallest useful unit of API documentation. Request, response, status code, and how to describe one interaction in writing.
next_page:
  url: /whatisanapi.html
  title: What an API actually is
---
```

`previous_page` is omitted. M1L1 is the first lesson and the legacy `previous_page.url: /documentation.html` is dangling (no `_docs/documentation.md` source file exists). Implementation note: verify the layout renders cleanly without `previous_page`. If it does not, fall back to `previous_page: { url: /, title: "Course home" }`.

Stripped from legacy frontmatter (no longer needed under the new layout): `keywords`, `image`, `last_modified_at`, `author_name`, `author_description`, `author_expertise`, `author_image`, `schema_markup`, `speakable`, `speakable_selectors`, `level`. OG images are generated by `scripts/generate-og.mjs`; `schema_markup` and `speakable` behaviors are layout defaults.

**Glossary additions to `_data/glossary.yml`.** Critical: three of the five terms used in block 7 — `request`, `response`, `status code` — already exist in the glossary from pilot work. Their definitions are tight and already in production. **Do not modify them.** Only `caller` and `server` are new entries, and they match the existing file structure (quoted strings, `link: "#"` placeholder, no `see_also`):

```yaml
- term: "caller"
  definition: "The piece of software that sends a request. A browser, a phone app, a script, or another server can all be callers. Sometimes called the client."
  link: "#"
- term: "server"
  definition: "The piece of software that receives a request and decides what to send back. Sits at a URL the caller knows."
  link: "#"
```

The parent spec's prescribed `see_also` field is aspirational; the actual glossary file uses `link: "#"` and the pilot ships fine without `see_also`. Evolving all glossary entries to add `see_also` is a separate sweep, not Lesson 1's job.

**Greenfield bible updates at `docs/superpowers/greenfield-bible.md`.** The file already exists with full Cast (Maya, Devon, Priya, Atlas, apprentice), one Timeline entry (M1L2 Sam suggests an API, from the pilot), API entities (base URL, resources, GET /books schema), Locked details (sample borrower `lina.varga`, book id `bk_184932`, branch `branch_north`, Sam's character info), and Open universe questions.

Append to **Timeline** section, before the existing M1L2 entry (Lesson 1 is earlier in story time):

```markdown
## Module 1, Lesson 1. Devon refreshes the catalog.
Story date: the week before Sam's visit. Tuesday afternoon at the branch.
Event: Maya sits in the back office with Devon. He refreshes the staff catalog page; three books have been borrowed since lunch; the page already knows. The question "how did the page know" opens the course.
Characters present: Maya, Devon. Priya mentioned in Devon's offhand line.
New API entities introduced: none. Greenfield's API does not exist yet.
Web entities introduced: Greenfield public website at `greenfield.lib`. Catalog page at `/catalog`.
New glossary terms introduced: caller, server. (request, response, status code already exist from pilot work.)
Quote: "It used to be paper. I miss the paper. Don't tell Priya." (Devon, to Maya, back office, Tuesday afternoon.)
```

Append to **Locked details** section (do not duplicate Sam — already present):

```markdown
- Greenfield public website: `greenfield.lib` (separate from the future `api.greenfield.lib/v1`). Catalog page at `/catalog`.
- Devon's recurring quirk: misses the paper card system, says so periodically.
- Story week 0: the Tuesday afternoon Devon refreshed the catalog (Lesson 1). Story week 1: Sam's visit (Lesson 2 pilot).
```

No Cast updates needed — Maya and Devon are already there with sufficient detail.

**Legacy assets and includes to delete in the same PR** (after grep-confirming no other lesson references each one):

- `assets/gif/commpone.gif`, `assets/gif/commptwo.gif`
- `assets/images/authentication-process.svg`, `assets/images/api-translator.svg`
- `_data/journey_questions.yml`, `_data/web_communication_faqs.yml`

All inline `<script>` and `<style>` blocks plus references to legacy includes (`optimized-image.html`, `faq-section.html`, `key_takeaways.html`, `quiz.html`, `related_resources.html`) get stripped from `_docs/journey.md`. The legacy includes themselves remain in `_includes/` because other lessons still use them (Phase 3 removes them course-wide).

**Pilot retrofit (follow-up, separate PR).** Once Lesson 1 ships and adds `caller` and `server` to glossary, the pilot's existing prose can be retouched to wrap `caller`, `request`, and `response` in `{% include glossary-term.html %}` chips. Five-minute Edit pass, not bundled into Lesson 1's PR.

---

## Section 4. Sequencing and PR plan.

**Prerequisites — all verified present in the repo (no work needed):**

- `_includes/signoff.html`, `_includes/callout.html` (with `exercise` variant: label "Try this", copper accent), `_includes/mermaid.html`, `_includes/interactive-svg.html`, `_includes/ad-slot.html`.
- `assets/js/interactive-svg.js` supports all four patterns: `click-step`, `hover-tooltip`, `toggle`, `slider`.
- `assets/js/mermaid-init.js`.
- `scripts/voice-check.rb`.
- `docs/superpowers/greenfield-bible.md`.
- `_data/glossary.yml` already contains `request`, `response`, `status code` (from pilot work).
- 0 TODO-interactive SVGs currently outstanding (3-cap headroom unused).

**Build order (12 steps, dependency-ordered):**

1. **Pull latest `master`.** Sync local clone.
2. **Branch `rewrite/journey`** off master. Matches the pilot's `rewrite/<slug>` pattern using the source-filename slug. Optional worktree at `../apidocumentation-journey`.
3. **Glossary additions** to `_data/glossary.yml` — append only `caller` and `server` entries. Do NOT touch `request`, `response`, `status code`. No dependencies.
4. **Greenfield bible additions** to `docs/superpowers/greenfield-bible.md` — Timeline entry before the existing M1L2 entry, three new Locked details. No dependencies.
5. **Frontmatter rewrite** of `_docs/journey.md` — replace top ~35 lines with the lean 10-field frontmatter from Section 3. No dependencies.
6. **Update `_data/modules.yml`** — change journey entry from `reading: "10 min"` to `reading: "14 min"` to match the new `reading_time: 14`. (Note: the pilot's modules.yml entry says "10 min" while the pilot frontmatter is 14, so the pilot has the same stale-reading issue. Out of scope to fix here; track as separate sweep.) No dependencies.
7. **Prose draft** of blocks in order 3 → 4 → 5 → 6 → 1 → 2 → 7 → 8 → 9 → 10 (substance before opener). Block 4 uses `<!-- SVG: 7 hover-tooltip targets -->` as placeholder until step 9. Two AdSense inserts:
   - Between blocks 2 and 3: `{% include ad-slot.html slot="2222222222" format="auto" %}`
   - Between blocks 8 and 9: `{% include ad-slot.html slot="3333333333" format="auto" %}`

   (Matches pilot's slot IDs. Parent spec Section 4 prescribes semantic IDs `lesson-mid-1` / `lesson-mid-2`; the pilot does not use these. Treated as spec/reality discrepancy — see Section 5.) Depends on step 5.
8. **Mermaid in block 3** using the 4-node sequence diagram from Section 2 of this spec. Depends on step 7.
9. **Patch `assets/js/interactive-svg.js` `initHoverTooltip`** for touch support. Add a `click` toggle handler inside the targets loop plus an outside-click dismiss handler. See Risk #1 in Section 5 for the code sketch and rationale. Test on Chrome dev-tools touch-emulation and at least one real touch device. ~15-30 minutes. Prerequisite for Step 10.
10. **Interactive SVG** at `assets/svg/journey/main.svg` — `hover-tooltip` pattern, 7 targets, ≤12 KB target weight. Can be drafted in parallel with step 7 once block 4 wording is settled. Budget: half a day (3-5 hours). If exceeded, ship a static SVG with `<!-- TODO: interactive -->` comment (within the 3-outstanding cap).
11. **Legacy cleanup**: grep-confirm and delete `assets/gif/commpone.gif`, `assets/gif/commptwo.gif`, `assets/images/authentication-process.svg`, `assets/images/api-translator.svg`, `_data/journey_questions.yml`, `_data/web_communication_faqs.yml`. Strip all inline `<script>` and `<style>` blocks plus legacy include references from `_docs/journey.md` (`optimized-image.html`, `faq-section.html`, `key_takeaways.html`, `quiz.html`, `related_resources.html`).
12. **Voice pass**: `ruby scripts/voice-check.rb _docs/journey.md` → fix every hit. Read out loud, fix stumbles, re-read silently with "would Maya write this".
13. **Local build verify**: `npm run build:css && bundle exec jekyll build` clean. Open `_site/howinternetworks.html` in the browser at desktop and mobile widths.

**PR details.**

- **Branch:** `rewrite/journey`
- **Title:** `Rewrite: The internet, the short version`
- **Description:** Definition of Done checklist from parent spec Section 4 (all seven categories: Structure, Voice, Greenfield consistency, SEO/revenue, Accessibility, Technical/build, Human review), ticked. Plus a paragraph covering: new glossary terms (`caller`, `server`), new bible Timeline entry, new website canon (`greenfield.lib`), `previous_page` omission, `_data/modules.yml` reading-time update, and the spec/pilot ad-slot-ID discrepancy (matched pilot).

**Pre-merge gates (full list from parent spec Section 4):**

- `bundle exec jekyll build` exits zero.
- `npm run build:css` exits zero.
- `ruby scripts/voice-check.rb _docs/journey.md` exits zero.
- No Liquid errors and no missing-include warnings.
- HTMLProofer clean on the new lesson.
- Glossary chip terms all resolve (every term wrapped in `{% include glossary-term.html term="..." %}` exists in `_data/glossary.yml`).
- Frontmatter complete: `title`, `permalink`, `module`, `lesson`, `slug`, `reading_time`, `description`, `next_page`. `previous_page` deliberately omitted. `redirect_from` not needed (permalink unchanged).
- `module: 1` and `lesson: 1` reconcile with `_data/modules.yml` position. (Already correct in legacy frontmatter — no fix needed.)
- No `placeholder: true` flag to remove (journey is an existing lesson, not a new slot).

**Human review gate.** Gaurav reads end-to-end at desktop and mobile breakpoints. Earned joke thumbs up or thumbs down. DoD checklist ticked. Merge.

**Post-merge tracking (non-blocking under curricular-order phasing):**

- 15-minute retro at `docs/superpowers/specs/retros/journey.md`. Three notes max: what worked, what to change in parent spec, what to change in workflow.
- GA4 engagement tracking against the legacy 30-day baseline for `/howinternetworks.html` continues, but does NOT block subsequent lesson rewrites (per the 2026-05-20 phasing decision in CLAUDE.md).
- Pilot retrofit (separate small PR after Lesson 1 merges): wrap `caller`, `request`, `response` in glossary chips in `_docs/whatisanapi.md`.

**Build order is now 13 steps** (was 12 in v0.1; Step 9 inserted for the framework patch per Risk #1 resolution).

**Time estimate.** 10-14 hours of writer time across 2-3 working days. SVG (step 10) is the bottleneck.

---

## Section 5. Risks.

Three severity tiers. High-risk items get verified before or during build; medium items are mitigated in the design; low items are tracked and not blocking.

**High — resolved during this brainstorm or must verify during build:**

1. **`hover-tooltip` on touch devices.** **RESOLVED.** Reading `assets/js/interactive-svg.js:71-97` shows `initHoverTooltip` registers only `mouseenter` / `mouseleave` / `focus` / `blur`. Touch tap on `<g>` elements does not reliably synthesize mouseenter on iOS/Android, so the SVG's labels would be invisible to roughly half of likely readers. **Fix:** small framework patch (~15-30 min) — add a `click` toggle handler inside `initHoverTooltip`'s targets loop, plus an outside-click dismiss handler. On desktop, mouseenter fires first so behavior is unchanged; on touch, the click event handles tap-to-reveal. Patch lands in the same PR as Lesson 1 (build order Step 9a). Benefits every future lesson using this pattern.

2. **`previous_page` omission and the default layout.** If `_layouts/default.html` does `{{ page.previous_page.url }}` unconditionally instead of `{% if page.previous_page %}`, the page renders a broken link or fails. **Mitigation:** grep the layout for `previous_page` handling during Step 5 of build order. If unsafe, fall back to `previous_page: { url: /, title: "Course home" }`.

3. **Legacy data files referenced by other lessons.** Deleting `_data/journey_questions.yml` and `_data/web_communication_faqs.yml` could break other lessons. **Mitigation:** `grep -r "journey_questions\|web_communication_faqs" _docs/ _includes/ _layouts/` before deletion. If any other lesson uses them, keep the data files and only strip the include calls from `_docs/journey.md`.

**Medium — handle in design or note for human review:**

4. **AdSense slot-ID discrepancy.** Pilot uses numeric `"2222222222"` / `"3333333333"`; parent spec prescribes semantic `"lesson-mid-1"` / `"lesson-mid-2"`. Lesson 1 matches the pilot. Open question for human review: are the numeric IDs real configured AdSense slots, or placeholders inherited unchanged across the course? If placeholders, this is a course-wide AdSense hygiene task, not Lesson 1's job. Flag in the PR description.

5. **SVG file-size blow-out.** Seven hover targets with tooltips on 800×500 can balloon if drawn naively. **Mitigation:** use `<symbol>` plus `<use>` for repeated visual elements; consolidate text styling into one inline `<style>` block; minify on save. Target 12 KB raw, ceiling 30 KB.

6. **GitHub API rate-limit on the block 5 exercise.** Unauthenticated `curl https://api.github.com` is capped at 60 per hour per IP. A reader who runs it repeatedly hits a 403. **Mitigation:** the exercise text already says "pick any public API"; add one sentence to block 5: "if you see `403 rate limit exceeded`, switch to another public API and try again."

7. **Story week numbering brittleness.** Bible currently has "week 0" (Lesson 1) and "week 1" (Lesson 2 pilot). As the course extends to Module 8 (story month 18 plus), numeric weeks do not scale. **Mitigation:** numeric weeks live only in the bible's "Story date" metadata field. Lesson prose references events by name ("the week before Sam's visit", "after Devon shipped the first endpoint"), never week numbers. Already the pattern in the pilot.

**Low — track and move on:**

8. **`caller` versus `client` glossary collision.** If a later lesson adds "client" as its own glossary entry, the `caller` entry's "sometimes called the client" wording needs touch-up. Track in bible's Open universe questions.

9. **Maya's "ten years" tenure locked.** Lesson 1 prose pins her experience. Future lessons should not drift. Already implied by the bible.

10. **Reader confusion between `/catalog` website path and future `/books` API path.** Mitigation: block 4 prose includes one sentence clarifying that the catalog page is part of the public website, and the API ships in a few lessons at a separate URL.

11. **Voice linter false positives.** AI-tell phrase matching is case-insensitive substring matching. Skip rules in parent spec Section 6 cover code fences, frontmatter, HTML comments, and Liquid parameter values. Low risk.

12. **Mermaid label rendering quirks.** `Greenfield-->>Browser: 200 OK with HTML` — Mermaid may handle `with` oddly. **Mitigation:** test locally during Step 8. If it fails, wrap the message in quotes.

---

## Locked decisions log.

- **Diary opener framing.** Synthesis of a Greenfield scene plus Maya's senior-practitioner credibility. Devon at the catalog page. "Don't tell Priya" is the earned joke. (Locked 2026-05-20.)
- **Block 3 scope.** Three concepts (request, response, status code) plus the caller-is-software quiet point. Sets up Atlas (M1L5) and the agent thread (M7) without naming them in this lesson. (Locked 2026-05-20.)
- **Block 4 doc pattern.** The atomic unit: one labeled request plus one labeled response. Interactive SVG uses the `hover-tooltip` pattern. (Locked 2026-05-20.)
- **Greenfield website canon.** Public catalog website lives at `greenfield.lib` (separate from the future `api.greenfield.lib/v1`). Catalog path `/catalog`. Story week numbering: week 0 (Lesson 1) → week 1 (Lesson 2 pilot). (Locked 2026-05-20.)
- **Block 8 AI tool.** GPT. Kicks off the lesson-by-lesson rotation since the pilot used Claude. (Locked 2026-05-20.)
- **Frontmatter approach.** Strip to the pilot's lean field set. `previous_page` omitted (M1L1 is the first lesson; legacy `/documentation.html` is dangling). (Locked 2026-05-20.)
- **Branch name.** `rewrite/journey` (source-filename slug, matches pilot's pattern). (Locked 2026-05-20.)
- **AdSense slot IDs.** Match pilot's numeric `"2222222222"` / `"3333333333"`. Parent spec prescribes semantic IDs; pilot does not use them. Treated as spec/reality discrepancy to surface for human review, not blocking. (Locked 2026-05-20.)
- **High-risk #1 resolution.** `hover-tooltip` framework needs a small touch-support patch (`click` toggle handler plus outside-click dismiss). Patch lands in the same PR as Lesson 1 as Step 9 of the build order (the SVG is now Step 10). Benefits every future lesson using the pattern. (Locked 2026-05-20.)
- **Story week numbering.** Numeric weeks live only in the Greenfield bible's "Story date" metadata field. Lesson prose references events by name, never week numbers. (Locked 2026-05-20.)
- **Block 5 rate-limit fallback.** Exercise text includes a sentence: "if you see `403 rate limit exceeded`, switch to another public API and try again." (Locked 2026-05-20.)

---

## Changelog.

- **2026-05-20. v0.1.** Sections 1-3 locked through brainstorm. Critical review applied:
  - Deduplicated glossary entries (only `caller` and `server` are new; `request`, `response`, `status code` already exist in `_data/glossary.yml` from pilot work).
  - Matched the actual glossary file structure (`link: "#"`, no `see_also`).
  - Verified Greenfield bible existence and the Sam entry already there; only Lesson 1 Timeline entry plus website-and-Devon locked details need adding.
  - Fixed `previous_page` dangling reference (legacy points to `/documentation.html`, which has no source file).
  - Voice-cleaned block 6 (was 6 consecutive sentence fragments; collapsed to one comma-separated sentence to stay under the 3-fragment cap).
  - Walked back block 4 scope (originally drifted into teaching HTTP methods, which is Module 2 Lesson 1's job).
  - Switched the Mermaid example to use Greenfield's public website (`greenfield.lib`) instead of the not-yet-existing API; established website canon in the bible.
- **2026-05-20. v0.2.** Sections 4-5 appended. Critical review applied:
  - Verified all prerequisites present (signoff include, voice linter, callout exercise variant, interactive-svg framework with all four patterns, pilot SVG complete, 0 TODO SVGs outstanding).
  - Resolved High-risk #1 during the brainstorm by reading `assets/js/interactive-svg.js`. Confirmed `initHoverTooltip` has no touch handlers; designed the 15-30 minute framework patch as Step 9 of the build order (SVG is now Step 10).
  - Corrected branch naming from `rewrite/m1l1-journey` to `rewrite/journey` (matches pilot's pattern).
  - Expanded pre-merge gates to cover all DoD items from parent spec Section 4.
  - Added Step 6 to update `_data/modules.yml` reading-time entry (10 min to 14 min) to match new frontmatter.
  - Confirmed AdSense ad-slot pattern from pilot (`"2222222222"` and `"3333333333"` numeric IDs). Flagged spec/reality discrepancy as Medium-risk #4.
  - Added post-merge tracking note (GA4 continues, non-blocking under the curricular-order phasing decision).
