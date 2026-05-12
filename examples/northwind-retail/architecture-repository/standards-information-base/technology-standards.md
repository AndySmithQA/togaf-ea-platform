# Technology Standards

> Owner: Domain Architect (Technology) · Status: Approved · Version: 5.4

| Category                | Standard                                       | Status   | Replaces        |
| ----------------------- | ---------------------------------------------- | -------- | --------------- |
| Cloud platform          | AWS (primary), Azure (federated for finance)   | Approved | —               |
| Container runtime       | Kubernetes (EKS / AKS)                         | Approved | ECS-classic     |
| Service mesh            | Istio + SPIFFE service identity                | Approved | —               |
| Eventing                | Apache Kafka (MSK)                             | Approved | RabbitMQ        |
| API style               | REST + JSON, OpenAPI 3.1; gRPC for internal    | Approved | SOAP            |
| Identity (workforce)    | OIDC via Entra ID                              | Approved | LDAP            |
| Identity (customer)     | OIDC via Northwind CIAM                        | Approved | bespoke logins  |
| Observability           | OpenTelemetry → Grafana stack                  | Approved | Splunk app logs |
| Secrets                 | HashiCorp Vault                                | Approved | KeePass shares  |
| Source control          | GitHub Enterprise                              | Approved | BitBucket       |
| CI/CD                   | GitHub Actions + ArgoCD                        | Approved | Jenkins         |
| Infrastructure-as-code  | Terraform 1.7+                                 | Approved | CloudFormation  |
| Languages (preferred)   | Go, TypeScript, Python; Java only for legacy   | Approved | C# (decommission) |
| Browser compatibility   | Latest 2 of Chrome/Edge/Safari/Firefox         | Approved | IE11            |

## Lifecycle

- **Approved**: in active use, recommended.
- **Trial**: piloted, with named owner.
- **Hold**: do not adopt for new work.
- **Retire**: existing instances must migrate by stated date.
