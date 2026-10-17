# Retro: M1L5 Audiences: humans, devs, and agents

Shipped to master: 2026-05-28 (PR #13, merge commit `ca23d68`).
Spec: `docs/superpowers/specs/2026-05-28-m1l5-audiences-design.md` (v0.3).
Plan: `docs/superpowers/plans/2026-05-28-m1l5-audiences-plan.md`.

Three notes max per parent spec.

## What worked

- **Three self-review passes on the spec (v0.1 → v0.3) caught three real issues before any code landed.** v0.2 closed the Maya/Devon division-of-labour ambiguity (Section 1 said "Maya writes the changes; Devon pushes" while Section 5 risk 5 wanted the sharper "I write the description text. Devon adds it to the schema and pushes"). v0.3 closed the block 4 ordering contradiction (Section 1 read as subsections → SVG → close; Section 4 step 7 said close → SVG setup → SVG) and added "co-pilot" + "self-implicating" to the hyphen watchlist. None of these would have been visible in execution; they would have produced quietly inconsistent prose.
- **Hybrid execution (subagent for substance, inline for verbatim) matched the M1L4 retro guidance and was efficient.** Subagents on Tasks 1, 2, 5, 6 (setup, glossary, blocks 3 and 4); inline edits on Tasks 7-13 (block prose verbatim from plan), 14-17 (SVG stub, bible updates, glossary hand-grep), 18-20 (voice pass, build verify, HTMLProofer). The interpretive blocks got fresh context; the verbatim blocks did not waste tokens.
- **Reading M1L3's SVG at Task 15 (not at spec time) surfaced that the framework convention is whole-SVG-as-switch, not a segmented 2-button toggle.** Adapting at execution was fast (the SVG was rewritten inline in one pass) and the result was actually simpler than the spec's design. The mobile touch-target risk (Spec Section 5 risk 1) evaporated under the right convention.

## What to change in the spec

- **Pre-flight check for framework conventions when picking an SVG pattern.** v0.3 spec assumed an in-SVG segmented toggle with two button hit-targets and flagged a mobile risk. Reality: M1L3's `data-svg-pattern="toggle"` is whole-SVG-as-switch (`role="switch"`, `tabindex` on root SVG, CSS keyed off `svg[data-state="..."]`). Future per-lesson specs that reuse an SVG pattern should grep the matching prior SVG and the framework's `interactive-svg.js` BEFORE writing the SVG spec section, not at Task 15 execution time.
- **Frontmatter description with two colons needs explicit quoting guidance.** The spec showed `description: Your API doc page has three audiences: devs, agents, and humans...` unquoted and the file did not build until the Task 5 implementer quoted it. Future per-lesson specs should either quote any description value containing a colon mid-string, or recommend a colon-free phrasing. Add to the parent spec or to a per-lesson template note.
- **Spec metadata that mirrors lesson body voice should use lesson voice.** v0.1 spec block 8 header was "AI co-pilot tip" with hyphen; parent spec uses "AI co pilot" without hyphen. v0.3 fixed it, but the risk is recurring — every per-lesson spec's block 8 header is a candidate for cargo-culting the hyphen into the lesson body heading. Worth a one-line rule in the parent spec: spec text that the writer is likely to paste into the lesson body must follow lesson voice rules.

## What to change in the workflow

- **Bible edits in a single pass with the spec's 4-edit diff is high-velocity and error-prone in roughly equal measure.** Task 16 applied 4 separate Edit calls (Timeline append, GET /books extension, Locked details TBD removal + 8 append, Open universe question removal). The TBD removal also did the append for the 8 new entries via a single Edit (because the new entries replaced the TBD line in place), which scrambled the chronology — M1L5 entries landed in the middle of Locked details, not at the bottom near the existing M1L4 entries. Visible in `head` and `tail`; tolerable for now but worth fixing in a future bible cleanup. Future bible edits should sequence: remove stale → append at bottom (separate operations), not collapse them.
- **`gh` CLI auth state is not part of prerequisite verification.** Task 21 hit `gh auth login` not configured and could not create the PR programmatically. Branch was already pushed; PR creation fell to manual web flow. Future plans' Task 1 (prerequisite verification) should include `gh auth status` as a check — catches this before the last task instead of at it.
