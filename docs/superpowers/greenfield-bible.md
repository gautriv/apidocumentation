# The Greenfield Bible

Writer's reference for the Greenfield Library universe. Not part of the published course. Updated in the same PR as any lesson that introduces new details.

Source spec: `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md` Section 7.

---

## Cast

**Maya.** Senior technical writer. Narrator. She/her. Freelances for Greenfield from Module 1; goes full time in Module 4 Lesson 1. Voice quirks: says "honestly" sparingly. Names her opinions. Signs off `Maya.`.

**Devon.** Staff engineer. He/him. Cheerful, slightly cynical. Delivers the gotchas. Recurring line type: short, dry, ends a long technical explanation with a one-line punchline.

**Priya.** Product manager. She/her. Owns the analytics seat. The one who notices traffic patterns first. First on-screen in Module 1 Lesson 3, showing Maya the agent-traffic graph. Voice: analytics-flavored, observational, slightly wry. Less dry than Devon, more present than Maya.

**Atlas.** Third-party reading assistant. It/it. Software, not a person. Built by a small Goodreads-style competitor (name TBD per spec Section 8). Quiet presence from Module 1 Lesson 5; full protagonist in Module 7.

**The apprentice (the reader).** They/them. Maya's apprentice in the diary frame. Modules 1 to 3 are Maya briefing them; from Module 4 Lesson 1 they have real assignments.

---

## Timeline

Story events in story-time order, cross-referenced to lesson slugs.

## Module 1, Lesson 1. Devon refreshes the catalog.
Story date: the week before Sam's visit. Tuesday afternoon at the branch.
Event: Maya sits in the back office with Devon. He refreshes the staff catalog page; three books have been borrowed since lunch; the page already knows. The question "how did the page know" opens the course.
Characters present: Maya, Devon. Priya mentioned in Devon's offhand line.
New API entities introduced: none. Greenfield's API does not exist yet.
Web entities introduced: Greenfield public website at `greenfield.lib`. Catalog page at `/catalog`.
New glossary terms introduced: caller, server. (request, response, status code already exist from pilot work.)
Quote: "It used to be paper. I miss the paper. Don't tell Priya." (Devon, to Maya, back office, Tuesday afternoon.)

## Module 1, Lesson 2. Sam suggests an API.
Story date: roughly week 1 at Greenfield.
Event: Sam, an old friend of Devon's, watches Maya update index cards and asks "you know you could expose this as an API, right?" The conversation plants the seed for the first tiny endpoint, which ships in Lesson 4.
Characters present: Maya, Sam (offstage Devon).
New API entities introduced: GET /books, q query parameter, 200 sample response with `results`, `total`.
New glossary terms introduced: contract, endpoint, response shape, status code, agent.
Quote: "You know you could expose this as an API, right?" (Sam, to Maya, Tuesday evening at the branch.)

## Module 1, Lesson 3. Priya shows Maya the two graphs.
Story date: two to three days after Sam's visit, late in the same story week. Mid-week, mid-morning, the Greenfield conference room.
Event: Priya pulls Maya into the conference room and shows her two stacked traffic graphs for the public Greenfield website at `greenfield.lib`. One line for human traffic, one for agent traffic. The agent line is rising. The conversation establishes the two-reader frame that runs through the rest of Module 1 and into Module 7.
Characters present: Maya, Priya. Devon mentioned in Maya's recall of a prior conversation.
New API entities introduced: none. The lesson uses a mocked GET /books reference page as a teaching artifact; the real API is still upcoming.
Web entities introduced: agent traffic to the Greenfield public website is something the team watches. Two stacked graphs in Priya's analytics dashboard.
New glossary terms introduced: reader.
Quote: "Three weeks ago I would have called this a bot problem. Now it is a customer. I am of two minds about it." (Priya, to Maya, conference room, mid-morning. Seed draft; the lesson author may sharpen.)

## Module 1, Lesson 4. Maya reads the codebase while Devon is in standup.
Story date: Tuesday morning, story week 2. Five days after Priya's two-graphs conversation in M1L3 (M1L3 was late story week 1, around Thursday).
Event: Devon is finishing the new GET /books endpoint; it ships that afternoon at 4 PM. Before his 9:30 standup, he swivels his monitor toward Maya, points at the branch, the schema, and the tests, and tells her to dig in. He returns at ten. Maya has spent forty minutes reading code, tests, and the OpenAPI schema, and has pinned three sharp questions for him. The endpoint goes live at 4 PM. The first Greenfield API doc page is in draft by the end of the day.
Characters present: Maya, Devon. The apprentice (the reader) is the implicit second observer.
New API entities introduced: GET /v1/books with q (required, string) and limit (default 25, max 100). 400 response when q is missing. 200 response with results and total.
Web entities introduced: the Greenfield codebase, organized illustratively as routes/books.py, openapi.yaml at the repo root, tests/test_books.py. Illustrative file layout, not contractual.
New glossary terms introduced: source of truth, SME, schema, OpenAPI.
Quote: "The code is honest. People are kind." (Devon, originally said in the week after a postmortem at his previous job where the runbook had disagreed with the on-call's actual rollback steps. A PM asked why the doc had not been updated; Devon answered with the line, then changed the subject. Maya quotes it back in M1L4 block 6.)

## Module 1, Lesson 5. Mira walks in with a chatbot mistranslating call numbers.
Story date: Monday morning, story week 3. Five days after Devon shipped GET /v1/books on Tuesday afternoon of story week 2 (M1L4).
Event: Maya is at the branch on Monday morning, working at a small corner table. Mira, a borrower, walks up to the front desk and tells the librarian her chatbot said The Quiet Library is at 813.5; there is no shelf 813.5. The librarian walks Mira to fiction; Mira leaves with the book. Maya pulls up the doc page on her phone; the example response shows call_number: "813.5" with no description on the field. By 9:30 Priya pings Maya in Slack with the user agent breakdown for /v1/books, showing Marginalia Atlas/0.4 near the top. Maya names the three audiences (dev, agent, human) and lands three edits to the doc page: a schema description on call_number, a realistic example response with real Greenfield data, and a prose disambiguation paragraph below the example. Devon merges the schema change later that morning.
Characters present: Maya, Mira, the branch librarian (unnamed), Priya (via Slack), Atlas (offstage, identified via user agent string). Devon is named but offstage. The apprentice (the reader) is the implicit second observer.
New API entities introduced: call_number field added to the GET /v1/books response. Type string. Carries the Dewey decimal subject classification for the title. Sample value "813.5". Schema description added in the same week the lesson lands.
New glossary terms introduced: audience, description (as OpenAPI field), example response, user agent.
Quote: "On Tuesday I wrote for the dev. By Monday two other readers had shown up." (Maya, narrating block 3.)

## Module 2, Lesson 1. Asha asks for POST /search.
Story date: Tuesday morning, story week 4. Eight days after Mira walked into the branch (M1L5 was Monday of story week 3).
Event: Asha, a senior engineer at Marginalia, emailed Devon late Friday asking Greenfield to expose POST /search because Marginalia's internal stack expects to send a query in a JSON body. Tuesday morning Devon walks Maya through the polite-decline reply and the four agreements every HTTP verb makes. The lesson is the conventions debate, with the RFC tradition (RFC 1, April 1969 to RFC 9110, 2022) as the conceptual spine.
Characters present: Maya, Devon. Asha (offstage, via email). Atlas (offstage, the original reason Asha is writing).
New API entities introduced: none. Greenfield's GET /v1/books is the reference example; no new endpoints ship in this lesson.
New glossary terms introduced: REST, safe, cacheable, uniform interface.
Quote: "We are not building Algolia." (Devon, dry, said out loud while typing the reply, then deleted from the draft.)

## Module 2, Lesson 2. Devon whiteboards three other shapes.
Story date: Tuesday morning, story week 5. Seven days after M2L1's Tuesday morning Devon-at-desk scene; eleven days after Asha's email landed Friday evening of story week 3.
Event: Devon pinged Maya Friday evening asking her to come by Tuesday morning to whiteboard the three API shapes Greenfield could have shipped but did not (SOAP, GraphQL, gRPC). Maya finds him at the small whiteboard near his desk with four sketches up: REST plus the three alternatives. Under SOAP, Devon has written "1998" and below it "still in production at your bank." The lesson is the conventions debate widened: every shape is a set of commitments, and Greenfield's shape (REST) happens to fit a public catalog API for an open web. Apprentice stake: today, recognize the shape; this week, start the advanced filter assignment.
Characters present: Maya, Devon. Asha (offstage, referenced via M2L1 callback and via the counterfactual emails Devon imagines on the whiteboard).
New API entities introduced: none. Greenfield's GET /v1/books remains the running example.
New glossary terms introduced: SOAP, GraphQL, gRPC, request envelope.
Quote: "Last week was one argument. Today is three." (Devon, at the whiteboard, when Maya walks in.)

## Module 2, Lesson 3. Maya reviews Devon's advanced-filter PR.
Story date: Tuesday morning, story week 6. Seven days after M2L2's Tuesday-morning whiteboard scene; fourteen days after M2L1's Tuesday-morning Devon-at-desk scene; eighteen days after Asha's email landed Friday evening of story week 3. Maya did her standing Monday branch visit yesterday.
Event: Devon opened a PR Friday afternoon of story week 5 for Greenfield's new advanced-filter extension of GET /v1/books, adding three new query parameters: branch, shelf, on_shelf. The PR description was one line, terse and Devon-voiced. Tuesday morning Maya opens her laptop, finds the PR in her review queue, and reads the URL left to right while Devon is in standup. The lesson is the URL anatomy reading paired with the apprentice designing their own URL from the same requirements. Honors the advanced-filter writing assignment Devon flagged in M2L1 block 1, delivered in URL-design form; doc-page writing waits for Module 4.
Characters present: Maya (at her own laptop, not at Greenfield's office). Devon offstage (in his 9:30 standup, M1L4 callback). The apprentice (the reader) implicit second observer.
New API entities introduced: GET /v1/books extended with three new optional query parameters — branch (string, branch identifier), shelf (string, one of fiction/biography/reference/periodicals), on_shelf (boolean). Existing q (required) and limit (default 25, max 100) unchanged.
New glossary terms introduced: scheme, host, resource, query string.
Quote: "advanced filter, take 4. no POST. yes query string. yes branch_north not north. yes I read RFC 3986." (Devon, in the PR description, opened Friday afternoon of story week 5.)

---

## API entities

Canonical names, fields, sample payloads, error codes.

**Base URL.** `https://api.greenfield.lib/v1`

**Resources.** `/books`, `/branches`, `/borrowers`, `/loans`, `/holds`, `/events`

### GET /books
Search the catalog.
- Path: GET /v1/books
- Query params: q (string, required, search term). limit (integer, optional, default 25, max 100).
- Auth: Authorization: Bearer $GF_TOKEN.
- 200 response shape: { "results": [ { "id": "bk_184932", "title": "The Quiet Library", "available_branches": ["branch_north"], "call_number": "813.5" } ], "total": <int> }.
- Response field details:
  - id: string. Internal book identifier. Format bk_<numeric>.
  - title: string. The book's title as cataloged.
  - available_branches: array of strings. Branch identifiers where a copy is on shelf or available for hold.
  - call_number: string. Dewey decimal subject classification for the title. Not a shelf location. Branches shelve fiction alphabetically by author. Added story week 3 (M1L5); schema description added the same week.
- 400 response: when q is missing or empty. (Open question Maya pinned for Devon in M1L4: should this be 422? Resolution deferred to Module 4 errors lesson.)
- Other errors documented elsewhere: 401, 429 (from pilot M1L2 context).
- Source of truth for handler behavior: routes/books.py. Source of truth for response contract: openapi.yaml.
- Additional query parameters (added story week 6, M2L3 advanced-filter extension):
  - branch: string, optional. Branch identifier, e.g. branch_north. Filters results to books currently in the named branch's catalog.
  - shelf: string, optional. One of fiction, biography, reference, periodicals. Filters results to books cataloged on the named shelf.
  - on_shelf: boolean, optional. When true, filters results to books currently on shelf (not on loan, not on hold).
- Canonical advanced-filter URL: https://api.greenfield.lib/v1/books?q=mystery&branch=branch_north&shelf=fiction&on_shelf=true

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
- Mira: a Greenfield borrower. She/her. First on-screen in M1L5 as the human reader in the three-audience taxonomy. Walked into the branch Monday morning of story week 3 after a chatbot told her The Quiet Library was at 813.5. She gets the book; her morning does not come back.
- Marginalia: a small Goodreads-style competitor. Atlas is Marginalia's reading assistant product. Borrowers ask Atlas what to read next; Atlas calls Greenfield's API. Resolves the M1L5 lock previously held open as "Atlas's owning company: TBD".
- Atlas's user agent string: "Marginalia Atlas/0.4" (locked from M1L5). Updates in later lessons may bump the version number.
- The Quiet Library: canonical sample book title from M1L5 forward. The title on the M1L5 failure scenario. May reappear in code samples in later lessons that need a book title.
- Sample call_number value: "813.5" (Dewey decimal subject classification for American fiction). Used in example responses for GET /v1/books from M1L5 onward.
- Story week 3: opens with M1L5. Monday morning of story week 3 is Mira's complaint. First time a specific Greenfield borrower reports a specific agent failure on a specific endpoint.
- Greenfield's branch shelving convention: fiction shelved alphabetically by author surname, not by Dewey classification. The source of the call_number mistranslation pain. Greenfield is not a Dewey library in practice, even though it carries Dewey numbers in its catalog data.
- Maya visits the branch every Monday morning to check in with Devon. Locked from M1L5 forward. Establishes a recurring story-time anchor for Maya being onsite.
- Sam: an old friend of Devon's. He/him. Engineer at another company. Appears in Module 1 Lesson 2 to suggest Greenfield exposes its catalog as an API. Recurring: tends to drop by the branch in person.
- Greenfield public website: `greenfield.lib` (separate from the future `api.greenfield.lib/v1`). Catalog page at `/catalog`.
- Devon's recurring quirk: misses the paper card system, says so periodically.
- Story week 0: the Tuesday afternoon Devon refreshed the catalog (Lesson 1). Story week 1: Sam's visit (Lesson 2 pilot) early in the week, Priya's two-graphs conversation (Lesson 3) two or three days later.
- Greenfield watches agent traffic to the public website as a tracked signal. Lives in Priya's dashboard alongside the human-traffic graph; the two are stacked, not overlaid.
- Priya's first on-screen scene is in M1L3. Before that she is mentioned only in Devon's "Don't tell Priya" line in M1L1.
- Greenfield's first live API endpoint is GET /v1/books, shipped Tuesday afternoon of story week 2.
- GET /v1/books accepts q (required, string) and limit (default 25, max 100). Returns 400 if q is missing. (Unresolved as of M1L4: whether 400 should be 422; whether limit should appear in the OpenAPI schema. Both questions Maya pinned for Devon. Resolution deferred to Module 4 errors lesson.)
- Greenfield codebase file layout (illustrative, used in M1L4 lesson code samples): routes/books.py for the handler, openapi.yaml at the repo root for the schema, tests/test_books.py for tests. Not locked as the team's actual layout; later lessons may shorten or restructure, provided the four sources remain distinct.
- Devon's recurring line, canonical from M1L4 forward: "The code is honest. People are kind." First quoted in M1L4 block 6. May reappear when SME-vs-codebase tension surfaces in later lessons.
- Maya's gathering habit, canonical from M1L4 forward: read the code first, list three sharp questions, then book the SME. Cross-referenced from Module 4 onward when she trains the apprentice on the same habit.
- Asha. Senior engineer at Marginalia. She/her. First on-screen via her Friday email in M2L1. Voice: polite, terse, technically specific. Knows enough to ask for a JSON body. May reappear in later Marginalia-Greenfield exchanges (Module 7 likely).
- **The RFC tradition.** RFC 1 was Steve Crocker, April 1969. RFC 9110 (2022) is the current HTTP semantics spec Greenfield's server library follows. RFC 3986 (URI Generic Syntax, January 2005) is the canonical reference for URL anatomy and was added to the canon story week 6 (M2L3). When a lesson needs to invoke 'the URL spec' or 'the URI spec', cite RFC 3986. Three RFCs total in the Greenfield canon: RFC 1 (1969, origin), RFC 9110 (2022, HTTP semantics), RFC 3986 (2005, URI syntax). Either, several, or all three can be cited when a lesson needs to invoke the weight of the convention.
- Greenfield's advanced filter endpoint. Mentioned in M2L1 block 1 as next week's writing assignment for the apprentice. Locked here so later lessons can refer to it consistently. Final placement and shape decided in the lesson that ships it (likely M2L3 to M2L5).
- Marginalia's "ask for POST /search" pattern. Marginalia's internal stack expects JSON bodies and treats POST as the universal request shape. Locked because it explains why Marginalia keeps proposing POST endpoints. Resurfaces in M7 MCP discussions.
- **Greenfield's API shape: REST.** Implicit from M1L4 forward; locked explicitly here. M2L2 walks the three shapes Greenfield could have shipped (SOAP, GraphQL, gRPC) and names why REST's commitments fit a public catalog API for an open web. Future lessons referencing "Greenfield is REST" can cite this lock without re-deriving.
- **Devon's recurring image for an API claiming REST but shipping RPC.** "RPC in a REST jacket" and "RPC with a REST sticker on the box" — both forms locked from M2L2 forward. The "REST jacket" form is the canonical short version. May reappear when a non-Greenfield API surfaces in Module 4 (writing the docs) or Module 8 (capstone audit).
- **Whiteboard convention in Devon's workspace.** A small whiteboard near his desk, used for sketch-and-talk sessions. First on-screen in M2L2. Distinct from Priya's M1L3 venue (the conference room, where she shares analytics dashboards, not whiteboard sketches). May reappear when Devon walks Maya through a multi-part concept.
- **The four shapes Devon explicitly opined on.** REST, SOAP, GraphQL, gRPC. The "named-and-opined-on" set for the apprentice. WebSocket and the older RPC family (XML-RPC, JSON-RPC) are mentioned once each but are not Devon's canonical four. Locked because later lessons cross-referencing "the shapes Devon walked through" should not include WebSocket or RPC in that set.
- **Greenfield's shelf taxonomy.** The catalog classifies books across four shelves: `fiction`, `biography`, `reference`, `periodicals`. The `shelf=` query parameter on `GET /v1/books` (M2L3 advanced-filter extension) accepts one of these four values. Future code samples using shelf names pick from this set. Distinct from the physical aisle order — branches still shelve fiction alphabetically by author per M1L5; shelf taxonomy is the catalog's classification, not the aisle map.
- **Advanced-filter extension of `GET /v1/books`.** Three new optional query parameters shipped story week 6: `branch` (string, branch identifier), `shelf` (string, one of the four taxonomy values), `on_shelf` (boolean, `true` means currently on shelf). Designed and shipped by Devon (PR opened Friday afternoon of story week 5, reviewed by Maya Tuesday morning of week 6). Honors M2L1's "next week you write the docs for Greenfield's new advanced-filter endpoint" promise via URL design; doc-page writing waits for Module 4.
- **Devon's PR-description voice.** Terse, deadpan, slightly aggrieved, signals "I already thought about this so don't make me explain." Canonical from M2L3 forward. Pattern: lowercase, sentence fragments separated by periods, leading `yes`/`no` stack to preempt review questions. May reappear when Devon opens a PR in later lessons (likely Module 4 writing-the-docs and Module 8 capstone audit).

---

## Open universe questions

(No open universe questions outstanding as of M1L5 ship.)
