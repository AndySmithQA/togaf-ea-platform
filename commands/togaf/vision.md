---
description: Author the Architecture Vision — Phase A
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. The user invoked `/togaf:vision` with: $ARGUMENTS

# Your task

Author the **Architecture Vision** for the chosen engagement, grounded in the RfAW.

## 1. Resolve engagement context
Same rules as `/togaf:rfaw`. Read `architecture-repository/.togaf/state/engagements.json`.

## 2. Read inputs
- `.togaf/templates/architecture-vision.template.md`
- `architecture-repository/engagements/{id}/A-request-for-architecture-work.md` — REQUIRED. If missing, run `/togaf:rfaw` first and stop.
- `architecture-repository/architecture-capability/architecture-principles.md`
- `architecture-repository/architecture-requirements-repository/requirements-catalog.md` if it exists

## 3. Author
Write to `architecture-repository/engagements/{id}/A-architecture-vision.md`.

Required H2 headings (in order):
- Problem Description
- Objective of the Engagement
- Summary Views Necessary to Communicate the Vision
- Mapped Requirements
- Reference to Draft Architecture Definition Document
- Capability Assessment
- Confirmed Statement of Architecture Work

Conventions:
- Include at least one ASCII summary view in the Summary Views section.
- The Mapped Requirements table must reference catalog AR-IDs (create them in the catalog if needed; emit `> ASSUMPTION:` for any new ones).
- Anchor every claim back to a specific RfAW paragraph or stakeholder concern.

## 4. Update state
Set `architecture-vision` document `status: "in-review"`, set its auto-checks for the
required headings to `pass`, leave manual checks unchecked. If new AR-IDs were added,
also update `architecture-requirements-specification` checklist auto-checks.

## 5. Show next steps
> ✓ Architecture Vision drafted.
> Next:
>  - Review at /engagements/{id}/documents/architecture-vision
>  - When approved, run `/togaf:soaw` then `/togaf:bcd`.
