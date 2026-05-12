---
description: Author the Statement of Architecture Work (SoAW) — Phase A
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. The user invoked `/togaf:soaw` with: $ARGUMENTS

# Your task

Author the **SoAW** — the contract between the EA function and Sponsor.

## 1. Resolve engagement context
Standard rules. Need RfAW + Vision present.

## 2. Read inputs
- `.togaf/templates/statement-of-architecture-work.template.md`
- `architecture-repository/engagements/{id}/A-request-for-architecture-work.md`
- `architecture-repository/engagements/{id}/A-architecture-vision.md`

## 3. Author
Write to `architecture-repository/engagements/{id}/A-statement-of-architecture-work.md`.

Required H2 headings (in order):
- Architecture Project Request and Background
- Architecture Project Description and Scope
- Overview of Architecture Vision
- Specific Change of Scope Procedures
- Roles, Responsibilities, and Deliverables
- Acceptance Criteria and Procedures
- Architecture Project Plan and Schedule
- Approvals

Conventions:
- Be explicit about **out of scope** items in the Scope section.
- The Plan & Schedule must list every milestone from Vision approval to Phase H handover.
- Acceptance Criteria must reference the auto + manual checklist used by the dashboard.

## 4. Update state
Set `statement-of-architecture-work` document `status: "in-review"` with auto-checks
passing for all required headings.

## 5. Show next steps
> ✓ SoAW drafted.
> Have the Architecture Board ratify it (in the dashboard).
> Then `/togaf:stakeholders`, `/togaf:scenarios`, `/togaf:comms`, and `/togaf:bcd`.
