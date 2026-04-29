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

- [X] T001 Install NativeWind, Zustand, TanStack Query, Axios, SecureStore, Location, Maps, Expo Notifications, and Expo Device dependencies in package.json
- [X] T002 [P] Configure NativeWind Metro integration in metro.config.js
- [X] T003 [P] Configure Tailwind content paths for app, components, and features in tailwind.config.js
- [X] T004 [P] Add NativeWind global stylesheet imports in global.css
- [X] T005 [P] Add NativeWind TypeScript declarations in nativewind-env.d.ts
- [X] T006 [P] Verify TypeScript path alias includes repository root imports in tsconfig.json
- [X] T007 Configure Expo plugins and permissions for location, maps, and push notifications in app.json

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that must exist before any user story implementation.

**CRITICAL**: No user story work starts until this phase is complete.

- [X] T008 [P] Create auth feature directory marker in features/auth/.gitkeep
- [X] T009 [P] Create profile feature directory marker in features/profile/.gitkeep
- [X] T010 [P] Create inbox feature directory marker in features/inbox/.gitkeep
- [X] T011 [P] Create rooms feature directory marker in features/rooms/.gitkeep
- [X] T012 [P] Create polls feature directory marker in features/polls/.gitkeep
- [X] T013 [P] Create moderation feature directory marker in features/moderation/.gitkeep
- [X] T014 [P] Create payments feature directory marker in features/payments/.gitkeep
- [X] T015 [P] Create notifications feature directory marker in features/notifications/.gitkeep
- [X] T016 [P] Create radar feature directory marker in features/radar/.gitkeep
- [X] T017 [P] Create services directory marker in services/.gitkeep
- [X] T018 [P] Create store directory marker in store/.gitkeep
- [X] T019 [P] Create types directory marker in types/.gitkeep
- [X] T020 [P] Create utils directory marker in utils/.gitkeep
- [X] T021 [P] Create layout directory marker in components/layout/.gitkeep
- [X] T022 [P] Create shared components directory marker in components/shared/.gitkeep
- [X] T023 [P] Define shared API error and pagination types in types/api.ts
- [X] T024 [P] Define shared user, visitor, privacy, and notification preference types in types/user.ts
- [X] T025 [P] Create SecureStore token helper in utils/secure-token.ts
- [X] T026 Create centralized Axios client with Bearer token injection and error normalization in services/api.ts
- [X] T027 [P] Create TanStack Query client configuration and query key helpers in services/query-client.ts
- [X] T028 [P] Create auth/session Zustand store with visitor mode state in store/auth.store.ts
- [X] T029 [P] Create Expo Notifications permission and push-token helper in utils/push-notifications.ts
- [X] T030 [P] Create shared UI state components for loading, error, empty, and success states in components/ui/state-view.tsx
- [X] T031 [P] Create reusable Button component using NativeWind only in components/ui/button.tsx
- [X] T032 [P] Create reusable Input component using NativeWind only in components/ui/input.tsx
- [X] T033 [P] Create reusable Card component using NativeWind only in components/ui/card.tsx
- [X] T034 [P] Create reusable Avatar and Badge components using NativeWind only in components/ui/avatar.tsx and components/ui/badge.tsx
- [X] T035 [P] Create reusable Modal, BottomSheet, Tabs, and Header exports in components/ui/index.ts
- [X] T036 Wire QueryClientProvider, auth bootstrap, global CSS import, root navigation shell, and configure notification provider/listener bootstrap in app/_layout.tsx without requesting permissions or registering device tokens
- [X] T037 Create authenticated route guard and visitor restriction helper in features/auth/route-guards.ts
- [X] T038 Create shared privacy-safe logging helper that redacts tokens, sender identity, payments, and location in utils/privacy-log.ts

**Checkpoint**: Foundation ready. User story phases can now proceed.

---

## Phase 3: User Story 1 - Join And Manage Identity (Priority: P1) MVP

**Goal**: Users can register, sign in, sign out, see only landing/auth while visiting, and manage profile/privacy/preferences.

**Independent Test**: Complete account creation, sign in, visitor access, profile edit, privacy preference edit, and username uniqueness rejection without using rooms, inbox, polls, payments, or radar.

### Implementation for User Story 1

- [X] T039 [P] [US1] Define auth, profile, session, and preference request/response types in types/auth.ts
- [X] T040 [P] [US1] Implement auth REST methods for register, login, logout, and current user in services/auth.service.ts
- [X] T041 [P] [US1] Implement profile and preference REST methods in services/profile.service.ts
- [X] T042 [US1] Implement useAuthSession hook for login, register, logout, visitor mode, and bootstrap in features/auth/use-auth-session.ts
- [X] T043 [US1] Implement useProfile hook for profile, privacy, and notification preference updates in features/profile/use-profile.ts
- [X] T044 [US1] Replace starter landing route with ConfessaBR landing and visitor/auth entry points in app/index.tsx
- [X] T045 [US1] Implement login screen with loading, error, empty, and success state handling in app/(auth)/login.tsx
- [X] T046 [US1] Implement register screen with username uniqueness error handling in app/(auth)/register.tsx
- [X] T047 [US1] Implement authenticated home shell with visitor guard redirect in app/(tabs)/home.tsx
- [X] T048 [US1] Implement profile screen with edit profile, privacy, and notification preference sections in app/(tabs)/profile.tsx
- [X] T049 [US1] Implement settings screen with sign out and privacy preference access in app/settings.tsx
- [X] T050 [US1] Validate visitor access is limited to landing and authentication screens in features/auth/route-guards.ts
- [X] T051 [US1] Document manual US1 verification steps in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US1 independently functional.

---

## Phase 4: User Story 2 - Use Anonymous Inbox And Direct Messages (Priority: P1) MVP

**Goal**: Registered users can receive, open, archive, report, safely share, send, and reveal eligible anonymous messages.

**Independent Test**: Send a message, view it in inbox, archive it, report it, share it without sensitive metadata, and verify reveal is blocked unless message-specific send-time consent and payment confirmation are present.

### Implementation for User Story 2

- [X] T052 [P] [US2] Define anonymous message, reveal, archive, share, and send payload types in types/inbox.ts
- [X] T053 [P] [US2] Implement inbox and direct message REST methods in services/inbox.service.ts
- [X] T054 [P] [US2] Implement payment capability lookup used by reveal flow in services/payments.service.ts
- [X] T055 [US2] Implement inbox query and mutation hooks with cache invalidation in features/inbox/use-inbox.ts
- [X] T056 [US2] Implement direct anonymous message composer logic in features/inbox/use-send-message.ts
- [X] T057 [US2] Implement reveal eligibility hook that respects send-time consent and payment confirmation in features/inbox/use-reveal-sender.ts
- [X] T058 [US2] Implement inbox list screen with loading, error, empty, and success states in app/(tabs)/inbox.tsx
- [X] T059 [US2] Implement inbox message detail, archive, report, share, and reveal actions in app/(modals)/message-detail.tsx
- [X] T060 [US2] Implement anonymous message compose modal in app/(modals)/send-message.tsx
- [X] T061 [US2] Ensure safe share payload excludes sender identity and sensitive metadata in features/inbox/share-message.ts
- [X] T062 [US2] Validate US2 privacy and payment behavior against contracts/rest-api.md in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US2 independently functional and privacy checked.

---

## Phase 5: User Story 3 - Participate In Rooms And Room Feeds (Priority: P1) MVP

**Goal**: Registered users can create rooms, join by code, leave rooms, view members, post anonymous feed messages, report content, and see moderator-only controls.

**Independent Test**: Create a room, join with another account by code, post anonymous feed content, view members, report a feed item, leave, and confirm moderator actions are permission-gated.

### Implementation for User Story 3

- [X] T063 [P] [US3] Define room, membership, feed item, join code, and room permission types in types/rooms.ts
- [X] T064 [P] [US3] Implement room and room feed REST methods in services/rooms.service.ts
- [X] T065 [P] [US3] Implement basic moderation report method for room feed reports in services/moderation.service.ts
- [X] T066 [US3] Implement room list, create, join, leave, member, and feed hooks in features/rooms/use-rooms.ts
- [X] T067 [US3] Implement room feed composer and report hooks in features/rooms/use-room-feed.ts
- [X] T068 [US3] Implement rooms tab with loading, error, empty, and success states in app/(tabs)/rooms.tsx
- [X] T069 [US3] Implement create room modal in app/(modals)/create-room.tsx
- [X] T070 [US3] Implement join room by code modal in app/(modals)/join-room.tsx
- [X] T071 [US3] Implement room detail route with feed, members, leave, and permission-gated moderation controls in app/rooms/[id].tsx
- [X] T072 [US3] Ensure room feed messages render anonymous sender aliases only in features/rooms/room-feed-item.tsx
- [X] T073 [US3] Validate first MVP readiness for US1-US3 in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: First shippable MVP increment complete when US1-US3 pass validation.

---

## Phase 6: User Story 4 - Run Positive Polls In Rooms (Priority: P2)

**Goal**: Room members can create category-constrained positive polls, invite participants, accept/refuse, vote once, close polls, view rankings, and share safe results.

**Independent Test**: Create a poll with allowed category and limited custom text, invite users, accept/refuse, vote once, reject duplicate vote, close, view results, and share without sensitive data.

### Implementation for User Story 4

- [X] T074 [P] [US4] Define poll, positive category, invitation, vote, result, and safe share types in types/polls.ts
- [X] T075 [P] [US4] Implement poll REST methods in services/polls.service.ts
- [X] T076 [US4] Implement positive poll category and custom text validation adapters in features/polls/poll-rules.ts
- [X] T077 [US4] Implement poll creation, invitation, consent, voting, results, and share hooks in features/polls/use-polls.ts
- [X] T078 [US4] Implement create poll modal with allowed categories and limited custom text in app/(modals)/create-poll.tsx
- [X] T079 [US4] Implement poll detail route with invite, accept/refuse, vote, close, results, and state views in app/polls/[id].tsx
- [X] T080 [US4] Add room detail integration entry points for creating and opening polls in app/rooms/[id].tsx
- [X] T081 [US4] Validate one-vote and safe result sharing behavior in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US4 independently functional after room membership exists.

---

## Phase 7: User Story 5 - Report And Moderate Harmful Behavior (Priority: P2)

**Goal**: Users can report content/users once, duplicate reports are blocked, and moderators can hide, remove, block, or ban within permission boundaries.

**Independent Test**: Submit a report, attempt duplicate report, access moderation queue as moderator, apply actions, and confirm normal users cannot moderate.

### Implementation for User Story 5

- [X] T082 [P] [US5] Define report, moderation queue, moderation action, block, and ban types in types/moderation.ts
- [X] T083 [P] [US5] Expand moderation REST methods for reports, queue, and actions in services/moderation.service.ts
- [X] T084 [US5] Implement report submission and duplicate-report error handling hooks in features/moderation/use-report.ts
- [X] T085 [US5] Implement moderation queue and action hooks in features/moderation/use-moderation.ts
- [X] T086 [US5] Create shared report modal for messages, room feed items, polls, and users in app/(modals)/report.tsx
- [X] T087 [US5] Create moderator queue screen with hide, remove, block, and ban actions in app/(modals)/moderation-queue.tsx
- [X] T088 [US5] Integrate shared report actions into inbox, room feed, and poll screens in features/moderation/report-targets.ts
- [X] T089 [US5] Validate duplicate report and moderator permission behavior in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US5 independently functional across reportable targets.

---

## Phase 8: User Story 6 - Unlock Paid Capabilities (Priority: P2)

**Goal**: Registered users can start payment for paid capabilities, keep them locked while pending/failed, and unlock only confirmed target-specific capabilities.

**Independent Test**: Start, abandon, fail, and confirm a payment for eligible sender reveal; verify the capability unlocks only for the intended user and message.

### Implementation for User Story 6

- [X] T090 [P] [US6] Define payment, checkout, capability, and payment status types in types/payments.ts
- [X] T091 [US6] Complete payment creation, status, and capability REST methods in services/payments.service.ts
- [X] T092 [US6] Implement payment checkout and status polling hooks in features/payments/use-payments.ts
- [X] T093 [US6] Implement payment checkout modal with pending, failed, cancelled, and confirmed states in app/(modals)/payment-checkout.tsx
- [X] T094 [US6] Integrate paid sender reveal checkout flow into inbox reveal hook in features/inbox/use-reveal-sender.ts
- [X] T095 [US6] Validate paid capability lock/unlock behavior in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US6 independently functional for paid sender reveal.

---

## Phase 9: User Story 7 - Discover Nearby Rooms And People (Priority: P3)

**Goal**: Registered users can opt into radar, view neighborhood/region-level nearby rooms and opted-in people, filter by type/distance, create region rooms, and start temporary anonymous proximity chats.

**Independent Test**: Grant/deny location, opt in/out, filter radar, verify no individual user pins or exact locations, create a region room, and start an anonymous temporary proximity chat.

### Implementation for User Story 7

- [X] T096 [P] [US7] Define radar presence, radar result, region room, proximity chat, and distance filter types in types/radar.ts
- [X] T097 [P] [US7] Implement radar and proximity chat REST methods in services/radar.service.ts
- [X] T098 [US7] Implement location permission and neighborhood/region discovery helper in features/radar/use-location-permission.ts
- [X] T099 [US7] Implement radar presence, filters, results, region room, and proximity chat hooks in features/radar/use-radar.ts
- [X] T100 [US7] Implement radar tab with map/list UI, type filter, distance filter, and state views in app/(tabs)/radar.tsx
- [X] T101 [US7] Ensure radar UI renders neighborhood/region areas and never individual user pins in features/radar/radar-map.tsx
- [X] T102 [US7] Implement create region room action from radar in features/radar/create-region-room.ts
- [X] T103 [US7] Implement temporary anonymous proximity chat modal in app/(modals)/proximity-chat.tsx
- [X] T104 [US7] Validate opt-in, no individual user pins, no exact locations, and radius behavior in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US7 independently functional with privacy constraints.

---

## Phase 10: User Story 8 - Receive Relevant Notifications (Priority: P3)

**Goal**: Registered users receive privacy-safe notifications for messages, poll invitations, poll results, and payment confirmations according to preferences.

**Independent Test**: Enable and disable each notification preference, register a device, trigger each event type, and verify notification payloads omit sender identity and sensitive metadata.

### Implementation for User Story 8

- [X] T105 [P] [US8] Define notification, device registration, read state, and preference types in types/notifications.ts
- [X] T106 [P] [US8] Implement notification REST methods in services/notifications.service.ts
- [X] T107 [US8] Implement push permission request flow after authentication and user action/consent with denied-permission state in utils/push-notifications.ts
- [X] T108 [US8] Implement Expo push token retrieval for authenticated users in utils/push-notifications.ts
- [X] T109 [US8] Register authenticated user's device push token with the API in services/notifications.service.ts
- [X] T110 [US8] Implement notification device registration and preference hooks in features/notifications/use-notifications.ts
- [X] T111 [US8] Implement notification history and mark-read logic in features/notifications/use-notification-history.ts
- [X] T112 [US8] Add notification preference controls to profile/settings screens in app/settings.tsx
- [X] T113 [US8] Implement notification history surface in app/(modals)/notifications.tsx
- [X] T114 [US8] Ensure notification rendering omits sender identity, exact location, payment internals, and moderation metadata in features/notifications/notification-item.tsx
- [X] T115 [US8] Validate push permission denied behavior in specs/001-confessabr-social-mvp/quickstart.md
- [X] T116 [US8] Validate authenticated device push token registration in specs/001-confessabr-social-mvp/quickstart.md
- [X] T117 [US8] Validate notification preference and payload privacy behavior in specs/001-confessabr-social-mvp/quickstart.md

**Checkpoint**: US8 independently functional and privacy checked.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, cleanup, and constitution checks across all implemented increments.

- [ ] T118 [P] Update README with setup, environment, and run instructions for ConfessaBR MVP in README.md
- [ ] T119 [P] Update implementation notes and current plan references in AGENTS.md
- [ ] T120 Verify no manual StyleSheet usage exists in app/, components/, features/, hooks/, store/, types/, utils/, and services/ via specs/001-confessabr-social-mvp/quickstart.md
- [ ] T121 Verify no direct API calls exist inside app/ or components/ via specs/001-confessabr-social-mvp/quickstart.md
- [ ] T122 Verify tokens are stored only through SecureStore helper in utils/secure-token.ts
- [ ] T123 Verify no sensitive identity, payment, moderation, or exact location data is logged through utils/privacy-log.ts
- [ ] T124 Run lint and resolve reported issues in package.json
- [ ] T125 Create post-implementation usability test script for SC-001, SC-007, and SC-008 in specs/001-confessabr-social-mvp/usability-test.md
- [ ] T126 Execute post-implementation usability validation with participants or a documented simulated session in specs/001-confessabr-social-mvp/usability-test.md
- [ ] T127 Record completion-rate results for account/visitor, room, and poll flows in specs/001-confessabr-social-mvp/usability-test.md
- [ ] T128 Validate post-implementation basic screen responsiveness: useful feedback within 1s for primary actions and smooth list/radar interactions on a representative device or simulator in specs/001-confessabr-social-mvp/quickstart.md
- [ ] T129 Run full manual quickstart validation and record completion notes in specs/001-confessabr-social-mvp/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Phase 1 and blocks all user stories.
- **P1 stories (Phases 3-5)**: Depend on Phase 2. US1 should complete before US2/US3 because authentication gates registered-only flows.
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
Task: T039 [US1] Define auth, profile, session, and preference request/response types in types/auth.ts
Task: T040 [US1] Implement auth REST methods for register, login, logout, and current user in services/auth.service.ts
Task: T041 [US1] Implement profile and preference REST methods in services/profile.service.ts
```

### User Story 2

```text
Task: T052 [US2] Define anonymous message, reveal, archive, share, and send payload types in types/inbox.ts
Task: T053 [US2] Implement inbox and direct message REST methods in services/inbox.service.ts
Task: T054 [US2] Implement payment capability lookup used by reveal flow in services/payments.service.ts
```

### User Story 3

```text
Task: T063 [US3] Define room, membership, feed item, join code, and room permission types in types/rooms.ts
Task: T064 [US3] Implement room and room feed REST methods in services/rooms.service.ts
Task: T065 [US3] Implement basic moderation report method for room feed reports in services/moderation.service.ts
```

### User Story 7

```text
Task: T096 [US7] Define radar presence, radar result, region room, proximity chat, and distance filter types in types/radar.ts
Task: T097 [US7] Implement radar and proximity chat REST methods in services/radar.service.ts
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
