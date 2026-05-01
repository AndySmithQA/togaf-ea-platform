# Architecture Requirements Catalog

Catalog of architecture requirements traced to engagements and stakeholders.

| Ref      | Statement                                                              | Source         | Engagement       | Status     |
| -------- | ---------------------------------------------------------------------- | -------------- | ---------------- | ---------- |
| AR-100   | Customers must be able to start a basket on one channel and finish it on another within 24 hours. | Vision A.1 | ENG-2026-001 | Approved |
| AR-101   | A returned item must update inventory across all channels within 60 seconds. | RfAW §4 | ENG-2026-001 | Approved |
| AR-102   | All customer PII processing must remain in the EU/UK. | Principle D3 + GDPR | All | Standing |
| AR-103   | Storefront p95 add-to-cart latency ≤ 350ms. | Capability NFR | ENG-2026-001 | Approved |
| AR-104   | Loyalty status must be visible to colleagues at the till in < 200ms. | Stakeholder concern | ENG-2026-001 | Approved |
| AR-105   | Migration must support a graceful rollback per work package. | Principle B3 | All | Standing |
| AR-106   | All new services must emit OpenTelemetry traces. | Principle T3 | All | Standing |
| AR-107   | The OMS must support 12,000 RPS peak with no degradation. | Capability NFR | ENG-2026-001 | Approved |
| AR-108   | Consent revocation must propagate within 24h. | Segment principle | All | Standing |
