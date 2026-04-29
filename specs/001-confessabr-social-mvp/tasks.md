# Tasks: ConfessaBR Anonymous Social MVP

**Input**: Design documents from `/specs/001-confessabr-social-mvp/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/rest-api.md, quickstart.md

**Tests**: Automated test tasks are not generated because the specification does not explicitly request TDD or a test framework. Each user story includes manual independent validation tasks and the final phase includes lint and quickstart validation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing. P1 stories form the first shippable MVP increment; P2 and P3 stories are planned follow-up increments.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other [P] tasks in the same phase after dependencies are met
- **[Story]**: Maps task to a user story phase (US1-US8)
- Every task includes an exact file path

## Path Conventions

- **ConfessaBR mobile**: `app/`, `features/`, `components/`, `services/`, `hooks/`, `store/`, `types/`, `utils/`
- **Feature docs**: `specs/001-confessabr-social-mvp/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install required dependencies and configure project-level foundations.

- [ ] T001 Install NativeWind, Zustand, TanStack Query, Axios, SecureStore, Location, and Maps dependencies in package.json
- [ ] T002 [P] Configure NativeWind Metro integration in metro.config.js
- [ ] T003 [P] Configure Tailwind content paths for app, components, and features in tailwind.config.js
- [ ] T004 [P] Add NativeWind global stylesheet imports in global.css
- [ ] T005 [P] Add NativeWind TypeScript declarations in nativewind-env.d.ts
- [ ] T006 [P] Verify TypeScript path alias includes repository root imports in tsconfig.json
- [ ] T007 Configure Expo plugins and permissions for location and maps in app.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that must exist before any user story implementation.

**CRITICAL**: No user story work starts until this phase is complete.

- [ ] T008 Create feature directories for auth, profile, inbox, rooms, polls, moderation, payments, notifications, and radar in features/.gitkeep
- [ ] T009 Create shared service, store, type, utility, and layout directories in services/.gitkeep
- [ ] T010 [P] Define shared API error and pagination types in types/api.ts
- [ ] T011 [P] Define shared user, visitor, privacy, and notification preference types in types/user.ts
- [ ] T012 [P] Create SecureStore token helper in utils/secure-token.ts
- [ ] T013 Create centralized Axios client with Bearer token injection and error normalization in services/api.ts
- [ ] T014 [P] Create TanStack Query client configuration and query key helpers in services/query-client.ts
- [ ] T015 [P] Create auth/session Zustand store with visitor mode state in store/auth.store.ts
- [ ] T016 [P] Create shared UI state components for loading, error, empty, and success states in components/ui/state-view.tsx
- [ ] T017 [P] Create reusable Button component using NativeWind only in components/ui/button.tsx
- [ ] T018 [P] Create reusable Input component using NativeWind only in components/ui/input.tsx
- [ ] T019 [P] Create reusable Card component using NativeWind only in components/ui/card.tsx
- [ ] T020 [P] Create reusable Avatar and Badge components using NativeWind only in components/ui/avatar.tsx and components/ui/badge.tsx
- [ ] T021 [P] Create reusable Modal, BottomSheet, Tabs, and Header exports in components/ui/index.ts
- [ ] T022 Wire QueryClientProvider, auth bootstrap, global CSS import, and root navigation shell in app/_layout.tsx
- [ ] T023 Create authenticated route guard and visitor restriction helper in features/auth/route-guards.ts
- [ ] T024 Create shared privacy-safe logging helper that redacts tokens, sender identity, payments, and location in utils/privacy-log.ts

**Checkpoint**: Foundation ready. User story phases can now proceed.

---

## Phase 3: User Story 1 - Join And Manage Identity (Priority: P1) MVP

**Goal**: Users can register, sign in, sign out, see only landing/auth while visiting, and manage profile/privacy/preferences.

**Independent Test**: Complete account creation, sign in, visitor access, profile edit, privacy preference edit, and username uniqueness rejection without using rooms, inbox, polls, payments, or radar.

### Implementation for User Story 1

- [ ] T025 [P] [US1] Define auth, profile, session, and preference request/response types in types/auth.ts
- [ ] T026 [P] [US1] Implement auth REST methods for register, login, logout, and current user in services/auth.service.ts
- [ ] T027 [P] [US1] Implement profile and preference REST methods in services/profile.service.ts
- [ ] T028 [US1] Implement useAuthSession hook for login, register, logout, visitor mode, and bootstrap in features/auth/use-auth-session.ts
- [ ] T029 [US1] Implement useProfile hook for profile, privacy, and notification preference updates in features/profile/use-profile.ts
- [ ] T030 [US1] Replace starter landing route with ConfessaBR landing and visitor/auth entry points in app/index.tsx
- [ ] T031 [US1] Implement login screen with loading, error, empty, and success state handling in app/(auth)/login.tsx
- [ ] T032 [US1] Implement register screen with username uniqueness error handling in app/(auth)/register.tsx
- [ ] T033 [US1] Implement authenticated home shell with visitor guard redirect in app/(tabs)/home.tsx
- [ ] T034 [US1] Implement profile screen with edit profile, privacy, and notification preference sections in app/(tabs)/profile.tsx
- [ ] T035 [US1] Implement settings screen with sign out and privacy preference access in app/settings.tsx
- [ ] T036 [US1] Validate visitor access is limited to landing and authentication screens in features/auth/route-guards.ts
- [ ] T037 [US1] Document manual US1 verification steps in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US1 independently functional.

---

## Phase 4: User Story 2 - Use Anonymous Inbox And Direct Messages (Priority: P1) MVP

**Goal**: Registered users can receive, open, archive, report, safely share, send, and reveal eligible anonymous messages.

**Independent Test**: Send a message, view it in inbox, archive it, report it, share it without sensitive metadata, and verify reveal is blocked unless message-specific send-time consent and payment confirmation are present.

### Implementation for User Story 2

- [ ] T038 [P] [US2] Define anonymous message, reveal, archive, share, and send payload types in types/inbox.ts
- [ ] T039 [P] [US2] Implement inbox and direct message REST methods in services/inbox.service.ts
- [ ] T040 [P] [US2] Implement payment capability lookup used by reveal flow in services/payments.service.ts
- [ ] T041 [US2] Implement inbox query and mutation hooks with cache invalidation in features/inbox/use-inbox.ts
- [ ] T042 [US2] Implement direct anonymous message composer logic in features/inbox/use-send-message.ts
- [ ] T043 [US2] Implement reveal eligibility hook that respects send-time consent and payment confirmation in features/inbox/use-reveal-sender.ts
- [ ] T044 [US2] Implement inbox list screen with loading, error, empty, and success states in app/(tabs)/inbox.tsx
- [ ] T045 [US2] Implement inbox message detail, archive, report, share, and reveal actions in app/(modals)/message-detail.tsx
- [ ] T046 [US2] Implement anonymous message compose modal in app/(modals)/send-message.tsx
- [ ] T047 [US2] Ensure safe share payload excludes sender identity and sensitive metadata in features/inbox/share-message.ts
- [ ] T048 [US2] Validate US2 privacy and payment behavior against contracts/rest-api.md in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US2 independently functional and privacy checked.

---

## Phase 5: User Story 3 - Participate In Rooms And Room Feeds (Priority: P1) MVP

**Goal**: Registered users can create rooms, join by code, leave rooms, view members, post anonymous feed messages, report content, and see moderator-only controls.

**Independent Test**: Create a room, join with another account by code, post anonymous feed content, view members, report a feed item, leave, and confirm moderator actions are permission-gated.

### Implementation for User Story 3

- [ ] T049 [P] [US3] Define room, membership, feed item, join code, and room permission types in types/rooms.ts
- [ ] T050 [P] [US3] Implement room and room feed REST methods in services/rooms.service.ts
- [ ] T051 [P] [US3] Implement basic moderation report method for room feed reports in services/moderation.service.ts
- [ ] T052 [US3] Implement room list, create, join, leave, member, and feed hooks in features/rooms/use-rooms.ts
- [ ] T053 [US3] Implement room feed composer and report hooks in features/rooms/use-room-feed.ts
- [ ] T054 [US3] Implement rooms tab with loading, error, empty, and success states in app/(tabs)/rooms.tsx
- [ ] T055 [US3] Implement create room modal in app/(modals)/create-room.tsx
- [ ] T056 [US3] Implement join room by code modal in app/(modals)/join-room.tsx
- [ ] T057 [US3] Implement room detail route with feed, members, leave, and permission-gated moderation controls in app/rooms/[id].tsx
- [ ] T058 [US3] Ensure room feed messages render anonymous sender aliases only in features/rooms/room-feed-item.tsx
- [ ] T059 [US3] Validate first MVP readiness for US1-US3 in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: First shippable MVP increment complete when US1-US3 pass validation.

---

## Phase 6: User Story 4 - Run Positive Polls In Rooms (Priority: P2)

**Goal**: Room members can create category-constrained positive polls, invite participants, accept/refuse, vote once, close polls, view rankings, and share safe results.

**Independent Test**: Create a poll with allowed category and limited custom text, invite users, accept/refuse, vote once, reject duplicate vote, close, view results, and share without sensitive data.

### Implementation for User Story 4

- [ ] T060 [P] [US4] Define poll, positive category, invitation, vote, result, and safe share types in types/polls.ts
- [ ] T061 [P] [US4] Implement poll REST methods in services/polls.service.ts
- [ ] T062 [US4] Implement positive poll category and custom text validation adapters in features/polls/poll-rules.ts
- [ ] T063 [US4] Implement poll creation, invitation, consent, voting, results, and share hooks in features/polls/use-polls.ts
- [ ] T064 [US4] Implement create poll modal with allowed categories and limited custom text in app/(modals)/create-poll.tsx
- [ ] T065 [US4] Implement poll detail route with invite, accept/refuse, vote, close, results, and state views in app/polls/[id].tsx
- [ ] T066 [US4] Add room detail integration entry points for creating and opening polls in app/rooms/[id].tsx
- [ ] T067 [US4] Validate one-vote and safe result sharing behavior in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US4 independently functional after room membership exists.

---

## Phase 7: User Story 5 - Report And Moderate Harmful Behavior (Priority: P2)

**Goal**: Users can report content/users once, duplicate reports are blocked, and moderators can hide, remove, block, or ban within permission boundaries.

**Independent Test**: Submit a report, attempt duplicate report, access moderation queue as moderator, apply actions, and confirm normal users cannot moderate.

### Implementation for User Story 5

- [ ] T068 [P] [US5] Define report, moderation queue, moderation action, block, and ban types in types/moderation.ts
- [ ] T069 [P] [US5] Expand moderation REST methods for reports, queue, and actions in services/moderation.service.ts
- [ ] T070 [US5] Implement report submission and duplicate-report error handling hooks in features/moderation/use-report.ts
- [ ] T071 [US5] Implement moderation queue and action hooks in features/moderation/use-moderation.ts
- [ ] T072 [US5] Create shared report modal for messages, room feed items, polls, and users in app/(modals)/report.tsx
- [ ] T073 [US5] Create moderator queue screen with hide, remove, block, and ban actions in app/(modals)/moderation-queue.tsx
- [ ] T074 [US5] Integrate shared report actions into inbox, room feed, and poll screens in features/moderation/report-targets.ts
- [ ] T075 [US5] Validate duplicate report and moderator permission behavior in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US5 independently functional across reportable targets.

---

## Phase 8: User Story 6 - Unlock Paid Capabilities (Priority: P2)

**Goal**: Registered users can start payment for paid capabilities, keep them locked while pending/failed, and unlock only confirmed target-specific capabilities.

**Independent Test**: Start, abandon, fail, and confirm a payment for eligible sender reveal; verify the capability unlocks only for the intended user and message.

### Implementation for User Story 6

- [ ] T076 [P] [US6] Define payment, checkout, capability, and payment status types in types/payments.ts
- [ ] T077 [US6] Complete payment creation, status, and capability REST methods in services/payments.service.ts
- [ ] T078 [US6] Implement payment checkout and status polling hooks in features/payments/use-payments.ts
- [ ] T079 [US6] Implement payment checkout modal with pending, failed, cancelled, and confirmed states in app/(modals)/payment-checkout.tsx
- [ ] T080 [US6] Integrate paid sender reveal checkout flow into inbox reveal hook in features/inbox/use-reveal-sender.ts
- [ ] T081 [US6] Validate paid capability lock/unlock behavior in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US6 independently functional for paid sender reveal.

---

## Phase 9: User Story 7 - Discover Nearby Rooms And People (Priority: P3)

**Goal**: Registered users can opt into radar, view neighborhood/region-level nearby rooms and opted-in people, filter by type/distance, create region rooms, and start temporary anonymous proximity chats.

**Independent Test**: Grant/deny location, opt in/out, filter radar, verify no individual person pins or exact locations, create a region room, and start an anonymous temporary proximity chat.

### Implementation for User Story 7

- [ ] T082 [P] [US7] Define radar presence, radar result, region room, proximity chat, and distance filter types in types/radar.ts
- [ ] T083 [P] [US7] Implement radar and proximity chat REST methods in services/radar.service.ts
- [ ] T084 [US7] Implement location permission and approximate region helper in features/radar/use-location-permission.ts
- [ ] T085 [US7] Implement radar presence, filters, results, region room, and proximity chat hooks in features/radar/use-radar.ts
- [ ] T086 [US7] Implement radar tab with map/list UI, type filter, distance filter, and state views in app/(tabs)/radar.tsx
- [ ] T087 [US7] Ensure radar UI renders neighborhood/region areas and never individual person pins in features/radar/radar-map.tsx
- [ ] T088 [US7] Implement create region room action from radar in features/radar/create-region-room.ts
- [ ] T089 [US7] Implement temporary anonymous proximity chat modal in app/(modals)/proximity-chat.tsx
- [ ] T090 [US7] Validate opt-in, no individual pins, no exact locations, and radius behavior in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US7 independently functional with privacy constraints.

---

## Phase 10: User Story 8 - Receive Relevant Notifications (Priority: P3)

**Goal**: Registered users receive privacy-safe notifications for messages, poll invitations, poll results, and payment confirmations according to preferences.

**Independent Test**: Enable and disable each notification preference, register a device, trigger each event type, and verify notification payloads omit sender identity and sensitive metadata.

### Implementation for User Story 8

- [ ] T091 [P] [US8] Define notification, device registration, read state, and preference types in types/notifications.ts
- [ ] T092 [P] [US8] Implement notification REST methods in services/notifications.service.ts
- [ ] T093 [US8] Implement notification device registration and preference hooks in features/notifications/use-notifications.ts
- [ ] T094 [US8] Implement notification history and mark-read logic in features/notifications/use-notification-history.ts
- [ ] T095 [US8] Add notification preference controls to profile/settings screens in app/settings.tsx
- [ ] T096 [US8] Implement notification history surface in app/(modals)/notifications.tsx
- [ ] T097 [US8] Ensure notification rendering omits sender identity, exact location, payment internals, and moderation metadata in features/notifications/notification-item.tsx
- [ ] T098 [US8] Validate notification preference and payload privacy behavior in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US8 independently functional and privacy checked.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, cleanup, and constitution checks across all implemented increments.

- [ ] T099 [P] Update README with setup, environment, and run instructions for ConfessaBR MVP in README.md
- [ ] T100 [P] Update implementation notes and current plan references in AGENTS.md
- [ ] T101 Verify no manual StyleSheet usage exists in app/, components/, features/, hooks/, store/, types/, utils/, and services/ via specs/001-confessabr-social-mvp/quickstart.md
- [ ] T102 Verify no direct API calls exist inside app/ or components/ via specs/001-confessabr-social-mvp/quickstart.md
- [ ] T103 Verify tokens are stored only through SecureStore helper in utils/secure-token.ts
- [ ] T104 Verify no sensitive identity, payment, moderation, or exact location data is logged through utils/privacy-log.ts
- [ ] T105 Run lint and resolve reported issues in package.json
- [ ] T106 Run full manual quickstart validation and record completion notes in specs/001-confessabr-social-mvp/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1 and blocks all user stories.
- **P1 MVP stories (Phases 3-5)**: Depend on Phase 2. US1 should complete before US2/US3 because authentication gates registered-only flows.
- **P2 follow-up stories (Phases 6-8)**: Depend on Phase 2 plus relevant P1 surfaces. US4 depends on US3 rooms. US5 depends on reportable surfaces from US2-US4. US6 depends on US2 reveal flow.
- **P3 follow-up stories (Phases 9-10)**: Depend on Phase 2 plus auth/session. US8 also benefits from US2, US4, and US6 event surfaces.
- **Polish (Phase 11)**: Depends on all desired story phases for the selected release increment.

### User Story Dependencies

- **US1 Join And Manage Identity (P1)**: First P1 story; required for all authenticated flows.
- **US2 Anonymous Inbox And Direct Messages (P1)**: Depends on US1 session/auth foundation.
- **US3 Rooms And Room Feeds (P1)**: Depends on US1 session/auth foundation.
- **US4 Positive Polls (P2)**: Depends on US3 rooms.
- **US5 Reports And Moderation (P2)**: Depends on reportable targets from US2, US3, and US4.
- **US6 Paid Capabilities (P2)**: Depends on US2 reveal flow.
- **US7 Radar And Proximity Chat (P3)**: Depends on US1 and foundational location/map setup.
- **US8 Notifications (P3)**: Depends on US1 and integrates with event sources from US2, US4, and US6.

### Within Each User Story

- Types before services.
- Services before hooks/stores.
- Hooks/stores before screens.
- Screens before story validation.
- Backend-owned rules must be reflected as user-facing states, never implemented as final frontend authority.

### Parallel Opportunities

- T002-T006 can run in parallel after T001 begins.
- T010-T012 and T014-T021 can run in parallel during foundation.
- Within each story, [P] type/service tasks can run in parallel before hook/screen tasks.
- US2 and US3 can proceed in parallel after US1 session/auth behavior is stable.
- US4, US5, and US6 can be staffed separately after their P1 dependencies are done.
- US7 and US8 can proceed in parallel with P2 follow-up work once foundational providers exist.

---

## Parallel Examples

### User Story 1

```text
Task: T025 [US1] Define auth, profile, session, and preference request/response types in types/auth.ts
Task: T026 [US1] Implement auth REST methods for register, login, logout, and current user in services/auth.service.ts
Task: T027 [US1] Implement profile and preference REST methods in services/profile.service.ts
```

### User Story 2

```text
Task: T038 [US2] Define anonymous message, reveal, archive, share, and send payload types in types/inbox.ts
Task: T039 [US2] Implement inbox and direct message REST methods in services/inbox.service.ts
Task: T040 [US2] Implement payment capability lookup used by reveal flow in services/payments.service.ts
```

### User Story 3

```text
Task: T049 [US3] Define room, membership, feed item, join code, and room permission types in types/rooms.ts
Task: T050 [US3] Implement room and room feed REST methods in services/rooms.service.ts
Task: T051 [US3] Implement basic moderation report method for room feed reports in services/moderation.service.ts
```

### User Story 7

```text
Task: T082 [US7] Define radar presence, radar result, region room, proximity chat, and distance filter types in types/radar.ts
Task: T083 [US7] Implement radar and proximity chat REST methods in services/radar.service.ts
```

---

## Implementation Strategy

### MVP First (P1 Increment)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: US1 Join And Manage Identity.
4. Complete Phase 4: US2 Anonymous Inbox And Direct Messages.
5. Complete Phase 5: US3 Rooms And Room Feeds.
6. Stop and validate SC-000: all P1 user stories pass acceptance scenarios plus UX, privacy, and backend-authority checks.

### Incremental Delivery

1. Deliver P1 MVP increment: US1-US3.
2. Add P2 engagement/safety/revenue increment: US4-US6.
3. Add P3 discovery/re-engagement increment: US7-US8.
4. Run Phase 11 polish for whichever increment is being released.

### Parallel Team Strategy

With multiple developers:

1. One developer owns setup/foundation until providers and service boundaries compile.
2. After US1 stabilizes, split US2 and US3 across separate owners.
3. After US3, split US4 polls and US5 moderation across separate owners.
4. US6 payments can proceed with the inbox owner once reveal eligibility exists.
5. US7 radar and US8 notifications can run as separate P3 streams.

---

## Notes

- [P] tasks touch different files and can be parallelized after their prerequisites are satisfied.
- Each user story phase ends with a validation task in `specs/001-confessabr-social-mvp/quickstart.md`.
- Keep all API calls in `services/`; components and routes consume hooks/feature logic.
- Use NativeWind classes only; do not add manual `StyleSheet`.
- Store auth tokens only via `utils/secure-token.ts`.
- Do not implement backend-owned business rules as final client authority.
