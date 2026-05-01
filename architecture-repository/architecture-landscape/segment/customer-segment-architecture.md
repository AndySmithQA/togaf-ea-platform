# Segment Architecture — Customer Domain

> Owner: Domain Architect (Business) · Status: Approved · Horizon: 1–3 years

A **detailed view** of one segment of the enterprise — the Customer domain — that enables
multiple capability-level architectures to share a coherent baseline.

## Scope

All systems, data, processes and channels that touch a known or anonymous customer:
identity, profile, consent, marketing, loyalty, order, returns, service.

## Baseline (today)

- Five separate identity stores (E-com, Stores, Loyalty, Service Desk, Northwind Financial).
- Order data fragmented across SAP ECC, the e-commerce platform and the call-centre CRM.
- Personalisation runs on a third-party CDP that is fed weekly batches.

## Target

- Single Customer Identity (golden record) backed by a CIAM platform.
- Order Orchestrator publishing canonical OrderEvents to all consumers.
- Real-time CDP fed by event streams; consent and preferences canonical and queryable.

## Segment-specific principles

- The customer can self-serve every action a contact-centre agent can perform.
- Consent is captured once, applied everywhere, revocable in under 24 hours.
- Identity must support guest checkout without coercion to register.
