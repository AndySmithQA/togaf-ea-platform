---
description: Author the Architecture Building Blocks (ABBs) — Phase E
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:abbs` $ARGUMENTS

# Task
Define Architecture Building Blocks — technology-neutral capability descriptions.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/architecture-building-blocks.template.md`
- ADD + B/C/D + Roadmap

## 2. Author
File: `architecture-repository/engagements/{id}/E-architecture-building-blocks.md`.

Required H2 headings:
- ABB Catalog
- Specification per ABB
- Dependencies
- Sourcing Options

Conventions:
- ABB-IDs: ABB-1, ABB-2, ... grouped by domain (Identity, Catalog, Pricing, Order, Inventory, Comms, ...).
- Each ABB spec includes Capability, Inputs, Outputs, Key NFRs, Linked Compliance Controls.
- Dependencies as ASCII directed graph (`A ──▶ B`).
- Sourcing Options: Buy / Build / SaaS, with rationale.

## 3. State
Set `architecture-building-blocks` `status: "in-review"`, auto-checks `pass`.

## 4. Next steps
> ✓ ABBs drafted. Map them to vendors/tech in `/togaf:sbbs`.
