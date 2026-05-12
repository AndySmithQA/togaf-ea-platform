---
description: Re-evaluate auto-checks across every deliverable for an engagement
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:check` $ARGUMENTS

# Task
Re-evaluate the **automatic** checklist items for every deliverable in the chosen
engagement(s). Manual checks are NEVER changed by this command.

## 1. Resolve engagement context
Standard rules. Without `--engagement`, run for every engagement in state.

## 2. For each deliverable

- Open the file at `architecture-repository/engagements/{id}/{filename}` if it exists.
  - If missing: set every `auto-*` checklist item `checked: false`, `autoResult: "fail"`.
- For each `kind: "auto"` item with a `requiredHeading`:
  - PASS if a markdown heading (any of `#`..`######`) with that exact text appears in the body.
  - Otherwise FAIL.
  - Update `checked` and `autoResult` accordingly.
- Document `status` rules:
  - if body is empty → `missing`
  - else if `signoff.signedOff === true` → `approved`
  - else if `auto + manual` are all checked → `ready-for-signoff`
  - else if any auto check fails → `needs-rework`
  - else → `in-review`
  - DO NOT downgrade `approved` documents.

## 3. Persist
Write back the updated `architecture-repository/.togaf/state/engagements.json`.

## 4. Print a summary

```
ENG-2026-001-omnichannel
  A   request-for-architecture-work          auto 13/13   manual 4/4   approved
  A   architecture-vision                    auto 7/7     manual 3/4   in-review
  ...
Totals: auto 188/210, manual 47/96
```

This command never alters manual checks or sign-offs.
