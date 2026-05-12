# Data Architecture — Omnichannel CX Programme

> Status: Draft · Owner: Yuki Tanaka (Domain Architect, Data)

## Baseline Data Architecture

- Customer master record exists in Siebel CRM; copies in five identity stores plus the
  Loyalty Hub. Daily reconciliation job; ~3% records out of sync at any time.
- Order data: SAP ECC (master), Hybris OMS (web), POS DB (stores), Contact-centre CRM.
- Product master in PIM (limited), copied into Hybris and POS by overnight extract.
- Personalisation features computed daily from a clickstream dump.

## Target Data Architecture

- **Single Customer Identity** as the golden record (CIAM-owned).
- **Customer 360** read model assembled from canonical events.
- **Order Lifecycle** events are the only acceptable cross-channel order representation.
- **Product Information** centralised and pushed to channels via real-time sync.
- **Real-time CDP** consuming the event stream; features available within seconds.

## Data Entity / Data Component Catalog (extract)

| Data Entity              | Owner       | Logical component   | Data Product      | Classification |
| ------------------------ | ----------- | ------------------- | ----------------- | -------------- |
| Customer                 | CIAM        | customer-store      | dp.customer       | Confidential   |
| Consent                  | CIAM        | consent-store       | dp.consent        | Confidential   |
| Order                    | OMS         | order-store         | dp.order          | Confidential   |
| OrderLine                | OMS         | order-store         | dp.order-line     | Internal       |
| Product                  | PIM         | product-store       | dp.product        | Public         |
| InventoryPosition        | OMS         | inventory-store     | dp.inventory      | Internal       |
| LoyaltyAccount           | Loyalty Hub | loyalty-store       | dp.loyalty        | Confidential   |
| InteractionEvent         | CDP         | event-store         | dp.interactions   | Confidential   |

## Data Lifecycle Diagram

```
[ Source system ] ──emits──▶ [ Domain event on Kafka ]
       │                                │
       ▼                                ▼
 [ Operational store ]           [ Schema Registry ]
       │                                │
       ▼                                ▼
 [ Data Product API ]           [ Lakehouse (parquet) ]
       │                                │
       ▼                                ▼
 [ Online consumer ]              [ Offline consumer ]
```

## Data Migration Diagram

```
[ Siebel CRM ] ─dual-write─▶ [ CIAM ] ─writes─▶ [ Customer Data Product ]
                                  ▲
                                  └─reconciliation─▶ until cutover (Q3 2027)
```

## Gap Analysis

| Gap                                              | Closure                                     |
| ------------------------------------------------ | ------------------------------------------- |
| No golden customer record                        | CIAM + match/merge service                  |
| Order is fragmented per channel                  | Canonical order stream from new OMS         |
| Inventory is overnight-batch                     | Real-time inventory events                  |
| Personalisation features stale by 5–7 days       | Real-time feature pipeline                  |
| No published Data Product contracts              | Each Data Entity gets a versioned contract  |
| PII spread across non-EU regions in some SaaS    | Migrate or replace; audit per system        |
