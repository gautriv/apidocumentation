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

{% comment %}block:1{% endcomment %}
## Three other shapes

<!-- TODO block:1 -->

{% comment %}block:2{% endcomment %}
## Today you will leave with

<!-- TODO block:2 -->

{% include ad-slot.html slot="lesson-mid-1" format="auto" %}

{% comment %}block:3{% endcomment %}
## Every shape is a set of commitments

Every shape is a set of commitments. An API picks one. Each shape commits the server, the client, the cache, and the doc page to a particular way of working. The shape is the contract.

Take {% include glossary-term.html term="SOAP" %} first. SOAP is XML in an envelope. Each call sends an envelope with a header and a body. The SOAPAction header tells the server which operation to run. The contract is a WSDL file. The cache stays out of it (every call is a POST to one URL). If Greenfield had shipped SOAP, Asha's email would have been "send us the WSDL" and Marginalia would have generated a client from it.

{% include glossary-term.html term="GraphQL" %} next. GraphQL is one endpoint, usually `POST /graphql`, with the query in the body. The contract is the schema. The cache stays out of it by default (every call is a POST). If Greenfield had shipped GraphQL, Asha would have asked for the schema and her code would have written a query for the fields she needed.

{% include glossary-term.html term="gRPC" %} last. gRPC is binary over HTTP/2. The contract is a `.proto` file and the wire format is Protocol Buffers. The client is generated from the proto. The cost is HTTP/2 support all the way down: browsers without `grpc-web` cannot talk to it, proxies that do not speak HTTP/2 drop the connection, and the cache cannot read it. If Greenfield had shipped gRPC, Asha would have asked for the proto file and Marginalia would have built the generated client into the Atlas service.

Two shapes Devon does not sketch this morning. WebSocket is a connection model, not a request shape, and gets its own lesson in Module 6. The older RPC family that gRPC modernized is more concept than working choice today.

{% include glossary-term.html term="REST" %} is the shape Greenfield ships. REST commits to HTTP verbs, URLs, and a body that is usually JSON. The cache holds GETs by default. The schema is optional. Greenfield ships OpenAPI alongside. REST's commitments happen to fit a public catalog API for an open web. That is why Greenfield is REST.

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

Look at the diagram. GraphQL puts the question in the body. The body carries `query { books(q: "mystery") { title } }`. One endpoint, one POST, the query says what to do. The cache stays out of it.

{% comment %}block:4{% endcomment %}
## Name the shape on page one

<!-- TODO block:4 -->

{% comment %}block:5{% endcomment %}
<!-- TODO block:5 -->

{% comment %}block:6{% endcomment %}
<!-- TODO block:6 -->

{% comment %}block:7{% endcomment %}
## Words you can drop in standups now

<!-- TODO block:7 -->

{% include ad-slot.html slot="lesson-mid-2" format="auto" %}

{% comment %}block:8{% endcomment %}
## AI co pilot tip

<!-- TODO block:8 -->

{% comment %}block:9{% endcomment %}
## Before you go

<!-- TODO block:9 -->

{% comment %}block:10{% endcomment %}
## Next week at Greenfield

<!-- TODO block:10 -->

{% include signoff.html %}
