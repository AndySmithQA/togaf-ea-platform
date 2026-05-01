# Architecture Roadmap — Omnichannel CX Programme

> Status: Missing (Phase E not yet started) · Owner: Priya Mehta

## Work Packages

| Ref   | Work package                                | Phase entry | Phase exit | Cost (£m) |
| ----- | ------------------------------------------- | ----------- | ---------- | --------: |
| WP-01 | AWS landing zone extension                  | 2026-Q3     | 2026-Q4    | 1.8       |
| WP-02 | CIAM platform stand-up                      | 2026-Q4     | 2027-Q2    | 6.4       |
| WP-03 | Order Orchestrator (OMS) v1                 | 2026-Q4     | 2027-Q2    | 9.2       |
| WP-04 | Composable Storefront — web                 | 2027-Q1     | 2027-Q3    | 7.8       |
| WP-05 | Customer 360 Read API                       | 2027-Q1     | 2027-Q2    | 2.1       |
| WP-06 | Loyalty Hub real-time API + events          | 2027-Q1     | 2027-Q2    | 1.9       |
| WP-07 | POS integration to Storefront/OMS APIs      | 2027-Q2     | 2027-Q4    | 4.4       |
| WP-08 | Composable Storefront — app                 | 2027-Q3     | 2028-Q1    | 5.1       |
| WP-09 | Real-time CDP                               | 2027-Q2     | 2028-Q1    | 3.6       |
| WP-10 | Decommission Hybris storefront              | 2027-Q4     | 2028-Q2    | 2.0       |
| WP-11 | Decommission Siebel CRM                     | 2027-Q3     | 2028-Q1    | 1.5       |

## Transition Architectures

| TA   | Capability achieved                                            | Live by   |
| ---- | -------------------------------------------------------------- | --------- |
| TA-1 | Customers identifiable via CIAM on web; legacy elsewhere       | 2027-Q2   |
| TA-2 | Web traffic served by composable storefront; OMS canonicalised | 2027-Q3   |
| TA-3 | App + POS on composable storefront; loyalty real-time          | 2028-Q1   |
| TA-4 | Hybris/Siebel decommissioned; full target reached              | 2028-Q2   |

## Implementation Factor Assessment & Deduction Matrix

| Factor                        | Assessment                                 | Deduction                       |
| ----------------------------- | ------------------------------------------ | ------------------------------- |
| Skills availability           | Headless commerce skills scarce            | Engage one specialist partner   |
| Vendor maturity               | CIAM market mature; OMS bespoke            | Buy CIAM, build OMS             |
| Org change capacity           | Stores already changing POS                | Sequence POS work after WP-04   |
| Data residency                | EU/UK only mandated                        | Pin AWS to eu-west-2 / eu-west-1|
| Peak trading windows          | Black Friday, Boxing Day, Mother's Day     | No production cuts within ±2 wk |

## Consolidated Gaps, Solutions, and Dependencies Matrix

(See [`E-gap-analysis.md`](./E-gap-analysis.md) for the consolidated gap list mapped to
work packages.)

| Gap                                | WP        | Depends on        |
| ---------------------------------- | --------- | ----------------- |
| 5 identity stores                  | WP-02     | WP-01             |
| Hybris monolithic storefront       | WP-04     | WP-01, WP-02      |
| Order fragmented per channel       | WP-03     | WP-01             |
| Personalisation stale              | WP-09     | WP-03 (events)    |
| POS uses overnight loyalty extract | WP-06, WP-07 | WP-03          |
| Hybris in service                  | WP-10     | WP-04, WP-08      |

## Timeline

```
2026 Q3 ─┬──── WP-01 landing zone
2026 Q4 ─┼──── WP-02 CIAM        ─── WP-03 OMS
2027 Q1 ─┼──── WP-04 Storefront ─── WP-05 C360 ─── WP-06 Loyalty API
2027 Q2 ─┼──── WP-07 POS         ─── WP-09 CDP
2027 Q3 ─┼──── WP-08 App         ─── WP-11 Siebel decom
2027 Q4 ─┼──── WP-10 Hybris decom
2028 Q1 ─┼──── TA-3 live
2028 Q2 ─┴──── TA-4 live (target)
```
