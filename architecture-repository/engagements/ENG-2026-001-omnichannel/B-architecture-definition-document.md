# Architecture Definition Document (ADD) — Omnichannel CX Programme

> Status: Draft (living document) · Owner: Priya Mehta (Lead Architect)
>
> This ADD aggregates the baseline, target and gap content for Business, Data, Application
> and Technology architectures developed in this engagement. It is the single canonical
> reference used by Phase E onwards.

## Scope

All customer-facing channels and the customer-facing capabilities that support them,
including identity, basket, order, returns and loyalty. Excludes Northwind Financial
Services customer identity and the Wholesale B2B portal (federated and out-of-cycle
respectively).

## Goals, Objectives, and Constraints

Goals G1–G5 from the SoAW. Constraints: GDPR/PCI/EAA/SOX, EU/UK PII residency, no
store-colleague headcount reduction, £72m envelope, AWS-primary cloud.

## Architecture Principles

The Group Architecture Principles (`architecture-capability/architecture-principles.md`) apply.
Two engagement-specific elaborations:

1. *No new identity store.* Every new system delegates to CIAM.
2. *Basket and order live as canonical aggregates outside any channel.*

## Baseline Architecture

Captured in:
- Business → [`B-business-architecture.md`](./B-business-architecture.md) §Baseline
- Data → [`C-D-data-architecture.md`](./C-D-data-architecture.md) §Baseline
- Application → [`C-A-application-architecture.md`](./C-A-application-architecture.md) §Baseline
- Technology → [`D-technology-architecture.md`](./D-technology-architecture.md) §Baseline (pending Phase D)

## Target Architecture

Captured in the same files, §Target sections.

## Architecture Models (Business, Data, Application, Technology)

Cross-references to the per-domain deliverables. Diagrams stored alongside in `/diagrams/`
as `.drawio` (not included in this mock).

## Rationale and Justification

The composable target supports principles B3 (Build for Change), A1 (Composable over
Monolithic) and A3 (Buy Commodity, Build Differentiating). Trade-offs are documented in
[`E-trade-off-analysis.md`](./E-trade-off-analysis.md).

## Mapping to Architecture Repository

- Standards: `standards-information-base/`
- Reference models: `reference-library/`
- Requirements: `architecture-requirements-repository/requirements-catalog.md` (AR-100..108)
- Solutions: `solutions-landscape/current-solutions.md`

## Gap Analysis

Consolidated in [`E-gap-analysis.md`](./E-gap-analysis.md) (to be developed in Phase E).
Per-domain gaps already documented in B/C-D/C-A/D §Gap Analysis sections.

## Impact Assessment

| Area               | Impact                                          | Mitigation                       |
| ------------------ | ----------------------------------------------- | -------------------------------- |
| Stores operations  | New POS workflow for cross-channel basket       | Phased rollout, agent training   |
| Customer privacy   | Centralised identity raises consent stakes      | DPO review, granular consent UX  |
| Engineering teams  | Migration from monolith → composable services   | Strangler pattern, feature flags |
| Vendor landscape   | Hybris and Siebel decommissioned by 2027        | 18-month parallel-run            |
| Finance reporting  | New canonical OrderEvent stream                 | SOX walkthrough at 80% design    |
