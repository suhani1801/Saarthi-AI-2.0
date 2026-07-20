# Roadmap: Saarthi AI 2.0

## Overview

Saarthi AI 2.0 will be built following a Vertical MVP model. The project begins by establishing the database schema and a basic scheme catalog (Phase 1), followed by implementing the core client accessibility shell (Phase 2). Next, we deploy the Python FastAPI eligibility checking and vector similarity matching services (Phase 3). We then integrate these layers to build accessible multi-modal user onboarding flows (Phase 4). The project concludes with testing, WCAG audits, and staging deployment (Phase 5).

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Database Setup & Core API Gateway** - DB schemas, Express server setup, local caching.
- [ ] **Phase 2: Accessibility Core & Audio Engine** - React shell, TTS/STT contexts, vibration & visual cues.
- [ ] **Phase 3: Python FastAPI Matcher & AI Service** - Rule-based matching, pgvector ranking, LLM summaries.
- [ ] **Phase 4: Multi-Modal Onboarding & Dynamic UI** - Wiring frontend forms, speech-to-text input, dynamic adaptation.
- [ ] **Phase 5: Verification, Accessibility Audit & Launch** - Unit testing, WCAG compliance report, staging deployment.

## Phase Details

### Phase 1: Database Setup & Core API Gateway
**Goal**: Set up the project repository directories, configure Supabase tables/Auth, seed initial schemes, and implement local caching for offline use.
**Mode**: mvp
**Depends on**: Nothing (first phase)
**Requirements**: [SCH-01, MAT-04]
**Success Criteria** (what must be TRUE):
  1. Supabase Postgres database has `schemes` and `profiles` tables initialized.
  2. Node.js backend can authenticate calls and query schemes.
  3. Offline caching (IndexedDB/local storage) successfully caches the fetched schemes on the client.
**Plans**: 3 plans

Plans:
- [ ] 01-01: Initialize directories, package files, environment variables, and gitignores.
- [ ] 01-02: Deploy Supabase database schemas, migration files, and seed data.
- [ ] 01-03: Create Node.js Express server to serve as API gateway with cached local storage support.

### Phase 2: Accessibility Core & Audio Engine
**Goal**: Create the frontend interface shell with WAI-ARIA compliance, and configure SpeechSynthesis/Recognition and vibration utilities.
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: [ACC-01, ACC-02, ACC-03, ACC-04, AUD-01, AUD-02]
**Success Criteria** (what must be TRUE):
  1. User can toggle high contrast and adjust font sizes.
  2. Screen readers read aloud all page headings and form fields.
  3. Browser speaks scheme texts via TTS without microphone echo using the audio lock.
  4. Non-iOS mobile devices trigger tactile vibrations on form interactions; iOS devices trigger visual pulse animations.
**Plans**: 3 plans

Plans:
- [ ] 02-01: Create React SPA with accessible CSS styling (contrast toggle, large text).
- [ ] 02-02: Implement SpeechContext hook supporting audio lock between TTS and STT.
- [ ] 02-03: Implement VibrateContext hook with vibration patterns and visual ripple fallback.

### Phase 3: Python FastAPI Matcher & AI Service
**Goal**: Implement the Python FastAPI microservice to execute the rule-based filtering, vector similarity, and LLM summary generation.
**Mode**: mvp
**Depends on**: Phase 1
**Requirements**: [MAT-01, MAT-02, SCH-02, SCH-04]
**Success Criteria** (what must be TRUE):
  1. FastAPI rules engine filters out ineligible schemes.
  2. FastAPI calculates embeddings on profiles and performs cosine similarity search via pgvector.
  3. LLM returns simplified multilingual explanations with confidence scores.
**Plans**: 3 plans

Plans:
- [ ] 03-01: Set up FastAPI server and connect to Supabase database.
- [ ] 03-02: Build deterministic rule-matching logic and pgvector similarity ranking service.
- [ ] 03-03: Integrate LLM API to generate easy-read scheme summaries and explanations.

### Phase 4: Multi-Modal Onboarding & Dynamic UI
**Goal**: Build the front-end questionnaire and details interface, wiring voice-first onboarding, multi-lingual translations, and rule matching.
**Mode**: mvp
**Depends on**: Phase 2, Phase 3
**Requirements**: [ACC-05, AUD-03, AUD-04]
**Success Criteria** (what must be TRUE):
  1. User can fill in the onboarding form entirely via voice commands (Hindi/Marathi/English) or keyboard.
  2. Interface automatically adapts (e.g. switches to voice-first or easy-read) based on user profile preferences.
  3. Questionnaire dynamically displays matches and speaks recommendations.
**Plans**: 3 plans

Plans:
- [ ] 04-01: Create accessible Multi-Modal Onboarding Form in React.
- [ ] 04-02: Wire voice input commands (STT) and i18n locales to the form.
- [ ] 04-03: Connect UI forms to Node.js backend proxy and FastAPI matcher endpoints.

### Phase 5: Verification, Accessibility Audit & Launch
**Goal**: Audit the application against WCAG standards, run end-to-end user tests, and deploy to staging.
**Mode**: mvp
**Depends on**: Phase 4
**Requirements**: [ACC-01, ACC-02, ACC-05]
**Success Criteria** (what must be TRUE):
  1. 100% test coverage on core rules engine.
  2. WCAG 2.2 accessibility checklist audit successfully completed.
  3. App is fully verified end-to-end from user voice onboarding to match read-out.
**Plans**: 2 plans

Plans:
- [ ] 05-01: Write backend unit tests and frontend component tests.
- [ ] 05-02: Deploy frontend and backend stacks and perform final UAT.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Database Setup & Core API Gateway | 0/3 | Not started | - |
| 2. Accessibility Core & Audio Engine | 0/3 | Not started | - |
| 3. Python FastAPI Matcher & AI Service | 0/3 | Not started | - |
| 4. Multi-Modal Onboarding & Dynamic UI | 0/3 | Not started | - |
| 5. Verification, Accessibility Audit & Launch | 0/2 | Not started | - |
