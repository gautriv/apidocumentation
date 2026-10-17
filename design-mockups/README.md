# Homepage mockups — pick a direction

Three standalone HTML files, each a single-page slice of the homepage in a distinct visual direction. Open them locally in a browser and compare side by side. No build step — they pull Tailwind via CDN.

```bash
open a-stripe.html
open b-linear.html
open c-vercel.html
```

Or serve the directory so all three are reachable in tabs:

```bash
cd design-mockups && python3 -m http.server 8000
# then visit http://localhost:8000/a-stripe.html etc.
```

All three contain the same content sections (hero, what's-inside, curriculum, sample/tools, CTA, footer) so the comparison is about **design**, not copy. Resize your browser 320 → 1440 to compare responsive behavior.

## The three directions

### A — Stripe-Editorial (`a-stripe.html`)
Editorial, content-first, generous whitespace. Cream background, deep navy ink, copper + sage accents. Serif display (Newsreader) for headings, Inter for body, JetBrains Mono for code. The hero card is an animated "OpenAPI ⇄ AI-generated prose" mockup. Curriculum reads like a table of contents in a paperback.
**Feels like:** Stripe Press, The Browser Company landing page, classic editorial sites.
**Best for:** Building authority. People believe the words more.

### B — Linear-Bold (`b-linear.html`)
Dark-mode first. Jet black, off-white text, electric lime accent. Inter, JetBrains Mono. The hero card is a streaming "Claude drafting an auth doc" terminal animation. Bento-grid features. Curriculum cards.
**Feels like:** Linear, Vercel's marketing pages, Cursor, Raycast.
**Best for:** Standing out in a screenshot, signaling "we're modern + technical." Highest "wow" on first impression.

### C — Vercel-Clean (`c-vercel.html`)
Light + dark auto via `prefers-color-scheme`. Centered hero with gradient text. Animated isometric request-response SVG. Three-up feature cards. Two-column curriculum list. Tools section directly integrates "Sponsored · Tools we recommend" — AdSense-friendly without looking like AdSense.
**Feels like:** Vercel, Resend, Linear-light, Geist.
**Best for:** Commercial neutrality. Easiest to port to Jekyll, easiest to monetize without friction.

## Comparison

| Criterion | A — Stripe-Editorial | B — Linear-Bold | C — Vercel-Clean |
|---|---|---|---|
| **Vibe** | Authoritative, literary | Technical, high-energy | Friendly, commercial |
| **Default theme** | Light (cream) | Dark | Auto (light + dark) |
| **Display type** | Serif (Newsreader) | Sans (Inter, heavy) | Sans (Inter) with gradient |
| **Accent color** | Copper + sage | Electric lime | System (neutral) |
| **Hero centerpiece** | Animated YAML → prose card | Streaming AI terminal | Isometric API diagram |
| **Ad-friendliness** | High — sponsored card reads as editorial endorsement | Medium — bold style risks ads looking jarring | Highest — "Recommended tools" pattern is native |
| **Dark-mode story** | Light-only (a dark variant is a follow-up) | Dark-only (a light variant is a follow-up) | Both, automatic |
| **Mobile feel** | Reads like a long-form article | Reads like a product page | Reads like a docs site |
| **Build cost to port to Jekyll** | Medium — needs Newsreader font + editorial layout rules | Medium — needs dark-first design tokens + bento components | Low — neutral primitives port cleanly |
| **AI-coursey vibe** | Subtle (in the morph card) | Loud (the whole thing is about AI) | Balanced |
| **Risk** | Could feel too literary for a technical course | Could feel like every other AI startup landing page | Could feel "safe" — less distinctive |
| **Recommended for** | Building a long-term brand around the writer | Maximum first-impression impact | Fastest path to launch + best ad CTR |

## How to decide

Ask: **"Six months from now, what do I want a new visitor's gut reaction to be?"**

- *"This person knows what they're doing — I'll read the whole thing."* → **A**
- *"Whoa, this is the AI era of API docs."* → **B**
- *"Okay this is clearly the best free course, let me start."* → **C**

A hybrid is also viable: e.g., **C's layout + A's typography + B's AI chat widget**. Once you pick a primary direction (or a hybrid recipe), Phase 1 of the modernization plan kicks in and we rebuild the Jekyll template against it.

## What's NOT in the mockups

These are intentionally out of scope for the visual comparison — they'd be added in Phase 1 on the real Jekyll site:

- Real navigation tree (sidebar with the 36 lessons)
- Actual search (Pagefind)
- The Cmd+K command palette
- "Ask the course" AI chat widget (floating button)
- The Scalar OpenAPI playground embed
- Reading progress bar + in-page TOC
- Real ad placements (we just show the *style* of how a sponsored slot would look)
- Cookie/CMP consent banner
- Service worker / PWA install prompt

If any of those need to be sketched visually before Phase 1, say so and I'll add them to the chosen mockup.
