# Quickstart: ConfessaBR Anonymous Social MVP

## 1. Install Required Packages

From the repository root:

```bash
npm install zustand @tanstack/react-query axios nativewind tailwindcss
npx expo install expo-secure-store expo-location react-native-maps expo-notifications expo-device
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
- Notifications omit sender identity and sensitive metadata. Push permission
  denial is handled clearly, and authenticated users can register a device push
  token with the API after permission is granted.
- Radar uses neighborhood/region-level discovery only. It must never show exact
  location or individual user pins. Nearby people appear only as counts or
  aggregation by region, and radar honors distance/type filters.
- Every primary screen has loading, error, empty, and success states.

### US1 Manual Verification - Join And Manage Identity

1. Open the app at the landing screen and confirm only entry actions are visible:
   sign in, create account, and visitor mode.
2. Continue as visitor and confirm authenticated tabs redirect back to landing
   or show visitor restriction feedback.
3. Register with a unique username, display name, password, and matching
   confirmation; confirm the app navigates to the authenticated home tab.
4. Attempt registration with a backend-rejected duplicate username and confirm
   the username field shows the backend validation message.
5. Sign in with an existing account and confirm profile data loads from
   `/api/me`.
6. Edit display name and bio from the profile tab; confirm the profile screen
   updates after the backend response.
7. Toggle privacy and notification preferences from profile/settings and confirm
   the UI waits for backend success.
8. Sign out from settings and confirm token/session state is cleared.

### US2 Manual Verification - Anonymous Inbox And Direct Messages

1. Sign in, open the inbox tab, and confirm loading, error, empty, and populated
   states are represented.
2. Send an anonymous message from the compose modal to a target username and
   confirm no sender identity is placed in route params or share text.
3. Open a message detail screen and confirm only sender alias, body, timestamps,
   reveal status, and safe actions are visible.
4. Archive a message and confirm the inbox list is invalidated/refreshed.
5. Submit a report reason and confirm duplicate-report or validation errors are
   surfaced from backend reason codes.
6. Share a message and confirm the payload excludes sender identity, moderation
   metadata, payment internals, exact location, and raw IDs.
7. Attempt sender reveal when consent or payment is missing and confirm the UI
   keeps reveal disabled or shows the backend rejection.
8. Confirm reveal can only run when message-specific reveal consent and a
   confirmed `sender_reveal` capability for the same message are present.

### US3 Manual Verification - Rooms And Room Feeds

1. Sign in and open the rooms tab; confirm loading, error, empty, and populated
   states are represented.
2. Create a room and confirm backend-owned visibility, join code, and permission
   behavior appear in the returned room data.
3. Join a room by code with another account and confirm invalid codes surface a
   backend validation or authorization error.
4. Open a room detail route and confirm feed, member list, leave action, poll
   creation entry point, and moderator-only notice render from backend
   permissions.
5. Post a feed message and confirm the rendered item shows only the anonymous
   sender alias, never a user identity.
6. Report a feed item and confirm duplicate-report or permission errors are
   shown from backend reason codes.
7. Leave the room and confirm the room list refreshes and posting access is no
   longer available according to backend membership state.
8. Confirm US1-US3 together form the first MVP increment: account/session,
   anonymous inbox, and rooms all pass without direct API calls from route UI.

### US4 Manual Verification - Positive Polls In Rooms

1. Open a room and create a poll using one of the positive categories; confirm
   custom questions over the UI limit are blocked before submit and backend
   policy errors still surface if returned.
2. Open a poll detail route from the room poll entry point and verify invite,
   accept/refuse, vote, close, result, and safe-share states are visible.
3. Invite participants and confirm backend eligibility errors are shown.
4. Accept and refuse invitations using backend invitation IDs and confirm the
   response state updates.
5. Vote once on an open poll and confirm a second vote is blocked by the UI or
   rejected by backend with `POLL_ALREADY_VOTED`.
6. Close the poll and confirm results load according to backend visibility
   rules.
7. Share poll results and confirm the payload excludes sensitive identity,
   moderation, payment, exact location, and raw private metadata.

### US5 Manual Verification - Reports And Moderation

1. Submit reports from message detail, room feed, and poll detail surfaces.
2. Attempt a duplicate report for the same target and confirm the backend
   `DUPLICATE_REPORT` or validation state is shown clearly.
3. Open the moderation queue as a moderator and confirm queue loading, empty,
   error, and populated states render.
4. Apply hide, remove, block, and ban actions against eligible targets and
   confirm actions refresh the queue.
5. Open the moderation queue as a non-moderator and confirm backend permission
   rejection is displayed without exposing private moderation metadata.

### US6 Manual Verification - Paid Capabilities

1. Open an eligible anonymous message whose reveal is locked.
2. Start a `sender_reveal` checkout and confirm pending, failed, cancelled,
   expired, and confirmed statuses render from backend payment state.
3. Abandon or fail checkout and confirm reveal remains locked.
4. Confirm payment for the intended message and verify only that
   `anonymous_message` target unlocks sender reveal.
5. Confirm checkout URLs and payment internals are not logged, shared, or placed
   into unrelated UI surfaces.

### US7 Manual Verification - Radar And Proximity Chat

1. Open the radar tab while signed in and confirm loading, empty, error, and
   populated states render.
2. Deny location permission and confirm the app shows denied-permission feedback
   without opting the user into radar.
3. Grant location permission from the radar opt-in action and confirm presence
   updates through `/api/radar/presence`.
4. Switch type and distance filters and confirm `/api/radar` refreshes with the
   selected radius.
5. Inspect the radar map/list and confirm it renders only neighborhood or region
   areas, aggregate counts, and room summaries. It must not render individual
   user pins, exact latitude/longitude text, or private identifiers.
6. Create or enter a region room from a radar region and confirm backend-owned
   room eligibility and radius errors surface.
7. Start a temporary proximity chat and confirm the modal receives only region
   ID, topic, and radius, never exact location coordinates.

### US8 Manual Verification - Notifications

1. Open settings and toggle each notification preference: new messages, poll
   invites, poll results, and payment confirmations.
2. Tap the push registration button after signing in and confirm permission is
   requested only after this user action.
3. Deny push permission and confirm the app remains usable and reports the
   denied/unavailable state clearly.
4. Grant push permission on a physical device and confirm the Expo push token is
   registered through `/api/notifications/devices`.
5. Trigger message, poll invitation, poll result, and payment confirmation
   events and confirm history appears in `/api/notifications`.
6. Mark a notification as read and confirm the history refreshes.
7. Inspect each notification item and push payload shown in-app to confirm it
   omits sender identity, exact location, payment internals, private moderation
   metadata, and raw sensitive IDs.

## 7. Constitution Checks Before Implementation Completion

- No manual `StyleSheet` usage in `app/`, `components/`, `features/`, `hooks/`,
  `store/`, `types/`, `utils/`, or `services/`.
- No direct API calls from UI components; Axios is centralized in
  `services/api.ts`.
- Tokens are stored only through `utils/secure-token.ts`.
- No sensitive identity, payment, moderation, or exact location data appears in
  logs, shared payloads, notifications, or navigation params.
- Context7 is used when consulting library documentation for implementation.

### Phase 11 Validation Notes

Static checks executed on 2026-04-29:

```bash
npx tsc --noEmit
npm run lint
```

Cross-cutting scans to run from the repository root:

```powershell
Get-ChildItem -Path app,components,features,hooks,store,types,utils,services -Recurse -Include *.ts,*.tsx |
  Select-String -Pattern 'StyleSheet'

Get-ChildItem -Path app,components -Recurse -Include *.ts,*.tsx |
  Select-String -Pattern 'axios|fetch\(|api\.'

Get-ChildItem -Path app,components,features,hooks,store,types,utils,services -Recurse -Include *.ts,*.tsx |
  Select-String -Pattern 'SecureStore'

Get-ChildItem -Path app,components,features,hooks,store,types,utils,services -Recurse -Include *.ts,*.tsx |
  Select-String -Pattern 'console\.|privacyLog|logPrivacyEvent'
```

Recorded completion:

- TypeScript and Expo lint pass.
- Manual `StyleSheet` usage was removed from remaining starter components.
- UI layers do not import Axios or call `fetch`.
- `SecureStore` appears only in `utils/secure-token.ts`.
- Privacy logging remains centralized in `utils/privacy-log.ts`; no raw
  location, sender identity, payment internals, moderation metadata, or token
  logging was added.
- Basic responsiveness was validated by implementation review: primary actions
  mutate through TanStack Query with immediate disabled/loading states, and list
  and radar screens render bounded cards/filters with loading/error/empty
  states. Device-level 60 fps validation remains a release-candidate manual
  check.
- Full manual quickstart validation is documented as ready to execute against a
  connected Laravel staging API. A simulated usability pass is recorded in
  `specs/001-confessabr-social-mvp/usability-test.md`.
