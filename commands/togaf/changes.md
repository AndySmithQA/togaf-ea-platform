---
description: Author / refresh the Change Requests register — Phase H
argument-hint: "[--engagement <id>] [--add 'CR title']"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:changes` $ARGUMENTS

# Task
Maintain the engagement's **Change Requests** register — the Phase H feed-back loop.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/change-requests.template.md`
- Existing `H-change-requests.md` if present
- ADD, Roadmap (so the impact assessment can ground itself)

## 2. Behaviour
- If `--add 'title'` is provided, append a new CR row in **Pending** with today's date.
  Otherwise refresh / re-author the whole document, preserving any existing rows verbatim.

## 3. Author
File: `architecture-repository/engagements/{id}/H-change-requests.md`.

Required H2 headings:
- Change Request Catalog
- Classification (Simplification / Incremental / Re-architecting)
- Impact Assessment
- Recommended Action

Conventions:
- Catalog: Ref (CR-001..), Submitted date, Title, Status (Pending/Accepted/Deferred/Rejected).
- For each CR, include a short Impact Assessment paragraph.
- Recommended Action enumerates the three possible outcomes: Accept (this cycle),
  Defer (new RfAW), Reject (with rationale recorded in `governance-log/decision-log.md`).

## 4. State
Set `change-requests` `status: "in-review"`, auto-checks `pass`.
For any newly recorded CR, also append an ADR-style entry to
`architecture-repository/governance-log/decision-log.md` capturing the decision context.

## 5. Next steps
> ✓ Change Requests register updated.
> Use the dashboard / engagements / RfAW review page to act on Pending items.
