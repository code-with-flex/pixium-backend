# Pixium API & WebSocket Services

Node.js + TypeScript backend powering the Pixium pixel canvas — REST API, real-time WebSocket streaming, and game state management.

---

## Overview

The backend sits between the frontend and the blockchain. It serves the current canvas state from Redis for fast reads, exposes a REST API for game data, and streams real-time pixel placement events to connected clients via WebSocket. It does not write to the blockchain — that happens directly from the frontend via the user's Stellar wallet.

---

## Tech Stack

- **Node.js + TypeScript** — runtime and language
- **NestJS** — opinionated framework for structured, scalable APIs
- **PostgreSQL** — persistent storage for users, pixel history, quests, factions, and leaderboards
- **Redis** — canvas state cache (compressed byte array for ultra-fast reads)
- **WebSockets** — real-time pixel event streaming to clients

---

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm
- PostgreSQL
- Redis
- A running [indexer](https://github.com/Pixium-Org/indexer) to keep the DB in sync

### Install

```bash
pnpm install
```

### Environment

Copy the example env file and fill in your values:

```bash
cp .env.example .env
```

```env
DATABASE_URL=postgresql://user:password@localhost:5432/pixium
REDIS_URL=redis://localhost:6379
PORT=3000
```

### Run (Development)

```bash
pnpm run start:dev
```

### Run (Production)

```bash
pnpm run build
pnpm run start:prod
```

---

## API Reference

### Canvas

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/canvas` | Returns the full current canvas state (from Redis) |
| `GET` | `/canvas/pixel/:x/:y` | Returns color and owner of a single pixel |

### Users

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/users/:address` | Returns stats for a player (pixels placed, quests, faction) |

### Leaderboard

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/leaderboard` | Global leaderboard ranked by pixels placed |
| `GET` | `/leaderboard/factions` | Faction leaderboard |

### Quests

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/quests` | Returns active quests |
| `GET` | `/quests/:id` | Returns a specific quest |

### Factions

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/factions` | Lists all factions |
| `GET` | `/factions/:id` | Returns a faction and its members |

---

## WebSocket

Connect to the WebSocket endpoint to receive real-time canvas updates:

```
ws://localhost:3000/canvas
```

### Events

| Event | Payload | Description |
|---|---|---|
| `pixel_placed` | `{ x, y, color, player }` | A pixel was placed on the canvas |
| `round_ended` | `{ round_id, timestamp }` | The current round ended |
| `quest_completed` | `{ player, quest_id }` | A player completed a quest |

---

## Project Structure

```
src/
├── canvas/         # Canvas module — read state from Redis
├── users/          # User stats and profiles
├── leaderboard/    # Leaderboard aggregation
├── quests/         # Quest definitions and status
├── factions/       # Faction management
├── websocket/      # Real-time event gateway
└── app.module.ts
```

---

## Contributing

See the root [contributing guide](#). Run lint and format checks before submitting a PR.

```bash
pnpm run lint
pnpm run format
```

Branch format: `feature/<issue-number>-short-description`

---

## Related Repos

- [`onchain`](https://github.com/Pixium-Org/onchain) — Soroban smart contracts
- [`indexer`](https://github.com/Pixium-Org/indexer) — writes on-chain events into the database
- [`frontend`](https://github.com/Pixium-Org/frontend) — Next.js player interface