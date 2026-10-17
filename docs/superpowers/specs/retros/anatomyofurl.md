# Retro: M2L3 Anatomy of a URL (part 1)

Shipped to master: 2026-05-31 (PR #16, merge commit `2606a74`).
Spec: `docs/superpowers/specs/2026-05-31-m2l3-anatomyofurl-design.md` (v0.1).
Plan: `docs/superpowers/plans/2026-05-31-m2l3-anatomyofurl-plan.md`.

Three notes max per parent spec.

## What worked

- **Grep-before-delete in Task 10 caught a cross-lesson dependency the spec missed.** M2L3's spec Section 3.3 listed `_data/url_faqs.yml` as an orphan-cleanup candidate alongside three others. Task 10's first step (`git grep` for remaining references before `git rm`) surfaced that `_docs/anatomyofurltwo.md` (the still-legacy M2L4) still uses `{% include faq-section.html data_file="url_faqs" %}`. The implementer removed the file from the delete list and shipped the cleanup with only two deletions. Without the grep step the merge would have broken the M2L4 page. The discipline (grep-before-delete on EVERY orphan candidate, not just the unfamiliar ones) is now load-bearing for any per-lesson cleanup that touches shared `_data/*.yml` or `_includes/*`.

## What to change in the spec

- **Section 3.3 legacy-cleanup candidates should be filtered via `git grep` during spec drafting, not just at execution time.** M2L3's spec listed `_data/url_faqs.yml` as a candidate without flagging M2L4's dependency on it; the spec should have caught this when drafted and either removed the file from the candidate list or flagged it explicitly as "kept until M2L4 ships." Future per-lesson specs whose Section 3.3 touches files inside `_data/`, `_includes/`, or shared assets should run `git grep` on each candidate during spec drafting and only list files that have zero remaining references. The grep should also explicitly check adjacent still-legacy lessons (the lesson immediately before AND after in the TOC), since those are the most likely cross-dependency surface.

## What to change in the workflow

- **Concentrate review effort on the final cross-cutting pass; lighten per-task review for verbatim-paste tasks.** M2L3's per-task spec reviews (haiku) caught no issues. The final cross-cutting code review (sonnet, dispatched once after all 13 tasks) caught the only real defect: `on_shelf=true` (equals) in Block 4's third counterfactual should have been `on_shelf:true` (colon) to keep the counterfactual's separator-grammar argument internally consistent. The per-task haiku spec reviewers were too granular to catch the cross-paragraph inconsistency; the sonnet final reviewer saw the whole counterfactual section together and caught it immediately. Future per-lesson plans should explicitly mark which tasks merit full two-stage review (substantive content tasks: block prose drafting, SVG construction) versus which get implementer self-report only (verbatim-paste, bible edits, orphan cleanup, verification). The final sonnet cross-cutting review before PR is non-negotiable.
