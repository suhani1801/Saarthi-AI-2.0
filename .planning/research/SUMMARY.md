# Project Research Summary

**Project:** Saarthi AI 2.0
**Domain:** Government Scheme Recommendation Engine & Accessibility Portal
**Researched:** 2026-07-20
**Confidence:** HIGH

## Executive Summary

Saarthi AI 2.0 is an inclusive, accessibility-first platform designed to help underprivileged, disabled, or low-literacy citizens discover and understand government welfare schemes. Standard recommendation platforms rely on text-heavy web interfaces, which fail users with visual, hearing, or literacy challenges. Saarthi AI 2.0 bridges this gap by integrating multi-modal interfaces—including text-to-speech instructions, voice-guided input, and tactile vibration alerts—with a high-accuracy, hybrid eligibility matching engine.

The core technical challenge is ensuring absolute accuracy of eligibility recommendations while maintaining a fluid, non-blocking accessible user experience. We address this through a tiered architecture: React handles native browser accessibility APIs; Node.js coordinates user authentication and secure endpoints; and Python FastAPI hosts the rule-based filtering, vector ranking, and LLM explanation layer, all backed by a Supabase Postgres instance.

Primary implementation risks include Web Speech feedback loops (where the system reads its own voice) and LLM hallucinations regarding scheme eligibility rules. We mitigate these risks using structured audio locks in React and strict rule-based deterministic filters in the backend before applying AI ranking or explanations.

## Key Findings

### Recommended Stack

Our stack combines accessibility-compatible frontend tools, a secure Node.js middleware layer, a Python AI engine, and a Postgres DB.

**Core technologies:**
- **React (Vite):** Accessible SPA framework. Direct support for Web Speech API and Radix UI accessible primitives.
- **Node.js (Express):** Secure gateway to protect API keys, verify Supabase JWTs, and handle proxy requests.
- **FastAPI (Python):** Performance-oriented Python service for executing embedding models, rule engines, and LLM requests.
- **Supabase (Postgres + pgvector):** DB with built-in vector search capability for indexing and ranking schemes.

### Expected Features

**Must have (table stakes):**
- **Scheme Catalog:** User-friendly browsing list of all available government schemes.
- **User Profile Questionnaire:** Secure form input capturing age, state, income, and category.
- **High-Contrast View & Large Text:** Native CSS configurations for visually impaired users.
- **Text-to-Speech Scheme Reader:** Reads scheme name, benefits, and eligibility rules aloud.

**Should have (competitive):**
- **Speech-to-Text Voice Form Onboarding:** Allows users to answer questionnaire details via voice commands.
- **Vibration Feedback Cues:** Mobile device vibration patterns signaling success, error, or next steps in the form.
- **Hybrid Similarity Ranking:** Ranks eligible schemes by semantic relevance using vector search.
- **LLM Multilingual Explanations:** Explains matching schemes in simple, easy-read regional language summaries.

**Defer (v2+):**
- **AI OCR Document Extraction:** Scan identity cards to auto-populate profiles.
- **Integrated Application Portal:** Submission of scheme forms directly to government services.

### Architecture Approach

We implement a decoupled client-server architecture with dedicated API gateways and microservices.

**Major components:**
1. **React Client:** Manages layout views, SpeechContext, VibrateContext, and locale states.
2. **Node.js Gateway:** Handles CORS, Supabase session validation, and routes requests to FastAPI.
3. **FastAPI Service:** Runs deterministic rule checks first, performs pgvector cosine similarity search, and queries the LLM for simplified summaries.

### Critical Pitfalls

1. **Speech Feedback Loops:** Visually impaired users experience echoing loops where speech-to-text listens to text-to-speech synthesis. *Mitigation:* Audio-lock custom React hook to mute recognition during speaking.
2. **LLM Rule Hallucinations:** AI engines recommendation of schemes users are ineligible for. *Mitigation:* Deterministic rule engine filters the dataset before AI processing.
3. **iOS Vibration Discrepancies:** Lack of Vibration API support in Apple Safari. *Mitigation:* Soft-fails via visual ripple animations.

## Implications for Roadmap

Suggested phase structure:

### Phase 1: Database Setup & Core API Gateway
**Rationale:** Establishing DB and connection layer first allows other components to share a mockable schema.
**Delivers:** Supabase tables (schemes, profiles), database migrations, and Node.js Express server proxying Supabase client calls.
**Uses:** Node.js, Express, Supabase.

### Phase 2: Accessibility Infrastructure & Audio Engine
**Rationale:** Speech synthesis and recognition need to be stable before building complex forms on top of them.
**Delivers:** React base shell, SpeechSynthesis/Recognition context provider with audio lock hooks, VibrateContext, and high contrast styling system.
**Avoids:** Speech Feedback Loops (Pitfall 1).

### Phase 3: Eligibility Matcher & AI Service
**Rationale:** Setting up FastAPI and pgvector ensures the frontend in Phase 4 has access to live similarity matching and rule checks.
**Delivers:** Python FastAPI backend, deterministic rules checking, scheme vector embeddings generator, and LLM summary integration.
**Avoids:** LLM Rule Hallucinations (Pitfall 2).

### Phase 4: Frontend UI Integration & User Flows
**Rationale:** Connects the stable accessibility shell (Phase 2) to the matching services (Phase 3) for the final user flow.
**Delivers:** Voice-guided questionnaire forms, scheme catalog browsing, vibration alert triggers, and multilingual locale switching.

### Phase 5: Verification & Launch
**Rationale:** Conducts comprehensive accessibility audits and verification before release.
**Delivers:** Automated test suites, WCAG compliance report, and staging deployment.

### Phase Ordering Rationale
- Data structures and middleware first ensure API boundaries are clearly defined.
- Accessibility hooks are developed early so components are built accessible-by-design, rather than refitted later.
- Core rules engine runs before vector similarity to save computation costs and ensure 100% eligibility accuracy.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Well-tested tools with robust documentation. |
| Features | HIGH | Feasible features; all browser accessibility APIs are standard. |
| Architecture | HIGH | Hybrid scheme avoids LLM limits, keeping processing cheap and accurate. |
| Pitfalls | HIGH | Known Web Speech limitations are resolved using audio locks. |

**Overall confidence:** HIGH

### Gaps to Address
- **Dynamic Rule Management:** How administrators can add/edit scheme rules without writing code (handled by JSON eligibility rules in Supabase schema).

## Sources

- **W3C WCAG 2.2 Guidelines**
- **Supabase pgvector API documentation**
- **Web Speech API specification**

---
*Research completed: 2026-07-20*
*Ready for roadmap: yes*
