# Technology Architecture — Omnichannel CX Programme

> Status: Missing (Phase D not yet started) · Owner: Sven Eriksson (Domain Architect, Technology)

## Baseline Technology Architecture

- Hybris on-premise: VMware on Group DC, ~120 hosts, 14 environments.
- Northwind Online cloud landing zone (AWS) limited to e-com microservices.
- POS: store-edge appliances (RHEL 8) over MPLS to Group DC.
- Observability fragmented per stack (Splunk in DC, CloudWatch in AWS).

## Target Technology Architecture

- AWS multi-account landing zone extended to Stores and Wholesale.
- All new workloads on EKS + Istio + SPIFFE service identity.
- Apache Kafka (MSK) is the integration backbone.
- Edge via Cloudflare; private connectivity via PrivateLink for sensitive flows.
- Observability via OpenTelemetry → Grafana stack for all new services.

## Technology Standards Catalog

Inherits Group standards from `standards-information-base/technology-standards.md`. No
engagement-specific deviations proposed.

## Technology Portfolio Catalog

| Category               | Baseline                | Target                          |
| ---------------------- | ----------------------- | ------------------------------- |
| Compute                | VMware on-prem          | AWS EKS                          |
| Storage                | NetApp (DC)             | EBS/S3/RDS/DynamoDB              |
| Eventing               | RabbitMQ + Talend ESB   | Kafka (MSK) + Schema Registry    |
| Identity (workforce)   | LDAP                    | Entra ID OIDC                    |
| Identity (customer)    | per-app stores          | CIAM platform                    |
| Observability          | Splunk + CloudWatch     | OpenTelemetry → Grafana stack    |
| Edge                   | none (DC fronts traffic)| Cloudflare                       |
| Secrets                | KeePass shares          | HashiCorp Vault                  |
| Network                | MPLS hub-and-spoke      | AWS Transit Gateway + PrivateLink|

## Environments and Locations Diagram

```
[ Customer ] ──▶ [ Cloudflare Edge ] ──▶ [ AWS eu-west-2 (prod) ]
                                              │
                                              ├──▶ EKS / Istio / SPIFFE
                                              ├──▶ MSK (Kafka)
                                              ├──▶ RDS / DynamoDB / S3
                                              └──▶ PrivateLink to Group DC (legacy)

[ Store estate ] ──▶ [ SD-WAN ] ──▶ [ AWS eu-west-2 ] (POS to Storefront API)
                                       └──▶ [ Group DC ] (legacy POS during migration)
```

## Platform Decomposition Diagram

```
   ┌──────────────────────────────────────────────┐
   │                Application                   │
   │  Composable Storefront · OMS · CIAM · ...    │
   ├──────────────────────────────────────────────┤
   │              Service Mesh & Identity         │
   │              Istio · SPIFFE/SPIRE            │
   ├──────────────────────────────────────────────┤
   │                Container Platform            │
   │              Kubernetes (EKS) · ArgoCD       │
   ├──────────────────────────────────────────────┤
   │   Data           Eventing           Storage  │
   │ RDS/Dynamo/S3    Kafka (MSK)        S3       │
   ├──────────────────────────────────────────────┤
   │             Cloud Infrastructure (AWS)       │
   └──────────────────────────────────────────────┘
```

## Gap Analysis

| Gap                                | Closure                              |
| ---------------------------------- | ------------------------------------ |
| No estate-wide landing zone        | Extend AWS landing zone              |
| No service identity mesh           | Roll out Istio + SPIFFE              |
| Kafka exists but unused by storefront | Adopt Kafka as event backbone     |
| Observability fragmented           | OTel rollout                         |
| No edge / WAF                      | Cloudflare onboarding                |
