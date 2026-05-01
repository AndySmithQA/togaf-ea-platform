# Data Standards

> Owner: Domain Architect (Data) · Status: Approved · Version: 3.1

## Modelling

- Logical models in **TM Forum SID** style, with Northwind retail extensions.
- Canonical data model expressed in JSON Schema and Avro for events.
- Every Data Entity has a published Data Product owner.

## Identifiers

- All customer-facing IDs are **opaque ULIDs**; no embedded business meaning.
- Internal identifiers are versioned and never recycled.

## Quality

- Each Data Product publishes SLOs against four dimensions:
  accuracy, completeness, freshness, lineage.
- Quality breaches raise a P3 incident automatically via the data observability stack.

## Privacy and security

| Classification | Examples                | Storage rule                       |
| -------------- | ----------------------- | ---------------------------------- |
| Public         | Product catalog         | No restriction                     |
| Internal       | Margin %                | Group SSO required                 |
| Confidential   | Customer PII            | Encrypted at field level, EU/UK only |
| Restricted     | PAN, biometrics         | Tokenised; never in logs           |

## Event schemas

- Topic naming: `northwind.<bounded-context>.<entity>.<event>.v<n>` (e.g. `northwind.orders.order.created.v3`).
- Schemas registered in Confluent Schema Registry; backwards-compatible by default.
