# Quickstart — your first TOGAF engagement

This walks you through one end-to-end ADM cycle using the slash commands.

## 0. Install the kit

```bash
node ./cli/togaf.mjs init ./my-ea-repo
```

Open `./my-ea-repo/` in Cursor (or Claude Code). Type `/togaf:` — you should see
all the commands in the palette.

## 1. Create your engagement (Preliminary + start of Phase A)

```
/togaf:init Omnichannel Customer Experience Programme --sponsor "CMO (Sponsor)"
```

The agent will scaffold:

- `architecture-repository/engagements/ENG-2026-001-omnichannel/`
- Bootstrapped Preliminary-phase artefacts in `architecture-repository/architecture-capability/`
- An entry in `.togaf/state/engagements.json`

Then run, in order:

```
/togaf:principles --seed       # if no Architecture Principles yet
/togaf:rfaw                    # Request for Architecture Work
/togaf:vision                  # Architecture Vision
/togaf:soaw                    # Statement of Architecture Work
/togaf:stakeholders
/togaf:scenarios
/togaf:comms
```

## 2. Open the dashboard

```bash
node ./cli/togaf.mjs serve ./my-ea-repo
```

→ [http://localhost:3000](http://localhost:3000)

You'll see the engagement on the dashboard, the ADM "corn circle" lit up, and each
deliverable in its `in-review` state with auto-checks already passing.

Open `/engagements/<id>/rfaw` and **approve** the RfAW. This sets `rfawApproved: true`.

## 3. Auto-derive Phase B/C/D needs

```
/togaf:bcd
```

Generates `A-bcd-assessment.md` plus the `bcdAssessment` block in state. The dashboard
shows the per-domain item counts on the engagement detail page.

## 4. Phase B / C / D / aggregator

```
/togaf:business
/togaf:data
/togaf:application
/togaf:technology
/togaf:add
```

Each authors its section-skeleton TOGAF deliverable, drives auto-checks to pass, and
leaves the manual checklist for human review.

## 5. Phase E

```
/togaf:roadmap
/togaf:gaps
/togaf:abbs
/togaf:sbbs
/togaf:tradeoffs
/togaf:canvas
```

`/togaf:tradeoffs` is the moment trade-offs become explicit; `/togaf:canvas` produces
the Business Model Canvas the dashboard renders at `/engagements/<id>/business-models`.

## 6. Phase F / G / H / RM

```
/togaf:migration
/togaf:governance
/togaf:contract
/togaf:compliance
/togaf:reqs
/togaf:changes
```

## 7. Sign-off and gates

For each deliverable, in the dashboard:

- Tick off the manual checklist (stakeholder review, traceability, trade-offs, board endorsement).
- Click **Sign off** — the platform refuses unless every check passes.
- Or run `/togaf:signoff --doc architecture-vision --by "Jane (Chief Architect)"` to
record the same sign-off from your IDE.

## 8. Stay in sync

- After editing markdown by hand, run `/togaf:check` — auto-checks refresh, document
statuses recompute, manual checks are untouched.
- After tweaking the engagement structure, run `/togaf:status` — RAG status across all
ADM phases prints to chat and shows "Next recommended command".

## 9. Phase H: change requests

When the business asks for a change:

```
/togaf:changes --add "Add gift-card refund flow"
```

Or run `/togaf:changes` with no flags to refresh the whole register. The agent appends
an ADR to `governance-log/decision-log.md` so the decision trail is preserved.

## 10. Refresh the kit

```bash
node ./cli/togaf.mjs upgrade ./my-ea-repo
```

This overwrites slash commands and templates without touching your repository content.