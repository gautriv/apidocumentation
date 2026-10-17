# CLAUDE.md

Context for any Claude Code session working on this repo. Keep this file short and current.

## What this is

The free **API Documentation Course** published at `https://beingtechnicalwriter.com/apidocumentation/`. Jekyll static site + Tailwind, deployed to GitHub Pages via the `.github/workflows/build.yml` Action. AdSense-funded.

Modernization is phased:
- **Phase 0 (done):** Design direction picked — see `design-mockups/a-stripe.html` (homepage) and `a-stripe-lesson.html` (lesson page).
- **Phase 1 (structurally done):** New layout shell, Tailwind, design tokens, data-driven nav, name-modal personalization, Cmd+K palette stub, AI chat widget stub, ad-slot scaffolding, legacy cleanup. See `design-mockups/MIGRATION_PLAN.md` for the file-by-file checklist.
- **Phase 2 (in progress):** Lesson-by-lesson rewrites in Maya's voice. **Source of truth: `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md`.** That spec is canonical for the lesson template, the voice rules, the AI tell ban list, the Definition of Done, the visual production pipeline, the prerequisites, and the Greenfield universe.
  - **Pilot shipped (2026-05-20):** `whatisanapi.html` (Module 1 Lesson 2). Live at `https://beingtechnicalwriter.com/apidocumentation/whatisanapi.html`. Infrastructure (signoff, interactive-svg framework, voice linter, mermaid theme, callout exercise variant, greenfield-bible) all landed in the same merge.
  - **Phasing decision (2026-05-20, overrides spec Section 4):** Rewrite all 42 remaining lessons **in curricular order** (Module 1 Lesson 1 next, then Module 1 Lesson 3, then Module 1 Lesson 4, and so on through Module 8). Skip the spec's GA4-traffic-first ordering and skip the 14-day-or-500-pageviews wait. Reason: tell one complete user story across the arc, not jump around by traffic. Risk accepted: if a spec issue surfaces mid-batch, fixes will be applied across all already-written lessons rather than caught at lesson 14.
  - **Per-lesson workflow** still follows spec Section 5: brainstorm → 10-block outline → draft → SVG + Mermaid → voice pass via `scripts/voice-check.rb` → PR with DoD checklist → human review (Gaurav).
  - **Plans live at:** `docs/superpowers/plans/`. The pilot plan is at `docs/superpowers/plans/2026-05-20-phase-2-pilot.md`; future per-lesson or per-module plans go in the same directory.
- **Phase 3 (when Phase 2 lands):** Final legacy cleanup once every lesson is migrated off the restored `*_exe_*.html` / `enhanced_note.html` / `key_takeaways.html` includes.

Parent plan: `~/.claude/plans/i-prepared-this-api-proud-codd.md` (off-repo).

## Where decisions live (durable record map)

**Specs (canonical decisions, locked):**
- `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md` — Phase 2 framework. Voice rules, 10-block template, DoD, visual pipeline. Most-referenced spec.
- `docs/superpowers/specs/2026-05-20-toc-finalization-design.md` — 8-module / 46-lesson TOC. Overrides parts of the Phase 2 spec.
- `docs/superpowers/specs/YYYY-MM-DD-m<N>l<M>-<source-slug>-design.md` — per-lesson design specs. One per rewrite. Example: `2026-05-20-m1l1-journey-design.md` for Module 1 Lesson 1 (`_docs/journey.md`).

**Plans (implementation steps):**
- `docs/superpowers/plans/2026-05-20-phase-2-pilot.md` — pilot lesson (shipped).
- `docs/superpowers/plans/2026-05-20-toc-finalization-implementation.md` — TOC finalization (shipped).
- `docs/superpowers/plans/YYYY-MM-DD-m<N>l<M>-<source-slug>-plan.md` — per-lesson plans.

**Universe canon (writer's reference, not on the site):**
- `docs/superpowers/greenfield-bible.md` — Cast, Timeline, API entities, Locked details. Update in same PR as any lesson that introduces new universe details.

**Post-ship retros:**
- `docs/superpowers/specs/retros/<source-slug>.md` — 15-minute retro per lesson after merge. Three notes max: what worked, what to change in spec, what to change in workflow.

**Off-repo:**
- `~/.claude/plans/i-prepared-this-api-proud-codd.md` — parent modernization plan.

## Next-lesson queue (curricular order)

The order Phase 2 will rewrite the remaining 45 lessons. The pilot (Module 1 Lesson 2 `whatisanapi`) is not in this queue because it shipped 2026-05-20. Strike through after merge; the queue is the source of truth for what is next.

**Module 1. Foundations.**

1. ~~`_docs/journey.md`~~ — M1 L1, "The internet, the short version" — **shipped to master 2026-05-21**. Live at `/howinternetworks.html`. Brought infrastructure fixes (callout markdownify, SVG tooltip positioning, mermaid contrast, privacy footer) along with it.
2. ~~`_docs/whatwritersdo.md`~~ — M1 L3, "What an API writer does in 2026" — **shipped to master 2026-05-22** (PR #11). Live at `/whatwritersdo.html`. Added `reader` glossary entry, toggle-pattern SVG.
3. ~~`_docs/informationgathering.md`~~ — M1 L4, "Information gathering and interviewing the codebase" — **shipped to master 2026-05-22** (PR #12, merge commit 24e35db). Live at `/informationgathering.html`. Added four glossary entries (`source of truth`, `SME`, `schema`, `OpenAPI`), hover-tooltip sources-map SVG, removed six orphan legacy assets, AND shipped a minimal M1L5 stub to close the next-page 404 risk. Retro at `docs/superpowers/specs/retros/informationgathering.md`.
4. ~~`_docs/audiences-humans-and-agents.md`~~ — M1 L5, "Audiences: humans, devs, and agents" — **shipped to master 2026-05-28** (PR #13, merge commit ca23d68). Live at `/audiences-humans-and-agents.html`. Added four glossary entries (`audience`, `description`, `example response`, `user agent`), 2-state toggle SVG (Dev/Atlas reader lenses, whole-SVG-as-switch convention per M1L3), eight new bible Locked details (Mira, Marginalia, `Marginalia Atlas/0.4` user agent string, *The Quiet Library*, sample `call_number` value "813.5", story week 3, Greenfield's shelving convention, Maya's Monday branch visits), one Locked details removal (Atlas's owning company TBD) and one Open universe question removal (Atlas's name is provisional → resolved as no rename). First specific borrower/agent failure inside Greenfield; Atlas's quiet first on-screen appearance. Retro at `docs/superpowers/specs/retros/audiences-humans-and-agents.md`.

**Module 2. REST, HTTP, and the dance.**

5. ~~`_docs/restAPI.md`~~ — M2 L1, "REST principles" — **shipped to master 2026-05-29** (PR #14, merge commit `a68da8f`). Live at `/restAPI.html`. Added four glossary entries (`REST`, `safe`, `cacheable`, `uniform interface`), interactive toggle SVG (GET vs POST with five contrasting rows: URL, cache, retry, access log, bookmark), three-participant sequence Mermaid (Atlas → Cache → API). Four new bible Locked details (Asha as Marginalia's senior engineer, RFC tradition pointer, Greenfield's "advanced filter" endpoint placeholder, Marginalia's recurring POST /search ask). First time a Marginalia *human* appears (offstage, via email), bridging from M1L5's first Atlas user agent sighting. Tool rotation: GPT for the AI co pilot tip. Retro at `docs/superpowers/specs/retros/restAPI.md`.
6. ~~`_docs/typesofAPI.md`~~ — M2 L2, "Types of APIs" — **shipped to master 2026-05-31** (PR #15, merge commit `0f92fa4`). Live at `/typesofAPI.html`. Added four glossary entries (`SOAP`, `GraphQL`, `gRPC`, `request envelope`), hand-authored 4-cell hover-tooltip SVG (REST emphasized with copper border + "the actual" pill; SOAP, GraphQL, gRPC counterfactuals with sage borders), GraphQL sequence Mermaid (Atlas → Greenfield GraphQL). Four new bible Locked details (Greenfield's API shape: REST, Devon's "RPC in a REST jacket" image, the small whiteboard convention near Devon's desk, the four canonical shapes Devon opined on). First lesson taught via the Asha-counterfactual frame ("what would Asha's email have looked like in shape X"). Deleted four orphan legacy assets (1.4MB freed). Tool rotation: GitHub Copilot Chat for the AI co pilot tip. Net diff: +201 / -1058 lines; lesson trimmed from 2,600 to 1,937 words. Retro at `docs/superpowers/specs/retros/typesofAPI.md`.
7. ~~`_docs/anatomyofurl.md`~~ — M2 L3, "Anatomy of a URL (part 1)" — **shipped to master 2026-05-31** (PR #16, merge commit `2606a74`). Live at `/anatomyofurl.html`. Added four glossary entries (`scheme`, `host`, `resource`, `query string`), hand-authored 5-region hover-tooltip URL SVG (two-line wrap; three new query params `branch`/`shelf`/`on_shelf` rendered in copper, existing parts in ink, with legend), 4-participant request-routing sequence Mermaid (Atlas → DNS → Greenfield API → books handler). Six bible operations: 1 Timeline entry, 3 new Locked details (shelf taxonomy fiction/biography/reference/periodicals, advanced-filter extension of GET /v1/books, Devon's PR-description voice), 2 in-place edits (RFC tradition adds RFC 3986, GET /books API entity adds three new query params). **Honored M2L1's two-week-old advanced-filter writing promise via URL design** (doc-page writing deferred to Module 4). First lesson where Maya drives (Devon offstage in his 9:30 standup, M1L4 callback); first time the apprentice writes a URL. Deleted two orphan legacy assets (grep-before-delete saved `_data/url_faqs.yml` which M2L4 still references). Tool rotation: Cursor for the AI co pilot tip. Lesson trimmed from 3,031 to ~2,000 words (16 min reading). Retro at `docs/superpowers/specs/retros/anatomyofurl.md`.
8. **`_docs/anatomyofurltwo.md`** — M2 L4, "Anatomy of a URL (part 2)" — **next** (full rewrite). Legacy lesson, already live at `/anatomyofurltwo.html`. Story bridge from M2L3 block 10: *"Next week the URL gets harder. The parts we skipped today (fragments, port, path parameters) and the parts that hurt when they go wrong (encoding, traversal, ambiguous slashes) all show up. Devon has opinions about those too."* **Pickup obligation flagged in M2L3 spec Section 6.1 risk #10:** M2L4 must explicitly claim fragments, port, path parameters, encoding, traversal, and ambiguous slashes in its scope perimeter, or M2L3's bridge goes unredeemed. Also references `_data/url_faqs.yml` (the orphan-cleanup grep in M2L3 Task 10 saved this from deletion); the M2L4 rewrite should rebuild any FAQ content from scratch in the new voice and then the data file can be deleted. Story-week 7. Brainstorm starts the next session.
9. `_docs/requestandresponse.md` — M2 L5, "Request and response" (slug mismatch: source is `requestandresponse.md`, permalink is `/apirequestsresponses.html`)
10. *new* `_docs/pagination-idempotency-rate-limits.md` — M2 L6, "Pagination, idempotency, rate limits" (stub created 2026-05-20)
11. `_docs/curl.md` — M2 L7, "cURL and why you should still know it"
12. *new* `_docs/auth-incl-agents.md` — M2 L8, placeholder

**Module 3. Data shapes.**

13. `_docs/json.md` — M3 L1, "JSON like you mean it" (slug mismatch with `JSON101.html`)
14. `_docs/xml.md` — M3 L2 (slug mismatch with `XML101.html`)
15. `_docs/dataformats.md` — M3 L3
16. `_docs/visualdatatypes.md` — M3 L4 (slug mismatch with `visualizingdatatypes.html`)
17. *new* `_docs/json-schema-for-llms.md` — M3 L5, placeholder

**Module 4. Writing the docs.**

18. *new* `_docs/quickstart-that-ships.md` — M4 L1, "Quickstart that ships in 5 minutes" (stub created 2026-05-20)
19. `_docs/writingapi.md` — M4 L2
20. `_docs/bridginggaps.md` — M4 L3 (slug mismatch with `keyconcepts.html`)
21. *new* `_docs/openapi-without-tears.md` — M4 L4, placeholder
22. *new* `_docs/samples-that-dont-rot.md` — M4 L5, placeholder
23. *new* `_docs/errors-that-help.md` — M4 L6, placeholder

**Module 5. Webhooks and async.**

24. `_docs/webhook.md` — M5 L1 (slug mismatch with `webhooks.html`)
25. `_docs/bdocumentingwebhook.md` — M5 L2 (slug mismatch)
26. `_docs/idocumentingwebhook.md` — M5 L3 (slug mismatch)
27. `_docs/edocumentingwebhook.md` — M5 L4 (slug mismatch)
28. *new* `_docs/asyncapi-event-driven.md` — M5 L5, placeholder

**Module 6. Modern API shapes.**

29. *new* `_docs/streaming-and-sse.md` — M6 L1, placeholder
30. *new* `_docs/websockets-for-realtime.md` — M6 L2, placeholder
31. *new* `_docs/graphql-docs-in-practice.md` — M6 L3, placeholder
32. *new* `_docs/grpc-and-protobuf.md` — M6 L4, placeholder

**Module 7. AI-native documentation.**

33. *new* `_docs/writing-docs-for-llms.md` — M7 L1, placeholder
34. *new* `_docs/mcp-what-it-is.md` — M7 L2, placeholder
35. *new* `_docs/tool-use-schemas.md` — M7 L3, placeholder
36. *new* `_docs/prompt-engineering-for-docs.md` — M7 L4, placeholder
37. *new* `_docs/eval-driven-docs.md` — M7 L5, "Eval-driven docs: testing docs the way you test code" (stub created 2026-05-20)
38. *new* `_docs/ai-doc-assistant.md` — M7 L6, placeholder

**Module 8. Practice and ship (rewritten as continuous capstone).**

39. `_docs/bdocumentingrestapi.md` — M8 L1, capstone day 1: audit memo
40. `_docs/idocumentingrestapi.md` — M8 L2, capstone day 2: endpoint reference
41. `_docs/edocumentingrestapi.md` — M8 L3, capstone day 3: OpenAPI spec
42. `_docs/btestingapipostman.md` — M8 L4, capstone day 4 morning: Postman happy path
43. `_docs/itestingapipostman.md` — M8 L5, capstone day 4 afternoon: Postman error paths
44. `_docs/extestingapipostman.md` — M8 L6, capstone day 5: publish to a real URL
45. `_docs/course-completion.md` — M8 L7, portfolio entry and finishing the course


## Local dev

Two-process build: **Tailwind** compiles `assets/css/main.css`; **Jekyll** then assembles the site.

```bash
# First time only
bundle install
npm install

# Each session — two terminals:
npm run watch:css                       # terminal 1: live-rebuild CSS
bundle exec jekyll serve --baseurl ''   # terminal 2: → http://localhost:4000/
```

Use `--baseurl ''` so the local URL is `http://localhost:4000/`. Production uses `baseurl: /apidocumentation` (set in `_config.yml`) — do not change that file for local convenience.

One-shot build (matches CI):
```bash
npm run build:css && bundle exec jekyll build
```

**Troubleshooting:**
- `cannot load such file -- logger` → Ruby 3.5+/4.0 dropped bundled gems. `gem "logger"` (and friends) are in the Gemfile; run `bundle install`.
- Site renders unstyled → `assets/css/main.css` missing. Run `npm run build:css`.
- New Tailwind class not applied → add the file path to `tailwind.config.js` `content`, then rebuild CSS.
- Class is toggled by JS (e.g. `name-only`, `tip-open`, `show`, `sheet-open`) and not applied → it's already in `safelist` in `tailwind.config.js`; if a new one, add it there.
- `bundle exec jekyll serve` warns about Sass `@import` deprecation → no longer applies; we're on Tailwind now. If you still see this, an old `.scss` partial is lingering — delete it.

## Production deploy

GitHub Pages cannot run Node + Tailwind on its own. The `.github/workflows/build.yml` Action does it for us:

1. Push to `master` or `modernize-phase-1`.
2. Action checks out, sets up Ruby 3.1 + Node 18.
3. Runs `npm ci` → `npm run build:css` → `node scripts/generate-og.mjs` → `bundle exec jekyll build` → `npx pagefind`.
4. Uploads `_site/` to Pages via `actions/upload-pages-artifact@v3` + `actions/deploy-pages@v4`.

**One-time setup required** (do this before the first push if not already done):

> Repo Settings → Pages → Source: **GitHub Actions** (not "Deploy from a branch")

Without this, the Action runs but Pages keeps serving the old branch-built version.

Watch builds in the **Actions** tab. If a build fails, the live site stays on the last successful deploy — no half-broken site goes live.

## Hard constraints (do not violate)

1. **Jekyll + GitHub Pages output.** No stack migrations. Tailwind/Node tooling is fine *as a build step*; the deployable output is still a static site.
2. **AdSense-only monetization.** Publisher ID `ca-pub-7149683584202371`. No affiliate links, no paid tier, no sponsored content unless explicitly requested. Improvements happen *within* AdSense (placements, Auto Ads, lazy-load, consent, ad refresh).
3. **URLs must not change.** Each lesson's `permalink:` is load-bearing for SEO + ad revenue. If a lesson is renamed during a content rewrite, add a `redirect_from:` entry (`jekyll-redirect-from` is enabled) — never break a live URL.
4. **No sign-in.** Personalization is `localStorage` only — see `assets/js/personalize.js`. The name is never sent to a server.

## Voice & tone (when writing or editing lesson copy)

The full rules live in the Phase 2 spec (Section 3). The summary below is the load-bearing subset; read the spec before writing or editing lesson copy.

- Narrator persona: **Maya**, a senior technical writer. Cast: Maya (she/her), Devon (he/him, staff eng), Priya (she/her, PM), Atlas (it/it, third-party agent). The reader is Maya's apprentice (they/them).
- Running example: **The Greenfield Library API** at `https://api.greenfield.lib/v1`. Every code sample uses this base URL and the canonical resources (`/books`, `/branches`, `/borrowers`, `/loans`, `/holds`, `/events`). No `example.com`. No placeholders.
- Open every lesson with a Greenfield scene; never "In this lesson, we will…".
- One earned joke per lesson, in block 1 or block 5. Dry, observational, never zany.
- Every lesson ships the ten-block template defined in spec Section 2, ending with `{% include signoff.html %}` which renders `Maya.` on its own line. (Phase 2 supersedes the old `— Maya` signoff.)
- **Punctuation in lesson body prose: no hyphens, no em dashes, no en dashes, no emoji.** Hyphens are allowed inside code, URLs, headers, identifiers, vendor names. The voice linter (`scripts/voice-check.rb`, Phase 2 prerequisite) flags violations.
- AI tell ban list is enforced (no "let's dive in", "delve", "crucial", "seamless", "in conclusion", etc.). Full list in spec Section 3.
- Sentence case for headings (except H1); serial comma; backticks for HTTP codes, methods, header names; numerals for HTTP, sizes, versions, percentages.

(These rules apply to lesson copy on the public site. CLAUDE.md, commit messages, and other internal docs are not bound by the punctuation bans, only by the emoji ban.)

## Curriculum source of truth

`_data/modules.yml` — 8 modules, 46 lesson slots (27 existing, 19 placeholders as of 2026-05-20). The sidebar nav, prev/next, breadcrumbs all read from this. To add a lesson:
1. Create `_docs/<slug>.md` with `permalink: /<slug>.html` (keep existing URL pattern).
2. Add `module:` and `lesson:` to the frontmatter matching its `_data/modules.yml` position.
3. Register it in the matching module's `lessons:` array.
4. Remove the `placeholder: true` flag if the slot was reserved.

The 8-chapter Greenfield story arc that maps onto these modules is in spec Section 1.

## Includes and components

| Want to write… | Use |
|---|---|
| A call-out box | `{% include callout.html variant="tip\|note\|warning\|recap\|exercise" body=body %}` (capture body first; Phase 2 adds the `exercise` variant) |
| An ad slot | `{% include ad-slot.html slot="<id>" format="auto" %}` — never paste AdSense markup inline |
| A glossary-tooltip word | `{% include glossary-term.html term="JWT" %}` (definition in `_data/glossary.yml`) |
| A Mermaid diagram | `{% include mermaid.html content=src %}` (capture multi-line source first) |
| A lesson's interactive SVG (block 4) | `{% include interactive-svg.html slug="<slug>" alt="<description>" %}` (Phase 2 prerequisite) |
| Maya's signoff at the end of a lesson | `{% include signoff.html %}` (Phase 2 prerequisite) |
| A live OpenAPI playground | `{% include openapi-playground.html spec="/assets/api/greenfield.yaml" %}` |

**Legacy includes still present:** `enhanced_note.html`, `key_takeaways.html`, and all `_includes/{b,i,e,wb,iwb,ewb}_exe_*.html`. These hold real lesson content used by 38+ existing lessons. They will be migrated as part of each Phase 2 lesson rewrite. **Don't expand their usage** — new lessons use the components in the table above.

## Don't touch without asking

- `_config.yml` (production site settings, especially `baseurl`, `permalink`, the `adsense` block, `google_analytics`)
- `robots.txt`, `sitemap.xml`, `feed.xml`
- Lesson `permalink:` values (revenue-load-bearing)
- `.github/workflows/build.yml` (touching this can break the live deploy)
- AdSense client ID and the `adsense:` block

## Files that are intentionally there

- `assets/css/tailwind-input.css` — the Tailwind source. Edit this (not `main.css`) when you need custom `@layer base` / `@layer utilities` rules.
- `tailwind.config.js` — Tailwind config. Token colors (`ink`, `cream`, `copper`, `sage`) and font stacks live here; design system changes start here.
- `assets/css/fallback.css` — minimal browser-default-overrider used in case `main.css` is missing. Cheap safety net; leave alone.
- `assets/css/styles.css` — old monolithic stylesheet from the previous design. Stays until every lesson is migrated to the new components, because some still rely on its rules. Scheduled deletion in Phase 3.
- `design-mockups/` and `cloudflare-worker/` — excluded from the Jekyll build via `_config.yml` `exclude:`.
- `scripts/generate-og.mjs` — runs in CI to generate per-lesson OG images. Currently a stub that writes placeholder bytes; replace with real `@vercel/og` or `satori` rendering in Phase 2 polish.

## Files that are NOT in git (regenerated on every build)

| File / dir | Generated by |
|---|---|
| `assets/css/main.css` | `npm run build:css` |
| `assets/images/og/` | `node scripts/generate-og.mjs` |
| `node_modules/` | `npm install` |
| `_site/` | `bundle exec jekyll build` |
| `_site/pagefind/` | `npx pagefind` (in CI build step) |

If a local Jekyll preview looks unstyled → `assets/css/main.css` is missing. Run `npm run build:css` once.

## Common tasks — quick reference

| Task | Command |
|---|---|
| Start local dev | `npm run watch:css` + `bundle exec jekyll serve --baseurl ''` |
| Production-style local build | `npm run build:css && bundle exec jekyll build` |
| Deploy to live site | `git push origin master` (Action does the rest) |
| Add a new lesson | New file in `_docs/` + register in `_data/modules.yml` |
| Add a new glossary term | Append to `_data/glossary.yml` (term, definition, optional link) |
| Add a new ad slot | `{% include ad-slot.html slot="..." format="auto" %}` in the relevant layout/lesson |
| Change a brand color | Edit `tailwind.config.js` → `theme.extend.colors`, then `npm run build:css` |

## Infrastructure pitfalls

Bugs surfaced reviewing M1L1 (2026-05-20/21). Items 1, 2, 3, 5 **landed in master on 2026-05-21** via the M1L1 merge and retroactively repaired the pilot's callouts and mermaid. Items 4, 6, 7 are author/process habits that stay relevant for every future lesson — keep these in mind when writing.

**~~1. Callout body does not render markdown.~~** **FIXED** in `_includes/callout.html` via `| markdownify` filter. Callout `body` parameter now accepts markdown directly (bold, lists, fenced code, multiple paragraphs).

**~~2. Mermaid diagrams render on a slate-800 background.~~** **FIXED** in `assets/css/tailwind-input.css` with `.prose pre.mermaid` and `.mermaid-figure pre.mermaid` overrides. Mermaid now renders on the cream page background.

**~~3. Interactive SVG tooltip is invisibly clipped.~~** **FIXED** in `assets/js/interactive-svg.js` (tooltip moved to `document.body`, positioned via `getBoundingClientRect` + scroll offsets) and `_includes/interactive-svg.html` (`overflow-hidden` removed from `.svg-wrapper`). Hover-tooltip pattern works on touch and desktop, with Escape/scroll/outside-click dismissal.

4. **`role="button"` on interactive SVG groups is author-supplied.** The design spec requires every `<g tabindex="0" data-tooltip="…">` to also have `role="button"`. The framework's `initHoverTooltip` does not auto-add it. Hand-author each interactive group with `role="button"` set. (Active habit.)

**~~5. `permalink: pretty` broke `/privacy.html` links.~~** **FIXED** in `_includes/footer.html` — Privacy link now points to `/privacy/`. When adding new top-level page links, use trailing slash form (`/contact/`, `/about/`).

6. **Voice linter flags hyphenated compound modifiers.** "line-by-line", "one-sentence", "round-trip", "five-minute", "two-reader", "machine-readable" all trip the no-hyphens rule in body prose. Rewrite as "line by line", "one sentence", "two readers", etc. Hyphens inside backticks/fenced code (e.g. `curl -v`) are skipped by the linter and are fine. (Active habit.)

7. **HTMLProofer reports false positives against `baseurl`.** Local `bundle exec htmlproofer _site/<page>.html` fails on every internal asset link because `relative_url` prepends `/apidocumentation` and HTMLProofer interprets that path against the `_site/` root literally. Always run with `--swap-urls '^/apidocumentation:'` to strip the prefix during local checks. CI does not need this because Pages serves at the baseurl. (Active habit.)

## Remaining known gaps (track here as they're closed)

- Per-lesson `module:`/`lesson:` frontmatter in `_docs/*.md` was set alphabetically during initial Phase 1 work — does NOT match the `_data/modules.yml` mapping. Breadcrumb shows wrong numbers. Fix during each Phase 2 lesson rewrite.
- Cloudflare Worker scaffold (`cloudflare-worker/`) exists but is not deployed; the AI chat widget will silently fail until `wrangler deploy` + endpoint URL is wired in `assets/js/ai-chat.js`.
- `scripts/generate-og.mjs` writes placeholder bytes; replace with real PNG generation when convenient.
- `assets/fonts/` is empty — fonts load from Google Fonts CDN. Self-hosting is a nice-to-have, not a blocker.
