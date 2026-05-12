# Organizational Model for Enterprise Architecture

> Owner: Chief Architect · Status: Approved · Version: 3.2 · Last reviewed: 2026-02-14

## Scope of Organisations Impacted

The Enterprise Architecture function operates across all **five business units** of Northwind
Retail Group:

| Unit                          | Headcount | Locations          | Primary in scope of EA |
| ----------------------------- | --------- | ------------------ | ---------------------- |
| Northwind Stores (UK & EU)    | 14,200    | 412 stores         | Yes                    |
| Northwind Online              | 380       | London, Berlin     | Yes                    |
| Northwind Wholesale           | 920       | 6 distribution hubs| Yes                    |
| Northwind Financial Services  | 220       | London             | Federated              |
| Group Functions (HR, Fin, IT) | 610       | London HQ          | Yes                    |

## Maturity Assessment, Gaps and Resolution Approach

Current maturity (TOGAF ACF, March 2026): **2.4 / 5 (Under Development)**. See
`./architecture-capability-assessment.md` for the full assessment.

Top three gaps and resolution:

1. **Architecture Compliance** (1.5 → 3 by Q4 2026): instate compliance reviews at sprint
   boundary for any service > £250k.
2. **Architecture Repository** (2 → 3 by Q3 2026): consolidate scattered Confluence pages
   into this single git-backed repository.
3. **Stakeholder Engagement** (2 → 3 by Q4 2026): introduce monthly EA business forum.

## Roles and Responsibilities

| Role                              | Reports to       | FTE | Responsibilities                                                         |
| --------------------------------- | ---------------- | --- | ------------------------------------------------------------------------ |
| Chief Architect                   | CIO              | 1   | Owns EA strategy, chairs Architecture Board                              |
| Lead Enterprise Architect         | Chief Architect  | 3   | Leads ADM cycles, owns ADD per programme                                 |
| Domain Architect (Bus / Data / App / Tech) | Chief Architect | 8 | Domain authority across landscapes                                       |
| Solution Architect                | Domain Architect | 24  | Embedded in delivery teams, accountable for compliance to target         |
| Architecture Repository Lead      | Chief Architect  | 1   | Owns this repo, governance log, requirements repository                  |
| EA Council (cross-business)       | n/a              | 12  | Represents business units in the Architecture Board                      |

## Constraints

- Headcount frozen at 37 EA FTE for FY26.
- All new architecture decisions must be reviewable in git within 5 business days.
- No off-shore EA delivery without Chief Architect approval (data-residency obligations).

## Budget Requirements

| Line                                  | FY26 (£k) | FY27 forecast (£k) |
| ------------------------------------- | --------- | ------------------ |
| EA salaries (37 FTE)                  | 4,820     | 5,005              |
| Tooling (LeanIX, draw.io, GitHub)     | 220       | 240                |
| Training & certification (TOGAF, AWS) | 95        | 120                |
| External advisory                     | 180       | 120                |
| **Total**                             | **5,315** | **5,485**          |

## Governance and Support Strategy

The Architecture Board (see `./architecture-board-charter.md`) meets fortnightly. Decisions
are recorded in `governance-log/decision-log.md`. Compliance reviews follow the cadence in
`./architecture-governance-framework.md`. The Repository Lead curates this folder and the
`/data` snapshots produced by the platform.
