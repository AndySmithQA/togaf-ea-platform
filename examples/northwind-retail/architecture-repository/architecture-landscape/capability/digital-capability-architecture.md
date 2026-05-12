# Capability Architecture — Composable Digital Storefront

> Owner: Domain Architect (Application) · Status: In review · Horizon: 6–18 months

A **point-in-time, solution-focused** architecture for one capability: the composable digital
storefront supporting web, native apps and in-store kiosks.

## Capability statement

Allow a customer or a colleague to discover, configure, price and order any Northwind product
on any device, with consistent state across channels and a 99.95% availability target.

## Component view

```
[ Web ]   [ iOS/Android ]   [ Kiosk ]
   \         |               /
    \        |              /
     ▼       ▼             ▼
       [ Backend-for-Frontend ]
                │
        ┌───────┴────────┐
        ▼                ▼
  [ Storefront API ]  [ CIAM ]
        │
        ▼
[ OMS ] ─▶ [ PIM ] ─▶ [ Pricing ]
        │
        ▼
   [ EventStream (Kafka) ] ──▶ [ CDP ] / [ Loyalty ]
```

## Key non-functionals

| Concern         | Target                                     |
| --------------- | ------------------------------------------ |
| Availability    | 99.95% (rolling 28-day)                    |
| p95 add-to-cart | < 350ms                                    |
| Throughput      | 12,000 RPS peak (Black Friday)             |
| RTO / RPO       | 30 min / 5 min                             |
| Security        | Zero-trust, mTLS between services          |

## Linkage

Realises ABBs `customer-identity`, `composable-storefront`, `order-orchestration`.
Implemented by SBBs in the Phase E catalog of `engagements/ENG-2026-001-omnichannel/`.
