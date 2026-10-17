# Module 1 Lesson 5 ("Audiences: humans, devs, and agents"). Design.

**Status.** v0.3. All five sections drafted in session, critically reviewed three times per section, three self-review passes applied. Ready for user review and writing-plans handoff.
**Owner.** Gaurav Trivedi.
**Author of this spec.** Claude (drafting), Gaurav (decisions).
**Last updated.** 2026-05-28.

Per-lesson design spec for the full rewrite of `_docs/audiences-humans-and-agents.md` (permalink `/audiences-humans-and-agents.html`) as Module 1 Lesson 5 in Maya's voice. The file currently exists as a 22-line stub created in the M1L4 PR (commit `1461a4a`); this rewrite replaces the body entirely. Implementation plan follows at `docs/superpowers/plans/2026-05-28-m1l5-audiences-plan.md`.

**Parent spec.** `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md` (Phase 2 framework: voice, 10-block template, DoD, visual pipeline).

**Sister references.**

- `docs/superpowers/specs/2026-05-20-toc-finalization-design.md` (canonical TOC).
- `docs/superpowers/specs/2026-05-22-m1l4-informationgathering-design.md` (immediate predecessor; story-time precedes this lesson by ~5 days).
- `docs/superpowers/specs/retros/informationgathering.md` (M1L4 retro; three workflow improvements applied to this spec: pre-flight glossary check, full-body word-count math, HTMLProofer false-positive handling).
- Pilot lesson (voice exemplar): `_docs/whatisanapi.md`.
- Universe canon: `docs/superpowers/greenfield-bible.md`.

---

## Section 1. The ten-block outline.

Step 2 artifact per parent spec Section 5. If any block lacks a clear one-line answer, the lesson is not ready to write.

**Central argument.** Your doc page has at least three audiences: the dev integrating the API, the agent reading on a human's behalf, and the human downstream of the agent. The three readers read different surfaces of the same page. The fix is three small edits on one page: a schema description, a realistic example response, and one prose sentence. The cheapest fix is the earliest one.

**Block 1. Diary opener (~150 words).** Monday morning, story week 3. The `GET /v1/books` endpoint has been live almost a week. Maya is at the branch for her usual weekly check-in with Devon; she has claimed a small corner table. Mira walks up to the front desk: "The system says you have *The Quiet Library*. Your chatbot said it's at 813.5. There is no 813.5." The librarian walks Mira to fiction. Maya pulls up the doc page on her phone. The example response shows `call_number: "813.5"`. There is no description on the field. There is no sentence on the page about what a call number is. Direct M1L4 callback: "Last week I asked you which reader the doc page is for: the developer or the chatbot. Today I learned there are three." Closer: "Today we figure out what changes when the third reader walks into the branch with a complaint. Her name is Mira."

**Block 2. Today you will leave with (~30 words).** Three bullets: (1) the three readers of every API doc page; (2) a three-edit pattern (schema description, realistic example, one prose sentence) for any ambiguous field; (3) a Gemini prompt that reads your page the way an agent will.

**Block 3. The three readers (~370 words plus mermaid).** Maya walks back to Devon's desk. By 9:30 Priya pings her in Slack: "user agent breakdown for /v1/books — you should see this." The breakdown is a short list of strings. Near the top: `Marginalia Atlas/0.4`. Marginalia is a small Goodreads-style competitor; Atlas is their reading assistant. Atlas read the doc page, hit the endpoint, read `call_number: "813.5"`, and told Mira "It's at 813.5."

Then the lesson: the doc page has at least three readers. The **dev** is the engineer at Marginalia integrating Greenfield's API into Atlas; they read the page to copy a snippet and ship. The **agent** is Atlas itself, reading literally and quoting fields back at runtime. The **human** is Mira, who never reads the page. She hears what Atlas said.

Define `audience` here (one inline sentence; glossary chip after). Define `user agent` here (one inline sentence; glossary chip after) — the string in the access log identifying the caller.

Honest moment about agent variance: "Atlas reads what your schema makes available, what your example response shows, and sometimes your prose. Different agents read different surfaces. The doc page has to do its work in each." Names uncertainty plainly per voice rules.

Maya's opinion: "Three is the count I keep coming back to. Slice it differently if your stack demands. The number matters less than knowing which one you wrote for and which one showed up."

Self-implicating: "On Tuesday I wrote for the dev. By Monday two other readers had shown up."

Mermaid `sequenceDiagram` participants: Mira, Atlas, Doc Page, API. Six arrows. Mira → Atlas (asks for the book); Atlas → Doc Page (reads schema); Doc Page → Atlas (returns shape and descriptions); Atlas → API (calls `GET /v1/books?q=quiet+library`); API → Atlas (returns the response); Atlas → Mira ("it's at 813.5"). The Doc Page is its own column so Maya can point at it.

Thought checkpoint: "Look at the diagram. Find the doc page. It is the one I get paid to write. Now look at where Mira is. The page reaches her only through what Atlas said."

**Block 4. How we fix the page (~520 words plus toggle SVG).** Opens with the framing: writing for three readers does not mean writing three pages. It means adding three small things to one page. **Division of labour, locked:** Maya writes the description text and the prose paragraph; Devon adds them to the schema and pushes. Block 4 prose must keep this distinction sharp (e.g., "I write the description text. Devon adds it to the schema and pushes.") so M1L5 stays consistent with M1L4's "Maya reads code, doesn't write code" frame.

(a) **The schema description (for the agent).** The `call_number` field has no `description`. Maya writes the description text; Devon adds it to the schema:

```yaml
call_number:
  type: string
  description: |
    Dewey decimal subject classification for the title.
    Not a shelf location. Branches shelve fiction alphabetically by author.
  example: "813.5"
```

The field now carries a sentence the agent can quote. "Not a shelf location" is the load-bearing clause. An agent reading the schema sees the disambiguation. An agent that does not read the schema sees nothing different yet; that is what (b) and (c) are for.

(b) **The realistic example response (for the dev).** The legacy doc page shows only the response keys, no values. Maya adds an example with real Greenfield data:

```json
{
  "results": [
    {
      "id": "bk_184932",
      "title": "The Quiet Library",
      "available_branches": ["branch_north"],
      "call_number": "813.5"
    }
  ],
  "total": 1
}
```

A dev who copies this sees the shape AND the kind of value `call_number` carries. "813.5" reads as a Dewey number to anyone who has been near a library. The example does what no field description can: it shows the value as a number, in context.

(c) **The prose disambiguation (for the human, via the agent).** Below the example response, one paragraph on the doc page itself:

> The `call_number` field returns the Dewey decimal subject classification for the title. It is useful for filtering or grouping titles by subject. It is not a shelf location. Branches shelve fiction alphabetically by author. If you are writing an interface that tells a borrower where to find a book, do not read this field back to them as a location.

The last sentence is the agent-aware sentence. It is written for the dev shipping a chatbot AND for the chatbot reading the prose at runtime. Two readers, one paragraph.

Close (before the SVG): "Three edits. One page. The next Mira gets an answer that means what it says."

Then the SVG setup sentence (above the include): "The toggle below shows the two reading acts on the same response. Mira does not read the page; she appears in Atlas's pane as what Atlas told her."

Then the toggle SVG include. Block 4 ends with the SVG (matches M1L4 shipped pattern: prose close → SVG, with the SVG itself ending the block). An optional one-line usage hint after the SVG is acceptable but not required.

**Block 5. Try it on Greenfield (~165 words, exercise callout, earned joke).** Five minutes, in any reference page you have shipped or use regularly. GitHub's `GET /repos/{owner}/{repo}` is a useful shape: many fields, some ambiguous (`parent`, `source`, `default_branch` all reward a literal reading badly). Pick one field. Read its value out loud the way an agent would: just the field name and the value, no surrounding sentence. (Borrow a friend who reads everything too literally. You probably have a candidate in mind.) — the dry parenthetical is the earned joke; observational, aimed at a kind of reader we all know. Is what your friend just heard a sentence a human would understand? If not, you have a description to write, an example to add, or a sentence to put in the prose.

**Block 6. The trap (~160 words, warning callout).** The trap is writing for the agent at the expense of the dev. Stuff every field with a four-sentence description warning the agent off every possible misreading and the dev's eyes glaze over; they copy the wrong example anyway. Maya's rule: the description does only the work the field name cannot. If the name is unambiguous, the description is short or absent. If the name is ambiguous, like `call_number`, the description does the disambiguation. You can also rename the field — `dewey_classification` would have prevented this whole week. Maya does not rename here because the field is already in production and renames are expensive. In your codebase, before the API ships, rename first; describe second.

The cost ladder, ending on consequence: "The earlier the fix, the cheaper. Rename pre-ship: minutes. Description post-ship: an hour. Prose paragraph: a week of agreeing on what to write. And the thing you do not get back is Mira's morning."

**Block 7. Words you can drop in standups now (4 terms, ~140 words).**

- `audience`: "Use this when you mean a class of reader, not a single person. 'The doc page has three audiences' settles a debate that 'we should think about who reads this' does not."
- `description` (as in an OpenAPI field): "Use this when you mean the sentence on a schema field that explains it. 'Add a description to that field' is what you say when an agent quoted a value back wrong."
- `example response`: "Use this when you mean a realistic JSON sample on the doc page, not a placeholder. 'The example response is stale' is different from 'the field changed.'"
- `user agent`: "Use this when you mean the string a caller sends to identify itself. 'Check the user agents on the access log' is how you find out whether your readers are humans or software."

All four new in this PR.

**Block 8. AI co pilot tip — Gemini (~210 words).** (No hyphen in "co pilot" per parent spec Section 2; preserve in block 8's lesson heading and prose.) The situation: you have your doc page open and you want to know what an agent will do with it before a borrower does. Gemini's long context handles a doc page plus a sample response in one pass. The prompt asks Gemini to read the page three times — once as a dev integrating the API, once as the chatbot itself quoting fields back, once as the human receiving the chatbot's answer.

```text
You are going to read this API doc page three times.

Doc page: [paste the page, including the response example]

First read: as a developer integrating this API. List the three things
you need from the page to write working code.

Second read: as a chatbot that has called the endpoint and received the
response. For each field in the response, write the exact sentence you
would say back to a user when reporting that field's value. Quote the
field value verbatim. Do not interpret.

Third read: as a human user receiving the chatbot's answer from the
second read. For each sentence, would you understand it? What would
confuse you?
```

What to expect back: a three-section answer. The middle section is the one that catches problems. If the chatbot's literal sentence reads as weird, your page has a description to write.

What to watch for: Gemini will sometimes flatten the three reads into one summary. Press it on the literal pass with "do not interpret; just quote." The summarized version is not useful. The literal one is.

**Block 9. Before you go (one self-check, ~35 words).** "Pick one field in your own doc page. Read its value the way Atlas would: just the field name and the value. Did you just say a sentence Mira would understand?"

**Block 10. Next week at Greenfield + signoff.** Teaser: "Next week Devon shows me why it is `GET /books` and not `POST /search`. The answer involves letters from 1969." Then `{% include signoff.html %}`. (Soft hint at RFCs; M2L1 picks up REST principles.)

---

**Word count target.** B1 ~150, B2 ~30, B3 ~370, B4 ~520, B5 ~165, B6 ~160, B7 ~140, B8 ~210, B9 ~35, B10 ~30 = **~1,810 words**. Reading time per parent spec Section 2 v0.4 formula: `1810 / 150 + 3 = 15.07 minutes`. Inside the 12 to 18 minute target. Frontmatter `reading_time: 15`. Word-count math uses full-body `wc -w` per M1L4 retro item 2.

**Variety check against M1L1, pilot M1L2, M1L3, M1L4.**

- Joke owner: M1L1 Devon → pilot Maya → M1L3 Priya → M1L4 Devon → **M1L5 Maya** (parenthetical aside).
- Joke location: M1L1 b1 → M1L3 b1 → M1L4 b6 → **M1L5 b5**. First lesson in block 5; full rotation now across b1, b5, b6.
- SVG pattern: M1L1 hover-tooltip → M1L3 toggle → M1L4 hover-tooltip → **M1L5 toggle**. Toggle returns on a distinctly different shape (Dev/Atlas reader-lens contrast vs. M1L3's JSON-vs-XML data-format contrast).
- AI tool: GPT → Claude → Claude → Cursor → **Gemini**. Rotation widens.

**Cast onstage:** Maya, Mira (new), the branch librarian (unnamed, walk-on), Priya (cameo via Slack). Atlas is named but offstage (identified via user agent string). Devon is named but offstage (merges the schema change later that morning). The apprentice (the reader) is the implicit second observer.

**Universe additions to lock in this PR:** Mira (new borrower, story week 3), Marginalia (Atlas's parent company), Atlas user agent string format (`Marginalia Atlas/0.4`), *The Quiet Library* (sample book title), `call_number` field added to `GET /v1/books` response shape (value `"813.5"`, type Dewey decimal subject classification), Greenfield's branch shelving convention (alphabetical by author, not Dewey), Maya's recurring Monday branch visits, story week 3 as the M1L5 anchor.

---

## Section 2. Visuals and code samples.

**Mermaid diagram (block 3, 4 participants, 6 messages — well under the 10-node / 12-edge cap).**

```liquid
{% capture mermaid_src %}
sequenceDiagram
  participant Mira
  participant Atlas
  participant Doc as Doc Page
  participant API
  Mira->>Atlas: where is Quiet Library
  Atlas->>Doc: read schema
  Doc-->>Atlas: field meanings
  Atlas->>API: GET /v1/books?q=quiet
  API-->>Atlas: 200 with results
  Atlas->>Mira: it is at 813.5
{% endcapture %}
{% include mermaid.html content=mermaid_src alt="Mira asks Atlas where The Quiet Library is. Atlas reads the doc page schema for field meanings, then calls the API with a query for quiet. The API returns a 200 response with results. Atlas tells Mira the book is at 813.5. The doc page sits between Atlas and the API; Mira hears only what Atlas said." %}
```

The diagram visualises the **chain** (who reads what, in what order). The SVG in block 4 visualises the **lens** (what each reader notices on the same response). Different shapes; no redundancy.

Label check: all labels ≤5 words, sentence case, no hyphens, no em dashes, no emoji. The Doc Page lane gives the block-3 thought checkpoint ("find the doc page in the diagram") an answerable referent.

---

**Code samples (block 4, three artifacts).**

(a) **The schema fragment, before and after.** Two short fenced blocks. The before is what was already in `openapi.yaml` from the Tuesday deploy. The after is Maya's edit (which Devon ships).

Before:

```yaml
call_number:
  type: string
```

After:

```yaml
call_number:
  type: string
  description: |
    Dewey decimal subject classification for the title.
    Not a shelf location. Branches shelve fiction alphabetically by author.
  example: "813.5"
```

6 lines for the after; 2 for the before. The block-4 prose names the location ("inside the response items, nested under `results`") so the snippet stays focused on the edit. The two-line `description:` block is the load-bearing change; everything around it is unchanged. The voice-rule check holds: no hyphens, no em dashes, no emoji in either block.

(b) **The realistic example response.**

```json
{
  "results": [
    {
      "id": "bk_184932",
      "title": "The Quiet Library",
      "available_branches": ["branch_north"],
      "call_number": "813.5"
    }
  ],
  "total": 1
}
```

10 lines. Greenfield-canonical IDs from the bible (`bk_184932`, `branch_north`). Adds three new locked details: the sample title (`The Quiet Library`), the canonical sample call number (`813.5`), and the response-shape extension to include `call_number`. The M1L4 bible entry listed the minimum fields; `call_number` extends it without contradicting it.

(c) **The prose disambiguation paragraph** (rendered as a Markdown blockquote in block 4):

> The `call_number` field returns the Dewey decimal subject classification for the title. It is useful for filtering or grouping titles by subject. It is not a shelf location. Branches shelve fiction alphabetically by author. If you are writing an interface that tells a borrower where to find a book, do not read this field back to them as a location.

Five sentences. Within the 6-sentence flow allowance. Term unified with the schema description: "shelf location" in both places. The closing sentence is the agent-aware sentence — written for the dev shipping a chatbot AND for the chatbot at runtime if it reads the prose.

---

**Interactive SVG (block 4): `assets/svg/audiences-humans-and-agents/main.svg`.**

Pattern: `data-svg-pattern="toggle"` (2-state). Reuses the existing M1L3 toggle framework; no framework changes required.

**Include:**

```liquid
{% include interactive-svg.html slug="audiences-humans-and-agents" alt="Same response JSON, two reader lenses. Toggle between Dev and Atlas. Dev sees all four fields and identifies call_number 813.5 as a Dewey number, then ships. Atlas sees only call_number 813.5 and quotes it literally to Mira; Mira walks to a shelf that does not exist." %}
```

**Canvas.** `viewBox="0 0 800 500"`, `preserveAspectRatio="xMidYMid meet"`, `max-width: 100%; height: auto;`.

**Layout.**

- **Top centre (~80 px tall):** 2-button segmented toggle. Button labels: `Dev` (left) and `Atlas` (right). Active button: copper fill, cream text. Inactive: cream fill, ink text, 1.5 px copper border. Default state: `Dev`. Buttons sized 160 × 56 px in the SVG canvas; mobile touch-target risk flagged in Section 5.
- **Centre-left (~400 px wide, ~360 px tall):** the example response, rendered as SVG `<text>` lines in monospace ink. The JSON is reproduced exactly as in code sample (b) above. Field key-value pairs are individually selectable `<g>` elements so each can be highlighted or dimmed per state. `aria-hidden="true"` on the JSON group so screen readers do not read it twice (the same content appears in the regular code block immediately above).
- **Centre-right (~320 px wide, ~360 px tall):** the "What this reader notices" annotation panel. Cream background, 4 px rounded corner, ink text in the page's sans-serif font.

**Dev state (default).**

- All four field key-value pairs (`id: "bk_184932"`, `title: "The Quiet Library"`, `available_branches: ["branch_north"]`, `call_number: "813.5"`) carry a thin sage underline (1.5 px, sage token).
- Annotation panel renders three steps in order:

  1. Dev copies the snippet.
  2. Notices `call_number: "813.5"` is a Dewey number.
  3. Ships.

**Atlas state.**

- The JSON dims to ~60 % opacity except for `"call_number": "813.5"`, which stays at full opacity and gains a copper background box (4 px rounded corner, 1.5 px copper border).
- Annotation panel renders three steps in order, parallel to the Dev state:

  1. Atlas reads `call_number: "813.5"`.
  2. Atlas tells Mira: "It is at 813.5."
  3. Mira walks to a shelf that does not exist.

  No speech-bubble decoration; plain text labels. "Atlas tells Mira" uses a verb of reporting, not an anthropomorphic "says" — consistent with the lesson's careful framing of Atlas as `it/it`.

**Accessibility (mandatory per parent spec Section 6).**

- Each toggle button is a `<g tabindex="0" role="button">` (per CLAUDE.md infrastructure habit 4; framework does not auto-add `role`).
- `aria-pressed="true"` on the active button, `aria-pressed="false"` on the inactive. Updates on state change.
- `aria-label` per voice rules: "Show the developer's view" and "Show Atlas's view." Full word "developer" instead of "dev" for screen-reader clarity. No hyphens, no em dashes.
- Root `<svg>` `aria-label`: "Two reader lenses on the same API response. Toggle between developer and Atlas to see what each notices."
- Tab order: Dev button, then Atlas button. JSON group and annotation panel are not in the tab order (annotation updates on state change and is announced via the live `aria-pressed` change on the active button; the JSON is duplicated accessibly in code sample b).
- Focus ring: 2 px ink (avoids visual clash with copper on the active toggle).
- **Focus retention on state change:** after Enter/Space toggles the state, focus stays on the same toggle button (does not jump to JSON or annotation).
- Color is not the only carrier: the Atlas-state `call_number` highlight is bordered AND boxed, not colour-only. The Dev-state underlines are positioned under text, not colour-only.
- Static fallback: no JS, Dev state renders fully (annotation, underlines, JSON visible).
- `prefers-reduced-motion`: state transitions degrade to instant (no fade between states).

**Style.** Strokes 1.5 to 2 px. Corners rounded 4 px. Token palette only:

- ink: text, focus rings, JSON content.
- cream: panel and toggle-inactive backgrounds.
- copper: active toggle fill, Atlas-state `call_number` box.
- sage: Dev-state field underlines.

No drop shadows. No gradients.

**Performance budget.** Under 15 KB raw, under 6 KB gzipped. Slightly heavier than M1L4's 12 KB raw because the JSON content travels as SVG `<text>`. Flagged in Section 5 as a budget watch.

---

**Block 4 prose framing for the SVG.** One sentence above the include, holding the three-audience claim from block 3 intact while the SVG models two reading acts:

> "The toggle below shows the two reading acts on the same response. Mira does not read the page; she appears in Atlas's pane as what Atlas told her."

---

## Section 3. Frontmatter, glossary, bible.

**Frontmatter for `_docs/audiences-humans-and-agents.md`** (replaces the stub frontmatter from the M1L4 PR):

```yaml
---
title: "Audiences: humans, devs, and agents"
permalink: /audiences-humans-and-agents.html
module: 1
lesson: 5
slug: audiences-humans-and-agents
reading_time: 15
description: Your API doc page has three audiences: devs, agents, and humans. A borrower walks in with a chatbot mistranslating her call numbers.
previous_page:
  url: /informationgathering.html
  title: Information gathering and interviewing the codebase
next_page:
  url: /restAPI.html
  title: REST principles
---
```

Notes:

- `title` is quoted because of the `:` in `Audiences:` (YAML key-indicator collision otherwise).
- `description` is 134 characters, under the 155-character limit per parent spec DoD. Anchored to the reader's POV; names the story beat. No hyphens, no em dashes, no AI tells.
- `permalink` is verbatim from the M1L4 stub.
- `previous_page` points at `/informationgathering.html` (M1L4, shipped on master at commit `24e35db`).
- `next_page` points at `/restAPI.html`, which exists as a legacy lesson and is M2L1 in the queue. **No 404 risk** (unlike M1L4's known-404 risk against M1L5's then-missing stub).
- `redirect_from` not needed. The slug was set by the M1L4 stub and is unchanged.

---

**Modules.yml update.**

Current entry at line 17 of `_data/modules.yml`:

```yaml
- { slug: "audiences-humans-and-agents.html", title: "Audiences: humans, devs, and agents", reading: "—", placeholder: true }
```

Two violations on this row: an em dash in `reading: "—"` (banned per parent spec Section 3) and `placeholder: true` (must be removed per DoD when a placeholder lesson ships). Diff:

```diff
- - { slug: "audiences-humans-and-agents.html", title: "Audiences: humans, devs, and agents", reading: "—", placeholder: true }
+ - { slug: "audiences-humans-and-agents.html", title: "Audiences: humans, devs, and agents", reading: "15 min" }
```

**Out-of-scope note.** Many other rows in `_data/modules.yml` carry em dashes — in placeholder reading fields (lines 29, 31, 42, 49, 52, 53, 54, 65, and most of Modules 6 and 7) and in legacy lesson titles ("cURL — and why you should still know it" at line 30; "Documenting webhooks — beginner/intermediate/expert" at lines 62–64; "gRPC and Protobuf — when, why, how to document" at line 75; the Module 8 capstone titles at lines 94–99). These are pre-existing and outside M1L5's scope — each will be cleaned up when its lesson is rewritten. M1L5's PR touches only its own row, matching the M1L4 precedent.

---

**Glossary chip-wrapping inventory** (process note for the writer at step 7):

Block 3 prose uses these glossary terms that already exist in `_data/glossary.yml`:

- `agent` (added M1L2 pilot) — wrap with `{% include glossary-term.html term="agent" %}` on first appearance.
- `reader` (added M1L3) — wrap on first appearance.

Block 3 defines two new terms inline and chip-wraps on later appearances:

- `audience` — define inline first; chip-wrap after.
- `user agent` — define inline first; chip-wrap after.

Block 4 prose uses these glossary terms that already exist:

- `schema` (added M1L4) — wrap on first appearance in block 4.
- `OpenAPI` (added M1L4) — wrap on first appearance in block 4.

Block 4 introduces two more new terms:

- `description` — define inline first (when Maya opens the YAML); chip-wrap after.
- `example response` — define inline first (when Maya adds the example); chip-wrap after.

Total glossary chips per lesson: ~6 distinct terms with multiple chip-wrapped appearances. The block 7 chip list still highlights only the four new terms (`audience`, `description`, `example response`, `user agent`). The four existing terms are wrapped but not re-explained in block 7 because they were taught in earlier lessons.

---

**Glossary additions to `_data/glossary.yml`.**

Confirmed by reading the file at master 2026-05-28: 18 entries exist (JWT, MCP, LLM, 429, contract, endpoint, response shape, status code, agent, request, response, caller, server, reader, source of truth, SME, schema, OpenAPI). **None of the four M1L5-proposed terms exist.** Appended at the end of the file:

```yaml
- term: "audience"
  definition: "A class of reader, not a single person. An API doc page has at least three audiences: the developer integrating the API, the agent reading on a human's behalf, and the human downstream of the agent. The same field can matter to one audience and not to another."
  link: "#"

- term: "description"
  definition: "The sentence on an OpenAPI schema field that explains what the field is. In 2026, increasingly read by agents at runtime; the description is where you talk to a literal reader. If the field name is ambiguous, the description does the work."
  link: "#"

- term: "example response"
  definition: "A realistic JSON sample on the doc page, with real values rather than placeholders. The example shows what no schema description can: the value in context. A developer copying the snippet sees the shape and the kind of value the field carries."
  link: "#"

- term: "user agent"
  definition: "The string a caller sends to identify itself. Browsers send strings like Mozilla/5.0. Agents send strings like Marginalia Atlas/0.4. Checking the user agent header on the access log is how you find out whether your readers are humans or software."
  link: "#"
```

Voice-rule check per parent spec Section 7 (these render on the public site so the linter applies):

- `audience` (50 words). No hyphens. "load-bearing" replaced with plain phrasing that preserves the conceptual point: "The same field can matter to one audience and not to another."
- `description` (42 words). No hyphens. "literal reader" is two words; voice-clean.
- `example response` (39 words). No hyphens. "in context" is two words; voice-clean.
- `user agent` (43 words). No hyphens. The header is referenced conceptually as "the user agent header" rather than the literal `User-Agent` identifier, so no backticks needed.

All four entries: no em dashes, no en dashes, no emoji, no AI tells.

Length precedent: the existing `reader` entry runs ~55 words; the M1L5 entries are comparable to or under that. The 30-word guideline is just a guideline; longer is fine when pedagogically warranted.

The existing `reader` entry (added M1L3) describes a binary human/agent split. M1L5's `audience` chip introduces a finer-grained tripartite slice: dev (technical human), agent, and human-downstream-of-agent. The two entries coexist without contradiction; `audience` is a subclass of `reader`. No update to `reader` is needed.

---

**Greenfield bible updates at `docs/superpowers/greenfield-bible.md`.**

Cumulative bible diff for this PR: one Timeline addition, one API entities subsection extension, eight Locked details additions, one Locked details removal, one Open universe question removal.

**Append to Timeline**, after the existing M1L4 entry:

```markdown
## Module 1, Lesson 5. Mira walks in with a chatbot mistranslating call numbers.
Story date: Monday morning, story week 3. Five days after Devon shipped GET /v1/books on Tuesday afternoon of story week 2 (M1L4).
Event: Maya is at the branch on Monday morning, working at a small corner table. Mira, a borrower, walks up to the front desk and tells the librarian her chatbot said The Quiet Library is at 813.5; there is no shelf 813.5. The librarian walks Mira to fiction; Mira leaves with the book. Maya pulls up the doc page on her phone; the example response shows call_number: "813.5" with no description on the field. By 9:30 Priya pings Maya in Slack with the user agent breakdown for /v1/books, showing Marginalia Atlas/0.4 near the top. Maya names the three audiences (dev, agent, human) and lands three edits to the doc page: a schema description on call_number, a realistic example response with real Greenfield data, and a prose disambiguation paragraph below the example. Devon merges the schema change later that morning.
Characters present: Maya, Mira, the branch librarian (unnamed), Priya (via Slack), Atlas (offstage, identified via user agent string). Devon is named but offstage. The apprentice (the reader) is the implicit second observer.
New API entities introduced: call_number field added to the GET /v1/books response. Type string. Carries the Dewey decimal subject classification for the title. Sample value "813.5". Schema description added in the same week the lesson lands.
New glossary terms introduced: audience, description (as OpenAPI field), example response, user agent.
Quote: "On Tuesday I wrote for the dev. By Monday two other readers had shown up." (Maya, narrating block 3.)
```

**Extend the existing `GET /books` entry in API entities:**

```markdown
### GET /books
Search the catalog.
- Path: GET /v1/books
- Query params: q (string, required, search term). limit (integer, optional, default 25, max 100).
- Auth: Authorization: Bearer $GF_TOKEN.
- 200 response shape: { "results": [ { "id": "bk_184932", "title": "The Quiet Library", "available_branches": ["branch_north"], "call_number": "813.5" } ], "total": <int> }.
- Response field details:
  - id: string. Internal book identifier. Format bk_<numeric>.
  - title: string. The book's title as cataloged.
  - available_branches: array of strings. Branch identifiers where a copy is on shelf or available for hold.
  - call_number: string. Dewey decimal subject classification for the title. Not a shelf location. Branches shelve fiction alphabetically by author. Added story week 3 (M1L5); schema description added the same week.
- 400 response: when q is missing or empty. (Open question Maya pinned for Devon in M1L4: should this be 422? Resolution deferred to Module 4 errors lesson.)
- Other errors documented elsewhere: 401, 429 (from pilot M1L2 context).
- Source of truth for handler behavior: routes/books.py. Source of truth for response contract: openapi.yaml.
```

The `Response field details` subsection is new in M1L5 and may extend to other API entities as the universe grows.

**Locked details — three edits this PR:**

1. **Remove** the placeholder line that M1L5 is here to resolve:

   ```diff
   - - Atlas's owning company: TBD (lock in Module 1 Lesson 5)
   ```

2. **Append** the new locked details, before the existing **Open universe questions** section header:

   ```markdown
   - Mira: a Greenfield borrower. She/her. First on-screen in M1L5 as the human reader in the three-audience taxonomy. Walked into the branch Monday morning of story week 3 after a chatbot told her The Quiet Library was at 813.5. She gets the book; her morning does not come back.
   - Marginalia: a small Goodreads-style competitor. Atlas is Marginalia's reading assistant product. Borrowers ask Atlas what to read next; Atlas calls Greenfield's API. Resolves the M1L5 lock previously held open as "Atlas's owning company: TBD".
   - Atlas's user agent string: "Marginalia Atlas/0.4" (locked from M1L5). Updates in later lessons may bump the version number.
   - The Quiet Library: canonical sample book title from M1L5 forward. The title on the M1L5 failure scenario. May reappear in code samples in later lessons that need a book title.
   - Sample call_number value: "813.5" (Dewey decimal subject classification for American fiction). Used in example responses for GET /v1/books from M1L5 onward.
   - Story week 3: opens with M1L5. Monday morning of story week 3 is Mira's complaint. First time a specific Greenfield borrower reports a specific agent failure on a specific endpoint.
   - Greenfield's branch shelving convention: fiction shelved alphabetically by author surname, not by Dewey classification. The source of the call_number mistranslation pain. Greenfield is not a Dewey library in practice, even though it carries Dewey numbers in its catalog data.
   - Maya visits the branch every Monday morning to check in with Devon. Locked from M1L5 forward. Establishes a recurring story-time anchor for Maya being onsite.
   ```

3. **Open universe questions — remove the resolved entry:**

   ```diff
   - - Atlas's name is provisional per spec Section 8.
   ```

   Atlas stays as Atlas per the M1L5 brainstorm decision. The open question is resolved to "no rename."

The bible's Open universe questions section is now empty (the only entry was the Atlas-name question). The section header can stay (with a placeholder note like "No open universe questions outstanding as of M1L5 ship") or be removed; recommendation is to keep the empty section so the writer knows to look there when a new question surfaces.

---

**Legacy assets and includes to handle.**

**None.** The current `_docs/audiences-humans-and-agents.md` is a 22-line stub created in the M1L4 PR (commit `1461a4a`). It contains only frontmatter, two short paragraphs, and the signoff include. There are no inline scripts, no inline AdSense, no legacy include references, no orphan images, no legacy data files associated with this slug. The body replacement is a clean overwrite.

This is notably simpler than M1L4's PR (which grep-confirmed and deleted six orphan image assets and two orphan data files). M1L5's PR creates `assets/svg/audiences-humans-and-agents/main.svg` (new), updates `_data/glossary.yml` (adds four terms), updates `_data/modules.yml` (one row), updates `docs/superpowers/greenfield-bible.md` (Timeline + API entities + Locked details + Open universe questions), and overwrites `_docs/audiences-humans-and-agents.md`. Nothing to delete.

**Tailwind safelist.** No additions needed. The toggle pattern uses classes already in the safelist from M1L3.

---

## Section 4. Sequencing and PR plan.

**Prerequisites. Verify present in master at branch start (step 2):**

- `_includes/signoff.html`, `_includes/callout.html` (with `exercise` and `warning` variants), `_includes/mermaid.html`, `_includes/interactive-svg.html`, `_includes/ad-slot.html`, `_includes/glossary-term.html`. All shipped before the pilot; reconfirmed present through M1L4 merge.
- `assets/js/interactive-svg.js` supports the `toggle` pattern. Last verified working in M1L3 ship; **re-verify at branch start** by grepping for `toggle` references in `assets/js/interactive-svg.js`.
- `assets/js/mermaid-init.js` (theme override). **Re-verify at branch start** that the M1L1 contrast fix is still in master (the specific commit SHA from prior specs may be stale; check by reading the file).
- `scripts/voice-check.rb` and `scripts/voice-check.sh` (voice linter). The linter scans `_docs/*.md`; it does NOT scan `_data/*.yml` (relevant for step 11).
- `docs/superpowers/greenfield-bible.md` (universe canon, on master locally per the writer's working copy since the bible is gitignored).
- `_data/glossary.yml` has 18 entries as of master read 2026-05-28. None of `audience`, `description`, `example response`, `user agent` present; M1L5 adds all four.
- `_data/modules.yml` contains the M1L5 placeholder entry at line 17 with `reading: "—"` and `placeholder: true`. This PR removes both.
- `_docs/audiences-humans-and-agents.md` exists as a 22-line stub from the M1L4 PR (commit `1461a4a`). This PR replaces the body entirely. **Re-verify at branch start** that no unexpected edits have happened to the stub.
- **Outstanding `TODO: interactive` SVG count.** Parent spec caps at 3. Per M1L1/M1L3/M1L4 plans, all three shipped real interactive SVGs (no outstanding TODOs). **Re-verify at branch start** by `grep -rn 'TODO: interactive' _docs/`. If the count is at 3, M1L5 cannot ship a deferred SVG.
- No new build infrastructure required. M1L5 is a content-only PR plus a new SVG asset.

**Branching state at session start (2026-05-28).**

- M1L4 merged to master at commit `24e35db` (PR #12, 2026-05-22).
- M1L5 branches off master at the current `master` tip. **Exact branch-off SHA is TBD at branch creation;** record it in the plan after step 1. No carry-over dependencies from M1L4. No infrastructure workarounds needed (callout markdownify, mermaid contrast, SVG tooltip positioning, privacy footer all fixed in master).

**Planning note on subagent dispatch** (per M1L4 retro item 3): pre-classify which steps benefit from a fresh subagent context vs. inline edits.

- **Fresh subagent context:** Step 7 (prose draft — each block has real interpretive room and benefits from spec-compliance review), Step 9 (SVG authoring — creative SVG layout work), Step 12 (voice pass — independent linter-driven rewrites).
- **Inline edits:** Steps 4, 5, 6, 8, 10, 11, 13, 14 — verbatim or near-verbatim substitutions from the spec. Dispatching here wastes tokens without quality gain.

If a token rate limit hits mid-execution, fall back to inline for any remaining step that has spec-verbatim content; spec compliance is preserved because the spec text IS the content.

**Build order (14 steps).** `[indep]` = independent (can run any time after step 2). `[chain: X]` = depends on step X.

1. **Switch to master, fast-forward, and create branch.** `git checkout master && git pull origin master && git checkout -b rewrite/audiences-humans-and-agents`. Record the master tip SHA in the plan.
2. **Prerequisite verification.** Confirm each item from the Prerequisites list above, including the three "re-verify at branch start" items (toggle framework, mermaid contrast fix, outstanding interactive-TODO count, stub state). Smoke-build clean master: `npm run build:css && bundle exec jekyll build` exits zero.
3. **Spec and plan are local-only.** Both `docs/superpowers/specs/2026-05-28-m1l5-audiences-design.md` and `docs/superpowers/plans/2026-05-28-m1l5-audiences-plan.md` live under the gitignored `docs/superpowers/` tree. Working artifacts, not part of any commit. **No commit step is required for the spec or plan.** The first committed artifact on this branch is the glossary update in step 4.
4. **Glossary additions** to `_data/glossary.yml`. **[indep]** Append the four new entries (`audience`, `description`, `example response`, `user agent`) per Section 3, in that order, at the end of the file. First committed change on the branch.
5. **Modules.yml em-dash + placeholder cleanup.** **[indep]** Apply the one-line diff in Section 3.
6. **Frontmatter rewrite** of `_docs/audiences-humans-and-agents.md`. **[indep]** Replace the stub frontmatter with the lean Section 3 version. The stub body (lines 16–22) will be replaced in step 7. Intermediate state (new frontmatter, old body) is not built; step 7 immediately follows.
7. **Prose draft** of blocks in order 3 → 4 → 5 → 6 → 1 → 2 → 7 → 8 → 9 → 10. **[chain: 6]** Substance-first order per parent spec Section 5. Block 4 uses `<!-- SVG: toggle, 2-state Dev | Atlas, JSON in centre with annotation panel right -->` placeholder until step 9. **Block 4 sub-structure ordering:** framing paragraph → subsection (a) schema description → subsection (b) realistic example → subsection (c) prose disambiguation → closing paragraph "Three edits. One page. The next Mira..." → SVG setup sentence → SVG include. (Matches M1L4 shipped pattern: SVG sits late in the block. Block 4 ends with the SVG include.) **Two `{% include ad-slot.html %}` inserts** at the parent-spec positions: `{% include ad-slot.html slot="2222222222" format="auto" %}` between blocks 2–3 and `{% include ad-slot.html slot="3333333333" format="auto" %}` between blocks 8–9 (slot IDs match M1L4 precedent; both look like placeholders held until real AdSense IDs are issued). **Glossary chip-wrapping** per the Section 3 inventory: `agent` and `reader` on first appearance in block 3 (already in glossary); `audience` and `user agent` defined inline first then chipped in block 3 (new in glossary); `schema` and `OpenAPI` on first appearance in block 4 (already in glossary); `description` and `example response` defined inline first then chipped in block 4 (new in glossary).
8. **Mermaid in block 3** using the 4-participant / 6-message sequenceDiagram from Section 2. **[chain: 7]**
9. **Interactive SVG** at `assets/svg/audiences-humans-and-agents/main.svg`. **[indep, but use step 7 block 4 wording as input once available]** Pattern `toggle` (2-state). Layout, annotation panel content, accessibility, style, and weight target per Section 2. Can be drafted in parallel with step 7 once block 4 wording is settled. **Stub-then-replace pattern from M1L4 retro item 2 applies:** if the build needs to pass before the real SVG lands, commit a one-rect placeholder first, then overwrite with the real SVG. Liquid processes `{% include %}` inside HTML comments, so the comment-out workaround does not work — use a real (minimal) SVG file as the stub. Two SVG commits in the history (stub then real) is acceptable and matches M1L4's precedent.
10. **Greenfield bible additions** per Section 3. **[indep]** Apply four edits to `docs/superpowers/greenfield-bible.md`: (a) append the Timeline M1L5 entry after the M1L4 entry; (b) extend the GET /books API entity entry with the `call_number` field and the new `Response field details` subsection; (c) **remove** the stale `Atlas's owning company: TBD` Locked details line, then **append** the eight new Locked details before the Open universe questions section; (d) **remove** the resolved `Atlas's name is provisional` Open universe question. The bible is gitignored; this edit is local-only, not committed. Track in the PR description as a universe canon update for future writer reference.
11. **Pre-flight glossary check (hand-grep).** **[chain: 4]** Per M1L4 retro item 1. The voice linter does NOT scan `_data/*.yml`, so a manual check is required. After step 4, hand-grep the four new `definition:` strings for `-` outside of identifiers like `Mozilla/5.0` and `Marginalia Atlas/0.4` (these have `/` not `-`, so they're already clean). Confirm zero hyphens in the appended block.
12. **Voice pass.** **[chain: 7, 8]** `ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md` exits zero. Fix every hit. Read the lesson out loud at desk volume. **Hyphen watchlist this lesson is most likely to invite:** "three-audience", "doc-page", "user-agent", "literal-reading", "load-bearing", "agent-aware", "borrower-facing", "schema-stage", "shelf-location", "downstream-of-agent", "real-time", "two-state", "three-state", "machine-readable", "Monday-morning", "weekly-check-in", **"co-pilot"** (parent spec uses "AI co pilot" without hyphen; the writer must not introduce one into block 8's heading or prose), **"self-implicating"** (Maya's voice invites it; rewrite as "naming her own mistake" or similar). Rewrite each as plain text per CLAUDE.md active habit 6. Hyphens inside backticks and inside URLs/identifiers are exempt and skipped by the linter. Fallback if `voice-check.rb` errors out: hand-grep for em dashes (`—`), en dashes (`–`), emoji codepoints, and each phrase from the parent spec Section 3 AI tell ban list.
13. **Local build verify.** **[chain: all prior]** `npm run build:css && bundle exec jekyll build` clean. Open `_site/audiences-humans-and-agents.html` in a browser at desktop (1280 px) and mobile (375 px) widths. Verify each:
    - Mermaid renders with cream background; the four participants (Mira, Atlas, Doc Page, API) all visible with their six arrows.
    - SVG toggle displays cleanly in Dev state by default.
    - Clicking the Atlas button switches state: JSON dims to ~60% opacity except `"call_number": "813.5"` which stays full opacity with a copper box; annotation panel content swaps to the three Atlas steps.
    - Clicking Dev switches back: JSON returns to full opacity with sage underlines on all four field key-value pairs; annotation panel content swaps to the three Dev steps.
    - Tab order is Dev button then Atlas button.
    - Focus ring (ink color) visible on each button.
    - Enter/Space toggles state. **Focus remains on the toggle button after state change** (does not jump to JSON or annotation).
    - Mobile tap on each button switches state.
    - Mobile touch targets are operable at ≥75 px scaled width (the budget; below this fails accessibility).
    - Reading-time chrome shows "15 min".
    - All four new glossary chips (`audience`, `description`, `example response`, `user agent`) hover or tap to show their popover definitions.
    - Existing chips (`agent`, `reader`, `schema`, `OpenAPI`) still hover correctly.
14. **HTMLProofer.** **[chain: 13]** `bundle exec htmlproofer _site/audiences-humans-and-agents.html --swap-urls '^/apidocumentation:'` exits zero. Per CLAUDE.md infrastructure habit 7 and M1L4 retro item 3. If known false-positive root URLs (Google Fonts, GTM, AdSense preconnect) trip the run, add `--ignore-urls` flags; these are site-wide false positives, not lesson-specific.

**PR details.**

- **Branch:** `rewrite/audiences-humans-and-agents`.
- **Title:** `Rewrite: Audiences: humans, devs, and agents`. (Double colon is intentional and unavoidable given the lesson title; GitHub PR titles allow it.)
- **Description:** Definition of Done checklist from parent spec Section 4, ticked. Plus a paragraph covering: four new glossary terms (`audience`, `description`, `example response`, `user agent`); bible additions (Timeline M1L5 entry; GET /v1/books entry extended with `call_number` field and a new Response field details subsection; eight new Locked details including Mira, Marginalia, The Quiet Library, the `call_number` sample value, story week 3, the shelving convention, and Maya's Monday visits; one Locked details removal — `Atlas's owning company: TBD` — and one Open universe question removal — `Atlas's name is provisional`); modules.yml em-dash and placeholder cleanup on one row; the `call_number` field added to the GET /v1/books response shape (universe extension, not contradiction); the new Response field details bible pattern; the 2-state SVG decision with Mira inside the Atlas state as consequence; SVG mobile touch-target risk acknowledged.

**Pre-merge gates** (full list from parent spec Section 4):

- `bundle exec jekyll build` exits zero.
- `npm run build:css` exits zero.
- `ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md` exits zero.
- No Liquid errors and no missing-include warnings.
- HTMLProofer clean with `--swap-urls '^/apidocumentation:'`.
- All eight glossary chips on the page resolve: four new (`audience`, `description`, `example response`, `user agent`) plus four pre-existing (`agent`, `reader`, `schema`, `OpenAPI`).
- Frontmatter complete; `module: 1` / `lesson: 5` reconcile with `_data/modules.yml`.
- `_data/modules.yml` row for M1L5 has no `placeholder: true` flag and no em dash.

**Human review gate.** Gaurav reads end-to-end at desktop and mobile breakpoints. Maya's earned joke ("Borrow a friend who reads everything too literally. You probably have a candidate in mind.") gets a thumbs up or thumbs down. The three-audience frame either lands or feels too tidy; if too tidy, soften block 3's "I count three" to a more explicit invitation to find a fourth. The Atlas-Mira speech chain in the SVG Atlas state either lands as the lesson's emotional core or reads cluttered; if cluttered, simplify the annotation copy.

**Post-merge tracking** (non-blocking under curricular-order phasing per CLAUDE.md):

- 15-minute retro at `docs/superpowers/specs/retros/audiences-humans-and-agents.md` within 24 hours of merge. Three notes max.
- GA4 engagement against the lesson's first 30 days continues as a baseline metric but does not block subsequent lesson rewrites.

**Time estimate.** 10 to 14 hours of writer time across 2 to 3 working days. SVG is the bottleneck — the 2-state toggle with JSON content rendered as SVG text, plus the annotation panel that swaps content on state change, plus accessibility (tab order, ARIA, focus ring, reduced motion, static fallback, focus retention on toggle), is comparable in effort to M1L4's hover-tooltip sources map. Within parent spec's per-lesson budget.

---

## Section 5. Risks.

Three severity tiers, following M1L4 spec precedent.

**High. Must verify during build:**

1. **SVG mobile touch-target sizing.** The 2-state toggle buttons inside the 800-wide SVG canvas scale down on a 375 px viewport. At 160 × 56 px in canvas, scaled to ~75 × 26 px on mobile, the touch target is below the 44 × 44 px accessibility minimum on the short axis (26 px height). Three mitigation options at PR review time:
   - **(a) Stack the toggle buttons vertically on mobile** (CSS media query, 56 px tall each, full width). Doubles the SVG header height on mobile but meets the touch-target minimum cleanly.
   - **(b) Render the toggle outside the SVG as HTML buttons** positioned above the SVG container. Decouples toggle from SVG scaling. Requires a small framework change to wire the HTML buttons to the SVG state.
   - **(c) Resize the canvas headers to 800 × 80 px buttons at 50% width each** (400 × 80 in canvas → ~187 × 37 on mobile). Still below 44 px on the short axis.

   Recommendation: **(a)** as the first attempt; **(b)** if (a) feels cramped. Decision at SVG-build time (step 9).

2. **Stack/framework variance for agents reading the doc page.** Block 3 acknowledges that "different agents read different surfaces." But the lesson's three doc-page fixes assume the agent reads at least one of the three surfaces (schema, example, prose). A reader could fairly ask: which agents read which surfaces today? The lesson sidesteps this with "different agents read different things; the doc page has to do its work in each." Risk: the reader treats the three fixes as universally effective when in reality some agents skip all three. Mitigation: block 3's honest moment is the only acknowledgment; block 4 frames the three fixes as "small things to add to one page," not "guaranteed to work for every agent." Voice pass should preserve the hedge.

3. **The call_number field is a new addition to the GET /v1/books response shape.** The M1L4 bible entry for GET /v1/books did not list `call_number`. M1L5 adds it. The bible says it was added "story week 3 (M1L5)." Story-time consistency holds — Devon could have added the field between Tuesday afternoon (M1L4) and Monday morning (M1L5) without it being a separate lesson event. Risk: a reader who carefully re-reads M1L4's code samples might notice the response shape grew between lessons. Mitigation: M1L4's example response shows `{ id, title, available_branches }` and is in past tense ("the endpoint returned"); M1L5's example shows the same fields plus `call_number` in present tense ("the example response shows"). Story-time growth is consistent with a small team shipping changes.

**Medium. Handle in design:**

4. **Maya's earned joke ("Borrow a friend who reads everything too literally. You probably have a candidate in mind.") is dry, parenthetical, and depends on reader recognition.** Parent spec DoD requires the joke to "read as funny to at least one other human." Risk: Gaurav thumbs-down at review. Mitigation: the joke is short and embedded; if it fails, cut the parenthetical entirely and let the exercise read as straight instruction. Alternative joke material: "(You probably know exactly this person.)" or just drop the joke; block 5 reads fine without it.

5. **Block 4 must keep the Maya/Devon division of labour sharp.** Section 1 now locks: Maya writes the description text and the prose paragraph; Devon adds them to the schema and pushes. The exemplar phrasing in Section 1 ("I write the description text. Devon adds it to the schema and pushes.") preserves M1L4's "Maya reads code, doesn't write code" frame. Risk if the writer drifts: block 4 reads as Maya editing `openapi.yaml` directly, contradicting M1L4. Mitigation: voice pass at step 12 checks that "I write" and "Devon adds/pushes" both appear in block 4 (a) and (c).

6. **Three-audience frame may feel too tidy.** Maya's "I count three" line invites the same hedge as M1L4's "I count four" did. Block 3 already mitigates with "Slice it differently if your stack demands. The number matters less than knowing which one you wrote for and which one showed up." Risk: a reader who works on niche systems (CLI tools with no agents, internal APIs with no public docs) feels excluded. Mitigation: the hedge in block 3 covers this. Voice pass should preserve the "slice it differently" out.

7. **Atlas's quiet first appearance is named in passing in block 3.** Per parent spec Section 1: "Quiet presence from Module 1 Lesson 5. Full protagonist in Module 7." Risk: a reader skimming block 3 misses that Atlas is named; later lessons reference Atlas as if introduced. Mitigation: block 3 names Atlas explicitly when Maya reads the user agent string ("Marginalia Atlas/0.4. Marginalia is a small Goodreads-style competitor; Atlas is their reading assistant."). Two sentences of introduction. Sufficient.

8. **The borrower's name (Mira) is locked from M1L5 forward.** Risk: future lessons re-use the name accidentally or assume she's the same person. Mitigation: bible's Locked details entry explicitly names her, so future writers consulting the bible will see "Mira: a Greenfield borrower" and know she's an established character.

9. **Devon's only on-screen activity in M1L5 is "merging the schema change later that morning."** Risk: Devon's character voice (cheerful, slightly cynical, gotcha-delivery) gets no lesson-level airtime in M1L5. Mitigation: Devon is named, story-present, and acts (he merges); his absence from on-screen scenes is variety relative to M1L1/M1L4 where he was central. Voice rotation widens. Bible carries his attributes for the next lesson that needs him on-screen.

**Low. Track and move on:**

10. **AI tool rotation now reads: GPT → Claude → Claude → Cursor → Gemini.** Gemini is new; rotation has covered five tools across five lessons. Risk: future lessons run out of major tools and start repeating. Mitigation: more tools available than lessons in Module 1; rotation has headroom for Modules 2 and 3.

11. **Voice linter on hyphens this lesson is likely to invite.** Listed in step 12 of Section 4. Mitigation: explicit watchlist in build step.

12. **SVG visual similarity to M1L3's toggle.** Both lessons use `toggle`. M1L3 was a 2-state JSON-vs-XML toggle (data-format comparison); M1L5 is a 2-state Dev-vs-Atlas toggle (reader-lens comparison). Different content, different teaching beats. Risk: a reader skimming both lessons may register them as similar at first glance. Mitigation: confirmed via Section 2 layout that the SVGs visually read as different (M1L3 split-pane vs M1L5 single JSON with annotation panel and field highlighting).

13. **The `description` glossary term shares a name with the YAML frontmatter `description:` field.** Risk: a reader skimming the lesson confuses the OpenAPI schema field with the meta-description field. Mitigation: the glossary chip popover disambiguates ("The sentence on an OpenAPI schema field that explains what the field is"). Block 4 prose explicitly says "the `call_number` field has no `description`" — context disambiguates.

14. **The `Response field details` bible subsection is a new pattern introduced in M1L5.** Other API entities in the bible (currently only GET /books exists) do not have this subsection. Risk: future lessons inconsistently adopt the pattern. Mitigation: low-stakes; the pattern is documented in the bible itself by example. Future lessons can adopt or not as needed.

15. **Story-time pacing pressure.** M1L1 was story week 0 (Tuesday). Pilot M1L2 was story week 1 (early). M1L3 was story week 1 (late). M1L4 was story week 2 (Tuesday). M1L5 is story week 3 (Monday). That's roughly five weeks of story time across five lessons. Risk: story-time density doesn't match the 35 remaining lessons (Modules 2-8 span 18 months). Mitigation: parent spec accommodates non-uniform pacing (lessons can jump days, weeks, or months). M1L5 is the first lesson with a multi-day gap from its predecessor (5 days vs 2-3 days). Establishes that gaps are fine.

16. **GA4 baseline for `/audiences-humans-and-agents.html`.** This lesson had no live legacy version — it was a placeholder until 2026-05-22 (stub) and effectively traffic-zero until M1L5 ships. Per parent spec DoD: "Engagement baseline for placeholder lessons. Placeholders have no legacy version to compare against. After ship, engagement is measured against the rolling average of all rewritten Phase 2 lessons over the previous 30 days." So the GA4 comparison is against the cohort average, not a legacy baseline. Mitigation: documented in the parent spec; no action needed here.

---

## Locked decisions log.

- **Central argument.** Your doc page has at least three audiences (dev, agent, human). The fix for any ambiguous field is three small edits on one page: schema description, realistic example, prose disambiguation. The cheapest fix is the earliest one. (Locked 2026-05-28.)
- **Opening scene.** Monday morning of story week 3. Maya at the branch for her weekly check-in with Devon, claimed corner table. Mira walks up to the front desk with a complaint about a chatbot mistranslating call numbers. The librarian walks Mira to fiction; Mira leaves with the book. (Locked 2026-05-28.)
- **Failure mechanism.** Ambiguous `call_number` field (Dewey decimal subject classification). Atlas reads it literally, tells Mira "It is at 813.5." Mira walks to row 813. Fix is a schema description with the "Not a shelf location" clause, a realistic example response, and a prose paragraph below the example. No new endpoint; no rename (would have prevented the bug pre-ship but expensive post-ship). (Locked 2026-05-28.)
- **Atlas's prominence.** Named in passing in block 3 (user agent string `Marginalia Atlas/0.4`, two sentences of introduction). Quiet presence per parent spec Section 1. Full protagonist deferred to Module 7. (Locked 2026-05-28.)
- **Block 4 shape.** Three concrete doc-page edits, one per reader: schema description (agent), realistic example (dev), prose disambiguation (human via agent). Then the toggle SVG. Block ends with the SVG include. (Locked 2026-05-28.)
- **SVG pattern.** Toggle (2-state, Dev / Atlas). Reuses existing M1L3 framework; no framework changes. Mira inside the Atlas state as the downstream consequence; three-audience claim held intact in block 3 prose. Decision to use 2-state (not 3-state) avoids per-lesson JS and framework extension. (Locked 2026-05-28.)
- **Borrower name.** Mira. Locked from M1L5 forward as a Greenfield borrower distinct from `lina.varga` (which remains the canonical sample-data handle for code blocks). (Locked 2026-05-28.)
- **Atlas's owning company.** Marginalia. Locks the previously TBD bible entry. Atlas is Marginalia's reading assistant product. (Locked 2026-05-28.)
- **Atlas's name.** Stays as Atlas. Resolves the Open universe question from parent spec Section 8 ("Atlas's name is provisional") to "no rename." (Locked 2026-05-28.)
- **Sample book title.** *The Quiet Library*. Canonical from M1L5 forward. (Locked 2026-05-28.)
- **Sample call number value.** "813.5" (Dewey decimal subject classification for American fiction). Canonical from M1L5 forward. (Locked 2026-05-28.)
- **Greenfield shelving convention.** Fiction shelved alphabetically by author surname, not by Dewey. Locks the worldbuilding detail that makes the call_number mistranslation possible. (Locked 2026-05-28.)
- **Maya's branch presence.** Weekly Monday-morning check-ins with Devon. Establishes a recurring story-time anchor. (Locked 2026-05-28.)
- **Joke owner and location.** Maya, block 5, parenthetical aside. ("Borrow a friend who reads everything too literally. You probably have a candidate in mind.") First lesson where the joke lands in block 5; full rotation across b1, b5, b6 now. (Locked 2026-05-28.)
- **AI co pilot tool.** Gemini. Long context fits the three-pass reading exercise. Widens rotation (GPT → Claude → Claude → Cursor → Gemini). (Locked 2026-05-28.)
- **Mermaid type.** Sequence diagram with 4 participants (Mira, Atlas, Doc Page, API) and 6 messages. Visualises the chain; complements the SVG's lens view. (Locked 2026-05-28.)
- **Glossary additions.** Four entries this PR: `audience`, `description`, `example response`, `user agent`. None previously in `_data/glossary.yml` (confirmed at 2026-05-28). Block 7 chip list highlights only the four new terms; the four pre-existing terms used in this lesson (`agent`, `reader`, `schema`, `OpenAPI`) are chip-wrapped but not re-explained. (Locked 2026-05-28.)
- **Bible additions.** Timeline M1L5 entry. GET /books extended with `call_number` and a new `Response field details` subsection. Eight new Locked details. One Locked details removal (Atlas's owning company TBD). One Open universe question removal (Atlas's name provisional). (Locked 2026-05-28.)
- **Frontmatter approach.** Lean field set matching M1L3 and M1L4. `previous_page` and `next_page` both point at live URLs; no 404 risk. (Locked 2026-05-28.)
- **Branch name.** `rewrite/audiences-humans-and-agents`. (Locked 2026-05-28.)
- **Modules.yml scope.** Touch only the M1L5 row (em-dash sweep + placeholder removal). Other em-dash violations in modules.yml are out of M1L5 scope. (Locked 2026-05-28.)

---

## Changelog.

- **2026-05-28. v0.1.** All five sections drafted in a single brainstorm session. Two critical-review passes per section, fixes applied inline before user approval. Branch state at draft time: master @ `24e35db` with M1L1, pilot M1L2, M1L3, and M1L4 all merged.
- **2026-05-28. v0.2.** Spec self-review pass applied. One ambiguity closed: Maya/Devon division of labour around the schema edit was described two slightly different ways across Section 1 and Section 5. Section 1 now locks the sharper phrasing ("Maya writes the description text and the prose paragraph; Devon adds them to the schema and pushes") with an exemplar prose snippet ("I write the description text. Devon adds it to the schema and pushes."). Section 5 risk 5 reframed to reference the lock and add a voice-pass check (step 12 confirms both "I write" and "Devon adds/pushes" appear in block 4). Placeholder scan, internal consistency check, and scope check all passed clean.
- **2026-05-28. v0.3.** Third critical-review pass surfaced three more gaps. (a) Section 1 and Section 4 contradicted each other on block 4 element ordering — Section 1 read as "subsections → SVG → close," Section 4 step 7 explicitly said "close → SVG setup → SVG." M1L4's shipped pattern is close-before-SVG with the SVG ending the block. Section 1 now matches Section 4: close, then SVG setup sentence, then SVG include, with an optional usage hint after. (b) Step 12 hyphen watchlist was missing "co-pilot" (high risk — parent spec uses "AI co pilot" without hyphen but the writer might cargo-cult the hyphen from the spec's own block 8 heading) and "self-implicating" (Maya-voice rhetorical move with easy-to-trip hyphen). Both added with rewrite guidance. (c) Spec metadata used "AI co-pilot tip" while parent spec Section 2 uses "AI co pilot tip" without hyphen — drift fixed in Section 1 block 8 header and the locked decisions log; an explicit parenthetical note now flags the no-hyphen requirement for the lesson body. Spec ready for user review.
