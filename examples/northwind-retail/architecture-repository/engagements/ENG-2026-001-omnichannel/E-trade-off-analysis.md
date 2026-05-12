# Trade-off Analysis — Omnichannel CX Programme

> Status: Draft · Owner: Priya Mehta

This deliverable surfaces the trade-offs the Architecture Board and Sponsor must accept.

## Trade-off Drivers

- £72m capex envelope and £8m/year opex saving target.
- Customer-facing risk during cutover.
- Vendor lock-in vs. time-to-value.
- Skills availability for headless commerce.
- Regulatory exposure (GDPR / PCI / EAA).

## Options Considered

| Option | Description                                                                  |
| ------ | ---------------------------------------------------------------------------- |
| OPT-1  | Re-platform Hybris to Hybris-Cloud (vendor-led, 36 months, single-vendor)    |
| OPT-2  | Composable storefront atop headless commerce + build differentiating OMS     |
| OPT-3  | Build everything in-house (no SaaS for storefront)                           |
| OPT-4  | Stay on Hybris; integrate harder around it                                   |

## Trade-off Matrix (Cost / Time / Risk / Quality / Capability)

| Criterion                       | OPT-1 | OPT-2 | OPT-3 | OPT-4 |
| ------------------------------- | :---: | :---: | :---: | :---: |
| 3-yr cost (lower better)        |  £m   | ★★★★  | ★★★★★ | ★★★★  | ★★    |
| Time-to-first-value             | ★★    | ★★★★  | ★★    | ★★★★★ |
| Delivery risk                   | ★★    | ★★★   | ★★    | ★★★★  |
| Quality of customer experience  | ★★★   | ★★★★★ | ★★★★  | ★★    |
| Strategic capability fit (B3)   | ★★    | ★★★★★ | ★★★★  | ★     |
| Vendor lock-in (lower better)   | ★     | ★★★★  | ★★★★★ | ★★    |
| Skills available today          | ★★★★  | ★★    | ★★    | ★★★★★ |

(★ = poor … ★★★★★ = best)

## Recommendations

OPT-2 is recommended. It best balances strategic fit against lock-in and risk.

The key trade-offs accepted under OPT-2 are:

1. **Skills gap** — headless commerce expertise will require an external partner for ~12
   months and a parallel up-skilling programme for ~£1.4m.
2. **Two storefronts in parallel** during 2027 — operating cost +£1.2m for 12 months,
   accepted to avoid big-bang risk.
3. **Vendor partial lock-in** to commercetools — mitigated by adopting MACH patterns and
   keeping all canonical data outside the vendor.
4. **PII consolidation increases blast radius of CIAM** — accepted by CISO subject to
   Phase G compliance review and a documented break-glass procedure.

## Decision Required

Architecture Board to ratify OPT-2 and accept the four trade-offs above. Decision target:
2026-11-15 alongside Roadmap approval.
