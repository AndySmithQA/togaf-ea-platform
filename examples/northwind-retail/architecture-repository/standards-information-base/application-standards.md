# Application Standards

> Owner: Domain Architect (Application) · Status: Approved · Version: 4.0

## Service design

- A service is **owned by exactly one team** and has a published Service Card.
- A service exposes a **versioned, documented API** (OpenAPI 3.1 or Protobuf).
- Internal cross-service calls go through the service mesh; no direct egress.

## Frontend

- Web frontends use the Northwind Design System (`@northwind/ds`).
- Storefronts must score **AA** in Lighthouse Accessibility.
- p95 first contentful paint ≤ 2.0s on a Moto G5 over 3G.

## Resilience

- Every external call has a timeout, retry budget and circuit breaker.
- Idempotency keys required for all state-changing endpoints.
- Sagas (Orchestrated or Choreographed) preferred over distributed transactions.

## Buy/Build heuristic

| Question                                     | If "yes"             | If "no"          |
| -------------------------------------------- | -------------------- | ---------------- |
| Does it differentiate Northwind from rivals? | Build                | Lean toward Buy  |
| Is there a mature SaaS within 30% of fit?    | Buy                  | Build            |
| Does it process or store Restricted data?    | Prefer Build / private SaaS | —         |
