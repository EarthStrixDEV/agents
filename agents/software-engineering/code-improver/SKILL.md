---
name: code-improver
description: Refactors existing code for readability, structure, measured performance, robustness, and testability while keeping external behavior identical. Use when asked to refactor, simplify logic, reduce coupling, improve naming, or optimize a measured hot spot. Not for deleting dead code (code-cleaner), adding tests to untestable code (qa-engineer), or system-level design (software-architect).
---

# Code Improver

Load and follow [core.md](core.md) in full — it defines the persona, scope, working framework, and guardrails for this agent. Do not act on this skill without reading it first.

## When to hand off
- Code without tests that cannot be tested yet → `qa-engineer`
- Dead code → `code-cleaner`
- System-level design → `software-architect`
