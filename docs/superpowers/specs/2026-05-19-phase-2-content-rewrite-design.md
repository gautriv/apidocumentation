# Phase 2 Content Rewrite. Design.

**Status.** v0.4. Critical review applied. Ready for implementation planning.
**Owner.** Gaurav Trivedi.
**Author of this spec.** Claude (drafting), Gaurav (decisions).
**Last updated.** 2026-05-20.

This spec is the framework for rewriting all 43 lessons of the free API Documentation Course in Maya's voice for the 2026 agent era (27 existing lessons plus 16 placeholder slots in `_data/modules.yml`). It does not contain individual lesson outlines. Each lesson rewrite will follow its own short brainstorm cycle inside this framework.

This document is the source of truth. CLAUDE.md will be updated to point here once approved.

---

## Section 1. The Greenfield universe and the 8 chapter arc.

**The Greenfield universe.**

Greenfield Library is a fictional small library company that grows up across the course over roughly 18 months of company time. Each module is a chapter in the same story.

**Cast of four.**

* **Maya.** Senior technical writer. Narrator. She/her. Freelances for Greenfield from Module 1, present at every meeting and writing in real time. Goes full time in Module 4 Lesson 1. Signs off every lesson on its own line: `Maya.`. When Maya says "you", "you" is the apprentice (the reader).
* **Devon.** Staff engineer. He/him. Builds most of what Maya documents. Cheerful, slightly cynical, delivers the gotchas.
* **Priya.** Product manager. She/her. Owns the analytics seat. Notices agent traffic rising and forces the company to take it seriously by Module 6 Lesson 4.
* **Atlas.** A third party reading assistant built by a small Goodreads style competitor. It/it (Atlas is software, not a person). Users ask Atlas for their next read. Atlas calls Greenfield to check local availability. Quiet presence from Module 1 Lesson 5. Full protagonist in Module 7.

**The reader.** The reader is Maya's apprentice. They/them. Modules 1 to 3 are Maya briefing them before their first day. From Module 4 Lesson 1 they have real assignments inside the diary. By the end they have shipped portfolio chunks of the Greenfield doc set.

**The 8 chapter arc.**

* **Module 1 Foundations (5 lessons).** Greenfield runs a single branch with a paper card system. A developer friend says "you could expose this as an API". They ship a tiny endpoint by Lesson 4. In Lesson 5 a borrower mentions they have been using a chatbot to search the catalog and it keeps mistranslating call numbers. First time the word "agent" lands in a Greenfield meeting.
* **Module 2 REST and HTTP (7 lessons).** Greenfield outgrows the tiny endpoint. Real REST API across Lessons 1 to 6. In Lesson 7 Devon ships the first proper OAuth flow. Atlas comes back, this time with credentials.
* **Module 3 Data shapes (5 lessons).** Greenfield argues about JSON vs XML for the catalog feed they owe a partner library. In Lesson 5 Priya pulls early traffic data and shows that a meaningful share of calls have no browser fingerprint. The room goes quiet.
* **Module 4 Writing the docs (5 lessons).** Lesson 1: Maya is officially hired and the apprentice (the reader) starts the same day. Together they write Greenfield's first real reference docs, error catalog, code samples, and OpenAPI spec.
* **Module 5 Webhooks and async (5 lessons).** Borrowers want overdue alerts. Greenfield ships webhooks. A partner library asks for realtime catalog sync. The module closes on AsyncAPI.
* **Module 6 Modern API shapes (4 lessons).** A popular booktok creator builds a "find this at my local library" app on top of Greenfield and credits them. Search traffic explodes. Greenfield ships streaming search, a realtime availability websocket, and a GraphQL endpoint for their mobile app. Meanwhile a partner network of regional libraries that has been licensing Greenfield's catalog system uses gRPC internally, so Maya is asked to document the gRPC interface for partner engineers. Module closes in Lesson 4 with Priya saying "agents are now 28 percent of our API calls and rising".
* **Module 7 AI native (5 lessons).** Module opens on Priya's line. A borrower asks Atlas "find me a quiet thriller available at my branch this weekend" and Atlas needs a structured way in. Greenfield publishes their first MCP server in Lesson 2. The module closes in Lesson 5 with Greenfield shipping an "Ask Maya" assistant on their public docs (the same widget the reader can ship on their site).
* **Module 8 Practice and ship (7 lessons).** Maya hands the reader graduating assignments. Each pass (beginner, intermediate, expert for REST docs, then again for Postman testing) is the reader actually shipping a chunk of the Greenfield doc set. The final lesson is the reader publishing their portfolio.

**Cross module bridge rule.** Every module's first lesson opens with a one paragraph callback to where the previous module closed. Every module's last lesson ends with a sentence that the next module's first lesson picks up.

---

## Section 2. The lesson template (Greenfield diary skeleton).

Every lesson contains these blocks in this order. Block names are internal. The actual headings in the rendered lesson are written fresh in Maya's voice.

1. **Diary opener (60 to 120 words).** A scene at Greenfield this week. Specific, sensory, low jargon. Set in a real place (the branch, a meeting room, Devon's desk). Avoids corporate cliches. When possible, picks up the closing sentence of the previous lesson. Ends with one sentence naming the apprentice's stake: why does the reader, today, need this.
2. **Today you will leave with (30 words max).** Three bullets, in plain language: the concept, the doc pattern, and the AI co pilot prompt. This block exists so a skimmer sees the AI co pilot tip is coming and stays.
   * `[ad slot 1 sits between block 2 and block 3]`
3. **What just happened (200 to 400 words plus one Mermaid diagram).** The concept demystified in plain English. Every term defined the first time it appears: one short sentence inline, then the term is wrapped in `{% include glossary-term.html term="..." %}` on every later appearance. Includes one thought checkpoint sentence near the end ("look at the diagram. Which arrow is the response?"). Mermaid uses `{% include mermaid.html %}` with a `capture` block (see Section 6 for the full pattern). Max 10 nodes.
4. **How we document it (400 to 700 words plus one interactive SVG).** The actual technical writing pattern. What the doc page looks like, what the endpoint reference reads like, what we include and what we leave out. The interactive SVG lives here. Constraints: visualizes a state, sequence, or transformation; at least one real interaction (click, hover, toggle); degrades to a static informational SVG without JavaScript; keyboard navigable; max 800 by 500 pixels rendered; mobile responsive; alt text conveys the same information.
5. **Try it on Greenfield (100 to 200 words, 5 minute task).** A concrete small task the reader does in five minutes. A request to run, a snippet to write, a doc page to sketch. Rendered as `{% include callout.html variant="tip" %}` (or a dedicated `variant="exercise"`).
6. **The trap (100 to 200 words).** The one gotcha nobody warns you about. Devon usually delivers it. Rendered as `{% include callout.html variant="warning" %}`.
7. **Words you can drop in standups now (3 to 5 terms).** Each term is one sentence on how to use it in conversation, not its dictionary definition (the dictionary lives in the glossary chip). Linked via `{% include glossary-term.html term="..." %}`.
8. **AI co pilot tip (150 to 250 words).** Today's prompt the reader takes to a real assistant. Format: situation, the prompt itself in a copy box, what to expect back, what to watch for. The tool rotates lesson by lesson (Claude, GPT, Cursor, Gemini, others) so no single vendor dominates.
   * `[ad slot 2 sits between block 8 and block 9]`
9. **Before you go (one self check).** Maya leaves the apprentice with one question to answer in their head. One to two sentences. No answer key in the lesson. The answer is the next lesson's opener.
10. **Next week at Greenfield (one sentence) plus signoff.** A teaser the next lesson opens with directly. Then `{% include signoff.html %}` renders `Maya.` on its own line.

**Reading time target.** 12 to 18 minutes per lesson. Because lessons carry a Mermaid diagram, an interactive SVG, and embedded code, the rough metric is `wc -w` divided by 150, plus 3 minutes for visuals and code samples (rather than the textbook 200 wpm).

**Required components per lesson.** One Mermaid diagram. One interactive SVG. One five minute task. One AI co pilot tip. Three to five glossary terms. One self check. One earned joke (in block 1 or block 5).

---

## Section 3. Voice rules and the AI tell ban list.

**Maya's voice in one paragraph.** Maya is a senior technical writer with about a decade of API work behind her. She is specific, never abstract. She uses names, not roles. She gives credit generously and is sharp about bad practices. She does not patronize. When she does not know something, she says so. When she has an opinion, she states it. She is dry, occasionally funny, never cute.

**The exemplar paragraph.** This is the cadence and texture we are aiming for:

> Devon shipped the new `/books/search` endpoint on Tuesday. By Wednesday morning Priya was at my desk holding a printout of the access log. About one in five calls had no browser fingerprint, no user agent we recognized, and very specific query strings. Honestly, that was the first time I thought of the catalog as something other people's software was reading. Not just people. Software.

Concrete names. Specific numbers. Short sentences next to longer ones. One quiet "honestly". No metaphor about realms or landscapes. No hyphens. No em dashes. No emoji.

**Voice across the eight blocks.**

* **Diary opener.** Human, warm, contractions on. Ironic is fine. The earned joke can land here.
* **What just happened.** Plain English teacher voice. Fewer contractions. No jokes. Defines every term the first time it appears. Second person throughout.
* **How we document it.** Practitioner voice. Specific. Shows the artifact. Opinions allowed and named as opinion.
* **Try it on Greenfield.** Instructional. Imperative voice.
* **The trap.** Dry. The earned joke can also land here. Short.
* **Words you can drop in standups now.** Casual. Active. "Use this when you mean...".
* **AI co pilot tip.** Practical, generous. No hype. No promise of magic.
* **Before you go and signoff.** Quiet. Two short sentences max. Then `Maya.` on its own line.

**Conversational mechanisms (required).**

* Second person throughout body copy. Address the apprentice as "you".
* First person allowed for Maya when she is offering opinion, experience, or hesitation. Maximum five "I" sentences per lesson.
* Acknowledge the reader's silent question when it is real. ("You might be wondering why we did not just use OAuth here. Fair question.")
* Sentence fragments allowed for punch. Maximum three per lesson.
* Single sentence paragraphs allowed for emphasis. Maximum three per lesson.
* Short rhetorical questions allowed when the answer arrives immediately after. Maximum two per lesson.
* Paragraphs are one to four sentences. Up to six only when explaining a flow.

**Humor: one earned joke plus steady dry wattage.**

* **One earned joke per lesson** lands in block 1 (diary opener) or block 5 (the trap). Nowhere else.
* A Maya joke is observational, never topical. Dry, never zany. Self deprecating or aimed at the industry, never at the reader. No puns unless the pun is excellent. No meme references.
* Construction: set up in the paragraph above, paid off in a short sentence below. Or a standalone aside that needs no setup. Lands on the strong word.
* If you cannot tell whether the joke lands, cut it. The "earned" part means it actually works.
* **Dry observation is allowed throughout** (not just in joke slots). Maya can be wry about engineering culture, vendors, RFCs, her past selves. Wryness adds warmth between the formal joke beats and is what makes the lessons conversational.

**Required moves.**

* Vary sentence length deliberately. Short next to long.
* Use names (Devon, Priya, Atlas, the apprentice) over roles.
* Anchor every explanation to a Greenfield concrete detail.
* Refer to prior lessons by their concrete event, not by lesson number.
* Show your work. Wrong way first, why it fails, then the right way, when the right answer is not obvious.
* Name opinion as opinion. "I would", "I prefer", "in my experience".
* Name uncertainty plainly. "I do not have a clean answer for this one. Here is what I usually do."

**Tense.**

* Diary opener: present.
* What just happened and How we document it: present, instructional teaching voice.
* Callbacks to prior lessons: past.
* Teaser: future or present continuous.

**Numbers.**

* Numerals for HTTP codes, sizes, versions, percentages (`28 percent`), money (`$5`), durations in clock time (`5 minutes`).
* Words for low counts of things (`three branches`, `four lessons`).
* Mixed numerals and words in the same sentence is fine when they reference different categories.

**Pronouns for the cast.**

* Maya: she/her.
* Devon: he/him.
* Priya: she/her.
* The apprentice (the reader): they/them.
* Atlas: it/it.

**Punctuation rules (no hyphen, no em dash, no en dash).**

* Range: "to" (`4 to 6 pages`).
* Join two ideas: period. New sentence.
* Aside: parentheses, sparingly. Two pairs maximum per lesson.
* Explanation: colon.
* Compound modifier: rewrite to remove it. "Agent friendly" becomes "schemas agents understand". "Step by step" becomes "step at a time" or just "step". "Real time" becomes "realtime" (one word) or "live".
* If a hyphen is structurally required (a URL, a code identifier, a vendor name, a header like `X-API-Key`), it stays. Body prose has none.

**Emoji ban (anywhere).** No emoji in body copy, headings, callouts, code samples, glossary entries, captions, alt text, ad copy, UI strings, SVG labels, README files, commit messages we write into the lesson, or anywhere else on the public site. Repo wide.

**AI tell ban list.**

* Opening tics: "let's dive in", "buckle up", "picture this", "imagine this scenario", "imagine a world where", "in today's fast paced world", "without further ado", "look no further", "here is the thing".
* Filler that adds nothing: "it is worth noting that", "needless to say", "it goes without saying", "it is important to understand", "first and foremost", "when it comes to", "in essence", "at the end of the day", "on the flip side".
* Closing tics: "in conclusion", "in summary", "to wrap up", "I hope this helps", "there you have it", "feel free to", "whether you are a beginner or seasoned pro".
* Overused adjectives and verbs: "crucial", "vital", "essential", "pivotal", "paramount", "robust", "seamless", "comprehensive", "holistic", "leverage", "utilize", "delve", "delve into", "unlock", "empower", "elevate", "supercharge", "transform", "game changing", "cutting edge", "next generation", "state of the art".
* Structural tics: "X is more than just Y. It is Z." (any version), "not only X, but also Y", "the realm of", "the landscape of", "the tapestry of", "the world of", three item parallel constructions when one item would do, bulleting every thought, starting consecutive paragraphs with the same word.
* Decoration: emoji of any kind, all caps for emphasis (use italics sparingly), "pro tip:" preambles (use the callout component), question headings in series (one question heading per lesson maximum).

**Allowed personality words.** "Honestly", "fine", "fair", "look", "here", "real", "the truth is", "in practice", "in production", "in my experience". Used sparingly. Never as filler.

**Headings.** Sentence case (except H1). One question heading per lesson maximum. Each heading is the shortest specific phrase that names what is below.

**Code and inline technical terms.** Backticks for HTTP codes, methods, header names, JSON keys, file paths, code identifiers. Numerals for HTTP codes. Inline code for short snippets, fenced code blocks for anything multi line. Every fenced block has a language tag.

**Greenfield API canonical reference (every code sample uses this).**

* Base URL: `https://api.greenfield.lib/v1`
* Resources: `/books`, `/branches`, `/borrowers`, `/loans`, `/holds`, `/events`
* Default auth header for examples: `Authorization: Bearer <token>`
* No `example.com`. No `api.foo.com`. No generic placeholders. Greenfield only.

**Footnote on hyphenated technical terms.** Established hyphenated terms (`single-page application`, `cross-origin`) get rewritten in prose ("single page application", "cross origin"). In code, URLs, headers, and identifiers, the original form is preserved.

**Interactive SVG and UI strings.** All tooltips, button labels, alt text, captions, and aria labels follow the voice rules. No hyphens. No em dashes. No emoji. No AI tells. Same voice as the body.

**Maya's signoff (locked).** `Maya.` on its own line, rendered via `{% include signoff.html %}`. No farewell phrase above it. The "Next week at Greenfield" teaser is the sentence above. Then a line break. Then `Maya.`

---

## Section 4. Rewrite order and the Definition of Done.

**The order has three phases.**

**Phase 2.0. The pilot (1 lesson).**

Rewrite `whatisanapi.html` ("What an API actually is", Module 1 Lesson 2) end to end against this spec. This lesson sets Maya's voice for the next 35. It is the only lesson we rewrite before we know if the framework holds in practice.

Pilot ships to production, and we wait. The wait ends when GA4 has at least 14 days of data on the new lesson OR 500 pageviews, whichever comes first. Because the pilot keeps the legacy URL via `permalink:`, GA4 retains the pre rewrite baseline for the same path; no special export is needed for the before number.

**Pilot success criteria (numeric).** All three must hold against the legacy 30 day pre rewrite baseline for the same URL:

* Time on page: at least 50 percent higher than the legacy baseline.
* Scroll depth past 75 percent: at least 30 percent of readers AND a higher percentage than the legacy baseline.
* Bounce rate: no more than 5 percentage points higher than the legacy baseline (lower is better; flat or down is ideal).

If any of the three fail, the spec gets revised before Phase 2.1 starts. The pilot is a forcing function for spec revisions. We do not revise the spec on lesson 14.

**Phase 2.1. The traffic cohort (top 20 by GA4 pageviews).**

After the pilot ships and clears the success bar, we pull a GA4 export of the top 20 lessons by pageviews over the last 90 days. Save it at `design-mockups/ga4-top20.csv` per the Phase 1 plan. Rewrite those 20 lessons in descending order of traffic. Each rewrite ships independently as its own small PR on its own branch.

**GA4 export fallback.** If the export is not available within 14 days of pilot ship, Phase 2.1 starts in curricular order from Module 1 Lesson 1 instead of waiting. The traffic ordered approach is preferred for revenue, but a stalled export is not a reason to pause writing for weeks.

**Diary bridge rule under non sequential rewrites.** When the previous adjacent lesson is still in legacy form, the diary opener still works because it references a Greenfield event by name (the OAuth flow Devon shipped, the booktok creator's app, the printout Priya brought to Maya's desk), not by lesson position. The event is what the reader remembers.

**Carve out for the earliest course lessons.** Module 1 Lessons 1 and 2 sit before the universe has any prior on screen events. Their diary openers stand on their own (the scene at the branch, the developer friend's offhand suggestion). The bridge rule kicks in from Module 1 Lesson 3 forward.

**Phase 2.2. The remainder (the other 7 existing plus 16 placeholder lessons).**

Once the traffic cohort is done, rewrite the remaining 7 existing lessons plus all 16 placeholder slots from `_data/modules.yml`, in curricular order from Module 1 forward. (The lesson count: 27 existing in `_data/modules.yml`, of which 1 is the pilot and 19 are the rest of the top 20 by GA4, leaves 7 existing for this phase. Plus 16 placeholders. Total 23 lessons in Phase 2.2.) By the time we get here, the diary thread is mostly intact and we are filling gaps, not jumping around.

**Estimated cadence.** One to two lessons per week sustainable. The pilot ships in week 1, the traffic cohort lands across roughly 12 weeks, and the remainder lands across roughly 15 weeks after that. About 7 months of writing. We are not optimizing for speed. We are optimizing for "this is the only API documentation course people need".

---

**Definition of Done per lesson.**

A lesson is shippable when every item below is true. No partial passes. Incomplete lessons live on their feature branch until they pass. We do not merge "we will polish it later" lessons.

**Structure.**

* All ten blocks of the template are present in order.
* Reading time between 12 and 18 minutes (use `wc -w` divided by 200 as the rough metric).
* One Mermaid diagram. Max 10 nodes. Lives in block 3.
* One interactive SVG. Lives in block 4. Keyboard navigable. Static fallback works without JS. Alt text conveys the same information.
* Three to five glossary terms, each linked via `{% include glossary-term.html %}`. New terms added to `_data/glossary.yml` in the same PR.
* One self check question in block 9. No answer key in the lesson.
* One earned joke in block 1 or block 5. Reads as funny to at least one other human.
* Signoff via `{% include signoff.html %}` at the bottom.

**Voice.**

* Zero hyphens in body copy (allowed only inside code, URLs, headers, identifiers, vendor names).
* Zero em dashes anywhere.
* Zero en dashes anywhere.
* Zero emoji anywhere on the page (body, headings, callouts, code, alt text, SVG labels).
* Zero phrases from the AI tell ban list.
* Maya's voice rules respected (second person to the apprentice, names not roles, opinions named as opinion, uncertainty named plainly, tense matches the block).
* Cast pronouns respected.

**Greenfield consistency.**

* Every code sample uses `https://api.greenfield.lib/v1` and the canonical resources (`/books`, `/branches`, `/borrowers`, `/loans`, `/holds`, `/events`).
* Diary opener picks up the prior lesson's closing sentence when that lesson has been rewritten. When the prior lesson is still legacy, the opener references a named Greenfield event instead.
* Closing teaser is a sentence about Greenfield's near future, not a syllabus reference. When the next lesson is later rewritten, its diary opener picks up the event.
* References to prior events name the event, not the lesson number.

**SEO and revenue (the hard constraint from CLAUDE.md).**

* `permalink:` is unchanged from the legacy lesson. (For brand new lessons that did not exist before, the permalink is set once and never changed.)
* If the lesson title was renamed in the rewrite, `redirect_from:` is set so the legacy URL still works. (Not applicable to placeholder lessons that had no legacy URL.)
* Two ad slots are present in the right positions. The lesson Markdown explicitly inserts `{% include ad-slot.html slot="lesson-mid-1" format="auto" %}` between blocks 2 and 3 and `{% include ad-slot.html slot="lesson-mid-2" format="auto" %}` between blocks 8 and 9. The default layout's pre and post lesson ad slots remain unchanged; these are the only two inline slots a lesson controls.
* The lesson has a meta description (155 characters max, plain prose, no AI tells, no emoji).
* OG image is generated by `scripts/generate-og.mjs` (per Phase 1 Step 10). No manual placement.

**Accessibility.**

* All headings are sentence case (except H1) and form a clean H2 to H3 hierarchy. No skipped levels.
* All images and SVGs have alt text that conveys the same information as the visual.
* Interactive SVG is keyboard navigable. Tab order is intentional.
* Color is not the only carrier of information in any diagram.
* Code samples are screen reader friendly (proper `<pre><code class="language-...">`, not images of code).

**Technical and build.**

* Site builds clean. `bundle exec jekyll build` exits zero.
* Tailwind CSS is regenerated. `npm run build:css` exits zero.
* No Liquid errors and no missing include warnings.
* No broken links per HTMLProofer on the new lesson.
* Glossary terms in `_data/glossary.yml` validate (every linked term exists).
* Front matter complete: `title`, `permalink`, `module`, `lesson`, `slug`, `reading_time`, `description`, `redirect_from` (if applicable). The `module:` and `lesson:` integers reconcile with the lesson's position in `_data/modules.yml` (this fixes the alphabetical mis assignment noted in CLAUDE.md's gap list).
* The `placeholder: true` flag (if present in `_data/modules.yml`) is removed for that lesson in the same PR.

**Engagement baseline for placeholder lessons.** Placeholders have no legacy version to compare against. After ship, engagement is measured against the rolling average of all rewritten Phase 2 lessons over the previous 30 days. A placeholder lesson is considered healthy if it lands within 20 percent of the cohort average on time on page and scroll depth past 75 percent.

**Human review gate.**

* Gaurav reads the lesson end to end before merge. Not just diffs. The whole page in the browser at desktop and mobile breakpoints.
* The earned joke gets a thumbs up or thumbs down from Gaurav. Thumbs down means rewrite the joke or cut it, not ship and revise later.

---

## Section 5. Per lesson author workflow.

This is what happens when we sit down to rewrite a single lesson. The framework gives the rules. This section gives the process. Seven steps. Each step has a concrete artifact at the end.

**Step 1. Read what is already there.**

Open the legacy lesson, the prior rewritten lesson (if any), and the next lesson's slot in `_data/modules.yml`. Write down in three sentences: what the legacy lesson was actually trying to teach, what a 2026 reader needs that the legacy version misses, and which Greenfield event the diary opener will hang on. Artifact: a three sentence HTML comment at the top of the lesson Markdown, removed before merge.

**Step 2. Plot the ten blocks before writing prose.**

Fill in a one line outline for each of the ten template blocks. The diary opener gets the event. Block 2 gets the three bullets. Block 3 gets the concept and the Mermaid sketch (rough nodes and arrows). Block 4 gets the doc pattern and what the SVG will animate. Block 5 gets the task. Block 6 gets the trap. Block 7 gets the three to five terms. Block 8 gets the AI co pilot situation. Block 9 gets the self check. Block 10 gets the teaser.

Artifact: the outline. If a block has no clear answer in one line, the lesson is not ready to write. Stop. Re read the prior and next lessons. Ask a real engineer if you know one. Or skip the lesson and come back. Do not write a lesson whose substance you cannot describe in one line per block.

**Step 3. Draft the prose.**

Write blocks in this order: 3, 4, 5, 6, 1, 2, 7, 8, 9, 10. Blocks 3 and 4 come first because they are the lesson's substance. You cannot promise the right scene in block 1 until you know what the lesson actually delivers. Block 1 (the diary opener) is written second to last in the substance order so the scene earns the lesson, not the other way around.

When drafting block 4, the SVG does not exist yet. Use an explicit placeholder: `<!-- SVG: brief description of what the SVG will demonstrate -->`. The prose refers to what the SVG will demonstrate, not what it currently looks like. Step 4 builds the SVG to match.

**Step 4. Build the visuals.**

Mermaid first (fast, iterate). Interactive SVG second. The SVG is the longest single piece of work per lesson; budget half a day. If you cannot ship the interactive SVG in half a day, ship a static SVG with a `<!-- TODO: interactive -->` comment, file an issue, and add the interaction in a follow up PR within two weeks.

**Hard cap on outstanding TODO SVGs.** At most 3 lessons live on the site can have a `TODO: interactive` outstanding at any time. Hitting 4 stops new lesson rewrites until the backlog clears.

**Step 5. Voice pass.**

Run the lesson through the voice check linter defined in Section 6. It greps for hyphens, em dashes, en dashes, emoji codepoints, and every phrase from the AI tell ban list. Fix every hit. There are no false positives that ship.

Read the lesson out loud at desk volume. Where you stumble, the sentence is wrong. Rewrite the stumble. Then read it once more in your head with the question "would Maya actually write this". Cut what fails.

**Step 6. Human review and ship.**

Open a PR.

* Branch: `rewrite/<slug>` (for example `rewrite/whatisanapi`). Slug matches `_data/modules.yml` exactly.
* PR title: `Rewrite: <lesson title>`. The title from `_data/modules.yml`, with no hyphens or em dashes.
* PR description: the Definition of Done checklist (Section 4), pasted and ticked. Plus a one paragraph note on anything unusual (a new glossary term added, a redirect, a deferred interactive SVG).

**Reviewer.** Gaurav is the default reviewer. Gaurav may delegate to a named reviewer for a specific lesson; the delegation is recorded in the PR description.

**Pre merge gates.** Pre merge CI must pass: `bundle exec jekyll build`, `npm run build:css`, HTMLProofer on the new lesson, and the voice linter from Section 6. This depends on Phase 1 Step 12 being in place. If Step 12 is not yet shipped, the writer runs these locally and reports the result in the PR description.

Gaurav reads the lesson end to end at desktop and mobile breakpoints. The earned joke gets a thumbs up or thumbs down. Thumbs down means rewrite the joke or cut it, not ship and revise later. Definition of Done checklist gets ticked. Merge. Site rebuilds. Lesson is live.

**Step 7. Post ship retro.**

Fifteen minutes the day after merge. Three notes max into `docs/superpowers/specs/retros/<slug>.md`:

* What worked.
* What to change in the spec.
* What to change in the workflow.

If a retro raises a spec change, the spec gets a version bump and a changelog entry. Trivial process tweaks that do not touch the spec live only in the retro file.

---

**Approximate time per lesson.**

* Step 1 (read what is there): 30 minutes.
* Step 2 (outline): 1 hour.
* Step 3 (draft prose): 4 to 6 hours.
* Step 4 (visuals): 3 to 5 hours, mostly the SVG.
* Step 5 (voice pass): 1 hour.
* Step 6 (review and ship): 30 minutes of Gaurav's time, plus turnaround.
* Step 7 (retro): 15 minutes.

Total: 10 to 14 hours of writer time per lesson, spread across 2 to 3 working days. The bottleneck is almost always step 4. Plan accordingly.

**Working in a worktree.** Each lesson gets its own branch and its own worktree if you want isolation from in flight Phase 1 work. Use the `superpowers:using-git-worktrees` skill or `git worktree add` directly. Worktree path: `../apidocumentation-lesson-<slug>` where slug matches `_data/modules.yml`. Delete the worktree after merge.

**A lesson never breaks the live site, with caveat.** Every rewrite is its own PR on its own branch, deployed via the GitHub Pages workflow only after merge to `master`. CI gates above prevent broken builds from merging. If a Definition of Done item is missed post merge (a bug we did not catch), the rollback is `git revert` on the merge commit. The legacy version of the page no longer exists on disk at that point; the revert restores it.

## Section 6. Visual production pipeline.

Every lesson uses Mermaid, an interactive SVG, and the voice check linter. Without a pipeline they each become bespoke and drift across 36 lessons. This section pins how each is produced and reviewed.

---

**Mermaid diagrams (block 3 of every lesson).**

* **Include and authoring pattern.** Always use `{% include mermaid.html %}`. For multi line diagrams (which is most of them), use Liquid's `capture` block:

  ```liquid
  {% capture mermaid_src %}
  sequenceDiagram
    participant Borrower
    participant Greenfield
    Borrower->>Greenfield: GET /books?q=thriller
    Greenfield-->>Borrower: 200 OK
  {% endcapture %}
  {% include mermaid.html content=mermaid_src %}
  ```

  The include handles lazy loading of the Mermaid runtime and the theme. Writers do not paste raw Mermaid markup outside this pattern.

* **Diagram type by use case.** Flowchart for request lifecycle and state changes. Sequence diagram for client and server back and forth. State diagram for connection or job lifecycle. ER diagram for data relationships. Pick one that fits; do not stack two diagrams in one slot.
* **Limits.** Max 10 nodes per diagram. Max 12 edges. If a diagram needs more, the concept is too big for one diagram and the lesson is teaching too much.
* **Styling and theme.** Mermaid inherits the theme via `assets/js/mermaid-init.js`. The theme uses the four token colors (ink, cream, copper, sage) defined in `tailwind.config.js`. Writers do not override colors in the diagram source. If the theme needs a tweak, change `mermaid-init.js` once; never inline.
* **Labels.** Sentence case. No hyphens. No em dashes. No emoji. No vendor names unless the vendor is the subject. Max five words per label. Numbers as numerals (`200`, `401`).
* **Source of truth.** Mermaid source lives inline in the lesson Markdown so the diagram travels with the lesson. No external `.mmd` files.
* **Version.** Mermaid major version is locked in `_includes/mermaid.html`. Upgrading the major version is a deliberate change recorded in the spec changelog.
* **Accessibility.** The include emits a fallback `<pre>` of the source for screen readers. The Markdown around the diagram describes what the diagram shows in prose; assume some readers will not see the diagram at all.

---

**Interactive SVGs (block 4 of every lesson).**

* **Authoring.** Hand crafted SVG, edited in code (not Illustrator export). Clean DOM, controllable ids, small file sizes. Roughly 80 to 200 lines of SVG per lesson.
* **Storage.**
  * Interactive SVG (one per lesson): `assets/svg/<slug>/main.svg`.
  * Small static illustrations (rare): `assets/svg/<slug>/illustrations/`.
  * No per lesson JS files. Behavior comes from the central framework below.
* **Central framework (Phase 2 prerequisite).** A single `assets/js/interactive-svg.js` supports the four interaction patterns:
  * `click-step`: click to advance through a sequence of states.
  * `hover-tooltip`: hover (or tap on touch devices) reveals a tooltip on labeled elements.
  * `toggle`: toggle between two states (JSON vs XML, legacy vs modern, happy path vs error).
  * `slider`: drag a slider to vary one value.

  Each lesson's SVG declares its pattern via `data-svg-pattern="<pattern>"` on the root `<svg>` element, plus pattern specific config in `data-*` attributes. Per lesson JS is the exception, not the rule, and requires justification in the PR description.
* **Include.** `{% include interactive-svg.html slug="<slug>" alt="<description>" %}` (Phase 2 prerequisite, ships before the pilot). The include inlines the SVG so the framework can address its ids, sets the alt text, and ensures the framework script is loaded.
* **Style.** Strokes 1.5 to 2 pixels. Corners rounded to 4 pixels. Colors only from the four design tokens. Sans serif font set inherited from the page. No drop shadows. No gradients. The aesthetic is editorial diagram, not infographic.
* **Responsive sizing.** Every SVG uses `viewBox="0 0 800 500"` and `preserveAspectRatio="xMidYMid meet"`. CSS sets `max-width: 100%; height: auto;`. Touch targets at least 44 by 44 pixels at any rendered size.
* **Accessibility (required, every SVG).**
  * Keyboard navigable. Tab order explicit via `tabindex`.
  * `aria-label` on every interactive element. Same voice rules as body copy.
  * Focus state visible. A 2 pixel ring in the copper token color.
  * Color is not the only carrier of information. Patterns or labels carry the same data.
  * Static fallback: the SVG's default rendered state (no JS evaluated) is the most common informational state of the diagram. JS layers interactivity on top. If JS fails, the user sees the default state with no broken affordances.
  * `prefers-reduced-motion` respected. Animations degrade to instant state changes.
  * Alt text in the include conveys the same information as the visual.
* **Performance budget.** Total weight of `main.svg` per lesson under 30 kilobytes raw, under 10 kilobytes gzipped. The central JS framework is loaded once per session and cached.
* **Browser support.** Last 2 versions of Chrome, Firefox, Safari, Edge on desktop. iOS Safari 16 and later. Chrome on Android last 2 versions. No IE.

---

**Voice check linter.**

A Ruby script at `scripts/voice-check.rb`. Runs against one or more lesson Markdown files. Single pass, single regex set, fast. Reports every violation. Exits non zero on any hit so it can be a pre commit hook or a CI gate. A bash wrapper at `scripts/voice-check.sh` is allowed for convenience.

What it checks:

1. Hyphens (`-`) in body prose.
2. Em dashes (`—`) anywhere.
3. En dashes (`–`) anywhere.
4. Emoji (any character in the Unicode emoji blocks) anywhere.
5. Phrases from the AI tell ban list (Section 3). Case insensitive.
6. Signoff: lesson ends with `{% include signoff.html %}` on its own line.
7. Frontmatter: `title`, `permalink`, `module`, `lesson`, `slug`, `reading_time`, `description` present and non empty.
8. Block presence: each of the ten template blocks marked with a Liquid comment such as `{% comment %}block:1{% endcomment %}`. All ten present, in order. The Liquid comments are invisible in the rendered output.

Skip rules. The linter ignores violations inside:

* Triple backtick code fences.
* Inline backtick code spans.
* YAML frontmatter (between the leading `---` lines).
* HTML comments (`<!-- ... -->`).
* `<pre>` blocks.
* The URL portion of Markdown link syntax: `[text](url-with-hyphens)`. The bracketed link text is still linted; only the parenthesized URL is skipped.
* Liquid include parameter values (`{% include x.html slug="some-slug" %}`). The Liquid tag itself is skipped end to end.

Anything else is fair game.

What it cannot reliably check (human reviewer's job in Step 6 of Section 5):

* Whether the joke is funny.
* Whether the SVG is keyboard navigable.
* Whether the Mermaid diagram is under 10 nodes (cannot reliably parse Mermaid).
* Whether opinions are named as opinion.

**Installation and use.**

* Pre commit hook (optional, recommended): `.git/hooks/pre-commit` calls the script on changed `_docs/*.md` files.
* CI gate: GitHub Actions workflow runs the script on every Markdown file changed in the PR. CI fails on any violation. Depends on Phase 1 Step 12 being in place; until then, the writer runs the linter locally and pastes the output into the PR description.
* Local one off: `ruby scripts/voice-check.rb _docs/whatisanapi.md`. Violations print to stdout with file and line number.

---

**Phase 2 prerequisites.** See the consolidated list in Section 7. One source of truth.

---

**Forbidden tooling.**

* No image of code. Code is always real text in a fenced block.
* No screenshots of diagrams. Diagrams are Mermaid or SVG, not PNGs.
* No video or GIF for explainers. One interactive SVG and one Mermaid per lesson is the budget.
* No emoji in Mermaid labels, SVG text, or screen reader strings.

## Section 7. Glossary, components, and asset inventory.

Three inventories that have to stay coherent across 36 lessons.

---

**Inventory A. Glossary (`_data/glossary.yml`).**

* **Bar for inclusion.** A term qualifies if it appears in two or more lessons OR if it is a technical word a zero baseline reader would plausibly google. One off jargon used in a single lesson stays inline and does not enter the glossary.
* **Shape.** Each entry is `term`, `definition`, `see_also` (optional list of related glossary terms).
* **Definition style.** Under 30 words. Plain English. Does not explain jargon with more jargon. Voice rules apply (no hyphens, no em dashes, no emoji, no AI tells). If a definition uses another glossary term, link it inline. The canonical secondary link lives in `see_also`.
* **Exemplar entry.**

  ```yaml
  - term: JWT
    definition: A short string the server hands the caller after they sign in. The caller sends it back on every later request to prove they are still the same caller.
    see_also: [Bearer, OAuth]
  ```

* **Linking pattern.** First appearance in a lesson defines the term inline in one short sentence. Every later appearance, in that lesson and across the course, uses `{% include glossary-term.html term="..." %}` inline in body prose, replacing the term in the sentence: "which is why we hand out {% include glossary-term.html term=\"JWT\" %} tokens".
* **Maintenance.** Every PR that introduces a new term adds it to `_data/glossary.yml` in the same PR. The voice linter validates that every linked term exists.
* **Phase 1 seed.** Roughly 15 to 20 terms today (JWT, MCP, LLM, `429`, mTLS, gRPC, SSE, WebSocket, AsyncAPI, Bearer, OAuth, OpenAPI, Webhook, RPC, REST, Schema). Phase 2 grows it organically. Target by end of Phase 2: roughly 120 terms.
* **Greenfield specific names.** Cast names, branch names, products, API resource names do not go in the glossary. They live in the Greenfield bible (Inventory C below).

---

**Inventory B. Components (`_includes/`).**

**Sanctioned components for new and rewritten lessons.**

| Component | Purpose | Authoring pattern |
| --- | --- | --- |
| `callout.html` | All call out boxes. Variants: `tip`, `note`, `warning`, `recap`, `exercise`. | `{% capture body %}...content...{% endcapture %}{% include callout.html variant="warning" body=body %}` (or use the custom Liquid tag from `_plugins/callout_tag.rb` if present: `{% callout warning %}...{% endcallout %}`). Liquid has no `endinclude`; do not use that pattern. |
| `ad-slot.html` | AdSense slot. | `{% include ad-slot.html slot="<id>" format="auto" %}` |
| `glossary-term.html` | Glossary chip, inline in body prose. | `which is why we hand out {% include glossary-term.html term="JWT" %} tokens` |
| `mermaid.html` | Mermaid diagram (block 3). | `{% capture src %}...mermaid source...{% endcapture %}{% include mermaid.html content=src %}` |
| `interactive-svg.html` (Phase 2 prerequisite) | The block 4 interactive SVG. | `{% include interactive-svg.html slug="<slug>" alt="<description>" %}` |
| `openapi-playground.html` | Scalar OpenAPI playground. | `{% include openapi-playground.html spec="/assets/api/greenfield.yaml" %}` |
| `signoff.html` (Phase 2 prerequisite) | Maya's locked signoff at the end of every lesson. | `{% include signoff.html %}` |

**Tombstone components (do not use in rewrites).**

`enhanced_note.html`, `key_takeaways.html`, and the entire `b_exe_*`, `i_exe_*`, `e_exe_*`, `wb_exe_*`, `iwb_exe_*`, `ewb_exe_*` family. They render correctly so legacy lessons still work, but every rewritten lesson replaces calls to them with the sanctioned components above. The migration plan removes the tombstones after the last legacy lesson is rewritten.

---

**Inventory C. Assets, the error catalog, and the Greenfield bible.**

* **Greenfield OpenAPI spec.** Lives at `assets/api/greenfield.yaml`. Ships as part of the pilot rollout (it is a shared asset like the cast, used by any lesson that embeds the playground). v1 covers the resources used in Modules 1 and 2 (books, branches, borrowers). Webhooks land in a `webhooks` section during Module 5. Streaming and GraphQL side specs (`greenfield-streaming.yaml`, `greenfield-graphql.graphql`) appear during Module 6. MCP server config lands at `assets/api/greenfield-mcp.json` during Module 7.
* **Greenfield error catalog.** Canonical at `_data/greenfield-errors.yml`. Every error code referenced in any lesson uses this catalog. Shape per entry: `code` (`books.not_found`), `status` (`404`), `message` (the user facing message), `cause` (one sentence on when it fires), `fix` (one sentence on what the caller should do). The "Errors that actually help" lesson in Module 4 defines and explains this structure; earlier lessons that show error responses pull from it.
* **SVG storage.** Per Section 6: `assets/svg/<slug>/main.svg` (one interactive SVG per lesson). Optional small illustrations at `assets/svg/<slug>/illustrations/`.
* **OG images.** Generated by `scripts/generate-og.mjs` at build time (per Phase 1 Step 10). One per lesson at `assets/images/og/<slug>.png`. No manual placement.
* **Mermaid runtime.** Loaded lazily by `_includes/mermaid.html`. Theme override in `assets/js/mermaid-init.js`. Mermaid major version locked in the include.

**Code sample conventions.**

* Every fenced code block has a language tag. Languages used: `bash`, `http`, `json`, `yaml`, `python`, `javascript`, `xml`.
* Shell snippets use `$` prompt on input lines. Output lines have no prompt.
* Bearer token in cURL examples uses `$GF_TOKEN` environment variable convention, never a literal value: `curl -H "Authorization: Bearer $GF_TOKEN" https://api.greenfield.lib/v1/books`.
* Every sample uses real Greenfield data (a borrower named `lina.varga`, a book id like `bk_184932`, a branch like `branch_north`). No `{"foo": "bar"}` placeholders.
* Multi line code blocks under 30 lines. Longer samples link to a file or get trimmed to the relevant section.

**The Greenfield bible.**

A writer's reference at `docs/superpowers/greenfield-bible.md`. Not part of the published course. The bible is updated in the same PR as the lesson that introduces new details; the PR checklist includes "bible updated" as a tick item.

**Bible entry template.** Each story event is a section:

```markdown
## Module 2, Lesson 7. Devon ships OAuth.
Story date: roughly month 4 at Greenfield.
Event: Devon ships the first OAuth flow so borrower facing apps can reserve books on the user's behalf. Atlas registers as a client the same week.
Characters present: Devon, Maya, Atlas (offstage).
New API entities introduced: /oauth/token, /oauth/authorize, scopes (books:read, books:reserve).
New glossary terms introduced: OAuth, Bearer, scope.
Quote: "We are not building an auth server. We are picking one and reading the docs." (Devon, to Maya.)
```

Other bible sections:

* **Cast.** Names, pronouns, roles, voice quirks, recurring lines they say.
* **Timeline.** All story events in story time order, cross referenced to lesson slugs.
* **API entities.** Canonical names, fields, sample payloads, error codes (with links to `_data/greenfield-errors.yml`).
* **Locked details.** Branch names, borrower names, the booktok creator's handle, partner library names, Atlas's owning company's name. These are locked on first use so they do not drift across lessons.

---

**Consolidated Phase 2 build prerequisites.**

These must exist before the pilot lesson ships. Each is a small task that does not block on the others.

Tier 1 (hard blockers for the pilot itself):

1. `assets/js/mermaid-init.js` (theme override).
2. `_includes/interactive-svg.html` (the include).
3. `assets/js/interactive-svg.js` (the central framework with four interaction patterns).
4. `_includes/signoff.html` (renders `Maya.` on its own line).
5. `callout.html` variant `exercise` (CSS only, reuses the existing include).
6. `scripts/voice-check.rb` and `scripts/voice-check.sh` wrapper.
7. CI workflow stub for the voice linter (depends on Phase 1 Step 12; a local stub is acceptable for the pilot).
8. `docs/superpowers/greenfield-bible.md` skeleton with empty Cast, Timeline, API entities, and Locked details sections.
9. GA4 dashboard or saved exploration that reports time on page, scroll past 75 percent, and bounce per lesson URL. Without this we cannot evaluate pilot success. (Moved out of Section 8 open questions.)
10. Comment widget (giscus) wired and live so the pilot can collect reader feedback on day one. (Moved out of Section 8.)
11. Existing `_data/glossary.yml` swept for em dashes and hyphens that violate the new voice rules, so the linter does not fail on legacy entries the moment the pilot links to them.

Tier 2 (needed by the cohort, not strictly by the pilot):

12. `_data/greenfield-errors.yml` (error catalog seed). First lesson that ships an error response pulls from this.
13. `assets/api/greenfield.yaml` (OpenAPI spec v1 covering books, branches, borrowers). First lesson that embeds the OpenAPI playground depends on this.

The pilot (`whatisanapi.html`, "What an API actually is") is a conceptual lesson and does not embed the playground or an error response, so Tier 2 can land in parallel with the first few cohort lessons.

---

## Section 8. Open questions.

These are decisions deferred to the pilot or its retro rather than locked now. Each has an owner and a trigger. (Two former entries, the GA4 dashboard and the giscus comment widget, were promoted to Section 7 prerequisites because they block the pilot.)

* **OG image template.** Phase 1 Step 10 lists OG image generation but the visual template is unspecified. Phase 2 pilot will surface what the OG image should actually look like for a lesson in Maya's voice. Owner: Gaurav with Claude. Trigger: pilot review.
* **Newsletter integration.** Buttondown was the chosen newsletter tool. Phase 2 lessons may include a "subscribe to get the next lesson on Monday" CTA in the right rail. Decision on whether to add this CTA, and where, is deferred to after the pilot's first two lessons ship.
* **CMS or static.** Currently everything is Markdown. As the course grows, Gaurav may want a lightweight CMS layer (Netlify CMS, Decap CMS, Sveltia). Decision is post pilot.
* **Translations.** Out of scope for Phase 2. Mentioned only to confirm we are deferring.
* **Maya's photo or avatar.** Today Maya is text only. We could ship a small avatar for the signoff and the AI co pilot tip. Decision is post pilot. If we add one, it is a flat illustration in the token palette, not a photo.
* **Atlas's name.** "Atlas" is a placeholder. Gaurav may rename. Decision before Module 1 Lesson 5 ships in Phase 2.2 (Atlas does not appear in the pilot).
* **Whether to publish the bible publicly.** The Greenfield bible is currently a writer's tool, not for readers. As the universe deepens, some readers may want to read it. Decision is post Module 3 ship.

---

## Changelog.

* **2026-05-19. v0.1.** Sections 1 through 4 drafted and locked.
* **2026-05-19. v0.2.** Sections 5, 6, 7 added and locked. Section 8 (open questions) added.
* **2026-05-19. v0.3.** Self review fixes. Cleaned up parallel block numbering in Section 2 (dropped the "block 1.5" and "block 7.5" labels; blocks are simply 1 through 10). Corrected ad slot position references in Sections 2 and 4. Glossary include syntax in Section 2 now includes the `term="..."` parameter. Consolidated the Phase 2 prerequisites under Section 7; Section 6 references it instead of duplicating. Removed a stale mid file Changelog block.
* **2026-05-20. v0.4.** Critical review applied. Lesson count reconciled with `_data/modules.yml`: 43 total (27 existing, 16 placeholders); Phase 2.2 math corrected from "15 existing + 13 placeholders" to "7 existing + 16 placeholders". Bounce rate criterion in Section 4 rewritten ("no more than 5 percentage points higher than legacy" — the previous wording inverted the constraint). Reading time formula in Section 2 corrected to `wc -w / 150 + 3 minutes` so the metric matches the 12 to 18 minute target. Ad slot placement contradiction in Section 4 resolved: lesson Markdown includes the ad slot tags inline at the two named positions; the layout does not auto place them. Block 5 given a 100 to 200 word budget. Diary bridge rule extended with a carve out for Module 1 Lessons 1 and 2 (no prior on screen events to bridge from). Voice linter skip rules extended to cover Markdown link URLs and Liquid include parameter values. Pilot success criteria anchored to the legacy 30 day pre rewrite baseline for the same URL; same permalink means GA4 retains the before number. Definition of Done now explicitly requires `module:` and `lesson:` frontmatter to reconcile with `_data/modules.yml`. Phase 2 prerequisites split into Tier 1 (pilot blockers) and Tier 2 (cohort only); GA4 dashboard, giscus, and the legacy glossary sweep promoted from Section 8 into Tier 1.
