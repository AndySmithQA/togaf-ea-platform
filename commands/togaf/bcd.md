---
description: Auto-assess what is needed at Phases B/C/D after RfAW approval
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. The user invoked `/togaf:bcd` with: $ARGUMENTS

# Your task

Derive a concrete **B/C/D assessment**: what work, decisions, deliverables and risks the
architect will need to handle in Phase B (Business), Phase C (Data + Application) and
Phase D (Technology) for this engagement. This produces both:

1. A markdown summary the EA function can review and tailor.
2. A structured `bcdAssessment` block in engagement state, used by the dashboard.

## 1. Resolve engagement context

Standard rules. Require RfAW + Vision present (run `/togaf:rfaw` and `/togaf:vision` first
otherwise). Note whether `rfawApproved` is `true` in state — warn (do not block) if not.

## 2. Read inputs

- `architecture-repository/engagements/{id}/A-request-for-architecture-work.md`
- `architecture-repository/engagements/{id}/A-architecture-vision.md`
- `architecture-repository/engagements/{id}/A-statement-of-architecture-work.md` (if present)
- `architecture-repository/architecture-capability/architecture-principles.md`
- `architecture-repository/standards-information-base/*.md`
- Existing `bcdAssessment` block in state (don't lose user edits)

## 3. Derive items

For each phase B, C-A (Application), C-D (Data) and D, list:
- **Decisions** the architect must make
- **Deliverables** to produce or refresh
- **Risks** that the architect must mitigate
- **Stakeholders** to engage

Be specific to the engagement — don't emit generic boilerplate. Anchor each item in a
specific RfAW or Vision section.

## 4. Write a summary deliverable

File: `architecture-repository/engagements/{id}/A-bcd-assessment.md`.

Structure:
```
# Phase B/C/D Assessment — <engagement name>

> Derived: <ISO> · Approved RfAW: <yes/no>

## Phase B — Business Architecture
### Key decisions
- ...
### Deliverables
- ...
### Risks
- ...
### Stakeholders
- ...

## Phase C — Application Architecture
(same)

## Phase C — Data Architecture
(same)

## Phase D — Technology Architecture
(same)
```

## 5. Update state

In `engagements.json` for this engagement, update `bcdAssessment` to match the schema
that the dashboard consumes:

```json
{
  "generatedFrom": { "rfaw": "<rfaw filename>", "vision": "<vision filename>" },
  "generatedAt": "<ISO>",
  "business":    [ { "title": "...", "rationale": "...", "effort": "S|M|L", "risk": "low|medium|high" } ],
  "data":        [ /* same shape */ ],
  "application": [ /* same shape */ ],
  "technology":  [ /* same shape */ ],
  "notes": "<one-paragraph executive summary>"
}
```

Make every `title` and `rationale` specific to the engagement (not generic boilerplate).

Do NOT change the `status` of any other deliverable. This command is a planning step.

## 6. Show next steps

> ✓ B/C/D assessment derived.
> View it at /engagements/{id}/rfaw  (and the per-phase pages).
> Author phase deliverables next:
>   /togaf:business
>   /togaf:data        /togaf:application        /togaf:technology
>   /togaf:add  (aggregator — run last in B/C/D)
