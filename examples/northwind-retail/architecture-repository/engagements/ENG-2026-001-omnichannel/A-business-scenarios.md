# Business Scenarios — Omnichannel Customer Experience Programme

> Engagement: **ENG-2026-001-omnichannel** · Owner: Daniel Ofori (Domain Architect, Business)

Three scenarios are documented; each follows the TOGAF Business Scenario method.

---

## Scenario 1 — Cross-channel basket completion

### Problem
A customer adds items to their basket on the iOS app at lunchtime, then wants to complete
the purchase from the contact centre on the way home. Today, the basket is lost; the agent
must rebuild it manually.

### Business and Technical Environment
- App and contact-centre CRM use different identity stores.
- Basket state is held in browser/app local state only.
- No event indicating "basket abandoned" is published.

### Objectives
- Enable seamless basket pickup across web, app, store and contact centre.
- No more than 1 customer step (consent confirmation) between channels.

### Human Actors and Their Place in the Problem
- **Customer** — primary, expects continuity.
- **Contact-centre Agent** — must see and pick up the customer's basket.
- **Store Colleague** — should be able to do the same in-store.

### Computer Actors and Their Place in the Problem
- App / Web / Kiosk / POS — basket capture.
- CIAM — identifies the customer.
- Storefront API — owns the basket aggregate.
- Order Orchestrator — converts basket → order.

### Roles, Responsibilities and Measures of Success
| Actor          | Responsibility                  | Measure                          |
| -------------- | ------------------------------- | -------------------------------- |
| Customer       | Identifies on each channel      | NPS uplift                        |
| Agent          | Resumes basket in single click  | Handle time −20%                  |
| Storefront API | Persists basket centrally       | Basket-resume success ≥ 99%       |

### Specific Requirements
- AR-100, AR-103, AR-104 (catalog).

---

## Scenario 2 — Inventory propagation after store return

### Problem
A customer returns a product to a store. Today the warehouse system updates 24h later;
during that time, e-com may sell the same physical unit again, leading to oversells.

### Business and Technical Environment
- POS records returns but writes to its own store DB.
- Nightly batch reconciles to SAP ECC; e-com inventory then refreshes.

### Objectives
- Inventory updates within 60 seconds of a return acceptance.

### Human Actors and Their Place in the Problem
- Store Colleague (initiates return).
- E-com Customer (impacted if oversold).

### Computer Actors and Their Place in the Problem
- POS, Order Orchestrator, OMS, Stockfile, Storefront catalog cache.

### Roles, Responsibilities and Measures of Success
| Actor                | Responsibility            | Measure                       |
| -------------------- | ------------------------- | ----------------------------- |
| POS                  | Publish return event      | Event published < 5s          |
| Order Orchestrator   | Update OMS                | < 30s end-to-end              |
| Storefront catalog   | Reflect in availability   | < 60s end-to-end              |

### Specific Requirements
- AR-101 (catalog).

---

## Scenario 3 — Loyalty status visible at the till

### Problem
A loyalty member is at the till; the colleague does not know they are eligible for a £5
voucher because the loyalty system is checked only at end-of-day batch.

### Business and Technical Environment
- POS uses last-night's loyalty extract.
- New loyalty actions during the day are invisible to the till.

### Objectives
- Loyalty status (incl. unredeemed offers) visible in < 200ms at the till.

### Human Actors and Their Place in the Problem
- Customer, Store Colleague.

### Computer Actors and Their Place in the Problem
- POS, Loyalty Hub, CIAM, Customer 360 read model.

### Roles, Responsibilities and Measures of Success
| Actor          | Responsibility                | Measure                                 |
| -------------- | ----------------------------- | --------------------------------------- |
| POS            | Issue real-time lookup        | p95 < 200ms                              |
| Loyalty Hub    | Expose API + events           | Availability ≥ 99.95%                    |
| Customer 360   | Aggregate read model          | Lag from event ≤ 2s                      |

### Specific Requirements
- AR-104 (catalog).
