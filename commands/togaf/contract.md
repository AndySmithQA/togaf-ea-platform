---
description: Author the Architecture Contract — Phase G
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:contract` $ARGUMENTS

# Task
Author the **Architecture Contract** between the EA function and the delivery organisations.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/architecture-contract.template.md`
- ADD, Roadmap, I&M Plan, Governance Model, Requirements catalog, Principles

## 2. Author
File: `architecture-repository/engagements/{id}/G-architecture-contract.md`.

Required H2 headings:
- Introduction and Background
- Nature of Agreement
- Scope of Architecture
- Architecture and Strategic Principles and Requirements
- Conformance Requirements
- Architecture Development and Management Process and Roles
- Target Architecture Measures
- Defined Phases of Deliverables
- Prioritised Joint Workplan
- Time Window(s)
- Architecture Delivery and Business Metrics

Conventions:
- Reference: AC-NNN in `governance-log/architecture-contracts.md` — also append a row there.
- Conformance Requirements list 30/80/100% ACR + standards conformance + waiver requirement.
- Target Measures must be quantitative (e.g. "AR-x..AR-y demonstrably tested before sign-off").
- Time Windows tie to Roadmap milestones.

## 3. State
Set `architecture-contract` `status: "in-review"`, auto-checks `pass`.
Also append a record to `architecture-repository/governance-log/architecture-contracts.md`
(create the file if missing).

## 4. Next steps
> ✓ Architecture Contract drafted.  Run `/togaf:compliance` to define ACR rubric.
