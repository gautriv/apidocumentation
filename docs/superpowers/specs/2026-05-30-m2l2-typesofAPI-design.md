# M2L2. Types of APIs. Design.

**Status.** v0.1. Drafted from brainstorm 2026-05-30. Ready for spec self-review and user review before plan handoff.
**Owner.** Gaurav Trivedi.
**Author of this spec.** Claude (drafting), Gaurav (decisions).
**Last updated.** 2026-05-30.

Per-lesson design spec for Module 2 Lesson 2, the Types-of-APIs rewrite. Source file: `_docs/typesofAPI.md`. Permalink (preserved): `/typesofAPI.html`. This spec sits under the parent Phase 2 spec at `docs/superpowers/specs/2026-05-19-phase-2-content-rewrite-design.md`; everything in the parent spec applies unless explicitly overridden below.

---

## Section 1. What this lesson is.

**Position.** Module 2 Lesson 2. Second lesson of Module 2 (REST, HTTP, and the dance), 8 lessons in the final TOC. Story-week 5. Seven calendar days after M2L1's Tuesday-morning scene at Devon's desk; eleven days after Asha's email landed Friday evening of story-week 3. Reading time target 13 minutes (target window 12-18 per parent spec).

**Source legacy lesson.** `_docs/typesofAPI.md`. Legacy title "Types of APIs - A Complete Overview"; new title **"Types of APIs"** per the TOC spec and `_data/modules.yml`. Permalink `/typesofAPI.html`, preserved; no `redirect_from` needed. The legacy lesson opens with a six-category taxonomy (web-service, library, class-based, OS, object-remoting, hardware APIs), then runs a seven-item web-service tour (REST, SOAP, GraphQL, WebSocket, JSON-RPC, XML-RPC, gRPC) with a card grid, a tab demo for GraphQL vs REST, a quiz, and an FAQ. The rewrite **drops five of the six legacy categories**: library, class-based, OS, object-remoting, and hardware APIs. A working API writer in 2026 documents web-service APIs; the rest is trivia and goes. The web-service tour also contracts from seven items to four: REST, SOAP, GraphQL, gRPC. XML-RPC and JSON-RPC are predecessors of the family gRPC modernized; WebSocket is a connection model and belongs to M6L2.

**What the 2026 reader needs that the legacy version misses.** The legacy lesson is a reference card grid. It does not name what each shape *commits to* — what the choice of shape obligates the server, the client, the cache, and the doc page to do. It treats GraphQL and gRPC and SOAP as menu items, not as architectural decisions the doc writer has to live with. It also reads as if shape did not matter: no Greenfield, no character with an opinion. The Greenfield rewrite reframes types-of-APIs as four contracts an API picks one of, taught through what Asha's email from M2L1 would have looked like in each.

**Teaching frame.** **Every shape is a set of commitments.** Direct parallel to M2L1's "every verb is an agreement." Four shapes get treatment: REST (the Greenfield baseline, already lived through in M2L1) plus the three Devon names: **SOAP, GraphQL, gRPC**. WebSocket and the broader RPC family each get one short reference, not a full treatment (WebSocket is M6L2's job; RPC is the family gRPC came from).

**What the apprentice leaves knowing.** Three things. One: how to recognize each of the four shapes by its request envelope, the way an aircraft spotter recognizes silhouettes. Two: what each shape commits to in one sentence, expressed as the consequence for cache, schema, and the doc page. Three: what the docs' first page owes the reader once you know which shape you ship. Block 2 crystallizes these as the three bullets; blocks 3 and 4 deliver them.

**The conceptual spine.** **The Asha counterfactual.** Last week Asha asked Greenfield for `POST /search`. This week Devon shows what Asha's email would have looked like if Greenfield had shipped SOAP, GraphQL, or gRPC instead of REST. The three counterfactual exchanges are how the apprentice feels what each shape commits to. Devon's whiteboard is where the counterfactuals live in the scene; the block-4 SVG is the stylized version of the whiteboard. Visual specifics in Section 3.

**The story trigger.** Devon initiates, as M2L1's block 10 promised. Maya walks into the office Tuesday morning, story-week 5. Devon is at the small whiteboard near his desk. He stepped back when she walked in. Four sketches across the board, one per shape, labeled REST, SOAP, GraphQL, gRPC. Those four labels are the same four labels the block-4 SVG carries; the whiteboard and the SVG are the same object. Devon turns. The framing line lives in his mouth: "Last week was one argument. Today is three." The earned-joke beat lives in the way he labels SOAP on the whiteboard. Working construction in Section 4.4.

**The apprentice stake.** Today the apprentice's job is to be able to name the shape. Not write the docs yet; recognize the shape, say what it commits to. The advanced-filter writing assignment Devon flagged in M2L1 block 1 is on the apprentice's desk this week but it does not get written this week — it gets written in M2L3 once URL anatomy is on the table. M2L2's stake is what a 2026 reader needs first: before you read any doc page, you need to know which shape you are reading.

**Cross-module bridge.** Opener picks up M2L1's closing teaser ("three other API shapes Greenfield could have shipped, and he has opinions about all three"). Closer hands off to M2L3 (Anatomy of a URL part 1): *"Next week we open the URL the catalog actually ships under and read it left to right. Devon has feelings about every part of it."* **Pickup obligation for M2L3 (flagged for the next session writing M2L3's spec):** advanced-filter is on the apprentice's desk story-week 6 and M2L3 has to deliver the writing assignment; URL anatomy is the working substrate. If M2L3 instead defers to M2L4, M2L3's bridge has to keep advanced-filter visible so the apprentice's M2L1 promise does not go missing.

**Scope perimeter.** This lesson does not teach URL anatomy (M2L3, M2L4), response shapes (M2L5), pagination, idempotency, or rate-limit semantics (M2L6), cURL flags (M2L7), or auth (M2L8). It does not teach GraphQL or gRPC in working depth (M6L3, M6L4). It does not teach WebSocket (M6L2). It teaches the four shapes as four contracts, what each commits to, and the documentation consequence of the choice. **Introduces no new Greenfield API entities**; the four-shape comparison runs against the existing `GET /v1/books` baseline locked in M1L4, M1L5, M2L1.

---

## Section 2. The ten-block outline.

**Naming.** Block numbers follow parent spec Section 2. Same convention M2L1 used. Each block in the published lesson is preceded by `{% comment %}block:N{% endcomment %}` for grep-ability and reviewer navigation.

### Block 1. Diary opener (60-120w, soft cap; M2L1 published at 159w).

**H2.** `## Three other shapes` — echoes Devon's framing line and M2L1's closing bridge.

**Scene.** Tuesday morning of story-week 5. Devon pinged Maya Friday: come by Tuesday to whiteboard the alternatives. Maya finds him at the small whiteboard near his desk; four sketches are already up.

**Earned-joke construction.** Under Devon's SOAP sketch he has written "1998" and below it "still in production at your bank." Dry, true, Devon-voiced, lands without SOAP foreknowledge because the punchline carries on its own ("at your bank" is universal). M2L1's joke was the deleted "We are not building Algolia"; this one matches that texture — Devon's natural cynicism, diegetic on the whiteboard rather than narrated. Needs human laugh-test before merge (parent DoD).

**Apprentice stake.** Honors M2L1's promise without delivering on it (advanced-filter writing is M2L3's job). Today's stake is recognition: know which shape you are reading before you write a single word for it.

**Working copy** (lesson voice, present-tense, M2L1-aligned):

> ## Three other shapes
>
> Tuesday morning of story week 5. Devon pinged me Friday. *Come by Tuesday morning, I want to whiteboard three shapes we passed on.* I find him at the small whiteboard near his desk. Four sketches up: REST, SOAP, GraphQL, gRPC. Under SOAP he has written "1998" and below that, "still in production at your bank."
>
> He turns. "Last week was one argument. Today is three."
>
> Last week Asha wanted `POST /search` and Devon walked me through the verb. This morning he wants to show me the three shapes Greenfield could have shipped instead. Today you need to know which shape Greenfield is, because you start the advanced filter assignment this week, and a word on the doc page only means what it means once you know the shape.

Word count: ~126. Within the soft cap.

### Block 2. Today you will leave with (≤30w).

**H2.** `## Today you will leave with` (M2L1 convention, used verbatim).

**Working copy:**

> ## Today you will leave with
>
> - How to recognize four API shapes by their request envelopes.
> - What each shape commits to in one sentence.
> - What the docs' first page owes the reader, shape by shape.

Followed by `{% include ad-slot.html slot="lesson-mid-1" format="auto" %}`.

Word count: ~28. Under cap.

### Block 3. Every shape is a set of commitments (200-400w + Mermaid).

**H2.** `## Every shape is a set of commitments` — parallel to M2L1's `## Every verb is an agreement`.

**Structure.** Walk SOAP, GraphQL, gRPC in that order (matches the whiteboard layout Devon sketches left to right; Greenfield's REST anchors at the end). Each shape gets: one sentence on what it is, two to three sentences on what it commits to (including a cache mention for parallel rhythm), one sentence on the Asha counterfactual. Then a short WebSocket and RPC coda. Then REST as the closer. Then thought-checkpoint sentence pointing at the diagram with the literal GraphQL query in backticks (the Mermaid Note no longer carries it; see Section 3.1).

**Glossary wraps in this block.** SOAP, GraphQL, gRPC, REST — each on first definitional use in body prose.

**Ordering note (block 3 vs block 4).** Block 3 walks SOAP first because that is the left edge of Devon's whiteboard and the most-different shape; REST anchors the closer. Block 4 walks REST first because the lesson's POV moves into Greenfield's actual first page; SOAP closes block 4 as the final alternative. The orders differ intentionally and should not be normalized to one order during drafting.

**Working copy** (lesson voice, linter-clean):

> ## Every shape is a set of commitments
>
> Every shape is a set of commitments. An API picks one. Each shape commits the server, the client, the cache, and the doc page to a particular way of working. The shape is the contract.
>
> Take {% include glossary-term.html term="SOAP" %} first. SOAP is XML in an envelope. Each call sends an envelope with a header and a body. The SOAPAction header tells the server which operation to run. The contract is a WSDL file. The cache stays out of it (every call is a POST to one URL). If Greenfield had shipped SOAP, Asha's email would have been "send us the WSDL" and Marginalia would have generated a client from it.
>
> {% include glossary-term.html term="GraphQL" %} next. GraphQL is one endpoint, usually `POST /graphql`, with the query in the body. The contract is the schema. The cache stays out of it by default (every call is a POST). If Greenfield had shipped GraphQL, Asha would have asked for the schema and her code would have written a query for the fields she needed.
>
> {% include glossary-term.html term="gRPC" %} last. gRPC is binary over HTTP/2. The contract is a `.proto` file and the wire format is Protocol Buffers. The client is generated from the proto. The cost is HTTP/2 support all the way down: browsers without grpc-web cannot talk to it, proxies that do not speak HTTP/2 drop the connection, and the cache cannot read it. If Greenfield had shipped gRPC, Asha would have asked for the proto file and Marginalia would have built the generated client into the Atlas service.
>
> Two shapes Devon does not sketch this morning. WebSocket is a connection model, not a request shape, and gets its own lesson in Module 6. The older RPC family that gRPC modernized is more concept than working choice today.
>
> {% include glossary-term.html term="REST" %} is the shape Greenfield ships. REST commits to HTTP verbs, URLs, and a body that is usually JSON. The cache holds GETs by default. The schema is optional. Greenfield ships OpenAPI alongside. REST's commitments happen to fit a public catalog API for an open web. That is why Greenfield is REST.
>
> [Mermaid here]
>
> Look at the diagram. GraphQL puts the question in the body. The body carries `query { books(q: "mystery") { title } }`. One endpoint, one POST, the query says what to do. The cache stays out of it.

Word count: ~395. In window 200-400.

**Mermaid source** (2 participants, 3 messages, 2 notes; under cap; Note text simplified to avoid parser ambiguity with braces and quotes):

```liquid
{% capture mermaid_src %}
sequenceDiagram
  participant Atlas
  participant API as Greenfield GraphQL
  Atlas->>API: POST /graphql
  Note over Atlas,API: Body carries a GraphQL query
  API-->>Atlas: 200 with data matching the query
  Note over API: One URL for everything. The query in the body says what to do.
{% endcapture %}
{% include mermaid.html content=mermaid_src alt="A sequence diagram. Atlas calls POST /graphql on Greenfield's GraphQL server. The request body carries a GraphQL query that asks for books matching mystery and asks for their title field. The server returns a 200 response with the data shaped to match the query. The diagram annotates that GraphQL uses one endpoint for everything and the query in the body says what to do. The cache is not depicted because by default it sits outside the call path." %}
```

### Block 4. Name the shape on page one (400-700w + interactive SVG).

**H2.** `## Name the shape on page one` — matches M2L1's imperative pattern (`## Put the promise first`).

**Structure.** Opens with the doc pattern: every API doc's first page first sentence names the shape. Then "the shape decides what the first page owes" with one-sentence-per-shape owing lists (REST, GraphQL, gRPC, SOAP). Then a concrete Greenfield REST first-page example with a curl. SVG lead-in. Closing recognition-pattern paragraph.

**"Owing list" is a Maya coinage.** Used twice intentionally in this block. Drafter should not normalize it away to "obligation list" or "what the shape owes."

**SVG visual hierarchy.** REST cell distinct from the three counterfactual cells via copper 2px border + "the actual" pill badge upper-right. Three alternatives use 1px sage border. Detail in Section 3.2.

**Working copy** (lesson voice, linter-clean):

> ## Name the shape on page one
>
> Every API doc has a first page. Its first sentence tells the reader what shape they are reading. Greenfield's reads "Greenfield is a REST API." Three words. Every reader after that sentence knows what to expect: a list of resources, HTTP verbs, JSON, and a cache that holds GETs.
>
> The shape decides what the first page owes the reader.
>
> A REST doc owes a resource list with verbs and paths, a base URL, an auth section, and one sample per resource that shows a successful call. A GraphQL doc owes a schema overview, a list of queries and mutations at the top level, and a playground link so the reader can run a query without writing code. A gRPC doc owes the proto file, the service list, and a code sample per supported language because the client is generated, not written. A SOAP doc owes the WSDL URL, an envelope template, and a list of operations the WSDL declares.
>
> Greenfield's first page does the REST owing list. It opens with "Greenfield is a REST API," lists the six resources, and shows one `GET` example with a JSON response:
>
> ```bash
> $ curl -H "Authorization: Bearer $GF_TOKEN" \
>        "https://api.greenfield.lib/v1/books?q=mystery"
> ```
>
> The page does the recognition work so the reader does not have to do it.
>
> Devon's whiteboard appears below as a diagram. Four shapes, four request envelopes, one cell per shape. The REST cell is the actual shape Greenfield ships. The other three are counterfactual. Hover or tap a shape to read what Asha's email to Greenfield would have looked like in that shape. The hover text is the same content as the prose above, expressed as a short counterfactual. The prose and the hover are interchangeable.
>
> [interactive-svg here]
>
> The recognition pattern is small. Read the first sentence of the docs. Look at the request envelope of one endpoint. You have placed the API. Once you have placed it, every subsequent decision (which page to write, which sample to ship, which header to call out) follows the shape's owing list.

Word count: ~450. In window 400-700.

**Interactive SVG include:**

```liquid
{% include interactive-svg.html slug="typesofAPI" alt="Devon's whiteboard rendered as a four cell grid. In the top left, REST shows the request line GET /v1/books?q=mystery, with a small badge in the upper right reading the actual to mark it as the shape Greenfield ships. In the top right, SOAP shows the same query wrapped in an XML envelope with a SOAPAction header. In the bottom left, GraphQL shows POST /graphql with a body containing a query for books filtered by mystery, returning the title field. In the bottom right, gRPC shows SearchBooks called with the argument mystery, with a note that the call is binary over HTTP/2. Each cell has a label and a hover region. Hovering or tapping a cell reveals the counterfactual Asha email for that shape and what Greenfield's reply would owe back. Without hovering, the four request envelopes are all visible side by side." %}
```

Visual specifics (cell layout, hover-tooltip content per cell, the REST-as-actual emphasis, colors, focus, performance budget) in Section 3.

### Block 5. Try it on Greenfield (100-200w, 5-min task).

Rendered as `{% include callout.html variant="exercise" body=exercise_body %}` (parent-spec Phase 2 prerequisite). The exercise sends the apprentice to public docs (not Greenfield, because the apprentice already knows Greenfield is REST) and asks them to apply the recognition pattern to three real shapes. Three fixed URLs cover REST, GraphQL, gRPC; SOAP gets a coda that teaches a real point about where SOAP lives.

**Working copy** (lesson voice, linter-clean):

> Open three public API doc home pages: Stripe at `stripe.com/docs/api`, GitHub's GraphQL API at `docs.github.com/graphql`, and gRPC's quickstart at `grpc.io/docs/what-is-grpc`. For each, find the first sentence or heading. Name the shape. Then pick one thing the page does because of the shape: a playground, a schema overview, a resource list with verbs, or a `.proto` reference. Write three lines per page: shape, evidence, one consequence.
>
> Skipped SOAP on purpose. Most SOAP lives behind enterprise firewalls. If you can find a public SOAP doc home page in under a minute, the WSDL pointer is what you are looking for.

Word count: ~135. In window.

### Block 6. The trap (100-200w).

Rendered as `{% include callout.html variant="warning" body=trap_body %}`. Devon-voiced. The trap targets the most common 2026 recognition failure: APIs that claim REST but ship RPC over HTTP. This sets up a "look at the URLs, not the marketing" rule the apprentice will need for advanced-filter writing in M2L3.

**Working copy** (lesson voice, linter-clean, Devon-voiced):

> Plenty of APIs say they are REST. Many are not. They use HTTP, they return JSON, they have URLs. They also have `POST /users/123/activate`, `POST /products/find`, `GET /api/v1/get_user?id=123`. That is RPC underneath, with a REST sticker on the box.
>
> Devon's check: read the URL pattern of three random endpoints. If the URLs name actions (`/activate`, `/find`, `/get_user`), the API is RPC in a REST jacket. The doc owes the reader an operation list, not a resource list. Pretending the API is REST when it is not makes the doc lie about what every call commits to.
>
> The shape is what the API does, not what the marketing page says it does.

Word count: ~135. In window.

### Block 7. Words you can drop in standups now (3-5 terms).

Four glossary terms wrapped on every use (parent-spec convention; M2L1 wrapped on block 3 first-use AND in block 7). Each term gets one sentence on usage, not definition. The "ask for the schema" / "ask for the WSDL" / "ask for the proto" parallel rhythm makes the four terms a small recognition kit the apprentice can deploy in a standup.

**Working copy:**

> ## Words you can drop in standups now
>
> {% include glossary-term.html term="SOAP" %}. Use this when someone says "the integration is SOAP" and you want to nod and ask "do you have the WSDL."
>
> {% include glossary-term.html term="GraphQL" %}. Use this when someone says "they have a GraphQL endpoint" and you want to know what to ask for next: the schema.
>
> {% include glossary-term.html term="gRPC" %}. Use this when someone says "the service is gRPC" and you want to ask "are we generating clients from the proto."
>
> {% include glossary-term.html term="request envelope" %}. Use this when you mean "the shape of one call before the response comes back."

Followed by `{% include ad-slot.html slot="lesson-mid-2" format="auto" %}`. Glossary entries defined in Section 4.2.

Word count: ~95.

### Block 8. AI co pilot tip (150-250w).

**Tool: GitHub Copilot Chat.** Rotation analysis:

| Lesson | Tool | Slot |
|---|---|---|
| M1L1 | GPT | shipped |
| M1L2 (pilot) | Claude | shipped |
| M1L3 | Claude | shipped |
| M1L4 | Cursor | shipped |
| M1L5 | Gemini | shipped |
| M2L1 | GPT | shipped |
| **M2L2** | **Copilot Chat** | this lesson |

Copilot has zero prior usage in the rotation — fairest pick by diversity. Task fit is good: recognizing the shape of a schema or doc file is naturally IDE-bound (apprentice opens the file, asks the chat panel), and matches GitHub Copilot Chat's strength. Avoids back-to-back GPT after M2L1.

**Section header** in the lesson body reads "AI co pilot tip" (no hyphen, per M2L1 retro).

**Working copy** (lesson voice, linter-clean):

> ## AI co pilot tip
>
> Tool: GitHub Copilot Chat (the chat panel in VS Code or your IDE of choice).
>
> **The situation.** You inherit a codebase or a public schema link and you want to know which shape you are looking at before you write a single doc word. Useful when an engineer hands you a `.proto` file and assumes you can read it.
>
> **The prompt** (paste into Copilot Chat with the schema or doc file open):
>
> ```text
> This file is part of an API. Tell me which shape this API is: REST, GraphQL, gRPC, SOAP, or something else. Quote the line that gave it away. Then in one sentence, name what that shape commits to.
> ```
>
> **What to expect back.** A shape name, a quoted line, and one commitment sentence. Three lines.
>
> **What to watch for.** Copilot Chat sometimes says "this could be REST or RPC over HTTP." That hedging is the trap from block 6: an API that says REST in the marketing page but ships RPC underneath. Push back: "name the shape based on the URL patterns in this file, not the marketing." The second pass usually picks one and defends it. If it still hedges, the file probably is RPC in a REST jacket. If Copilot paraphrases instead of quoting, ask again: "give me the literal line."

Word count: ~210. In window 150-250.

### Block 9. Before you go (one self check, 1-2 sentences).

No answer key. The self-check practices the lesson's recognition pattern on something the reader already has in their head.

**Working copy:**

> ## Before you go
>
> Pick a public API doc you remember reading. In two sentences, name the shape and name one thing the page does because of the shape.

Word count: ~26.

### Block 10. Next week at Greenfield + signoff.

Bridge to M2L3 (Anatomy of a URL part 1). Sentence locked from Section 1's cross-module bridge.

**Working copy:**

> ## Next week at Greenfield
>
> Next week we open the URL the catalog actually ships under and read it left to right. Devon has feelings about every part of it.
>
> {% include signoff.html %}

Word count: ~26. `{% include signoff.html %}` renders `Maya.` on its own line per parent spec.

**Total lesson word count estimate** (blocks 1-10): 126 + 28 + 395 + 450 + 135 + 135 + 95 + 210 + 26 + 26 ≈ **1,626 words**. ~10.8 min of pure reading; with diagram and SVG processing time, lands in the 12-14 min target window.

---

## Section 3. Visuals.

### 3.1. Mermaid (block 3).

**Storage.** Source inline in `_docs/typesofAPI.md` via `{% capture mermaid_src %}` + `{% include mermaid.html content=mermaid_src alt="..." %}` (parent-spec Section 6; matches M2L1).

**Diagram type.** Sequence diagram. **2 participants** (Atlas, Greenfield GraphQL), **3 messages**, **2 notes**. Under the parent spec's 10-node, 12-edge caps.

**Why GraphQL and not REST in the Mermaid.** REST was M2L1's diagram. M2L2 owes the apprentice one non-REST shape rendered concretely. GraphQL renders cleanly in text-based Mermaid (gRPC is binary, SOAP is verbose XML). The other two alternative shapes live in the block-4 SVG.

**Theme.** Inherits from `assets/js/mermaid-init.js`. No inline color overrides. Renders on the cream page background (M1L1 retroactive fix in place). Labels: sentence case, no hyphens, no em dashes; numerals for HTTP codes.

**Note text safety.** Mermaid Note text containing GraphQL syntax (braces, quotes) risks parser ambiguity. Solution: keep the Note brief ("Body carries a GraphQL query"). The literal query goes in the prose around the diagram where a Markdown code fence handles it without escape concerns. Block 3's closing thought-checkpoint includes the literal query in backticks: `query { books(q: "mystery") { title } }`.

**Accessibility.** Alt text on the include conveys what the diagram shows. Prose immediately around the diagram names the elements so a reader who does not see it gets the meaning. Thought-checkpoint sentence after the diagram prepares the reader for what to find, matching M2L1's "Look at the diagram. Find the cache." pattern.

### 3.2. Interactive SVG (block 4).

**Storage.** `assets/svg/typesofAPI/main.svg`. Hand-authored. ~200 lines (heavier than M2L1's ~150 because of the four-cell layout and per-cell hover content).

**Pattern.** `data-svg-pattern="hover-tooltip"` (M1L4 sources-map pattern). Confirmed available via `assets/js/interactive-svg.js` `initHoverTooltip` at line 71. Hover-tooltip fits a recognition lesson where all four shapes need to be visible at once and each carries optional depth.

**Pre-flight check completed.** Framework confirmed to support `hover-tooltip` per `initHoverTooltip()` at line 71. M1L4's sources-map SVG reviewed for the per-region hover convention. Framework moves the tooltip to `document.body` and positions via `getBoundingClientRect` + scroll offsets (M1L1 retroactive fix in place). One open question: M1L4's tooltips are short labels; M2L2's are ~30-45 words each. **Verify tooltip rendering at standard widths (375px, 768px, 1280px) before drafting begins.** If tooltips truncate, either shorten or extend the framework with a width cap. Risk noted in Section 6.

**Dimensions.** `viewBox="0 0 800 600"`, `preserveAspectRatio="xMidYMid meet"`. CSS sets `max-width: 100%; height: auto;`. Cell layout: 16px outer padding, 16px inner gutter, 2-by-2 grid. Each cell is 376x276 in the viewBox. Touch-target above 44x44 at typical rendered widths.

**Layout** (top-left, top-right, bottom-left, bottom-right):

#### REST cell (top-left, emphasized).

- **Label.** `REST` (bold, copper)
- **Badge.** Small pill, copper background, cream text, positioned upper-right of the cell: "the actual"
- **Request envelope.** One line: `GET /v1/books?q=mystery`
- **Border.** 2px copper (vs sage 1px for the three counterfactual cells)
- **Hover content** (tooltip ~30 words):
  > Asha emailed Devon asking for `POST /search`. Devon politely declined. The verb stays GET, the URL stays `/v1/books?q=mystery`. The cache holds it. Atlas calls it twenty times an hour.

#### SOAP cell (top-right).

- **Label.** `SOAP` (bold, ink)
- **Request envelope.** Three lines, stylized (Devon's whiteboard shorthand, not strict SOAP):
  ```
  <soap:Envelope>
    <Search>mystery</Search>
  </soap:Envelope>
  ```
- **Border.** 1px sage
- **Hover content** (tooltip ~40 words):
  > Asha would have asked: "send us the WSDL." Marginalia would have generated a client from the WSDL. Every Atlas call to find a book would have wrapped the query in an XML envelope. The cache would have stayed out of it.

#### GraphQL cell (bottom-left).

- **Label.** `GraphQL` (bold, ink)
- **Request envelope.** Two lines:
  ```
  POST /graphql
  query { books(q: "mystery") { title } }
  ```
- **Border.** 1px sage
- **Hover content** (tooltip ~40 words):
  > Asha would have asked for the schema. Atlas would have written a query asking for exactly the fields it needed. One URL for every call. The cache would have stayed out of it because every call is a POST.

#### gRPC cell (bottom-right).

- **Label.** `gRPC` (bold, ink)
- **Request envelope.** Two lines:
  ```
  SearchBooks(query: "mystery")
  (binary over HTTP/2)
  ```
- **Border.** 1px sage
- **Hover content** (tooltip ~45 words; no semicolons, broken to two sentences):
  > Asha would have asked for the proto file. Marginalia would have built the generated Atlas client from it. The call would have gone binary over HTTP/2. Any browser without grpc-web could not have called it. Any proxy not speaking HTTP/2 would have dropped the connection.

**Colors.** Four design tokens only (ink, cream, copper, sage). Copper 2px border + "the actual" pill on REST; sage 1px border on the other three. Text is ink throughout. Color is a secondary indicator; "the actual" badge and the textual labels carry the information for screen-reader users.

**Animation.** Hover-tooltip reveal uses 0.2s ease opacity transition (matches M1L4). `@media (prefers-reduced-motion: reduce)` disables transitions.

**Focus.** 2px copper outline on `g[tabindex="0"]:focus-visible`, outline-offset 4px. Each cell is a focusable group with `tabindex="0"`, `role="button"`, `data-tooltip="..."`. The framework's `initHoverTooltip` does not auto-add `role="button"`; the author supplies it per M1L1 retro item 4.

**Performance budget.** Raw SVG under 50KB (vs M2L1's 30KB; heavier because four cells with stylized envelopes); gzipped under 15KB. Validated at build.

**Alt text.** Drafted in Section 2 block 4 working copy. Conveys the four cells and the recognition pattern in prose. Mirrors the cell-by-cell content and tooltip semantics so screen-reader users get the same information as sighted users.

**Static fallback.** Without JavaScript, the four cells render fully with labels, badges, and request envelopes visible. Hover regions and tooltips are progressive enhancement; the static SVG carries the lesson's primary content.

**Hyphen / linter watch in SVG content.**
- `grpc-web` in tooltip text is allowed (identifier).
- `HTTP/2` in tooltip text is allowed (identifier).
- "twenty times an hour" — fine.
- "the actual" badge text — no hyphen.
- No semicolons in any tooltip.

### 3.3. Legacy visuals cleanup.

The legacy `_docs/typesofAPI.md` references four legacy visual assets that become orphans when the rewrite ships:

- `assets/gif/webAPIs.gif`
- `assets/images/api-categories-overview.svg`
- `assets/images/rest-api-illustration.svg`
- `assets/images/api-types-overview.svg` (referenced in the legacy frontmatter `image:` field)

All four get deleted in the M2L2 lesson PR. The DoD (Section 5) enforces a grep check that none of these paths remain referenced from any `_docs/*.md` file or any include before merge. Mirrors the M1L4 retro's six-orphan-asset cleanup pattern.

---

## Section 4. Frontmatter, glossary, bible deltas, voice.

### 4.1. Frontmatter (`_docs/typesofAPI.md`).

```yaml
---
title: "Types of APIs"
permalink: /typesofAPI.html
module: 2
lesson: 2
slug: typesofAPI
reading_time: 14
description: "Four API shapes a writer recognizes in 2026. Why Greenfield is REST, what SOAP, GraphQL, and gRPC would have cost instead."
previous_page:
  url: /restAPI.html
  title: "REST principles"
next_page:
  url: /anatomyofurl.html
  title: "Anatomy of a URL (part 1)"
---
```

Notes:
- `description` is 122 characters (under 155 cap). No em dashes, no AI tells, no emoji. Names the lesson's job in one sentence.
- `previous_page.title` and `next_page.title` are quoted defensively (M1L5 retro guidance).
- `reading_time: 14` reflects the ~1,626-word total at 150 wpm with diagram and SVG processing time, per the parent-spec formula `wc -w / 150 + 3`. Matches M2L1's reading_time.
- `redirect_from` not needed; URL is unchanged.
- `module: 2`, `lesson: 2` reconcile with `_data/modules.yml`.
- All legacy frontmatter fields dropped: `keywords` (24 keyword tokens), `schema_markup`, `speakable`, `speakable_selectors`, `author_name`, `author_description`, `author_expertise`, `author_image`, `level`, `last_modified_at`, `image`, `summary`. Phase 2 frontmatter is function-only.

### 4.2. Glossary additions (`_data/glossary.yml`, same PR).

Four new entries. Each definition under 30 words. Plain English. No voice violations.

```yaml
- term: "SOAP"
  definition: "An API shape that wraps every call in an XML envelope. The contract is a WSDL file. Heavyweight, still in production at enterprise systems."
  link: "#"
  see_also: [request envelope, REST]

- term: "GraphQL"
  definition: "An API shape with one endpoint, usually POST /graphql, where the client sends a query in the body and the server returns data shaped to match it."
  link: "#"
  see_also: [request envelope, REST]

- term: "gRPC"
  definition: "An API shape that uses Protocol Buffers over HTTP/2. The contract is a .proto file, and the client is generated from it, not handwritten."
  link: "#"
  see_also: [request envelope, REST]

- term: "request envelope"
  definition: "The shape of one API call before the response: which verb, which URL or endpoint, which headers, and what body or arguments travel with the request."
  link: "#"
  see_also: [REST, SOAP, GraphQL, gRPC]
```

Voice-linter validation: every linked `see_also` term resolves (REST from M2L1; SOAP, GraphQL, gRPC, request envelope newly added). The four-term count satisfies the parent-spec block 7 requirement (3-5 terms).

WSDL, Protocol Buffers, schema (already exists from M1L4), `.proto` file — these appear in lesson body without glossary entries. WSDL specifically is named in three places (block 3 SOAP paragraph, block 5 exercise SOAP coda, block 7 SOAP standup line) but isn't promoted to a glossary entry because adding it would push past the 5-term cap; the lesson body explains enough on each use.

### 4.3. Greenfield bible deltas (`docs/superpowers/greenfield-bible.md`, same PR).

**Append to Timeline section** (per M1L5/M2L1 retro: append at bottom, do not in-place-replace):

```markdown
## Module 2, Lesson 2. Devon whiteboards three other shapes.
Story date: Tuesday morning, story week 5. Seven days after M2L1's Tuesday morning Devon-at-desk scene; eleven days after Asha's email landed Friday evening of story week 3.
Event: Devon pinged Maya Friday evening asking her to come by Tuesday morning to whiteboard the three API shapes Greenfield could have shipped but did not (SOAP, GraphQL, gRPC). Maya finds him at the small whiteboard near his desk with four sketches up: REST plus the three alternatives. Under SOAP, Devon has written "1998" and below it "still in production at your bank." The lesson is the conventions debate widened: every shape is a set of commitments, and Greenfield's shape (REST) happens to fit a public catalog API for an open web. Apprentice stake: today, recognize the shape; this week, start the advanced filter assignment.
Characters present: Maya, Devon. Asha (offstage, referenced via M2L1 callback and via the counterfactual emails Devon imagines on the whiteboard).
New API entities introduced: none. Greenfield's GET /v1/books remains the running example.
New glossary terms introduced: SOAP, GraphQL, gRPC, request envelope.
Quote: "Last week was one argument. Today is three." (Devon, at the whiteboard, when Maya walks in.)
```

**Append to Locked details section** (per M1L5/M2L1 retro: separate Edit operations, do not collapse):

- **Greenfield's API shape: REST.** Implicit from M1L4 forward; locked explicitly here. M2L2 walks the three shapes Greenfield could have shipped (SOAP, GraphQL, gRPC) and names why REST's commitments fit a public catalog API for an open web. Future lessons referencing "Greenfield is REST" can cite this lock without re-deriving.
- **Devon's recurring image for an API claiming REST but shipping RPC.** "RPC in a REST jacket" and "RPC with a REST sticker on the box" — both forms locked from M2L2 forward. The "REST jacket" form is the canonical short version. May reappear when a non-Greenfield API surfaces in Module 4 (writing the docs) or Module 8 (capstone audit).
- **Whiteboard convention in Devon's workspace.** A small whiteboard near his desk, used for sketch-and-talk sessions. First on-screen in M2L2. Distinct from Priya's M1L3 venue (the conference room, where she shares analytics dashboards, not whiteboard sketches). May reappear when Devon walks Maya through a multi-part concept.
- **The four shapes Devon explicitly opined on.** REST, SOAP, GraphQL, gRPC. The "named-and-opined-on" set for the apprentice. WebSocket and the older RPC family (XML-RPC, JSON-RPC) are mentioned once each but are not Devon's canonical four. Locked because later lessons cross-referencing "the shapes Devon walked through" should not include WebSocket or RPC in that set.

**Resolved Open universe questions.** None opened; none closed.

### 4.4. Voice notes for the writer.

**Earned joke.** Lives in block 1, on the whiteboard. Devon wrote "1998" and below it "still in production at your bank." Maya narrates no commentary; the whitespace is the punchline. Needs human laugh-test before merge (parent DoD). Backup constructions if the bank line does not land: cross out "Simple" from the SOAP acronym expansion (v0.1 candidate; requires SOAP foreknowledge); write "(why)" and half-erase it. Final wording during drafting.

**Recurring Devon images, used intentionally twice each.**
- "RPC in a REST jacket" — block 6, block 8. Two uses establish it as a Devon phrase the apprentice can echo.
- "REST sticker on the box" — block 6 only. Companion image.
- Do not dilute by varying these phrases; do not pile on more variants.

**"Owing list" — Maya's coinage.** Used twice in block 4 ("the REST owing list", "the shape's owing list"). Not a standard term; do not normalize to "obligation list" or "what the shape owes." It is part of Maya's voice.

**Block 3 vs block 4 ordering — intentional.** Block 3 walks SOAP → GraphQL → gRPC → REST (anchor at the end). Block 4 walks REST → GraphQL → gRPC → SOAP (Greenfield's POV first). Do not normalize to one order during drafting.

**AI tool: GitHub Copilot Chat.** Do not pivot to a web LLM mid-draft. The rotation logic depends on Copilot being the M2L2 pick (block 8 details in Section 2).

**Asha is offstage in M2L2.** No new on-screen Asha content. She is referenced (a) in block 1 via past-tense callback to M2L1's `POST /search` ask, and (b) in the block-4 SVG tooltips via past-subjunctive counterfactuals ("Asha would have asked..."). The counterfactual emails are Devon's whiteboard imaginings, not Asha's actual writing. Do not author new Asha quotations or emails for M2L2.

**The recognition pattern (block 4 close-out).** "Read the first sentence of the docs. Look at the request envelope of one endpoint. You have placed the API." This is the lesson's TLDR; should land verbatim. If a future revision touches this paragraph, preserve all three sentences in order.

**No hyphens, em dashes, en dashes, emoji in body prose.** Hyphens preserved inside code, URLs, headers, identifiers, vendor names: `HTTP/2`, `POST /graphql`, `grpc-web`, `SOAPAction`, `Content-Type`, `.proto`, `/v1/books?q=mystery`.

**Hyphen watchlist for this lesson** (rewrite candidates flagged during drafting):

| Tempting phrase | Rewrite |
|---|---|
| "REST-style" / "RPC-style" / "GraphQL-style" | "in the REST shape" / etc. |
| "first-page sample" | "one sample on the first page" |
| "doc-page" | "the doc page" |
| "real-world" | "in practice" |
| "machine-readable" | "readable by machines" |
| "well-defined" | "named" or "clearly defined" |
| "in-house" | "internal" or just "Marginalia's" |
| "four-shape comparison" | "comparison of four shapes" |
| "high-performance" | drop (often vendor copy) |
| "open-source" | "open source" |
| "byte-size" / "400-byte" | drop the number; describe verbally |
| "auto-generated" | "generated" |
| "user-facing" | "for the reader" |

**Allowed personality words.** "Honestly", "fine", "fair", "look", "here", "in practice", "in production", "in my experience". Used sparingly. Max five Maya "I" sentences per the parent spec.

**Code samples.** Base URL `https://api.greenfield.lib/v1`. Real Greenfield data only (`bk_184932`, `The Quiet Library`, `branch_north`). `$GF_TOKEN` for the bearer. No `example.com`. No `foo`/`bar`. Every fenced block has a language tag (`bash`, `text`, `json`, etc.). The `<soap:Envelope>`, `query { books(q: "mystery") { title } }`, and `SearchBooks(query: "mystery")` examples in the block-4 SVG cells are stylized whiteboard renderings; do not promote them to fenced code blocks elsewhere in the lesson.

**Counterfactuals stay subjunctive.** "If Greenfield had shipped GraphQL, Asha would have asked..." — keep the past-subjunctive throughout. Do not slip to present-tense ("If Greenfield ships GraphQL, Asha asks..."). The lesson's voice is "we walked away from these shapes," not "we are walking away from them."

---

## Section 5. Definition of Done.

Per parent spec Section 4 (Phase 2). No additional structural items. Highlights to triple-check before opening the PR:

- All ten blocks present in order with `{% comment %}block:N{% endcomment %}` markers.
- Voice linter (`scripts/voice-check.rb`) passes on `_docs/typesofAPI.md`.
- Mermaid renders on the cream page background. The simplified Note (`Body carries a GraphQL query`) renders without parser warnings.
- Block 3's prose around the Mermaid carries the literal GraphQL query `query { books(q: "mystery") { title } }` in backticks (the Mermaid Note no longer carries it).
- Interactive SVG: hover-tooltip works on touch (tap-and-hold) and desktop (hover). Keyboard navigable (Tab between cells, Enter or Space reveals tooltip, Escape dismisses, outside-click dismisses). Each cell has `role="button"`, `tabindex="0"`, `data-tooltip="..."`. Focus ring visible (2px copper, 4px outset). `prefers-reduced-motion` respected.
- 4-cell SVG visual hierarchy: REST cell has 2px copper border + "the actual" pill badge upper-right; the other three have 1px sage border, no badge. All four cell labels readable at 375px width.
- Tooltip rendering verified at 375px, 768px, 1280px widths. If tooltips truncate, either shorten to ~25 words each or extend the framework with a max-width (note framework change in PR if so).
- Static fallback: without JavaScript, all four cells render fully with labels, badges, and request envelopes. Hover regions are progressive enhancement only.
- All four new glossary terms (SOAP, GraphQL, gRPC, request envelope) resolve when wrapped in `{% include glossary-term.html term="..." %}`. Each `see_also` entry resolves to an existing glossary term.
- Reading time 12 to 18 minutes (`wc -w / 150 + 3`).
- Earned joke in block 1 (Devon's "1998" + "still in production at your bank") gets a thumbs up from Gaurav at human review. Backup constructions in Section 4.4 are pre-approved fallbacks if needed.
- Bible appends (Timeline entry + 4 Locked details entries) are separate Edit operations, not collapsed.
- **Orphan legacy visual assets deleted**: `assets/gif/webAPIs.gif`, `assets/images/api-categories-overview.svg`, `assets/images/rest-api-illustration.svg`, `assets/images/api-types-overview.svg`. Grep check: `git grep -E 'webAPIs\.gif|api-categories-overview|rest-api-illustration|api-types-overview' _docs/ _includes/ _layouts/` returns no hits before merge.
- HTMLProofer clean (`bundle exec htmlproofer _site/typesofAPI.html --swap-urls '^/apidocumentation:'`).
- Build is green (`npm run build:css && bundle exec jekyll build`).
- `module: 2`, `lesson: 2` frontmatter reconciles with `_data/modules.yml`.
- Block 3 walks SOAP → GraphQL → gRPC → REST. Block 4 walks REST → GraphQL → gRPC → SOAP. Ordering split preserved as intentional editorial choice (Section 4.4).
- Asha is offstage throughout. No new on-screen Asha content (no new dialog, no new email arrival, no new prose written in her voice).
- Block 8 names GitHub Copilot Chat as the tool. The prompt code fence is `text`-tagged.
- Block 8 section header reads `## AI co pilot tip` (no hyphen).
- `{% include signoff.html %}` renders `Maya.` on its own line at the end of block 10.

---

## Section 6. Risks and open decisions.

### 6.1. Risks (flagged for the writer to watch).

1. **The hover-tooltip framework with ~30-45 word tooltips is untested at scale.** M1L4's tooltips are short labels (under 10 words each). M2L2's tooltips are 30-45 word counterfactuals. Mitigation: verify tooltip rendering at 375px, 768px, 1280px widths before drafting block 4 content. If tooltips truncate, shorten to ~25 words each or extend the framework with a max-width.

2. **Block 1's earned joke requires the apprentice to find the deadpan funny.** Phase 2 DoD names the human laugh-test. Mitigation: three backup constructions in Section 4.4. If none land for the human reviewer, escalate and re-bid before merge.

3. **The 4-cell SVG layout has more rendered content than M2L1's toggle.** Render-budget risk on slower devices, especially the SOAP cell's three-line stylized envelope and the gRPC cell's two-line shorthand. Mitigation: hold to 50KB raw / 15KB gzipped; test on iOS Safari 16 and Chrome on a 2-3 year old Android before merge.

4. **Copilot Chat hedges on shape recognition.** Block 8 names this in "what to watch for", but the prompt may need iteration to keep Copilot from saying "this could be REST or RPC." Mitigation: the block-8 followup prompt ("name the shape based on the URL patterns in this file, not the marketing") usually fixes it. If first-pass output reads like a textbook, sharpen with a worked example before merge.

5. **"RPC in a REST jacket" used twice (block 6, block 8) risks feeling forced.** Mitigation: hold to two uses only. Do not introduce a third use or vary the phrasing during drafting. The two-use cadence mirrors M2L1's "letters from 1969" beat.

6. **Block 3 and block 4 ordering split risks drafter normalization.** A future copyedit pass may try to unify the orders. Mitigation: Section 4.4 names this as intentional; the orders serve different narrative purposes (Devon's whiteboard left to right vs Greenfield's actual first page).

7. **The advanced filter writing assignment is promised in block 1 but does not get delivered in M2L2.** Scope-creep risk: a drafter trying to honor the promise might pull URL-anatomy content into M2L2. Mitigation: block 1's apprentice stake says "recognize the shape" not "write the assignment." M2L3's spec (next session) must claim the writing assignment explicitly so the M2L1 promise stays alive across the module.

8. **The simplified Mermaid Note loses the literal GraphQL query.** The prose around the diagram (block 3 closing thought-checkpoint) must carry the literal query in fenced or backticked form. Mitigation: Section 3.1 names this requirement explicitly; the DoD in Section 5 verifies it.

9. **Legacy asset deletion could break an unrelated lesson if cross-referenced.** Unlikely but possible. Mitigation: grep check is part of DoD; if any `_docs/*.md` or include still references the legacy paths, the merge does not proceed until that reference is removed or repointed.

10. **Title change risk for SEO.** Going from "Types of APIs - A Complete Overview" to "Types of APIs" removes 4 keyword tokens from the `<title>`. The URL is unchanged so backlinks survive. The legacy `keywords:` field is no longer needed (rewrite uses a tight `description`). Acceptable trade-off; track GA4 30 days post-ship.

### 6.2. Open decisions (deferred to drafting or post-ship retro).

1. **The "the actual" badge text on the REST cell.** v0.1 picks "the actual". Alternatives during drafting: "Greenfield ships this", "actual", "we shipped this". Final wording based on visual fit at the badge size.

2. **`reading_time: 14` final.** Closed during self-review pass: 14 matches the parent-spec formula (`wc -w / 150 + 3` on 1,626 words) and M2L1's reading_time. If the final draft lands above 2,000 words, bump to 15.

3. **The earned joke fallback.** v0.1 commits to "1998 / still in production at your bank." Backup constructions in Section 4.4 are pre-approved. Pick during drafting after human laugh-test.

4. **The SOAP cell envelope: three-line shorthand vs four-line with explicit `<soap:Body>`.** v0.1 commits to the three-line shorthand for whiteboard-sketch fidelity. If reviewer says "looks too unfaithful to real SOAP", fall back to four lines.

5. **Tool surface for the AI tip: Copilot Chat in IDE vs web LLM.** v0.1 commits to Copilot Chat. If the block 5 exercise leaves the apprentice in a browser, a web LLM (Claude.ai, ChatGPT, Gemini) may be the more natural pivot. Acceptable to revise after first-pass user feedback in a v0.2 spec edit.

6. **Whether to lock additional Devon dialog beyond "Last week was one argument. Today is three."** v0.1 has only that one Devon line in the spec. Drafting may surface a second line worth quoting in the bible Locked details. If so, append in the same PR.

---

## Section 7. Changelog.

- **2026-05-30. v0.1.** Drafted from brainstorm. Frame (every shape is a set of commitments), three shapes (SOAP, GraphQL, gRPC), Asha counterfactual through-line, story-week 5 Tuesday morning timing, SVG pattern (hover-tooltip whiteboard, 4-cell with REST emphasized via copper border + "the actual" pill), AI tool (GitHub Copilot Chat), bible deltas (1 Timeline entry + 4 Locked details), glossary deltas (4 new terms), frontmatter (function-only, legacy SEO fields dropped), voice notes (3 protect-during-drafting items), risks (10), and open decisions (6) all locked. Spec self-review pass to follow; user review gates plan handoff.
