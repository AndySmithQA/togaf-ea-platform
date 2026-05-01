# Request for Architecture Work (RfAW) — Omnichannel Customer Experience Programme

> Engagement: **ENG-2026-001-omnichannel** · Sponsor: Group COO (Helena Vasquez)
> Submitted: 2026-03-05 · Approved: 2026-03-12

## Organisation Sponsors

- **Sponsor:** Helena Vasquez, Group COO
- **Co-sponsor:** Marcus Liang, MD Northwind Online
- **Receiving organisation:** Enterprise Architecture function (Chief Architect)

## Organisation's Mission Statement

*"To be the customer's most-trusted everyday retailer in the markets we serve, blending the
ease of digital with the warmth of our stores."*

## Business Goals (and Changes)

| Goal                                                          | Measure                                | Target by 2027 |
| ------------------------------------------------------------- | -------------------------------------- | :------------: |
| G1 Improve customer NPS                                       | NPS                                    |   +12 pts      |
| G2 Lift online conversion via composable storefront           | Visit-to-order conversion              |   +30%         |
| G3 Reduce time-to-deliver new customer journey                | Lead time first commit → live          |   ≤ 6 weeks    |
| G4 Reduce cost of customer acquisition                        | Blended CAC                            |   −15%         |
| G5 Lift colleague productivity at the till                    | Order/refund handling time             |   −25%         |

## Strategic Plans of the Business

This RfAW supports the Group's three-year strategic plan **"One Northwind"**, specifically
the second pillar — *"Composable customer experience across every channel."*

## Time Limits

- Approval of SoAW required by **2026-03-31**.
- Architecture Vision and B/C/D iteration complete by **2026-09-30**.
- First transition architecture in production by **2027-03-31**.
- Programme committed delivery by **2027-12-31**.

## Changes in the Business Environment

- Two competitors launched composable storefronts in 2025 with measurable share gains.
- New EU Accessibility Act (EAA) takes effect 28 June 2026.
- Group reports a £4.6m run-rate cost from duplicate customer-data effort.

## Organisational Constraints

- No reduction in store-colleague headcount during the programme.
- The Northwind Financial Services unit federates rather than consolidates customer identity.
- All architectural changes must be reviewable in this repository.

## Budget Information, Financial Constraints

- Programme envelope: **£72m capex over three financial years** (FY26–FY28).
- Opex run-rate target post-programme: **−£8m/year** vs. current baseline.
- Independent assurance fees up to **£1.2m** allowed.

## External Constraints, Business Constraints

- GDPR (UK & EU), PCI-DSS v4, EU Accessibility Act, SOX (Group Financial reporting).
- No material reliance on a single hyperscaler beyond AWS for tier-1 services.
- All customer PII must remain inside EU/UK jurisdictions.

## Current Business System Description

- Five separate identity stores; weekly batch reconciliation between them.
- Order data fragmented across SAP ECC (master), the Hybris e-commerce platform, the in-store
  POS, the contact-centre CRM and the loyalty hub.
- Personalisation runs from a third-party CDP fed weekly batches of clickstream data.
- Returns require dual entry (in-store + warehouse) for ~22% of cases.

## Current Architecture/IT System Description

- Hybris monolith on premise; ~3.4M lines of code; release cadence ~6 weeks.
- AWS landing zone exists for Northwind Online only; not used by Stores or Wholesale.
- Service-mesh and event-streaming standards in place but not yet adopted by the storefront.

## Description of Developing Organisation

- Northwind EA team (37 FTE) leading; Northwind Online product engineering as primary
  delivery org (~280 FTE across 32 squads).
- Northwind Stores IT (90 FTE) for POS and store experience.

## Description of Resources Available to Developing Organisation

- AWS Enterprise Discount Programme; Confluent platform team contract; existing service
  mesh, observability and CI/CD platforms (see `standards-information-base/`).
- £6m FY26 advisory budget for headless commerce vendor assessment.
