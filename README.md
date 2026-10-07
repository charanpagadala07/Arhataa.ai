# Arhataa.ai

AI-powered candidate screening and shortlisting platform for recruiters.

Arhataa.ai helps hiring teams evaluate large applicant pools against a job description, screening rules, and business priorities without manually reading every resume. The platform combines a modern React frontend with a Spring Boot microservice backend, AI-driven candidate analysis, and secure authentication to create a practical recruitment workflow.

---

## Demo video

Watch the project concept and workflow demo below.

<video controls width="100%" playsinline preload="metadata">
  <source src="/Arhataa.ai_Clip.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---
---

## Overview

Arhataa.ai is designed to reduce the time and effort involved in screening large volumes of applicants. Instead of manually reviewing hundreds or thousands of CVs and spreadsheets, recruiters can:

- Upload applicant data in Excel format
- Provide a job description and custom screening criteria
- Let the system assess candidate fit using AI
- Review ranked candidates and shortlist results
- Save job history and candidate outcomes for later review

The system is intended to support recruiters, not replace them. AI helps filter, rank, and highlight candidates, while humans remain in control of final hiring decisions.

---

## What the platform does

The product flow is straightforward:

1. A recruiter uploads an `.xlsx` file of applicants.
2. The recruiter adds a job description and screening constraints.
3. The backend validates the file and sends the data to the screening service.
4. The screening service processes the data and calls Google Gemini for AI-based candidate evaluation.
5. Candidates are scored, ranked, and returned as a shortlist.
6. The results are stored and displayed through the frontend.

This creates an end-to-end workflow from intake to AI-assisted decision support.

---

## How everything works

### 1. Frontend experience

The frontend is built with React + Vite and provides the recruiter-facing experience. It handles:

- login and authentication
- landing page overview
- applicant upload workflow
- job description input
- screening results and shortlist display
- history tracking for previous screening jobs

The frontend is user-friendly and designed around a simple recruiter journey: sign in, submit a job, review ranked candidates, and shortlist the best-fit applicants.

### 2. API gateway

The API gateway sits in front of the microservices and acts as the single public entry point. It:

- exposes a unified route layer for the frontend
- routes requests to the correct service
- handles CORS for browser clients
- centralizes access to backend services

Routes are configured so that frontend requests go through a single port instead of directly targeting each service.

### 3. Authentication service

The auth service manages user accounts, identity, and JWT-based security. It is responsible for:

- user registration/login
- generating access tokens
- validating tokens
- protecting internal endpoints

This ensures that candidate screening and backend operations are not exposed without proper authorization.

### 4. Applicant service

The applicant service is responsible for handling applicant upload workflows, including Excel file intake and storing applicant job records. It supports the front end by accepting candidate data and making it available to downstream screening operations.

### 5. Screening service

This is the heart of the system.

The screening service:

- receives the uploaded Excel file
- validates the workbook format
- reads applicant records
- combines applicant information with the job description and criteria
- sends the structured data to Google Gemini
- parses AI output into candidate rankings and shortlist data
- stores screening jobs/results in the database

The service is the central decision engine that turns raw applicant data into shortlist information.

### 6. Gemini AI analysis

The screening service sends the candidate list plus hiring guidance to Google Gemini. Gemini evaluates each applicant against the job requirements and returns a structured response such as:

- candidate score
- reasons for relevance or mismatch
- ranking information
- shortlisted candidate details

The model behaves as a decision-support assistant rather than a final authority, which is important in recruitment workflows where fairness, interpretation, and human oversight remain essential.

### 7. Persistence and retrieval

Screening jobs and results are saved in a database so recruiters can revisit the analysis later. The architecture supports the idea of repeatable decision support: the same job can be reviewed, filtered, and compared over time.

---

## System design concepts

### Microservices architecture

Arhataa.ai is designed as a microservice system instead of one monolithic server. This allows separate concerns to be isolated:

- Auth service focuses on identity and security
- Applicant service focuses on file intake and applicant data processing
- Screening service focuses on AI evaluation and scoring
- Gateway handles routing and networking concerns
- Eureka handles service discovery

This makes the system more modular, scalable, and easier to evolve.

### Service discovery

Using Eureka, each service can register itself and discover other services dynamically. Instead of hardcoding long service URLs, the system can route requests through service names.

This is a key pattern for distributed systems because services can scale, move, or restart without breaking the system's connectivity assumptions.

### API gateway pattern

The API gateway acts as a security and routing layer. It prevents the frontend from directly depending on every internal service and provides a single access point for the client.

In practical terms, the gateway is responsible for:

- request routing
- authentication enforcement
- centralized CORS handling
- simplified client integration

### JWT-based security

Authentication is built around JWT tokens. After login, the frontend receives a signed token and attaches it to API requests. The gateway and protected services validate that token before allowing access.

This approach is a common production pattern because it allows stateless authorization and easy propagation of user identity between services.

### AI-assisted decision-making

The application is not simply a data processor; it uses AI to interpret unstructured recruitment data. The system converts a job description and a set of applicants into a structured evaluation context for Gemini. The AI then returns a filtered candidate summary that helps recruiters prioritize the most relevant applicants.

This is a strong example of AI augmentation: the model reduces effort, but the recruiter still makes the final decision.

### Event-driven and workflow-oriented thinking

Although the current solution is built around direct API calls, the overall work pattern resembles a workflow engine:

- upload candidate data
- validate inputs
- analyze fit
- generate shortlist
- persist result
- show result to user

This workflow can later evolve into asynchronous processing, background jobs, queue-based execution, or notification pipelines if the system grows.

---

## Request flow

```text
Recruiter
   │
   ▼
React Frontend
   │
   ▼
API Gateway
   │
   ├── /api/auth/*  → Auth Service
   │
   └── /api/screening/* → Screening Service
                           │
                           ├── reads uploaded Excel
                           ├── validates applicant data
                           ├── sends JD + criteria + applicants to Gemini
                           ├── parses model output
                           └── stores screening results
```

This shows the high-level interaction model: frontend -> gateway -> service -> AI -> persistence -> result display.

---

## Main project components

### Backend

- Java
- Spring Boot
- Spring Cloud Gateway
- Netflix Eureka
- Spring Security
- JWT
- Maven
- REST APIs

### AI layer

- Google Gemini API
- structured candidate evaluation
- ranking logic based on job requirements

### Frontend

- React
- Vite
- JavaScript / JSX
- Tailwind CSS
- React Router
- shadcn-style UI building blocks

---

## Project structure

```text
Arhataa.ai/
├── backend/
│   ├── api-gateway/
│   ├── auth-service/
│   ├── applicant-service/
│   ├── screening-service/
│   ├── eureka-server/
│   └── README.md
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── Arhataa.ai.mp4
├── README.md
└── .git/
```



## Typical recruiter workflow

1. Sign in to the application.
2. Upload an Excel file containing applicants.
3. Provide a job description and custom screening rules.
4. Trigger AI-based screening.
5. Review ranked or shortlisted candidates.
6. Save or revisit screening history.

This flow reduces manual screening overhead and helps recruiters make faster, better-informed decisions.

---

## Why this project matters

Arhataa.ai demonstrates a practical use case for Generative AI in hiring technology. It combines software engineering fundamentals with real business value:

- scalable service-based architecture
- secure authentication
- AI-driven insights
- recruiter productivity improvements
- end-to-end workflow from data intake to decision support

---

## Future improvements

Possible extensions include:

- resume and CV parsing
- advanced score calibration and explainability
- candidate history and analytics dashboards
- role-based access control
- asynchronous processing with queues
- monitoring, logging, and observability
- deployment to cloud infrastructure

---

## Summary

Arhataa.ai is a full-stack, AI-assisted candidate screening platform that brings together modern frontend UX, secure backend services, service discovery, and large-language-model evaluation to solve a real-world recruiting challenge.

The core idea is simple: help recruiters find the best-matching candidates faster, with AI handling the heavy lifting of analysis while humans keep control of hiring decisions.

---

## Quick start

The project is organized into a frontend and several backend microservices. In a typical local setup:

```bash
# start the discovery service
cd backend/eureka-server
./mvnw spring-boot:run

# start the auth service
cd ../auth-service
./mvnw spring-boot:run

# start the applicant and screening services
cd ../applicant-service
./mvnw spring-boot:run

cd ../screening-service
./mvnw spring-boot:run

# start the API gateway
cd ../api-gateway
./mvnw spring-boot:run

# start the frontend
cd ../../frontend
npm install
npm run dev
```

Make sure you configure any required environment variables such as JWT secrets and Gemini API keys before running the services in a real environment.

---

## Final note

This project is a strong example of building a useful AI system with clean separation of concerns: call the frontend, secure the API via tokens, route requests through a gateway, discover services through Eureka, and let a specialized AI-driven service do the heavy analytical work.
