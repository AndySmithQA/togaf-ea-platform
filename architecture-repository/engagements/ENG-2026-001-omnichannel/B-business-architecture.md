# Business Architecture — Omnichannel Customer Experience Programme

> Status: In review · Owner: Daniel Ofori (Domain Architect, Business)

## Baseline Business Architecture

Today, customer experience is delivered through five business capabilities that are owned
and operated independently by the channel they originate in. Identity, basket, order and
loyalty exist as separate operational concerns inside each channel.

### Baseline capabilities (extract)

| Capability                       | Owner unit         | Maturity (1–5) |
| -------------------------------- | ------------------ | :------------: |
| Identify Customer                | Per channel (5×)   | 1              |
| Capture Order                    | Per channel (3×)   | 2              |
| Fulfil Order                     | Group Logistics    | 4              |
| Manage Returns                   | Per channel (3×)   | 2              |
| Recognise & Reward Loyalty       | Loyalty Hub        | 3              |
| Personalise Offer                | CDP (batch)        | 2              |

## Target Business Architecture

A **single set of customer-facing capabilities** is owned at Group level and consumed by
each channel. Channels become presentation/orchestration over shared capability services.

### Target capability map

```
                  ┌────────────────────────────────────────┐
                  │           Customer Experience          │
                  ├────────────────┬─────────────┬────────┤
                  │  Identify      │   Engage    │ Serve  │
                  │  Customer      │   Customer  │ Cust.  │
                  ├────────────────┼─────────────┼────────┤
                  │  Capture       │   Fulfil    │ Manage │
                  │  Order         │   Order     │ Return │
                  ├────────────────┼─────────────┼────────┤
                  │ Recognise &    │ Personalise │ Measure│
                  │ Reward Loyalty │ Offer       │ Outcomes│
                  └────────────────┴─────────────┴────────┘
```

### Target value streams

| Value stream            | Stages                                              |
| ----------------------- | --------------------------------------------------- |
| Discover → Buy          | Browse, Add, Identify, Pay, Confirm                 |
| Receive → Use           | Track, Receive, Activate, Reorder                   |
| Need help → Resolved    | Contact, Authenticate, Diagnose, Resolve            |
| Return → Refund         | Initiate, Authorise, Refund, Restock                |

### Target organisation impacts

- A new **Customer Capability Group** is established under the COO, owning the cross-channel
  customer capabilities. Channels remain in their current units but consume from this group.
- Contact-centre agent role expands to cover any channel.

## Gap Analysis

| Gap                                       | Closure approach                  | Owner          |
| ----------------------------------------- | --------------------------------- | -------------- |
| Five identity stores                      | Consolidate via CIAM              | App Domain     |
| Multi-channel basket / order              | Order Orchestrator + canonical events | App Domain |
| Batch personalisation                     | Real-time CDP                     | Data Domain    |
| Manual return reconciliation              | Real-time return events to OMS    | Bus + App      |
| Channel-specific colleague training       | Cross-channel agent training      | HR + Ops       |
| Cross-channel KPI definition missing      | KPI tree as part of this Programme| Bus Domain     |

## Candidate Roadmap Components

- **WP-B1** Customer Capability Group operating model.
- **WP-B2** Cross-channel agent training programme.
- **WP-B3** Cross-channel KPI tree definition.
- **WP-B4** Customer Advisory Panel cadence formalised quarterly.
