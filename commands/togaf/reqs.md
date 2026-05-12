---
description: Author / refresh the Architecture Requirements Specification — Requirements Management
argument-hint: "[--engagement <id>]"
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:reqs` $ARGUMENTS

# Task
Author the engagement-scope **Architecture Requirements Specification** — the living
document that aggregates and traces every architecture-relevant requirement.

## 1. Resolve engagement context, read inputs
- `.togaf/templates/architecture-requirements-specification.template.md`
- RfAW (drivers, success measures), Vision (mapped requirements), B/C/D (per-domain reqs)
- `architecture-repository/architecture-requirements-repository/requirements-catalog.md`
  (the enterprise-wide catalog — append, don't overwrite)

## 2. Author
File: `architecture-repository/engagements/{id}/RM-architecture-requirements-specification.md`.

Required H2 headings (in order):
- Success Measures
- Architecture Requirements (Functional & Non-Functional)
- Business Service Contracts
- Application Service Contracts
- Implementation Guidelines
- Implementation Specifications
- Implementation Standards
- Interoperability Requirements
- Constraints
- Assumptions

Conventions:
- AR-IDs are stable. New ones extend the catalog; never re-number existing.
- Service Contracts: Availability, RTO, RPO, lifecycle.
- Constraints and Assumptions are explicit — every assumption marked with `> ASSUMPTION:`.

## 3. State
Set `architecture-requirements-specification` `status: "in-review"`, auto-checks `pass`.
Also update the enterprise requirements catalog with any new AR-IDs.

## 4. Next steps
> ✓ Requirements Specification refreshed. Re-run `/togaf:check` to update auto-checks
> for any deliverables that referenced new AR-IDs.
