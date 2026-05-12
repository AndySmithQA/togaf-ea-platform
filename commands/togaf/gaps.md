---
description: Author the Consolidated Gap Analysis — Phase E
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:gaps` $ARGUMENTS

# Task
Aggregate gaps from B/C/D into a single Phase E view, mapped to work packages.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/gap-analysis.template.md`
- B/C/D deliverables (each has its own Gap Analysis section)
- E-architecture-roadmap.md (for work-package references)

## 2. Author
File: `architecture-repository/engagements/{id}/E-gap-analysis.md`.

Required H2 headings:
- Business Gaps
- Data Gaps
- Application Gaps
- Technology Gaps
- Consolidated Gap List
- Mitigation Approach

Conventions:
- Tables map gap → work package.
- Consolidated Gap List counts gaps per domain and identifies critical-path items.
- Mitigation Approach lists sequencing rules (e.g. dual-write/dual-read transitions).

## 3. State
Set `gap-analysis` `status: "in-review"`, auto-checks `pass`.

## 4. Next steps
> ✓ Gap Analysis drafted. Run `/togaf:abbs`, `/togaf:sbbs`, `/togaf:tradeoffs`, `/togaf:canvas`.
