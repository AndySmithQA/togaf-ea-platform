---
description: List every /togaf: slash command and what it does
---

You are a TOGAF® 10 Lead Architect. Invoked: `/togaf:help`

# Task
Print a one-screen catalogue of every TOGAF slash command in this toolkit, grouped by
ADM phase. Do **not** modify any files.

## Output format

```
TOGAF EA toolkit — slash commands
=================================

Meta
  /togaf:init           Bootstrap a new engagement in this repository
  /togaf:status         Print ADM RAG status across engagements
  /togaf:check          Re-evaluate auto-checks for every deliverable
  /togaf:signoff        Record a human sign-off (gates: auto+manual)
  /togaf:maturity       Capture / refresh the TOGAF ACF maturity assessment
  /togaf:principles     Set / refresh the Architecture Principles
  /togaf:help           This list

Phase A — Architecture Vision
  /togaf:rfaw           Request for Architecture Work
  /togaf:vision         Architecture Vision
  /togaf:soaw           Statement of Architecture Work
  /togaf:stakeholders   Stakeholder Map
  /togaf:scenarios      Business Scenarios
  /togaf:comms          Communications Plan
  /togaf:bcd            Auto-derive needs at Phases B/C/D after RfAW approval

Phase B — Business
  /togaf:business       Business Architecture
  /togaf:add            Architecture Definition Document (aggregator)

Phase C — Information
  /togaf:data           Data Architecture
  /togaf:application    Application Architecture

Phase D — Technology
  /togaf:technology     Technology Architecture

Phase E — Opportunities & Solutions
  /togaf:roadmap        Architecture Roadmap
  /togaf:gaps           Consolidated Gap Analysis
  /togaf:abbs           Architecture Building Blocks
  /togaf:sbbs           Solution Building Blocks
  /togaf:tradeoffs      Trade-off Analysis
  /togaf:canvas         Business Model Canvas

Phase F — Migration Planning
  /togaf:migration      Implementation and Migration Plan

Phase G — Implementation Governance
  /togaf:governance     Implementation Governance Model
  /togaf:contract       Architecture Contract
  /togaf:compliance     Compliance Assessment

Phase H — Architecture Change Management
  /togaf:changes        Change Requests register

Requirements Management
  /togaf:reqs           Architecture Requirements Specification

Tip: from a terminal, run  `togaf serve .`  to launch the dashboard against this folder.
```
