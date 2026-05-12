# Architecture Building Blocks (ABBs) — Omnichannel CX Programme

> Status: Missing (Phase E not yet started)

ABBs are technology-neutral capability descriptions that the architecture commits to deliver.

## ABB Catalog

| ABB id                       | Name                                  | Domain      |
| ---------------------------- | ------------------------------------- | ----------- |
| ABB-customer-identity        | Customer Identity & Access Management | App / Sec   |
| ABB-customer-360             | Single Customer View read API         | Data / App  |
| ABB-order-orchestration      | Order Orchestrator (OMS)              | App         |
| ABB-composable-storefront    | Composable Storefront                 | App         |
| ABB-product-information      | Product Information Management         | App / Data  |
| ABB-event-streaming          | Event-streaming backbone              | Tech        |
| ABB-real-time-cdp            | Real-time Customer Data Platform      | Data        |
| ABB-loyalty-real-time        | Loyalty Real-time API                 | App         |
| ABB-cloud-landing-zone       | Cloud landing zone                    | Tech        |
| ABB-service-mesh-identity    | Service Mesh & Workload Identity      | Tech        |
| ABB-observability            | OpenTelemetry observability stack     | Tech        |
| ABB-edge                     | Edge / WAF / CDN                      | Tech        |

## Specification per ABB (extract — ABB-customer-identity)

- **Capability:** Authenticate customers, manage profile, capture and propagate consent,
  expose tokens to authorised relying parties.
- **Inputs:** registration data, social IdP tokens, consent declarations.
- **Outputs:** OIDC tokens, ProfileUpdated events, ConsentChanged events.
- **Key NFRs:** 99.95% availability, p95 token issuance ≤ 200ms, EU/UK residency,
  PII tokenised in logs.
- **Linked Compliance Controls:** GDPR-3, GDPR-7, PCI-A8, ISO27001-A.9.

## Dependencies

```
ABB-cloud-landing-zone ──▶ ABB-service-mesh-identity ──▶ {storefront, OMS, CIAM, ...}
ABB-event-streaming    ──▶ {OMS, loyalty, CDP, customer-360}
ABB-customer-identity  ──▶ {storefront, OMS, loyalty, customer-360}
```

## Sourcing Options

| ABB                          | Buy / Build | Why                                            |
| ---------------------------- | ----------- | ---------------------------------------------- |
| ABB-customer-identity        | Buy         | Mature SaaS market, no differentiation in build|
| ABB-order-orchestration      | Build       | Differentiating; Northwind logic is unique     |
| ABB-composable-storefront    | Buy + Build | Buy headless commerce, build journey shells    |
| ABB-real-time-cdp            | Buy         | Mature; good-enough fit                        |
| ABB-event-streaming          | Buy (managed) | MSK already standard                         |
| ABB-cloud-landing-zone       | Build (Terraform) | Already in flight                       |
