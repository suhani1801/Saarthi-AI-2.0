# Feature Research

**Domain:** Government Scheme Recommendation Engine & Accessibility Portal
**Researched:** 2026-07-20
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Scheme Catalog | Users need to browse available schemes. | LOW | Standard list/grid view with category tabs. |
| User Profile Form | Users must input demographics, income, state, etc. to match schemes. | MEDIUM | Standard form fields with validation. |
| Basic Search / Filters | Quick filtering by category (Education, Agriculture, Housing, etc.). | LOW | Database-level text filtering. |
| Multilingual Static Content | Users in India require regional language interfaces. | MEDIUM | React i18next integration for static strings. |

### Differentiators (Competitive Advantage)

Features that set the product apart. Not required, but valuable.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Multimodal Voice-Guided Onboarding | Allows visually impaired or illiterate users to fill details via speaking. | HIGH | Uses SpeechRecognition for input and SpeechSynthesis for instructions. |
| Vibration-Based Mobile Guidance | Directs users with hearing impairment through key form milestones. | MEDIUM | Uses HTML5 Vibration API (`navigator.vibrate`) for form highlights. |
| AI Document OCR Extraction | Uploading Aadhaar or income certificates to pre-populate profiles. | HIGH | FastAPI uses OCR (Tesseract / EasyOCR) + LLM parsing to extract metadata. |
| Semantic Scheme Similarity | Ranks schemes based on match percentage and semantic fit. | HIGH | Uses Sentence-Transformers to compute similarity scores on user profiles. |
| LLM Multilingual Summaries | Simplifies complex government legal scheme text into easy-read audio-friendly summaries. | HIGH | FastAPI routes scheme text to LLM to create simple explanations. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Integrated Application Submission | Users want to apply directly from the app. | Extremely high compliance and legal risk, requires official API integrations that don't exist. | Provide direct links to official scheme portals. |
| Continuous GPS Location Tracking | To auto-fill user state and district. | Creates privacy anxiety and drains mobile battery. | Simple dropdown select with prompt for location access. |

## Feature Dependencies

```
[Voice Onboarding] ──requires──> [User Profile Form]
[AI Doc Extraction] ──populates──> [User Profile Form]
[Semantic Ranking] ──requires──> [User Profile Form] 
[LLM Summaries] ──enhances──> [Scheme Catalog]
```

### Dependency Notes

- **Voice Onboarding requires User Profile Form:** Voice commands map directly to backend form fields.
- **AI Doc Extraction populates User Profile Form:** Scans documents, extracts fields, and autofills the form before validation.
- **Semantic Ranking requires User Profile Form:** Vector similarity matches the unified user profile with scheme requirements.
- **LLM Summaries enhances Scheme Catalog:** Renders the scheme details in simplified language.

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to validate the concept.

- [ ] **Accessibility UI & High Contrast:** Basic accessible layout conforming to WCAG standards.
- [ ] **Multi-Modal Profile Form:** Input profile details with screen reader labels and keyboard shortcuts.
- [ ] **Deterministic Rules Engine:** Filter out schemes user is 100% ineligible for.
- [ ] **Scheme Catalog & Details:** Browse matching schemes.
- [ ] **Voice Assistance (Basic):** Speech synthesis to read aloud selected schemes.

### Add After Validation (v1.x)

Features to add once core is working.

- [ ] **Multilingual support (i18n):** Adding Hindi, Tamil, Telugu, etc.
- [ ] **Speech-to-Text Input:** Filling forms via speech.
- [ ] **Vibration Cues:** Interactive mobile vibration feedbacks.

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] **AI OCR Document Extraction:** Scan Aadhaar, etc. to autofill profile.
- [ ] **Fully LLM-verified eligibility checks:** Cross-referencing edge cases with GPT models.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Deterministic Rules Engine | HIGH | MEDIUM | P1 |
| Scheme Catalog & Info View | HIGH | LOW | P1 |
| High Contrast & Screen Reader Labels | HIGH | LOW | P1 |
| Text-to-Speech Scheme Reader | HIGH | MEDIUM | P1 |
| Multilingual Static Content | HIGH | MEDIUM | P2 |
| Speech-to-Text Voice Form Onboarding | HIGH | HIGH | P2 |
| Vibration Guidance | MEDIUM | LOW | P2 |
| AI OCR Document Extraction | MEDIUM | HIGH | P3 |

---
*Feature research for: Saarthi AI 2.0*
*Researched: 2026-07-20*
