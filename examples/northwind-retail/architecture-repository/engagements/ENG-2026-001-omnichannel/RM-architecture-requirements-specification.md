# Architecture Requirements Specification — Omnichannel CX Programme

> Status: Living document — updated continuously through Requirements Management
> Owner: Lead Architect; consumers: all delivery teams.

## Success Measures

| Goal | Measure                            | Baseline | Target by 2027 | Source              |
| ---- | ---------------------------------- | :------: | :------------: | ------------------- |
| G1   | NPS                                |  +18     |  +30           | Group dashboard     |
| G2   | Online conversion (visit→order)    |  2.1%    |  2.7%          | Storefront analytics|
| G3   | Lead time first commit → live      |  6 mo    |  6 wk          | DORA                |
| G4   | Blended CAC                        |  £42     |  £36           | Group marketing     |
| G5   | Order/refund handling time         |  3m20s   |  2m30s         | POS analytics       |

## Architecture Requirements (Functional & Non-Functional)

| Ref      | Statement                                                          | Type           |
| -------- | ------------------------------------------------------------------ | -------------- |
| AR-100   | Cross-channel basket continuation within 24h                       | Functional     |
| AR-101   | Inventory propagation after return < 60s                           | Functional     |
| AR-102   | All customer PII processing remains in EU/UK                       | Non-functional |
| AR-103   | Storefront p95 add-to-cart ≤ 350ms                                 | Non-functional |
| AR-104   | Loyalty status visible at till in < 200ms                          | Non-functional |
| AR-105   | Per-work-package rollback supported                                | Non-functional |
| AR-106   | All new services emit OpenTelemetry traces                         | Non-functional |
| AR-107   | OMS supports 12k RPS peak                                          | Non-functional |
| AR-108   | Consent revocation propagates within 24h                           | Functional     |

## Business Service Contracts

| Service                   | Owner          | Availability | RTO | RPO |
| ------------------------- | -------------- | :----------: | :-: | :-: |
| Customer Identity (CIAM)  | App Domain     | 99.95%       | 30m | 5m  |
| Order Orchestration       | App Domain     | 99.95%       | 30m | 5m  |
| Composable Storefront     | App Domain     | 99.9%        | 1h  | 15m |
| Customer 360 read         | Data Domain    | 99.9%        | 1h  | 15m |
| Loyalty Hub real-time     | App Domain     | 99.9%        | 1h  | 15m |

## Application Service Contracts

(Per service: API contract version, SLOs, breaking-change policy.)

## Implementation Guidelines

- All public APIs documented as OpenAPI 3.1 in `apispec/`.
- All event schemas registered in Confluent Schema Registry with backward compatibility.
- All UI components use `@northwind/ds`.

## Implementation Specifications

- Container image SHA pinned per release; immutable infrastructure.
- mTLS via SPIFFE for every internal call.

## Implementation Standards

Reference `standards-information-base/` (technology, data, application).

## Interoperability Requirements

- Order events conform to canonical schema `northwind.orders.order.created.v3` and successors.
- CIAM exposes OIDC compliant with OpenID Connect Core 1.0.

## Constraints

- £72m capex envelope across FY26–FY28.
- No production cuts within ±2 weeks of peak trading windows.
- AWS-primary; multi-region restricted to EU/UK.

## Assumptions

- Headless commerce vendor selection completes by 2027-Q1.
- Group landing-zone extension funded outside the programme.
- Legal Stamp on combined privacy posture obtained by 2026-Q4.
