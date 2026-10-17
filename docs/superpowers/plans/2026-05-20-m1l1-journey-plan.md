# Module 1 Lesson 1 ("The internet, the short version") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `_docs/journey.md` in Maya's voice per the v0.2 design spec; ship a working PR with every Definition of Done criterion met from parent spec Section 4.

**Architecture:** Lesson follows the 10-block template; uses one Mermaid sequence diagram (block 3) and one interactive SVG with hover-tooltip pattern (block 4). Establishes Greenfield website canon at `greenfield.lib` distinct from the future `api.greenfield.lib/v1`. Adds two new glossary terms (`caller`, `server`) — three other terms used in block 7 (`request`, `response`, `status code`) already exist in `_data/glossary.yml` from pilot work. A small touch-support patch to `assets/js/interactive-svg.js` lands in the same PR (lift for every future hover-tooltip lesson).

**Tech Stack:** Jekyll, Liquid, Tailwind, Mermaid (lazy-loaded), hand-coded SVG, ES module JavaScript, Ruby (voice linter).

**Spec reference:** [docs/superpowers/specs/2026-05-20-m1l1-journey-design.md](../specs/2026-05-20-m1l1-journey-design.md). The spec is the source of truth for all design decisions; this plan converts the spec into execution steps.

**Plan filename and lifecycle.** This file lives at `docs/superpowers/plans/2026-05-20-m1l1-journey-plan.md`. `docs/superpowers/` is gitignored (see `.gitignore`); the plan is a working note, not a shipping artifact. Lesson content files (`_docs/`, `_data/`, `assets/`) ARE tracked and get committed during the tasks below.

---

## File structure

**Files this plan creates:**

- `assets/svg/journey/main.svg` — the lesson's interactive SVG (7 hover targets on a request/response diagram)
- `docs/superpowers/specs/retros/journey.md` — post-merge retro (gitignored; created in a final task after merge)

**Files this plan modifies:**

- `_docs/journey.md` — full rewrite from legacy 7-step "How the Internet Works" to the 10-block Maya-voice lesson
- `_data/glossary.yml` — append `caller` and `server` entries
- `_data/modules.yml` — update journey entry's `reading: "10 min"` to `"14 min"`
- `assets/js/interactive-svg.js` — patch `initHoverTooltip` for touch support
- `docs/superpowers/greenfield-bible.md` — append M1L1 Timeline entry and three Locked details (gitignored)

**Files this plan deletes (after grep-verifying no other lesson uses them):**

- `assets/gif/commpone.gif`, `assets/gif/commptwo.gif`
- `assets/images/authentication-process.svg`, `assets/images/api-translator.svg`
- `_data/journey_questions.yml`, `_data/web_communication_faqs.yml`

---

## Commit cadence

This plan produces approximately 8 commits on the `rewrite/journey` branch:

1. After Task 3 (glossary additions)
2. After Task 6 (frontmatter + modules.yml + framework patch)
3. After Task 11 (substance blocks: 3, 4, 5, 6)
4. After Task 14 (frame blocks: 1, 2)
5. After Task 17 (back-of-lesson blocks: 7, 8, 9, 10)
6. After Task 18 (ad-slot inserts)
7. After Task 19 (interactive SVG)
8. After Task 20 (legacy cleanup)

Task 21 (voice pass) may commit if fixes are applied. Task 22 (build verify) doesn't commit. Task 23 opens the PR.

All commit messages use `feat(m1l1):` scope, matching the project's recent commit style (`feat(toc):`, `fix(chrome):`, etc.).

---

### Task 1: Branch setup

**Files:**
- No file changes; environment setup only.

- [ ] **Step 1: Confirm clean working tree on master**

Run:
```bash
git status
git log --oneline -3
```

Expected: clean working tree (apart from `_includes/ai-chat.html` modification and `plan2.md` untracked — both pre-existing user work, not part of this PR). Master HEAD should be `1cf8020 feat(toc): finalize 46-lesson curriculum` or later.

If the working tree has other changes, stash or commit them on a separate branch before proceeding.

- [ ] **Step 2: Pull latest master**

Run:
```bash
git pull --ff-only origin master
```

Expected: "Already up to date" or fast-forward summary.

- [ ] **Step 3: Create and switch to feature branch**

Run:
```bash
git checkout -b rewrite/journey
git status
```

Expected: "Switched to a new branch 'rewrite/journey'". Working tree unchanged.

---

### Task 2: Verify legacy data files are journey-only

Resolves Risk #3 from the design spec. Decides which legacy data files are safe to delete in Task 20.

**Files:**
- Read-only inspection. No changes.

- [ ] **Step 1: Grep for journey_questions usage**

Run:
```bash
grep -rn "journey_questions" _docs/ _includes/ _layouts/ _data/ 2>&1
```

Expected: only references inside `_docs/journey.md` itself. If any other lesson references it, write the offending paths into a note and keep the file in Task 20 (only strip the include calls from journey.md).

- [ ] **Step 2: Grep for web_communication_faqs usage**

Run:
```bash
grep -rn "web_communication_faqs" _docs/ _includes/ _layouts/ _data/ 2>&1
```

Expected: only references inside `_docs/journey.md` itself.

- [ ] **Step 3: Grep for the four legacy image/gif assets**

Run:
```bash
grep -rn "commpone.gif\|commptwo.gif\|authentication-process.svg\|api-translator.svg" _docs/ _includes/ _layouts/ 2>&1
```

Expected: only references inside `_docs/journey.md` itself.

- [ ] **Step 4: Record findings**

If all four greps confirm journey-only usage, all six legacy assets are safe to delete in Task 20.

If any asset has references elsewhere, narrow the Task 20 delete-list accordingly and document the exception inline in the spec's Locked decisions log (the spec is gitignored, so this edit doesn't get committed).

---

### Task 3: Add glossary entries (`caller`, `server`)

Per design spec Section 3. Three other terms (`request`, `response`, `status code`) already exist — do NOT modify them.

**Files:**
- Modify: `_data/glossary.yml`

- [ ] **Step 1: Open `_data/glossary.yml` and verify existing entries**

Run:
```bash
grep -n "term:" _data/glossary.yml
```

Expected output includes lines for `"JWT"`, `"MCP"`, `"LLM"`, `"429"`, `"contract"`, `"endpoint"`, `"response shape"`, `"status code"`, `"agent"`, `"request"`, `"response"`. Confirms request/response/status code are already there; do not duplicate.

- [ ] **Step 2: Append the two new entries to `_data/glossary.yml`**

Append these lines at the end of the file (after the existing `response` entry around line 33):

```yaml
- term: "caller"
  definition: "The piece of software that sends a request. A browser, a phone app, a script, or another server can all be callers. Sometimes called the client."
  link: "#"
- term: "server"
  definition: "The piece of software that receives a request and decides what to send back. Sits at a URL the caller knows."
  link: "#"
```

- [ ] **Step 3: Verify YAML parses**

Run:
```bash
ruby -ryaml -e "YAML.load_file('_data/glossary.yml')" && echo "OK"
```

Expected: `OK`. If YAML parse fails, fix indentation (each entry indents at 0 with `-`, fields indent at 2 spaces).

- [ ] **Step 4: Voice-lint the glossary file**

Run:
```bash
ruby scripts/voice-check.rb _data/glossary.yml
```

Expected: exit zero (no violations). If the linter flags the new entries, the new entries themselves are voice-clean — investigate whether the linter mis-handles YAML files and report. If the linter doesn't accept YAML files at all, skip this step and rely on Task 21's full lesson voice pass.

- [ ] **Step 5: Commit**

```bash
git add _data/glossary.yml
git commit -m "$(cat <<'EOF'
feat(m1l1): add caller and server glossary terms

Lesson 1 introduces these alongside the existing request, response,
and status code entries. Definitions match the existing file structure
(quoted strings, link placeholder, no see_also).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Update Greenfield bible (Timeline + Locked details)

Per design spec Section 3. The bible is at `docs/superpowers/greenfield-bible.md` and is gitignored — no commit.

**Files:**
- Modify (gitignored): `docs/superpowers/greenfield-bible.md`

- [ ] **Step 1: Find the existing M1L2 Timeline entry as insertion anchor**

Run:
```bash
grep -n "Module 1, Lesson 2" docs/superpowers/greenfield-bible.md
```

Expected: one match at line 27 (per current state). The new M1L1 entry goes immediately before this line.

- [ ] **Step 2: Insert M1L1 Timeline entry before the M1L2 entry**

Insert this content immediately before the `## Module 1, Lesson 2. Sam suggests an API.` line:

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

(Note the trailing blank line — required to separate from the M1L2 entry that follows.)

- [ ] **Step 3: Append three Locked details**

Find the existing Locked details section (search for `## Locked details`). Append these three bullets at the end of that section, before the `## Open universe questions` heading:

```markdown
- Greenfield public website: `greenfield.lib` (separate from the future `api.greenfield.lib/v1`). Catalog page at `/catalog`.
- Devon's recurring quirk: misses the paper card system, says so periodically.
- Story week 0: the Tuesday afternoon Devon refreshed the catalog (Lesson 1). Story week 1: Sam's visit (Lesson 2 pilot).
```

- [ ] **Step 4: Verify no duplicate Sam entry**

Run:
```bash
grep -c "Sam: an old friend of Devon's" docs/superpowers/greenfield-bible.md
```

Expected: exactly `1`. If `2` or more, the existing Sam entry was duplicated — delete the extra.

- [ ] **Step 5: No commit (file is gitignored)**

Run:
```bash
git status
```

Expected: greenfield-bible.md should not appear in modified/untracked output (gitignored). The bible update is persisted on disk only.

---

### Task 5: Rewrite `_docs/journey.md` frontmatter

Replace the legacy 35-line frontmatter with the lean 10-field version.

**Files:**
- Modify: `_docs/journey.md` (frontmatter only; body content stays for now and gets fully replaced in later tasks)

- [ ] **Step 1: Back up the legacy frontmatter to a temp file for reference**

Run:
```bash
sed -n '1,35p' _docs/journey.md > /tmp/journey-legacy-frontmatter.txt
```

This preserves the legacy frontmatter outside git for reference. The git history also preserves it.

- [ ] **Step 2: Replace the frontmatter block**

Open `_docs/journey.md` and replace lines 1 through the second `---` (the frontmatter delimiter) with this content:

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

`previous_page` is deliberately omitted (M1L1 is the first lesson; `_includes/prev-next.html:3` uses `{% if page.previous_page %}` so the prev link will be hidden cleanly).

- [ ] **Step 3: Verify YAML frontmatter parses and Jekyll picks up the page**

Run:
```bash
bundle exec jekyll build 2>&1 | grep -i "journey\|howinternetworks\|error\|warn" | head -20
```

Expected: page builds without errors. The legacy body content is still in place at this point — that's expected and OK; we replace it in later tasks.

- [ ] **Step 4: Open in browser and confirm the frontmatter changes render**

Run:
```bash
bundle exec jekyll serve --baseurl '' &
```

Open `http://localhost:4000/howinternetworks.html`. Confirm:
- Page title shows "The internet, the short version".
- No "Previous" link in the prev/next nav.
- "Next" link points to "What an API actually is".

Stop the server with `kill %1` when done.

- [ ] **Step 5: No commit yet** — frontmatter change ships with Task 6 in one logical chunk.

---

### Task 6: Update `_data/modules.yml` reading time + apply framework patch

Two small file edits that ship together because they have no internal dependency and combining keeps the commit count down.

**Files:**
- Modify: `_data/modules.yml`
- Modify: `assets/js/interactive-svg.js`

- [ ] **Step 1: Update journey's reading time in `_data/modules.yml`**

Find the journey entry (around line 13) and change `reading: "10 min"` to `reading: "14 min"`:

Before:
```yaml
    - { slug: "howinternetworks.html", title: "The internet, the short version", reading: "10 min" }
```

After:
```yaml
    - { slug: "howinternetworks.html", title: "The internet, the short version", reading: "14 min" }
```

- [ ] **Step 2: Patch `assets/js/interactive-svg.js` `initHoverTooltip` for touch support**

Open `assets/js/interactive-svg.js`. Inside the `targets.forEach(t => { ... })` block (currently lines 83-96), after the four existing handlers (`mouseenter`, `mouseleave`, `focus`, `blur`), add a click handler. Then after the loop closes, add an outside-click dismiss handler.

The full patched function reads:

```javascript
function initHoverTooltip(svg) {
  let tip = svg.querySelector('.svg-tooltip');
  if (!tip) {
    tip = document.createElement('div');
    tip.className = 'svg-tooltip';
    tip.setAttribute('role', 'tooltip');
    tip.style.cssText = 'position:absolute;background:#1B1B1B;color:#F2EFE8;padding:4px 8px;font-size:12px;border-radius:3px;pointer-events:none;display:none;z-index:10;';
    svg.parentElement.style.position = svg.parentElement.style.position || 'relative';
    svg.parentElement.appendChild(tip);
  }

  const targets = svg.querySelectorAll('[data-tooltip]');
  const hide = () => { tip.style.display = 'none'; delete tip.dataset.target; };
  targets.forEach(t => {
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '0');
    const show = () => {
      tip.textContent = t.getAttribute('data-tooltip');
      tip.style.display = 'block';
      t.setAttribute('aria-describedby', 'svg-tip');
      tip.id = 'svg-tip';
      tip.dataset.target = t.getAttribute('data-tooltip');
    };
    t.addEventListener('mouseenter', show);
    t.addEventListener('mouseleave', hide);
    t.addEventListener('focus', show);
    t.addEventListener('blur', hide);
    t.addEventListener('click', (e) => {
      e.stopPropagation();
      const isShownForThis = tip.style.display === 'block' && tip.dataset.target === t.getAttribute('data-tooltip');
      if (isShownForThis) {
        hide();
      } else {
        show();
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!svg.contains(e.target)) hide();
  });
}
```

Key changes vs the original:
- `hide` declared once outside the loop (was inside, but is now needed by both per-target handlers and the outside-click handler).
- Each target gets a `click` handler that toggles show/hide.
- After the loop, a document-level `click` listener hides the tooltip when the user clicks anywhere outside the SVG.
- `show` now records which target is active in `tip.dataset.target` so the toggle works correctly.

- [ ] **Step 3: Manual desktop test**

Run:
```bash
npm run build:css && bundle exec jekyll build
```

The interactive-svg.js patch only matters once an SVG with `data-svg-pattern="hover-tooltip"` exists on a page. Since no such SVG ships in `_site/` yet (the pilot uses `toggle`), there is nothing visual to test at this step. The functional verification happens during Task 19's SVG build.

A pre-emptive smoke check: open any page (e.g. `_site/whatisanapi.html`) in the browser. Confirm the pilot's toggle SVG still works correctly (the patch should not regress other patterns).

- [ ] **Step 4: Commit all three changes**

```bash
git add _docs/journey.md _data/modules.yml assets/js/interactive-svg.js
git commit -m "$(cat <<'EOF'
feat(m1l1): swap frontmatter, update TOC time, patch SVG framework

- Replace journey.md legacy frontmatter (30+ fields) with the lean
  pilot-matching set; omit previous_page (M1L1 is first lesson).
- Update modules.yml reading time from 10 to 14 minutes.
- Add tap-to-reveal + outside-click dismiss to initHoverTooltip in
  interactive-svg.js so the upcoming lesson SVG works on touch
  devices. Benefits every future hover-tooltip lesson.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Strip legacy body content from `_docs/journey.md`

The legacy file's body (everything after the frontmatter) is ~440 lines of bespoke content: GIF embeds, inline ad scripts, interactive HTML/CSS/JS demo, author CTA, FAQ/quiz/related-resources includes. All of it gets replaced by the 10-block template. This task zeroes out the body so subsequent tasks can build it up clean.

**Files:**
- Modify: `_docs/journey.md`

- [ ] **Step 1: Confirm the frontmatter is intact at the top**

Run:
```bash
head -13 _docs/journey.md
```

Expected: the lean 10-field frontmatter from Task 5. If something looks wrong, re-do Task 5.

- [ ] **Step 2: Replace everything after the frontmatter with a working skeleton**

Open `_docs/journey.md`. Keep lines 1-13 (the frontmatter, ending with the second `---`). Replace everything below with this skeleton:

```markdown

{% comment %}block:1{% endcomment %}
<!-- DRAFT block 1: diary opener. Will be filled in Task 12. -->

{% comment %}block:2{% endcomment %}
<!-- DRAFT block 2: today you will leave with. Will be filled in Task 13. -->

<!-- AD SLOT 1 (between blocks 2 and 3) inserted in Task 18 -->

{% comment %}block:3{% endcomment %}
<!-- DRAFT block 3: what just happened. Will be filled in Task 8. -->

{% comment %}block:4{% endcomment %}
<!-- DRAFT block 4: how we document it. Will be filled in Task 9. -->

{% comment %}block:5{% endcomment %}
<!-- DRAFT block 5: try it on Greenfield. Will be filled in Task 10. -->

{% comment %}block:6{% endcomment %}
<!-- DRAFT block 6: the trap. Will be filled in Task 11. -->

{% comment %}block:7{% endcomment %}
<!-- DRAFT block 7: words for standups. Will be filled in Task 14. -->

{% comment %}block:8{% endcomment %}
<!-- DRAFT block 8: AI co-pilot tip. Will be filled in Task 15. -->

<!-- AD SLOT 2 (between blocks 8 and 9) inserted in Task 18 -->

{% comment %}block:9{% endcomment %}
<!-- DRAFT block 9: before you go. Will be filled in Task 16. -->

{% comment %}block:10{% endcomment %}
<!-- DRAFT block 10: next week + signoff. Will be filled in Task 17. -->
```

The Liquid `{% comment %}block:N{% endcomment %}` markers are required by the voice linter (parent spec Section 6, check #8).

- [ ] **Step 3: Build to confirm the skeleton renders without errors**

Run:
```bash
bundle exec jekyll build 2>&1 | grep -i "error\|warn" | head -10
```

Expected: no errors. Warnings about missing includes should be zero because the skeleton uses no includes yet.

- [ ] **Step 4: No commit** — the skeleton is incomplete content; ships with Task 11's commit.

---

### Task 8: Draft block 3 (What just happened) with Mermaid

Block 3 is the lesson's substance: defines request, response, status code, plus the caller-is-software point. ~300 words plus the Mermaid diagram.

**Files:**
- Modify: `_docs/journey.md` (replace the block 3 placeholder)

- [ ] **Step 1: Draft block 3 prose**

Replace the line `<!-- DRAFT block 3: what just happened. Will be filled in Task 8. -->` (under the `{% comment %}block:3{% endcomment %}` marker) with the block 3 content. Required elements per the design spec:

- An H2 heading in sentence case (e.g., "What just happened, exactly").
- Three to five short paragraphs explaining request, response, and status code in plain English.
- One sentence introducing the caller-is-software point: "Sometimes the caller is your browser. Sometimes it is a phone app you opened this morning. Sometimes it is a script someone wrote to back up their photos. The web does not care which."
- Define each of the five glossary terms (`caller`, `request`, `response`, `status code`, `server`) inline the first time they appear, in one short sentence each. Later appearances in this same lesson get the Liquid glossary chip.
- The Mermaid sequence diagram (see step 2).
- One thought-checkpoint sentence at or near the end: "Look at the diagram. Which arrow is the request?"

Total target: 200-400 words. Voice rules from parent spec Section 3 apply (no em dashes, no hyphens in prose, no AI tells, second person to the apprentice, names not roles).

- [ ] **Step 2: Insert the Mermaid sequence diagram**

After the second or third paragraph of block 3 prose (placement to be decided during draft), insert:

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

- [ ] **Step 3: Voice-lint check**

Run:
```bash
ruby scripts/voice-check.rb _docs/journey.md
```

Expected: any violations from block 3 prose are visible. Fix each one. Common targets: hyphens in compound modifiers (rewrite to remove), em dashes (replace with period + new sentence), banned phrases ("crucial", "delve", etc.).

- [ ] **Step 4: Re-run linter, confirm clean for this block**

Re-run the linter from step 3 until it exits zero (other unfilled blocks may still have placeholder content — the linter should not flag HTML comments per spec Section 6 skip rules).

- [ ] **Step 5: Build to confirm Mermaid renders**

Run:
```bash
bundle exec jekyll build
```

Open `_site/howinternetworks.html` in the browser. Confirm:
- Block 3 prose appears in correct order.
- Mermaid diagram renders with the four nodes.
- The "200 OK with HTML" message displays correctly (no parser quirk per Risk #12).

If Mermaid mangles the `with` keyword in the message, wrap the response message in quotes: `Greenfield-->>Browser: "200 OK with HTML"`.

- [ ] **Step 6: No commit yet** — substance blocks 3, 4, 5, 6 ship together in Task 11's commit.

---

### Task 9: Draft block 4 (How we document it) with SVG placeholder

Block 4 teaches the atomic unit of API documentation: one labeled request + one labeled response. ~500 words plus the interactive SVG placeholder. The actual SVG is built in Task 19; this task uses an HTML comment placeholder and the `{% include interactive-svg.html %}` call.

**Files:**
- Modify: `_docs/journey.md` (replace the block 4 placeholder)

- [ ] **Step 1: Draft block 4 prose**

Replace the block 4 placeholder line. Required elements:

- H2 heading in sentence case (e.g., "How we write down one interaction").
- Open with the pattern statement: the smallest useful artifact a writer of API documentation can produce is a description of one interaction. Two messages: what the caller sent and what came back.
- Identify the four pieces: method, path, status code, body. Method, headers, status code are mentioned as details that support the path; do NOT teach HTTP methods in depth (deferred to Module 2 Lesson 1).
- Include Maya's locked opinion paragraph verbatim: "Personally, I would always lead with the path. The path tells the caller what they are looking for. Method and status code tell you how the question was asked and how it was answered. Everything else is detail."
- One sentence clarifying that the catalog page is part of Greenfield's public website (`greenfield.lib`) and is not an API. The future API ships in a few lessons at `api.greenfield.lib/v1`. Per Risk #10 mitigation.
- The two HTTP code samples (see step 2).
- The interactive SVG include (see step 3).
- One sentence on what the reader learned by looking at the SVG.

Total target: 400-700 words.

- [ ] **Step 2: Insert the request and response HTTP code samples**

After the four-pieces sentence, add these two fenced blocks:

````markdown
The request:
```http
GET /catalog HTTP/1.1
Host: greenfield.lib
```

The response:
```http
HTTP/1.1 200 OK
Content-Type: text/html

<html>...</html>
```
````

- [ ] **Step 3: Insert the interactive SVG placeholder**

After the response code sample, insert:

```liquid
{% include interactive-svg.html slug="journey" alt="Two cards labeled REQUEST and RESPONSE. The request card shows GET /catalog with the Host header. The response card shows the 200 OK status, the Content-Type header, and the HTML body. Hover or tap any element to see what it is." %}
```

The actual SVG file at `assets/svg/journey/main.svg` is created in Task 19. Until then, the include resolves to a missing-file warning — that's expected and gets resolved when Task 19 finishes.

- [ ] **Step 4: Voice-lint check**

Run:
```bash
ruby scripts/voice-check.rb _docs/journey.md
```

Fix any violations from block 4 prose.

- [ ] **Step 5: No commit yet** — bundled with Task 11.

---

### Task 10: Draft block 5 (Try it on Greenfield exercise)

Block 5 is the five-minute terminal task. ~130 words. Rendered as a callout with `variant="exercise"`.

**Files:**
- Modify: `_docs/journey.md` (replace the block 5 placeholder)

- [ ] **Step 1: Draft block 5 with the exercise callout**

Replace the block 5 placeholder with:

```liquid
## Try it on Greenfield

{% capture exercise %}
**Five minutes, in your terminal.**

Greenfield does not have an API for you to call yet. We will get there. In the meantime, every public web server speaks the same request and response shape.

Pick any public API you have heard of. If you do not have one in mind, run this:

```bash
curl -v https://api.github.com
```

In the verbose output, find:

- A line starting with `>` showing what you sent.
- A line starting with `< HTTP/` showing the status code.
- The JSON body at the end.

Then write one sentence. For example: "I sent GET / to api.github.com. The server responded with 200 OK and a JSON body listing the available endpoints."

If you can write that sentence in your own words, you have written your first atomic unit of API documentation.

If you see `403 rate limit exceeded`, switch to another public API and try again. GitHub caps unauthenticated traffic at 60 requests an hour per IP.
{% endcapture %}
{% include callout.html variant="exercise" body=exercise %}
```

Word count target: 100-200 words. The rate-limit fallback sentence is required (Risk #6 mitigation; locked in design spec).

- [ ] **Step 2: Voice-lint check**

Run:
```bash
ruby scripts/voice-check.rb _docs/journey.md
```

Note: the linter should skip content inside fenced code blocks (parent spec Section 6 skip rules). The `curl -v` command inside the bash fence is a legitimate code use of a hyphen.

- [ ] **Step 3: Build and visually verify the exercise callout renders**

Run:
```bash
bundle exec jekyll build
```

Open `_site/howinternetworks.html` in the browser. Confirm the exercise callout renders with:
- The "Try this" label (per callout.html exercise variant).
- Copper accent color.
- The code block formatted correctly.

- [ ] **Step 4: No commit yet** — bundled with Task 11.

---

### Task 11: Draft block 6 (The trap) and commit the four substance blocks

Block 6 is Devon's "couple hundred requests" observation. ~165 words. Rendered as a callout with `variant="warning"`.

**Files:**
- Modify: `_docs/journey.md` (replace the block 6 placeholder; then commit blocks 3+4+5+6 together)

- [ ] **Step 1: Draft block 6 with the warning callout**

Replace the block 6 placeholder with:

```liquid
## The trap nobody warns you about

{% capture trap %}
The trap is thinking of "the internet" as one transaction.

When you visit the Greenfield catalog page, your browser does not send one request. It sends about sixty. One for the HTML, one for the stylesheet, one for the logo, one for each book cover, one for the analytics script, one for the font file. By the time the page is rendered, there is a long ledger of requests and responses in your browser's network panel.

Devon's version, which he says approximately once a month: "When you say 'I visited a website', what you actually did was send a couple hundred requests. The illusion of one transaction is the browser's job, not the internet's."

This matters for documentation. When a caller says "the page failed", they usually mean one specific request in that ledger failed. The whole page rarely fails as a unit. As a writer, your job is to make the ledger inspectable.
{% endcapture %}
{% include callout.html variant="warning" body=trap %}
```

Word count target: 100-200 words. Voice constraint: the per-page-load enumeration uses commas inside one sentence, not consecutive fragments (parent spec Section 3 fragment cap).

- [ ] **Step 2: Voice-lint full file (blocks 3, 4, 5, 6 drafted)**

Run:
```bash
ruby scripts/voice-check.rb _docs/journey.md
```

Fix every violation. Re-run until clean.

- [ ] **Step 3: Local build verify**

Run:
```bash
bundle exec jekyll build
```

Expected: no errors. Open `_site/howinternetworks.html` and confirm blocks 3-6 render correctly with their callouts/Mermaid.

- [ ] **Step 4: Commit the four substance blocks**

```bash
git add _docs/journey.md
git commit -m "$(cat <<'EOF'
feat(m1l1): draft substance blocks 3 to 6

- Block 3 (what just happened): defines request, response, status code,
  caller-is-software; Mermaid sequence diagram.
- Block 4 (how we document it): the atomic unit pattern; HTTP request
  and response code samples; interactive-svg include (SVG file lands
  in Task 19).
- Block 5 (try it on Greenfield): five-minute curl exercise against a
  public API; rate-limit fallback sentence.
- Block 6 (the trap): Devon's couple-hundred-requests observation;
  fragment cap respected.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 12: Draft block 1 (Diary opener)

The frame is written after the substance. Block 1 sets Maya's voice for the entire course.

**Files:**
- Modify: `_docs/journey.md` (replace the block 1 placeholder)

- [ ] **Step 1: Draft block 1**

Replace the block 1 placeholder with the diary opener. Required elements per the design spec:

- 60-120 words.
- Specific scene: Tuesday afternoon, back office at Greenfield, Maya watches Devon refresh the staff catalog page.
- Concrete detail: "Three books had been borrowed since lunch. The page already knew."
- Devon's dry one-liner (the earned joke): "It used to be paper. I miss the paper. Don't tell Priya."
- Maya's credibility line: "I have written API documentation for ten years and I had never thought to ask the question that came to me at that moment."
- The pivot to the apprentice: closes with a sentence that names what the reader will learn ("That 'something else' is the part of the web that everyone uses and nobody learns. Today is the day you learn it.").

Tense: present in the opener voice; the recollection is past-tense.

Voice constraints: maximum 5 first-person sentences in the whole lesson (the opener uses 2-3); no hyphens, em dashes, en dashes, or emoji; one earned joke total per lesson, and this is it (so block 6's Devon line should NOT be construed as the joke — it's an observation per voice spec).

- [ ] **Step 2: Voice-lint check**

Run:
```bash
ruby scripts/voice-check.rb _docs/journey.md
```

Fix any violations.

- [ ] **Step 3: Read out loud at desk volume**

Per parent spec Section 5 Step 5: read block 1 out loud. Where you stumble, the sentence is wrong. Rewrite. Re-read.

- [ ] **Step 4: No commit yet** — frame blocks 1+2 ship together in Task 14.

---

### Task 13: Draft block 2 (Today you will leave with)

The three-bullet learning outcomes block. Under 30 words total.

**Files:**
- Modify: `_docs/journey.md` (replace the block 2 placeholder)

- [ ] **Step 1: Draft block 2**

Replace the block 2 placeholder with:

```markdown
## Today you will leave with

- Request, response, and status code in plain English.
- The atomic unit. How to describe one interaction in writing.
- An AI prompt that turns a `curl -v` dump into labels.
```

Word count: 29 words across the three bullets. No em dashes (uses periods to separate the two sentences in bullet 2).

- [ ] **Step 2: Voice-lint check**

Run:
```bash
ruby scripts/voice-check.rb _docs/journey.md
```

Expected: exit zero. The `curl -v` hyphen is in code (backticked), which the linter should skip.

- [ ] **Step 3: No commit yet** — bundled with Task 14.

---

### Task 14: Commit frame blocks 1 + 2

**Files:**
- No new modifications; commits the changes from Tasks 12 and 13.

- [ ] **Step 1: Full file voice-lint check**

Run:
```bash
ruby scripts/voice-check.rb _docs/journey.md
```

Expected: clean across all drafted blocks so far (1, 2, 3, 4, 5, 6).

- [ ] **Step 2: Local build verify**

Run:
```bash
bundle exec jekyll build
```

Open `_site/howinternetworks.html`. Confirm the lesson opens cleanly with the diary scene and the three-bullet learning outcomes.

- [ ] **Step 3: Commit blocks 1 and 2**

```bash
git add _docs/journey.md
git commit -m "$(cat <<'EOF'
feat(m1l1): draft frame blocks 1 and 2

- Block 1 (diary opener): Tuesday afternoon, back office, Devon and
  the staff catalog page. Devon's earned joke about the paper.
  Maya's ten-year credibility line. Pivot to the apprentice.
- Block 2 (today you will leave with): three bullets, 29 words.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 15: Draft block 7 (Words you can drop in standups)

Five glossary terms with "use this when you mean" formulations.

**Files:**
- Modify: `_docs/journey.md` (replace the block 7 placeholder)

- [ ] **Step 1: Draft block 7 with glossary chips**

Replace the block 7 placeholder with:

```liquid
## Words you can drop in standups now

- {% include glossary-term.html term="caller" %}: Use this when you mean the software making the request, whatever it is. "The caller is misbehaving" works for a browser, a mobile app, or a script. You will also hear "client" used the same way; we use "caller" in this course.
- {% include glossary-term.html term="request" %}: Use this when you mean what the caller sent. "Did the request go through?" is more precise than "did it work?"
- {% include glossary-term.html term="response" %}: Use this when you mean what came back from the server. "What did the response say?" beats "what did the page say?"
- {% include glossary-term.html term="status code" %}: Use this when you want to be specific about what the server said. "We got a 404" is more useful than "the call failed".
- {% include glossary-term.html term="server" %}: Use this when you mean the software that receives the request and decides what to send back. "Server returned a 500" is more useful than "the website broke".
```

Five terms, each a glossary chip. Order matches the lesson's narrative flow (caller first, then the messages, then the receiver).

- [ ] **Step 2: Voice-lint check**

Run:
```bash
ruby scripts/voice-check.rb _docs/journey.md
```

Expected: clean. Glossary chip Liquid is skipped by the linter per spec Section 6.

- [ ] **Step 3: No commit yet** — bundled with Task 17.

---

### Task 16: Draft block 8 (AI co-pilot tip)

GPT prompt for turning a `curl -v` dump into labeled output.

**Files:**
- Modify: `_docs/journey.md` (replace the block 8 placeholder)

- [ ] **Step 1: Draft block 8**

Replace the block 8 placeholder with content following the pilot's four-part shape (situation / prompt / what to expect / what to watch for):

```markdown
## Today's prompt for your AI assistant

GPT, this time.

**The situation.** You ran your first `curl -v` and the output scrolled past more lines than you expected. Some lines start with `>`, some with `<`, some with `*`. You can read a few of them. Most look like a wall of text.

**The prompt, exactly as written:**

```text
Below is the verbose output of a curl command. Label every line as either request, response, or metadata. For each line, in one sentence, say what the line is telling me. Do not summarize. Label line by line.

OUTPUT:
[paste curl output here]
```

**What to expect back.** A line by line annotation. The first lines (starting with `*`) are usually connection setup: DNS resolution, TLS handshake. Lines starting with `>` are what your terminal sent to the server. Lines starting with `<` are what the server sent back. After the response headers there is usually a blank line, then the body.

**What to watch for.** GPT will sometimes collapse repetitive lines into one with "... (and so on)". Ask it to expand if you want every line. GPT may also add commentary about what "should" come next. Ignore the speculation. Trust only the lines that are actually in your output.
```

Word count target: 150-250 words. Voice: practical, no hype, no promise of magic.

- [ ] **Step 2: Voice-lint check**

Run:
```bash
ruby scripts/voice-check.rb _docs/journey.md
```

Fix any violations. Watch specifically for "line by line" appearing without hyphens (since "line-by-line" with hyphens is a banned compound modifier per spec).

- [ ] **Step 3: No commit yet** — bundled with Task 17.

---

### Task 17: Draft blocks 9 and 10 + commit back-of-lesson blocks

Block 9 is the one-sentence self-check. Block 10 is the one-sentence teaser plus signoff.

**Files:**
- Modify: `_docs/journey.md` (replace blocks 9 and 10 placeholders; commit 7+8+9+10 together)

- [ ] **Step 1: Draft block 9**

Replace the block 9 placeholder with:

```markdown
## Before you go

Suppose Greenfield wanted to make its catalog available the way GitHub does. Where would that conversation start?

Answer it in your head before you read the next lesson.
```

No answer key in the lesson. The reader's silent answer is the next lesson's opening sentence.

- [ ] **Step 2: Draft block 10 with signoff**

Replace the block 10 placeholder with:

```liquid
## Next week at Greenfield

By next Tuesday, an old friend of Devon's stops by the branch with a returned book and a question.

{% include signoff.html %}
```

Signoff renders `Maya.` on its own line.

- [ ] **Step 3: Voice-lint check on the now-complete file**

Run:
```bash
ruby scripts/voice-check.rb _docs/journey.md
```

Expected: clean. All ten blocks drafted, all ten Liquid block-N comment markers present, file ends with the signoff include.

- [ ] **Step 4: Local build verify and full read-through**

Run:
```bash
bundle exec jekyll build
bundle exec jekyll serve --baseurl '' &
```

Open `http://localhost:4000/howinternetworks.html`. Read the entire lesson top to bottom. Confirm:
- Diary opener flows naturally.
- All H2 headings are in sentence case.
- The interactive SVG include shows as a "missing file" warning (expected — SVG file lands in Task 19).
- The Mermaid diagram renders.
- The two callouts (exercise, warning) render with the correct labels and accents.
- The five glossary chips in block 7 render correctly.
- The signoff shows `Maya.` on its own line.

Stop the server: `kill %1`.

- [ ] **Step 5: Commit the back-of-lesson blocks**

```bash
git add _docs/journey.md
git commit -m "$(cat <<'EOF'
feat(m1l1): draft back-of-lesson blocks 7 to 10

- Block 7 (standup words): caller, request, response, status code,
  server as glossary chips.
- Block 8 (AI co-pilot tip): GPT prompt for labeling a curl -v dump
  line by line. Starts the lesson-by-lesson tool rotation since
  the pilot used Claude.
- Block 9 (self-check): one question that bridges to the pilot's
  Sam-suggests-an-API opener.
- Block 10 (teaser + signoff): one-sentence teaser; signoff include.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 18: Insert ad-slot includes between blocks 2-3 and 8-9

Per parent spec Section 4 DoD and design spec Section 4 Step 7.

**Files:**
- Modify: `_docs/journey.md` (insert two ad-slot includes)

- [ ] **Step 1: Insert the first ad-slot between blocks 2 and 3**

In `_docs/journey.md`, find the comment `<!-- AD SLOT 1 (between blocks 2 and 3) inserted in Task 18 -->` (still present from Task 7's skeleton). Replace it with:

```liquid
{% include ad-slot.html slot="2222222222" format="auto" %}
```

- [ ] **Step 2: Insert the second ad-slot between blocks 8 and 9**

Find the comment `<!-- AD SLOT 2 (between blocks 8 and 9) inserted in Task 18 -->`. Replace it with:

```liquid
{% include ad-slot.html slot="3333333333" format="auto" %}
```

Slot IDs match the pilot. Parent spec prescribes semantic IDs (`lesson-mid-1` / `lesson-mid-2`); the pilot does not use them. The PR description should mention this as a spec/reality discrepancy for Gaurav to weigh in on.

- [ ] **Step 3: Build and verify ads render (in production mode only)**

Run:
```bash
bundle exec jekyll build
```

Open `_site/howinternetworks.html`. In development mode the `ad-slot.html` include is wrapped in `{% if site.adsense.enabled_in_dev or jekyll.environment == 'production' %}` — ads will not render locally unless `enabled_in_dev` is set. That's expected. CI builds with `JEKYLL_ENV=production` and ads will render in the deployed site.

- [ ] **Step 4: Commit the ad-slot inserts**

```bash
git add _docs/journey.md
git commit -m "$(cat <<'EOF'
feat(m1l1): insert ad-slot includes between blocks 2-3 and 8-9

Matches pilot's numeric slot IDs (2222222222, 3333333333). Parent
spec prescribes semantic IDs; pilot does not use them. Flagged as
spec/reality discrepancy in the PR description.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 19: Build the interactive SVG

The lesson's interactive SVG with seven hover/tap targets. Lives at `assets/svg/journey/main.svg`. Half-day budget per parent spec Section 5 Step 4.

**Files:**
- Create: `assets/svg/journey/main.svg`

- [ ] **Step 1: Create the directory**

Run:
```bash
mkdir -p assets/svg/journey
```

- [ ] **Step 2: Draft the SVG**

Create `assets/svg/journey/main.svg`. Required structure:

- Root element: `<svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" data-svg-pattern="hover-tooltip" xmlns="http://www.w3.org/2000/svg">`.
- Style block (inline `<style>`): defines token colors (ink #1B1B1B, cream #F2EFE8, copper #B45F3B, sage #6B8E7F), stroke widths 1.5-2px, corners rounded 4px, font sans-serif inherited.
- Two card rectangles side by side: REQUEST card on the left (x=20, width=360), RESPONSE card on the right (x=420, width=360). Heights vary by content; ~250px each.
- A horizontal arrow between the cards at vertical mid-point showing direction (caller → server for the request, with a return arrow at a slightly lower y for the response).
- Inside the REQUEST card, three text lines: `GET /catalog HTTP/1.1` and `Host: greenfield.lib`. Within those lines, four interactive groups: `GET`, `/catalog`, `HTTP/1.1`, `Host: greenfield.lib`. Each group is `<g tabindex="0" role="button" data-tooltip="..." aria-label="...">`.
- Inside the RESPONSE card, three text lines: `HTTP/1.1 200 OK`, `Content-Type: text/html`, and `<html>...</html>`. Within those lines, three interactive groups: `200 OK`, `Content-Type: text/html`, `<html>...</html>`. Each group is `<g tabindex="0" role="button" data-tooltip="..." aria-label="...">`.
- Tab order: GET → /catalog → HTTP/1.1 → Host → 200 OK → Content-Type → body. Use sequential DOM order so default tab navigation works.
- Default static state: each labeled element has a small underline or accent that hints at interactivity. With JS off, the SVG is still readable.
- Focus styling in the inline `<style>` block: `g[tabindex="0"]:focus { outline: 2px solid #B45F3B; outline-offset: 2px; }`.
- `@media (prefers-reduced-motion: reduce) { transition: none; }` to respect reduced motion.

Tooltip text for each target (copied verbatim from design spec Section 2):

| `data-tooltip` value | aria-label value |
|---|---|
| The HTTP method. The verb. We will cover methods properly in Module 2. | (same) |
| The path. What the caller is asking about. Lesson 1's main idea. | (same) |
| The protocol and version. The shape of the conversation, agreed once and reused. | (same) |
| Tells the server which site you mean, in case one machine hosts many. | (same) |
| The status code. Three digits and a short phrase. 200 means it worked. | (same) |
| A header naming the kind of body coming back. HTML in this case. | (same) |
| The body. What the caller actually wanted. HTML, JSON, an image. Anything. | (same) |

Set both `data-tooltip` and `aria-label` to the same string so screen readers and visual tooltips match.

- [ ] **Step 3: Check file size**

Run:
```bash
wc -c assets/svg/journey/main.svg
```

Expected: under 12,000 bytes (12 KB target). Ceiling 30,000 bytes (30 KB). If over 12 KB, use `<symbol>` + `<use>` for any repeated visual element (e.g. card backgrounds) and consolidate the inline `<style>` block.

- [ ] **Step 4: Build and test on desktop**

Run:
```bash
bundle exec jekyll build
bundle exec jekyll serve --baseurl '' &
```

Open `http://localhost:4000/howinternetworks.html`. Confirm:
- Block 4's SVG renders (no missing-file warning anymore).
- Hovering each of the seven targets shows the correct tooltip.
- Tab key cycles through the seven targets in the expected order.
- Tab focus shows a copper outline.
- Pressing Enter or Space on a focused target shows the tooltip; pressing again (or Tab away) hides it.

- [ ] **Step 5: Test on Chrome dev-tools touch emulation**

In Chrome devtools, toggle device emulation (Cmd+Shift+M / Ctrl+Shift+M). Pick a touch-capable device (iPhone, Pixel). Reload the lesson page. Confirm:
- Tapping any of the seven targets shows the tooltip (touch support patch from Task 6 is what enables this).
- Tapping the same target again hides the tooltip.
- Tapping outside the SVG hides any open tooltip.

If tapping doesn't work, re-inspect the Task 6 patch — the `click` handler should fire on tap.

- [ ] **Step 6: Test on at least one real touch device**

Open the served URL on a real phone or tablet on the local network (use the laptop's IP, not localhost). Confirm the same tap behavior as devtools emulation.

If no real device is available, document the limitation and re-test post-deploy on the live production URL.

Stop the server: `kill %1`.

- [ ] **Step 7: Commit the SVG**

```bash
git add assets/svg/journey/main.svg
git commit -m "$(cat <<'EOF'
feat(m1l1): add interactive SVG with 7 hover-tooltip targets

assets/svg/journey/main.svg renders a labeled request/response
diagram with 7 interactive elements (method, path, protocol, host,
status, content-type, body). Uses the hover-tooltip pattern from
assets/js/interactive-svg.js (patched for touch support in earlier
commit). Tab order intentional, focus ring in copper token,
prefers-reduced-motion respected. File weight under 12 KB.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 20: Legacy asset cleanup

Delete the six unused legacy assets confirmed journey-only in Task 2.

**Files:**
- Delete: 4 files in `assets/` and 2 files in `_data/`.

- [ ] **Step 1: Delete the legacy GIFs and images**

Run:
```bash
git rm assets/gif/commpone.gif assets/gif/commptwo.gif
git rm assets/images/authentication-process.svg assets/images/api-translator.svg
```

If any of these were flagged as referenced elsewhere in Task 2, skip the corresponding `git rm` and leave the file in place.

- [ ] **Step 2: Delete the legacy data files**

Run:
```bash
git rm _data/journey_questions.yml _data/web_communication_faqs.yml
```

If either was flagged as referenced elsewhere in Task 2, skip and leave in place.

- [ ] **Step 3: Verify the build still passes after deletions**

Run:
```bash
bundle exec jekyll build 2>&1 | grep -i "error\|warn" | head -10
```

Expected: no new errors or warnings. The deletions should have no downstream effect because the journey.md rewrite no longer references them.

- [ ] **Step 4: Commit the cleanup**

```bash
git commit -m "$(cat <<'EOF'
feat(m1l1): remove legacy journey assets and data files

Deleted (verified journey-only in earlier grep):
- assets/gif/commpone.gif, assets/gif/commptwo.gif
- assets/images/authentication-process.svg
- assets/images/api-translator.svg
- _data/journey_questions.yml
- _data/web_communication_faqs.yml

The legacy includes (optimized-image.html, faq-section.html,
key_takeaways.html, quiz.html, related_resources.html) stay in
_includes/ because other legacy lessons still use them; they get
removed in Phase 3.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

---

### Task 21: Final voice pass

A read-out-loud check + linter pass on the entire file, post all block drafts.

**Files:**
- Possibly modify: `_docs/journey.md` (fix any voice issues caught on the read-through)

- [ ] **Step 1: Run the voice linter on the complete file**

Run:
```bash
ruby scripts/voice-check.rb _docs/journey.md
```

Expected: exit zero. If any violations remain at this point, they should be in connecting prose only — fix each one.

- [ ] **Step 2: Read the lesson out loud at desk volume**

Per parent spec Section 5 Step 5. Where you stumble, the sentence is wrong. Rewrite the stumble. Read again from the previous paragraph.

- [ ] **Step 3: Re-read silently with "would Maya write this"**

For each paragraph, ask: would Maya actually write this sentence? Cut what fails.

- [ ] **Step 4: Final linter pass**

Run:
```bash
ruby scripts/voice-check.rb _docs/journey.md
```

Expected: clean.

- [ ] **Step 5: Commit any final fixes (if applied)**

```bash
git status _docs/journey.md
```

If the file shows as modified:
```bash
git add _docs/journey.md
git commit -m "$(cat <<'EOF'
feat(m1l1): voice pass polish

Read-aloud pass plus final linter pass; fixed stumbles in connecting
prose.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```

If no changes were needed, skip the commit.

---

### Task 22: Local build verification

Final pre-PR sanity check.

**Files:**
- No changes; verification only.

- [ ] **Step 1: Clean build**

Run:
```bash
npm run build:css && bundle exec jekyll build
```

Expected: both commands exit zero. Tailwind CSS regenerated; Jekyll site builds.

- [ ] **Step 2: HTMLProofer on the new lesson**

If HTMLProofer is configured in the project:
```bash
bundle exec htmlproofer _site/howinternetworks.html --no-enforce-https --disable-external 2>&1 | head -20
```

Expected: no errors. If HTMLProofer is not configured locally, skip this step — CI will run it.

- [ ] **Step 3: Browser preview at desktop and mobile widths**

Run:
```bash
bundle exec jekyll serve --baseurl '' &
```

Open `http://localhost:4000/howinternetworks.html`. Read end-to-end at desktop width. Then resize browser to mobile width (~375px). Re-read at mobile width.

Confirm at both widths:
- Diary opener legible and well-paced.
- Mermaid diagram fits.
- Code samples are readable (no horizontal scroll on mobile).
- Exercise callout renders with "Try this" label.
- Warning callout renders.
- Interactive SVG fits the screen; targets are tap-friendly (44×44 px minimum).
- Glossary chips render.
- Signoff shows `Maya.` on its own line.
- No "Previous" link, "Next" link points to "What an API actually is".

Stop the server: `kill %1`.

- [ ] **Step 4: Final git status check**

Run:
```bash
git status
git log --oneline rewrite/journey..master 2>/dev/null || git log --oneline master..rewrite/journey
```

Expected: clean working tree. The `rewrite/journey` branch should have ~7-8 commits ahead of master, in the cadence specified at the top of this plan.

---

### Task 23: Push branch and open PR

**Files:**
- No file changes; GitHub PR creation.

- [ ] **Step 1: Push the branch to origin**

```bash
git push -u origin rewrite/journey
```

- [ ] **Step 2: Open the PR with the DoD checklist**

Run:
```bash
gh pr create --title "Rewrite: The internet, the short version" --body "$(cat <<'EOF'
## Summary

Rewrites Module 1 Lesson 1 (`_docs/journey.md`) in Maya's voice per the v0.2 design spec at `docs/superpowers/specs/2026-05-20-m1l1-journey-design.md`.

- 10-block template, one Mermaid diagram, one interactive SVG (hover-tooltip pattern)
- Two new glossary terms (`caller`, `server`); `request`, `response`, `status code` already existed from pilot work
- Established Greenfield public website canon at `greenfield.lib` (separate from future `api.greenfield.lib/v1`)
- Small framework patch to `assets/js/interactive-svg.js` adds touch support to `hover-tooltip` (benefits every future lesson using this pattern)
- `previous_page` omitted (M1L1 is first lesson; `_includes/prev-next.html:3` handles the absence cleanly)
- Six legacy assets deleted (4 images/GIFs, 2 data files); verified journey-only before deletion

## Open question

The two inline AdSense slots (between blocks 2-3 and blocks 8-9) use numeric slot IDs (`2222222222`, `3333333333`) matching the pilot. Parent spec Section 4 prescribes semantic IDs (`lesson-mid-1`, `lesson-mid-2`); the pilot does not use these. Decision: matched the pilot for consistency. Flagging here for review.

## Definition of Done (parent spec Section 4)

**Structure**
- [x] All ten blocks present in order
- [x] Reading time 12-18 minutes (target 14 min)
- [x] One Mermaid diagram (block 3), max 10 nodes (using 4)
- [x] One interactive SVG (block 4), keyboard navigable, static fallback works
- [x] 3-5 glossary terms linked via `glossary-term.html` (5 terms; 2 new added to `_data/glossary.yml`)
- [x] One self-check question in block 9, no answer key
- [x] One earned joke in block 1 (Devon's paper line)
- [x] Signoff via `signoff.html`

**Voice**
- [x] Zero hyphens in body prose
- [x] Zero em dashes, en dashes, emoji anywhere
- [x] Zero phrases from AI tell ban list
- [x] Maya's voice rules respected (second person, names not roles, opinions named)
- [x] Cast pronouns respected

**Greenfield consistency**
- [x] Code samples use Greenfield URLs (`greenfield.lib`) — API URL not used because API does not exist yet in story time
- [x] Diary opener stands on its own (M1L1-L2 carve-out)
- [x] Closing teaser bridges to pilot's opener
- [x] References by event, not lesson number

**SEO and revenue**
- [x] `permalink` unchanged: `/howinternetworks.html`
- [x] Two inline ad-slot includes in correct positions
- [x] Meta description 130 chars (under 155 cap)
- [x] OG image will be auto-generated by `scripts/generate-og.mjs` in CI

**Accessibility**
- [x] Headings sentence case; clean H2 hierarchy
- [x] Images/SVGs have alt text
- [x] Interactive SVG keyboard navigable with intentional tab order
- [x] Color not the only carrier of information
- [x] Code samples are real text in fenced blocks

**Technical**
- [x] `bundle exec jekyll build` exits zero
- [x] `npm run build:css` exits zero
- [x] `ruby scripts/voice-check.rb _docs/journey.md` exits zero
- [x] No Liquid errors, no missing-include warnings
- [x] Glossary chip terms all resolve
- [x] Frontmatter complete and `module: 1`/`lesson: 1` reconcile with `_data/modules.yml`

## Test plan

- [ ] Reviewer reads lesson end-to-end at desktop breakpoint
- [ ] Reviewer reads lesson end-to-end at mobile breakpoint
- [ ] Reviewer confirms the interactive SVG works on a touch device
- [ ] Reviewer thumbs up or thumbs down on the earned joke
- [ ] CI passes (build, voice linter, HTMLProofer)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

- [ ] **Step 3: Capture the PR URL**

The `gh pr create` command prints the PR URL on success. Save it for reference. The next action is Gaurav's review.

---

## Post-merge tasks (separate, after PR merges)

Listed here for completeness; not part of the rewrite/journey branch.

**Post-merge Task A: 15-minute retro.** Create `docs/superpowers/specs/retros/journey.md` (gitignored). Three notes max: what worked, what to change in the parent spec, what to change in the workflow.

**Post-merge Task B: Pilot glossary chip retrofit.** Separate small PR. Open `_docs/whatisanapi.md`. Wrap `caller`, `request`, and `response` in `{% include glossary-term.html term="..." %}` chips on their later appearances. Five-minute Edit pass. Commit and PR with title `Retrofit: wrap caller/request/response chips in pilot lesson`.

**Post-merge tracking.** GA4 engagement against the legacy `/howinternetworks.html` 30-day baseline continues. Not blocking. Note in retro after 14 days.
