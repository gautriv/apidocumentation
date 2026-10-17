# Retro: M2L1 REST principles

Shipped to master: 2026-05-29 (PR #14, merge commit `a68da8f`).
Spec: `docs/superpowers/specs/2026-05-29-m2l1-restAPI-design.md` (v0.1).
Plan: `docs/superpowers/plans/2026-05-29-m2l1-restAPI-plan.md`.

Three notes max per parent spec.

## What worked

- **The conventions-first frame held end to end without principle drift.** The spec's choice to land four principles (uniform interface, resource orientation, cacheability, safety) through one debate (`GET /books` vs `POST /search`) made block 3 feel like an argument with four facets rather than a four-item textbook tour. The RFC tradition beat ("Steve Crocker, April 1969 → RFC 9110, 2022. The chain is unbroken.") earned its weight in two sentences and did not balloon into a history lesson. The proof point: at draft time I never reached for "in conclusion" or "to wrap up" because the next agreement was always the next concrete consequence, not a list item.

## What to change in the spec

- **Per-lesson spec "Working copy" sections should be written in lesson voice from the first draft, not in spec-doc voice.** v0.1 of the M2L1 spec had three lines I had to rewrite during the spec self-review pass because they had em dashes ("Maya shows three short bullets — what changes"), compound modifiers ("doc-page debt", "four-line audit"), or semicolons in lesson-body quoted text. The M1L5 retro already named this risk ("Spec metadata that mirrors lesson body voice should use lesson voice"); v0.1 of M2L1's spec still reverted to spec-doc voice in the working-copy passages. Future per-lesson specs should treat every passage inside a `Working copy` heading as if the linter would run on it directly.

## What to change in the workflow

- **The 18-task plan was over-decomposed for verbatim-paste tasks; future plans should batch blocks 5 through 10 into one task with sub-commits.** Tasks 7, 8, 9, 10, 11, 12, 13 each replaced one `<!-- TODO block:N -->` with verbatim content from the plan. Seven separate Edit + voice-check + jekyll-build + commit cycles ran for roughly 7 minutes of actual work. The hybrid execution from M1L5 already pointed at this; M2L1's plan didn't quite act on it. Future plans should have one task "Draft verbatim blocks 5, 6, 1, 2, 7, 8, 9, 10 (one commit per block)" with the seven block bodies embedded. Subagent or inline executor still does the same work; the plan reads cleaner and the commit history stays per-block.
