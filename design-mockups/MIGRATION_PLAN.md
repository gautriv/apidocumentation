# Migration Plan — Mockup A → Live Jekyll Site

**Goal:** turn `design-mockups/a-stripe.html` and `a-stripe-lesson.html` into the live site at `beingtechnicalwriter.com/apidocumentation/` — without breaking SEO, AdSense revenue, or local Jekyll dev.

**How to use this doc:** every step is a small PR-sized chunk you can do and merge independently. Each step lists exactly which files to **ADD**, **EDIT**, **DELETE**, plus a one-line "Definition of Done" so you can self-verify. Skip steps you've already done. The site keeps working between every step.

**Estimated total time:** 10–14 working days if you do the whole thing alone. Each chunk is 0.5–2 days.

**Branching strategy:** one branch per step, merge to `master` after the DoD passes. Or do it all on `modernize-phase-1` and merge once.

---

## Step 0 — Pre-flight (30 min, do once)

**Do:**
- [ ] `git checkout -b modernize-phase-1`
- [ ] Take a Lighthouse baseline of [https://beingtechnicalwriter.com/apidocumentation/](https://beingtechnicalwriter.com/apidocumentation/) (home + one lesson) — save the JSON. You'll diff against it later.
- [ ] In GA4, export the **top 20 lesson URLs by pageviews** for the last 90 days → save as `design-mockups/ga4-top20.csv`. Phase 2 rewrite order depends on this.
- [ ] Confirm the live AdSense client ID is `ca-pub-7149683584202371` (`grep -r "ca-pub" .` — should hit `_includes/adsense.html` and `_includes/seo-optimization.html`).
- [ ] Confirm `bundle exec jekyll serve` runs cleanly → `http://localhost:4000/apidocumentation/`. Fix any Ruby gem issues now, not later.
- [ ] Sign up for a free Cloudflare account at `dash.cloudflare.com` (for Workers + Web Analytics in steps 7 and 10).
- [ ] Sign up for a free Buttondown account (newsletter replacement) — or pick ConvertKit free tier.

**ADD:** `design-mockups/ga4-top20.csv` (manual export).
**EDIT:** none.
**DELETE:** none.

**DoD:** local Jekyll serves the current live site; you have the baseline Lighthouse JSON; you have the GA4 top-20 list.

---

## Step 1 — Design tokens & build pipeline (1 day)

Foundation that everything else builds on. Nothing visible changes yet.

**ADD:**
- `_sass/tokens.scss` — CSS custom properties: colors (`--ink`, `--cream`, `--copper`, `--sage`, neutrals), type scale, spacing scale, radii, shadows, breakpoints. Includes light + dark mode via `prefers-color-scheme` and a manual `[data-theme="dark"]` override.
- `_sass/typography.scss` — font-face for Newsreader, Inter, JetBrains Mono (self-hosted woff2 in `assets/fonts/`); type styles for `.h-display`, body, mono.
- `_sass/reset.scss` — modern CSS reset (Andy Bell's).
- `_sass/utilities.scss` — small set of utility classes if you don't want Tailwind on prod.
- `_sass/main.scss` — imports the above + `_sass/components/` (created in Step 2).
- `assets/fonts/` directory with subsetted woff2 for the three families (use [`google-webfonts-helper`](https://gwfh.mranftl.com/fonts)).
- `Gemfile` addition: nothing if pure Sass. If you choose Tailwind: add `jekyll-postcss`, `jekyll-tailwindcss` (or run the Tailwind CLI in a GH Action — see Step 12).
- `.github/workflows/build.yml` — Action that builds Jekyll, runs Pagefind (Step 5), runs Tailwind if used, deploys to `gh-pages` via `actions/deploy-pages@v4`.

**EDIT:**
- `_config.yml` — add `sass: { style: compressed, sass_dir: _sass }`; verify `kramdown: { input: GFM }`; bump `last_modified_at` defaults.
- `assets/css/styles.css` → rename to `assets/css/main.scss` with `---\n---` frontmatter and a single `@import 'main';`. Keep the old `styles.css` link alive for one PR — both files exist — then point [_includes/seo-optimization.html](../_includes/seo-optimization.html) at the new file.

**DELETE:** nothing yet. (Old `styles.css` retired in Step 11.)

**DoD:** `bundle exec jekyll serve` builds with no errors; visiting the home page shows the existing visual design unchanged; viewing the compiled CSS shows your new tokens are present (`grep '--copper' _site/assets/css/main.css`).

---

## Step 2 — Component CSS scaffolding (0.5 day)

**ADD:** under `_sass/components/`:
- `button.scss`, `card.scss`, `callout.scss`, `code.scss`, `nav.scss`, `hero.scss`, `curriculum.scss`, `exercise.scss`, `ad-slot.scss`, `ai-chat.scss`, `cmdk.scss`, `modal.scss`, `toc.scss`, `progress-bar.scss`, `glossary.scss`, `prose.scss`.

Each file is a self-contained block — `.btn`, `.callout`, `.callout--tip`, etc. — pulling from tokens. Translate the Tailwind utility classes from the mockups into semantic class names you'll use in the layouts.

**EDIT:** `_sass/main.scss` to import each component.
**DELETE:** none.

**DoD:** `_sass/components/` has 16 files; `_site/assets/css/main.css` contains a `.callout--tip` rule when you `grep`.

---

## Step 3 — New layout shell + nav + footer (1.5 days)

This is when you start seeing the new design.

**ADD:**
- `_data/modules.yml` — the 8-module / 36-lesson curriculum from the mockups, as data. Each module: `{ n, title, slug, isNew, lessons: [{ slug, title, readingTime }] }`. Sidebar nav loops over this in Step 4.
- `_data/glossary.yml` — initial 15–20 terms (JWT, MCP, LLM, 429, mTLS, gRPC, SSE, WebSocket, AsyncAPI, Bearer, OAuth, OpenAPI, Webhook, RPC, REST, Schema). Each entry: `{ term, definition, link }`.
- `_includes/header.html` — **rewrite from scratch** to match mockup nav (sticky, blur backdrop, hamburger on mobile, Cmd+K trigger, name pill).
- `_includes/footer.html` — **rewrite from scratch** to match mockup footer (minimal, Reset name button, Buttondown form).
- `_includes/name-modal.html` — the personalization modal (HTML from mockup).
- `_includes/mobile-sheet.html` — slide-out course nav for mobile (HTML from mockup lesson page).
- `assets/js/personalize.js` — the `localStorage` name logic from the mockup, extracted.

**EDIT:**
- `_layouts/default.html` — **full rewrite**. Replace the current single-column structure with the lesson page's three-column desktop / single-column mobile layout. Includes: `header.html`, `mobile-sheet.html`, reading progress bar (Step 6), `{{ content }}`, `footer.html`, AI chat (Step 7), Cmd+K (Step 5), name modal.
- `_layouts/home.html` — **full rewrite** to match `design-mockups/a-stripe.html` structure (hero, editorial quote, meet Maya, what's inside, curriculum, sample, sponsored card, newsletter). Loops curriculum from `_data/modules.yml`.

**DELETE:**
- `_layouts/doc.html` — consolidated into `default.html`. Update `_config.yml` `defaults` so `_docs` collection uses `default.html`.

**DoD:** home page matches mockup A visually within ~5% (fonts, colors, spacing); one lesson page renders with the new layout shell and sidebar (empty content area is fine — content polish comes in Step 4); hamburger works on mobile (375px); Cmd+K trigger is visible (palette comes in Step 5); no GitHub Pages build errors.

---

## Step 4 — Data-driven sidebar + lesson chrome (1 day)

Make the new layout pull lesson nav from data and add the per-lesson chrome (breadcrumb, title block, prev/next, edit-on-github, helpful widget).

**ADD:**
- `_includes/course-nav.html` — Liquid loop over `site.data.modules` rendering the accordion. Used by both `_includes/header.html` (mobile sheet) and the desktop left column. Marks the current lesson via `page.url`.
- `_includes/breadcrumb.html` — derives Module + Lesson from `page` frontmatter (uses new front-matter fields).
- `_includes/prev-next.html` — finds prev/next lesson in the flat `_data/modules.yml` list given `page.url`.
- `_includes/helpful.html` — thumbs widget; posts to a Google Form (free) or a Cloudflare Worker (Step 7's worker, reused).
- `_includes/edit-on-github.html` — one-line `<a>` using `page.path`.

**EDIT:**
- `_layouts/default.html` — wire in the includes above for lesson pages (gate by `page.layout == 'default'` and `page.collection == 'docs'`).
- Every lesson in `_docs/*.md` — **add front matter fields** to each: `module: 7`, `lesson: 14`, `slug: writing-docs-for-llms`. (28 lessons; ~1 minute each. Use a script if you want.)

**DELETE:** none.

**DoD:** opening any lesson shows correct breadcrumb, the sidebar shows the correct module open with the current lesson highlighted, prev/next links to the right adjacent lessons, "Edit on GitHub" goes to the right file.

---

## Step 5 — Pagefind search + Cmd+K palette (1 day)

Replace SimpleJekyllSearch.

**ADD:**
- `assets/js/cmdk.js` — the palette toggle + render logic from the mockup.
- `_includes/cmdk.html` — the palette markup.
- `.github/workflows/build.yml` (edit) — add a step **after** Jekyll build: `npx pagefind --site _site --output-path _site/pagefind`.
- `assets/js/search-loader.js` — loads `/pagefind/pagefind.js` lazily when the palette opens.

**EDIT:**
- `_layouts/default.html` — include `cmdk.html`; load `cmdk.js` deferred.
- `assets/js/main.js` — remove the old SimpleJekyllSearch wiring.

**DELETE:**
- The SimpleJekyllSearch script from `assets/js/` (whichever file it's in — likely `main.js` or a vendor file).
- The JSON search index generator (likely in `_plugins/` or a `search.json` file at root).

**DoD:** Cmd+K opens the palette; typing finds lessons by title and glossary terms; opening a lesson works; `_site/pagefind/` exists after build.

---

## Step 6 — Reading experience polish (1 day)

Reading progress bar, sticky in-page TOC, anchor links on headings, code tabs, copy button.

**ADD:**
- `assets/js/reading-progress.js` — the bar logic from the mockup (scroll + intersection observer).
- `assets/js/code-tabs.js` — language tab switching + copy button (the `setTab` / `copyCode` from the lesson mockup).
- `_includes/in-page-toc.html` — pulls headings from `{{ content | toc_only }}` (if you keep `jekyll-toc`) or via JS at runtime.
- `_includes/progress-bar.html` — single `<div id="progress-bar">` element.

**EDIT:**
- `_layouts/default.html` — include `progress-bar.html` and `in-page-toc.html` in the right column for lesson pages.
- Lesson Markdown — wrap multi-language code samples in a Liquid block so `code-tabs.js` can find them (e.g., `{% codetabs %}` … `{% endcodetabs %}`). Optional plugin; otherwise stick with multiple fenced blocks and JS parsing.

**DELETE:**
- `assets/js/doc.js` if its only job was old TOC behaviour (verify first with `grep -r 'doc.js' .`).

**DoD:** progress bar fills as you scroll a lesson; right-rail TOC highlights the active section; code tabs switch panes; copy button shows "Copied!" feedback.

---

## Step 7 — AI chat widget ("Ask Maya") (2 days)

The headline feature. Free tier via Cloudflare Worker + Claude Haiku.

**ADD:**
- `cloudflare-worker/` (new directory at repo root; add to `_config.yml` exclude):
  - `cloudflare-worker/src/index.js` — the Worker: receives `{ message, lessonSlug }`, fetches the lesson markdown from your GitHub raw URL, builds a short prompt with system + lesson context, calls `api.anthropic.com/v1/messages` with the secret API key from `env.ANTHROPIC_API_KEY`, streams the response back as SSE.
  - `cloudflare-worker/wrangler.toml` — Worker config, KV namespace for rate-limit (50 chats / IP / day so the free tier doesn't get abused).
  - `cloudflare-worker/README.md` — deploy steps (`wrangler deploy`), where to set the secret (`wrangler secret put ANTHROPIC_API_KEY`).
- `assets/js/ai-chat.js` — the chat widget logic; reads current `page.url` for context; calls the Worker; streams the response into the panel.
- `_includes/ai-chat.html` — the widget markup from the mockup.

**EDIT:**
- `_layouts/default.html` — include `ai-chat.html`; load `ai-chat.js` deferred.
- `_config.yml` `exclude:` — add `cloudflare-worker/`.

**DELETE:** none.

**DoD:** clicking the bubble opens the panel; typing a question and submitting hits your Worker URL; you get a streaming response from Claude that references the current lesson; rate-limit blocks the 51st request from the same IP in a day.

**Cost check:** Anthropic Haiku is ~$0.25/M input, $1.25/M output. At ~500 tokens per chat avg, 1000 chats = ~$0.50. Worker free tier covers 100k requests/day. No CDN cost. **Total monthly cost at moderate traffic: < $5.**

---

## Step 8 — Ad optimization (1 day)

Within AdSense only. No affiliate, no premium.

**ADD:**
- `_includes/ad-slot.html` — parameterized AdSense slot: `{% include ad-slot.html slot="1234567890" format="auto" %}`. Lazy-loads via IntersectionObserver after 200px into viewport.
- `_includes/consent-banner.html` — Funding Choices via AdSense (free, GDPR). One `<script>` line; Google handles the UI.
- `assets/js/ad-loader.js` — IntersectionObserver to defer `<ins>` adsbygoogle inits; ad refresh logic (every 30s only when in-viewport AND user active within last 30s).

**EDIT:**
- `_layouts/default.html` — place ad slots: (a) below hero on home, (b) between curriculum modules on home, (c) after the first paragraph of every lesson, (d) before prev/next on every lesson, (e) sticky right rail on desktop.
- `_includes/seo-optimization.html` — replace the inline AdSense script with the lazy loader; enable AdSense Auto Ads (one line).
- `_config.yml` — add a `adsense:` block with `client_id`, `enabled_in_dev: false`.

**DELETE:**
- `_includes/adsense.html` — old version; replaced by `ad-slot.html`.
- `_includes/multiplex.html` — fold into `ad-slot.html` with `format=multiplex`.
- `_includes/google_analytics.html` — duplicate GA4 load; the canonical one stays in `_includes/seo-optimization.html`.

**DoD:** view a deployed preview page; AdSense preview tool reports 5 slot positions detected; the consent banner shows on first visit in Europe (test with VPN or `?gdpr=1` if Google offers a debug flag); Lighthouse Performance hasn't dropped below 90.

---

## Step 9 — Glossary + Mermaid + Scalar OpenAPI playground (1 day)

The "content enhancement" layer.

**ADD:**
- `_includes/glossary-term.html` — usage: `{% include glossary-term.html term="JWT" %}`. Renders `<span class="gloss" data-tip="…">JWT</span>` pulling the definition from `_data/glossary.yml`.
- `_plugins/glossary_tag.rb` (optional, nicer ergonomics) — `{% glossary "JWT" %}` Liquid tag. Won't work on plain GH Pages without GH Actions — but you're already using Actions for the build, so this is fine.
- `_includes/mermaid.html` — `<div class="mermaid">{{ include.content }}</div>` + lazy-loaded `mermaid.min.js`.
- `_includes/openapi-playground.html` — Scalar embed (`<script id="api-reference" data-url="{{ include.spec }}"></script>` plus their CDN script).
- `assets/js/glossary.js` — tap-to-toggle tooltip on touch devices (logic from mockup lesson page).

**EDIT:**
- Lesson Markdown (only as you rewrite them in Phase 2) — start using `{% glossary %}`, `{% mermaid %}`, `{% include openapi-playground.html spec="/assets/api/greenfield.yaml" %}`.

**DELETE:**
- `assets/js/openapi-exercise.js` — replaced by Scalar (verify it isn't used by an existing lesson before deleting).

**DoD:** a test lesson with one of each component renders correctly; tooltip works on hover (desktop) and tap (mobile); Mermaid diagram renders; Scalar playground loads against a sample spec.

---

## Step 10 — PWA + Cloudflare Analytics + per-lesson OG images (0.5 day)

**ADD:**
- `assets/js/sw.js` — service worker caching the shell + last-50 lessons (workbox-style or hand-rolled, < 50 lines).
- `_includes/sw-register.html` — registers the worker (gated on `if 'serviceWorker' in navigator`).
- `_includes/cloudflare-analytics.html` — one `<script>` line, your Cloudflare token.
- `scripts/generate-og.mjs` — Node script (run in CI) that reads each lesson's frontmatter and renders a 1200×630 PNG into `assets/images/og/{slug}.png` (use `@vercel/og` or `satori` — both MIT, free).
- `.github/workflows/build.yml` (edit) — add an `npm run og` step before the Jekyll build.

**EDIT:**
- `_includes/seo-optimization.html` — use the per-lesson OG image if present, else fall back to the default.
- `site.webmanifest` — verify icons, name, theme_color match new design tokens.
- `_layouts/default.html` — include `sw-register.html` and `cloudflare-analytics.html`.

**DELETE:** none.

**DoD:** Lighthouse PWA checklist passes (installable); Cloudflare dashboard shows hits after a few minutes; one lesson's OG image appears in Twitter's card validator.

---

## Step 11 — Legacy cleanup pass (1 day)

The "delete the graveyard" step. Do this **last** so you don't break something you forgot was used.

**Audit first:** `grep -r 'include.*tinyletter' .` etc. for every file below. Anything still referenced means a prior step missed an edit — fix that first.

**DELETE (in order — each is a separate commit so you can revert atomically):**
- All `_includes/b_exe_*.html`, `_includes/i_exe_*.html`, `_includes/e_exe_*.html` (~15 files) — replaced by parameterized `_includes/exercise.html` (which you add in this step too, see ADD).
- All `_includes/wb_exe_*.html`, `_includes/iwb_exe_*.html`, `_includes/ewb_exe_*.html` — same.
- `_includes/note.html`, `enhanced_note.html`, `tip.html`, `warning.html`, `important.html`, `goodtoknow.html`, `fact.html`, `recap.html`, `key_takeaways.html` — replaced by `_includes/callout.html` (added here).
- `_includes/tinyletter.html` — Buttondown form replaces it inline in `footer.html`.
- `_includes/disqus.html` + the Disqus account/script — replaced by giscus (see ADD).
- `assets/css/about.css`, `contact.css`, `privacy.css`, `resources.css`, `practice-exercises.css` — page-specific styles folded into the main design system.
- `browserconfig.xml` — IE legacy.
- `update_docs.sh` — review what it does; if it's a one-off ops script, move to `scripts/` or delete.
- Font Awesome CDN reference in `_includes/seo-optimization.html` (or wherever it loads) — Lucide icons inline in the new components.
- `_includes/sidebar.html` (hardcoded version) — replaced by data-driven `_includes/course-nav.html` from Step 4.

**ADD (replacements for the deletes above):**
- `_includes/exercise.html` — one parameterized exercise component: `{% include exercise.html level="beginner" topic="rest-docs" %}`.
- `_includes/callout.html` — one parameterized callout: `{% include callout.html variant="tip" %}body…{% endcallout %}` (Liquid doesn't support block includes — use `capture` or a `_plugins/callout_tag.rb`).
- `_includes/giscus.html` — drop-in widget for discussions.
- Buttondown form inline in `_includes/footer.html`.

**EDIT (find-and-replace):**
- Every `_docs/*.md` lesson using old callouts → migrate to `{% include callout.html %}` syntax. ~30 files; can be scripted with a sed pass.
- `_config.yml` — clear the dummy `facebook.app_id: 12345678910` (set to real ID or remove the line).

**DoD:** `find _includes -type f | wc -l` is at most ~25 (was 86); `grep -r 'tinyletter\|disqus\|browserconfig' .` returns no hits; site builds clean; no broken links per HTMLProofer.

---

## Step 12 — CI/CD quality gates (0.5 day)

Make all the above stick.

**ADD:**
- `.github/workflows/ci.yml`:
  - On every PR: `bundle exec jekyll build` → `npx -y @lhci/cli autorun` (target Perf ≥90 / A11y ≥95) → `bundle exec htmlproofer ./_site` → fail if any check fails.
- `lighthouserc.json` — config for Lighthouse CI thresholds.
- `.htmlproofer.yml` — config (ignore external links on PR if you want fast builds).

**EDIT:**
- `.github/workflows/build.yml` (deploy) — add `needs: ci` so deploy waits for CI.

**DELETE:** none.

**DoD:** open a draft PR with a deliberately bad change (e.g., remove an alt attribute) — CI fails. Revert — CI passes.

---

## Step 13 — Add CLAUDE.md (15 minutes — last)

Locks in conventions for future sessions.

**ADD:** `CLAUDE.md` at repo root with: project summary, local dev commands, voice/tone rules from `[[feedback-voice]]` memory, curriculum map (link to `_data/modules.yml`), conventions (where new lessons go, permalink rule, ad placement rule via `ad-slot.html`, SEO non-negotiables, "don't touch without asking" list).

**EDIT:** `.gitignore` if needed.
**DELETE:** none.

**DoD:** open a fresh Claude Code session, ask "where do new lessons go and what voice should I write in?" — answer comes from CLAUDE.md without re-exploration.

---

## Summary by file (quick reference card)

### To create
```
_sass/tokens.scss
_sass/typography.scss
_sass/reset.scss
_sass/utilities.scss
_sass/main.scss
_sass/components/{button,card,callout,code,nav,hero,curriculum,exercise,ad-slot,ai-chat,cmdk,modal,toc,progress-bar,glossary,prose}.scss
_data/modules.yml
_data/glossary.yml
_includes/header.html (new)
_includes/footer.html (new)
_includes/name-modal.html
_includes/mobile-sheet.html
_includes/course-nav.html
_includes/breadcrumb.html
_includes/prev-next.html
_includes/helpful.html
_includes/edit-on-github.html
_includes/cmdk.html
_includes/progress-bar.html
_includes/in-page-toc.html
_includes/ai-chat.html
_includes/ad-slot.html
_includes/consent-banner.html
_includes/glossary-term.html
_includes/mermaid.html
_includes/openapi-playground.html
_includes/sw-register.html
_includes/cloudflare-analytics.html
_includes/exercise.html
_includes/callout.html
_includes/giscus.html
assets/js/personalize.js
assets/js/cmdk.js
assets/js/search-loader.js
assets/js/reading-progress.js
assets/js/code-tabs.js
assets/js/ai-chat.js
assets/js/ad-loader.js
assets/js/glossary.js
assets/js/sw.js
assets/css/main.scss (with frontmatter)
assets/fonts/ (woff2 files)
assets/images/og/ (auto-generated)
cloudflare-worker/src/index.js
cloudflare-worker/wrangler.toml
cloudflare-worker/README.md
scripts/generate-og.mjs
.github/workflows/build.yml
.github/workflows/ci.yml
lighthouserc.json
.htmlproofer.yml
CLAUDE.md
```

### To edit
```
_config.yml
_layouts/default.html
_layouts/home.html
_layouts/post.html
_includes/seo-optimization.html
site.webmanifest
Gemfile
.gitignore
every _docs/*.md (add module/lesson/slug front matter)
```

### To delete
```
_layouts/doc.html
_includes/google_analytics.html
_includes/disqus.html
_includes/tinyletter.html
_includes/multiplex.html
_includes/adsense.html
_includes/sidebar.html (hardcoded version)
_includes/b_exe_1..5.html
_includes/i_exe_1..5.html
_includes/e_exe_1..5.html
_includes/wb_exe_1..6.html
_includes/iwb_exe_1..5.html
_includes/ewb_exe_1..5.html
_includes/note.html
_includes/enhanced_note.html
_includes/tip.html
_includes/warning.html
_includes/important.html
_includes/goodtoknow.html
_includes/fact.html
_includes/recap.html
_includes/key_takeaways.html
assets/css/about.css
assets/css/contact.css
assets/css/privacy.css
assets/css/resources.css
assets/css/practice-exercises.css
assets/css/styles.css (after Step 1 promotion)
assets/js/openapi-exercise.js
browserconfig.xml
update_docs.sh (after review)
```

---

## What can wait until Phase 2

The above is **website only**. Content rewrites (the 36 lessons, the Maya voice, new modules 6 + 7) come after. Don't try to do both at once — the website rebuild plus content rewrites is the classic "we got busy and shipped nothing" failure mode. Ship Phase 1 cleanly, *then* start the lesson rewrites driven by the GA4 top-20 list from Step 0.

---

## What's truly free, what costs a few cents

| Capability | Cost |
|---|---|
| GitHub Pages hosting | Free |
| Cloudflare Worker (AI chat proxy) | Free (100k req/day) |
| Cloudflare Web Analytics | Free, cookieless |
| Pagefind (search) | Free, runs at build time |
| Buttondown (newsletter) | Free up to 100 subs |
| giscus (comments) | Free |
| Scalar (OpenAPI playground) | Free, open-source, embed via CDN |
| Mermaid | Free, runs client-side |
| AdSense | Revenue, not cost |
| Funding Choices (CMP) | Free |
| Lucide icons | Free, MIT |
| Anthropic Claude Haiku (AI chat content) | ~$0.50 / 1000 chats — the only outbound cost |
| Lighthouse CI | Free, runs in GitHub Actions |
| HTMLProofer | Free, ruby gem |
| `@vercel/og` for OG images | Free, MIT |

**All-in monthly cost at moderate traffic: under $5.** Most months, $0–$1.
