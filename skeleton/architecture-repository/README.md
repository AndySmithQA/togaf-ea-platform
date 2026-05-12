# Architecture Repository

This is your Enterprise Architecture Repository, structured per the
**TOGAF® Standard, 10th Edition** — *Architecture Capability Framework — The
Architecture Repository*.

It was scaffolded by `togaf init`. Each top-level folder is a canonical
TOGAF repository class. Fill the placeholders, then drive the full ADM cycle
from your IDE using the `/togaf:` slash commands installed alongside this folder.

```
architecture-repository/
├── architecture-metamodel/                  # The metamodel that structures the repository
├── architecture-capability/                 # The EA function itself
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
```

State (engagement records, sign-offs, RAG, maturity) is held in
`.togaf/state/` so this folder stays clean and reviewable in git.

## Quickstart from your IDE

Run these slash commands in order — each one writes a TOGAF deliverable into
this repo and ticks off the corresponding auto-checks. Sign-off is always a
human action.

| Step | Command (Cursor / Claude) | Copilot prompt | What it does |
|------|---------------------------|----------------|--------------|
|  1   | `/togaf:init`             | `/togaf-init`  | Bootstrap an engagement and capture project intent |
|  2   | `/togaf:rfaw`             | `/togaf-rfaw`  | Author the Request for Architecture Work |
|  3   | `/togaf:vision`           | `/togaf-vision`| Derive the Architecture Vision from the RfAW |
|  4   | `/togaf:soaw`             | `/togaf-soaw`  | Produce the Statement of Architecture Work |
|  5   | `/togaf:bcd`              | `/togaf-bcd`   | Auto-derive what's needed at Phases B, C and D |
|  6   | `/togaf:business`/`:data`/`:application`/`:technology` | likewise | Author per-domain target architectures |
|  7   | `/togaf:add`              | `/togaf-add`   | Aggregate into the Architecture Definition Document |
|  8   | `/togaf:roadmap` `/togaf:gaps` `/togaf:abbs` `/togaf:sbbs` `/togaf:tradeoffs` `/togaf:canvas` | likewise | Phase E content |
|  9   | `/togaf:migration`        | `/togaf-migration` | Phase F Implementation & Migration Plan |
| 10   | `/togaf:governance` `/togaf:contract` `/togaf:compliance` | likewise | Phase G content |
| 11   | `/togaf:changes`          | `/togaf-changes` | Phase H Change Requests register |
| 12   | `/togaf:reqs`             | `/togaf-reqs`  | Architecture Requirements Specification (RM) |

Cross-cutting commands you can run any time:

- `/togaf:status` — print the current ADM RAG status
- `/togaf:check` — re-evaluate auto-checks for every deliverable
- `/togaf:signoff` — record a human sign-off for a named deliverable
- `/togaf:maturity` — capture / refresh the TOGAF ACF maturity assessment
- `/togaf:principles` — set or refresh Architecture Principles
