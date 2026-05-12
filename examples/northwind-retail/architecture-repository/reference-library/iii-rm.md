# Integrated Information Infrastructure Reference Model (III-RM)

> Source: TOGAF® Standard, 10th Edition, Reference Models · Tailored 2026-01-30

The III-RM extends the TRM with the **Application** layer (Brokering Applications and
Information Provider/Consumer Applications) and the **Application Platform** layer.
Northwind treats III-RM as the canonical model for **integration** within the digital
storefront capability.

## Pattern map

| III-RM element                       | Northwind pattern                          | Standard reference          |
| ------------------------------------ | ------------------------------------------ | --------------------------- |
| Information Consumer Application     | Web/Mobile storefront, Kiosk, Agent UI     | `application-standards.md`  |
| Information Provider Application     | OMS, PIM, CIAM                             | `application-standards.md`  |
| Brokering Application                | BFF + Storefront API                       | `application-standards.md`  |
| Application Platform                 | Kubernetes + Istio + Kafka                 | `technology-standards.md`   |
| Communications Infrastructure        | AWS VPC + PrivateLink + edge               | `technology-standards.md`   |

## Northwind extensions

Two Northwind-specific patterns are documented as additions to the III-RM:

1. **Event-first integration** — domain events are the primary integration contract.
2. **Customer Data Product** — published, owned, versioned datasets queryable across the org.
