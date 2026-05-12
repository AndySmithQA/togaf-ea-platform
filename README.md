# TOGAF EA Platform — Spec-Kit-style toolkit for TOGAF® 10

> **`togaf init`** drops a complete set of TOGAF slash commands and an Architecture
> Repository skeleton into any folder you choose. Author your enterprise architecture
> directly from your IDE; visualise progress in the Next.js dashboard.

This project gives you two things:

1. **A CLI** (`togaf`) that installs Spec-Kit-style **slash commands** into the IDE of
   your choice (Cursor, Claude Code, GitHub Copilot Chat) plus a structured TOGAF 10
   **Architecture Repository skeleton** in any target folder. Optionally seeds a full
   Northwind Retail example engagement.
2. **A Next.js dashboard** that points at the active folder, renders the ADM "corn
   circle" with RAG, runs auto/manual checklists, gates sign-off, and shows the
   maturity radar, business model canvas and trade-offs.

The two halves talk to each other through a single source of truth: the markdown files
inside `architecture-repository/` and a tiny state JSON inside `.togaf/state/`.

---

## Quick start

```bash
# 1. Get the toolkit (clone or install via npx from a git tag in your fork)
git clone https://github.com/<you>/togaf-ea-platform.git
cd togaf-ea-platform
npm install
npm run build      # builds the dashboard once

# 2. Install slash commands + skeleton into a target folder
node ./cli/togaf.mjs init ../my-ea-repo

# 3. (Optional) seed with the Northwind Retail example engagement
node ./cli/togaf.mjs init ../my-ea-repo --example --force

# 4. Launch the dashboard against that folder
node ./cli/togaf.mjs serve ../my-ea-repo
# →  http://localhost:3000

# 5. Open ../my-ea-repo in Cursor (or Claude Code or VS Code with Copilot Chat)
#    and run /togaf:init to create your first engagement.
```

After publishing this package as `togaf-ea-platform` on npm or your private registry:

```bash
npx -p togaf-ea-platform togaf init ./my-ea-repo --example
npx -p togaf-ea-platform togaf serve ./my-ea-repo
```

See [`INSTALL.md`](./INSTALL.md) for installation modes (clone / npx / global) and
[`QUICKSTART.md`](./QUICKSTART.md) for a first-engagement walkthrough.

---

## What gets installed in the target folder

```
my-ea-repo/
├── architecture-repository/                # Structured TOGAF 10 repository
│   ├── README.md                           # explains the structure & commands
│   ├── architecture-capability/
│   ├── architecture-metamodel/
│   ├── architecture-landscape/{strategic,segment,capability}/
│   ├── standards-information-base/
│   ├── reference-library/
│   ├── governance-log/
│   ├── architecture-requirements-repository/
│   ├── solutions-landscape/
│   └── engagements/                        # one folder per ADM cycle
└── .togaf/
    ├── togaf.json                          # marker {version, ides, ...}
    ├── templates/                          # 24 deliverable templates
    │   ├── rfaw.template.md
    │   ├── architecture-vision.template.md
    │   └── ...
    └── state/
        ├── engagements.json                # engagement records, sign-off, RAG
        └── maturity.json                   # ACF maturity scores

# Plus, into your IDE config:
.cursor/commands/togaf/*.md                 # for Cursor:        /togaf:rfaw, ...
.claude/commands/togaf/*.md                 # for Claude Code:   /togaf:rfaw, ...
.github/prompts/togaf-*.prompt.md           # for Copilot Chat:  /togaf-rfaw, ...
```

---

## Slash commands (Spec-Kit-style)

Every command authors a TOGAF deliverable, updates `.togaf/state/engagements.json`, and
sends you to the dashboard for sign-off.

| Phase | Command | What it does |
|------:|---------|--------------|
| Meta  | `/togaf:init`         | Bootstrap an engagement and Preliminary-phase artefacts |
| Meta  | `/togaf:status`       | Print ADM RAG status (read-only) |
| Meta  | `/togaf:check`        | Re-evaluate auto-checks across deliverables |
| Meta  | `/togaf:signoff`      | Record a human sign-off (gates: auto + manual checks) |
| Meta  | `/togaf:maturity`     | Capture the TOGAF ACF maturity assessment |
| Meta  | `/togaf:principles`   | Set / refresh Architecture Principles |
| A     | `/togaf:rfaw`         | Request for Architecture Work |
| A     | `/togaf:vision`       | Architecture Vision |
| A     | `/togaf:soaw`         | Statement of Architecture Work |
| A     | `/togaf:stakeholders` | Stakeholder Map |
| A     | `/togaf:scenarios`    | Business Scenarios |
| A     | `/togaf:comms`        | Communications Plan |
| A     | `/togaf:bcd`          | Auto-derive needs at B/C/D after RfAW approval |
| B     | `/togaf:business`     | Business Architecture |
| B     | `/togaf:add`          | Architecture Definition Document (aggregator) |
| C     | `/togaf:data`         | Data Architecture |
| C     | `/togaf:application`  | Application Architecture |
| D     | `/togaf:technology`   | Technology Architecture |
| E     | `/togaf:roadmap`      | Architecture Roadmap |
| E     | `/togaf:gaps`         | Consolidated Gap Analysis |
| E     | `/togaf:abbs`         | Architecture Building Blocks |
| E     | `/togaf:sbbs`         | Solution Building Blocks |
| E     | `/togaf:tradeoffs`    | Trade-off Analysis |
| E     | `/togaf:canvas`       | Business Model Canvas |
| F     | `/togaf:migration`    | Implementation and Migration Plan |
| G     | `/togaf:governance`   | Implementation Governance Model |
| G     | `/togaf:contract`     | Architecture Contract |
| G     | `/togaf:compliance`   | Compliance Assessment rubric |
| H     | `/togaf:changes`      | Change Requests register |
| RM    | `/togaf:reqs`         | Architecture Requirements Specification |

In Cursor and Claude Code these are namespaced as `/togaf:<name>`. In Copilot Chat they
appear as `/togaf-<name>` (Copilot does not yet support folder namespacing for prompts).

---

## CLI

```
togaf init [path]       Install slash commands + Architecture Repository skeleton
                        Flags: --here  --example  --no-skeleton  --no-templates
                               --ide=cursor,claude,copilot   --force
togaf serve [path]      Run the dashboard webapp pointed at [path]   --port=3000
togaf upgrade [path]    Refresh slash commands + templates only (overwrites)
togaf check [path]      Run TOGAF auto-checks across [path]'s engagements
togaf status [path]     Print ADM RAG status across [path]'s engagements
togaf where             Print resolved paths and config
togaf help              Show CLI help
```

The CLI is zero-dependency Node ESM (`cli/togaf.mjs`); only Node ≥ 18 is required.

---

## How the dashboard picks the active folder

Resolution priority — first match wins:

1. **Settings UI override** — persisted to `~/.togaf-ea/config.json` (cross-run, per-user).
2. **`EA_REPO_PATH` env var** — used by `togaf serve` automatically.
3. **Bundled example** — the Northwind Retail repo shipped in `architecture-repository/`.

Switch the active folder at any time from the **Settings** page. State files live under
the chosen repo's `.togaf/state/`, so each repo carries its own engagement records and
sign-offs.

---

## Architecture of the project itself

```
togaf-ea-platform/
├── cli/togaf.mjs               # zero-dep CLI installer
├── commands/togaf/*.md         # canonical slash command sources (one per command)
├── templates/*.template.md     # TOGAF deliverable section skeletons
├── skeleton/                   # empty Architecture Repository structure
├── examples/northwind-retail/  # fully-populated example engagement
├── architecture-repository/    # bundled demo (mirrors the example) — Northwind
├── src/                        # Next.js dashboard
│   ├── app/                    # routes (incl. /settings, /commands)
│   ├── components/             # ADM wheel, maturity radar, settings form, ...
│   └── lib/
│       ├── config.ts           # active-repo resolution
│       ├── repo.ts             # filesystem persistence (uses config)
│       ├── togaf.ts            # ADM phases & deliverable definitions
│       ├── llm.ts              # OpenAI-compatible doc generator (optional)
│       └── prompts.ts          # prompt builder
├── package.json                # bin: togaf
└── INSTALL.md / QUICKSTART.md  # docs
```

### Dashboard features (work against the active folder)

- **Dashboard** — KPIs, ADM "corn circle" RAG, maturity radar, phase rollup
- **Engagements** — list, detail page with B/C/D summary
- **RfAW review** — approve and trigger BCD auto-assessment (or run `/togaf:bcd`)
- **Document workspace** — render markdown, run/refresh auto-checks, manual checks, sign-off
- **Trade-offs** — render `E-trade-off-analysis.md`
- **Business models** — render the Business Model Canvas from `E-business-models.md`
- **Maturity** — TOGAF ACF radar over 8 dimensions
- **ADM** — reference for the 10 ADM phases
- **Repository** — browsable file tree of the active folder
- **Deliverables** — TOGAF 10 deliverable catalog
- **Slash commands** — list of every `/togaf:*` command
- **Settings** — switch the active folder, see resolved paths

---

## Optional LLM integration

Document generation in the dashboard (`Generate` button on a deliverable) uses an
OpenAI-compatible chat completions endpoint. Set:

```
OPENAI_API_KEY=...
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_MODEL=gpt-4o-mini
```

When unset, the platform falls back to deterministic templates so the workflow still
demonstrates end-to-end. The `crsr_*` Cursor key in the original `.env.local` is for
**Cursor Cloud Agents** (`api.cursor.com/v1`) — a different API surface; it is preserved
in `.env.example` for a future Cloud-Agents adapter but does **not** drive the dashboard
generator.

The slash commands themselves do their work via the AI inside your IDE (Cursor, Claude
Code, Copilot Chat) — there's nothing for you to wire up.

---

## Status

Mock-up / reference implementation — not for production use. Northwind Retail data is
fictional. TOGAF® is a registered trademark of The Open Group.
