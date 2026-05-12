---
description: Author the Compliance Assessment — Phase G
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:compliance` $ARGUMENTS

# Task
Author the **Compliance Assessment** rubric and findings template for this engagement.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/compliance-assessment.template.md`
- ADD, Architecture Contract, Architecture Principles, Standards Information Base
- Per-domain Phase B/C/D outputs (for control mapping)

## 2. Author
File: `architecture-repository/engagements/{id}/G-compliance-assessment.md`.

Required H2 headings:
- Project Description
- Architecture Compliance Review Checklist
- Findings
- Recommendations
- Decision

Conventions:
- Checklist of 8–12 numbered checks, each with a clear pass criterion.
- Cover: Principles adherence, Standards adherence, ABB/SBB mapping, NFR test evidence,
  regulatory controls (e.g. GDPR/PCI/SOX as relevant), observability, resilience,
  identity, data residency, decommissioning of displaced legacy.
- Findings + Recommendations may be empty in the initial draft (filled at each ACR).
- Decision section names the body that records the outcome.

## 3. State
Set `compliance-assessment` `status: "in-review"`, auto-checks `pass`.
Also append a row to `architecture-repository/governance-log/compliance-assessments.md`
(create the file if missing).

## 4. Next steps
> ✓ Compliance Assessment rubric drafted.  After each ACR, refresh Findings and rerun
> `/togaf:check` to update auto-checks.
