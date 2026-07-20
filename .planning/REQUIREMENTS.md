# Requirements: Saarthi AI 2.0

**Defined:** 2026-07-20
**Core Value:** Ensure every citizen, regardless of physical ability or literacy level, can effortlessly discover and understand government schemes they are eligible for.

## v1 Requirements

### Accessibility & UI (AccessUI)

- [ ] **ACC-01**: User can toggle high-contrast layout, large text, and keyboard navigation.
- [ ] **ACC-02**: All interactive components are screen-reader compliant (WAI-ARIA labels).
- [ ] **ACC-03**: Tactile vibration cues on mobile devices guide hearing-impaired users through form milestones.
- [ ] **ACC-04**: Visual pulse animations serve as accessibility cues when browser vibration API is unsupported (e.g. iOS).
- [ ] **ACC-05**: Interface automatically adapts based on user profile (voice-first for visually impaired, tactile for hearing-impaired, easy-read for low-literacy).

### Audio & Language Engine (AudioEngine)

- [ ] **AUD-01**: Text-to-speech (TTS) engine reads aloud scheme descriptions, eligibility conditions, and matching outcomes.
- [ ] **AUD-02**: Audio-lock synchronization mutes speech recognition when speech synthesis is active to prevent microphone feedback loops.
- [ ] **AUD-03**: Speech-to-text (STT) voice onboarding allows users to populate their profile form via voice commands.
- [ ] **AUD-04**: Multilingual audio input and output support for Hindi, Marathi, and English.

### Matching Engine (Matching)

- [ ] **MAT-01**: Deterministic rules engine validates user profile against binary scheme parameters (age, income, location, category).
- [ ] **MAT-02**: Vector similarity search ranks eligible schemes based on matching user profile context.
- [ ] **MAT-04**: Offline-friendly caching of matched schemes using IndexedDB / local storage for low-connectivity rural areas.

### Scheme Info (SchemeInfo)

- [ ] **SCH-01**: User can browse schemes catalog by categories (Education, Agriculture, Housing, Health).
- [ ] **SCH-02**: LLM-powered multilingual generator simplifies complex scheme guidelines into easy-read summaries.
- [ ] **SCH-04**: AI-generated eligibility explanations provide match confidence indicators and official-source references.

## v2 Requirements

### Matching

- **MAT-03**: Fully LLM-verified eligibility matching edge cases.

### Scheme Info

- **SCH-03**: Direct scheme application submission forms integrated with official portals.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Processing official applications | Legal and compliance liabilities; outside scope of MVP recommendation service. |
| Biometric database storage | Privacy and data protection regulations; profiles should store only metadata. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ACC-01 | Phase 2 | Pending |
| ACC-02 | Phase 2 | Pending |
| ACC-03 | Phase 2 | Pending |
| ACC-04 | Phase 2 | Pending |
| ACC-05 | Phase 4 | Pending |
| AUD-01 | Phase 2 | Pending |
| AUD-02 | Phase 2 | Pending |
| AUD-03 | Phase 4 | Pending |
| AUD-04 | Phase 4 | Pending |
| MAT-01 | Phase 3 | Pending |
| MAT-02 | Phase 3 | Pending |
| MAT-04 | Phase 1 | Pending |
| SCH-01 | Phase 1 | Pending |
| SCH-02 | Phase 3 | Pending |
| SCH-04 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 15 total
- Mapped to phases: 15
- Unmapped: 0 ✓

---
*Requirements defined: 2026-07-20*
*Last updated: 2026-07-20 after initial definition*
