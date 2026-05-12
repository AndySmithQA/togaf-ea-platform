---
description: Author the Solution Building Blocks (SBBs) — Phase E
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:sbbs` $ARGUMENTS

# Task
Map ABBs to concrete vendors / technologies (SBBs).

## 1. Resolve engagement context, read inputs
- `.togaf/templates/solution-building-blocks.template.md`
- E-architecture-building-blocks.md (ABB catalog)
- standards-information-base/* (preferred vendors, mandated standards)
- solutions-landscape/current-solutions.md (existing relationships)

## 2. Author
File: `architecture-repository/engagements/{id}/E-solution-building-blocks.md`.

Required H2 headings:
- SBB Catalog
- Mapping ABB → SBB
- Procurement Notes

Conventions:
- SBB Catalog rows: id, name, vendor/tech, maturity (1–5).
- ABB→SBB mapping shows shortlist + recommended choice per ABB.
- Procurement Notes call out RFP timing, contract levers, existing licences.

## 3. State
Set `solution-building-blocks` `status: "in-review"`, auto-checks `pass`.

## 4. Next steps
> ✓ SBBs drafted. Run `/togaf:tradeoffs` to ratify the choices.
