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

## Module 1, Lesson 2. Sam suggests an API.
Story date: roughly week 1 at Greenfield.
Event: Sam, an old friend of Devon's, watches Maya update index cards and asks "you know you could expose this as an API, right?" The conversation plants the seed for the first tiny endpoint, which ships in Lesson 4.
Characters present: Maya, Sam (offstage Devon).
New API entities introduced: GET /books, q query parameter, 200 sample response with `results`, `total`.
New glossary terms introduced: contract, endpoint, response shape, status code, agent.
Quote: "You know you could expose this as an API, right?" (Sam, to Maya, Tuesday evening at the branch.)

---

## API entities

Canonical names, fields, sample payloads, error codes.

**Base URL.** `https://api.greenfield.lib/v1`

**Resources.** `/books`, `/branches`, `/borrowers`, `/loans`, `/holds`, `/events`

### GET /books
Search the catalog.
- Query params: `q` (string, required) — search term.
- Auth: `Authorization: Bearer $GF_TOKEN`.
- 200 response shape: `{ "results": [ { "id": "bk_184932", "title": "...", "available_branches": ["branch_north"] } ], "total": <int> }`.
- Errors: 401, 429.

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
- Sam: an old friend of Devon's. He/him. Engineer at another company. Appears in Module 1 Lesson 2 to suggest Greenfield exposes its catalog as an API. Recurring: tends to drop by the branch in person.

---

## Open universe questions

- Atlas's name is provisional per spec Section 8.
