---
description: Author the Implementation Governance Model — Phase G
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:governance` $ARGUMENTS

# Task
Author the engagement's **Implementation Governance Model**.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/implementation-governance-model.template.md`
- I&M Plan, ADD, Architecture Principles
- `architecture-capability/architecture-governance-framework.md`

## 2. Author
File: `architecture-repository/engagements/{id}/G-implementation-governance-model.md`.

Required H2 headings:
- Governance Processes
- Governance Organisation Structure
- Governance Roles and Responsibilities
- Governance-Related Standards

Conventions:
- Processes table covers ACR (30/80/100% + post-go-live), Change Request, Principle Waiver, Standards Exception.
- Org Structure shown as ASCII tree from Architecture Board down to Solution Architects.
- Roles & Responsibilities cover Lead EA, Programme Architecture Council, Compliance WG, Architecture Board, Programme Director.
- Standards section lists the ACR rubric, ADR format, waiver and exception templates.

## 3. State
Set `implementation-governance-model` `status: "in-review"`, auto-checks `pass`.

## 4. Next steps
> ✓ Governance Model drafted.  Run `/togaf:contract` and `/togaf:compliance` next.
