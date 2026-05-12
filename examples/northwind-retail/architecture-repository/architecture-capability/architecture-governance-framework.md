# Architecture Governance Framework

> Owner: Chief Architect · Status: Approved · Version: 2.3 · Last reviewed: 2026-01-30

## Governance Process

```
                   ┌──────────────────┐
   change request  │  Architecture    │   compliance findings
   ───────────────▶│      Board       │◀───────────────────────
                   └────────┬─────────┘
                            │ decides
                            ▼
                ┌──────────────────────────┐
                │  Architecture Compliance │
                │  Review (Phase G)        │
                └────────┬─────────────────┘
                         │ records
                         ▼
        ┌────────────────────────────────────┐
        │   Governance Repository (this repo)│
        └────────────────────────────────────┘
```

### Cadence

| Activity                              | Cadence       | Owner                |
| ------------------------------------- | ------------- | -------------------- |
| Architecture Board                    | Fortnightly   | Chief Architect      |
| Compliance review (per programme)     | At 30/80/100% | Lead Architect       |
| Standards refresh                     | Quarterly     | Domain Architects    |
| Maturity reassessment                 | Half-yearly   | Repo Lead            |
| Decision log audit                    | Quarterly     | Internal Audit       |

## Governance Content

The repository contains the canonical instances of:

- Architecture Principles
- Architecture Standards (in `standards-information-base/`)
- Reference Models (in `reference-library/`)
- Architecture Contracts (in `governance-log/architecture-contracts.md`)
- Compliance Assessments (in `governance-log/compliance-assessments.md`)
- Decision Log (in `governance-log/decision-log.md`)

## Governance Organisation

The Architecture Board (chartered separately) is the standing decision body. It is supported by:

- **Domain Councils** for Business, Data, Application and Technology — propose standards.
- **EA Council** with one representative per business unit — represents demand.
- **Compliance Working Group** — operates the Phase G reviews.

## Governance Repository

The git repository at `git@github.com:northwind/ea-repo` is the system of record. The
TOGAF EA Platform reads from and writes back to it. All changes are PR-reviewed by at least
one Domain Architect and the Repo Lead.
