---
description: Author the Architecture Definition Document (ADD) — Phase B aggregator
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:add` $ARGUMENTS

# Task
Author the **Architecture Definition Document** — the living aggregator across B/C/D.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/architecture-definition-document.template.md`
- RfAW, Vision, SoAW
- B-business-architecture.md, C-D-data-architecture.md, C-A-application-architecture.md, D-technology-architecture.md (warn if any are missing)
- `architecture-capability/architecture-principles.md`
- `architecture-requirements-repository/requirements-catalog.md`
- `governance-log/decision-log.md`

## 2. Author
File: `architecture-repository/engagements/{id}/B-architecture-definition-document.md`.

Required H2 headings (in order):
- Scope
- Goals, Objectives, and Constraints
- Architecture Principles
- Baseline Architecture
- Target Architecture
- Architecture Models (Business, Data, Application, Technology)
- Rationale and Justification
- Mapping to Architecture Repository
- Gap Analysis
- Impact Assessment

Conventions:
- DO NOT duplicate per-domain content — link to the source files.
- The Rationale section explains WHY the target was chosen vs alternatives. Reference
  `E-trade-off-analysis.md` if it already exists.
- Impact Assessment table is honest: orgs, vendors, talent, customers.

## 3. State
Set `architecture-definition-document` `status: "in-review"`, auto-checks `pass`.

## 4. Next steps
> ✓ ADD drafted. Phase B/C/D content is now consolidated.
> Move to Phase E:
>   /togaf:roadmap   /togaf:gaps   /togaf:abbs   /togaf:sbbs
>   /togaf:tradeoffs   /togaf:canvas
