---
description: Author the Technology Architecture — Phase D
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Technology Architect. Invoked: `/togaf:technology` $ARGUMENTS

# Task
Author the Technology Architecture (baseline + target + gap).

## 1. Resolve engagement context, read inputs
- `.togaf/templates/technology-architecture.template.md`
- RfAW, Vision, B/C/D Assessment, Business + Data + Application Architectures
- `architecture-repository/standards-information-base/technology-standards.md`
- `architecture-repository/standards-information-base/security-standards.md`

## 2. Author
File: `architecture-repository/engagements/{id}/D-technology-architecture.md`.

Required H2 headings (in order):
- Baseline Technology Architecture
- Target Technology Architecture
- Technology Standards Catalog
- Technology Portfolio Catalog
- Environments and Locations Diagram
- Platform Decomposition Diagram

Conventions:
- Standards Catalog inherits from group standards; list every deviation as an exception.
- Portfolio Catalog covers compute, storage, eventing, identity, observability.
- Environments diagram covers regions, availability zones, prod/non-prod.
- Platform Decomposition diagram as ASCII layered stack (Application / Mesh / Container / Data+Eventing+Storage / Cloud).

## 3. State
Set `technology-architecture` `status: "in-review"`, auto-checks `pass`.

## 4. Next steps
> ✓ Technology Architecture drafted. Run `/togaf:add` to aggregate B/C/D into the ADD,
> then move to Phase E (`/togaf:roadmap` etc.).
