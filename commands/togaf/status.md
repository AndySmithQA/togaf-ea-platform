---
description: Print the current ADM RAG status for the active engagement(s)
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:status` $ARGUMENTS

# Task
Read engagement state and print a concise ADM status report.

## 1. Read state
Open `architecture-repository/.togaf/state/engagements.json`. If `--engagement <id>` is
given, focus on that one. Otherwise summarise every engagement.

## 2. For each engagement, compute and print

- Header line: `<name> (<id>) · active phase <X> · sponsor <S>`
- For every ADM phase that has at least one deliverable in this engagement, print one row:
  - Phase letter
  - RAG status:
    - **GREEN** if every deliverable in that phase is `approved`
    - **AMBER** if at least one is in any drafted state but not all approved
    - **RED** if there are deliverables but none drafted, AND the engagement's
      `activePhase` is at or after this phase
    - **GREY** otherwise (not yet active, no work expected)
  - `<approved>/<total> approved`
  - `<missing>` count if any deliverables are missing entirely

- Then print a per-document table (one row per deliverable) with: phase, id, status, signoff (✓/–), auto-check pass count, manual-check pass count.

- Conclude with one line: `Next recommended command:` and a single `/togaf:<...>` suggestion based on the lowest-numbered phase that is still RED or AMBER for this engagement.

## 3. Do not modify any state files.

This command is read-only.
