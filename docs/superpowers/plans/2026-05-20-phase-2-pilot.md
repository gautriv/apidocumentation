# Phase 2 Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Land all 11 Tier 1 prerequisites from spec Section 7 and ship the pilot lesson (`whatisanapi.html`, "What an API actually is", Module 1 Lesson 2) end-to-end against the v0.4 spec.

**Architecture:** Three layers.
1. **Component layer** — new Liquid includes (`signoff.html`, `interactive-svg.html`), updated existing includes (`callout.html`, `mermaid.html`), and the central JS framework (`assets/js/interactive-svg.js`).
2. **Quality layer** — a Ruby voice-check linter, a bash wrapper, and a GitHub Actions workflow that gates lesson PRs.
3. **Content layer** — the rewritten pilot lesson plus its Mermaid diagram, interactive SVG, glossary additions, and Greenfield bible entry.

**Tech Stack:** Jekyll 4 (Liquid templating), Tailwind CSS (already configured), vanilla ES modules (no framework), Ruby (linter), GitHub Actions (CI). Mermaid 10 (CDN). Pagefind (CI).

**Source of truth:** `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md` v0.4. Every voice rule, block budget, and Definition-of-Done item lives there. This plan does not restate them; it builds against them.

---

## File Structure

**New files:**
- `_includes/signoff.html` — Maya's locked signoff (Tier 1 #4)
- `_includes/interactive-svg.html` — inlines the per-lesson SVG and loads the framework (Tier 1 #2)
- `_plugins/include_file.rb` — small Jekyll plugin to inline an arbitrary repo-relative file (enables the interactive-svg include)
- `assets/js/mermaid-init.js` — Mermaid theme override using ink/cream/copper/sage tokens (Tier 1 #1)
- `assets/js/interactive-svg.js` — central framework with four interaction patterns (Tier 1 #3)
- `assets/svg/whatisanapi/main.svg` — the pilot's block-4 interactive SVG
- `scripts/voice-check.rb` — Ruby linter that enforces voice rules (Tier 1 #6)
- `scripts/voice-check.sh` — convenience wrapper around the linter (Tier 1 #6)
- `scripts/test_voice_check.rb` — minitest test cases for the linter
- `.github/workflows/voice-check.yml` — CI workflow gating lesson PRs (Tier 1 #7)
- `docs/superpowers/greenfield-bible.md` — writer's reference for the universe (Tier 1 #8)
- `docs/superpowers/specs/retros/whatisanapi.md` — post-ship retro (Section 5 Step 7)

**Renamed files:**
- `_docs/whatisanAPI.md` → `_docs/whatisanapi.md` (lowercase, matches slug; needed for OG image filename consistency)

**Modified files:**
- `_includes/callout.html` — add `exercise` variant; replace emoji icons with text labels (Tier 1 #5)
- `_includes/mermaid.html` — switch to lazy init via `mermaid-init.js`
- `_data/glossary.yml` — strip em dashes, en dashes, and prose hyphens from existing entries; add new pilot terms (Tier 1 #11)
- `_docs/whatisanapi.md` — full rewrite against the spec (the pilot)
- `tailwind.config.js` — extend `safelist` with the callout accent and label classes (handled in Task 2)

**Operational, not code (Tier 1 #9, #10):**
- GA4 saved exploration for the success bar — Gaurav-owned, documented as a task
- giscus wiring confirmation — verification task

---

## Task 1: Create the `signoff` include

**Files:**
- Create: `_includes/signoff.html`

- [ ] **Step 1: Create the include**

Write `_includes/signoff.html`:

```html
<p class="signoff mt-12 mb-4 text-ink/85 font-serif text-base">Maya.</p>
```

That is the entire file. The spec locks the signoff at the literal string `Maya.` on its own line with no farewell phrase above it.

- [ ] **Step 2: Verify Jekyll picks it up**

Run: `bundle exec jekyll build` from the repo root.
Expected: exit code 0, no Liquid warnings about the new include.

- [ ] **Step 3: Commit**

```bash
git add _includes/signoff.html
git commit -m "feat(phase-2): add signoff include for Maya's locked signoff"
```

---

## Task 2: Update `callout.html` — add `exercise` variant and remove emoji

**Files:**
- Modify: `_includes/callout.html`

The current file uses literal emoji (💡, ⚠️, ℹ️) for icons. The spec bans emoji on the public site. Replace with text labels styled by Tailwind; the design tokens already exist (ink, copper, cream, sage). Add the `exercise` variant for block-5 "Try it on Greenfield" tasks.

- [ ] **Step 1: Replace the include with the new version**

Overwrite `_includes/callout.html` with this exact content:

```html
{%- assign variant = include.variant | default: 'note' -%}
{%- case variant -%}
  {%- when 'tip' -%}{%- assign label = 'Tip' -%}{%- assign accent = 'sage' -%}
  {%- when 'warning' -%}{%- assign label = 'Watch out' -%}{%- assign accent = 'copper' -%}
  {%- when 'recap' -%}{%- assign label = 'Recap' -%}{%- assign accent = 'ink' -%}
  {%- when 'exercise' -%}{%- assign label = 'Try this' -%}{%- assign accent = 'copper' -%}
  {%- else -%}{%- assign label = 'Note' -%}{%- assign accent = 'ink' -%}
{%- endcase -%}
<aside class="callout callout--{{ variant }} my-8 p-5 rounded-md bg-cream/60 border-l-4 border-{{ accent }}">
  <div class="callout-label uppercase tracking-wider text-xs font-semibold text-{{ accent }} mb-2">{{ label }}</div>
  <div class="callout-body text-[15px] leading-relaxed text-ink/90 font-serif">
    {{ include.body | default: include.content | default: '' }}
  </div>
</aside>
```

Notes for the engineer:
- The `body` parameter is the spec's canonical name (per Section 7 Inventory B). The `content` fallback preserves any existing call sites that pass `content=...`.
- The accent classes (`border-copper`, `text-sage`, etc.) must be in Tailwind's compiled CSS. They use the design tokens from `tailwind.config.js`, so they will compile if used; if Tailwind purges them, add them to `safelist` in Task 3 below.

- [ ] **Step 2: Add new accent classes to Tailwind safelist if needed**

Open `tailwind.config.js`. Find the `safelist:` array. Add these entries if not already present:

```js
'border-ink', 'border-copper', 'border-sage',
'text-ink', 'text-copper', 'text-sage',
'callout--tip', 'callout--warning', 'callout--recap', 'callout--exercise', 'callout--note',
```

- [ ] **Step 3: Rebuild Tailwind**

Run: `npm run build:css`
Expected: exit 0, `assets/css/main.css` rebuilt.

- [ ] **Step 4: Sanity-check existing call sites still render**

Run: `grep -rn "callout.html" _docs/ _layouts/ _includes/ | head -20`
Expected: see existing call sites. Any that pass `content=` will still work (preserved as a fallback parameter). Any that pass `variant="info"` will fall through to the `note` default.

- [ ] **Step 5: Run Jekyll build**

Run: `bundle exec jekyll build`
Expected: exit 0, no Liquid errors about missing parameters.

- [ ] **Step 6: Commit**

```bash
git add _includes/callout.html tailwind.config.js
git commit -m "feat(phase-2): callout supports exercise variant, no emoji"
```

---

## Task 3: Create `mermaid-init.js` and refactor `mermaid.html`

**Files:**
- Create: `assets/js/mermaid-init.js`
- Modify: `_includes/mermaid.html`

The spec requires a theme override using the four design tokens (ink, cream, copper, sage). The current `_includes/mermaid.html` loads Mermaid on every page that includes it and uses the default theme. The fix is one shared init script.

- [ ] **Step 1: Create the init script**

Write `assets/js/mermaid-init.js`:

```javascript
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    fontFamily: 'Georgia, "Iowan Old Style", serif',
    fontSize: '15px',
    primaryColor: '#F2EFE8',
    primaryTextColor: '#1B1B1B',
    primaryBorderColor: '#1B1B1B',
    lineColor: '#1B1B1B',
    secondaryColor: '#B27744',
    tertiaryColor: '#7C8C73',
    background: '#FFFFFF',
    mainBkg: '#F2EFE8',
    secondBkg: '#FFFFFF',
    tertiaryBkg: '#F2EFE8',
    nodeBorder: '#1B1B1B',
    edgeLabelBackground: '#F2EFE8',
    clusterBkg: '#F2EFE8',
    clusterBorder: '#1B1B1B',
    titleColor: '#1B1B1B',
    actorBorder: '#1B1B1B',
    actorBkg: '#F2EFE8',
    actorTextColor: '#1B1B1B',
    actorLineColor: '#1B1B1B',
    signalColor: '#1B1B1B',
    signalTextColor: '#1B1B1B',
    labelBoxBkgColor: '#F2EFE8',
    labelBoxBorderColor: '#1B1B1B',
    labelTextColor: '#1B1B1B',
    loopTextColor: '#1B1B1B',
    noteBorderColor: '#B27744',
    noteBkgColor: '#FAF7EF',
    noteTextColor: '#1B1B1B'
  }
});
```

Token values come from `tailwind.config.js` (`ink` `#1B1B1B`, `cream` `#F2EFE8`, `copper` `#B27744`, `sage` `#7C8C73`). Confirm by running: `grep -E "ink:|cream:|copper:|sage:" tailwind.config.js`. If a token differs, update the hex above to match.

- [ ] **Step 2: Replace `_includes/mermaid.html`**

Overwrite `_includes/mermaid.html`:

```html
<figure class="mermaid-figure my-8" aria-label="{{ include.alt | default: 'Diagram' }}">
  <pre class="mermaid">{{ include.content }}</pre>
  {%- unless page.mermaid_loaded -%}
    <script type="module" src="{{ '/assets/js/mermaid-init.js' | relative_url }}"></script>
    {%- assign page.mermaid_loaded = true -%}
  {%- endunless -%}
  <noscript>
    <pre class="mermaid-source text-xs text-ink/60 font-mono p-3 bg-cream/50 rounded">{{ include.content | escape }}</pre>
  </noscript>
</figure>
```

Notes:
- Mermaid 10 renders `<pre class="mermaid">` automatically when `startOnLoad: true`.
- The `unless page.mermaid_loaded` guard avoids re-injecting the init script when a page has multiple diagrams. (The spec caps lessons at one Mermaid per lesson, but this is defensive and costs nothing.)
- `<noscript>` provides the source text for users without JavaScript, matching the spec's accessibility requirement that the source is exposed.

- [ ] **Step 3: Verify no existing lesson uses Mermaid without the include**

Run: `grep -rn 'class="mermaid"\|<div class="mermaid"' _docs/ | grep -v "mermaid-source"`
Expected: no hits except via the include. If there are inline call sites, they will still render (they use the same `class="mermaid"` selector) but they will not get the new theme — note them for future cleanup; do not block this task.

- [ ] **Step 4: Build and verify**

Run: `bundle exec jekyll build`
Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add assets/js/mermaid-init.js _includes/mermaid.html
git commit -m "feat(phase-2): mermaid theme override via shared init script"
```

---

## Task 4: Write the central `interactive-svg.js` framework — TDD

**Files:**
- Create: `assets/js/interactive-svg.js`
- Create: `assets/js/interactive-svg.test.html` (manual test harness)

The framework supports four patterns named in spec Section 6: `click-step`, `hover-tooltip`, `toggle`, `slider`. Each SVG declares its pattern on the root `<svg>` element via `data-svg-pattern="<name>"` plus pattern-specific `data-*` config.

There is no headless JS test runner in this repo, so we use a manual HTML test harness plus a small assertion script.

- [ ] **Step 1: Create the manual test harness**

Write `assets/js/interactive-svg.test.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>interactive-svg framework tests</title>
  <style>
    body { font-family: sans-serif; max-width: 800px; margin: 40px auto; }
    .case { border: 1px solid #ccc; padding: 16px; margin: 16px 0; }
    .case h3 { margin: 0 0 8px; }
    .result { padding: 8px; margin-top: 8px; }
    .pass { background: #d4edda; }
    .fail { background: #f8d7da; }
    .svg-host { background: #f7f5f0; padding: 8px; }
  </style>
</head>
<body>
  <h1>interactive-svg framework tests</h1>
  <p>Open in a browser. Each test prints PASS or FAIL.</p>

  <div class="case" id="case-click-step">
    <h3>click-step: advances state on click and on Enter key</h3>
    <div class="svg-host">
      <svg data-svg-pattern="click-step" data-steps="3" viewBox="0 0 200 80" width="200" height="80" tabindex="0">
        <rect class="step" data-step="0" x="10" y="10" width="60" height="60" fill="#B27744" />
        <rect class="step" data-step="1" x="80" y="10" width="60" height="60" fill="#ccc" />
        <rect class="step" data-step="2" x="150" y="10" width="60" height="60" fill="#ccc" />
      </svg>
    </div>
    <div class="result" id="result-click-step"></div>
  </div>

  <div class="case" id="case-toggle">
    <h3>toggle: clicking flips data-state between A and B</h3>
    <div class="svg-host">
      <svg data-svg-pattern="toggle" viewBox="0 0 200 80" width="200" height="80" tabindex="0">
        <text x="100" y="50" text-anchor="middle" class="toggle-label">A</text>
      </svg>
    </div>
    <div class="result" id="result-toggle"></div>
  </div>

  <div class="case" id="case-hover">
    <h3>hover-tooltip: focus on element shows tooltip with its data-tooltip</h3>
    <div class="svg-host">
      <svg data-svg-pattern="hover-tooltip" viewBox="0 0 200 80" width="200" height="80">
        <circle cx="50" cy="40" r="20" fill="#7C8C73" data-tooltip="Greenfield" tabindex="0" />
      </svg>
    </div>
    <div class="result" id="result-hover"></div>
  </div>

  <div class="case" id="case-slider">
    <h3>slider: dragging input updates label and dispatches change</h3>
    <div class="svg-host">
      <svg data-svg-pattern="slider" data-min="0" data-max="10" data-start="3" viewBox="0 0 200 80" width="200" height="80">
        <text x="100" y="50" text-anchor="middle" class="slider-value">3</text>
        <foreignObject x="20" y="60" width="160" height="20">
          <input type="range" class="slider-input" min="0" max="10" value="3" />
        </foreignObject>
      </svg>
    </div>
    <div class="result" id="result-slider"></div>
  </div>

  <script type="module">
    import { initInteractiveSvgs, _testHooks } from './interactive-svg.js';
    initInteractiveSvgs();

    const assert = (id, cond, msg) => {
      const el = document.getElementById(id);
      el.textContent = (cond ? 'PASS: ' : 'FAIL: ') + msg;
      el.className = 'result ' + (cond ? 'pass' : 'fail');
    };

    // click-step
    const cs = document.querySelector('#case-click-step svg');
    cs.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    assert('result-click-step', cs.dataset.currentStep === '1', 'state advanced to 1 after click (got ' + cs.dataset.currentStep + ')');

    // toggle
    const tg = document.querySelector('#case-toggle svg');
    const initialState = tg.dataset.state;
    tg.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    assert('result-toggle', tg.dataset.state !== initialState, 'state flipped after click (was ' + initialState + ', now ' + tg.dataset.state + ')');

    // hover-tooltip
    const hv = document.querySelector('#case-hover circle');
    hv.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
    const tip = document.querySelector('.svg-tooltip');
    assert('result-hover', tip && tip.textContent === 'Greenfield', 'tooltip text matches data-tooltip (got ' + (tip && tip.textContent) + ')');

    // slider
    const sl = document.querySelector('#case-slider .slider-input');
    sl.value = '7';
    sl.dispatchEvent(new Event('input', { bubbles: true }));
    const lbl = document.querySelector('#case-slider .slider-value');
    assert('result-slider', lbl.textContent === '7', 'label updates on slider input (got ' + lbl.textContent + ')');
  </script>
</body>
</html>
```

- [ ] **Step 2: Open the test harness — confirm all four show FAIL**

Run from the repo root:
```bash
python3 -m http.server 8080 --directory assets/js &
SERVER_PID=$!
sleep 1
open "http://localhost:8080/interactive-svg.test.html" || echo "Open manually: http://localhost:8080/interactive-svg.test.html"
```

Expected: all four cases say FAIL (the framework file does not exist yet — the import will throw). The test harness is correct if you see a JavaScript console error about missing `./interactive-svg.js`.

Kill the server when done: `kill $SERVER_PID`

- [ ] **Step 3: Write the framework**

Create `assets/js/interactive-svg.js`:

```javascript
// Central framework for lesson interactive SVGs.
// Each SVG declares its pattern via data-svg-pattern on the root <svg>.
// Patterns: click-step, hover-tooltip, toggle, slider.

const patterns = {
  'click-step': initClickStep,
  'hover-tooltip': initHoverTooltip,
  'toggle': initToggle,
  'slider': initSlider
};

export function initInteractiveSvgs(root = document) {
  const svgs = root.querySelectorAll('svg[data-svg-pattern]');
  svgs.forEach(svg => {
    const pattern = svg.dataset.svgPattern;
    const init = patterns[pattern];
    if (init) init(svg);
  });
}

function prefersReducedMotion() {
  return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function initClickStep(svg) {
  const total = parseInt(svg.dataset.steps || '0', 10);
  svg.dataset.currentStep = '0';
  if (!svg.hasAttribute('tabindex')) svg.setAttribute('tabindex', '0');
  if (!svg.hasAttribute('role')) svg.setAttribute('role', 'button');
  if (!svg.hasAttribute('aria-label')) svg.setAttribute('aria-label', 'Click or press Enter to advance');

  const advance = () => {
    const next = (parseInt(svg.dataset.currentStep, 10) + 1) % Math.max(total, 1);
    svg.dataset.currentStep = String(next);
    svg.querySelectorAll('[data-step]').forEach(node => {
      const isActive = node.dataset.step === String(next);
      node.classList.toggle('is-active', isActive);
    });
    svg.dispatchEvent(new CustomEvent('svg:step', { detail: { step: next } }));
  };

  svg.addEventListener('click', advance);
  svg.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); advance(); }
  });
}

function initToggle(svg) {
  const states = (svg.dataset.states || 'A,B').split(',');
  svg.dataset.state = states[0];
  if (!svg.hasAttribute('tabindex')) svg.setAttribute('tabindex', '0');
  if (!svg.hasAttribute('role')) svg.setAttribute('role', 'switch');
  svg.setAttribute('aria-checked', 'false');

  const flip = () => {
    const idx = states.indexOf(svg.dataset.state);
    const next = states[(idx + 1) % states.length];
    svg.dataset.state = next;
    svg.setAttribute('aria-checked', String(next !== states[0]));
    const label = svg.querySelector('.toggle-label');
    if (label) label.textContent = next;
    svg.dispatchEvent(new CustomEvent('svg:toggle', { detail: { state: next } }));
  };

  svg.addEventListener('click', flip);
  svg.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
  });
}

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
  targets.forEach(t => {
    if (!t.hasAttribute('tabindex')) t.setAttribute('tabindex', '0');
    const show = () => {
      tip.textContent = t.getAttribute('data-tooltip');
      tip.style.display = 'block';
      t.setAttribute('aria-describedby', 'svg-tip');
      tip.id = 'svg-tip';
    };
    const hide = () => { tip.style.display = 'none'; };
    t.addEventListener('mouseenter', show);
    t.addEventListener('mouseleave', hide);
    t.addEventListener('focus', show);
    t.addEventListener('blur', hide);
  });
}

function initSlider(svg) {
  const input = svg.querySelector('.slider-input');
  const label = svg.querySelector('.slider-value');
  if (!input) return;
  const sync = () => {
    if (label) label.textContent = input.value;
    svg.dataset.value = input.value;
    svg.dispatchEvent(new CustomEvent('svg:slide', { detail: { value: input.value } }));
  };
  input.addEventListener('input', sync);
  sync();
}

// Auto-init on DOMContentLoaded for production pages.
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initInteractiveSvgs());
  } else {
    initInteractiveSvgs();
  }
}

// Exported for the test harness.
export const _testHooks = { patterns, prefersReducedMotion };
```

- [ ] **Step 4: Reload the test harness — confirm all four show PASS**

Run from repo root:
```bash
python3 -m http.server 8080 --directory assets/js &
SERVER_PID=$!
sleep 1
open "http://localhost:8080/interactive-svg.test.html" || echo "Open manually: http://localhost:8080/interactive-svg.test.html"
```

Expected: all four cases show green PASS.

Kill the server: `kill $SERVER_PID`

If any case shows FAIL, read the message and fix the framework — do not move on with red tests.

- [ ] **Step 5: Commit**

```bash
git add assets/js/interactive-svg.js assets/js/interactive-svg.test.html
git commit -m "feat(phase-2): central interactive SVG framework with four patterns"
```

---

## Task 5: Add the `include_file` Jekyll plugin and the `interactive-svg.html` include

**Files:**
- Create: `_plugins/include_file.rb`
- Create: `_includes/interactive-svg.html`
- Create: `assets/svg/whatisanapi/main.svg` (placeholder; replaced in Task 14)

Liquid does not have a built-in tag for reading an arbitrary repo-relative file. `include_relative` resolves paths relative to the calling page, not relative to the include itself, so it cannot reliably reach `assets/svg/<slug>/main.svg` from inside `_includes/interactive-svg.html`. The clean fix is a tiny Jekyll plugin (`_plugins/` is auto-loaded at build time).

- [ ] **Step 1: Create the plugin**

Write `_plugins/include_file.rb`:

```ruby
# Inline an arbitrary repo-relative file as raw text.
# Usage: {% include_file assets/svg/<slug>/main.svg %}
# Path is resolved relative to the Jekyll site source root.
module Jekyll
  class IncludeFileTag < Liquid::Tag
    def initialize(tag_name, raw, tokens)
      super
      @raw = raw.strip
    end

    def render(context)
      site = context.registers[:site]
      # Allow {% include_file {{ var }} %} by re-rendering the raw text once.
      path = Liquid::Template.parse(@raw).render(context).strip
      # Strip leading slash so the path is relative to the source root.
      path = path.sub(%r{\A/}, '')
      full = File.expand_path(File.join(site.source, path))
      # Prevent path traversal out of the source root.
      raise "include_file: refusing to read outside source: #{path}" unless full.start_with?(File.expand_path(site.source))
      raise "include_file: file not found: #{path}" unless File.exist?(full)
      File.read(full)
    end
  end
end
Liquid::Template.register_tag('include_file', Jekyll::IncludeFileTag)
```

- [ ] **Step 2: Create the include**

Write `_includes/interactive-svg.html`:

```html
{%- assign svg_path = '/assets/svg/' | append: include.slug | append: '/main.svg' -%}
<figure class="interactive-svg my-8" aria-label="{{ include.alt | default: 'Interactive diagram' }}">
  <div class="svg-wrapper relative max-w-full overflow-hidden" style="position:relative;">
    {% include_file {{ svg_path }} %}
  </div>
  {%- if include.caption -%}
    <figcaption class="text-sm text-ink/60 mt-2">{{ include.caption }}</figcaption>
  {%- endif -%}
  <noscript>
    <p class="text-xs text-ink/60 mt-2">This diagram is interactive when JavaScript is on. The static view shows the default state: {{ include.alt }}</p>
  </noscript>
  {%- unless page.interactive_svg_loaded -%}
    <script type="module" src="{{ '/assets/js/interactive-svg.js' | relative_url }}"></script>
    {%- assign page.interactive_svg_loaded = true -%}
  {%- endunless -%}
</figure>
```

- [ ] **Step 3: Create a placeholder SVG**

Run:
```bash
mkdir -p assets/svg/whatisanapi
cat > assets/svg/whatisanapi/main.svg <<'EOF'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;" data-svg-pattern="click-step" data-steps="2" tabindex="0" role="img" aria-label="Placeholder SVG, replaced in Task 14">
  <rect width="800" height="500" fill="#F2EFE8" />
  <text x="400" y="250" text-anchor="middle" font-family="Georgia, serif" font-size="20" fill="#1B1B1B">Placeholder</text>
</svg>
EOF
```

- [ ] **Step 4: Verify the plugin and include work end to end**

Create a throwaway test page at `_docs/_test-interactive-svg.md`:

```markdown
---
title: SVG include test
permalink: /_test-interactive-svg.html
---
{% include interactive-svg.html slug="whatisanapi" alt="Two boxes, click to swap which is highlighted" %}
```

Run: `bundle exec jekyll build`
Expected: exit 0. The build registers the plugin (`Jekyll::IncludeFileTag`) on startup; no warnings.

Verify the SVG was inlined: `grep -c 'data-svg-pattern="click-step"' _site/_test-interactive-svg.html`
Expected: at least 1.

If the plugin fails to register (output like `Liquid Warning: Liquid syntax error: Unknown tag 'include_file'`), check `_config.yml` for a `plugins:` block that whitelists plugins — by default Jekyll auto-loads everything in `_plugins/`, but if `safe: true` is set anywhere (which would also block GitHub Pages auto-build, but the repo uses a custom Action so this is allowed), the plugin will be skipped. The CI workflow in `.github/workflows/build.yml` runs `bundle exec jekyll build` without `--safe`, which is what we want; confirm.

- [ ] **Step 5: Delete the throwaway test page**

```bash
rm _docs/_test-interactive-svg.md
```

- [ ] **Step 6: Commit**

```bash
git add _plugins/include_file.rb _includes/interactive-svg.html assets/svg/whatisanapi/main.svg
git commit -m "feat(phase-2): include_file plugin, interactive-svg include, placeholder SVG"
```

---

## Task 6: Voice-check linter — TDD

**Files:**
- Create: `scripts/voice-check.rb`
- Create: `scripts/test_voice_check.rb`
- Create: `scripts/voice-check.sh`

Ruby is already a project dependency (Jekyll runs on it). The linter is a single Ruby script. The test runner uses Ruby's standard `minitest` (bundled with Ruby).

The linter checks the items in spec Section 6: hyphens in body prose, em dashes, en dashes, emoji, AI-tell-ban phrases, signoff presence, frontmatter completeness, block-marker presence. Skip rules: backticks, frontmatter, HTML comments, `<pre>` blocks, Markdown link URLs, Liquid include parameter values.

- [ ] **Step 1: Write the failing tests**

Create `scripts/test_voice_check.rb`:

```ruby
require 'minitest/autorun'
require 'tempfile'
require_relative 'voice-check'

class VoiceCheckTest < Minitest::Test
  def lint(content)
    f = Tempfile.new(['lesson', '.md'])
    f.write(content)
    f.close
    VoiceCheck.lint_file(f.path)
  ensure
    f.unlink if f
  end

  def test_passes_clean_minimal_lesson
    content = <<~MD
      ---
      title: Test
      permalink: /test.html
      module: 1
      lesson: 1
      slug: test
      reading_time: 10
      description: A clean test lesson.
      ---
      {% comment %}block:1{% endcomment %}
      Diary opener.

      {% comment %}block:2{% endcomment %}
      Today.

      {% comment %}block:3{% endcomment %}
      What.

      {% comment %}block:4{% endcomment %}
      How.

      {% comment %}block:5{% endcomment %}
      Try.

      {% comment %}block:6{% endcomment %}
      Trap.

      {% comment %}block:7{% endcomment %}
      Words.

      {% comment %}block:8{% endcomment %}
      AI.

      {% comment %}block:9{% endcomment %}
      Before.

      {% comment %}block:10{% endcomment %}
      Next.

      {% include signoff.html %}
    MD
    violations = lint(content)
    assert_empty violations, "expected no violations, got: #{violations.inspect}"
  end

  def test_flags_em_dash
    content = base_lesson.sub('Diary opener.', 'Diary opener — with em dash.')
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'em-dash' }, violations.inspect
  end

  def test_flags_hyphen_in_prose
    content = base_lesson.sub('Diary opener.', 'A schema-driven approach.')
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'hyphen' }, violations.inspect
  end

  def test_allows_hyphen_inside_backticks
    content = base_lesson.sub('Diary opener.', 'See the `X-API-Key` header.')
    violations = lint(content)
    refute violations.any? { |v| v[:rule] == 'hyphen' }, violations.inspect
  end

  def test_allows_hyphen_inside_markdown_link_url
    content = base_lesson.sub('Diary opener.', 'Read [the docs](/some-page-with-hyphens.html).')
    violations = lint(content)
    refute violations.any? { |v| v[:rule] == 'hyphen' }, violations.inspect
  end

  def test_allows_hyphen_inside_liquid_include_param
    content = base_lesson.sub('Diary opener.', '{% include glossary-term.html term="slug-with-dashes" %}')
    violations = lint(content)
    refute violations.any? { |v| v[:rule] == 'hyphen' }, violations.inspect
  end

  def test_flags_ai_tell_phrase
    content = base_lesson.sub('Diary opener.', "Let's dive in.")
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'ai-tell' && v[:matched] =~ /dive in/i }, violations.inspect
  end

  def test_flags_emoji
    content = base_lesson.sub('Diary opener.', 'Diary opener with rocket.') + "\n\nText with emoji here: ✨"
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'emoji' }, violations.inspect
  end

  def test_flags_missing_signoff
    content = base_lesson.sub('{% include signoff.html %}', '')
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'missing-signoff' }, violations.inspect
  end

  def test_flags_missing_block_marker
    content = base_lesson.sub('{% comment %}block:5{% endcomment %}', '')
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'missing-block' && v[:matched] == '5' }, violations.inspect
  end

  def test_flags_missing_frontmatter_field
    content = base_lesson.sub('reading_time: 10', '')
    violations = lint(content)
    assert violations.any? { |v| v[:rule] == 'missing-frontmatter' && v[:matched] == 'reading_time' }, violations.inspect
  end

  def base_lesson
    <<~MD
      ---
      title: Test
      permalink: /test.html
      module: 1
      lesson: 1
      slug: test
      reading_time: 10
      description: A clean test lesson.
      ---
      {% comment %}block:1{% endcomment %}
      Diary opener.

      {% comment %}block:2{% endcomment %}
      Today.

      {% comment %}block:3{% endcomment %}
      What.

      {% comment %}block:4{% endcomment %}
      How.

      {% comment %}block:5{% endcomment %}
      Try.

      {% comment %}block:6{% endcomment %}
      Trap.

      {% comment %}block:7{% endcomment %}
      Words.

      {% comment %}block:8{% endcomment %}
      AI.

      {% comment %}block:9{% endcomment %}
      Before.

      {% comment %}block:10{% endcomment %}
      Next.

      {% include signoff.html %}
    MD
  end
end
```

- [ ] **Step 2: Run the tests — confirm they fail**

Run: `ruby scripts/test_voice_check.rb`
Expected: load error, because `voice-check.rb` does not exist yet.

- [ ] **Step 3: Write the linter to pass the tests**

Create `scripts/voice-check.rb`:

```ruby
# Voice-check linter for Phase 2 lessons.
# Spec: docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md (Section 6).

require 'yaml'

module VoiceCheck
  AI_TELL_PHRASES = [
    "let's dive in", "buckle up", "picture this", "imagine this scenario",
    "imagine a world where", "in today's fast paced world", "without further ado",
    "look no further", "here is the thing", "it is worth noting that", "needless to say",
    "it goes without saying", "it is important to understand", "first and foremost",
    "when it comes to", "in essence", "at the end of the day", "on the flip side",
    "in conclusion", "in summary", "to wrap up", "i hope this helps",
    "there you have it", "feel free to", "whether you are a beginner or seasoned pro",
    "crucial", "vital", "essential", "pivotal", "paramount", "robust", "seamless",
    "comprehensive", "holistic", "leverage", "utilize", "delve into", "delve",
    "unlock", "empower", "elevate", "supercharge", "transform", "game changing",
    "cutting edge", "next generation", "state of the art", "the realm of",
    "the landscape of", "the tapestry of", "the world of"
  ].freeze

  REQUIRED_FRONTMATTER = %w[title permalink module lesson slug reading_time description].freeze
  REQUIRED_BLOCKS = (1..10).map(&:to_s).freeze

  # Unicode emoji ranges (BMP plus supplementary planes commonly used).
  EMOJI_REGEX = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{2300}-\u{23FF}\u{2B00}-\u{2BFF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}]/

  module_function

  def lint_file(path)
    text = File.read(path)
    violations = []

    fm_match = text.match(/\A---\s*\n(.*?)\n---\s*\n(.*)\z/m)
    if fm_match
      raw_fm, body = fm_match[1], fm_match[2]
      violations.concat(check_frontmatter(raw_fm))
    else
      violations << { rule: 'missing-frontmatter', matched: 'YAML-block', line: 1 }
      body = text
    end

    masked_body = mask_skipped_regions(body)

    violations.concat(check_punctuation(masked_body))
    violations.concat(check_emoji(masked_body))
    violations.concat(check_ai_tells(masked_body))
    violations.concat(check_signoff(body))
    violations.concat(check_block_markers(body))

    violations.each { |v| v[:file] = path }
    violations
  end

  def check_frontmatter(raw)
    violations = []
    parsed = YAML.safe_load(raw, permitted_classes: [Date, Time]) || {}
    REQUIRED_FRONTMATTER.each do |field|
      next if parsed.key?(field) && !parsed[field].to_s.strip.empty?
      violations << { rule: 'missing-frontmatter', matched: field, line: 1 }
    end
    violations
  rescue Psych::SyntaxError => e
    [{ rule: 'frontmatter-invalid', matched: e.message, line: 1 }]
  end

  # Replace skipped regions with same-length spaces so line numbers stay accurate.
  def mask_skipped_regions(text)
    out = text.dup
    # Triple-backtick fences.
    out = mask_pattern(out, /```.*?```/m)
    # Inline backticks.
    out = mask_pattern(out, /`[^`\n]+`/)
    # HTML comments.
    out = mask_pattern(out, /<!--.*?-->/m)
    # <pre> blocks.
    out = mask_pattern(out, /<pre.*?<\/pre>/m)
    # Liquid tags (entire {% ... %}). Skips include parameter values.
    out = mask_pattern(out, /\{%.*?%\}/m)
    # Markdown link URLs only: [text](url) — keep the text, mask the (url) parens.
    out = mask_pattern(out, /\[[^\]]*\]\(([^)]+)\)/) { |m| "[#{m[/\[([^\]]*)\]/, 1]}](#{' ' * m[/\(([^)]+)\)/, 1].length})" }
    out
  end

  def mask_pattern(text, regex)
    if block_given?
      text.gsub(regex) { |m| yield(m) }
    else
      text.gsub(regex) { |m| ' ' * m.length }
    end
  end

  def check_punctuation(text)
    violations = []
    text.each_line.with_index(1) do |line, lineno|
      line.each_char.with_index do |ch, col|
        case ch
        when '-'
          violations << { rule: 'hyphen', matched: ch, line: lineno, col: col + 1 }
        when "—"
          violations << { rule: 'em-dash', matched: ch, line: lineno, col: col + 1 }
        when "–"
          violations << { rule: 'en-dash', matched: ch, line: lineno, col: col + 1 }
        end
      end
    end
    violations
  end

  def check_emoji(text)
    violations = []
    text.each_line.with_index(1) do |line, lineno|
      line.scan(EMOJI_REGEX) do |match|
        violations << { rule: 'emoji', matched: match, line: lineno }
      end
    end
    violations
  end

  def check_ai_tells(text)
    violations = []
    lc = text.downcase
    AI_TELL_PHRASES.each do |phrase|
      offset = 0
      while (idx = lc.index(phrase, offset))
        line = lc[0, idx].count("\n") + 1
        violations << { rule: 'ai-tell', matched: phrase, line: line }
        offset = idx + phrase.length
      end
    end
    violations
  end

  def check_signoff(body)
    return [] if body.lines.last(5).any? { |l| l.include?('{% include signoff.html %}') }
    [{ rule: 'missing-signoff', matched: 'last 5 lines lack signoff include', line: body.lines.count }]
  end

  def check_block_markers(body)
    found = body.scan(/\{%\s*comment\s*%\}\s*block:(\d+)\s*\{%\s*endcomment\s*%\}/).flatten
    missing = REQUIRED_BLOCKS - found
    missing.map { |n| { rule: 'missing-block', matched: n, line: 0 } }
  end
end

if __FILE__ == $PROGRAM_NAME
  if ARGV.empty?
    warn "Usage: ruby scripts/voice-check.rb <lesson.md> [more lessons...]"
    exit 2
  end
  all_violations = ARGV.flat_map { |path| VoiceCheck.lint_file(path) }
  all_violations.each do |v|
    loc = v[:line].to_i > 0 ? ":#{v[:line]}" : ''
    puts "#{v[:file]}#{loc} [#{v[:rule]}] #{v[:matched]}"
  end
  exit(all_violations.empty? ? 0 : 1)
end
```

- [ ] **Step 4: Run the tests — confirm all pass**

Run: `ruby scripts/test_voice_check.rb`
Expected: all 11 tests pass, output ends with `11 runs, 11 assertions, 0 failures, 0 errors`.

If any test fails, read the failure message and fix the linter. Do not move on with red tests.

- [ ] **Step 5: Create the bash wrapper**

The wrapper, when called with no arguments, lints only files that are staged or changed against `master` — not every legacy lesson in `_docs/`. This matters because the existing legacy lessons contain hundreds of em-dashes and AI tells; running the linter against all of them would always exit non-zero and the wrapper would be useless. CI runs the linter on changed-only files (Task 7). The wrapper mirrors that.

Write `scripts/voice-check.sh`:

```bash
#!/usr/bin/env bash
# Wrapper: lint specific lesson files, or (with no args) lint staged + changed _docs/*.md.
# Legacy lessons that have not yet been rewritten are NOT linted by default; passing them
# explicitly will lint them (useful for spot-checking).
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
root="$(cd "$here/.." && pwd)"

if [ "$#" -gt 0 ]; then
  files=("$@")
else
  cd "$root"
  # Staged + modified + new files matching _docs/*.md, deduped.
  mapfile -t files < <(
    {
      git diff --cached --name-only -- '_docs/*.md'
      git diff --name-only -- '_docs/*.md'
      git ls-files --others --exclude-standard -- '_docs/*.md'
    } | sort -u
  )
  if [ "${#files[@]}" -eq 0 ]; then
    echo "voice-check: no changed _docs/*.md files. Pass paths explicitly to lint legacy lessons." >&2
    exit 0
  fi
fi

ruby "$here/voice-check.rb" "${files[@]}"
```

Make it executable: `chmod +x scripts/voice-check.sh`

- [ ] **Step 6: Smoke-test the wrapper on a real lesson**

Run: `./scripts/voice-check.sh _docs/whatisanAPI.md`
Expected: lots of violations (the legacy lesson has em dashes, AI tells, emoji-free but plenty of hyphens). The point is that the wrapper runs and prints `path:line [rule] matched` output.

- [ ] **Step 7: Commit**

```bash
git add scripts/voice-check.rb scripts/test_voice_check.rb scripts/voice-check.sh
git commit -m "feat(phase-2): voice-check linter and bash wrapper"
```

---

## Task 7: CI workflow for the voice linter and HTMLProofer

**Files:**
- Create: `.github/workflows/voice-check.yml`

The spec's pre-merge gates (Section 5 Step 6) are: `bundle exec jekyll build`, `npm run build:css`, HTMLProofer on the new lesson, and the voice linter. The existing `.github/workflows/build.yml` already covers the Jekyll build, the Tailwind build, and the deploy to GitHub Pages on push to `master` or `modernize-phase-1`. The voice-check workflow runs on every PR and adds two jobs the build workflow does not cover: the voice linter on changed lessons, and HTMLProofer on the resulting `_site/` (scoped to the changed lesson paths).

- [ ] **Step 1: Create the workflow**

Write `.github/workflows/voice-check.yml`:

```yaml
name: Lesson PR gate

on:
  pull_request:
    paths:
      - '_docs/**.md'
      - '_data/glossary.yml'
      - 'scripts/voice-check.rb'
      - 'scripts/test_voice_check.rb'
      - 'scripts/voice-check.sh'
      - '.github/workflows/voice-check.yml'

jobs:
  voice-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - name: Run linter test suite
        run: ruby scripts/test_voice_check.rb
      - name: Identify changed lesson files
        id: changed
        run: |
          base="${{ github.event.pull_request.base.sha }}"
          changed=$(git diff --name-only "$base"...HEAD -- '_docs/*.md' || true)
          echo "files<<EOF" >> "$GITHUB_OUTPUT"
          echo "$changed" >> "$GITHUB_OUTPUT"
          echo "EOF" >> "$GITHUB_OUTPUT"
      - name: Run voice-check on changed lessons
        if: steps.changed.outputs.files != ''
        run: |
          echo "${{ steps.changed.outputs.files }}" | xargs -r ruby scripts/voice-check.rb
      - name: Build site (so HTMLProofer has something to scan)
        if: steps.changed.outputs.files != ''
        run: |
          npm ci || npm install
          npm run build:css
          bundle exec jekyll build
      - name: HTMLProofer on changed lessons
        if: steps.changed.outputs.files != ''
        run: |
          # Map _docs/<slug>.md to _site/<slug>.html and run htmlproofer against just those.
          targets=$(echo "${{ steps.changed.outputs.files }}" | sed -E 's#^_docs/(.*)\.md$#_site/\1.html#' | tr '\n' ' ')
          gem install html-proofer
          htmlproofer $targets \
            --no-enforce-https \
            --ignore-status-codes "999" \
            --ignore-urls "/^https:\/\/api\.greenfield\.lib/,/^http:\/\/localhost/" \
            --allow-missing-href
```

Notes:
- `bundler-cache: true` caches the Gemfile.lock-installed gems (jekyll and friends) so the build step is fast.
- `gem install html-proofer` installs HTMLProofer on top of whatever Gemfile-managed gems are present. The repo's Gemfile does not currently declare it; this is the simplest path. If we want it Gemfile-managed later, add `gem "html-proofer"` to the `:development` group in the Gemfile.
- `--ignore-urls` skips link-checking the fictional `https://api.greenfield.lib` (it will not resolve) and any `http://localhost` URLs that might sneak in.
- `--ignore-status-codes "999"` covers LinkedIn-style "anti-bot" status codes that HTMLProofer flags.

- [ ] **Step 2: Validate YAML locally**

Run: `ruby -ryaml -e 'YAML.load_file(".github/workflows/voice-check.yml")'`
Expected: exit 0, no output.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/voice-check.yml
git commit -m "ci(phase-2): lesson PR gate — voice check + HTMLProofer on changed lessons"
```

The workflow will run for real on the pilot's PR (Task 16). If GitHub flags YAML issues or a HTMLProofer rule misbehaves, fix and re-push.

---

## Task 8: Sweep `_data/glossary.yml` for em dashes and hyphens

**Files:**
- Modify: `_data/glossary.yml`

The existing glossary contains em dashes in definitions (e.g., "Large Language Models — GPT, Claude, et al."). The linter would fail on any lesson that links to one of these terms because the definition text is injected into the page via `data-tip="..."`. Sweep them now so the pilot ships clean.

- [ ] **Step 1: Find the violations**

Run: `grep -nE '—|–|[A-Za-z]-[A-Za-z]' _data/glossary.yml | head -40`

The current state (verified during planning): 3 em-dash hits (lines vary). There are also legitimate hyphenated cases like "URL-safe" and "JSON-based" in definitions.

- [ ] **Step 2: Rewrite the offending entries**

For each violation, apply the spec's rules (Section 3 punctuation rules):
- Em dash `—` → period and new sentence, OR colon, OR rewrite.
- Hyphen in prose → rewrite as two words ("URL safe", "JSON based").

Specific edits needed in `_data/glossary.yml` (run `grep -nE '—|–' _data/glossary.yml` first to confirm current line numbers):
- `"JSON Web Token. A compact, URL-safe means..."` → `"JSON Web Token. A compact URL safe means..."`
- `"Model Context Protocol — how agents..."` → `"Model Context Protocol. How agents..."`
- `"Large Language Models — GPT, Claude, Gemini, et al."` → `"Large Language Models. GPT, Claude, Gemini, and others."`
- `"Too Many Requests — you, specifically, are over your rate limit."` → `"Too Many Requests. You, specifically, are over your rate limit."`
- Any other em dashes: same treatment.

Use Edit with `replace_all: false` per entry.

- [ ] **Step 3: Verify clean**

Run: `grep -nE '—|–' _data/glossary.yml`
Expected: no output.

Run: `grep -nE '[A-Za-z]-[A-Za-z]' _data/glossary.yml` and read the hits. Hyphens inside `term:` values are OK if they are the canonical name (e.g., `OAuth 2.0` is fine; `X-API-Key` is fine inside backticks). Hyphens in `definition:` prose are not OK. Edit the prose ones.

- [ ] **Step 4: Rebuild and spot-check a page**

Run: `bundle exec jekyll build && grep -A1 'data-tip="Large Language' _site/json.html 2>/dev/null | head -5`
Expected: the rendered tooltip uses the cleaned text.

- [ ] **Step 5: Commit**

```bash
git add _data/glossary.yml
git commit -m "chore(phase-2): scrub em dashes and prose hyphens from glossary"
```

---

## Task 9: Create the Greenfield bible skeleton

**Files:**
- Create: `docs/superpowers/greenfield-bible.md`

This is the writer's reference, not for the public site. Just the empty section skeleton per spec Section 7.

- [ ] **Step 1: Create the file**

Write `docs/superpowers/greenfield-bible.md`:

```markdown
# The Greenfield Bible

Writer's reference for the Greenfield Library universe. Not part of the published course. Updated in the same PR as any lesson that introduces new details.

Source spec: `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md` Section 7.

---

## Cast

**Maya.** Senior technical writer. Narrator. She/her. Freelances for Greenfield from Module 1; goes full time in Module 4 Lesson 1. Voice quirks: says "honestly" sparingly. Names her opinions. Signs off `Maya.`.

**Devon.** Staff engineer. He/him. Cheerful, slightly cynical. Delivers the gotchas. Recurring line type: short, dry, ends a long technical explanation with a one-line punchline.

**Priya.** Product manager. She/her. Owns the analytics seat. The one who notices traffic patterns first.

**Atlas.** Third-party reading assistant. It/it. Software, not a person. Built by a small Goodreads-style competitor (name TBD per spec Section 8). Quiet presence from Module 1 Lesson 5; full protagonist in Module 7.

**The apprentice (the reader).** They/them. Maya's apprentice in the diary frame. Modules 1 to 3 are Maya briefing them; from Module 4 Lesson 1 they have real assignments.

---

## Timeline

Story events in story-time order, cross-referenced to lesson slugs.

(empty — populated lesson by lesson)

---

## API entities

Canonical names, fields, sample payloads, error codes.

**Base URL.** `https://api.greenfield.lib/v1`

**Resources.** `/books`, `/branches`, `/borrowers`, `/loans`, `/holds`, `/events`

(full schemas populated as lessons introduce them; link entries here to the canonical OpenAPI spec at `assets/api/greenfield.yaml` once it exists)

---

## Locked details

Names and numbers that should not drift across lessons.

- Branch names: TBD (lock on first lesson that names a branch)
- Borrower names: `lina.varga` is the canonical sample borrower
- Sample book id format: `bk_184932`
- Sample branch format: `branch_north`
- Booktok creator handle: TBD (lock in Module 6 Lesson 1)
- Partner library names: TBD (lock in Module 3 Lesson 5)
- Atlas's owning company: TBD (lock in Module 1 Lesson 5)

---

## Open universe questions

- Atlas's name is provisional per spec Section 8.
```

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/greenfield-bible.md
git commit -m "docs(phase-2): greenfield bible skeleton"
```

---

## Task 10: Set up GA4 dashboard for the success bar (Gaurav)

**Files:** none in repo; operational.

The success bar (spec Section 4) needs a GA4 saved exploration that reports per-URL time on page, scroll depth past 75 percent, and bounce rate. The pilot's URL (`/whatisanapi.html`) is the first row to watch.

This task is for Gaurav. It does not block code work on Tasks 1-9 and 11; it must be done before measuring pilot success (~14 days post-merge).

- [ ] **Step 1: Confirm scroll-depth tracking is enabled in GA4**

In GA4 Admin → Data Streams → web stream → Enhanced measurement: confirm "Scrolls" is on. This is the default for GA4 properties created in the last few years. If off, toggle on.

- [ ] **Step 2: Create a saved exploration**

In GA4 → Explore → Free form. Configuration:
- Dimensions: Page path, Page title.
- Metrics: Average engagement time per active user, Bounce rate, Scrolled users (any 90-percent scroll event count). Note GA4 ships a "scrolled users" event but no built-in "75% scroll" — use the 90% threshold or set up a custom scroll event in GTM (defer to a follow-up).
- Filters: Page path contains `whatisanapi`.
- Date range: last 90 days (covers the legacy baseline pre-rewrite).

Save as: "Phase 2 pilot — whatisanapi engagement".

- [ ] **Step 3: Take a baseline snapshot**

Before the pilot merges, screenshot the saved exploration filtered to the last 30 days. Save the screenshot to `docs/superpowers/specs/retros/whatisanapi-baseline.png`. Note the three numbers (engagement time, bounce, scroll past 75 if available) in a one-line file at `docs/superpowers/specs/retros/whatisanapi-baseline.md`.

- [ ] **Step 4: Mark this task done in the plan**

When Steps 1-3 are complete, tick this task. Code tasks do not depend on it.

---

## Task 11: Verify giscus comment widget is wired

**Files:** verify only.

The spec promotes giscus to a Tier 1 prerequisite. The repo already contains `_includes/giscus.html`. This task confirms it renders on lesson pages.

- [ ] **Step 1: Check the include is referenced from the default layout or doc layout**

Run: `grep -rn 'giscus' _layouts/ _includes/header.html _includes/footer.html`
Expected: at least one site-layout file includes `giscus.html` on lesson pages.

If no inclusion exists, add to `_layouts/default.html` immediately above the `{% include prev-next.html %}` line:
```liquid
{% if page.collection == 'docs' or page.layout == 'doc' %}
  {% include giscus.html %}
{% endif %}
```

- [ ] **Step 2: Local visual check**

Run: `bundle exec jekyll serve --baseurl ''` and open `http://localhost:4000/whatisanapi.html`.
Expected: the giscus widget renders below the lesson body. (If the GitHub Discussions setup is incomplete, the widget shows a config error — flag for Gaurav.)

- [ ] **Step 3: Commit (only if Step 1 required adding the include)**

```bash
git add _layouts/default.html
git commit -m "feat(phase-2): wire giscus into lesson pages"
```

If no edit was needed, no commit. Tick the task and move on.

---

## Task 12: Rewrite the pilot lesson — Steps 1 and 2 of the spec author workflow

**Files:**
- Read: `_docs/whatisanAPI.md` (current legacy version)
- Read: `_data/modules.yml` (M1L2 slot)
- Read: `_data/modules.yml` (M1L1 slot — what is next-door)
- Plan artifact: scratch outline at top of `_docs/whatisanAPI.md` (HTML comment, removed before merge)

This task and the next four are the pilot rewrite. Each follows the workflow in spec Section 5.

- [ ] **Step 1: Read what is already there**

Open `_docs/whatisanAPI.md`. Scan the first 200 lines to understand:
- What the legacy lesson teaches (the "restaurant menu" metaphor — concept of API as an intermediary).
- What a 2026 reader needs that this misses (the agent angle, real Greenfield example, structured error responses, the why-it-matters-now framing).

Open `_data/modules.yml`. Confirm slot:
- M1L2 is `whatisanapi.html`, "What an API actually is".
- M1L1 is `howinternetworks.html`, "The internet, the short version" — still legacy, so the spec's "earliest-course carve-out" applies (Section 4: M1L1 and M1L2 stand on their own without a prior-event bridge).

- [ ] **Step 2: Write the three-sentence framing comment**

At the very top of `_docs/whatisanAPI.md` (above the frontmatter), insert an HTML comment:

```html
<!--
PILOT REWRITE NOTES (remove before merge).
Legacy lesson taught API via the restaurant-menu metaphor; it never showed a real API call.
2026 readers need: a real Greenfield request and response, the agent-as-caller framing, and a concrete reason to care today.
Diary opener hangs on: the developer-friend Tuesday-evening conversation at the Greenfield branch (no prior on-screen event because this is M1L2; spec carve-out applies).
-->
```

This artifact gets removed before merge (Task 16 Step 7).

- [ ] **Step 3: Plot the ten blocks before writing prose**

Add a second HTML comment below the framing comment with one line per block. Example shape — fill in each line with the actual planned content:

```html
<!--
OUTLINE (remove before merge).
Block 1 (diary opener): Tuesday evening at the branch. Devon's old friend Sam comes in, sees Maya updating index cards, says "you know you could expose this as an API". Maya's first reaction: half a joke, half wondering whether Sam is right.
Block 2 (today you will): three bullets. Concept (an API is a contract). Doc pattern (the one-page endpoint reference). AI co-pilot prompt (have Claude turn an interview into a draft endpoint reference).
Block 3 (what just happened): an API is a contract between two pieces of software. Defines who can ask what, what arrives back. Mermaid: simple sequence diagram of borrower app -> GET /books?q=thriller -> Greenfield -> 200 OK with a list. Defines: contract, request, response, status code (each as a glossary term on second appearance).
Block 4 (how we document it): the one-page endpoint reference. Method + path + auth + parameters + sample request + sample response + error responses. Show what Greenfield's GET /books reference will look like. Interactive SVG: toggle pattern that swaps a vague description ("returns books") with the documented contract (method, path, fields, sample) so the reader can see the difference.
Block 5 (try it on Greenfield): given the cURL for GET /books?q=thriller and a sample JSON response, sketch a one-paragraph reference for that endpoint. Five minutes.
Block 6 (the trap): the description that reads well in prose but is useless to a caller. Devon's gotcha: the difference between explaining an API and documenting one.
Block 7 (words you can drop in standups now): contract, endpoint, response shape, status code, agent.
Block 8 (AI co-pilot tip): ask Claude (or your assistant of choice) to read a transcript of an engineer describing an endpoint and produce a first-draft reference doc. Provide the prompt verbatim. Note what it gets right and where you still have to intervene.
Block 9 (before you go): one self-check question. "Look at the GET /books response in this lesson. If a caller wants to know whether 'thriller' is the only valid query string value, where in the reference would they look?"
Block 10 (next week at Greenfield, plus signoff): teaser for M1L3 (the lesson on what an API writer does in 2026). Signoff via include.
-->
```

- [ ] **Step 4: Commit the outline before writing prose**

```bash
git add _docs/whatisanAPI.md
git commit -m "wip(pilot): framing and ten-block outline for whatisanapi rewrite"
```

Committing the outline before drafting prose is the spec's discipline: if you cannot describe a block in one line, stop and re-think.

---

## Task 13: Draft blocks 3 and 4 — the substance

**Files:**
- Rename: `_docs/whatisanAPI.md` → `_docs/whatisanapi.md`
- Modify: `_docs/whatisanapi.md`

Spec Section 5 Step 3: draft blocks 3 and 4 first because they are the lesson's substance. The diary opener (block 1) is written second-to-last so the scene earns the lesson.

- [ ] **Step 0: Rename the source file to lowercase**

The current source file is `_docs/whatisanAPI.md` (capital API). The slug in `_data/modules.yml` is `whatisanapi.html` (lowercase) and the OG image lookup at `_includes/seo-optimization.html` line 29 is `/assets/images/og/{{ page.slug }}.png` (lowercase from frontmatter), while `scripts/generate-og.mjs` derives the OG filename from the source filename. Without a rename, the OG image path mismatches and the meta tag 404s.

On macOS APFS (case-insensitive, case-preserving), a one-shot `git mv whatisanAPI.md whatisanapi.md` is a no-op. Do it in two steps:

```bash
git mv _docs/whatisanAPI.md _docs/whatisanapi-tmp.md
git mv _docs/whatisanapi-tmp.md _docs/whatisanapi.md
git status   # confirm the rename was recorded
```

Verify: `ls _docs/whatisanapi.md _docs/whatisanAPI.md 2>&1` should show the lowercase file present and the capital file absent.

Commit the rename on its own so the history is readable:

```bash
git commit -m "chore(pilot): rename whatisanAPI.md to whatisanapi.md for slug consistency"
```

- [ ] **Step 1: Update the frontmatter to the canonical Phase 2 shape**

Replace the existing frontmatter block in `_docs/whatisanapi.md` with this exact content. All legacy frontmatter fields (`speakable`, `schema_markup`, `author_image`, `keywords`, `summary`, `last_modified_at`, etc.) are removed. The `previous_page` and `next_page` fields stay because `_includes/prev-next.html` reads them directly (it does not yet read from `_data/modules.yml`; that refactor is out of scope for this plan).

```yaml
---
title: What an API actually is
permalink: /whatisanapi.html
module: 1
lesson: 2
slug: whatisanapi
reading_time: 14
description: A first look at what an API is, written through a small library shipping its first endpoint. Concept, contract, and the one page reference doc that makes it usable.
previous_page:
  url: /howinternetworks.html
  title: The internet, the short version
next_page:
  url: /whatwritersdo.html
  title: What an API writer does in 2026
---
```

Note: with `slug: whatisanapi` set, the SEO include automatically points OG image meta to `/assets/images/og/whatisanapi.png`. The CI pipeline runs `scripts/generate-og.mjs` which now produces a matching `whatisanapi.png` because the source filename is `whatisanapi.md`. (Replacing the OG generator with a real `@vercel/og` renderer is on the post-pilot polish list in CLAUDE.md; not blocked here.)

- [ ] **Step 2: Insert all ten block markers (empty bodies) right after the frontmatter**

This is the skeleton the rest of the task fills in. Each block marker is invisible in the rendered output (`{% comment %}` strips at build time) but the linter uses it to verify all ten blocks are present.

About the ad-slot IDs: real AdSense slot IDs are numeric (created in Gaurav's AdSense dashboard at https://www.google.com/adsense). The pilot uses two placeholder numeric IDs that visually match the existing layout convention (`0987654321`, `1234567890`). Gaurav creates two new AdSense slot units named "lesson-mid-1" and "lesson-mid-2", retrieves their numeric IDs, and replaces the placeholders below before the PR merges. If the AdSense unit IDs are not yet available at PR time, leave the placeholder IDs and add a sentence in the PR description noting they will be swapped post merge.

Also note: this lesson page now carries four ad slots total — two from `_layouts/default.html` (the post-content slot at line 27 and the sidebar slot at line 34, both pre-Phase-2) plus the two new inline slots below. That is intentional and matches the spec's "two ad slots" wording for lesson Markdown specifically. If ad density feels too high after the pilot ships, the layout slots can be trimmed in a follow-up; do not pre-optimize.

```liquid
{% comment %}block:1{% endcomment %}

{% comment %}block:2{% endcomment %}

{% include ad-slot.html slot="2222222222" format="auto" %}

{% comment %}block:3{% endcomment %}

{% comment %}block:4{% endcomment %}

{% comment %}block:5{% endcomment %}

{% comment %}block:6{% endcomment %}

{% comment %}block:7{% endcomment %}

{% comment %}block:8{% endcomment %}

{% include ad-slot.html slot="3333333333" format="auto" %}

{% comment %}block:9{% endcomment %}

{% comment %}block:10{% endcomment %}

{% include signoff.html %}
```

Delete every other line of legacy content (including the inline `<script async src="...adsbygoogle..."/>` blocks the legacy lesson contains — those violate the "never paste AdSense markup inline" rule from CLAUDE.md). The outline HTML comments from Task 12 stay (they are removed in Task 16 Step 5 before merge).

- [ ] **Step 3: Draft block 3 (200 to 400 words plus the Mermaid)**

Replace the empty `{% comment %}block:3{% endcomment %}` section with prose that:
- Explains an API as a contract between two pieces of software in plain English.
- Defines `contract`, `request`, `response`, `status code` inline on first mention, then wraps later mentions in `{% include glossary-term.html term="..." %}`.
- Embeds one Mermaid sequence diagram via the Phase 2 pattern (under 10 nodes, under 12 edges).
- Includes one thought-checkpoint sentence near the end ("look at the diagram — which arrow is the response?").
- Uses the Greenfield base URL (`https://api.greenfield.lib/v1`) and the `/books` resource.

The Mermaid block uses the `capture` pattern from spec Section 6:

```liquid
{% capture mermaid_src %}
sequenceDiagram
  participant Borrower as Borrower app
  participant Greenfield
  Borrower->>Greenfield: GET /books?q=thriller
  Greenfield-->>Borrower: 200 OK and a list of books
{% endcapture %}
{% include mermaid.html content=mermaid_src alt="A borrower app sends a GET request to Greenfield and receives a 200 response with a list of books." %}
```

Word budget for the prose around the diagram: 200 to 400 words. Run `wc -w` on the block when done to confirm.

Voice constraints (from spec Section 3):
- No em dashes, en dashes, hyphens in prose.
- Plain-English teacher voice. Few contractions. No jokes (those go in blocks 1 or 5).
- Defines every term the first time it appears.
- Second person ("you") to the apprentice.

- [ ] **Step 4: Draft block 4 (400 to 700 words plus an interactive SVG placeholder)**

Replace the empty `{% comment %}block:4{% endcomment %}` with prose that:
- Shows the structure of a one-page endpoint reference: method, path, auth, parameters, sample request, sample response, error responses.
- Walks through what Greenfield's `GET /books` reference will look like, with the actual fields filled in.
- Includes the interactive SVG include with a placeholder `slug="whatisanapi"`. Build the actual SVG in Task 14.
- Names opinion as opinion when stating preferences ("I would always put the sample response above the error table").

The interactive SVG include:

```liquid
{% include interactive-svg.html slug="whatisanapi" alt="Two versions of the same endpoint description side by side. The vague version says 'returns books'. The documented version shows the method, path, parameters, sample request, and sample response. Click or press Enter to toggle between them." %}
```

Embed sample request and sample response inline as fenced code blocks (the spec allows code blocks; the linter skips backticked content):

```http
GET /books?q=thriller HTTP/1.1
Host: api.greenfield.lib
Authorization: Bearer $GF_TOKEN
```

```json
{
  "results": [
    { "id": "bk_184932", "title": "The quiet thriller", "available_branches": ["branch_north"] }
  ],
  "total": 1
}
```

Word budget for prose: 400 to 700 words.

- [ ] **Step 5: Build and visually check**

Run: `npm run build:css && bundle exec jekyll serve --baseurl ''`
Open: `http://localhost:4000/whatisanapi.html`

Expected: blocks 3 and 4 render; Mermaid renders the sequence diagram; the placeholder SVG renders. The other blocks are empty (just block markers); that is OK for this checkpoint.

- [ ] **Step 6: Commit**

```bash
git add _docs/whatisanapi.md
git commit -m "wip(pilot): draft blocks 3 and 4 — substance"
```

---

## Task 14: Build the pilot's interactive SVG

**Files:**
- Modify: `assets/svg/whatisanapi/main.svg`

The SVG visualizes the difference between a vague API description and a documented endpoint reference. Pattern: `toggle` (click flips between "vague" and "documented" panels). Constraints from spec Section 6: viewBox 800x500, max 30 KB raw, accessibility (keyboard nav, aria, color-not-only).

- [ ] **Step 1: Replace the placeholder SVG with the real one**

Overwrite `assets/svg/whatisanapi/main.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet" style="max-width:100%;height:auto;" data-svg-pattern="toggle" data-states="Vague,Documented" tabindex="0" role="switch" aria-checked="false" aria-label="Toggle between a vague API description and a documented endpoint reference">
  <title>Vague description versus documented reference</title>
  <desc>Two side-by-side panels. The left panel shows a vague description. The right panel, revealed after toggling, shows the documented reference with method, path, parameters, sample request, and sample response.</desc>

  <style>
    .panel { fill: #F2EFE8; stroke: #1B1B1B; stroke-width: 1.5; rx: 4; }
    .panel-title { font-family: Georgia, serif; font-size: 18px; fill: #1B1B1B; font-weight: bold; }
    .panel-body { font-family: 'SF Mono', Menlo, monospace; font-size: 13px; fill: #1B1B1B; }
    .panel-prose { font-family: Georgia, serif; font-size: 14px; fill: #1B1B1B; }
    .label-vague { fill: #B27744; }
    .label-doc { fill: #7C8C73; }
    .toggle-hint { font-family: Georgia, serif; font-size: 12px; fill: #1B1B1B; opacity: 0.65; }

    .panel-vague { opacity: 1; }
    .panel-doc { opacity: 0.15; }
    svg[data-state="Documented"] .panel-vague { opacity: 0.15; }
    svg[data-state="Documented"] .panel-doc { opacity: 1; }

    svg:focus { outline: none; }
    svg:focus-visible { outline: 2px solid #B27744; outline-offset: 4px; }
  </style>

  <rect x="0" y="0" width="800" height="500" fill="#FFFFFF" />

  <text x="400" y="30" text-anchor="middle" class="toggle-hint">Click the diagram or press Enter to toggle. Current state shown at the bottom.</text>

  <g class="panel-vague">
    <rect class="panel" x="40" y="60" width="720" height="380" />
    <text x="60" y="95" class="panel-title label-vague">A vague description</text>
    <text x="60" y="140" class="panel-prose">GET /books</text>
    <text x="60" y="170" class="panel-prose">Returns books from the catalog.</text>
    <text x="60" y="220" class="panel-prose" opacity="0.7">(That is the whole description.)</text>
    <text x="60" y="280" class="panel-prose" font-style="italic">A caller cannot tell:</text>
    <text x="80" y="310" class="panel-prose">- which query parameters are allowed</text>
    <text x="80" y="335" class="panel-prose">- what the response looks like</text>
    <text x="80" y="360" class="panel-prose">- which status codes can come back</text>
    <text x="80" y="385" class="panel-prose">- how to authenticate the call</text>
  </g>

  <g class="panel-doc">
    <rect class="panel" x="40" y="60" width="720" height="380" />
    <text x="60" y="95" class="panel-title label-doc">A documented endpoint reference</text>
    <text x="60" y="130" class="panel-body">GET /books?q={query}</text>
    <text x="60" y="155" class="panel-body">Authorization: Bearer $GF_TOKEN</text>
    <text x="60" y="195" class="panel-body" font-weight="bold">Parameters</text>
    <text x="60" y="218" class="panel-body">q  string  required  search term</text>
    <text x="60" y="258" class="panel-body" font-weight="bold">Sample response (200 OK)</text>
    <text x="60" y="281" class="panel-body">{ "results": [</text>
    <text x="60" y="301" class="panel-body">    { "id": "bk_184932",</text>
    <text x="60" y="321" class="panel-body">      "title": "The quiet thriller" } ],</text>
    <text x="60" y="341" class="panel-body">  "total": 1 }</text>
    <text x="60" y="385" class="panel-body" font-weight="bold">Errors: 401 unauthorized, 429 too many requests</text>
  </g>

  <text x="400" y="470" text-anchor="middle" class="panel-prose" font-weight="bold">Showing: <tspan class="toggle-label">Vague</tspan></text>
</svg>
```

- [ ] **Step 2: Verify weight**

Run: `wc -c assets/svg/whatisanapi/main.svg`
Expected: under 30000 bytes (the spec budget). The above is well under.

Run: `gzip -c assets/svg/whatisanapi/main.svg | wc -c`
Expected: under 10000 bytes (the spec budget).

- [ ] **Step 3: Visual smoke test in the browser**

Run: `bundle exec jekyll serve --baseurl ''`
Open: `http://localhost:4000/whatisanapi.html`

Expected:
- The SVG renders in block 4.
- Clicking the SVG toggles between the Vague and Documented panels.
- Pressing Enter while the SVG has keyboard focus also toggles.
- The bottom label updates: "Showing: Vague" → "Showing: Documented" → "Showing: Vague".
- Tabbing through the page lands focus on the SVG with a visible copper outline.

If any of these fail, fix the SVG or the framework (Task 4) before continuing.

- [ ] **Step 4: Accessibility spot-check**

In the browser dev tools, run an axe scan on the page. The SVG should have no critical issues. Confirm:
- The SVG has `role="switch"` and `aria-label` (set automatically by the framework).
- The `<title>` and `<desc>` elements are present.
- Color is not the only carrier of state: the panel-title and the bottom label both name the state.

- [ ] **Step 5: Commit**

```bash
git add assets/svg/whatisanapi/main.svg
git commit -m "feat(pilot): interactive SVG for vague-vs-documented toggle"
```

---

## Task 15: Draft blocks 5, 6, 1, 2, 7, 8, 9, 10 — in that order

**Files:**
- Modify: `_docs/whatisanapi.md`

Spec Section 5 Step 3 mandates this draft order: 3, 4, 5, 6, 1, 2, 7, 8, 9, 10. Blocks 3 and 4 are done; this task drafts the remaining eight in the prescribed order.

- [ ] **Step 1: Draft block 5 (100 to 200 words, "Try it on Greenfield")**

Replace the empty `{% comment %}block:5{% endcomment %}` with a callout containing a 5-minute exercise. Pattern from spec Section 7 Inventory B:

```liquid
{% capture exercise %}
**Five minutes, at your desk.** Take the request and response from the previous section. Open a doc tool of your choice. Write a one paragraph reference for `GET /books`. Cover: what it returns, what `q` does, what a `200` response looks like, what a `401` response means.

When you finish, ask yourself: could a caller make this request and read the response without asking you a question?
{% endcapture %}
{% include callout.html variant="exercise" body=exercise %}
```

Voice: imperative. No jokes.

- [ ] **Step 2: Draft block 6 (100 to 200 words, "The trap")**

Replace the empty `{% comment %}block:6{% endcomment %}` with a warning callout. Devon delivers the gotcha: the description that reads well in prose but is useless to a caller. The earned joke for the lesson can land here (or in block 1; pick one, not both).

Pattern:

```liquid
{% capture trap %}
The trap is the description that reads well in a blog post and falls apart the second someone tries to call the endpoint. "Returns books from the catalog" is a sentence a marketing site can publish. It is not documentation.

Devon's version, which he says approximately once a week: "If a caller reads it and still has to come find me, you wrote prose, not documentation." Fine. He is right.

The fix is concrete: every reference page answers four questions before it does anything else. What method and path. What goes in. What comes back on the happy path. What comes back when something is wrong.
{% endcapture %}
{% include callout.html variant="warning" body=trap %}
```

Voice: dry. Earned joke optional here.

- [ ] **Step 3: Draft block 1 (60 to 120 words, diary opener)**

Replace the empty `{% comment %}block:1{% endcomment %}` with the opening scene. The spec's M1L1/M1L2 carve-out means this opener stands alone (no prior-event bridge needed). Use the friend-Sam-visits-the-branch scene from the outline.

Word budget: 60 to 120 words. Voice: human, warm, contractions on. Names not roles. Specific sensory detail. Earned joke can land here (skip if it landed in block 6).

Example shape (rewrite in your own words; this is just to anchor):

```markdown
Tuesday evening at the branch. I was at the desk updating index cards for the new arrivals. Sam, an old friend of Devon's, came in returning a book and stayed to chat. He watched me for a minute. "You know you could just expose this as an API, right?"

I laughed. Then I stopped laughing, because Sam was looking at the cards the way an engineer looks at things that have been done by hand for too long.

This week, the index cards are still there. By next Tuesday, they will not be.
```

End with one sentence naming the apprentice's stake. Could be: "This lesson is for you on the day someone asks the same question about your project."

- [ ] **Step 4: Draft block 2 (30 words max, "Today you will leave with")**

Replace the empty `{% comment %}block:2{% endcomment %}` with three bullets. Plain language. Names concept, doc pattern, AI co-pilot prompt.

```markdown
**Today you will leave with:**

- A clear, one paragraph definition of what an API is, in plain English.
- The shape of a one page endpoint reference you can apply to any API.
- A prompt that turns an engineer's verbal description into a first draft reference doc.
```

Word count check: must be under 30 words in the bullet bodies (the bold header does not count).

- [ ] **Step 5: Draft block 7 (3 to 5 glossary terms, one sentence each on usage)**

Replace `{% comment %}block:7{% endcomment %}` with a short list. Each term is one sentence on how to use it in conversation, not a dictionary definition (the dictionary lives in the chip).

```markdown
**Words you can drop in a standup now:**

- {% include glossary-term.html term="contract" %}: Use this when you mean the rules both sides agreed to about what gets sent and what comes back. Stronger than "API" when you want to make the point that breaking it breaks callers.
- {% include glossary-term.html term="endpoint" %}: Use this when you mean a single URL plus method, not an entire API. "We are adding an endpoint" is precise. "We are adding an API" is usually not what you mean.
- {% include glossary-term.html term="response shape" %}: Use this when you mean the structure of the JSON body, not the status code. "The response shape is changing" is a heads up that callers will need to update.
- {% include glossary-term.html term="status code" %}: Use this when you want to be specific about what the server said. Saying "we got a 404" is more useful than "the call failed".
- {% include glossary-term.html term="agent" %}: Use this when the caller is a piece of software acting on behalf of a person, not a person directly. The distinction matters from this lesson forward.
```

Each term must exist in `_data/glossary.yml`. Step 6 adds the missing ones.

- [ ] **Step 6: Add missing glossary terms to `_data/glossary.yml`**

Run: `grep -nE 'term:' _data/glossary.yml | head -30` and confirm which of (contract, endpoint, response shape, status code, agent) are already present.

For each missing term, append a YAML entry following the existing shape:

```yaml
- term: "contract"
  definition: "The rules two pieces of software agreed to about a call. The caller sends a specific shape; the server sends a specific shape back. Breaking it breaks callers."
- term: "endpoint"
  definition: "One URL plus one method (like GET /books). An API is a collection of endpoints."
- term: "response shape"
  definition: "The structure of the data the server sends back, not the status code. A change to the shape can break callers even when the URL stays the same."
- term: "status code"
  definition: "The number the server returns with every response. 200 is fine. 4xx means the caller did something wrong. 5xx means the server did."
- term: "agent"
  definition: "A piece of software calling an API on behalf of a person. From 2024 onward, an increasing share of API traffic is from agents, not browsers."
```

Voice check on the definitions: no em dashes, no hyphens, under 30 words each.

- [ ] **Step 7: Draft block 8 (150 to 250 words, AI co-pilot tip)**

Replace `{% comment %}block:8{% endcomment %}`. Format from spec Section 2: situation, the prompt in a copy box, what to expect back, what to watch for. Rotate the assistant choice across the course; for the pilot, use Claude.

Copy the content below verbatim into the lesson (the outer tilde fence is just to disambiguate this plan; the lesson itself should contain a triple-backtick fenced block for the prompt):

~~~markdown
**Today's prompt for your AI assistant** (Claude, this time).

The situation. You have a 5 minute Slack message from an engineer describing a new endpoint, and you need a first draft of the reference page by tomorrow.

The prompt, exactly as written:

```text
I have a description of a new API endpoint from one of our engineers. Below is the transcript. Read it, then produce a first draft of the endpoint reference page covering: method and path, authentication, parameters (with types and whether they are required), a sample request, a sample 200 response, and the most likely error responses. Flag in a separate "Questions for the engineer" section anything you had to guess. Do not invent fields you cannot see in the transcript.

TRANSCRIPT:
[paste the engineer's description here]
```

What to expect back. A structured first draft. Often the method, path, and sample request are usable as is. Parameters and error responses are often partial; that is fine.

What to watch for. Claude will sometimes invent field names that sound plausible. The "questions for the engineer" section is the safety net. If that section is empty, the assistant probably guessed; ask it again with "be more conservative about what you assume".
~~~

Word budget: 150 to 250 words. Note: the prose says "usable as is" (no hyphen) per the voice rules; the legacy idiom "usable as-is" would fail the linter.

- [ ] **Step 8: Draft block 9 (one self-check, no answer key)**

Replace `{% comment %}block:9{% endcomment %}`:

```markdown
**Before you go.** Look back at the sample `GET /books` response in this lesson. If a caller wants to know whether `thriller` is the only valid value for `q`, where in the reference would they look? Answer it in your head before you read the next lesson.
```

- [ ] **Step 9: Draft block 10 (teaser plus signoff)**

Replace `{% comment %}block:10{% endcomment %}`:

```markdown
**Next week at Greenfield.** Sam comes back with a question that does not have an obvious answer: who, on staff, owns the docs once the API is real?
```

The `{% include signoff.html %}` already sits below; do not re-add.

- [ ] **Step 10: Update the Greenfield bible with the locked details this lesson introduced**

Per spec Section 7 ("The bible is updated in the same PR as the lesson that introduces new details"), open `docs/superpowers/greenfield-bible.md` and add the entries below. The pilot introduces these for the first time, so they get locked here and every later lesson uses the same names and shapes.

Under the **Timeline** section, append:

```markdown
## Module 1, Lesson 2. Sam suggests an API.
Story date: roughly week 1 at Greenfield.
Event: Sam, an old friend of Devon's, watches Maya update index cards and asks "you know you could expose this as an API, right?" The conversation plants the seed for the first tiny endpoint, which ships in Lesson 4.
Characters present: Maya, Sam (offstage Devon).
New API entities introduced: GET /books, q query parameter, 200 sample response with `results`, `total`.
New glossary terms introduced: contract, endpoint, response shape, status code, agent.
Quote: "You know you could expose this as an API, right?" (Sam, to Maya, Tuesday evening at the branch.)
```

Under **API entities**, add or expand the `/books` entry:

```markdown
### GET /books
Search the catalog.
- Query params: `q` (string, required) — search term.
- Auth: `Authorization: Bearer $GF_TOKEN`.
- 200 response shape: `{ "results": [ { "id": "bk_184932", "title": "...", "available_branches": ["branch_north"] } ], "total": <int> }`.
- Errors: 401, 429.
```

Under **Locked details**, lock Sam's name and role:

```markdown
- Sam: an old friend of Devon's. He/him. Engineer at another company. Appears in Module 1 Lesson 2 to suggest Greenfield exposes its catalog as an API. Recurring: tends to drop by the branch in person.
```

- [ ] **Step 11: Build and visually check**

Run: `npm run build:css && bundle exec jekyll serve --baseurl ''`
Open: `http://localhost:4000/whatisanapi.html`

Expected: all ten blocks render. Glossary terms show the dotted underline. Callouts (exercise, warning) render with the new labels and accent colors. Both ad slots render (or are silently skipped in dev — that is fine).

- [ ] **Step 12: Commit**

```bash
git add _docs/whatisanapi.md _data/glossary.yml docs/superpowers/greenfield-bible.md
git commit -m "feat(pilot): draft blocks 5, 6, 1, 2, 7, 8, 9, 10 + bible lock-in"
```

---

## Task 16: Voice pass and PR

**Files:**
- Modify: `_docs/whatisanapi.md` (fix any voice-check hits)
- Read: linter output

Spec Section 5 Step 5 plus Step 6: run the linter, fix every hit, read aloud, open the PR.

- [ ] **Step 1: Run the linter**

Run: `ruby scripts/voice-check.rb _docs/whatisanapi.md`
Expected: zero or more violations printed. Each line is `path:line [rule] matched`.

- [ ] **Step 2: Fix each violation**

For each hit:
- `[hyphen]` → rewrite to remove the hyphen (Section 3 rules: "agent friendly" → "schemas agents understand", etc.).
- `[em-dash]` or `[en-dash]` → period and new sentence, or colon, or rewrite.
- `[emoji]` → remove.
- `[ai-tell]` → rewrite. The banned list is in `scripts/voice-check.rb` constant `AI_TELL_PHRASES`.
- `[missing-frontmatter]` → add the missing field to the frontmatter.
- `[missing-block]` → add the missing `{% comment %}block:N{% endcomment %}` marker.
- `[missing-signoff]` → confirm `{% include signoff.html %}` is on its own line near the end.

Re-run the linter after each round of fixes until it exits 0.

- [ ] **Step 3: Reading-time check**

Run: `wc -w _docs/whatisanapi.md`
Compute: words / 150 + 3 (per spec Section 2). Expected: 12 to 18 minutes.

If the result is under 12, expand block 3 or block 4 (the substantive blocks). If over 18, tighten.

Update the `reading_time:` frontmatter field to match the computed value.

- [ ] **Step 4: Read the lesson out loud, end to end**

Open `http://localhost:4000/whatisanapi.html` in the browser. Read the entire lesson out loud at desk volume. Where you stumble, the sentence is wrong. Rewrite the stumble. Read it once more silently with the question: "would Maya actually write this?"

- [ ] **Step 5: Remove the outline HTML comments**

Delete both HTML comments inserted in Task 12 (the framing comment and the outline). They are scratch artifacts; the spec says they get removed before merge.

Confirm they are gone: `grep -c "PILOT REWRITE NOTES\|OUTLINE" _docs/whatisanapi.md` should return 0.

- [ ] **Step 6: Production-style build**

Run: `npm run build:css && bundle exec jekyll build`
Expected: exit 0 on both. No Liquid warnings about missing includes.

- [ ] **Step 7: Run the linter one more time on the cleaned file**

Run: `ruby scripts/voice-check.rb _docs/whatisanapi.md`
Expected: exit 0, no output.

- [ ] **Step 8: Create the branch and push**

Branch name per spec Section 5 Step 6: `rewrite/whatisanapi`.

```bash
git checkout -b rewrite/whatisanapi
git add _docs/whatisanapi.md
git commit -m "feat(pilot): voice pass and cleanup, ready for review"
git push -u origin rewrite/whatisanapi
```

- [ ] **Step 9: Open the PR**

```bash
gh pr create --title "Rewrite: What an API actually is (pilot)" --body "$(cat <<'EOF'
## Pilot lesson: Module 1 Lesson 2

This is the Phase 2 pilot. Spec: `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md`.

### Definition of Done checklist

**Structure**
- [ ] All ten template blocks present in order
- [ ] Reading time between 12 and 18 minutes
- [ ] One Mermaid diagram (under 10 nodes) in block 3
- [ ] One interactive SVG in block 4 (keyboard navigable, static fallback works)
- [ ] Three to five glossary terms linked via the include
- [ ] One self check in block 9 (no answer key)
- [ ] One earned joke in block 1 or block 5
- [ ] Signoff via `{% include signoff.html %}` at the bottom

**Voice**
- [ ] Zero hyphens in body prose
- [ ] Zero em dashes
- [ ] Zero en dashes
- [ ] Zero emoji
- [ ] Zero phrases from the AI tell ban list
- [ ] Voice linter exits 0

**Greenfield consistency**
- [ ] All code samples use `https://api.greenfield.lib/v1`
- [ ] Canonical resources used (`/books`, etc.)

**SEO and revenue**
- [ ] `permalink:` unchanged from legacy (`/whatisanapi.html`)
- [ ] Two inline ad slots present (between blocks 2/3 and 8/9)
- [ ] Meta description present, under 155 characters, no AI tells
- [ ] OG image generation runs in CI

**Accessibility**
- [ ] All headings sentence case (except H1), clean H2/H3 hierarchy
- [ ] Interactive SVG keyboard navigable, alt text matches visual
- [ ] Color not the only state carrier

**Technical**
- [ ] `bundle exec jekyll build` exits 0
- [ ] `npm run build:css` exits 0
- [ ] Voice linter passes in CI
- [ ] Frontmatter complete (title, permalink, module, lesson, slug, reading_time, description)
- [ ] No new glossary terms missing from `_data/glossary.yml`

### Notes

- This is the first Phase 2 lesson; it doubles as a stress test for the prerequisites in Section 7. Anything that surprised me will go in the retro.
- New glossary terms added in the same PR: contract, endpoint, response shape, status code, agent.
- No `redirect_from:` needed (permalink unchanged).
- Source file renamed from `whatisanAPI.md` to `whatisanapi.md` so the OG image filename matches `page.slug`. Two-commit history records the rename cleanly.

Generated with Claude Code.
EOF
)"
```

Note on the PR body: the spec's emoji ban is repo wide. The standard Claude Code PR footer (the robot emoji) is omitted here on purpose.

- [ ] **Step 10: Human review gate (Gaurav)**

Gaurav reads the lesson end-to-end at desktop and mobile breakpoints (per spec Section 4). Gaurav gives the earned joke a thumbs up or thumbs down. Thumbs down means rewrite the joke or cut it — not merge.

After approval, merge:
```bash
gh pr merge --merge
```

The GitHub Pages workflow will rebuild and deploy. The pilot is live within a few minutes.

---

## Task 17: Post-ship retro

**Files:**
- Create: `docs/superpowers/specs/retros/whatisanapi.md`

Spec Section 5 Step 7: 15 minutes the day after merge.

- [ ] **Step 1: Wait until the day after merge (or at least a few hours of GA4 data)**

- [ ] **Step 2: Write three notes**

Create `docs/superpowers/specs/retros/whatisanapi.md`:

```markdown
# Pilot retro — whatisanapi.html

**Merged.** [DATE]
**First 24-hour GA4 numbers.** Engagement time: [X] min. Bounce: [Y]%. Scroll past 75% (or proxy): [Z]%.

## What worked

- [3 sentences on what hit]

## What to change in the spec

- [3 sentences on spec changes the pilot surfaced; if none, write "Nothing"]

## What to change in the workflow

- [3 sentences on workflow tweaks; if none, write "Nothing"]
```

- [ ] **Step 3: If the retro names a spec change, bump the spec version**

Open `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md`. Append a changelog entry under Section "Changelog" (`v0.5. [date]. Pilot retro applied: [summary].`). Make the corresponding edits.

- [ ] **Step 4: Commit and merge the retro directly to master**

```bash
git checkout master
git pull
git add docs/superpowers/specs/retros/whatisanapi.md
[git add docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md if updated]
git commit -m "docs(retro): pilot whatisanapi retro and spec bump"
git push
```

The retro itself is not load-bearing; no PR needed unless the spec changed materially.

---

## Self-Review

I read the spec end-to-end again with the plan beside it. Coverage check:

**Spec Section 1 (Greenfield universe, cast, arc):** Covered indirectly. Greenfield bible skeleton (Task 9) stores the cast and the rule list. Task 15 Step 10 locks the first-lesson universe details (Sam, GET /books shape, first 5 glossary terms) into the bible in the pilot's PR.

**Spec Section 2 (ten-block template):** Covered by Tasks 13 and 15. Block markers added; word budgets enforced in the draft steps. The two inline ad slots (between blocks 2/3 and 8/9) are placed in Task 13 Step 2 with a note about real AdSense IDs.

**Spec Section 3 (voice rules, AI tell ban list):** Covered by Task 6 (linter). The ban list lives in `AI_TELL_PHRASES`. Linter test suite asserts em dash, hyphen, emoji, AI tells, missing signoff, missing block, missing frontmatter, plus the skip rules for backticks, Markdown link URLs, and Liquid include parameters.

**Spec Section 4 (rewrite order and DoD):** Pilot is Tasks 12-17. DoD checklist is in the PR template (Task 16 Step 9). Bounce-rate criterion lives in the spec; Task 10 sets up the GA4 dashboard. Frontmatter `module:`/`lesson:` reconciliation is in Task 13 Step 1. Source file renamed in Task 13 Step 0 so the OG image path matches `page.slug`.

**Spec Section 5 (per-lesson workflow):** Tasks 12-17 follow the seven steps. Outline-before-prose is enforced by committing the outline as a separate commit (Task 12 Step 4). Pre-merge gates (jekyll build, tailwind build, HTMLProofer, voice linter) all live in CI per Task 7.

**Spec Section 6 (visual production pipeline):** Mermaid theme = Task 3. Interactive SVG framework = Task 4. SVG include + Jekyll plugin = Task 5. The pilot's SVG = Task 14. Voice linter = Task 6. CI = Task 7 (now includes HTMLProofer).

**Spec Section 7 (inventories and prerequisites):** Tier 1 #1 (mermaid-init) = Task 3. #2 (interactive-svg include) = Task 5. #3 (interactive-svg.js) = Task 4. #4 (signoff include) = Task 1. #5 (callout exercise variant) = Task 2. #6 (voice-check.rb + .sh) = Task 6. #7 (CI workflow) = Task 7. #8 (greenfield-bible skeleton) = Task 9; Task 15 Step 10 adds the first locked entries. #9 (GA4 dashboard) = Task 10. #10 (giscus wiring) = Task 11. #11 (glossary sweep) = Task 8. All 11 covered.

**Spec Section 8 (open questions):** Out of scope by design. Newsletter, CMS, translations, Atlas naming, Maya avatar, OG template, bible publication — all deferred to post-pilot.

**Placeholder scan:** No "TBD", "TODO", or "fill in later" steps for code. The lesson prose tasks (Task 13, 15) give the writer specific structural briefs with word counts, names, examples, and Greenfield events — not freeform "write the lesson". The Greenfield bible skeleton (Task 9) intentionally leaves some "TBD" entries (Atlas's owning company name, branch names, etc.) because those are open universe questions per spec Section 8; they get locked as later lessons introduce them.

**Type consistency:** `signoff.html`, `interactive-svg.html`, `interactive-svg.js`, `mermaid-init.js`, `voice-check.rb`, `voice-check.sh`, `greenfield-bible.md`, `include_file.rb` — names are stable across all tasks. The framework patterns (`click-step`, `toggle`, `hover-tooltip`, `slider`) match between Task 4's implementation and Task 14's `data-svg-pattern="toggle"`. The callout variants (`tip`, `warning`, `recap`, `exercise`, `note`) match between Task 2's `callout.html`, Task 15 Steps 1 and 2, and the linter assumptions. Source filename `whatisanapi.md` (post-rename) is consistent across Tasks 13, 14, 15, 16, 17.

**Known soft spot:** The Tailwind safelist additions in Task 2 Step 2 assume the listed classes (`border-ink`, `text-copper`, etc.) compile when added to safelist. If Tailwind v3's safelist behavior in this repo's config is restrictive, the engineer may need to use the object form (`{ pattern: /^(border|text)-(ink|copper|sage)$/ }`) instead of bare strings. The task wording is permissive about this.

---

## Execution Handoff

**Plan complete and saved to `docs/superpowers/plans/2026-05-20-phase-2-pilot.md`. Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration. Best for this plan because tasks 1, 2, 3, 4, 5, 6, 7, 9 are independent and parallelizable.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints. Lower review overhead; slower because tasks run sequentially.

**Which approach?**
