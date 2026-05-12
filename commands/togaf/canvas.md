---
description: Author the Business Model Canvas — Phase E
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:canvas` $ARGUMENTS

# Task
Author the **Business Model Canvas** that links the SoAW + Vision + Change Requests
to the operating model and economics.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/business-models.template.md`
- RfAW + Vision + SoAW + Roadmap + Trade-off Analysis
- H-change-requests.md if any CRs exist

## 2. Author
File: `architecture-repository/engagements/{id}/E-business-models.md`.

Required H2 headings (the 9 BMC blocks plus closing sections):
- Customer Segments
- Value Propositions
- Channels
- Customer Relationships
- Revenue Streams
- Key Resources
- Key Activities
- Key Partnerships
- Cost Structure
- Linked Architecture Outcomes

Conventions:
- Revenue Streams must include a row "Lift attributable to programme" with a quantified
  contribution to the goals stated in the RfAW.
- Cost Structure breaks down Build / Run / Decommission / Training & change / Risk reserve
  for the agreed planning horizon (typically 3 years).
- Linked Architecture Outcomes table maps each programme outcome → TOGAF deliverable that
  evidences it.

## 3. State
Set `business-models` `status: "in-review"`, auto-checks `pass`. The dashboard's
/business-models page reads this file.

## 4. Next steps
> ✓ Business Model Canvas drafted.  Move to Phase F: `/togaf:migration`.
