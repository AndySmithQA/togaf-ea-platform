# Architecture Content Metamodel

> Owner: Repo Lead · Status: Approved · Version: 1.2 · Last reviewed: 2026-02-05

The Northwind Architecture Content Metamodel extends the TOGAF 10 reference metamodel.
It defines the entities held in the repository, their attributes, and the permitted
relationships between them.

## Top-level entity catalog

| Entity                      | Domain      | Notes                                                    |
| --------------------------- | ----------- | -------------------------------------------------------- |
| Driver                      | Business    | External force that demands change                       |
| Goal                        | Business    | Measurable outcome the enterprise must achieve           |
| Objective                   | Business    | Time-bound contribution to a Goal                        |
| Measure                     | Business    | KPI/OKR linked to a Goal/Objective                       |
| Stakeholder                 | Business    | Internal or external party with concerns                 |
| Business Capability         | Business    | What the business does                                   |
| Value Stream                | Business    | End-to-end value-producing flow                          |
| Customer Journey            | Business *  | Northwind extension                                      |
| Channel                     | Business *  | Northwind extension                                      |
| Business Process            | Business    | How the business works                                   |
| Organisation Unit           | Business    | Org chart node                                           |
| Role                        | Business    | Skills required to operate                               |
| Function                    | Business    | Repeatable activity                                      |
| Service                     | Business / Application | Behaviour exposed to consumers                |
| Data Entity                 | Data        | Logical group of related information                     |
| Data Component (Logical/Physical) | Data  | Implementation of a Data Entity                          |
| Data Product                | Data *      | Northwind extension — owned, versioned data asset        |
| Application Component       | Application | Encapsulates application functionality                   |
| Information System Service  | Application | Service realised by Application Components               |
| Logical Technology Component | Technology | Class of technology                                      |
| Physical Technology Component | Technology | Specific product/version                                 |
| Location                    | Technology  | Where things run                                         |
| Architecture Building Block (ABB) | All  | Capability required                                      |
| Solution Building Block (SBB) | All    | Implementation of an ABB                                 |
| Compliance Control          | All *       | Northwind extension — SOX/GDPR/PCI control reference     |
| Architecture Requirement    | All         | Statement of need                                        |
| Constraint                  | All         | Limitation on the design                                 |
| Assumption                  | All         | Belief held to be true                                   |
| Gap                         | All         | Difference between baseline and target                   |
| Work Package                | All         | Set of actions in the Architecture Roadmap               |

\* = Northwind extension to the TOGAF base metamodel.

## Permitted relationships (selected)

```
Driver        ──realised by──▶ Goal ──refined into──▶ Objective ──measured by──▶ Measure
Stakeholder   ──has concern──▶ Architecture Requirement
Customer Journey ──consumes──▶ Channel
Channel       ──realised by──▶ Application Component
Business Capability ──supported by──▶ Application Component / Data Entity
Data Product  ──realises──▶ Data Entity
ABB           ──realised by──▶ SBB
SBB           ──hosted on──▶ Physical Technology Component @ Location
Work Package  ──delivers──▶ ABB / SBB
Compliance Control ──governs──▶ ABB / SBB / Data Entity
```

## Mandatory attributes

Every entity carries:

- `id` (stable, slug)
- `owner` (named role)
- `lifecycle` (Proposed / Approved / Live / Deprecated / Retired)
- `criticality` (Tier 1..4)
- `compliance_controls[]` (zero or more)
