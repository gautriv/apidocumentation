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

## Next-lesson queue (curricular order)

The order Phase 2 will rewrite the remaining lessons. Strike through after merge; the queue is the source of truth for what is next.

1. `_docs/howinternetworks.md` — Module 1 Lesson 1, "The internet, the short version"
2. (`whatisanapi.md` — done, shipped 2026-05-20)
3. `_docs/whatwritersdo.md` — Module 1 Lesson 3, "What an API writer does in 2026"
4. `_docs/informationgathering.md` — Module 1 Lesson 4, "Information gathering and interviewing the codebase"
5. *new* `_docs/audiences-humans-and-agents.md` — Module 1 Lesson 5, placeholder slot
6. `_docs/restAPI.md` — Module 2 Lesson 1, "REST principles"
7. `_docs/typesofAPI.md` — Module 2 Lesson 2, "Types of APIs"
8. `_docs/anatomyofurl.md` — Module 2 Lesson 3, "Anatomy of a URL (part 1)"
9. `_docs/anatomyofurltwo.md` — Module 2 Lesson 4, "Anatomy of a URL (part 2)"
10. `_docs/requestandresponse.md` — Module 2 Lesson 5, "Request and response" (note: source file is `requestandresponse.md`, slug in modules.yml is `apirequestsresponses.html`; preserve the permalink, fix the slug-to-filename mismatch during rewrite)
11. `_docs/curl.md` — Module 2 Lesson 6, "cURL and why you should still know it"
12. *new* `_docs/auth-incl-agents.md` — Module 2 Lesson 7, placeholder slot
13. `_docs/json.md` — Module 3 Lesson 1, "JSON like you mean it" (slug mismatch: source is `json.md`, modules.yml has `JSON101.html`)
14. `_docs/xml.md` — Module 3 Lesson 2 (slug mismatch with `XML101.html`)
15. `_docs/dataformats.md` — Module 3 Lesson 3
16. `_docs/visualdatatypes.md` — Module 3 Lesson 4 (slug mismatch with `visualizingdatatypes.html`)
17. *new* `_docs/json-schema-for-llms.md` — Module 3 Lesson 5, placeholder
18. `_docs/writingapi.md` — Module 4 Lesson 1
19. `_docs/bridginggaps.md` — Module 4 Lesson 2 (slug mismatch with `keyconcepts.html`)
20. *new* `_docs/openapi-without-tears.md` — Module 4 Lesson 3, placeholder
21. *new* `_docs/samples-that-dont-rot.md` — Module 4 Lesson 4, placeholder
22. *new* `_docs/errors-that-help.md` — Module 4 Lesson 5, placeholder (defines the canonical error catalog used by all later lessons)
23. `_docs/webhook.md` — Module 5 Lesson 1 (slug mismatch with `webhooks.html`)
24. `_docs/bdocumentingwebhook.md` — Module 5 Lesson 2 (slug mismatch)
25. `_docs/idocumentingwebhook.md` — Module 5 Lesson 3 (slug mismatch)
26. `_docs/edocumentingwebhook.md` — Module 5 Lesson 4 (slug mismatch)
27. *new* `_docs/asyncapi-event-driven.md` — Module 5 Lesson 5, placeholder
28. *new* `_docs/streaming-and-sse.md` — Module 6 Lesson 1, placeholder
29. *new* `_docs/websockets-for-realtime.md` — Module 6 Lesson 2, placeholder
30. *new* `_docs/graphql-docs-in-practice.md` — Module 6 Lesson 3, placeholder
31. *new* `_docs/grpc-and-protobuf.md` — Module 6 Lesson 4, placeholder
32. *new* `_docs/writing-docs-for-llms.md` — Module 7 Lesson 1, placeholder
33. *new* `_docs/mcp-what-it-is.md` — Module 7 Lesson 2, placeholder
34. *new* `_docs/tool-use-schemas.md` — Module 7 Lesson 3, placeholder
35. *new* `_docs/prompt-engineering-for-docs.md` — Module 7 Lesson 4, placeholder
36. *new* `_docs/ai-doc-assistant.md` — Module 7 Lesson 5, placeholder
37. `_docs/bdocumentingrestapi.md` — Module 8 Lesson 1 (slug mismatch)
38. `_docs/idocumentingrestapi.md` — Module 8 Lesson 2 (slug mismatch)
39. `_docs/edocumentingrestapi.md` — Module 8 Lesson 3 (slug mismatch)
40. `_docs/btestingapipostman.md` — Module 8 Lesson 4 (slug mismatch)
41. `_docs/itestingapipostman.md` — Module 8 Lesson 5 (slug mismatch)
42. `_docs/extestingapipostman.md` — Module 8 Lesson 6 (slug mismatch with `expertapitesting.html`)
43. `_docs/course-completion.md` — Module 8 Lesson 7 (slug mismatch with `finalwords.html`)

The "slug mismatch" notes above mean the source filename does not match the slug in `_data/modules.yml`. During rewrite, decide per-lesson whether to rename the source file (like the pilot did, using the case-rename two-step) or to live with the mismatch. The OG image generator at `scripts/generate-og.mjs` derives the filename from the source, so a rename is the cleanest path for OG image consistency.

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

`_data/modules.yml` — 8 modules, 43 lesson slots (27 existing, 16 placeholders as of 2026-05-20). The sidebar nav, prev/next, breadcrumbs all read from this. To add a lesson:
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

## Remaining known gaps (track here as they're closed)

- Per-lesson `module:`/`lesson:` frontmatter in `_docs/*.md` was set alphabetically during initial Phase 1 work — does NOT match the `_data/modules.yml` mapping. Breadcrumb shows wrong numbers. Fix during each Phase 2 lesson rewrite.
- Cloudflare Worker scaffold (`cloudflare-worker/`) exists but is not deployed; the AI chat widget will silently fail until `wrangler deploy` + endpoint URL is wired in `assets/js/ai-chat.js`.
- `scripts/generate-og.mjs` writes placeholder bytes; replace with real PNG generation when convenient.
- `assets/fonts/` is empty — fonts load from Google Fonts CDN. Self-hosting is a nice-to-have, not a blocker.
