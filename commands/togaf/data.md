---
description: Author the Data Architecture — Phase C (Data)
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Data Architect. Invoked: `/togaf:data` $ARGUMENTS

# Task
Author the Data Architecture (baseline + target + gap) for the engagement.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/data-architecture.template.md`
- RfAW, Vision, B/C/D Assessment, Business Architecture
- `architecture-repository/standards-information-base/data-standards.md` if present

## 2. Author
File: `architecture-repository/engagements/{id}/C-D-data-architecture.md`.

Required H2 headings (in order):
- Baseline Data Architecture
- Target Data Architecture
- Data Entity / Data Component Catalog
- Data Lifecycle Diagram
- Data Migration Diagram
- Gap Analysis

Conventions:
- Catalog rows include Data Product, Owner, Classification (Public/Internal/Confidential/PII/PCI), residency.
- Lifecycle and Migration diagrams as ASCII.
- Be explicit about real-time vs batch boundaries.

## 3. State
Set `data-architecture` `status: "in-review"`, auto-checks `pass`.

## 4. Next steps
> ✓ Data Architecture drafted. Now run `/togaf:application` and `/togaf:technology`.
