# Contributing to `backend`

This repo contains the Pixium API and WebSocket services, built with Node.js, TypeScript, and NestJS.

For general contribution guidelines (branching, commits, code of conduct), see the [org-level contributing guide](https://github.com/Pixium-Org/.github/blob/main/CONTRIBUTING.md).

---

## Prerequisites

- Node.js 20+
- PostgreSQL
- Redis

---

## Setup

```bash
git clone https://github.com/Pixium-Org/backend.git
cd backend
npm install
```

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

```env
DATABASE_URL=postgresql://user:password@localhost:5432/pixium
REDIS_URL=redis://localhost:6379
PORT=3000
```

---

## Running Locally

```bash
# Development (with watch)
npm run start:dev

# Production
npm run build
npm run start:prod
```

---

## Running Tests

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## Code Style

All PRs must pass lint and format checks:

```bash
npm run lint
npm run format
```

---

## Submitting a PR

1. Fork the repo and create a branch: `feature/<issue-number>-short-description`
2. Make your changes and ensure tests pass
3. Run `npm run lint` and `npm run format`
4. Open a PR targeting the `dev` branch
5. Fill in the PR template and link the issue

---

## Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Stellar SDK (JavaScript)](https://stellar.github.io/js-stellar-sdk/)
