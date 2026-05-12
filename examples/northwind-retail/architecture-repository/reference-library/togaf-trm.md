# TOGAF Technical Reference Model (TRM) — Northwind tailoring

> Source: TOGAF® Standard, 10th Edition, Reference Models · Tailored 2026-01-30

The TRM categorises Application Platform services. Northwind tailors the model by adding two
service categories: **Event Streaming** and **Service Mesh & Identity**.

## Service categories

| TOGAF category               | Northwind realisation                              |
| ---------------------------- | -------------------------------------------------- |
| Data Interchange Services    | OpenAPI 3.1, Avro on Kafka                         |
| Data Management Services     | PostgreSQL, DynamoDB, S3 (parquet)                 |
| Graphics & Image Services    | Cloudinary                                         |
| International Operations     | i18next + ICU MessageFormat                        |
| Location & Directory         | OIDC discovery + Service Catalog                   |
| Network Services             | AWS PrivateLink, Cloudflare for edge              |
| Operating System Services    | Amazon Linux 2023, Ubuntu LTS                      |
| Software Engineering         | GitHub, GitHub Actions, Snyk                       |
| Transaction Processing       | Kafka transactions; Saga orchestrator              |
| User Interface Services      | React, Northwind Design System                     |
| Security Services            | Vault, SPIFFE/SPIRE, Cloudflare Zero Trust         |
| System & Network Mgmt        | Terraform, Crossplane, ArgoCD                      |
| **Event Streaming** *(NW)*   | Apache Kafka (MSK), Schema Registry                |
| **Service Mesh & Identity** *(NW)* | Istio + SPIFFE                              |
