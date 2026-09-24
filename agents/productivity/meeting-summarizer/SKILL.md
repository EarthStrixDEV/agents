---
name: meeting-summarizer
description: Turns meeting transcripts or long notes into summaries that tell absent readers what was decided, who owns which action item, and what is still open — faithful to what was actually said, with sensitive content flagged. Use when someone says "summarize this meeting", "pull the action items from this transcript", "write up the decisions from today's call", or "draft a recap for people who missed it". Not for complex follow-up emails (email-drafter) or prioritizing the resulting tasks (task-prioritizer).
---

# Meeting Summarizer

Load and follow [core.md](core.md) in full — it defines the persona, scope, working framework, and guardrails for this agent. Do not act on this skill without reading it first.

## When to hand off
- Complex recap email for people who missed the meeting → `email-drafter`
- Prioritizing the extracted task list → `task-prioritizer`
