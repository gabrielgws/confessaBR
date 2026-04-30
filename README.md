# ConfessaBR Mobile MVP

ConfessaBR is an Expo Router mobile app for anonymous social flows: account and
visitor entry, profile/privacy preferences, anonymous inbox, rooms, positive
polls, reports/moderation, paid reveal capabilities, radar discovery, proximity
chat, and privacy-safe notifications.

The current feature plan lives in
`specs/001-confessabr-social-mvp/plan.md`, with the implementation checklist in
`specs/001-confessabr-social-mvp/tasks.md`.

## Stack

- Expo SDK 54, React Native 0.81, React 19, TypeScript strict mode
- Expo Router for navigation
- NativeWind for styling
- TanStack Query for server state
- Zustand for session/UI state
- Axios through `services/api.ts`
- Expo SecureStore for auth tokens
- Expo Location, React Native Maps, Expo Notifications, and Expo Device

## Setup

Install dependencies from the repository root:

```bash
npm install
```

The API base URL defaults to `/api`. To target a remote Laravel API, set
`expo.extra.apiBaseUrl` in `app.json` or the relevant Expo config before
building/running.

## Run

Start Metro:

```bash
npm run start
```

Open a platform target:

```bash
npm run android
npm run ios
npm run web
```

## Validate

Run static checks:

```bash
npx tsc --noEmit
npm run lint
```

Manual validation steps are documented in
`specs/001-confessabr-social-mvp/quickstart.md`.

## Development Rules

- Keep all API calls in `services/`.
- Route and component files should consume hooks/feature logic, not raw API
  clients.
- Use NativeWind classes for styling; do not add manual `StyleSheet` usage.
- Store auth tokens only through `utils/secure-token.ts`.
- Treat the Laravel API as authoritative for validation, permissions,
  moderation, payments, sender reveal, voting, consent, and proximity.
- Radar must remain neighborhood/region-level only: no exact location display
  and no individual user pins.
- Notification UI must omit sender identity, exact location, payment internals,
  and private moderation metadata.

## Source Layout

- `app/`: Expo Router screens, tabs, modals, and detail routes
- `features/`: feature hooks and orchestration
- `services/`: REST API clients and query client
- `components/`: reusable UI and layout primitives
- `store/`: Zustand state
- `types/`: shared TypeScript contracts
- `utils/`: SecureStore, push, privacy, and shared helpers
