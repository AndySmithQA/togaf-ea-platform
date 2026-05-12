# Architecture Requirements Specification — {{ENGAGEMENT_NAME}}

> Living document — updated continuously through Requirements Management.

## Success Measures

| Goal | Measure | Baseline | Target | Source |
| ---- | ------- | :------: | :----: | ------ |
| G1   |         |          |        |        |

## Architecture Requirements (Functional & Non-Functional)

| Ref | Statement | Type |
| --- | --------- | ---- |
| AR-100 |        | Functional |

## Business Service Contracts

| Service | Owner | Availability | RTO | RPO |
| ------- | ----- | :----------: | :-: | :-: |
|         |       |              |     |     |

## Application Service Contracts

_Per service: API contract version, SLOs, breaking-change policy._

## Implementation Guidelines

- All public APIs documented as OpenAPI 3.1 in `apispec/`.
- All event schemas registered with backward compatibility.
- All UI components use the central design system.

## Implementation Specifications

- Container image SHA pinned per release; immutable infrastructure.
- mTLS via service identity for every internal call.

## Implementation Standards

Reference `standards-information-base/`.

## Interoperability Requirements

- _Domain-event schemas, identity protocols, integration patterns._

## Constraints

- _Capex envelope, freeze windows, residency, vendor strategy._

## Assumptions

- _Vendor selection deadlines, funding outside the programme, legal opinions._
