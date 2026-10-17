# Retro: M2L2 Types of APIs

Shipped to master: 2026-05-31 (PR #15, merge commit `0f92fa4`).
Spec: `docs/superpowers/specs/2026-05-30-m2l2-typesofAPI-design.md` (v0.1).
Plan: `docs/superpowers/plans/2026-05-30-m2l2-typesofAPI-plan.md`.

Three notes max per parent spec.

## What worked

- **The Asha-counterfactual frame held the four shapes together as one argument, not four shape descriptions.** Block 3 walked SOAP → GraphQL → gRPC → REST through Asha's email transformed four ways; block 4's SVG made the same comparison spatial via the 4-cell whiteboard. The frame gave Maya somewhere concrete to land each shape ("if Greenfield had shipped X, Asha's email would have been Y") instead of describing shapes in the abstract, which kept block 3's prose from drifting into a textbook tour. The proof point: at draft time the words "first" / "next" / "last" appeared naturally as pacing words, never as list scaffolding. The 4-cell SVG with hover tooltips inherited the same frame and made it tappable: the same counterfactual lives in prose, in the SVG label, and in the hover content, so a reader can encounter it three ways.

## What to change in the spec

- **Treat hyphenated technology names (e.g. `grpc-web`) as identifiers from the first draft of any lesson-body passage; backtick them on first use in every block.** v0.1 of the M2L2 spec wrote `grpc-web` in plain prose three times (block 3 gRPC paragraph, block 8 watch-for line, SVG tooltip text). The voice linter caught the block 3 instance at implementation time and Task 5 went BLOCKED until the literal was backticked. The M1L1 retro flagged compound modifiers; the M2L2 case extends the same rule to identifiers with literal hyphens. Future per-lesson specs should backtick `grpc-web`, `HTTP/2`, `JWT-style`, `OAuth-2.0`, and similar identifiers on first use so the linter does not trip during execution.

## What to change in the workflow

- **The M2L1 retro's Task 7 batching pattern worked end to end and should become the default for every per-lesson plan.** M2L1 ran 7 separate verbatim-paste tasks (~30 minutes plus reviewer overhead). M2L2 batched 8 verbatim blocks into one Task 7 with one sub-commit per block (~3 minutes of subagent dispatch, 8 commits). The commit history is identical (one commit per block) but the controller overhead dropped from 21 reviewer dispatches to 0. Adopt this pattern for every per-lesson plan: Tasks 1-6 stay as separate tasks (skeleton, stubs, glossary, block 3 with Mermaid, block 4 with SVG include — these carry the substance and merit independent review); Tasks 7+ batch the verbatim-paste blocks into one task with sub-commits.
