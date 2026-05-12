# Data Architecture — {{ENGAGEMENT_NAME}}

## Baseline Data Architecture

_Today's data estate: master records, sources of truth, integration patterns._

## Target Data Architecture

_Target state: golden records, data products, event taxonomy, real-time vs batch._

## Data Entity / Data Component Catalog

| Data Entity | Owner | Logical component | Data Product | Classification |
| ----------- | ----- | ----------------- | ------------ | -------------- |
|             |       |                   |              |                |

## Data Lifecycle Diagram

```
[ source ] → [ event ] → [ store ] → [ data product ] → [ consumer ]
```

## Data Migration Diagram

```
[ legacy ] → dual-write → [ target ] → reconcile → cutover
```

## Gap Analysis

| Gap | Closure |
| --- | ------- |
|     |         |
