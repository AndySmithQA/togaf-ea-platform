---
description: Author the Implementation and Migration Plan — Phase F
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:migration` $ARGUMENTS

# Task
Author the **Implementation and Migration Plan** for the engagement.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/implementation-and-migration-plan.template.md`
- Roadmap, Gap Analysis, ABBs, SBBs, Trade-off Analysis
- Business Architecture (org-design impacts), Application & Data Architectures (cutovers)

## 2. Author
File: `architecture-repository/engagements/{id}/F-implementation-and-migration-plan.md`.

Required H2 headings:
- Implementation Strategy
- Project Charters
- Work Package Sequencing
- Cost / Benefit / Risk Per Project
- Resource Requirements
- Migration Approach

Conventions:
- Strategy explicitly addresses dual-running, rollback, freeze windows (e.g. peak trading).
- Charters per WP-NN with Outcome/Owner/Funding/Dependencies/Assumptions/ACR gates.
- Sequencing references the Roadmap timeline; identify the critical path.
- Cost/Benefit/Risk uses a 1–9 risk score (probability × impact).
- Migration Approach covers identity, orders/data, storefront/UX, POS/store, etc., as relevant.

## 3. State
Set `implementation-and-migration-plan` `status: "in-review"`, auto-checks `pass`.

## 4. Next steps
> ✓ I&M Plan drafted. Move to Phase G: `/togaf:governance`, `/togaf:contract`, `/togaf:compliance`.
