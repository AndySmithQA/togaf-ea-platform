# Statement of Architecture Work (SoAW) — Omnichannel Customer Experience Programme

> Engagement: **ENG-2026-001-omnichannel** · Approved by Architecture Board: 2026-03-26
> Architecture Lead: Priya Mehta · Sponsor: Helena Vasquez (Group COO)

## Architecture Project Request and Background

This SoAW responds to RfAW [`A-request-for-architecture-work.md`](./A-request-for-architecture-work.md)
issued by the Group COO. The programme will deliver a composable, customer-led omnichannel
experience across web, mobile, store and contact centre.

## Architecture Project Description and Scope

In scope:
- All customer-facing channels (web, app, kiosk, store POS, contact centre).
- Customer Identity, Order Orchestration, Product Information, Loyalty.
- Data products underpinning a single customer view and order lifecycle.
- Migration from Hybris monolith and Siebel CRM.

Out of scope (this cycle):
- Northwind Financial Services customer identity (federated only).
- Wholesale B2B portal (separate engagement).
- Workforce management / scheduling.

## Overview of Architecture Vision

See [`A-architecture-vision.md`](./A-architecture-vision.md). In summary: composable
storefronts atop headless commerce, single customer identity via CIAM, event-driven order
orchestration, real-time CDP, in-store kiosks reusing the same APIs as web.

## Specific Change of Scope Procedures

- Any scope change > 5% effort or > £500k requires a Change Request via the Architecture
  Board.
- Sub-threshold changes are recorded in the engagement decision log and notified to the
  Sponsor in the next steering committee.

## Roles, Responsibilities, and Deliverables

| Role                             | Owner            | Accountable for                                  |
| -------------------------------- | ---------------- | ------------------------------------------------ |
| Sponsor                          | Helena Vasquez   | Outcomes, funding                                |
| Lead Enterprise Architect        | Priya Mehta      | All architecture deliverables                    |
| Domain Architect (Business)      | Daniel Ofori     | Business Architecture, Stakeholder Map           |
| Domain Architect (Data)          | Yuki Tanaka      | Data Architecture, Data Products                 |
| Domain Architect (Application)   | Aisha Rahman     | Application Architecture, ABBs/SBBs              |
| Domain Architect (Technology)    | Sven Eriksson    | Technology Architecture, landing zone            |
| Information Security Architect   | Rachel Donovan   | Compliance, controls, identity                   |
| Programme Director               | James Whitlock   | Delivery, RAID, finance                          |

Deliverables produced in this engagement are listed in the engagement
[`README.md`](./README.md).

## Acceptance Criteria and Procedures

- Each deliverable is accepted when:
  1. all auto-checks pass (required TOGAF section headings present),
  2. the EA checklist is complete (manual + automatic),
  3. the named reviewer signs off in the platform,
  4. the Architecture Board minutes the decision in the governance log.
- The Architecture Vision and ADD per phase are accepted by the Architecture Board.
- The Architecture Roadmap is accepted by the Group Investment Board on EA recommendation.

## Architecture Project Plan and Schedule

| Milestone                                               | Date       |
| ------------------------------------------------------- | ---------- |
| RfAW approved                                           | 2026-03-12 |
| SoAW approved                                           | 2026-03-26 |
| Architecture Vision approved                            | 2026-04-23 |
| Phase B/C/D iteration complete                          | 2026-09-30 |
| Architecture Roadmap (Phase E) approved                 | 2026-11-15 |
| Implementation & Migration Plan (Phase F) approved      | 2026-12-15 |
| Architecture Contract signed (Phase G)                  | 2027-01-15 |
| First Transition Architecture in production             | 2027-03-31 |
| Phase G compliance review #1                            | 2027-04-30 |
| Programme close & Phase H handover                      | 2027-12-31 |

## Approvals

| Name             | Role                  | Decision   | Date       |
| ---------------- | --------------------- | ---------- | ---------- |
| Helena Vasquez   | Sponsor (Group COO)   | Approved   | 2026-03-26 |
| Marcus Liang     | Co-sponsor (MD Online)| Approved   | 2026-03-26 |
| Chief Architect  | Architecture Authority| Approved   | 2026-03-26 |
| Architecture Board | Governance          | Approved   | 2026-03-26 |
