# Architecture Principles

> Owner: Architecture Board · Status: Approved · Version: 4.1 · Last reviewed: 2026-02-28

Each principle follows the TOGAF format: **Name / Statement / Rationale / Implications**.

## Business Principles

### B1 — Primacy of Principles
**Statement.** These principles apply to all organisations within Northwind Retail Group.
**Rationale.** Consistency of decision-making and architecture quality across business units.
**Implications.** Exceptions require Architecture Board approval and an explicit waiver.

### B2 — Customer at the Centre
**Statement.** Architecture decisions favour outcomes that improve the customer experience
without harming colleagues or unit economics.
**Rationale.** Customer NPS is the Group's #1 strategic metric.
**Implications.** Every business capability must be traceable to a customer value stream.

### B3 — Build for Change
**Statement.** Architectures must be modular, replaceable and evolvable.
**Rationale.** Retail conditions change yearly; legacy lock-in costs the Group ~£14m/yr.
**Implications.** Strangler patterns over big-bang re-platforming; APIs are first-class.

### B4 — Compliance is Designed In, Not Bolted On
**Statement.** Privacy, accessibility and financial controls are part of every design.
**Rationale.** Regulatory burden (GDPR, PCI-DSS, EAA) is non-negotiable.
**Implications.** Compliance Controls are required entities on every ABB and SBB.

## Data Principles

### D1 — Data is a Shared Asset
**Statement.** Data is owned by the Group, not by individual systems.
**Rationale.** Decisions improve when based on shared, trusted data.
**Implications.** Each Data Entity has a named owner and a published Data Product contract.

### D2 — Common Vocabulary
**Statement.** A common business vocabulary applies across all data assets.
**Rationale.** Avoids costly re-conciliation across channels.
**Implications.** All data products bind to the canonical glossary.

### D3 — Data is Secured at Rest, in Transit and in Use
**Statement.** Encryption and access controls apply by default to all data.
**Rationale.** Data breaches are existential to a retailer.
**Implications.** Per-field classification mandatory; tokenisation for PAN data.

### D4 — Data Quality is Measured
**Statement.** Each Data Product publishes accuracy, completeness, freshness and lineage SLOs.
**Rationale.** Without measurement, "trustworthy data" is rhetoric.
**Implications.** Data observability tooling is a foundational capability.

## Application Principles

### A1 — Composable over Monolithic
**Statement.** Prefer assemblies of small, well-bounded services over monoliths.
**Rationale.** Faster change, lower blast radius.
**Implications.** Service boundaries match business capabilities; APIs are versioned.

### A2 — Open Standards over Proprietary Lock-in
**Statement.** Open standards are preferred when functional parity exists.
**Rationale.** Reduces switching cost and supports B3.
**Implications.** Proprietary deviations require a documented trade-off analysis.

### A3 — Buy Commodity, Build Differentiating
**Statement.** Buy SaaS for commodity capability; build only what differentiates Northwind.
**Rationale.** Focus engineering investment on customer experience and unit economics.
**Implications.** Phase E ABB→SBB mapping includes a Buy/Build decision.

### A4 — Design for Failure
**Statement.** Components are designed to degrade gracefully.
**Rationale.** Retail traffic spikes are unforgiving; partial failure must not stop trading.
**Implications.** Circuit breakers, idempotent APIs, sagas over distributed transactions.

## Technology Principles

### T1 — Cloud-First
**Statement.** New capability runs on Group-approved public cloud unless an exception applies.
**Rationale.** Elasticity, geographic reach, lower opex variance.
**Implications.** Workloads are designed for ephemeral compute; data residency obeyed by region.

### T2 — Zero-Trust Networking
**Statement.** No service trusts another by default; every call is authenticated and authorised.
**Rationale.** Removes the brittle perimeter model.
**Implications.** Service identity (SPIFFE/mTLS) is mandatory for all new platforms.

### T3 — Observability as a First-Class Concern
**Statement.** Every service emits structured logs, metrics and traces in agreed formats.
**Rationale.** You cannot operate what you cannot see.
**Implications.** OpenTelemetry is the Group standard.

### T4 — Sustainability
**Statement.** Architectures are designed to reduce energy and carbon footprint.
**Rationale.** Group net-zero commitment by 2035.
**Implications.** Resource-tagging for carbon-cost reporting; right-sizing required at design.
