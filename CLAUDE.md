# CLAUDE.md

Context for any Claude Code session working on this repo. Keep this file short and current.

## What this is

The free **API Documentation Course** published at `https://beingtechnicalwriter.com/apidocumentation/`. Jekyll static site, deployed via GitHub Pages from `master` through `.github/workflows/build.yml`. AdSense-funded. The course is being modernized in phases — see `~/.claude/plans/i-prepared-this-api-proud-codd.md` (off-repo) for the parent plan and `design-mockups/MIGRATION_PLAN.md` (in-repo) for the file-by-file execution checklist.

## Local dev

This site has a **two-process build**: Tailwind compiles `assets/css/main.css` from `assets/css/tailwind-input.css`; Jekyll then assembles the static site that includes it.

```bash
# First time
bundle install
npm install

# Each session — two terminals:
npm run watch:css                     # terminal 1: rebuild CSS on every class change
bundle exec jekyll serve --baseurl '' # terminal 2: serve → http://localhost:4000/
```

Without the `--baseurl ''` flag, the local URL is `http://localhost:4000/apidocumentation/` (production has `baseurl: /apidocumentation`; the empty override is for local dev only — never change `_config.yml`).

One-shot build (matches what CI does):
```bash
npm run build:css && bundle exec jekyll build
```

Troubleshooting:
- `cannot load such file -- logger` → you're on Ruby 3.5+/4.0. `gem "logger"` (and friends) are in the Gemfile; run `bundle install` once.
- Site renders unstyled → CSS not built yet. Run `npm run build:css`.
- New Tailwind class not applied → add the file path to `tailwind.config.js` `content`, or rebuild CSS.
- Class is toggled by JS (e.g. `name-only`, `tip-open`, `show`) and not applied → add it to the `safelist` in `tailwind.config.js`.

## Hard constraints (do not violate)

1. **Jekyll + GitHub Pages.** No stack migrations. PostCSS/Tailwind/Node tooling is fine *as build steps* in `.github/workflows/build.yml`; the deployable output stays a static site.
2. **AdSense-only monetization.** Publisher ID `ca-pub-7149683584202371`. No affiliate links, no paid tier, no sponsored content unless explicitly requested. Improvements happen *within* AdSense (placements, Auto Ads, lazy-load, consent, ad refresh).
3. **URLs must not change.** Each lesson's `permalink:` is load-bearing for SEO + ad revenue. If a lesson is renamed during a content rewrite, add a `redirect_from:` entry (jekyll-redirect-from is enabled) — never break a live URL.
4. **No sign-in.** Personalization is `localStorage` only — see `assets/js/personalize.js`. The name is never sent to a server.

## Voice & tone (when writing or editing lesson copy)

- Narrator persona: **Maya**, a senior technical writer. Lessons sign off `— Maya`.
- Running example: **The Greenfield Library API**. Reuse this fictional API in every code sample, schema, error.
- Open with a relatable scene; never "In this lesson, we will…".
- One genuine joke per lesson; cut the rest.
- Every lesson ends with an **AI co-pilot tip** — the actual task the reader can do today with Claude/GPT/Cursor.
- Style: sentence case for headings (except H1); em dash `—` no spaces; serial comma; backticks for HTTP codes, methods, header names; numerals for HTTP / sizes / versions.

## Curriculum source of truth

`_data/modules.yml` — 8 modules, 36 target lessons. The sidebar nav, prev/next, breadcrumbs all read from this. When adding a lesson:
1. Add the file to `_docs/<slug>.md` with `permalink: /<slug>.html` (keep existing URL pattern).
2. Register it in the matching module's `lessons:` array in `_data/modules.yml`.
3. Remove the `placeholder: true` flag if the slot was reserved.

## Includes and components

| Want to write… | Use |
|---|---|
| A call-out box | `{% include callout.html variant="tip\|note\|warning\|recap" %}` |
| An ad slot | `{% include ad-slot.html slot="<id>" format="auto" %}` — never paste AdSense markup inline |
| A glossary-tooltip word | `{% include glossary-term.html term="JWT" %}` (definition lives in `_data/glossary.yml`) |
| A Mermaid diagram | `{% include mermaid.html content="..." %}` |
| A live OpenAPI playground | `{% include openapi-playground.html spec="/assets/api/greenfield.yaml" %}` |

The legacy `enhanced_note.html`, `key_takeaways.html`, and all `_includes/{b,i,e,wb,iwb,ewb}_exe_*.html` files were retained because they hold real lesson content used by 38+ lessons. They will be removed gradually as Phase 2 lesson rewrites replace their call sites with the components above. **Don't expand their usage** — write new lessons using the components in the table.

## Don't touch without asking

- `_config.yml` (production site settings)
- `robots.txt`, `sitemap.xml`, `feed.xml`
- Lesson `permalink:` values (revenue-load-bearing)
- AdSense client ID and the `adsense:` block

## Files that are intentionally there

- `assets/css/tailwind-input.css` — the Tailwind source. Edit this (not `main.css`) when you need custom `@layer base` / `@layer utilities` rules.
- `tailwind.config.js` — Tailwind config. Token colors (`ink`, `cream`, `copper`, `sage`) and font stacks live here; design changes start here.
- `design-mockups/` and `cloudflare-worker/` — excluded from the Jekyll build via `_config.yml`.
- `assets/css/styles.css` — the legacy monolithic stylesheet from the previous design. Still present so older lesson HTML (the restored `*_exe_*.html` includes) keeps rendering during Phase 2 migration. Will be deleted once those includes are migrated.

## Files that are NOT in git (regenerated on every build)

- `assets/css/main.css` — output of `npm run build:css`.
- `assets/images/og/` — output of `scripts/generate-og.mjs`.
- `node_modules/` — installed by `npm install`.
- `_site/` — Jekyll's build output.

If a local Jekyll preview looks unstyled, `assets/css/main.css` is missing — run `npm run build:css` once.
