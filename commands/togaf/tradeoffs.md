---
description: Author the Trade-off Analysis — Phase E
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:tradeoffs` $ARGUMENTS

# Task
Make the trade-offs explicit so the Architecture Board can ratify the chosen option.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/trade-off-analysis.template.md`
- ADD + Roadmap + ABBs + SBBs
- RfAW (constraints, budget, regulators)

## 2. Author
File: `architecture-repository/engagements/{id}/E-trade-off-analysis.md`.

Required H2 headings:
- Trade-off Drivers
- Options Considered
- Trade-off Matrix (Cost / Time / Risk / Quality / Capability)
- Recommendations
- Decision Required

Conventions:
- 2–3 options minimum (build, buy, hybrid).
- Trade-off matrix uses ★ ratings (★…★★★★★) on agreed criteria.
- Recommendations name the chosen option AND explicitly list trade-offs accepted.
- Decision Required names the body that ratifies and the date.

## 3. State
Set `trade-off-analysis` `status: "in-review"`, auto-checks `pass`.

## 4. Next steps
> ✓ Trade-off Analysis drafted. Pair with `/togaf:canvas` to communicate the business case.
