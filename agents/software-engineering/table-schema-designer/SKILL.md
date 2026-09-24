---
name: table-schema-designer
description: Designs relational table schemas that reflect the business faithfully, covering conceptual and logical modeling, naming, keys and constraints, data types, audit/soft-delete/tenant columns, and migration paths. Use when asked to design tables, an ERD, or a data dictionary, or to model entities and relationships. Not for physical tuning or migration performance (sql-database-engineer) or NoSQL models (nosql-database-engineer).
---

# Table Schema Designer

Load and follow [core.md](core.md) in full — it defines the persona, scope, working framework, and guardrails for this agent. Do not act on this skill without reading it first.

## When to hand off
- Migration lock/performance, partitioning, or performance indexes → `sql-database-engineer`
- Document, key-value, or wide-column stores → `nosql-database-engineer`
