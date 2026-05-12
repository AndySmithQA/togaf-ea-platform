---
description: Author the Stakeholder Map — Phase A
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:stakeholders` $ARGUMENTS

# Task
Author the Stakeholder Map for the engagement.

## 1. Resolve engagement context
Standard rules.

## 2. Inputs
- `.togaf/templates/stakeholder-map.template.md`
- RfAW, Vision, SoAW (for stakeholder cues)

## 3. Author
File: `architecture-repository/engagements/{id}/A-stakeholder-map.md`.

Required H2 headings:
- Stakeholder Catalog
- Power vs. Interest Matrix
- Stakeholder Concerns
- Engagement Approach

Conventions:
- Catalog rows: Stakeholder, Role, Power (High/Med/Low), Interest (High/Med/Low).
- Power vs. Interest Matrix as ASCII (not pretty SVG).
- Concerns must be plain English in the stakeholder's voice.

## 4. State
Set `stakeholder-map` document `status: "in-review"`, auto-checks `pass`.

## 5. Next steps
> ✓ Stakeholder Map drafted.  Run `/togaf:scenarios` and `/togaf:comms` next.
