# Architecture Vision — Omnichannel Customer Experience Programme

> Engagement: **ENG-2026-001-omnichannel** · Approved by Architecture Board: 2026-04-23
> Architecture Lead: Priya Mehta

## Problem Description

Customer experience across Northwind's channels is fragmented. Identity, basket, order
history and loyalty status differ between web, app and store. The Hybris monolith blocks
fast change. Personalisation is batch-fed and stale by 5–7 days. Returns require
double-keying. Competitors are pulling away on share of digitally-influenced revenue.

## Objective of the Engagement

Deliver a composable, customer-led omnichannel experience that:

- presents a single, real-time view of the customer to colleagues and customers,
- lets customers begin a journey on one channel and complete it on another seamlessly,
- supports new journey delivery in ≤ 6 weeks rather than today's ≥ 6 months,
- reduces opex by ~£8m/year through retirement of duplicate platforms.

## Summary Views Necessary to Communicate the Vision

```
                  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐
                  │     Web     │  │ iOS/Android │  │   Store POS  │
                  └──────┬──────┘  └──────┬──────┘  └──────┬───────┘
                         │                │                │
                         ▼                ▼                ▼
                              ┌─────────────────────┐
                              │ Backend-for-Frontend│
                              └──────────┬──────────┘
                                         │
                          ┌──────────────┼──────────────┐
                          ▼              ▼              ▼
                    ┌──────────┐  ┌────────────┐ ┌──────────────┐
                    │   CIAM   │  │  Storefront │ │  Loyalty Hub │
                    └────┬─────┘  └──────┬─────┘ └──────┬───────┘
                         │               │              │
                         ▼               ▼              ▼
                              ┌──────────────────────┐
                              │ Order Orchestrator   │
                              └──────────┬───────────┘
                                         ▼
                              ┌──────────────────────┐
                              │ Event Stream (Kafka) │
                              └──────────┬───────────┘
                                         ▼
                              ┌──────────────────────┐
                              │   Customer Data      │
                              │   Platform (CDP)     │
                              └──────────────────────┘
```

## Mapped Requirements

| Requirement (catalog ref)            | Driver                                 |
| ------------------------------------ | -------------------------------------- |
| AR-100 cross-channel basket          | G1 NPS, Customer expectation           |
| AR-101 inventory propagation 60s     | G2 conversion                           |
| AR-102 EU/UK PII residency           | GDPR                                    |
| AR-103 p95 add-to-cart ≤ 350ms       | G2 conversion                           |
| AR-104 till loyalty < 200ms          | G5 colleague productivity               |
| AR-107 OMS 12k RPS peak              | G2 conversion (Black Friday)            |
| AR-108 consent revocation 24h        | GDPR / customer trust                   |

## Reference to Draft Architecture Definition Document

A draft ADD is open at [`B-architecture-definition-document.md`](./B-architecture-definition-document.md).
This Vision is the seed for the baseline/target sections of that ADD.

## Capability Assessment

Reviewed: see `architecture-repository/governance-log/capability-assessments.md`.
Headline: Customer Identity, Order Orchestration, Composable Storefront and CDP all assessed
**Critical / Inadequate**. The programme directly addresses these.

## Confirmed Statement of Architecture Work

The Architecture Board confirmed the SoAW [`A-statement-of-architecture-work.md`](./A-statement-of-architecture-work.md)
on 2026-03-26 with no amendments arising from this Vision.
