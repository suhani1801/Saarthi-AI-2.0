# Architecture Research

**Domain:** Government Scheme Recommendation Engine & Accessibility Portal
**Researched:** 2026-07-20
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                       React Frontend                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌──────────┐  ┌──────────┐       │
│  │ UI Views│  │ Speech  │  │Vibration │  │ i18n     │       │
│  │ (A11y)  │  │ Engine  │  │ Cues     │  │ Controller│      │
│  └────┬────┘  └────┬────┘  └────┬─────┘  └────┬─────┘       │
│       │            │            │             │             │
├───────┴────────────┴────────────┴─────────────┴─────────────┤
│                    Node.js + Express API                    │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │         Auth Gateway & API Proxy Coordinator        │    │
│  └──────────────────┬────────────────────────┬─────────┘    │
│                     │                        │              │
├─────────────────────▼────────────────────────▼──────────────┤
│  FastAPI AI Microservice            Supabase DB             │
│  ┌───────────────────────┐          ┌────────────────────┐  │
│  │ Rule eligibility check│          │ User Profiles      │  │
│  ├───────────────────────┤          ├────────────────────┤  │
│  │ Vector ranking        │          │ Schemes Catalog    │  │
│  ├───────────────────────┤          ├────────────────────┤  │
│  │ LLM Explanation Layer │          │ Vector Store       │  │
│  └───────────────────────┘          └────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| React Frontend | Handles WAI-ARIA accessible layouts, Speech Synthesis (TTS) & Recognition (STT), Vibration feedback, and locale translations. | Vite React SPA with Vanilla CSS for styling. |
| Node.js Backend | Acts as secure gateway. Performs user authentication checks, handles Supabase credentials, and acts as API orchestrator. | Node.js Express server using the Supabase Node JS SDK. |
| FastAPI AI Service | Executes deterministic scheme rules matching, computes cosine similarity on vector embeddings of schemes, and interfaces with LLM. | Python FastAPI server using OpenAI / LangChain APIs. |
| Supabase Database | Stores user profile, schemes catalog, and pgvector embeddings. Handles Row Level Security (RLS). | Cloud Postgres instance. |

## Recommended Project Structure

```
saarthi-ai/
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/      # Reusable accessibility-ready components
│       ├── hooks/           # useSpeech, useVibrate, useTTS custom hooks
│       ├── locales/         # i18n translation files
│       ├── styles/          # Accessible Vanilla CSS layouts
│       ├── App.jsx
│       └── main.jsx
├── backend/
│   ├── src/
│   │   ├── middleware/      # Auth & Rate limit middlewares
│   │   ├── routes/          # Express API endpoints
│   │   └── server.js
│   ├── package.json
│   └── .env.example
├── ai-service/
│   ├── app/
│   │   ├── models/          # Schemas & data structures
│   │   ├── services/        # Rule engine, Vector ranker, LLM services
│   │   └── main.py          # FastAPI application entrypoint
│   ├── requirements.txt
│   └── .env.example
└── supabase/
    └── migrations/          # DB Schemas, table setups, and pgvector settings
```

## Architectural Patterns

### Pattern 1: Rule-First Hybrid Recommendation

**What:** Deterministic rule filtering executes on Postgres (via supabase) or FastAPI local memory before invoking vector search or LLM matching.
**When to use:** Crucial for government schemes where hard eligibility parameters (e.g., maximum age, income limits) are binary and non-negotiable.
**Trade-offs:** Avoids LLM hallucinations of eligibility, increases speed by reducing the search space, but requires hard-coding rule structures.

### Pattern 2: Speech & Vibration Context Hooks

**What:** Centralized React Context providing unified control over voice synthesis, voice recognition, and vibration cues.
**When to use:** Simplifies adding accessibility feedback to any component across the tree without repeating voice engine initialization.

## Data Flow

### Request Flow

```
[User Form / Voice Input]
    ↓
[React Custom Hook / State]
    ↓ (API Request)
[Node.js Express Proxy]
    ↓ (Internal Route)
[FastAPI AI Service] ──(Query)──> [Supabase pgvector]
    ↓ (Retrieve Schemes)
[FastAPI Engine (Rules + Embeddings)]
    ↓ (Explain via LLM)
[Multilingual Simplified Summary]
    ↓ (Response JSON)
[React Fronted (Renders + Vocalizes + Vibrates)]
```

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users | Single dyno backend, free-tier Supabase, local CPU sentence-transformers for vector embeddings. |
| 1k-100k users | Horizontal scale backend containers, Supabase pro tier, cache embeddings of schemes, delegate embedding calculations to serverless functions. |

## Anti-Patterns

### Anti-Pattern: LLM-Only Matching

**What people do:** Pass user profile and all schemes directly to an LLM prompt to ask: "Which schemes is this user eligible for?"
**Why it's wrong:** LLMs regularly hallucinate eligibility numbers, miss strict rules (e.g. state residency), and become extremely expensive as the catalog grows.
**Do this instead:** Apply strict database filters first, run vector similarity next, and use LLM only to format/explain the matches.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Supabase Auth | Supabase client auth hooks | Standard authentication, JWT verification in Node.js. |
| OpenAI API / LLM | Async FastAPI router | Used to summarize matching scheme texts for easy reading. |

---
*Architecture research for: Saarthi AI 2.0*
*Researched: 2026-07-20*
