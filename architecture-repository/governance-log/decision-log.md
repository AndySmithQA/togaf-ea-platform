# Architecture Decision Log

Format: ADR-style, append-only.

## ADR-031 — Adopt Apache Kafka as Group event-streaming standard
- **Status:** Accepted, 2025-06-14
- **Context:** Three competing event buses across business units.
- **Decision:** Apache Kafka (AWS MSK) is the Group standard. RabbitMQ retired by Q4 2026.
- **Consequences:** Faster integration, single skill set, migration cost ~£800k.

## ADR-032 — Stagger CIAM rollout per channel rather than big-bang
- **Status:** Accepted, 2025-09-02
- **Context:** Risk of customer-facing disruption.
- **Decision:** Roll out CIAM to web first, then app, then stores, over 14 months.
- **Consequences:** Two parallel identity surfaces during transition; extra integration cost.

## ADR-033 — Composable storefront, not re-platform
- **Status:** Accepted, 2025-11-20
- **Context:** Vendor proposed a £40m re-platform.
- **Decision:** Strangle existing monolith with composable storefront on headless commerce.
- **Consequences:** Slower top-line uplift, lower delivery risk, supports principle B3.

## ADR-034 — Engagement ENG-2026-001 to follow full ADM (P, A–H, RM)
- **Status:** Accepted, 2026-03-10
- **Context:** Strategic, cross-business programme.
- **Decision:** Full ADM cycle, no phase combination, four formal compliance reviews.
