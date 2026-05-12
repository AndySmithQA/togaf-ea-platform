---
description: Author the Architecture Roadmap — Phase E
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:roadmap` $ARGUMENTS

# Task
Author the **Architecture Roadmap**: work packages, transition architectures, and timeline.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/architecture-roadmap.template.md`
- ADD + per-domain Phase B/C/D outputs
- B/C/D Assessment

## 2. Author
File: `architecture-repository/engagements/{id}/E-architecture-roadmap.md`.

Required H2 headings (in order):
- Work Packages
- Transition Architectures
- Implementation Factor Assessment & Deduction Matrix
- Consolidated Gaps, Solutions, and Dependencies Matrix
- Timeline

Conventions:
- Each work package: ref (WP-NN), name, phase entry, phase exit, cost.
- At least 2 Transition Architectures (TA-1, TA-2) with a clear capability achieved per TA.
- Implementation Factor table covers risk, dependencies, capability gaps.
- Timeline as ASCII Gantt-ish across quarters.

## 3. State
Set `architecture-roadmap` `status: "in-review"`, auto-checks `pass`.

## 4. Next steps
> ✓ Roadmap drafted. Author `/togaf:gaps`, `/togaf:abbs`, `/togaf:sbbs`,
> `/togaf:tradeoffs`, `/togaf:canvas` next.
