# Implementation Governance Model — {{ENGAGEMENT_NAME}}

## Governance Processes

| Process | Trigger | Output |
| ------- | ------- | ------ |
| Architecture Compliance Review | 30/80/100% design + 90 days post-go-live | Compliance Assessment |
| Change Request | Any deviation > _N%_ scope or > _£amount_ | CR record, Board decision |
| Principle Waiver | Departure from Principles | Waiver record (time-bound) |
| Standards Exception | Use of a non-standard SBB/tech | Exception with sunset date |

## Governance Organisation Structure

```
[ Architecture Board ]
        │
        ├── Programme Architecture Council (this programme)
        │     ├── Solution Architects (per work package)
        │     └── Domain Architects (B/D/A/T + Sec)
        ├── Compliance Working Group
        └── Standards Council
```

## Governance Roles and Responsibilities

| Role | Responsibility |
| ---- | -------------- |
| Lead Enterprise Architect | Owns the architecture compliance posture |
| Programme Architecture Council | Day-to-day governance for this programme |
| Compliance Working Group | Conducts ACRs and records evidence |
| Architecture Board | Approves CRs, waivers and exceptions |
| Programme Director | Ensures delivery teams attend ACRs and respond |

## Governance-Related Standards

- ACR template and rubric (`governance-log/`)
- Decision log format (ADR)
- Waiver and exception templates
- Mandatory evidence: per-ABB compliance control mapping
