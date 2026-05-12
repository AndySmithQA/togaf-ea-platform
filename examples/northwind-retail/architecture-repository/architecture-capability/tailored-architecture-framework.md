# Tailored Architecture Framework

> Owner: Chief Architect · Status: Approved · Version: 2.0 · Last reviewed: 2026-01-20

Northwind Retail Group bases its architecture practice on the **TOGAF® Standard, 10th Edition**,
tailored as set out below.

## Tailored Architecture Method

- All ten ADM phases (Preliminary, A–H, Requirements Management) are mandatory for any
  programme classified as **Strategic** or **Cross-business**.
- For **Tactical** and **In-business** programmes, Phases B/C/D may be combined into a single
  Architecture Definition Document iteration provided gap analysis is preserved per domain.
- Iterations are time-boxed:
  - Vision iteration: 4 weeks
  - B/C/D iteration: 8 weeks
  - E/F iteration: 6 weeks
- Phase G compliance reviews must occur at:
  - 30% design,
  - 80% design,
  - pre-go-live,
  - 90 days post-go-live.

## Tailored Architecture Content

The Content Metamodel is extended with four Northwind-specific entities:

| Entity                  | Owner Domain | Purpose                                                       |
| ----------------------- | ------------ | ------------------------------------------------------------- |
| Customer Journey        | Business     | First-class element in Business Architecture views            |
| Channel                 | Business     | Models digital/store/contact-centre touchpoints               |
| Data Product            | Data         | Owned, versioned data assets per the data-mesh approach       |
| Compliance Control      | All          | Linked from every ABB and SBB for SOX/GDPR/PCI traceability   |

## Configured and Deployed Tools

| Tool        | Use                                              | Owner     |
| ----------- | ------------------------------------------------ | --------- |
| GitHub      | Source of truth for the Architecture Repository  | Repo Lead |
| LeanIX      | Application portfolio + landscape                | Domain Architect (App) |
| draw.io     | Diagrams stored alongside markdown               | All       |
| ServiceNow  | Architecture Compliance Reviews workflow         | Governance Lead |
| TOGAF EA Platform (this app) | RfAW/Vision-driven ADM execution    | Chief Architect |

## Interfaces with Governance Models

- The Architecture Board feeds the Group Risk Committee monthly.
- Compliance findings escalate to the CIO when a P1 deviation persists > 30 days.
- The Group Investment Board approves any I&M Plan above £2m on EA recommendation.
