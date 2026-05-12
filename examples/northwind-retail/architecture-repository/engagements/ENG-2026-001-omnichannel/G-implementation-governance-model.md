# Implementation Governance Model — Omnichannel CX Programme

> Status: Missing (Phase G not yet started)

## Governance Processes

| Process                              | Trigger                              | Output                                |
| ------------------------------------ | ------------------------------------ | ------------------------------------- |
| Architecture Compliance Review (ACR) | 30/80/100% design + 90 days post-go-live | Compliance Assessment + decision   |
| Change Request                       | Any deviation > 5% scope or > £500k  | CR record, Board decision             |
| Principle Waiver                     | Any departure from Architecture Principles | Waiver record (time-bound)      |
| Standards Exception                  | Use of a non-standard SBB/tech       | Exception with sunset date            |

## Governance Organisation Structure

```
[ Architecture Board ]
        │
        ├── Programme Architecture Council (this programme)
        │     │
        │     ├── Solution Architects (per work package)
        │     └── Domain Architects (B/D/A/T + Sec)
        │
        ├── Compliance Working Group
        └── Standards Council (cross-programme)
```

## Governance Roles and Responsibilities

| Role                              | Responsibility                                       |
| --------------------------------- | ---------------------------------------------------- |
| Lead Enterprise Architect         | Owns the architecture compliance posture             |
| Programme Architecture Council    | Day-to-day governance for this programme             |
| Compliance Working Group          | Conducts ACRs and records evidence                   |
| Architecture Board                | Approves change requests, waivers and exceptions     |
| Programme Director                | Ensures delivery teams attend ACRs and respond       |

## Governance-Related Standards

- ACR template and rubric (`governance-log/`)
- Decision log format (ADR)
- Waiver and exception templates
- Mandatory evidence: per-ABB compliance control mapping
