# Architecture Principles

> Owner: Architecture Board · Status: Draft · Version: 0.1

Each principle follows the TOGAF format: **Name / Statement / Rationale / Implications**.

## Business Principles

### B1 — Primacy of Principles
**Statement.** These principles apply to all organisations within the enterprise.
**Rationale.** Consistency of decision-making and architecture quality.
**Implications.** Exceptions require Architecture Board approval and an explicit waiver.

### B2 — _name_
**Statement.**
**Rationale.**
**Implications.**

## Data Principles

### D1 — Data is a Shared Asset
**Statement.** Data is owned by the enterprise, not by individual systems.
**Rationale.** Decisions improve when based on shared, trusted data.
**Implications.** Each Data Entity has a named owner and a published Data Product contract.

## Application Principles

### A1 — Composable over Monolithic
**Statement.** Prefer assemblies of small, well-bounded services over monoliths.
**Rationale.** Faster change, lower blast radius.
**Implications.** Service boundaries match business capabilities; APIs are versioned.

## Technology Principles

### T1 — Cloud-First
**Statement.** New capability runs on approved public cloud unless an exception applies.
**Rationale.** Elasticity, geographic reach, lower opex variance.
**Implications.** Workloads are designed for ephemeral compute; data residency obeyed by region.
