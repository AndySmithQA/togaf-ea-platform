# Consolidated Gap Analysis — Omnichannel CX Programme

> Status: Missing (Phase E not yet started)

## Business Gaps

| Gap                                                | Work package |
| -------------------------------------------------- | ------------ |
| No Group ownership of customer-facing capabilities | WP-B1        |
| Channel-specific colleague training                | WP-B2        |
| No cross-channel KPI tree                          | WP-B3        |
| Customer Advisory Panel ad hoc                     | WP-B4        |

## Data Gaps

| Gap                                              | Work package |
| ------------------------------------------------ | ------------ |
| No golden customer record                        | WP-02        |
| Order fragmented per channel                     | WP-03        |
| Inventory overnight-batch                        | WP-03, WP-07 |
| Personalisation features stale                   | WP-09        |
| No Data Product contracts                        | WP-03/05/09  |

## Application Gaps

| Gap                                       | Work package |
| ----------------------------------------- | ------------ |
| Storefront tightly coupled to Hybris      | WP-04, WP-08 |
| OMS embedded in Hybris                    | WP-03        |
| Five identity surfaces                    | WP-02        |
| 11 micro-frontends, no design system      | WP-04        |
| POS uses overnight loyalty extract        | WP-06, WP-07 |
| No canonical OrderEvent                   | WP-03        |

## Technology Gaps

| Gap                                | Work package |
| ---------------------------------- | ------------ |
| Landing zone limited to Online     | WP-01        |
| No service mesh / identity         | WP-01        |
| Kafka unused by storefront         | WP-03        |
| Observability fragmented           | WP-01        |
| No edge / WAF                      | WP-01        |

## Consolidated Gap List

48 gaps across the four domains, of which 14 are on the critical path of TA-1.

## Mitigation Approach

- Sequence high-risk items (CIAM, OMS) early in the roadmap.
- Run dual-write/dual-read patterns during transition; cut over per channel, not big-bang.
- Phase G compliance reviews at 30/80/100% per work package.
