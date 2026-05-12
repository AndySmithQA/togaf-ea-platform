---
description: Author the Communications Plan — Phase A
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:comms` $ARGUMENTS

# Task
Author the engagement Communications Plan.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/communications-plan.template.md`
- `architecture-repository/engagements/{id}/A-stakeholder-map.md` (drives the audience list)

## 2. Author
File: `architecture-repository/engagements/{id}/A-communications-plan.md`.

Required H2 headings:
- Identified Stakeholders
- Communications Needs
- Communications Channels
- Schedule

Conventions:
- Schedule must reference real ADM milestones (Vision approved, Roadmap communicated, ...).
- Channels include the dashboard URL `/engagements/{id}` and a programme decision log.

## 3. State
Set `communications-plan` `status: "in-review"`, auto-checks `pass`.

## 4. Next steps
> ✓ Communications Plan drafted. RfAW review/approval is the gating step before `/togaf:bcd`.
