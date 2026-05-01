# Application Architecture — Omnichannel CX Programme

> Status: Draft · Owner: Aisha Rahman (Domain Architect, Application)

## Baseline Application Architecture

- Hybris monolith hosting storefront, OMS, basket, pricing.
- Siebel CRM hosting customer records, contact-centre interface.
- Loyalty Hub (in-house Java app) integrated by nightly extracts.
- Salesforce Service Cloud for service desk.
- 11 channel-specific micro-frontends; no shared design system.

## Target Application Architecture

- **Composable Storefront** (headless commerce + BFF) replaces Hybris storefront.
- **Order Orchestrator (OMS)** as a stand-alone service, decomposed from Hybris.
- **CIAM** as the only customer identity surface.
- **Customer 360 read API** assembled from canonical events.
- **Loyalty Hub** exposes versioned API + events; no batch.
- **POS and Kiosk** call the same Storefront/Orders APIs as web/app.

## Application Portfolio Catalog (extract)

| Application                     | Status     | Realises                          | Lifecycle  |
| ------------------------------- | ---------- | --------------------------------- | ---------- |
| Hybris Commerce                 | Strangle   | Legacy storefront/OMS             | Retire-2027|
| Headless Commerce (vendor TBC)  | Plan       | Composable storefront             | Trial      |
| Order Orchestrator (build)      | Plan       | Order lifecycle                   | Build      |
| CIAM (vendor TBC)               | Plan       | Customer Identity                 | Trial      |
| Loyalty Hub                     | Live       | Recognise & Reward                | Live       |
| Customer 360 Read API           | Plan       | Single Customer View              | Build      |
| Salesforce Service Cloud        | Live       | Serve Customer (call centre)      | Live       |
| POS (Java)                      | Modify     | Stores transactions               | Modify     |

## Application/Data Matrix

| App ↓ / Data →             | Customer | Consent | Order | Product | Inventory | Loyalty |
| -------------------------- | :------: | :-----: | :---: | :-----: | :-------: | :-----: |
| Composable Storefront      | R        | R       | C/R   | R       | R         | R       |
| Order Orchestrator         | R        | R       | C/U/D | R       | C/U       | R       |
| CIAM                       | C/U/D    | C/U/D   | —     | —       | —         | —       |
| Loyalty Hub                | R        | R       | R     | R       | —         | C/U/D   |
| Customer 360               | R        | R       | R     | R       | R         | R       |
| POS                        | R        | R       | C     | R       | R         | R       |

C=Create R=Read U=Update D=Delete

## Application Communication Diagram

```
                          ┌──────────┐
                          │   CIAM   │
                          └────┬─────┘
                               │ OIDC
              ┌──────┬─────────┼─────────┬──────────┐
              ▼      ▼         ▼         ▼          ▼
           [Web]  [App]      [BFF]     [POS]    [Kiosk]
                                │
                                ▼
                       [ Storefront API ]
                                │
                                ▼
                       [ Order Orchestrator ]
                       │           │           │
                       ▼           ▼           ▼
                    [ PIM ]     [ OMS ]    [ Pricing ]
                                  │
                                  ▼
                          [ Kafka events ]
                       │           │
                       ▼           ▼
                  [ Loyalty ]   [ CDP ]
```

## Gap Analysis

| Gap                                       | Closure                            |
| ----------------------------------------- | ---------------------------------- |
| Storefront tightly coupled to Hybris      | Headless commerce + BFF            |
| OMS embedded in Hybris                    | Stand-alone OMS service            |
| 5 identity surfaces                       | One CIAM                           |
| 11 micro-frontends, no design system      | Adopt @northwind/ds, BFF pattern   |
| POS uses overnight loyalty extract        | Loyalty Hub real-time API          |
| No canonical OrderEvent                   | Define + publish via Kafka         |
