# Quickstart: ConfessaBR Anonymous Social MVP

## 1. Install Required Packages

From the repository root:

```bash
npm install zustand @tanstack/react-query axios nativewind tailwindcss
npx expo install expo-secure-store expo-location react-native-maps
```

If React Native Maps requires native app store configuration for release builds,
configure the platform keys before release verification.

## 2. Configure NativeWind

Add the NativeWind Metro wrapper, Tailwind config, global CSS, and TypeScript
declarations:

```text
metro.config.js
tailwind.config.js
global.css
nativewind-env.d.ts
```

Import `global.css` once from the app root layout. All new UI must use
`className` with NativeWind utilities and must not introduce manual `StyleSheet`.

## 3. Configure App Providers

Update `app/_layout.tsx` to provide:

- TanStack Query `QueryClientProvider`
- auth/session bootstrap that loads the SecureStore token
- global status/error boundary wrappers as needed
- Expo Router stacks/tabs for auth, app tabs, modals, room detail, poll detail,
  settings, and radar

## 4. Create Layered Directories

Create or normalize these directories before feature implementation:

```text
features/auth
features/profile
features/inbox
features/rooms
features/polls
features/moderation
features/payments
features/notifications
features/radar
services
store
types
utils
components/ui
components/layout
components/shared
```

## 5. Configure API Access

Create `services/api.ts` as the only Axios client. It must:

- use `/api` as the base API path or the configured environment base URL
- attach `Authorization: Bearer {token}` when a token exists
- normalize API errors into user-facing error states
- handle unauthenticated responses by clearing session state

Create feature services for auth, profile, inbox, rooms, polls, moderation,
payments, notifications, and radar. Components must call hooks or feature logic,
not services directly unless the component is a deliberately thin route wrapper.

## 6. Verify Core Flows

Run static checks:

```bash
npm run lint
```

Manual verification checklist:

- Account creation, login, logout, and visitor mode work.
- Visitor mode blocks content creation, voting, payments, reports, and proximity
  chat with clear feedback.
- Tokens are written only to SecureStore and never to AsyncStorage.
- Inbox can list, open, archive, report, share safely, and request paid reveal.
- Rooms can be created, joined by code, left, and opened with anonymous feed.
- Polls support invitation, accept/refuse, one vote, close, results, and safe
  sharing.
- Reports prevent duplicates and moderator actions are permission-gated.
- Paid features remain locked until backend confirmation.
- Notifications omit sender identity and sensitive metadata.
- Radar requires opt-in, shows approximate nearby results only, and honors
  distance/type filters.
- Every primary screen has loading, error, empty, and success states.

## 7. Constitution Checks Before Implementation Completion

- No manual `StyleSheet` usage in new ConfessaBR code.
- No direct API calls from UI components.
- No business rule exists only in frontend logic.
- No sensitive identity, payment, moderation, or exact location data appears in
  logs, shared payloads, notifications, or navigation params.
- Context7 is used when consulting library documentation for implementation.
