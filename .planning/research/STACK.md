# Stack Research

**Domain:** Government Scheme Recommendation Engine & Accessibility Portal
**Researched:** 2026-07-20
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | ^18.3.0 | Frontend framework | Highly component-based, has rich ecosystem for accessibility hooks (Aria), and integrates smoothly with Web Speech APIs. |
| Node.js + Express | ^20.x / ^4.19.0 | API Gateway / Orchestration backend | Lightweight backend to secure API keys, manage Supabase sessions, log requests, and proxy to FastAPI. |
| FastAPI (Python) | ^0.111.0 | AI and Recommendation microservice | Extremely fast async Python framework ideal for orchestrating data processing, eligibility rule checks, and LLM integrations. |
| Supabase | Cloud | Database, Vector DB, and Authentication | Provides Postgres with `pgvector` for scheme search, built-in Auth (JWT), and rapid deployment of secure database rules (RLS). |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Radix UI (Primitives) | ^1.0.0 | Accessible unstyled UI primitives | To build screen-reader compliant dialogs, menus, and forms without locking into a visual theme. |
| pgvector | ^0.5.0 | Supabase Postgres extension for vector embeddings | For storing and executing cosine similarity search on scheme vector embeddings. |
| Sentence-Transformers / OpenAI Embeddings | ^3.0.0 / SDK | Text embedding generation | Used in FastAPI to convert user eligibility profiles and scheme descriptions to vectors. |
| SpeechRecognition & SpeechSynthesis | Web API | Multilingual voice assistance | Directly in the React frontend to provide text-to-speech instructions and speech-to-text input. |
| Helmet + CORS | ^7.1.0 | Security headers and CORS | Node.js Express backend middleware to secure API requests. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Vite | Frontend build tool | Fast development reload, lightweight bundling. |
| Uvicorn | ASGI server for FastAPI | Async server for high-performance Python FastAPI service. |
| Postman / Insomnia | Endpoint testing | For testing the communication loop: React -> Node.js -> FastAPI -> Supabase. |

## Installation

```bash
# Frontend (React + Radix primitives)
cd frontend
npm install @radix-ui/react-accessible-icon @radix-ui/react-dialog @supabase/supabase-js

# Backend (Node.js + Express)
cd backend
npm install express dotenv cors helmet @supabase/supabase-js axios

# AI Service (Python FastAPI)
cd ai_service
pip install fastapi uvicorn pydantic supabase sentence-transformers numpy openai
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| FastAPI (Python) | Node.js for everything | If team lacks Python experience, but Node.js is less optimized for embedding models and AI SDKs. |
| Supabase (pgvector) | Pinecone / Weaviate | If the scheme dataset is in millions (Supabase pgvector handles thousands of schemes easily without extra billing). |
| Vanilla CSS | TailwindCSS | If styling standard components needs speed, but vanilla CSS is preferred for fine-tuning custom accessibility sheets. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Client-side LLM calls | Exposes private API keys, increases mobile bundle size, and slows down client execution. | Proxy through FastAPI AI Service. |
| Direct DB queries from React | Security risk, bypasses rule-based filtering, and violates architecture boundaries. | Route requests through Node.js Express API. |

## Stack Patterns by Variant

**If Mobile App Wrapper Needed:**
- Use Capacitor or React Native Web
- Because vibration API is more reliable inside native wrappers, although standard browser mobile vibration API works in Android browsers.

**If Low-Bandwidth Offline Matching is Required:**
- Cache scheme rules on local device database (Dexie.js / IndexedDB)
- Because fetching remote FastAPI embeddings requires continuous internet.

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `@supabase/supabase-js@^2.43.0` | `supabase@^1.170.0` (CLI) | Ensure compatibility in local development and production. |
| `fastapi@^0.111.0` | `pydantic@^2.7.0` | FastAPI v0.111 fully supports Pydantic v2 validation. |

## Sources

- Official W3C Web Accessibility Guidelines (WCAG 2.2)
- Supabase Vector DB / pgvector official documentation
- FastAPI Documentation on AI integrations

---
*Stack research for: Saarthi AI 2.0*
*Researched: 2026-07-20*
