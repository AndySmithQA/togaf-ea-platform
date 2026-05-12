# Architecture Repository — Northwind Retail Group

This is the **Enterprise Architecture Repository** for Northwind Retail Group, structured per
the TOGAF® Standard, 10th Edition, *Architecture Capability Framework — The Architecture
Repository*.

```
architecture-repository/
├── architecture-metamodel/                  # The metamodel that structures the repository
├── architecture-capability/                 # The EA function itself
│   ├── organizational-model.md
│   ├── architecture-capability-assessment.md
│   ├── tailored-architecture-framework.md
│   ├── architecture-principles.md
│   ├── architecture-governance-framework.md
│   └── architecture-board-charter.md
├── architecture-landscape/                  # Architectures of running and planned systems
│   ├── strategic/
│   ├── segment/
│   └── capability/
├── standards-information-base/              # Mandated standards
├── reference-library/                       # TOGAF TRM/III-RM and industry models
├── governance-log/                          # Decisions, contracts, compliance reviews
├── architecture-requirements-repository/    # Requirements catalog
├── solutions-landscape/                     # Implementations realising the landscape
└── engagements/                             # Per-ADM-cycle deliverables
    └── ENG-2026-001-omnichannel/
```

## Active engagement

`ENG-2026-001-omnichannel` — *Omnichannel Customer Experience Programme* (sponsor: Group COO).
The full ADM 1-cycle deliverable set lives in [engagements/ENG-2026-001-omnichannel/](./engagements/ENG-2026-001-omnichannel/).

## How the platform uses this folder

The Next.js application (`/src`) reads from this folder for:

- the document tree shown in the **Architecture Repository** browser,
- the source of truth for each engagement's deliverables (Markdown),
- automatic checks that confirm required TOGAF section headings are present,
- the LLM agent's grounding context when generating downstream deliverables.

Engagement state — sign-offs, generation timestamps, RAG, checklists — lives separately in
`/data/engagements.json` so the markdown stays clean and reviewable in git.
