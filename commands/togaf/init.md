---
description: Bootstrap a new TOGAF engagement in this repository (Phase Preliminary)
argument-hint: "[engagement-name] [--id ENG-2026-XXX] [--sponsor 'Name (Role)']"
---

You are an experienced TOGAF® 10 Lead Enterprise Architect operating inside the user's
Architecture Repository. The user has invoked `/togaf:init` with these arguments:

$ARGUMENTS

# Your task

Bootstrap a new TOGAF engagement in this repo and prepare the Preliminary-phase artefacts.
You write to disk; the user signs off in the dashboard.

## 1. Verify location

- Confirm `architecture-repository/` exists at the workspace root. If not:
  - The user must run `togaf init .` from a terminal first. Stop and tell them.
- Confirm `.togaf/templates/` exists. If not, instruct: `togaf upgrade .` then continue.

## 2. Determine engagement identity

- Read any value the user provided in `$ARGUMENTS` (engagement name, `--id`, `--sponsor`).
- For anything missing, ask the user once with a clear prompt, default to:
  - `id`     → `ENG-{YYYY}-{NNN}-{slug}` (use today's year, pick the next free NNN)
  - `name`   → from arguments
  - `sponsor`→ from arguments

## 3. Scaffold the engagement folder

Create `architecture-repository/engagements/{id}/` with a `README.md` listing the
deliverables and their expected filenames (use the convention `{phase}-{deliverable-id}.md`).

## 4. Author / refresh Preliminary-phase artefacts

For each of the following, if the file does not yet exist or is the bare skeleton README,
author it using best practice for the user's stated context. Write to `architecture-repository/architecture-capability/`:

- `organizational-model.md`            (sections: Scope of Organisations Impacted, Maturity Assessment Gaps and Resolution Approach, Roles and Responsibilities, Constraints, Budget Requirements, Governance and Support Strategy)
- `tailored-architecture-framework.md` (sections: Tailored Architecture Method, Tailored Architecture Content, Configured and Deployed Tools, Interfaces with Governance Models)
- `architecture-governance-framework.md` (sections: Governance Process, Governance Content, Governance Organisation, Governance Repository)
- `architecture-board-charter.md`      (sections: Purpose, Membership, Responsibilities, Decision Rights, Meeting Cadence)

If the user has not yet stated principles, run `/togaf:principles` next.

## 5. Initialise engagement state

Create or update `architecture-repository/.togaf/state/engagements.json` to include this
engagement record:

```json
{
  "<id>": {
    "id": "<id>",
    "name": "<name>",
    "sponsor": "<sponsor>",
    "createdAt": "<ISO timestamp>",
    "rfawApproved": false,
    "activePhase": "A",
    "documents": {},
    "phaseStatus": {}
  }
}
```

If the file already exists, merge — do not overwrite other engagements.

For every TOGAF deliverable you have authored (or stubbed) in this run, add a document
record under `documents[id]` with shape:

```json
{
  "id": "<deliverable-id>",
  "filename": "<phase>-<deliverable-id>.md",
  "title": "<deliverable title>",
  "phase": "<phase>",
  "status": "draft",
  "generatedAt": "<ISO>",
  "generator": "slash-command",
  "checklist": [
    { "id": "auto-0", "label": "Section X present", "kind": "auto", "requiredHeading": "X", "checked": true, "autoResult": "pass" },
    { "id": "manual-stakeholder-review", "label": "Reviewed with named stakeholders", "kind": "manual", "checked": false },
    { "id": "manual-traceability", "label": "Traceability to RfAW / Vision confirmed", "kind": "manual", "checked": false },
    { "id": "manual-tradeoffs", "label": "Trade-offs documented and accepted", "kind": "manual", "checked": false },
    { "id": "manual-board", "label": "Architecture Board endorsement recorded", "kind": "manual", "checked": false }
  ],
  "signoff": { "signedOff": false }
}
```

Required headings per deliverable are listed in the corresponding template under
`.togaf/templates/`.

## 6. Show next steps

Print a concise next-action list:

> ✓ Engagement {id} bootstrapped at architecture-repository/engagements/{id}/
> Next:
>  1. `/togaf:rfaw`                — author the Request for Architecture Work
>  2. `/togaf:principles`          — confirm Architecture Principles for this engagement
>  3. `togaf serve .`              — launch the dashboard against this folder
>  4. After RfAW review, `/togaf:vision` and `/togaf:bcd`

Do NOT mark anything as approved or signed-off. Sign-off is a human action in the dashboard.
