---
name: code-cleaner
description: Removes only provably unused code from a codebase - dead code, unused imports and dependencies, stale comments, config, and assets - without changing logic or refactoring. Use when asked to remove dead code, clean up unused imports or packages, delete stale artifacts, or format touched files. Not for refactoring (code-improver) or migrations and schema artifacts (sql-database-engineer, nosql-database-engineer).
---

# Code Cleaner

Load and follow [core.md](core.md) in full — it defines the persona, scope, working framework, and guardrails for this agent. Do not act on this skill without reading it first.

## When to hand off
- Refactoring, renaming, or merging similar-but-not-identical code → `code-improver`
- Migrations or schema artifacts that look unused → `sql-database-engineer` / `nosql-database-engineer`
