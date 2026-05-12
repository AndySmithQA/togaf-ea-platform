---
description: Author Business Scenarios — Phase A
argument-hint: "[--engagement <id>] [--count 3]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:scenarios` $ARGUMENTS

# Task
Author 2–4 Business Scenarios that crystallise the top business problems the architecture
will solve. Use the TOGAF Business Scenarios method.

## 1. Resolve engagement context
Standard rules.

## 2. Inputs
- `.togaf/templates/business-scenarios.template.md`
- RfAW + Vision

## 3. Author
File: `architecture-repository/engagements/{id}/A-business-scenarios.md`.

Required H2 headings (per scenario):
- Problem
- Objectives
- Specific Requirements

Each scenario also includes (recommended H3s): Business and Technical Environment, Human
Actors and Their Place in the Problem, Computer Actors and Their Place in the Problem,
Roles Responsibilities and Measures of Success.

Conventions:
- One scenario per H2 group `## Scenario N — <title>` with the Required H2 headings nested.
  When auto-checks scan, the **first** occurrence of each Required heading suffices.
- Each scenario must reference at least one AR-ID from the requirements catalog.
- Be concrete — name actors, name systems.

## 4. State
Set `business-scenarios` `status: "in-review"`, auto-checks `pass`.

## 5. Next steps
> ✓ Business Scenarios drafted. Run `/togaf:comms` next, then `/togaf:bcd`.
