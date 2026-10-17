# M2L1 restAPI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `_docs/restAPI.md` (Module 2 Lesson 1, REST principles) end-to-end in Maya's voice against the Phase 2 framework, preserving the `/restAPI.html` permalink, and ship the lesson with its Mermaid diagram, interactive SVG, four new glossary entries, and bible updates.

**Architecture:** Single lesson rewrite on its own branch `rewrite/restAPI`. The lesson is one Markdown file at `_docs/restAPI.md`, one SVG at `assets/svg/restAPI/main.svg`, four glossary entries appended to `_data/glossary.yml`, and five appended entries in `docs/superpowers/greenfield-bible.md` (one Timeline, four Locked details). No new includes, no framework changes, no config changes.

**Tech Stack:** Jekyll 4.x, Liquid, Tailwind CSS (built via `npm run build:css`), Ruby 3.1+, hand-authored SVG using the existing `toggle` pattern in `assets/js/interactive-svg.js`. Mermaid renderer loaded by `_includes/mermaid.html`. Voice linter `scripts/voice-check.rb`. HTMLProofer for link verification.

**Source spec:** `docs/superpowers/specs/2026-05-29-m2l1-restAPI-design.md`. This plan does not duplicate the design rationale; it executes the spec.

---

## Files touched

- **Modify (full rewrite):** `_docs/restAPI.md` — drop legacy content, write the new 10-block lesson.
- **Create:** `assets/svg/restAPI/main.svg` — hand-authored interactive SVG, ~150 lines, `toggle` pattern, GET/POST states.
- **Modify (append):** `_data/glossary.yml` — append 4 entries (REST, safe, cacheable, uniform interface).
- **Modify (append):** `docs/superpowers/greenfield-bible.md` — append 1 Timeline entry and 4 Locked details entries.

No other files are touched. `_data/modules.yml` already has the M2L1 slot; Task 1 verifies this.

---

## Task 1: Prerequisite verification

**Files:** none modified.

- [ ] **Step 1: Confirm working directory and git state.**

Run from the repo root `/Users/gauravtrivedi/Documents/live_projects/apidocumentation`:

```bash
git status
git branch --show-current
```

Expected: working tree clean (only `p.md` may be untracked), current branch is `master`.

- [ ] **Step 2: Confirm `_data/modules.yml` has M2L1 at the right slot.**

Run:

```bash
ruby -ryaml -e 'm = YAML.load_file("_data/modules.yml"); puts m[1]["lessons"][0].to_yaml'
```

Expected output includes `slug: restAPI`, `permalink: /restAPI.html`, and the lesson title (legacy: "REST APIs Key Concepts and Structure"; will be updated to "REST principles" via the lesson frontmatter, not by editing modules.yml).

- [ ] **Step 3: Confirm Phase 2 prerequisites exist on disk.**

Run all four commands:

```bash
ls _includes/callout.html _includes/interactive-svg.html _includes/signoff.html _includes/mermaid.html _includes/glossary-term.html _includes/ad-slot.html
ls assets/js/interactive-svg.js assets/js/mermaid-init.js
ls scripts/voice-check.rb
grep -c "'toggle'" assets/js/interactive-svg.js
```

Expected: all files listed; `grep` returns 1 or higher (the toggle pattern is registered).

- [ ] **Step 4: Confirm `callout.html` supports the `exercise` variant.**

Run:

```bash
grep -E '"?exercise"?' _includes/callout.html | head -3
```

Expected: at least one line matches (the variant CSS class or branch is present).

If empty, the Phase 2 `exercise` variant has not landed yet; STOP and add the variant in a separate prerequisite branch before continuing this plan.

- [ ] **Step 5: Confirm the voice linter runs against a known-clean file.**

Run:

```bash
ruby scripts/voice-check.rb _docs/audiences-humans-and-agents.md && echo "OK"
```

Expected: prints `OK`. (The M1L5 lesson should pass the voice linter; if it does not, the linter or M1L5 has drifted and needs investigation before drafting new prose.)

- [ ] **Step 6: Confirm `gh` CLI is authenticated (per M1L5 retro lesson).**

Run:

```bash
gh auth status 2>&1 | head -5
```

Expected: shows the active GitHub account. If not authenticated, run `gh auth login` interactively before opening the PR in Task 18.

- [ ] **Step 7: Confirm a clean baseline build.**

Run:

```bash
npm run build:css && bundle exec jekyll build 2>&1 | tail -20
```

Expected: no errors; exit 0. The build produces `_site/restAPI.html` from the legacy `_docs/restAPI.md`.

- [ ] **Step 8: Note the baseline reading time and word count of the legacy lesson** (used for the post-ship retro):

```bash
wc -w _docs/restAPI.md
```

Expected: a number (around 2200 words for the legacy lesson, which is over the 12-18 minute target; the rewrite will trim).

No commit yet; this task only verifies state.

---

## Task 2: Create the rewrite branch and lay down the lesson skeleton

**Files:**
- Create branch: `rewrite/restAPI`
- Modify: `_docs/restAPI.md` (full rewrite, skeleton first)

- [ ] **Step 1: Create and switch to the rewrite branch.**

```bash
git checkout -b rewrite/restAPI
```

Expected: switched to a new branch.

- [ ] **Step 2: Replace `_docs/restAPI.md` with the skeleton.**

Replace the entire contents of `_docs/restAPI.md` with this exact content:

```markdown
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

{% comment %}block:1{% endcomment %}
## Marginalia writes in

<!-- TODO block:1 -->

{% comment %}block:2{% endcomment %}
## Today you will leave with

<!-- TODO block:2 -->

{% include ad-slot.html slot="lesson-mid-1" format="auto" %}

{% comment %}block:3{% endcomment %}
## Every verb is an agreement

<!-- TODO block:3 -->

{% comment %}block:4{% endcomment %}
## Put the promise first

<!-- TODO block:4 -->

{% comment %}block:5{% endcomment %}
<!-- TODO block:5 -->

{% comment %}block:6{% endcomment %}
<!-- TODO block:6 -->

{% comment %}block:7{% endcomment %}
## Words you can drop in standups now

<!-- TODO block:7 -->

{% include ad-slot.html slot="lesson-mid-2" format="auto" %}

{% comment %}block:8{% endcomment %}
## AI co pilot tip

<!-- TODO block:8 -->

{% comment %}block:9{% endcomment %}
## Before you go

<!-- TODO block:9 -->

{% comment %}block:10{% endcomment %}
## Next week at Greenfield

<!-- TODO block:10 -->

{% include signoff.html %}
```

- [ ] **Step 3: Verify the skeleton builds.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. The site builds; `_site/restAPI.html` contains the skeleton with `TODO` comments and the empty H2 headings.

- [ ] **Step 4: Verify the voice linter is happy with the skeleton (the body has no prose to violate).**

```bash
ruby scripts/voice-check.rb _docs/restAPI.md
```

Expected: passes. (Skeleton has no body prose, so no voice violations possible. The signoff include is present so the signoff check passes.)

- [ ] **Step 5: Commit the skeleton.**

```bash
git add _docs/restAPI.md
git commit -m "feat(m2l1): lesson skeleton with frontmatter and block markers"
```

---

## Task 3: Stub the interactive SVG so Block 4 references resolve

**Files:**
- Create: `assets/svg/restAPI/main.svg`

The real SVG lands in Task 14. This stub exists so Block 4's `{% include interactive-svg.html slug="restAPI" %}` resolves at build time without 404.

- [ ] **Step 1: Create the SVG directory.**

```bash
mkdir -p assets/svg/restAPI
```

- [ ] **Step 2: Write the stub SVG file at `assets/svg/restAPI/main.svg`.**

Exact content (a minimal valid SVG with the toggle pattern declared so the framework binds correctly but renders almost nothing):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;" data-svg-pattern="toggle" data-states="GET,POST" tabindex="0" role="switch" aria-checked="false" aria-label="Stub. Real SVG ships in Task 14.">
  <title>Stub SVG for M2L1; real toggle SVG ships in Task 14.</title>
  <desc>Placeholder so the lesson build does not 404 on the interactive-svg include. Replaced in Task 14 with the GET vs POST toggle described in the spec.</desc>
  <rect x="0" y="0" width="800" height="500" fill="#FFFFFF" />
  <text x="400" y="250" text-anchor="middle" font-family="Georgia, serif" font-size="18" fill="#0c1a2b">Interactive SVG placeholder. Real SVG ships in Task 14.</text>
</svg>
```

- [ ] **Step 3: Verify build still passes.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. The stub is valid SVG.

- [ ] **Step 4: Commit the stub.**

```bash
git add assets/svg/restAPI/main.svg
git commit -m "chore(m2l1): stub SVG so build passes; real SVG lands in Task 14"
```

---

## Task 4: Append the four new glossary entries

**Files:**
- Modify: `_data/glossary.yml`

- [ ] **Step 1: Append the four entries to the end of `_data/glossary.yml`.**

Append exactly these lines at the end of the file (preserve YAML indentation; entries start with `- term:` at column 0):

```yaml
- term: "REST"
  definition: "Conventions for using HTTP verbs and URLs the way the RFCs say to, so caches, browsers, and agents all read the same call the same way."
  link: "#"
- term: "safe"
  definition: "An HTTP method that promises not to change the server's state. GET is safe; POST is not. Safe methods can be retried without risk."
  link: "#"
- term: "cacheable"
  definition: "A response a downstream cache or proxy may store and reuse without asking the origin server first."
  link: "#"
- term: "uniform interface"
  definition: "REST's first agreement. Every caller reads the same URL the same way, because the verb and the path carry the meaning."
  link: "#"
```

- [ ] **Step 2: Verify YAML still parses.**

```bash
ruby -ryaml -e 'g = YAML.load_file("_data/glossary.yml"); puts g.length; puts g.last(4).map { |e| e["term"] }.join(", ")'
```

Expected output: a number (total glossary entries) and `REST, safe, cacheable, uniform interface`.

- [ ] **Step 3: Verify build still passes.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 4: Commit.**

```bash
git add _data/glossary.yml
git commit -m "feat(m2l1): add 4 glossary entries (REST, safe, cacheable, uniform interface)"
```

---

## Task 5: Draft Block 3 (What just happened) and the Mermaid

**Files:**
- Modify: `_docs/restAPI.md` (replace Block 3 TODO with prose + Mermaid)

Block 3 is drafted before Block 1 per parent-spec Section 5 Step 3 (substance first, scene last). Voice block 3 is plain-English teacher voice, fewer contractions, second person throughout.

- [ ] **Step 1: Replace the Block 3 stub.**

Find the line `<!-- TODO block:3 -->` (under `## Every verb is an agreement`) and replace it with this exact content:

```markdown
Every HTTP verb is an agreement.

Take `GET`. Across every cache, every browser, every agent reading the URL, `GET` means "read this thing." The verb carries the meaning. That is the first agreement: {% include glossary-term.html term="uniform interface" %}. Asha at Marginalia, the cache between her stack and ours, Greenfield's access log, your browser when you bookmark something. They all read `GET` the same way, because the convention is shared.

The second agreement is about what the URL names. `/v1/books` names a thing, the catalog. The query string is how you look at it. `?q=mystery` is the lens. `POST /search` flips that: the URL names the action, the body holds the thing. Resources first, actions in the verb. That is resource orientation.

The third agreement is {% include glossary-term.html term="cacheable" %}. `GET` responses are cacheable by default. `POST` responses are not. When Atlas calls `/books?q=mystery` twenty times an hour, every cache between Atlas and Greenfield can serve the second call onwards from a copy. Greenfield's origin sees one of those calls. The other nineteen never reach it.

The fourth agreement is being {% include glossary-term.html term="safe" %}. `GET` promises not to change server state. Safe means retryable after a flaky network, prefetchable by a browser, loggable with the query, bookmarkable. `POST` makes no such promise. Safety and cacheability are not two separate ideas. A safe verb is naturally cacheable, because the response does not depend on side effects.

Every request stands alone, carrying enough to be understood without context. That is the property the other four rely on. It is called statelessness, and you have already seen it in every Greenfield call: each request carries its own bearer token, its own query, its own headers. The server holds nothing for you between calls.

The current HTTP method spec is RFC 9110. Steve Crocker wrote the first RFC in April 1969. The chain is unbroken. 55 years of agreement is why your browser knows what `GET` means without asking. {% include glossary-term.html term="REST" %} is the discipline of using HTTP the way the RFCs say to.

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

Look at the diagram. Find the cache. It is the one Atlas does not know about and benefits from anyway.
```

- [ ] **Step 2: Run the voice linter on just this lesson.**

```bash
ruby scripts/voice-check.rb _docs/restAPI.md
```

Expected: passes. If it flags anything, fix inline before continuing. Common gotchas in this block: any compound modifier like "in-context" or "doc-page" — rewrite to remove the hyphen.

- [ ] **Step 3: Verify build still passes.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. Mermaid renders (visual verification can wait until Task 17).

- [ ] **Step 4: Commit.**

```bash
git add _docs/restAPI.md
git commit -m "feat(m2l1): draft block 3 (what just happened) with mermaid sequence"
```

---

## Task 6: Draft Block 4 (How we document it) with SVG include

**Files:**
- Modify: `_docs/restAPI.md` (replace Block 4 TODO with prose + interactive SVG include)

Block 4 is practitioner voice. Opinions allowed and named. The SVG include now resolves to the stub; the real SVG lands in Task 14.

- [ ] **Step 1: Replace the Block 4 stub.**

Find the line `<!-- TODO block:4 -->` (under `## Put the promise first`) and replace it with this exact content:

```markdown
Every endpoint's reference page names what the verb commits to in the first three words after the H2. Greenfield's reference page for `/v1/books` opens like this:

> **`GET`. Safe. Cacheable.**

Then the curl. Then a short description of what the endpoint returns. Then the response fields. The verb's promises come first because they are what every reader needs first. The dev wants to copy a snippet. The agent wants to know whether to retry. The cache wants to know whether to store.

Here is the canonical call:

```bash
$ curl -H "Authorization: Bearer $GF_TOKEN" \
       "https://api.greenfield.lib/v1/books?q=mystery"
```

The `200` returns a results array. One of those results is `bk_184932`, *The Quiet Library*, available at `branch_north`.

Now picture the same page for `POST /search`. Same data in, same data out. The differences are in three short bullets.

- **Cache.** Nothing held by default. Every call hits the origin.
- **Retries.** The retry after a flaky network is no longer safe. Two identical retries can create two of whatever the server thinks `POST` does.
- **Access log.** The query lives in the body, which most loggers drop on the floor. You can no longer see which agent asked which question by reading the log.

That names what the doc page owes. A `POST /search` page owes the caller three short lines on the page. This looks like a search. Here is why we POST. Here is what you lose.

Below is the same request in two states. Click to toggle. Watch the five rows flip.

{% include interactive-svg.html slug="restAPI" alt="A toggle between two HTTP requests for the same data. State GET shows the request line GET /v1/books?q=mystery with five rows below: URL = full query visible; cache = hit on the second call; retry = safe; access log = method, path, and query; bookmark = works. State POST shows the request line POST /search with body containing q equals mystery and the same five rows flipped: URL = method and path only; cache = miss every time; retry = not safe; access log = method and path; bookmark = does not work. The toggle is the whole SVG; click or press Enter to switch states." %}

The doc page that names what the verb commits to gives every reader, including Asha and Atlas and the cache, a chance to understand what the call will do before it does it.
```

> **Note on the closing sentence:** the spec's Section 6.2 open decision 2 allows dropping "Mira" if the sentence reads overstuffed. The version above drops Mira and keeps three readers (Asha, Atlas, cache). If the human reviewer wants Mira added back, expand to "including Asha and Atlas and the cache and Mira" during Task 16.

- [ ] **Step 2: Run the voice linter.**

```bash
ruby scripts/voice-check.rb _docs/restAPI.md
```

Expected: passes.

- [ ] **Step 3: Verify build.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. The interactive-svg include resolves to the stub from Task 3.

- [ ] **Step 4: Commit.**

```bash
git add _docs/restAPI.md
git commit -m "feat(m2l1): draft block 4 (how we document it) with SVG include"
```

---

## Task 7: Draft Block 5 (Try it on Greenfield, exercise callout)

**Files:**
- Modify: `_docs/restAPI.md` (replace Block 5 TODO with exercise callout)

- [ ] **Step 1: Replace the Block 5 stub.**

Find the line `<!-- TODO block:5 -->` and replace it with this exact content:

```markdown
{% capture body %}
Open the reference page for one endpoint in any public API doc: Stripe's `/v1/customers`, GitHub's `/repos`, OpenAI's `/v1/chat/completions`, your choice. Find the verb. Read the first three sentences after the verb. Did the page name what the verb commits to: is it safe, is it cacheable, what happens if you retry? Write three sentences in your notes: the verb, the page's answer, your judgment. If the page did not say what the verb commits to, that is the finding. Write that down.

The exercise is not about catching the doc page out. It is about noticing whether the page told you what the call would do before you made it.
{% endcapture %}
{% include callout.html variant="exercise" body=body %}
```

- [ ] **Step 2: Run the voice linter.**

```bash
ruby scripts/voice-check.rb _docs/restAPI.md
```

Expected: passes.

- [ ] **Step 3: Verify build.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors. The exercise callout renders.

- [ ] **Step 4: Commit.**

```bash
git add _docs/restAPI.md
git commit -m "feat(m2l1): draft block 5 (5 min task on a public API doc)"
```

---

## Task 8: Draft Block 6 (The trap, warning callout)

**Files:**
- Modify: `_docs/restAPI.md` (replace Block 6 TODO with warning callout)

Devon-voiced. Dry. The earned-joke slot is here OR in Block 1; spec locks the joke in Block 1, so Block 6 is straight dry technical warning.

- [ ] **Step 1: Replace the Block 6 stub.**

Find the line `<!-- TODO block:6 -->` and replace it with this exact content:

```markdown
{% capture body %}
`POST /search` exists in production at Stripe, Algolia, Elasticsearch, every endpoint where the filter tree will not fit in a URL. The convention is a default, not a religion.

Devon's rule: break the rule when you have a reason. Do not break it by accident. The first version of Greenfield's `/v1/books` endpoint accepted a JSON body on `POST` because Devon copied a tutorial. The cache never served it. The access log never showed the query. Asha would not have written to him about that version. She would have written to ask why everything was slow.

When you ship a search endpoint that does not fit the agreements, the doc page is where you pay the difference. Three short lines on the page. This looks like a search. Here is why we POST. Here is what you lose.
{% endcapture %}
{% include callout.html variant="warning" body=body %}
```

- [ ] **Step 2: Run the voice linter.**

```bash
ruby scripts/voice-check.rb _docs/restAPI.md
```

Expected: passes.

- [ ] **Step 3: Verify build.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 4: Commit.**

```bash
git add _docs/restAPI.md
git commit -m "feat(m2l1): draft block 6 (the trap; POST search exists everywhere)"
```

---

## Task 9: Draft Block 1 (Diary opener with Asha email and the earned joke)

**Files:**
- Modify: `_docs/restAPI.md` (replace Block 1 TODO)

Block 1 is human, warm, contractions on. The earned joke lands here in Devon's deleted "We are not building Algolia." line.

- [ ] **Step 1: Replace the Block 1 stub.**

Find the line `<!-- TODO block:1 -->` (under `## Marginalia writes in`) and replace it with this exact content:

```markdown
Tuesday morning of story week 4. Devon pinged me yesterday. *Marginalia wrote in. Come by tomorrow morning, I want to think out loud.* I find him at his desk with one tab open. Asha's email is on screen.

> *Hi Devon,*
>
> *Any chance you could expose `POST /search`? Our internal stack expects to send a query in a JSON body and we are doing string surgery on our side to fit your URL. If you are open to it we can send a spec.*
>
> *Asha*

Devon types *We are not building Algolia.* into the reply. He looks at it. He deletes it. He kept the version where it stayed in his head.

Last week Mira walked into the branch with a chatbot quoting `813.5`. This morning a Marginalia engineer wants us to switch verbs. Today you need to know why Devon is saying no, because next week you write the docs for Greenfield's new advanced filter endpoint, and the choice will be yours.
```

- [ ] **Step 2: Run the voice linter.**

```bash
ruby scripts/voice-check.rb _docs/restAPI.md
```

Expected: passes. Watch for hyphens in "advanced filter" (no hyphen between adjective and noun, fine) and in "string surgery" (two words, fine).

- [ ] **Step 3: Verify build.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 4: Commit.**

```bash
git add _docs/restAPI.md
git commit -m "feat(m2l1): draft block 1 (diary opener with Asha email and Algolia joke)"
```

---

## Task 10: Draft Block 2 (Today you will leave with)

**Files:**
- Modify: `_docs/restAPI.md` (replace Block 2 TODO)

- [ ] **Step 1: Replace the Block 2 stub.**

Find the line `<!-- TODO block:2 -->` (under `## Today you will leave with`) and replace it with this exact content:

```markdown
- The four agreements every HTTP verb makes.
- The doc pattern that puts the verb's promise first.
- A GPT prompt that audits one of yours.
```

- [ ] **Step 2: Run the voice linter.**

```bash
ruby scripts/voice-check.rb _docs/restAPI.md
```

Expected: passes.

- [ ] **Step 3: Commit.**

```bash
git add _docs/restAPI.md
git commit -m "feat(m2l1): draft block 2 (three takeaways)"
```

---

## Task 11: Draft Block 7 (Words you can drop in standups now)

**Files:**
- Modify: `_docs/restAPI.md` (replace Block 7 TODO)

Each term wrapped in `{% include glossary-term.html %}`. Casual voice. "Use this when you mean..." pattern.

- [ ] **Step 1: Replace the Block 7 stub.**

Find the line `<!-- TODO block:7 -->` and replace it with this exact content:

```markdown
- **{% include glossary-term.html term="REST" %}.** Use this when someone asks "is our API REST." The real question is "do we follow the HTTP conventions."
- **{% include glossary-term.html term="safe" %}.** Use this when you mean "I can call this and nothing on the server changes."
- **{% include glossary-term.html term="cacheable" %}.** Use this when you mean "the cache holds this for me by default, so my next call is fast."
- **{% include glossary-term.html term="uniform interface" %}.** Use this when you mean "every reader of this URL, including browsers, agents, and caches, knows what to do without us telling them."
```

- [ ] **Step 2: Run the voice linter.**

```bash
ruby scripts/voice-check.rb _docs/restAPI.md
```

Expected: passes.

- [ ] **Step 3: Verify build and that the glossary chips render.**

```bash
bundle exec jekyll build 2>&1 | tail -5
grep -c 'glossary-chip' _site/restAPI.html
```

Expected: build clean. The `glossary-chip` (or equivalent class from `_includes/glossary-term.html`) appears multiple times in the rendered HTML.

- [ ] **Step 4: Commit.**

```bash
git add _docs/restAPI.md
git commit -m "feat(m2l1): draft block 7 (standup words with glossary chips)"
```

---

## Task 12: Draft Block 8 (AI co pilot tip with GPT prompt)

**Files:**
- Modify: `_docs/restAPI.md` (replace Block 8 TODO)

Tool rotation: GPT this lesson. Matches the spec.

- [ ] **Step 1: Replace the Block 8 stub.**

Find the line `<!-- TODO block:8 -->` (under `## AI co pilot tip`) and replace it with this exact content:

````markdown
GPT, this time.

**The situation.** You have an endpoint on your desk and you want a second opinion on whether the verb matches the action. Useful before a doc page goes out. Useful when an engineer pushes a PR and the verb feels off.

**The prompt** (copy box):

```text
Here is an HTTP method and path: `GET /v1/customers/{id}/subscriptions`. Audit it against four REST principles: uniform interface, resource orientation, cacheability, safety. For each, say in one sentence whether the choice fits. If you would pick a different verb, name it and explain in one sentence why. Do not hedge.
```

**What to expect back.** Four short lines, one per principle, and a verdict. The verdict either confirms the verb or names a replacement.

**What to watch for.** GPT sometimes hedges with "both are valid." Push back: "pick one and defend it." The hedged answer is not useful. The defended one is. If the verdict is "GET is correct," ask for one case where POST would be the right call. That second pass forces the model off the default and gives you the trap from block 6 in the model's own words.
````

- [ ] **Step 2: Run the voice linter.**

```bash
ruby scripts/voice-check.rb _docs/restAPI.md
```

Expected: passes.

- [ ] **Step 3: Verify build.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 4: Commit.**

```bash
git add _docs/restAPI.md
git commit -m "feat(m2l1): draft block 8 (GPT AI co pilot tip)"
```

---

## Task 13: Draft Blocks 9 and 10 (self check and teaser)

**Files:**
- Modify: `_docs/restAPI.md` (replace Block 9 and Block 10 TODOs)

- [ ] **Step 1: Replace the Block 9 stub.**

Find the line `<!-- TODO block:9 -->` (under `## Before you go`) and replace it with this exact content:

```markdown
Could Greenfield have shipped this catalog without REST? Picture the same `/v1/books?q=mystery` call in a different shape.
```

- [ ] **Step 2: Replace the Block 10 stub.**

Find the line `<!-- TODO block:10 -->` (under `## Next week at Greenfield`) and replace it with this exact content:

```markdown
Next week Devon walks me through three other API shapes Greenfield could have shipped, and he has opinions about all three.
```

The `{% include signoff.html %}` line is already in the skeleton below Block 10; do not duplicate it.

- [ ] **Step 3: Run the voice linter on the entire lesson.**

```bash
ruby scripts/voice-check.rb _docs/restAPI.md
```

Expected: passes. All ten blocks should now register; the linter's block-presence check should be happy.

- [ ] **Step 4: Verify build.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 5: Quick reading-time spot check.**

```bash
wc -w _docs/restAPI.md
```

Expected: roughly 1500-1900 words (12-18 minute target at 150 wpm + 3 minutes for visuals).

- [ ] **Step 6: Commit.**

```bash
git add _docs/restAPI.md
git commit -m "feat(m2l1): draft blocks 9 + 10 (self check, teaser, signoff)"
```

---

## Task 14: Build the real interactive SVG

**Files:**
- Modify: `assets/svg/restAPI/main.svg` (replace stub with the real toggle SVG)

The real SVG is hand-authored, 800x500 viewBox, whole-SVG-as-switch pattern matching M1L3 and M1L5. Toggle between GET and POST states; five labeled rows below the request line flip with the state.

- [ ] **Step 1: Replace the stub at `assets/svg/restAPI/main.svg` with the real SVG.**

Exact content:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;" data-svg-pattern="toggle" data-states="GET,POST" tabindex="0" role="switch" aria-checked="false" aria-label="Toggle the request between GET /v1/books?q=mystery and POST /search to see how URL, cache, retry, access log, and bookmark behave in each state.">
  <title>GET vs POST. The same data, two contracts.</title>
  <desc>A toggle between two HTTP requests for the same data. State GET shows the request line GET /v1/books?q=mystery and five rows: URL = full query visible; cache = hit on the second call; retry = safe; access log = method, path, and query; bookmark = works. State POST shows the request line POST /search with body q equals mystery and the same five rows flipped: URL = method and path only; cache = miss every time; retry = not safe; access log = method and path; bookmark = does not work. Click the diagram or press Enter to switch states.</desc>

  <style>
    .label { font-family: Georgia, serif; font-size: 14px; fill: #0c1a2b; }
    .label-bold { font-family: Georgia, serif; font-size: 14px; fill: #0c1a2b; font-weight: bold; }
    .request-line { font-family: 'SF Mono', Menlo, monospace; font-size: 16px; fill: #0c1a2b; }
    .body-line { font-family: 'SF Mono', Menlo, monospace; font-size: 14px; fill: #0c1a2b; opacity: 0.85; }
    .state-label { font-family: Georgia, serif; font-size: 18px; fill: #b85c38; font-weight: bold; }
    .toggle-hint { font-family: Georgia, serif; font-size: 12px; fill: #0c1a2b; opacity: 0.65; }
    .row-label { font-family: Georgia, serif; font-size: 14px; fill: #0c1a2b; font-weight: bold; }
    .row-value-get { font-family: Georgia, serif; font-size: 14px; fill: #0c1a2b; }
    .row-value-post { font-family: Georgia, serif; font-size: 14px; fill: #0c1a2b; }

    .layer-get { opacity: 1; transition: opacity 0.2s ease; }
    .layer-post { opacity: 0; transition: opacity 0.2s ease; }
    svg[data-state="POST"] .layer-get { opacity: 0; }
    svg[data-state="POST"] .layer-post { opacity: 1; }

    @media (prefers-reduced-motion: reduce) {
      .layer-get, .layer-post { transition: none; }
    }

    svg:focus { outline: none; }
    svg:focus-visible { outline: 2px solid #b85c38; outline-offset: 4px; }
  </style>

  <rect x="0" y="0" width="800" height="500" fill="#FFFBF1" />

  <text x="400" y="28" text-anchor="middle" class="toggle-hint">Click the diagram or press Enter to toggle. Current state shown at the top.</text>

  <g class="layer-get">
    <text x="400" y="60" text-anchor="middle" class="state-label">GET</text>
    <text x="60" y="105" class="request-line">GET /v1/books?q=mystery</text>
  </g>

  <g class="layer-post">
    <text x="400" y="60" text-anchor="middle" class="state-label">POST</text>
    <text x="60" y="105" class="request-line">POST /search</text>
    <text x="60" y="128" class="body-line">{ "q": "mystery" }</text>
  </g>

  <line x1="60" y1="150" x2="740" y2="150" stroke="#0c1a2b" stroke-width="1" opacity="0.2" />

  <g>
    <text x="60" y="190" class="row-label">URL</text>
    <text x="60" y="210" class="row-value-get layer-get">full query visible</text>
    <text x="60" y="210" class="row-value-post layer-post">method and path only</text>
  </g>

  <g>
    <text x="60" y="250" class="row-label">Cache</text>
    <text x="60" y="270" class="row-value-get layer-get">hit on the second call</text>
    <text x="60" y="270" class="row-value-post layer-post">miss every time</text>
  </g>

  <g>
    <text x="60" y="310" class="row-label">Retry</text>
    <text x="60" y="330" class="row-value-get layer-get">safe</text>
    <text x="60" y="330" class="row-value-post layer-post">not safe; may create twice</text>
  </g>

  <g>
    <text x="60" y="370" class="row-label">Access log</text>
    <text x="60" y="390" class="row-value-get layer-get">method, path, and query</text>
    <text x="60" y="390" class="row-value-post layer-post">method and path</text>
  </g>

  <g>
    <text x="60" y="430" class="row-label">Bookmark</text>
    <text x="60" y="450" class="row-value-get layer-get">works</text>
    <text x="60" y="450" class="row-value-post layer-post">does not work</text>
  </g>
</svg>
```

- [ ] **Step 2: Verify file size budget.**

```bash
wc -c assets/svg/restAPI/main.svg
gzip -c assets/svg/restAPI/main.svg | wc -c
```

Expected: raw under 30000 bytes; gzipped under 10000 bytes. The above is ~3 KB raw, ~1.2 KB gzipped, comfortably under budget.

- [ ] **Step 3: Verify SVG validity.**

```bash
xmllint --noout assets/svg/restAPI/main.svg && echo "SVG XML valid"
```

Expected: prints `SVG XML valid`.

- [ ] **Step 4: Verify build.**

```bash
bundle exec jekyll build 2>&1 | tail -5
```

Expected: no errors.

- [ ] **Step 5: Manually verify in the browser.**

Start `jekyll serve` (or rely on a running watch) and visit `http://localhost:4000/restAPI.html`. Confirm:
- The SVG renders with the GET request line and five rows in GET state.
- Click anywhere on the SVG. State flips to POST. Request line, body, and all five row values change.
- Press Tab to focus the SVG; press Enter or Space; state flips. Focus ring is visible (2px copper).
- Mobile breakpoint (DevTools, iPhone SE 375x667): the SVG scales, all five rows visible, touch target is the whole SVG.

If any of these fail, fix inline before committing.

- [ ] **Step 6: Commit.**

```bash
git add assets/svg/restAPI/main.svg
git commit -m "feat(m2l1): real interactive SVG (toggle GET vs POST with 5 contrasting rows)"
```

---

## Task 15: Update the Greenfield bible

**Files:**
- Modify: `docs/superpowers/greenfield-bible.md`

Per the M1L5 retro lesson, bible edits should be **sequential** (separate Edit operations), not collapsed into one. This task uses two distinct edits: one to append the Timeline entry, one to append the Locked details entries.

- [ ] **Step 1: Append the Timeline entry.**

Open `docs/superpowers/greenfield-bible.md`. Find the Timeline section's last existing entry (M1L5: "Mira walks in with a chatbot mistranslating call numbers"). Append the following entry directly after the closing `Quote: ...` line of that M1L5 entry and before the `---` separator that ends the Timeline section:

```markdown

## Module 2, Lesson 1. Asha asks for POST /search.
Story date: Tuesday morning, story week 4. Eight days after Mira walked into the branch (M1L5 was Monday of story week 3).
Event: Asha, a senior engineer at Marginalia, emailed Devon late Friday asking Greenfield to expose POST /search because Marginalia's internal stack expects to send a query in a JSON body. Tuesday morning Devon walks Maya through the polite-decline reply and the four agreements every HTTP verb makes. The lesson is the conventions debate, with the RFC tradition (RFC 1, April 1969 to RFC 9110, 2022) as the conceptual spine.
Characters present: Maya, Devon. Asha (offstage, via email). Atlas (offstage, the original reason Asha is writing).
New API entities introduced: none. Greenfield's GET /v1/books is the reference example; no new endpoints ship in this lesson.
New glossary terms introduced: REST, safe, cacheable, uniform interface.
Quote: "We are not building Algolia." (Devon, dry, said out loud while typing the reply, then deleted from the draft.)
```

- [ ] **Step 2: Append the four new Locked details entries.**

In the same file, find the Locked details section. Append the four entries at the bottom of the section, after the last existing entry (the M1L4/M1L5 entries near the bottom). Use a separate Edit operation from Step 1.

```markdown
- Asha. Senior engineer at Marginalia. She/her. First on-screen via her Friday email in M2L1. Voice: polite, terse, technically specific. Knows enough to ask for a JSON body. May reappear in later Marginalia-Greenfield exchanges (Module 7 likely).
- The RFC tradition. RFC 1 was Steve Crocker, April 1969. RFC 9110 (2022) is the current HTTP semantics spec Greenfield's server library follows. Either or both can be cited when a lesson needs to invoke the weight of the convention.
- Greenfield's advanced filter endpoint. Mentioned in M2L1 block 1 as next week's writing assignment for the apprentice. Locked here so later lessons can refer to it consistently. Final placement and shape decided in the lesson that ships it (likely M2L3 to M2L5).
- Marginalia's "ask for POST /search" pattern. Marginalia's internal stack expects JSON bodies and treats POST as the universal request shape. Locked because it explains why Marginalia keeps proposing POST endpoints. Resurfaces in M7 MCP discussions.
```

- [ ] **Step 3: Spot check the appends.**

```bash
tail -20 docs/superpowers/greenfield-bible.md
grep -c "Asha" docs/superpowers/greenfield-bible.md
grep -c "RFC 9110" docs/superpowers/greenfield-bible.md
```

Expected: tail shows the four new Locked details entries. `Asha` count is 4 or more. `RFC 9110` count is 1 or more.

- [ ] **Step 4: Commit.**

(Note: `docs/superpowers/` is gitignored. The bible commit will be a no-op at the git layer; the file is updated on disk only. Skip the commit step.)

---

## Task 16: Full voice pass and fix any remaining violations

**Files:**
- Modify: `_docs/restAPI.md` (only if violations are found)

- [ ] **Step 1: Run the voice linter against the full lesson.**

```bash
ruby scripts/voice-check.rb _docs/restAPI.md
```

Expected: passes with zero violations. If violations are found, the linter prints `file:line: <reason>` for each.

- [ ] **Step 2: Read the lesson aloud at desk volume.**

Open the file. Read every block aloud, slowly. Where you stumble or the sentence does not flow, the sentence is wrong. Common failures at this stage:
- A long sentence in block 3 or block 4 that wants a period in the middle.
- A second-person pronoun ("you") missing or mis-targeted.
- A glossary chip that breaks reading flow (rare; usually the chip is in the right place).

Fix the stumbles inline.

- [ ] **Step 3: Check the joke lands.**

Block 1's joke is the deleted "We are not building Algolia." Read it to one other person (or, if alone, sit with it 60 seconds). The cut to "He kept the version where it stayed in his head." should land as funny without explanation. If it does not, rewrite the construction. The joke is not optional — Definition of Done requires it lands.

- [ ] **Step 4: Verify reading-time math.**

```bash
WORDS=$(wc -w < _docs/restAPI.md); echo "words: $WORDS"; python3 -c "print(f'reading time: {$WORDS/150 + 3:.1f} min')"
```

Expected: between 12.0 and 18.0 minutes. The `reading_time: 14` in frontmatter should sit within plus or minus 2 minutes of the computed value.

- [ ] **Step 5: Commit (only if Step 1, 2, or 3 produced edits).**

```bash
git add _docs/restAPI.md
git commit -m "fix(m2l1): voice pass corrections"
```

If no edits were needed, skip the commit.

---

## Task 17: Build verification and HTMLProofer

**Files:** none modified.

- [ ] **Step 1: Clean build.**

```bash
rm -rf _site
npm run build:css && bundle exec jekyll build 2>&1 | tail -10
```

Expected: exit 0, no errors, no Liquid warnings, no missing-include warnings.

- [ ] **Step 2: HTMLProofer on the new page.**

```bash
bundle exec htmlproofer _site/restAPI.html --disable-external --swap-urls '^/apidocumentation:'
```

Expected: zero failures. The `--swap-urls` flag strips the `/apidocumentation` baseurl prefix so internal links resolve against the local `_site/` root (per the CLAUDE.md "Active habit" item 7).

If failures appear, they are usually one of:
- A broken internal link (typo in `previous_page` or `next_page` URL): check frontmatter.
- A missing image referenced in alt text: check that no implicit image references slipped in.
- A glossary term that does not resolve: check `_data/glossary.yml` for the four new entries.

Fix and re-run until clean.

- [ ] **Step 3: Visual verification at desktop and mobile breakpoints.**

Open `http://localhost:4000/restAPI.html` (running `bundle exec jekyll serve --baseurl ''` if not already up). Verify:

**Desktop (1440px wide):**
- Frontmatter title "REST principles" renders as the H1.
- Block 1 reads as a Tuesday-at-Devon's-desk scene; Asha's email is a styled blockquote, not a code block.
- Block 3 Mermaid renders with light background (cream/white), not slate-800 (M1L1 retro fix in place).
- Block 4 SVG renders the GET state by default. Click toggles to POST. Five rows flip.
- Block 5 exercise callout has the correct visual treatment.
- Block 6 warning callout has the correct visual treatment.
- Block 7 glossary chips are inline and styled.
- Block 8 prompt code box is copy-able (visual cue, not a literal test).
- Block 10 signoff renders `Maya.` on its own line.

**Mobile (375px wide, DevTools iPhone SE):**
- SVG scales without overflow.
- Toggle still works via tap.
- All five rows visible.
- No horizontal scroll on any block.

- [ ] **Step 4: Commit (only if Step 1, 2, or 3 produced edits).**

```bash
git add -A
git commit -m "fix(m2l1): post-build verification adjustments"
```

If no edits were needed, skip.

---

## Task 18: Open the pull request

**Files:** none modified.

- [ ] **Step 1: Verify `gh` auth (re-check from Task 1 Step 6).**

```bash
gh auth status 2>&1 | head -3
```

Expected: authenticated. If not, run `gh auth login` interactively.

- [ ] **Step 2: Push the branch to origin.**

```bash
git push -u origin rewrite/restAPI
```

Expected: branch pushed; remote tracking set.

- [ ] **Step 3: Open the PR with the Definition of Done checklist in the body.**

```bash
gh pr create --title "Rewrite: REST principles" --body "$(cat <<'EOF'
## What

Module 2 Lesson 1 rewrite. Replaces the legacy `_docs/restAPI.md` ("REST APIs Key Concepts and Structure") with the Phase 2 voice-and-template version titled "REST principles". Permalink `/restAPI.html` preserved. Slug, module, lesson unchanged.

Spec: `docs/superpowers/specs/2026-05-29-m2l1-restAPI-design.md`.
Plan: `docs/superpowers/plans/2026-05-29-m2l1-restAPI-plan.md`.

Story bridge from M1L5: Atlas's user agent string `Marginalia Atlas/0.4` showed up Monday. This Tuesday a Marginalia engineer (Asha) emails asking for `POST /search`. Devon walks Maya through why the answer is no. The lesson is the conventions debate; the four agreements (uniform interface, resource orientation, cacheability, safety) surface through the argument. RFC tradition (RFC 1, 1969 to RFC 9110, 2022) is the conceptual spine, named once in block 3.

## Definition of Done (per Phase 2 spec Section 4)

### Structure
- [ ] All ten blocks present in order, with Liquid `block:N` comment markers.
- [ ] Reading time 12 to 18 minutes (`wc -w` divided by 150 plus 3 min).
- [ ] One Mermaid diagram, max 10 nodes, in block 3.
- [ ] One interactive SVG in block 4. Keyboard navigable, static fallback works, alt text conveys same info.
- [ ] Four glossary terms added to `_data/glossary.yml`. Each linked via `glossary-term.html` in the lesson.
- [ ] One self check in block 9, no answer key.
- [ ] One earned joke in block 1 (Devon's deleted "We are not building Algolia." line). Gets human laugh test.
- [ ] Signoff via `signoff.html` at the bottom.

### Voice
- [ ] Zero hyphens in body prose (allowed only inside code, URLs, headers, identifiers, vendor names).
- [ ] Zero em dashes anywhere.
- [ ] Zero en dashes anywhere.
- [ ] Zero emoji anywhere.
- [ ] Zero phrases from the AI tell ban list.
- [ ] Voice linter (`scripts/voice-check.rb`) passes.

### Greenfield consistency
- [ ] Code samples use `https://api.greenfield.lib/v1` and canonical resources.
- [ ] Diary opener bridges from M1L5 (Mira mentioned by name; Atlas as the original reason Asha is writing).
- [ ] Closing teaser sets up M2L2 (Types of APIs).
- [ ] Bible updated with the M2L1 timeline entry and four new Locked details.

### SEO and revenue
- [ ] `permalink: /restAPI.html` unchanged.
- [ ] No `redirect_from` needed (URL unchanged).
- [ ] Two ad slots: `lesson-mid-1` between blocks 2 and 3; `lesson-mid-2` between blocks 7 and 8.
- [ ] Meta description set (≤155 chars, plain prose, no AI tells, no emoji).

### Accessibility
- [ ] Headings sentence case (except H1), clean H2 hierarchy.
- [ ] All images and SVGs have alt text conveying the same information.
- [ ] Interactive SVG keyboard navigable.
- [ ] Color is not the only carrier of information.
- [ ] Code samples are real text, not images.

### Technical and build
- [ ] `bundle exec jekyll build` exits zero.
- [ ] `npm run build:css` exits zero.
- [ ] No Liquid errors or missing-include warnings.
- [ ] HTMLProofer clean on the new page (with `--swap-urls '^/apidocumentation:'`).
- [ ] Glossary terms validate (four new entries resolve).
- [ ] Frontmatter complete; `module: 2`, `lesson: 1` reconcile with `_data/modules.yml`.

## Anything unusual

- Four new glossary entries added: REST, safe, cacheable, uniform interface.
- New character locked in the bible: Asha, senior engineer at Marginalia. First on-screen via email.
- Tool rotation for the AI co pilot tip: GPT (M1L1 GPT, M1L2 Claude, M1L3 Claude, M1L4 Cursor, M1L5 Gemini, M2L1 GPT).
- Open decision deferred to review: whether to add Mira back to the closing sentence of block 4 (currently lists Asha, Atlas, cache as the three readers).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: prints the PR URL.

- [ ] **Step 4: Print the PR URL for the user.**

The `gh pr create` output is the PR URL. Note it and report it back as the final task output.

---

## Self-review notes

**Spec coverage (sanity check):**
- Conventions-first frame → blocks 1, 3, 4, 5, 6 all hang on GET vs POST.
- Tight four principles → block 3 names all four; block 4 shows the doc-page pattern; block 6 names the exception.
- RFC tradition → block 3, two sentences.
- Story trigger (Asha's email) → block 1.
- Cross-module bridge → block 10 sets up M2L2.
- Visuals: Mermaid → Task 5 / block 3; SVG stub → Task 3; real SVG → Task 14.
- Glossary additions → Task 4 (data) + Tasks 5, 7 (linked).
- Bible deltas → Task 15.
- AI co pilot rotation → block 8 / Task 12 uses GPT.
- Voice pass → Task 16 explicit step.
- Build, HTMLProofer, mobile check → Task 17.
- Definition of Done → embedded in the PR body in Task 18.

**Placeholders:** none. Every step has exact content.

**Type/signature consistency:** Liquid includes use the parameter names the existing includes expect (`slot`, `format`, `term`, `slug`, `alt`, `content`, `body`, `variant`). Mermaid `participant API as Greenfield API` matches Mermaid syntax for aliases. SVG `data-svg-pattern="toggle"` and `data-states="GET,POST"` match the contract in `assets/js/interactive-svg.js`.

**Risks the executor should know about:**
- Hyphens in code-adjacent prose are easy to introduce ("doc-page", "real-world", "5-minute"). The voice linter catches them; do not ignore a flag.
- The bible is gitignored. The bible edits in Task 15 are still required but do not need to be committed.
- The voice linter's block-presence check expects all ten `block:N` Liquid comments in order. Do not delete them when filling in prose.
