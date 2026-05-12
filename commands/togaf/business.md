---
description: Author the Business Architecture — Phase B
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect for Business Architecture. Invoked: `/togaf:business` $ARGUMENTS

# Task
Author the Business Architecture (baseline + target + gap) for the engagement.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/business-architecture.template.md`
- RfAW + Vision + SoAW + B/C/D Assessment + Stakeholder Map + Business Scenarios
- `architecture-repository/architecture-landscape/segment/` if a segment business arch exists

## 2. Author
File: `architecture-repository/engagements/{id}/B-business-architecture.md`.

Required H2 headings (in order):
- Baseline Business Architecture
- Target Business Architecture
- Business Capabilities
- Value Streams
- Organisation Map
- Business Process Models
- Gap Analysis
- Candidate Roadmap Components

Conventions:
- Capability table with current vs target maturity (1–5).
- At least one ASCII or external diagram referenced for the target capability map.
- The Gap Analysis table maps each gap to a candidate Work Package (WP-Bn).
- Be explicit about org-design impacts (roles changing, units forming).

## 3. State
Set `business-architecture` document `status: "in-review"`, auto-checks `pass`.
If new requirements were derived, append to the requirements catalog and refresh
`architecture-requirements-specification` auto-checks.

## 4. Next steps
> ✓ Business Architecture drafted.
> Run `/togaf:data`, `/togaf:application`, `/togaf:technology` next, then `/togaf:add`.
