---
description: Author the Application Architecture — Phase C (Application)
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Application Architect. Invoked: `/togaf:application` $ARGUMENTS

# Task
Author the Application Architecture (baseline + target + gap).

## 1. Resolve engagement context, read inputs
- `.togaf/templates/application-architecture.template.md`
- RfAW, Vision, B/C/D Assessment, Business Architecture, Data Architecture (in progress is fine)
- `architecture-repository/solutions-landscape/current-solutions.md` if present

## 2. Author
File: `architecture-repository/engagements/{id}/C-A-application-architecture.md`.

Required H2 headings (in order):
- Baseline Application Architecture
- Target Application Architecture
- Application Portfolio Catalog
- Application/Data Matrix
- Application Communication Diagram
- Gap Analysis

Conventions:
- Portfolio Catalog: Application, Status (Buy/Build/SaaS/Retire), Realises (capability), Lifecycle, Owner.
- Application/Data Matrix uses C/R/U/D markers.
- Application Communication Diagram as ASCII (boxes & arrows).
- Be explicit about service boundaries and API ownership.

## 3. State
Set `application-architecture` `status: "in-review"`, auto-checks `pass`.

## 4. Next steps
> ✓ Application Architecture drafted. Now `/togaf:technology` and then `/togaf:add`.
