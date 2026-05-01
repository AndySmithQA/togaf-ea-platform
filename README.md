# TOGAF EA Platform

A complete mock-up of a **TOGAF® 10 Enterprise Architecture Repository** plus a **Next.js
web application** for managing the Architecture Development Method end-to-end.

It demonstrates:

1. A **TOGAF 10 Architecture Repository** (`/architecture-repository`) structured per the
   TOGAF Architecture Capability Framework, including:
   - Architecture Capability (organisational model, principles, governance, board charter,
     tailored framework, capability assessment).
   - Architecture Metamodel (extended content metamodel with Northwind extensions).
   - Architecture Landscape (Strategic / Segment / Capability levels).
   - Standards Information Base (Technology / Data / Application standards).
   - Reference Library (TOGAF TRM, III-RM, industry models).
   - Governance Log (Architecture Contracts, Compliance Assessments, Capability
     Assessments, ADR-style decision log).
   - Architecture Requirements Repository (catalog).
   - Solutions Landscape (current solutions).
   - One full ADM 1-cycle **mock engagement**: *Omnichannel Customer Experience Programme*
     for the fictional Northwind Retail Group, with all ~24 TOGAF deliverables present,
     including Phase A → H plus Requirements Management.

2. A **Next.js 15 + React 19 + Tailwind + shadcn/ui** application that:
   - Renders the iconic TOGAF ADM **"corn circle"** as an interactive SVG, RAG-coloured
     per phase based on the engagement's deliverable status.
   - Shows a **TOGAF ACF maturity radar** (8 dimensions, 0..5 levels) on the dashboard
     and a dedicated maturity page with the full level reference.
   - Lets EAs **review and approve the RfAW**; on approval the platform automatically
     derives **what needs to happen at Phases B, C and D** (an LLM call when
     `OPENAI_API_KEY` is set, otherwise a deterministic template).
   - Carries every TOGAF deliverable in a **document workspace** with:
     - Live markdown view of the document on disk,
     - **Auto checks** (required TOGAF section headings),
     - **Manual checks** (stakeholder review, traceability, trade-off acceptance,
       Architecture Board endorsement),
     - **Sign-off gate** that's only unlocked when every check passes,
     - A **document-generation agent** that uses the RfAW + Vision + SoAW + previously
       approved deliverables as grounding context.
   - Visualises the **Business Model Canvas** for each engagement, sourced from the
     `E-business-models.md` deliverable.
   - Surfaces **trade-offs** that stakeholders are asked to accept.
   - Exposes the **TOGAF deliverable catalog** as a reference page.
   - Exposes the **Architecture Repository** as a browsable file tree.

## Quick start

```bash
# 1. Install
npm install

# 2. (Optional) Provide an OpenAI-compatible API key for live LLM document generation.
#    Without a key the platform falls back to deterministic templates.
cp .env.example .env.local
# edit .env.local and set OPENAI_API_KEY=...

# 3. Run
npm run dev
# open http://localhost:3000
```

The platform reads from `architecture-repository/` and persists engagement state to
`data/engagements.json` and `data/maturity.json`. Both are git-friendly.

## Mock engagement

`ENG-2026-001-omnichannel` — *Omnichannel Customer Experience Programme*, sponsored by the
Group COO. The engagement is in **Phase B** with Phase A fully approved and Phase B/C
documents in draft/review. This shapes the RAG colouring of the ADM wheel and seeds every
view in the application with realistic content.

## Project layout

```
.
├── architecture-repository/        # The TOGAF Architecture Repository
│   ├── architecture-capability/    # Org model, principles, governance, board, tailored fw
│   ├── architecture-metamodel/     # Extended TOGAF content metamodel
│   ├── architecture-landscape/     # Strategic / Segment / Capability
│   ├── standards-information-base/ # Tech / Data / App standards
│   ├── reference-library/          # TOGAF TRM, III-RM, industry models
│   ├── governance-log/             # Contracts, compliance, capability, decisions
│   ├── architecture-requirements-repository/
│   ├── solutions-landscape/
│   └── engagements/
│       └── ENG-2026-001-omnichannel/   # Full ADM 1-cycle deliverable set
├── data/                           # Engagement state + maturity snapshot (JSON)
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── page.tsx                # Dashboard
│   │   ├── engagements/            # Engagements list + per-engagement views
│   │   ├── adm/                    # ADM cycle reference + corn circle
│   │   ├── maturity/               # TOGAF ACF maturity dashboard
│   │   ├── repository/             # Repository browser
│   │   ├── deliverables/           # TOGAF 10 deliverable catalog
│   │   └── api/                    # Approval, generation, sign-off, checklist endpoints
│   ├── components/
│   │   ├── adm-wheel.tsx           # The corn-circle SVG with RAG per phase
│   │   ├── maturity-radar.tsx      # 8-dimension ACF radar SVG
│   │   ├── checklist-panel.tsx     # Auto + manual checks + sign-off gate
│   │   ├── rfaw-review.tsx         # RfAW approval client component
│   │   ├── markdown.tsx            # GFM markdown renderer
│   │   ├── nav.tsx                 # Sidebar nav
│   │   └── ui/                     # shadcn-style primitives
│   ├── lib/
│   │   ├── togaf.ts                # ADM phases + deliverable model (TOGAF 10)
│   │   ├── repo.ts                 # Filesystem repo (read/write engagements + docs)
│   │   ├── rag.ts                  # Per-phase RAG calculator
│   │   ├── maturity.ts             # TOGAF ACF (0..5)
│   │   ├── prompts.ts              # LLM prompt builder per deliverable
│   │   ├── llm.ts                  # Generation agent + B/C/D assessment derivation
│   │   └── utils.ts
│   └── types/index.ts
└── README.md
```

## How the document agent works

When you click "Re/generate" on a deliverable:

1. The platform loads the engagement's RfAW, Architecture Vision and SoAW from disk.
2. It also loads every deliverable in this engagement that has been **approved**
   (signed off) so the agent can ground the new document in earlier consensus.
3. It builds a system + user prompt using `lib/prompts.ts` based on the deliverable's
   required H2 section list (from `lib/togaf.ts`).
4. If `OPENAI_API_KEY` is set, it calls the LLM (default `gpt-4o-mini`, override via
   `OPENAI_MODEL`).
5. Otherwise it produces a deterministic, TOGAF-conformant template stub so the platform
   stays usable without any external dependency.
6. The generated markdown is written to `architecture-repository/engagements/{id}/{file}.md`.
7. **Auto checks re-evaluate**: each required TOGAF section heading is regex-matched in
   the new markdown.
8. The deliverable's status moves to `in-review`. **Sign-off remains a human action** and
   is gated on every auto and manual check passing.

## Sign-off gate

For each deliverable:

- **Auto checks**: required TOGAF H2 headings present (re-evaluated on every save).
- **Manual checks** (per TOGAF governance):
  - Reviewed with named stakeholders.
  - Traceability to RfAW / Vision confirmed.
  - Trade-offs documented and accepted.
  - Architecture Board endorsement recorded.
- **Sign-off button** is disabled until every check passes; on sign-off, the document
  status flips to `approved` and feeds the RAG calculation for its phase.

## RAG model

Per phase:

- **Green** — every deliverable for the phase is approved.
- **Amber** — at least one deliverable is in draft or in review.
- **Red** — phase has been entered (active or earlier in cycle order) but no deliverables yet exist.
- **Grey** — phase has not yet been entered.

This is rendered onto the ADM wheel and into per-phase tables.

## Disclaimers

This is a mock-up to illustrate how a TOGAF-aligned EA repository plus an EA management
application could be structured. The Northwind Retail Group, its programmes, finances and
all named individuals are fictional. TOGAF® is a registered trademark of The Open Group.
