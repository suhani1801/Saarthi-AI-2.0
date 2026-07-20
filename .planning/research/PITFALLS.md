# Pitfalls Research

**Domain:** Government Scheme Recommendation Engine & Accessibility Portal
**Researched:** 2026-07-20
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Speech Synthesis and Recognition Feedback Loop

**What goes wrong:**
Speech recognition activates while speech synthesis (TTS) is still reading out text. The microphone picks up the system's own audio, interprets it as user input, and triggers a loop of repetitive vocalizations and page actions.

**Why it happens:**
Lack of state synchronization between SpeechSynthesis and SpeechRecognition controllers.

**How to avoid:**
Implement an audio lock state. Ensure SpeechRecognition is strictly paused/disabled when SpeechSynthesis is active (speaking), and only resume listening when the `onend` callback of SpeechSynthesis fires.

**Warning signs:**
Double voice activation or constant "Unknown input" warnings when the platform reads a scheme description.

**Phase to address:**
Phase 2 (Accessibility Infrastructure & Audio Engine).

---

### Pitfall 2: LLM Hallucinations of Scheme Rules

**What goes wrong:**
The system matches the user with a scheme they are completely ineligible for, causing frustration and wasted effort if they try to apply.

**Why it happens:**
Relying on the LLM to read the scheme description and "decide" eligibility, rather than coding deterministic boundary checks (like age <= 50, income <= 250000).

**How to avoid:**
Execute a rule-based deterministic filter step before passing schemes to vector ranking or LLM summarization. Only allow LLMs to summarize schemes that have already passed all hard binary checks.

**Warning signs:**
Matches where the user's income is above the scheme's limit, but the LLM still recommends it because "the user needs assistance."

**Phase to address:**
Phase 3 (Eligibility Matching Service).

---

### Pitfall 3: Vibration API Compatibility Issues

**What goes wrong:**
Vibration feedback cues fail to trigger on iOS devices, causing a silent crash or breaking the user flow for hearing-impaired users.

**Why it happens:**
Apple does not support the HTML5 Web Vibration API (`navigator.vibrate`) in iOS Safari due to security/annoyance policies.

**How to avoid:**
Always wrap vibration calls in a feature detection check (`if (navigator.vibrate) { ... }`). Provide alternative visual blinking alerts or CSS animation ripples for devices where vibration is unavailable.

**Warning signs:**
Errors in console logs: `TypeError: navigator.vibrate is not a function`.

**Phase to address:**
Phase 4 (Frontend UI & Form Integration).

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoded Scheme Rules | Faster initial setup. | Updating rules requires redeploying the FastAPI code. | Okay for MVP v1 with < 10 schemes. |
| Browser-only Translation (i18n) | Simple client setup. | Slow load time as JSON translations grow; hard to update dynamically. | Acceptable for static labels only. |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Live Embedding Generation | High API latency on profile submission. | Pre-generate and store scheme embeddings in Supabase using `pgvector`. Only embed the user's profile text at runtime. | Breaks around 50 users concurrently. |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Storing Aadhaar / Identity Docs | Legal liability, identity theft, compliance issues. | Never save uploaded PDFs or extracted text to the DB. Run extraction in-memory, populate the form, and discard the file. |
| Insecure API keys | Stealing OpenAI keys. | Never expose API keys to React. Route all LLM and OpenAI tasks through Node.js Express proxy or FastAPI. |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Overwhelming Audio Content | Users get tired of hearing long scheme texts read out. | Break text into short, actionable highlights. Allow users to press "Space" to skip or pause audio. |

---
*Pitfalls research for: Saarthi AI 2.0*
*Researched: 2026-07-20*
