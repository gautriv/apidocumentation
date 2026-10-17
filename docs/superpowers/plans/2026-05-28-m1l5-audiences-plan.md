# M1L5 "Audiences: humans, devs, and agents" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `_docs/audiences-humans-and-agents.md` end-to-end as Module 1 Lesson 5 in Maya's voice per the v0.3 spec at `docs/superpowers/specs/2026-05-28-m1l5-audiences-design.md`. Ship a lesson that teaches the three-audience taxonomy (dev, agent, human) with one Mermaid sequence diagram, one interactive 2-state toggle SVG, three code snippets, two callouts, four new glossary terms, and the locked decisions from the spec.

**Architecture:** Jekyll + Tailwind static site. Lesson body in Markdown with Liquid includes (`callout.html`, `mermaid.html`, `interactive-svg.html`, `ad-slot.html`, `glossary-term.html`, `signoff.html`). Hand-crafted SVG with the `toggle` pattern from the central framework at `assets/js/interactive-svg.js` (same pattern M1L3 used). Voice enforcement via `scripts/voice-check.rb`. Build via `npm run build:css && bundle exec jekyll build`. Branch `rewrite/audiences-humans-and-agents` off master tip. PR merges to master via GitHub Actions to live site.

**Tech Stack:** Ruby 3.1 + Jekyll, Node 18 + Tailwind, Liquid templating, hand-written SVG, Mermaid (via include), Ruby voice linter.

**Reference docs:**
- Spec (canonical decisions): `docs/superpowers/specs/2026-05-28-m1l5-audiences-design.md`
- Parent framework: `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md`
- Voice rules in parent spec Section 3; AI tell ban list also there
- M1L3 SVG template for toggle pattern: `assets/svg/whatwritersdo/main.svg`
- M1L4 example for prose pacing and structure: `_docs/informationgathering.md`
- Universe canon (gitignored, local): `docs/superpowers/greenfield-bible.md`

**Subagent dispatch hints** (per M1L4 retro item 3):
- **Use fresh subagent context for:** Task 5 (block 3 substance), Task 6 (block 4 substance + SVG placeholder), Task 15 (interactive SVG authoring), Task 18 (voice pass).
- **Use inline edits for:** Tasks 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 20, 21 — content is spec-verbatim or near-verbatim; subagent dispatch wastes tokens.

---

## File Structure

**Files this plan creates:**
- `assets/svg/audiences-humans-and-agents/main.svg` (hand-crafted, ~120 lines, 2-state toggle pattern)

**Files this plan modifies:**
- `_docs/audiences-humans-and-agents.md` (full rewrite: replace the 22-line stub from M1L4 PR with ~280 lines of new lesson)
- `_data/glossary.yml` (append 4 new term entries: `audience`, `description`, `example response`, `user agent`)
- `_data/modules.yml` (one-line edit at line 17: remove em dash from `reading:` field, remove `placeholder: true` flag, set reading to `"15 min"`)
- `docs/superpowers/greenfield-bible.md` (gitignored; local-only universe canon update: Timeline + API entities + Locked details + Open universe questions)

**Files this plan deletes:** none. The stub at `_docs/audiences-humans-and-agents.md` is overwritten in place; no orphan assets to clean up.

**Files this plan does NOT touch:**
- Any `_includes/*.html` (all already exist per parent spec Section 7)
- `assets/js/interactive-svg.js` (already supports toggle pattern; M1L3 shipped on it)
- `assets/js/mermaid-init.js` (theme already set; M1L1 contrast fix in master)
- `tailwind.config.js` (no new safelist entries needed)
- `_config.yml`, `.github/workflows/build.yml`, AdSense client ID
- Other rows in `_data/modules.yml` (only the M1L5 row at line 17)

---

## Task 1: Prerequisite verification + branch creation

**Files:** none modified. Read-only checks + branch.

- [ ] **Step 1: Check current branch**

```bash
git rev-parse --abbrev-ref HEAD
git status
```

Expected: branch may be anything; working tree should be clean. If dirty, stash or commit before proceeding.

- [ ] **Step 2: Switch to master and pull**

```bash
git checkout master && git pull origin master
```

Expected: fast-forward or already up to date. Master tip SHA will be the M1L5 branch-off SHA — record it in your commit message later.

- [ ] **Step 3: Confirm M1L4 is merged**

```bash
git log --oneline -5
```

Expected: recent commits include the M1L4 merge (commit `24e35db` from PR #12, 2026-05-22) or descendants of it.

- [ ] **Step 4: Create the M1L5 branch**

```bash
git checkout -b rewrite/audiences-humans-and-agents
```

Expected: switched to new branch.

- [ ] **Step 5: Confirm all required includes exist**

```bash
ls _includes/{signoff,callout,mermaid,interactive-svg,ad-slot,glossary-term}.html
```

Expected: six files listed without error.

- [ ] **Step 6: Confirm interactive-svg.js supports toggle pattern**

```bash
grep -l 'toggle' assets/js/interactive-svg.js
```

Expected: file path returned. If not, the toggle pattern is missing from the framework — escalate before proceeding.

- [ ] **Step 7: Confirm mermaid-init.js has the contrast fix**

```bash
grep -l 'cream\|ink\|copper\|sage' assets/js/mermaid-init.js
```

Expected: file path returned (token colors referenced).

- [ ] **Step 8: Confirm voice-check.rb runs**

```bash
ruby scripts/voice-check.rb _docs/informationgathering.md 2>&1 | head -5
```

Expected: zero hits (M1L4 is clean) or a usage hint. No Ruby exception.

- [ ] **Step 9: Confirm outstanding `TODO: interactive` SVG count**

```bash
grep -rn 'TODO: interactive' _docs/ 2>&1 | head -10
```

Expected: empty output. (Parent spec caps at 3 outstanding TODOs site-wide. If count is at 3, M1L5 cannot ship a deferred SVG; the real SVG must land in this PR.)

- [ ] **Step 10: Confirm M1L5 stub state**

```bash
wc -l _docs/audiences-humans-and-agents.md
head -22 _docs/audiences-humans-and-agents.md
```

Expected: 22 lines, frontmatter + 2 short paragraphs + signoff include. Created in commit `1461a4a` per the M1L4 PR.

- [ ] **Step 11: Confirm legacy glossary state**

```bash
grep -E '^- term: "?(audience|description|example response|user agent)"?' _data/glossary.yml
```

Expected: empty output. (None of the four new terms should exist yet; this PR adds all four.)

- [ ] **Step 12: Confirm modules.yml has the M1L5 placeholder row**

```bash
grep -n 'audiences-humans-and-agents' _data/modules.yml
```

Expected: line 17 with `reading: "—"` and `placeholder: true`.

- [ ] **Step 13: Smoke-build clean master**

```bash
npm run build:css && bundle exec jekyll build
```

Expected: both exit zero. Confirms baseline.

- [ ] **Step 14: No commit. Move to Task 2.**

---

## Task 2: Glossary additions

**Files:**
- Modify: `_data/glossary.yml` (append four entries at end)

- [ ] **Step 1: Read current end of glossary**

```bash
tail -5 _data/glossary.yml
```

Expected: ends with the `OpenAPI` entry from M1L4. File may or may not end with a trailing newline; preserve whatever pattern is there.

- [ ] **Step 2: Append four entries**

Append to the bottom of `_data/glossary.yml` (preserve any final newline):

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

- [ ] **Step 3: Verify YAML parses**

```bash
ruby -ryaml -e 'puts YAML.load_file("_data/glossary.yml").length'
```

Expected: integer `22` (18 existing + 4 new).

- [ ] **Step 4: Hand-grep the four new entries for hyphens**

```bash
ruby -ryaml -e 'YAML.load_file("_data/glossary.yml").last(4).each { |e| puts e["definition"].include?("-") ? "FAIL: #{e["term"]} contains -" : "OK: #{e["term"]}" }'
```

Expected: four lines, all starting with `OK:`. If any FAIL: rewrite that definition to remove the hyphen (voice linter does not scan YAML data files, so this hand-grep is the only check).

- [ ] **Step 5: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -E 'Error|warn' || echo "Build clean"
```

Expected: `Build clean`.

- [ ] **Step 6: Commit**

```bash
git add _data/glossary.yml
git commit -m "feat(m1l5): add audience, description, example response, user agent glossary entries"
```

---

## Task 3: Modules.yml em-dash + placeholder cleanup

**Files:**
- Modify: `_data/modules.yml:17` (one line)

- [ ] **Step 1: Locate the line**

```bash
grep -n "audiences-humans-and-agents.html" _data/modules.yml
```

Expected: line 17 with the em-dashed `reading: "—"` and `placeholder: true`.

- [ ] **Step 2: Apply the diff**

Find this line in `_data/modules.yml` (line 17):

```yaml
    - { slug: "audiences-humans-and-agents.html", title: "Audiences: humans, devs, and agents", reading: "—", placeholder: true }
```

Replace with:

```yaml
    - { slug: "audiences-humans-and-agents.html", title: "Audiences: humans, devs, and agents", reading: "15 min" }
```

- [ ] **Step 3: Verify YAML parses**

```bash
ruby -ryaml -e 'YAML.load_file("_data/modules.yml")' && echo "YAML OK"
```

Expected: `YAML OK`.

- [ ] **Step 4: Confirm the M1L5 row is clean**

```bash
grep -n "audiences-humans-and-agents" _data/modules.yml
```

Expected: line 17 with `reading: "15 min"` and no `placeholder` flag.

- [ ] **Step 5: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -E 'Error|warn' || echo "Build clean"
```

Expected: `Build clean`.

- [ ] **Step 6: Commit**

```bash
git add _data/modules.yml
git commit -m "chore(m1l5): clean em dash + placeholder flag from modules.yml row 17"
```

---

## Task 4: Frontmatter rewrite

**Files:**
- Modify: `_docs/audiences-humans-and-agents.md` (replace the stub's frontmatter; leave the stub body for now)

This task ONLY rewrites the frontmatter so the file remains a valid Jekyll page with the new metadata. The body gets rewritten block-by-block in Tasks 5-13.

- [ ] **Step 1: Read current frontmatter**

```bash
head -14 _docs/audiences-humans-and-agents.md
```

Expected: stub frontmatter from `title:` through `---`.

- [ ] **Step 2: Replace frontmatter**

Locate the first `---` at line 1 and the closing `---` at line 14 of `_docs/audiences-humans-and-agents.md`. Replace lines 1-14 (inclusive) with:

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

The stub body below the closing `---` (lines 15-22) stays in place for this task; Task 5 will replace it.

- [ ] **Step 3: Verify Jekyll parses the frontmatter**

```bash
bundle exec jekyll build 2>&1 | grep -E 'audiences-humans-and-agents.*[Ee]rror' || echo "Frontmatter OK"
```

Expected: `Frontmatter OK`.

- [ ] **Step 4: Verify rendered page exists**

```bash
ls _site/audiences-humans-and-agents.html
```

Expected: file present.

- [ ] **Step 5: Commit**

```bash
git add _docs/audiences-humans-and-agents.md
git commit -m "feat(m1l5): rewrite frontmatter to lean schema"
```

---

## Task 5: Block 3 prose draft (the three readers + Mermaid + scaffold)

**Files:**
- Modify: `_docs/audiences-humans-and-agents.md` (replace stub body lines 15-22 onward with the block 3 draft; leave placeholders for blocks not yet drafted)

Per spec Section 5, draft order is 3 → 4 → 5 → 6 → 1 → 2 → 7 → 8 → 9 → 10. Block 3 first because it carries the lesson's three-audience framework.

**Reference:** Spec Section 1 Block 3 + Section 2 Mermaid block.

- [ ] **Step 1: Replace stub body with the block-3 scaffold**

Replace everything in `_docs/audiences-humans-and-agents.md` after the closing `---` of the frontmatter (line 15 onward) with this exact content (it includes the block 3 prose, the block 3 Mermaid, and placeholder comments for all other blocks):

````markdown

{% comment %}block:1{% endcomment %}
<!-- TODO: Block 1 diary opener. Drafted in Task 9. -->

{% comment %}block:2{% endcomment %}
<!-- TODO: Block 2 promise. Drafted in Task 10. -->

{% include ad-slot.html slot="2222222222" format="auto" %}

{% comment %}block:3{% endcomment %}
## The three readers

I walk back to Devon's desk. By 9:30 Priya pings me in Slack: "user agent breakdown for /v1/books, you should see this." The breakdown is a short list of strings. Near the top: `Marginalia Atlas/0.4`.

Marginalia is a small Goodreads-style competitor. Atlas is their reading assistant. Borrowers ask Atlas what to read next, and Atlas calls our API to check availability. Atlas read our doc page, hit the endpoint, read `call_number: "813.5"`, and told Mira "It's at 813.5."

Then the lesson. The doc page has at least three readers, and they are not the same kind of reader.

The **dev** is the engineer at Marginalia integrating Greenfield's API into Atlas. They read the page to copy a snippet, ship code, and move on.

The **agent** is Atlas itself, the {% include glossary-term.html term="agent" %} reading the page literally and quoting fields back at runtime.

The **human** is Mira, who never reads the page at all. She hears what Atlas said.

An audience is a class of {% include glossary-term.html term="reader" %}, not a single person. Each of those three is an audience of your doc page. The same field can matter to one audience and not to another.

The user agent string is what told Priya which audience was hitting the endpoint. A user agent is the string a caller sends to identify itself. Browsers send strings like Mozilla/5.0. Atlas sends `Marginalia Atlas/0.4`.

Atlas reads what your schema makes available, what your example response shows, and sometimes your prose. Different agents read different surfaces. The doc page has to do its work in each.

Three is the count I keep coming back to. Slice it differently if your stack demands. The number matters less than knowing which one you wrote for and which one showed up.

On Tuesday I wrote for the dev. By Monday two other readers had shown up.

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

Look at the diagram. Find the doc page. It is the one I get paid to write. Now look at where Mira is. The page reaches her only through what Atlas said.

{% comment %}block:4{% endcomment %}
<!-- TODO: Block 4 how we fix the page. Drafted in Task 6. -->

{% comment %}block:5{% endcomment %}
<!-- TODO: Block 5 exercise. Drafted in Task 7. -->

{% comment %}block:6{% endcomment %}
<!-- TODO: Block 6 the trap. Drafted in Task 8. -->

{% comment %}block:7{% endcomment %}
<!-- TODO: Block 7 standup chips. Drafted in Task 11. -->

{% comment %}block:8{% endcomment %}
<!-- TODO: Block 8 Gemini AI co pilot tip. Drafted in Task 12. -->

{% include ad-slot.html slot="3333333333" format="auto" %}

{% comment %}block:9{% endcomment %}
<!-- TODO: Block 9 self check. Drafted in Task 13. -->

{% comment %}block:10{% endcomment %}
<!-- TODO: Block 10 teaser + signoff. Drafted in Task 13. -->
````

- [ ] **Step 2: Run voice-check on the file**

```bash
ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md
```

Expected: zero hits in the block 3 content. (TODO comments inside `<!-- -->` are skipped by the linter per parent spec Section 6.)

If hits: fix each. Common ones to watch in block 3: "user-agent" with hyphen (should be "user agent" no hyphen), "Goodreads-style" with hyphen (in body prose should be "Goodreads style" no hyphen — keep as is here only because the term is the proper-noun descriptor of a product category).

If "Goodreads-style" is flagged, rewrite as "a small Goodreads competitor" — drops the hyphen and reads cleaner.

- [ ] **Step 3: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn.*audiences' || echo "Build clean"
```

Expected: `Build clean`.

- [ ] **Step 4: Render-check Mermaid**

```bash
grep -A 12 'mermaid_src' _site/audiences-humans-and-agents.html | head -20
```

Expected: shows the `<pre class="mermaid">` block with the sequence diagram source. The four participants and six arrows should be visible.

- [ ] **Step 5: Commit**

```bash
git add _docs/audiences-humans-and-agents.md
git commit -m "feat(m1l5): draft block 3 (three readers + mermaid + scaffold)"
```

---

## Task 6: Block 4 prose draft (three edits + SVG placeholder)

**Files:**
- Modify: `_docs/audiences-humans-and-agents.md` (replace `<!-- TODO: Block 4 ... -->` with the block 4 draft)

**Reference:** Spec Section 1 Block 4 + Section 2 code samples + Section 2 SVG include syntax.

- [ ] **Step 1: Replace the block 4 placeholder**

Find this line in `_docs/audiences-humans-and-agents.md`:

```markdown
<!-- TODO: Block 4 how we fix the page. Drafted in Task 6. -->
```

Replace it with this exact block:

````markdown
## How we fix the page

Writing for three readers does not mean writing three pages. It means adding three small things to one page. I write the description text and the prose paragraph. Devon adds them to the schema and pushes.

**The schema description.** The `call_number` field in our {% include glossary-term.html term="schema" %} has no {% include glossary-term.html term="description" %} on it. A description is the sentence on a {% include glossary-term.html term="OpenAPI" %} field that explains what the field is. In 2026 it is also the sentence agents read at runtime. I write one. Devon adds it to `openapi.yaml`:

```yaml
call_number:
  type: string
  description: |
    Dewey decimal subject classification for the title.
    Not a shelf location. Branches shelve fiction alphabetically by author.
  example: "813.5"
```

The field now carries a sentence the agent can quote. "Not a shelf location" is the clause that does the work. An agent reading the schema sees the disambiguation. An agent that does not read the schema sees nothing different yet. That is what the next two edits are for.

**The realistic example.** The legacy doc page shows the response keys with no values. I add an {% include glossary-term.html term="example response" %} with real Greenfield data. A book that exists. A branch that exists. A call number that resolves cleanly:

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

A dev who copies this snippet sees the shape AND the kind of value `call_number` carries. "813.5" reads as a Dewey number to anyone who has been near a library. The example does what no field description can. It shows the value as a number, in context.

**The prose disambiguation.** Below the example response, one paragraph on the doc page itself:

> The `call_number` field returns the Dewey decimal subject classification for the title. It is useful for filtering or grouping titles by subject. It is not a shelf location. Branches shelve fiction alphabetically by author. If you are writing an interface that tells a borrower where to find a book, do not read this field back to them as a location.

The last sentence is the agent aware sentence. It is written for the dev shipping a chatbot AND for the chatbot reading the prose at runtime. Two readers, one paragraph.

Three edits. One page. The next Mira gets an answer that means what it says.

The toggle below shows the two reading acts on the same response. Mira does not read the page; she appears in Atlas's pane as what Atlas told her.

{% include interactive-svg.html slug="audiences-humans-and-agents" alt="Same response JSON, two reader lenses. Toggle between Dev and Atlas. Dev sees all four fields and identifies call_number 813.5 as a Dewey number, then ships. Atlas sees only call_number 813.5 and quotes it literally to Mira; Mira walks to a shelf that does not exist." %}
````

**Note on the SVG include:** the SVG file at `assets/svg/audiences-humans-and-agents/main.svg` does NOT yet exist. The build will fail or render an empty placeholder until Task 14 (SVG stub) lands. We proceed in this order to keep the prose substance pass focused; Task 14 follows shortly.

- [ ] **Step 2: Run voice-check on the file**

```bash
ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md
```

Expected: zero hits in block 4 content. Common pitfalls: "load-bearing" (replaced with "the clause that does the work" already), "agent-aware" hyphenation (should be "agent aware" no hyphen — already plain text), "pre-ship"/"post-ship" (not used in block 4), "shelf-location" with hyphen (used as "shelf location" no hyphen — clean).

- [ ] **Step 3: Smoke-build (expected to fail or warn on missing SVG)**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn.*audiences' || echo "Build clean"
```

Expected: one warning about the missing SVG file, OR a build error if the include strictly requires the file to exist. Either is acceptable — Task 14 will resolve it.

- [ ] **Step 4: Commit**

```bash
git add _docs/audiences-humans-and-agents.md
git commit -m "feat(m1l5): draft block 4 (three edits + SVG include placeholder)"
```

---

## Task 7: Block 5 prose draft (exercise + earned joke)

**Files:**
- Modify: `_docs/audiences-humans-and-agents.md` (replace `<!-- TODO: Block 5 ... -->` with the block 5 exercise callout)

**Reference:** Spec Section 1 Block 5.

- [ ] **Step 1: Replace the block 5 placeholder**

Find this line in `_docs/audiences-humans-and-agents.md`:

```markdown
<!-- TODO: Block 5 exercise. Drafted in Task 7. -->
```

Replace it with this exact block:

````markdown
## Try it on Greenfield

{% capture exercise %}
**Five minutes, in any reference page you have shipped or use regularly.** GitHub's `GET /repos/{owner}/{repo}` is a useful shape: many fields, some ambiguous. `parent`, `source`, `default_branch` all reward a literal reading badly.

Pick one field in the response. Read its value out loud the way an agent would: just the field name and the value, no surrounding sentence. So if the response includes `default_branch: "main"`, you say "default branch main" to your friend.

(Borrow a friend who reads everything too literally. You probably have a candidate in mind.)

Is what your friend just heard a sentence a human would understand? If you can hear them ask "main what?", your doc page has a description to write, an example to enrich, or a sentence to put in the prose.
{% endcapture %}
{% include callout.html variant="exercise" body=exercise %}
````

**Voice note for Task 18 reviewer:** The parenthetical "(Borrow a friend who reads everything too literally. You probably have a candidate in mind.)" is the earned joke for this lesson. Per spec Section 5 risk 4, if Gaurav thumbs-down at PR review, cut the parenthetical entirely and let the exercise read as straight instruction. Alternative joke: "(You probably know exactly this person.)" — shorter, drops the borrow-a-friend setup.

- [ ] **Step 2: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md
```

Expected: zero hits in block 5. Pitfalls: `default_branch` is inside backticks (exempt from hyphen rule); "user agent" not used here; em dash check ("main what?", " — your doc page" — note: should be comma, not em dash — confirmed comma in draft).

- [ ] **Step 3: Smoke-build (still expects SVG warning)**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error' || echo "Build clean except SVG warning"
```

Expected: no Jekyll errors. May still warn about missing SVG (Task 14 fixes).

- [ ] **Step 4: Commit**

```bash
git add _docs/audiences-humans-and-agents.md
git commit -m "feat(m1l5): draft block 5 (exercise callout with earned joke)"
```

---

## Task 8: Block 6 prose draft (the trap + cost ladder)

**Files:**
- Modify: `_docs/audiences-humans-and-agents.md` (replace `<!-- TODO: Block 6 ... -->` with the block 6 warning callout)

**Reference:** Spec Section 1 Block 6.

- [ ] **Step 1: Replace the block 6 placeholder**

Find this line in `_docs/audiences-humans-and-agents.md`:

```markdown
<!-- TODO: Block 6 the trap. Drafted in Task 8. -->
```

Replace it with this exact block:

````markdown
## The trap

{% capture trap %}
The trap is writing for the agent at the expense of the dev. Stuff every field with four sentences of warnings to the agent, and the dev's eyes glaze over. They copy the wrong example anyway.

My rule: the description does only the work the field name cannot. If the name is unambiguous, the description is short or absent. If the name is ambiguous, like `call_number`, the description does the disambiguation.

You can also rename the field. `dewey_classification` would have prevented this whole week. I do not rename here because the field is already in production and renames are expensive. In your codebase, before the API ships, rename first; describe second.

The earlier the fix, the cheaper. Rename before shipping: minutes. Description after shipping: an hour. Prose paragraph: a week of agreeing on what to write. And the thing you do not get back is Mira's morning.
{% endcapture %}
{% include callout.html variant="warning" body=trap %}
````

- [ ] **Step 2: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md
```

Expected: zero hits in block 6. Pitfalls checked: "four-sentence" (rewritten as "four sentences of"), "pre-ship"/"post-ship" (rewritten as "before shipping"/"after shipping"), "dewey-classification" (inside backticks, exempt).

- [ ] **Step 3: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error' || echo "Build clean except SVG warning"
```

Expected: no Jekyll errors.

- [ ] **Step 4: Commit**

```bash
git add _docs/audiences-humans-and-agents.md
git commit -m "feat(m1l5): draft block 6 (the trap + cost ladder)"
```

---

## Task 9: Block 1 prose draft (diary opener)

**Files:**
- Modify: `_docs/audiences-humans-and-agents.md` (replace `<!-- TODO: Block 1 ... -->` with the diary opener)

Substance is now drafted (blocks 3, 4, 5, 6). Block 1's job per spec Section 5: "The diary opener is written second to last in the substance order so the scene earns the lesson, not the other way around."

**Reference:** Spec Section 1 Block 1.

- [ ] **Step 1: Replace the block 1 placeholder**

Find this line in `_docs/audiences-humans-and-agents.md`:

```markdown
<!-- TODO: Block 1 diary opener. Drafted in Task 9. -->
```

Replace it with this exact block:

````markdown
## Mira wants the book

It is Monday morning of story week 3. The `GET /v1/books` endpoint Devon shipped on Tuesday has been live almost a week. I am at the branch for my usual weekly check-in with Devon; I have claimed a small corner table near the front window.

Mira walks up to the front desk. "The system says you have *The Quiet Library*. Your chatbot said it's at 813.5. There is no 813.5." The librarian walks her to fiction. Mira leaves with the book.

I pull up the doc page on my phone. The example response shows `call_number: "813.5"`. There is no description on the field. There is no sentence on the page about what a call number is.

Last week I asked you which reader the doc page is for: the developer or the chatbot. Today I learned there are three. Her name is Mira.
````

- [ ] **Step 2: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md
```

Expected: zero hits in block 1. Pitfalls checked: "check-in" (rewritten as "check in" no hyphen — actually note: "weekly check-in" — RECHECK), "Monday-morning" (used as "Monday morning" no hyphen).

If "check-in" is flagged: rewrite as "for my usual Monday morning with Devon" (drops the noun, captures the meaning). Or "for my usual weekly visit with Devon."

- [ ] **Step 3: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error' || echo "Build clean except SVG warning"
```

Expected: no Jekyll errors.

- [ ] **Step 4: Commit**

```bash
git add _docs/audiences-humans-and-agents.md
git commit -m "feat(m1l5): draft block 1 (diary opener)"
```

---

## Task 10: Block 2 prose draft (today you will leave with)

**Files:**
- Modify: `_docs/audiences-humans-and-agents.md` (replace `<!-- TODO: Block 2 ... -->` with the three-bullet promise)

**Reference:** Spec Section 1 Block 2.

- [ ] **Step 1: Replace the block 2 placeholder**

Find this line in `_docs/audiences-humans-and-agents.md`:

```markdown
<!-- TODO: Block 2 promise. Drafted in Task 10. -->
```

Replace it with this exact block:

````markdown
## Today you will leave with

- The three readers of every API doc page.
- A three edit pattern (schema description, realistic example, one prose sentence) for any ambiguous field.
- A Gemini prompt that reads your page the way an agent will.
````

**Note:** "three edit pattern" is written without hyphen ("three edit" reads slightly off but is voice-rule-compliant). Alternative: "A pattern with three edits (schema description, realistic example, one prose sentence) for any ambiguous field." — natural rephrasing if "three edit" reads awkwardly to Gaurav at review.

- [ ] **Step 2: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md
```

Expected: zero hits in block 2.

- [ ] **Step 3: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error' || echo "Build clean except SVG warning"
```

Expected: no Jekyll errors.

- [ ] **Step 4: Commit**

```bash
git add _docs/audiences-humans-and-agents.md
git commit -m "feat(m1l5): draft block 2 (today you will leave with)"
```

---

## Task 11: Block 7 prose draft (standup chips)

**Files:**
- Modify: `_docs/audiences-humans-and-agents.md` (replace `<!-- TODO: Block 7 ... -->` with the four-chip list)

**Reference:** Spec Section 1 Block 7.

- [ ] **Step 1: Replace the block 7 placeholder**

Find this line in `_docs/audiences-humans-and-agents.md`:

```markdown
<!-- TODO: Block 7 standup chips. Drafted in Task 11. -->
```

Replace it with this exact block:

````markdown
## Words you can drop in standups now

- {% include glossary-term.html term="audience" %}: Use this when you mean a class of reader, not a single person. "The doc page has three audiences" settles a debate that "we should think about who reads this" does not.
- {% include glossary-term.html term="description" %}: Use this when you mean the sentence on an OpenAPI schema field that explains it. "Add a description to that field" is what you say when an agent quoted a value back wrong.
- {% include glossary-term.html term="example response" %}: Use this when you mean a realistic JSON sample on the doc page, not a placeholder. "The example response is stale" is different from "the field changed."
- {% include glossary-term.html term="user agent" %}: Use this when you mean the string a caller sends to identify itself. "Check the user agents on the access log" is how you find out whether your readers are humans or software.
````

- [ ] **Step 2: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md
```

Expected: zero hits in block 7.

- [ ] **Step 3: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error' || echo "Build clean except SVG warning"
```

Expected: no Jekyll errors. All four glossary chips should resolve (added in Task 2).

- [ ] **Step 4: Commit**

```bash
git add _docs/audiences-humans-and-agents.md
git commit -m "feat(m1l5): draft block 7 (standup chips for audience, description, example response, user agent)"
```

---

## Task 12: Block 8 prose draft (Gemini AI co pilot tip)

**Files:**
- Modify: `_docs/audiences-humans-and-agents.md` (replace `<!-- TODO: Block 8 ... -->` with the Gemini prompt block)

**Reference:** Spec Section 1 Block 8. Note: parent spec says "AI co pilot tip" without hyphen. Do not introduce "co-pilot" with hyphen anywhere in this block.

- [ ] **Step 1: Replace the block 8 placeholder**

Find this line in `_docs/audiences-humans-and-agents.md`:

```markdown
<!-- TODO: Block 8 Gemini AI co pilot tip. Drafted in Task 12. -->
```

Replace it with this exact block:

````markdown
## Today's prompt for your AI assistant

Gemini, this time.

**The situation.** You have your doc page open and you want to know what an agent will do with it before a borrower does. Gemini's long context handles a doc page plus a sample response in one pass.

**The prompt, exactly as written:**

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

**What to expect back.** An answer in three sections. The middle section is the one that catches problems. If the chatbot's literal sentence reads as weird, your page has a description to write.

**What to watch for.** Gemini will sometimes flatten the three reads into one summary. Press it on the literal pass with "do not interpret; just quote." The summarized version is not useful. The literal one is.
````

- [ ] **Step 2: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md
```

Expected: zero hits in block 8. Pitfalls checked: "co-pilot" (not used, body uses "AI assistant"), "three-section answer" (rewritten as "answer in three sections"), "long-context" (used as "long context" two words).

- [ ] **Step 3: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error' || echo "Build clean except SVG warning"
```

Expected: no Jekyll errors.

- [ ] **Step 4: Commit**

```bash
git add _docs/audiences-humans-and-agents.md
git commit -m "feat(m1l5): draft block 8 (Gemini AI co pilot tip)"
```

---

## Task 13: Blocks 9 + 10 prose draft (self check + teaser + signoff)

**Files:**
- Modify: `_docs/audiences-humans-and-agents.md` (replace `<!-- TODO: Block 9 ... -->` and `<!-- TODO: Block 10 ... -->`)

**Reference:** Spec Section 1 Block 9 + Block 10.

- [ ] **Step 1: Replace the block 9 placeholder**

Find this line in `_docs/audiences-humans-and-agents.md`:

```markdown
<!-- TODO: Block 9 self check. Drafted in Task 13. -->
```

Replace it with this exact block:

````markdown
## Before you go

Pick one field in your own doc page. Read its value the way Atlas would: just the field name and the value. Did you just say a sentence Mira would understand?
````

- [ ] **Step 2: Replace the block 10 placeholder**

Find this line in `_docs/audiences-humans-and-agents.md`:

```markdown
<!-- TODO: Block 10 teaser + signoff. Drafted in Task 13. -->
```

Replace it with this exact block:

````markdown
## Next week at Greenfield

Next week Devon shows me why it is `GET /books` and not `POST /search`. The answer involves letters from 1969.

{% include signoff.html %}
````

- [ ] **Step 3: Run voice-check**

```bash
ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md
```

Expected: zero hits in blocks 9 + 10.

- [ ] **Step 4: Confirm all ten block markers present**

```bash
grep -E '\{% comment %\}block:[0-9]+\{% endcomment %\}' _docs/audiences-humans-and-agents.md | wc -l
```

Expected: `10`.

- [ ] **Step 5: Confirm signoff is the last include**

```bash
tail -3 _docs/audiences-humans-and-agents.md
```

Expected: ends with `{% include signoff.html %}` on its own line.

- [ ] **Step 6: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error' || echo "Build clean except SVG warning"
```

Expected: no Jekyll errors.

- [ ] **Step 7: Commit**

```bash
git add _docs/audiences-humans-and-agents.md
git commit -m "feat(m1l5): draft blocks 9 + 10 (self check + teaser + signoff)"
```

---

## Task 14: SVG stub (one-rect placeholder so build passes)

**Files:**
- Create: `assets/svg/audiences-humans-and-agents/main.svg` (minimal stub)

Per M1L4 retro item 2, the comment-out-the-include workaround does NOT work (Liquid processes `{% include %}` inside HTML comments). Use a minimal real SVG file as the stub. Task 15 overwrites it with the real interactive SVG.

- [ ] **Step 1: Create the directory**

```bash
mkdir -p assets/svg/audiences-humans-and-agents
```

Expected: directory created.

- [ ] **Step 2: Write the stub SVG**

Create `assets/svg/audiences-humans-and-agents/main.svg` with this content:

```xml
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 800 500"
     preserveAspectRatio="xMidYMid meet"
     data-svg-pattern="toggle"
     aria-label="Audiences SVG placeholder">
  <rect x="0" y="0" width="800" height="500" fill="#f5f1e8"/>
  <text x="400" y="250" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#2a2a2a">Audiences SVG (placeholder; real version in Task 15)</text>
</svg>
```

- [ ] **Step 3: Smoke-build (now expected to pass clean)**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn' || echo "Build clean"
```

Expected: `Build clean`. The SVG include should now resolve.

- [ ] **Step 4: Verify the SVG renders in the built page**

```bash
grep -c 'Audiences SVG' _site/audiences-humans-and-agents.html
```

Expected: `1` (the placeholder text appears once in the rendered page).

- [ ] **Step 5: Commit**

```bash
git add assets/svg/audiences-humans-and-agents/main.svg
git commit -m "chore(m1l5): add SVG stub so build passes; real SVG lands in Task 15"
```

---

## Task 15: Real interactive SVG (2-state toggle, Dev / Atlas)

**Files:**
- Modify: `assets/svg/audiences-humans-and-agents/main.svg` (overwrite the stub with the real ~120-line interactive SVG)

**Reference:** Spec Section 2 SVG specification. Reference the M1L3 SVG at `assets/svg/whatwritersdo/main.svg` for the toggle-pattern convention (state-switching attribute, button event wiring).

- [ ] **Step 1: Read the M1L3 SVG for the toggle pattern convention**

```bash
head -60 assets/svg/whatwritersdo/main.svg
```

Expected: shows how M1L3 declares `data-svg-pattern="toggle"` and what state attribute the framework uses (likely `data-toggle-state` or similar on buttons and CSS selectors keyed off an attribute on root or buttons).

- [ ] **Step 2: Confirm the framework's state-switching attribute**

```bash
grep -E 'data-(toggle|active|state|svg-state)' assets/js/interactive-svg.js | head -20
```

Expected: returns the attribute name(s) the framework reads/writes. Most likely candidates: `data-toggle-state="dev"` on the buttons, with the framework setting `data-active-state="dev"` on the root or a parent element. Use whatever convention M1L3 uses.

- [ ] **Step 3: Overwrite the stub with the real SVG**

Replace the entire contents of `assets/svg/audiences-humans-and-agents/main.svg` with:

```xml
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 800 500"
     preserveAspectRatio="xMidYMid meet"
     data-svg-pattern="toggle"
     data-toggle-default="dev"
     aria-label="Two reader lenses on the same API response. Toggle between developer and Atlas to see what each notices."
     class="audiences-svg"
     role="img">

  <style>
    .toggle-btn rect { transition: fill 0.15s, stroke 0.15s; }
    .toggle-btn:focus { outline: none; }
    .toggle-btn:focus rect { stroke: #2a2a2a; stroke-width: 2.5; }

    .field-group .json-text { fill: #2a2a2a; }
    .field-group .dev-underline { stroke: #8a9a7b; stroke-width: 1.5; }
    .atlas-highlight { display: none; fill: none; stroke: #b87333; stroke-width: 1.5; }
    .annotation { display: none; }
    .annotation-dev { display: block; }

    /* Dev state defaults are above. Atlas state overrides below. */
    /* Framework toggles via data-active-state on the root svg, or via class change. */
    [data-active-state="atlas"] .annotation-dev,
    .atlas-active .annotation-dev { display: none; }
    [data-active-state="atlas"] .annotation-atlas,
    .atlas-active .annotation-atlas { display: block; }
    [data-active-state="atlas"] .atlas-highlight,
    .atlas-active .atlas-highlight { display: block; }
    [data-active-state="atlas"] .dev-underline,
    .atlas-active .dev-underline { display: none; }
    [data-active-state="atlas"] .field-group:not(.field-call-number) .json-text,
    .atlas-active .field-group:not(.field-call-number) .json-text { opacity: 0.4; }

    /* Active toggle button styling */
    .toggle-btn[aria-pressed="true"] rect { fill: #b87333; stroke: #b87333; }
    .toggle-btn[aria-pressed="true"] text { fill: #f5f1e8; }
    .toggle-btn[aria-pressed="false"] rect { fill: #f5f1e8; stroke: #b87333; }
    .toggle-btn[aria-pressed="false"] text { fill: #2a2a2a; }
  </style>

  <!-- Toggle buttons -->
  <g class="toggle-controls" transform="translate(240, 20)">
    <g tabindex="0" role="button"
       aria-label="Show the developer's view"
       aria-pressed="true"
       data-toggle-state="dev"
       class="toggle-btn">
      <rect x="0" y="0" width="160" height="56" rx="4" stroke-width="1.5"/>
      <text x="80" y="36" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="500">Dev</text>
    </g>
    <g tabindex="0" role="button"
       aria-label="Show Atlas's view"
       aria-pressed="false"
       data-toggle-state="atlas"
       class="toggle-btn"
       transform="translate(176, 0)">
      <rect x="0" y="0" width="160" height="56" rx="4" stroke-width="1.5"/>
      <text x="80" y="36" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="500">Atlas</text>
    </g>
  </g>

  <!-- JSON content (centre-left) -->
  <g class="json-panel" transform="translate(40, 110)" aria-hidden="true">
    <text x="0" y="20" font-family="monospace" font-size="14" fill="#2a2a2a">{</text>
    <text x="20" y="40" font-family="monospace" font-size="14" fill="#2a2a2a">"results": [</text>
    <text x="40" y="60" font-family="monospace" font-size="14" fill="#2a2a2a">{</text>

    <g data-field="id" class="field-group">
      <text x="60" y="80" font-family="monospace" font-size="14" class="json-text">"id": "bk_184932",</text>
      <line x1="60" y1="86" x2="240" y2="86" class="dev-underline"/>
    </g>
    <g data-field="title" class="field-group">
      <text x="60" y="100" font-family="monospace" font-size="14" class="json-text">"title": "The Quiet Library",</text>
      <line x1="60" y1="106" x2="290" y2="106" class="dev-underline"/>
    </g>
    <g data-field="available_branches" class="field-group">
      <text x="60" y="120" font-family="monospace" font-size="14" class="json-text">"available_branches": ["branch_north"],</text>
      <line x1="60" y1="126" x2="340" y2="126" class="dev-underline"/>
    </g>
    <g data-field="call_number" class="field-group field-call-number">
      <rect x="56" y="128" width="220" height="22" rx="4" class="atlas-highlight"/>
      <text x="60" y="144" font-family="monospace" font-size="14" class="json-text">"call_number": "813.5"</text>
      <line x1="60" y1="150" x2="240" y2="150" class="dev-underline"/>
    </g>

    <text x="40" y="170" font-family="monospace" font-size="14" fill="#2a2a2a">}</text>
    <text x="20" y="190" font-family="monospace" font-size="14" fill="#2a2a2a">],</text>
    <text x="20" y="210" font-family="monospace" font-size="14" fill="#2a2a2a">"total": 1</text>
    <text x="0" y="230" font-family="monospace" font-size="14" fill="#2a2a2a">}</text>
  </g>

  <!-- Annotation panel (centre-right) -->
  <g class="annotation-panel" transform="translate(460, 100)">
    <rect x="0" y="0" width="320" height="320" rx="4" fill="#f5f1e8" stroke="#2a2a2a" stroke-width="1.5"/>

    <g class="annotation annotation-dev">
      <text x="20" y="36" font-family="sans-serif" font-size="16" fill="#2a2a2a" font-weight="600">What the dev notices</text>
      <text x="20" y="80" font-family="sans-serif" font-size="14" fill="#2a2a2a">1. Dev copies the snippet.</text>
      <text x="20" y="120" font-family="sans-serif" font-size="14" fill="#2a2a2a">2. Notices call_number: "813.5"</text>
      <text x="20" y="140" font-family="sans-serif" font-size="14" fill="#2a2a2a">   is a Dewey number.</text>
      <text x="20" y="180" font-family="sans-serif" font-size="14" fill="#2a2a2a">3. Ships.</text>
    </g>

    <g class="annotation annotation-atlas">
      <text x="20" y="36" font-family="sans-serif" font-size="16" fill="#2a2a2a" font-weight="600">What Atlas does</text>
      <text x="20" y="80" font-family="sans-serif" font-size="14" fill="#2a2a2a">1. Atlas reads</text>
      <text x="20" y="100" font-family="sans-serif" font-size="14" fill="#2a2a2a">   call_number: "813.5".</text>
      <text x="20" y="150" font-family="sans-serif" font-size="14" fill="#2a2a2a">2. Atlas tells Mira:</text>
      <text x="20" y="170" font-family="sans-serif" font-size="14" fill="#2a2a2a">   "It is at 813.5."</text>
      <text x="20" y="220" font-family="sans-serif" font-size="14" fill="#2a2a2a">3. Mira walks to a shelf</text>
      <text x="20" y="240" font-family="sans-serif" font-size="14" fill="#2a2a2a">   that does not exist.</text>
    </g>
  </g>
</svg>
```

**Note on the framework integration:** the CSS uses both `[data-active-state="atlas"]` (attribute on root SVG) AND `.atlas-active` (class on root SVG) as defensive selectors. The framework likely uses one of these conventions; whichever it uses will work. Check M1L3's SVG to confirm and remove the unused selector before commit.

- [ ] **Step 4: Check file size**

```bash
wc -c assets/svg/audiences-humans-and-agents/main.svg
```

Expected: under 15360 (15 KB raw). If over: drop redundant whitespace, shorten labels.

- [ ] **Step 5: Smoke-build**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'error|warn' || echo "Build clean"
```

Expected: `Build clean`.

- [ ] **Step 6: Render-check the SVG inline**

```bash
grep -c 'data-svg-pattern="toggle"' _site/audiences-humans-and-agents.html
```

Expected: `1` (the SVG is inlined by the include).

- [ ] **Step 7: Browser visual + interaction check**

Start the Jekyll server: `bundle exec jekyll serve --baseurl '' &`. Open `http://localhost:4000/audiences-humans-and-agents.html` in a browser. Confirm:
- SVG renders with the Dev/Atlas toggle visible at the top.
- Dev state shown by default (Dev button copper, Atlas button cream).
- JSON visible centre-left with sage underlines on all four fields.
- Annotation panel centre-right shows "What the dev notices" with 3 steps.
- Click Atlas: button activates (turns copper), Dev deactivates. JSON dims except `call_number: "813.5"` which keeps a copper box. Annotation switches to "What Atlas does" with 3 steps.
- Click Dev: state switches back.
- Tab to the SVG: focus ring (ink) visible on the Dev button.
- Tab again: focus moves to Atlas button.
- Press Space on a button: state toggles. Focus stays on the button.
- Mobile viewport (use browser devtools to set 375px width): toggle buttons still visible and tappable. If touch target appears below 44px height on the short axis, apply mitigation (a) from Spec Section 5 risk 1 (stack toggle buttons vertically on mobile via CSS media query).

Stop the server: `pkill -f 'jekyll serve' || true`.

- [ ] **Step 8: Commit**

```bash
git add assets/svg/audiences-humans-and-agents/main.svg
git commit -m "feat(m1l5): real interactive SVG (2-state toggle Dev/Atlas with reader lenses)"
```

---

## Task 16: Greenfield bible updates (local-only, not committed)

**Files:**
- Modify: `docs/superpowers/greenfield-bible.md` (local-only; this file is gitignored per commit `ca165960`)

Per spec Section 3, four edits to the bible. This file is gitignored, so the edits are local-only artifacts not part of any commit. The PR description should note that the bible was updated.

- [ ] **Step 1: Confirm the bible exists locally**

```bash
ls docs/superpowers/greenfield-bible.md && head -5 docs/superpowers/greenfield-bible.md
```

Expected: file present, starts with `# The Greenfield Bible`.

- [ ] **Step 2: Append the Timeline M1L5 entry**

Find the existing Timeline section (after `## Timeline`). After the last lesson entry (the `## Module 1, Lesson 4. Maya reads the codebase while Devon is in standup.` subsection and its content), and BEFORE the `## API entities` section header, append:

```markdown

## Module 1, Lesson 5. Mira walks in with a chatbot mistranslating call numbers.
Story date: Monday morning, story week 3. Five days after Devon shipped GET /v1/books on Tuesday afternoon of story week 2 (M1L4).
Event: Maya is at the branch on Monday morning, working at a small corner table. Mira, a borrower, walks up to the front desk and tells the librarian her chatbot said The Quiet Library is at 813.5; there is no shelf 813.5. The librarian walks Mira to fiction; Mira leaves with the book. Maya pulls up the doc page on her phone; the example response shows call_number: "813.5" with no description on the field. By 9:30 Priya pings Maya in Slack with the user agent breakdown for /v1/books, showing Marginalia Atlas/0.4 near the top. Maya names the three audiences (dev, agent, human) and lands three edits to the doc page: a schema description on call_number, a realistic example response with real Greenfield data, and a prose disambiguation paragraph below the example. Devon merges the schema change later that morning.
Characters present: Maya, Mira, the branch librarian (unnamed), Priya (via Slack), Atlas (offstage, identified via user agent string). Devon is named but offstage. The apprentice (the reader) is the implicit second observer.
New API entities introduced: call_number field added to the GET /v1/books response. Type string. Carries the Dewey decimal subject classification for the title. Sample value "813.5". Schema description added in the same week the lesson lands.
New glossary terms introduced: audience, description (as OpenAPI field), example response, user agent.
Quote: "On Tuesday I wrote for the dev. By Monday two other readers had shown up." (Maya, narrating block 3.)
```

- [ ] **Step 3: Extend the GET /books API entity entry**

Find the `### GET /books` subsection under `## API entities`. Replace its current contents with this extended version (preserves M1L4 fields, adds `call_number` and a new `Response field details` subsection):

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

- [ ] **Step 4: Update Locked details — remove the stale Atlas-owning-company TBD**

In the `## Locked details` section, find and DELETE this exact line:

```markdown
- Atlas's owning company: TBD (lock in Module 1 Lesson 5)
```

- [ ] **Step 5: Update Locked details — append the eight new lock entries**

After the existing Locked details bullets (the last bullet before the `## Open universe questions` section header), append these eight bullets:

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

- [ ] **Step 6: Update Open universe questions — remove the resolved Atlas-name entry**

In the `## Open universe questions` section, find and DELETE this exact line:

```markdown
- Atlas's name is provisional per spec Section 8.
```

The section should now be empty (Atlas-name was the only entry). Add a placeholder note so the writer knows where to add the next question:

```markdown
(No open universe questions outstanding as of M1L5 ship.)
```

- [ ] **Step 7: Verify the bible is not staged for commit**

```bash
git status docs/superpowers/greenfield-bible.md
```

Expected: file is gitignored; should NOT appear in `git status`. If it does (gitignore not applied), do NOT commit — the bible is intentionally local-only.

- [ ] **Step 8: No commit. Move to Task 17.**

The bible update is a local-only artifact. Track it in the PR description (Task 21).

---

## Task 17: Pre-flight glossary hand-grep (M1L4 retro item 1)

**Files:** none modified. Read-only verification.

Per M1L4 retro item 1, the voice-check linter does NOT scan `_data/*.yml`, so a manual hyphen check on the four new glossary entries is required.

- [ ] **Step 1: Extract the four new definition strings**

```bash
ruby -ryaml -e 'YAML.load_file("_data/glossary.yml").last(4).each { |e| puts "=== #{e["term"]} ==="; puts e["definition"]; puts }'
```

Expected: the four definitions printed.

- [ ] **Step 2: Hand-check each definition for hyphens outside identifiers**

Look at the printed output. For each definition, confirm no `-` appears in body prose. Identifiers like `Mozilla/5.0`, `Marginalia Atlas/0.4`, `User-Agent` (if used) are exempt — but these have `/` not `-`, so no exemption needed in the M1L5 entries.

Expected hyphen count in M1L5 entries: zero.

- [ ] **Step 3: Hand-grep for em dashes and en dashes**

```bash
grep -nE '—|–' _data/glossary.yml | tail -10
```

Expected: empty output (no em dashes or en dashes anywhere in the glossary, including the four new entries).

- [ ] **Step 4: No commit. Move to Task 18.**

---

## Task 18: Voice pass (full file)

**Files:** none modified directly. Read + fix iteratively.

- [ ] **Step 1: Run the voice linter on the lesson**

```bash
ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md
```

Expected: zero hits. If hits: fix each in `_docs/audiences-humans-and-agents.md` using `Edit`, then re-run until clean.

**Hyphen watchlist this lesson is most likely to invite** (per spec Section 4 step 12):

- `three-audience` → `three audience` or `three-reader` (no — use `three readers` or `three audiences`)
- `doc-page` → `doc page`
- `user-agent` → `user agent`
- `literal-reading` → `literal reading`
- `load-bearing` → `the clause that does the work` or `carries the weight`
- `agent-aware` → `agent aware` or restructure
- `borrower-facing` → `facing the borrower`
- `schema-stage` → `at the schema stage`
- `shelf-location` → `shelf location`
- `downstream-of-agent` → `downstream of the agent`
- `real-time` → `realtime` (one word) or `live`
- `two-state` → `two state` or `two states`
- `three-state` → `three state` or `three states`
- `machine-readable` → `machine readable`
- `Monday-morning` → `Monday morning`
- `weekly-check-in` → `weekly check in` or restructure
- `co-pilot` → `co pilot` (per parent spec Section 2)
- `self-implicating` → `naming her own mistake` or similar

Hyphens inside backticks and inside URLs/identifiers are exempt and skipped by the linter.

- [ ] **Step 2: Read the lesson out loud at desk volume**

Open `_docs/audiences-humans-and-agents.md` (or the rendered `_site/audiences-humans-and-agents.html` page in the browser) and read every block aloud. Where you stumble, the sentence is wrong. Edit the stumble in `_docs/audiences-humans-and-agents.md`. After edits, re-run the voice linter.

- [ ] **Step 3: Confirm Devon's "I write" + "Devon adds/pushes" both appear in block 4**

```bash
grep -n -E 'I write|Devon adds|Devon pushes|Devon merges' _docs/audiences-humans-and-agents.md
```

Expected: at least one "I write" and at least one "Devon adds" (or "pushes" / "merges") in block 4 prose. This preserves M1L4's "Maya reads code, doesn't write code" frame per Spec Section 5 risk 5.

- [ ] **Step 4: Confirm three-audience hedge is intact in block 3**

```bash
grep -n 'Slice it differently' _docs/audiences-humans-and-agents.md
```

Expected: one match in block 3. This is the hedge that addresses Spec Section 5 risk 6 (three-audience may feel too tidy for niche stacks).

- [ ] **Step 5: Confirm all eight glossary chips resolve in the rendered page**

```bash
bundle exec jekyll build 2>&1 | grep -iE 'glossary.*missing|undefined.*term' || echo "All chips OK"
```

Expected: `All chips OK`.

Verify each chip in the built HTML:

```bash
grep -oE 'data-glossary-term="[^"]+"' _site/audiences-humans-and-agents.html | sort -u
```

Expected: at least 8 unique terms in the output: `agent`, `audience`, `description`, `example response`, `OpenAPI`, `reader`, `schema`, `user agent`.

- [ ] **Step 6: Commit any voice-pass edits**

```bash
git status _docs/audiences-humans-and-agents.md
```

If the file has modifications:

```bash
git add _docs/audiences-humans-and-agents.md
git commit -m "fix(m1l5): voice pass corrections (linter + read-aloud)"
```

If no modifications: nothing to commit.

---

## Task 19: Local build verify (full visual + interaction QA)

**Files:** none modified. Verification only.

- [ ] **Step 1: Full production-style build**

```bash
npm run build:css && bundle exec jekyll build
```

Expected: both exit zero with no warnings.

- [ ] **Step 2: Start Jekyll server**

```bash
bundle exec jekyll serve --baseurl '' &
sleep 3
```

Expected: server running at `http://localhost:4000/`.

- [ ] **Step 3: Open the lesson in a browser at desktop width (1280 px)**

Navigate to `http://localhost:4000/audiences-humans-and-agents.html`. Confirm:

- **Block 1.** Mira's complaint quoted correctly. Mira's name appears in scene and in the closer.
- **Block 2.** Three bullets render as a list.
- **Ad slot 1.** Between block 2 and block 3.
- **Block 3.** Three readers (dev, agent, human) clearly named. `Marginalia Atlas/0.4` rendered. Honest moment about agent variance present.
- **Mermaid.** Renders with cream background. Four participants (Mira, Atlas, Doc Page, API) visible. Six arrows.
- **Block 4.** Three subsections (schema description, realistic example, prose disambiguation). YAML and JSON code blocks render with syntax highlighting. Blockquote for the prose paragraph. Close sentence "Three edits. One page. The next Mira gets an answer that means what it says." appears before the SVG setup sentence.
- **SVG.** Toggle (Dev | Atlas) visible at top. Dev state default. JSON in centre-left with sage underlines on all four fields. Annotation panel centre-right shows "What the dev notices" with 3 steps.
- **Block 5.** Exercise callout with the GitHub `GET /repos/{owner}/{repo}` reference. Earned joke parenthetical present.
- **Block 6.** Warning callout with the cost ladder. Mira's morning lands as the final line.
- **Block 7.** Four glossary chips: `audience`, `description`, `example response`, `user agent`. Each chip popover shows its definition on hover.
- **Block 8.** Gemini prompt block. Code block renders. "What to watch for" present.
- **Ad slot 2.** Between block 8 and block 9.
- **Block 9.** Self-check question.
- **Block 10.** Teaser about RFCs ("letters from 1969") + signoff.
- **Signoff.** `Maya.` on its own line at the bottom of the lesson.
- **Reading time chrome.** Shows "15 min".

- [ ] **Step 4: Interaction check (desktop)**

In the same browser tab:
- Click the Atlas toggle: state switches. JSON dims to ~60% opacity except `call_number: "813.5"` which keeps a copper box. Annotation switches to "What Atlas does" with 3 steps including Atlas's quote to Mira and Mira's walk.
- Click Dev: state switches back.
- Tab to the SVG buttons: focus ring (ink) visible on each.
- Press Space on a button: state toggles. **Focus stays on the toggle button** (does not jump elsewhere).
- Hover each of the eight glossary chips: popover renders.

- [ ] **Step 5: Mobile width check (375 px)**

Resize browser to 375px width (or use devtools mobile emulation). Confirm:
- SVG scales down; toggle buttons remain operable.
- If toggle buttons appear cramped (height < 44 px), apply mitigation (a) from Spec Section 5 risk 1: add a CSS media query that stacks the buttons vertically on `max-width: 480px`. The CSS goes in `assets/css/tailwind-input.css` under `@layer utilities`. After adding, run `npm run build:css` and re-verify.
- All other content reflows cleanly (no horizontal scrolling, no overlapping elements).
- Tap interactions on the toggle buttons work.

- [ ] **Step 6: Stop the server**

```bash
pkill -f 'jekyll serve' || true
```

- [ ] **Step 7: If mobile mitigation was applied, commit it**

```bash
git status assets/css/tailwind-input.css
```

If modified:

```bash
git add assets/css/tailwind-input.css
git commit -m "fix(m1l5): stack SVG toggle buttons vertically on mobile for touch target compliance"
```

---

## Task 20: HTMLProofer

**Files:** none modified. Verification only.

Per M1L4 retro item 3, HTMLProofer flags site-wide false positives on Google Fonts, GTM, AdSense preconnect URLs. Use `--ignore-urls` flags or scope to the M1L5 page only.

- [ ] **Step 1: Run HTMLProofer on the M1L5 page**

```bash
bundle exec htmlproofer _site/audiences-humans-and-agents.html --swap-urls '^/apidocumentation:' --ignore-urls '/fonts.googleapis.com/,/fonts.gstatic.com/,/www.googletagmanager.com/,/pagead2.googlesyndication.com/' 2>&1 | tail -30
```

Expected: exits zero with no failed checks. If failures appear, investigate each:
- Real broken internal link → fix in `_docs/audiences-humans-and-agents.md`
- New false positive root URL → add to `--ignore-urls`

- [ ] **Step 2: Confirm all internal links resolve**

```bash
bundle exec htmlproofer _site/audiences-humans-and-agents.html --swap-urls '^/apidocumentation:' --ignore-urls '/fonts.googleapis.com/,/fonts.gstatic.com/,/www.googletagmanager.com/,/pagead2.googlesyndication.com/' --disable-external 2>&1 | tail -10
```

Expected: exits zero. (`--disable-external` skips external URL checks, isolating internal-link validation.)

- [ ] **Step 3: No commit. Move to Task 21.**

---

## Task 21: PR creation

**Files:** none modified.

- [ ] **Step 1: Confirm branch state**

```bash
git status
git log --oneline master..HEAD
```

Expected: working tree clean. Commits should include (in roughly this order):
- feat(m1l5): add audience, description, example response, user agent glossary entries
- chore(m1l5): clean em dash + placeholder flag from modules.yml row 17
- feat(m1l5): rewrite frontmatter to lean schema
- feat(m1l5): draft block 3 (three readers + mermaid + scaffold)
- feat(m1l5): draft block 4 (three edits + SVG include placeholder)
- feat(m1l5): draft block 5 (exercise callout with earned joke)
- feat(m1l5): draft block 6 (the trap + cost ladder)
- feat(m1l5): draft block 1 (diary opener)
- feat(m1l5): draft block 2 (today you will leave with)
- feat(m1l5): draft block 7 (standup chips for audience, description, example response, user agent)
- feat(m1l5): draft block 8 (Gemini AI co pilot tip)
- feat(m1l5): draft blocks 9 + 10 (self check + teaser + signoff)
- chore(m1l5): add SVG stub so build passes; real SVG lands in Task 15
- feat(m1l5): real interactive SVG (2-state toggle Dev/Atlas with reader lenses)
- fix(m1l5): voice pass corrections (linter + read-aloud) (only if Task 18 step 6 had edits)
- fix(m1l5): stack SVG toggle buttons vertically on mobile (only if Task 19 step 7 had edits)

- [ ] **Step 2: Push the branch**

```bash
git push -u origin rewrite/audiences-humans-and-agents
```

Expected: branch pushed; tracking set to `origin/rewrite/audiences-humans-and-agents`.

- [ ] **Step 3: Create the PR**

```bash
gh pr create --title "Rewrite: Audiences: humans, devs, and agents" --body "$(cat <<'EOF'
## Summary

Module 1 Lesson 5 full rewrite per spec at `docs/superpowers/specs/2026-05-28-m1l5-audiences-design.md`. Replaces the 22-line stub from PR #12 (M1L4) with a ~280-line lesson teaching the three-audience taxonomy (dev, agent, human).

## Universe additions

- **Mira**: new Greenfield borrower, first on-screen in M1L5.
- **Marginalia**: Atlas's parent company (resolves bible TBD).
- **Atlas user agent string**: `Marginalia Atlas/0.4` locked.
- **The Quiet Library**: canonical sample book title.
- **call_number field**: added to `GET /v1/books` response shape (Dewey decimal classification, sample value `"813.5"`).
- **Greenfield shelving convention**: fiction shelved alphabetically by author, not by Dewey (source of the M1L5 failure).
- **Maya's Monday branch visits**: recurring story-time anchor.

## Bible updates (gitignored; local-only)

- Timeline: new M1L5 entry.
- API entities: `GET /books` extended with `call_number` and a new `Response field details` subsection (new pattern; may extend to other entries).
- Locked details: eight new entries; one removal (`Atlas's owning company: TBD`).
- Open universe questions: one removal (`Atlas's name is provisional`); section now empty.

## Glossary additions

Four new entries: `audience`, `description`, `example response`, `user agent`. None previously in `_data/glossary.yml`.

## Modules.yml

One-row cleanup at line 17: removed em dash in `reading:` field, removed `placeholder: true` flag, set reading to `"15 min"`.

## SVG decision

2-state toggle (Dev / Atlas) with Mira inside the Atlas state as the downstream consequence. Three-audience claim held intact in block 3 prose. Avoids per-lesson JS and framework extension.

## Risk acknowledgments

- **Mobile touch-target**: in-SVG toggle buttons may fall below 44 × 44 px on 375 px viewport. Mitigation (a) from Spec Section 5 applied if needed during Task 19 mobile check.
- **Earned joke**: parenthetical in block 5. Cut entirely if it doesn't land at review.
- **Three-audience tidiness**: hedge in block 3 ("Slice it differently if your stack demands") preserves room for non-three-reader stacks.

## Definition of Done checklist

- [x] All ten blocks present in order (block comment markers verified in Task 13).
- [x] Reading time 15 min, within 12–18 target.
- [x] One Mermaid diagram (block 3, 4 participants, 6 messages).
- [x] One interactive SVG (block 4, 2-state toggle, keyboard navigable, static fallback works).
- [x] Four glossary terms added; four existing terms (`agent`, `reader`, `schema`, `OpenAPI`) chip-wrapped.
- [x] One self-check question in block 9. No answer key in the lesson.
- [x] One earned joke in block 5 (Maya's parenthetical aside).
- [x] Signoff via `{% include signoff.html %}` at bottom.
- [x] Zero hyphens in body copy (voice linter passes).
- [x] Zero em dashes, en dashes, emoji.
- [x] Zero phrases from the AI tell ban list.
- [x] Maya's voice: second person, names not roles, opinions named, uncertainty named.
- [x] Greenfield consistency: every code sample uses `https://api.greenfield.lib/v1` resources.
- [x] Permalink unchanged from M1L4 stub.
- [x] Two ad slots inline between blocks 2-3 and 8-9.
- [x] Meta description under 155 chars, no AI tells, no emoji.
- [x] Sentence-case headings, clean H2 hierarchy.
- [x] Alt text on Mermaid and SVG.
- [x] Interactive SVG keyboard navigable.
- [x] `bundle exec jekyll build` exits zero.
- [x] `npm run build:css` exits zero.
- [x] `ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md` exits zero.
- [x] HTMLProofer clean with `--swap-urls '^/apidocumentation:'`.
- [x] All glossary chips resolve.
- [x] Frontmatter `module: 1` / `lesson: 5` reconcile with `_data/modules.yml`.
- [x] `placeholder: true` flag removed from M1L5 row.

## Test plan

- [ ] Gaurav reviews end-to-end at desktop and mobile breakpoints.
- [ ] Earned joke gets thumbs up or thumbs down.
- [ ] Three-audience frame either lands or feels too tidy (Spec Section 5 risk 6).
- [ ] Atlas-Mira speech chain in the SVG Atlas state either lands as emotional core or reads cluttered (Spec Section 5 mitigation).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: PR created; URL returned.

- [ ] **Step 4: Confirm the PR**

```bash
gh pr view
```

Expected: shows the M1L5 PR with the body above.

- [ ] **Step 5: Wait for CI**

```bash
gh pr checks --watch
```

Expected: all checks pass. If a check fails, investigate (most likely the Pages build).

- [ ] **Step 6: PR complete. Hand off to Gaurav for review.**

---

## Post-merge tracking

After merge to master and the GitHub Pages deploy completes:

- [ ] **Confirm live site shows the new lesson**

Open `https://beingtechnicalwriter.com/apidocumentation/audiences-humans-and-agents.html` in a browser. Confirm all blocks render correctly, the SVG toggle works, glossary chips hover.

- [ ] **Write the 15-minute retro**

Create `docs/superpowers/specs/retros/audiences-humans-and-agents.md` within 24 hours of merge. Three notes max:
- What worked.
- What to change in the spec.
- What to change in the workflow.

- [ ] **Update auto-memory `project_phase2_progress.md`**

Strike through M1L5 in the CLAUDE.md queue. Note the live URL, the new locked universe details, and what M1L5 added to the bible.

- [ ] **Move on to M1L6** (M2L1, REST principles, file `_docs/restAPI.md`).

---
