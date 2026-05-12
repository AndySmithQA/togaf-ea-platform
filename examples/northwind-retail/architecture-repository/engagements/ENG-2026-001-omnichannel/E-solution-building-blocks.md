# Solution Building Blocks (SBBs) — Omnichannel CX Programme

> Status: Missing (Phase E not yet started)

SBBs are the candidate products and services that will realise each ABB.

## SBB Catalog

| SBB id        | Name                                  | Vendor / Tech    | Maturity |
| ------------- | ------------------------------------- | ---------------- | :------: |
| SBB-ciam-1    | Auth0 (Okta CIC)                      | Okta             | GA       |
| SBB-ciam-2    | Microsoft Entra External ID            | Microsoft        | GA       |
| SBB-ciam-3    | ForgeRock Identity Cloud              | Ping Identity    | GA       |
| SBB-store-1   | commercetools                         | commercetools    | GA       |
| SBB-store-2   | Spryker                               | Spryker          | GA       |
| SBB-store-3   | VTEX                                  | VTEX             | GA       |
| SBB-oms-1     | Northwind OMS (build, Go on EKS)      | Build            | New      |
| SBB-events-1  | AWS MSK + Confluent Schema Registry   | AWS / Confluent  | GA       |
| SBB-cdp-1     | Tealium AudienceStream                | Tealium          | GA       |
| SBB-cdp-2     | Segment (Twilio)                      | Twilio           | GA       |
| SBB-mesh-1    | Istio + SPIRE                         | OSS              | GA       |
| SBB-edge-1    | Cloudflare Enterprise                 | Cloudflare       | GA       |

## Mapping ABB → SBB

| ABB                          | Shortlist                    | Recommended (subject to selection) |
| ---------------------------- | ---------------------------- | ---------------------------------- |
| ABB-customer-identity        | SBB-ciam-1/2/3               | TBC after RFP                       |
| ABB-composable-storefront    | SBB-store-1/2/3              | commercetools (best NW fit)         |
| ABB-order-orchestration      | SBB-oms-1                    | Build                               |
| ABB-event-streaming          | SBB-events-1                 | MSK + Schema Registry               |
| ABB-real-time-cdp            | SBB-cdp-1/2                  | Tealium (existing relationship)     |
| ABB-service-mesh-identity    | SBB-mesh-1                   | Istio + SPIRE                       |
| ABB-edge                     | SBB-edge-1                   | Cloudflare                          |

## Procurement Notes

- CIAM RFP issued Q4 2026, decision Q1 2027. Three-vendor shortlist already named.
- commercetools: existing AWS relationship; private offer in negotiation.
- AWS MSK and Cloudflare procured under existing Group contracts.
- All SBB selections require Architecture Board endorsement before contract.
