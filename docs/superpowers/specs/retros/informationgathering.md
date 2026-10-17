# Retro: M1L4 Information gathering and interviewing the codebase

Shipped to master: 2026-05-22 (PR #12, merge commit 24e35db).
Spec: `docs/superpowers/specs/2026-05-22-m1l4-informationgathering-design.md` (v0.4).
Plan: `docs/superpowers/plans/2026-05-22-m1l4-informationgathering-plan.md`.

Three notes max per parent spec.

## What worked

- **Iterative spec polishing (v0.1 → v0.4) caught real weaknesses that would have shipped.** Four passes surfaced: a missing stake in block 1, lecturing-not-self-implicating block 3 opening, three-landings-in-one block 4 close, the M1L3 callback opener, and the chip-not-in-glossary issue (`route handler` had no entry).
- **Stub-then-replace pattern for the SVG worked cleanly.** Liquid processes `{% include %}` inside HTML comments, so the planned "comment-out the include" workaround failed at Task 6 build time. The implementer pivoted to writing a one-rect placeholder SVG so the build passed, then Task 14 overwrote it with the real interactive map. Cleanly recoverable; the stub commit (07a0fbd) is just paired with the real SVG commit (e64704b). Worth preserving in future plans.
- **Risk 1 closed in the same PR.** The next-page 404 was projected as a known risk; the M1L5 stub creation at the end (commit 1461a4a) closed it for ~15 minutes of work. Cleaner PR than shipping with a known 404.

## What to change in the spec

- **Pre-flight check for glossary entries.** The v0.3 spec assumed `schema` and `OpenAPI` existed in `_data/glossary.yml` per the parent spec's "seed glossary" list. Reality: only 14 of the listed seed terms were in the file. Future per-lesson specs should grep the actual glossary file at draft time, not trust the seed list.
- **Word-count math at spec time should include code blocks AND Liquid captures.** The voice-check Ruby script strips code fences and Liquid before counting; using that count in the spec underestimated reading time by ~25%. Use `wc -w` against the whole post-frontmatter body for the spec's reading-time math. (The spec metric `wc -w / 150 + 3` already assumes the full body; the spec's word estimates were the problem, not the formula.)
- **HTMLProofer false-positives are site-wide, not lesson-specific.** Google Fonts, GTM, AdSense preconnect root URLs return 404 against bare-root probes on every page. Future lesson specs should not log these as risks. Consider adding `--ignore-urls` flags to the HTMLProofer command (in CLAUDE.md or a wrapper script) so the lesson author sees only real issues.

## What to change in the workflow

- **Subagent dispatch was expensive for verbatim-prose tasks.** Tasks 7-13 had the plan's exact text; inline Edits would have produced identical commits at a fraction of the token cost. The two-stage review (spec compliance + code quality) earns its keep only when the implementer has real interpretive room (Task 6 prose, Task 14 SVG, Task 2 glossary entries). For verbatim placeholder substitutions, inline is sufficient.
- **Even for inline tasks, code-quality-review-style introspection caught a regression.** Block 3's "doc-page fields" was changed to "reference fields" and "highest-leverage twenty minutes" to "most productive twenty minutes" by the implementer's voice fix. A spec compliance check restored the original intent. Worth running this check on every prose task, inline or dispatched.
- **Hitting the token rate limit mid-execution forced a workflow pivot.** When the spec-review subagent failed at Task 6, switching to inline Edits for Tasks 7-13 unblocked progress without quality loss. Future plans should designate which tasks NEED a fresh subagent context and which can be inline, ahead of time, so the rate-limit pivot is anticipated.
