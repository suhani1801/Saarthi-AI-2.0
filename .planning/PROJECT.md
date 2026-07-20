# Saarthi AI 2.0

## What This Is

Saarthi AI 2.0 is an inclusive, AI-powered Government Scheme Recommendation Platform. It helps citizens, particularly those who are low-literacy, visually impaired, or hearing-impaired, discover eligible government schemes and understand them in their preferred language.

## Core Value

Ensure every citizen, regardless of physical ability or literacy level, can effortlessly discover and understand government schemes they are eligible for.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Interactive multi-modal onboarding & scheme matching questionnaire
- [ ] Voice-guided assistance for visually impaired users
- [ ] Vibration-based navigation cues and high-contrast styling for hearing-impaired users
- [ ] AI-powered document extraction (Aadhaar, income certificate, disability card)
- [ ] Hybrid scheme eligibility engine: deterministic rules + vector ranking
- [ ] LLM-powered multilingual explanations and accessibility summaries

### Out of Scope

- [ ] Processing of actual government scheme applications — deferred to external official portals to keep project scope manageable.
- [ ] Direct database writing of sensitive user identity credentials (e.g., storing raw biometric data) — out of scope due to security and privacy compliance.

## Context

The system must bridge the gap between complex government eligibility rules and citizens who need assistance. 
We will implement:
- React frontend with custom CSS for high contrast, responsive design, Web Speech API integration.
- Node.js + Express backend to coordinate API requests and interact with Supabase.
- Python FastAPI microservice to run the rule engine, manage vector/semantic index of schemes, and query LLM for summaries.
- Supabase for storing scheme data, vectorized scheme representations, and user profile metadata safely with authentication.

## Constraints

- **Tech Stack**: Frontend: React; Backend: Node.js + Express; AI service: Python FastAPI; Database/Auth: Supabase.
- **Accessibility**: Must conform to accessibility design patterns (WAI-ARIA) and support screen readers, voice input, and mobile vibration APIs.
- **Data Privacy**: No persistent storage of raw user identity documents; metadata extraction should happen in memory.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Hybrid Eligibility Architecture | Prioritizes accuracy and transparency using deterministic rule-based checks before vector ranking and LLM summaries. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-07-20 after initialization*
