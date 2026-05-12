---
description: Set or refresh the enterprise's Architecture Principles
argument-hint: "[--seed]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:principles` $ARGUMENTS

# Task
Set or refresh `architecture-repository/architecture-capability/architecture-principles.md`.

## 1. Read inputs
- `.togaf/templates/architecture-principles.template.md`
- The current principles file if it exists (do not lose existing principles unless the
  user explicitly says to replace them).
- The Group's strategic plan / mission if available (RfAW points to it).

## 2. Behaviour

If `--seed` or the file is empty / template-only:
- Author 6–10 starter principles, **2 per domain** (Business / Data / Application / Technology),
  using the TOGAF format: **Name / Statement / Rationale / Implications**.
- Number them with stable refs: B1, B2, D1, D2, A1, A2, T1, T2, ...

Otherwise:
- Have a short conversation with the user, asking which principles to add, edit or retire.
- Preserve refs of existing principles. Mark retired ones as `> Retired: <date> — <reason>`.

## 3. Write
Update `architecture-repository/architecture-capability/architecture-principles.md`. Use
the template's section structure (Business / Data / Application / Technology Principles).

## 4. Show next steps

> ✓ Architecture Principles updated.
> Re-run any deliverable's `/togaf:<phase-cmd>` to refresh references to principles, and
> ratify the new set with the Architecture Board.
