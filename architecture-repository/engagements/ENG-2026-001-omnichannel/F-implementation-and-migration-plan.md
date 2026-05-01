# Implementation and Migration Plan — Omnichannel CX Programme

> Status: Missing (Phase F not yet started) · Owner: James Whitlock + Priya Mehta

## Implementation Strategy

- **Strangler-fig pattern** around Hybris and Siebel.
- **Channel-by-channel cutover**, starting with web.
- **Dual-running** during each transition; rollback per work package.
- **No production cuts within ±2 weeks of peak trading windows.**

## Project Charters

A charter is produced per work package WP-01..WP-11, capturing:
- Outcome and measure
- Owner (Programme Director and Lead Architect)
- Funding allocation
- Dependencies and assumptions
- Architecture compliance gates (30/80/100%)

## Work Package Sequencing

See `E-architecture-roadmap.md` §Timeline. Critical path: WP-01 → WP-02 → WP-04 → WP-10.

## Cost / Benefit / Risk Per Project

| WP    | Cost £m | Benefit £m/yr by FY29 | Risk score (1–9) |
| ----- | :-----: | :-------------------: | :--------------: |
| WP-01 |  1.8    |  enabler              | 3                |
| WP-02 |  6.4    |  enabler              | 8                |
| WP-03 |  9.2    |  9                    | 7                |
| WP-04 |  7.8    | 12                    | 6                |
| WP-05 |  2.1    |  3                    | 3                |
| WP-06 |  1.9    |  4                    | 4                |
| WP-07 |  4.4    |  5                    | 5                |
| WP-08 |  5.1    |  6                    | 5                |
| WP-09 |  3.6    |  4                    | 4                |
| WP-10 |  2.0    |  5  (Hybris opex)     | 5                |
| WP-11 |  1.5    |  3  (Siebel opex)     | 4                |

## Resource Requirements

- ~24 cross-functional squads peak in 2027-Q3.
- One external partner for headless commerce skills (Q4 2026 → Q4 2027).
- Architecture: 4 FTE Lead/Domain Architects on this programme.
- Continuous compliance review: 1 FTE Information Security Architect.

## Migration Approach

- **Identity:** dual-write Siebel ↔ CIAM via match/merge service for 9 months; cutover web first, then app, then stores, then contact centre.
- **Order:** dual-publish OrderEvents from Hybris and OMS during 2027; OMS becomes the
  source of truth at the start of 2027-Q4.
- **Storefront:** route increasing % of web traffic to composable storefront via Cloudflare
  worker; Hybris remains for any path not yet migrated.
- **POS:** new POS workflows behind a feature flag; per-region pilot.
