# Implementation Plan: ConfessaBR Anonymous Social MVP

**Branch**: `001-confessabr-social-mvp` | **Date**: 2026-04-29 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-confessabr-social-mvp/spec.md`

## Summary

Build the ConfessaBR mobile product on the existing Expo Router app. The plan turns
the starter project into a layered anonymous social app with auth and visitor
mode, profile, anonymous inbox, rooms, room feed, positive polls, moderation,
payments, notifications, radar proximity discovery, and temporary proximity chat.
The full planned feature includes P1, P2 and P3. The first shippable MVP
increment includes only US1-US3.

The implementation approach is to add the required mobile stack, centralize API
access through Axios services, use TanStack Query for server state, keep global
session/preferences state in Zustand, store auth tokens only in SecureStore, and
organize product logic by feature modules while preserving backend authority for
all business rules.

## Technical Context

**Language/Version**: TypeScript 5.9 with strict mode, React 19.1, React Native 0.81.5, Expo SDK 54  
**Primary Dependencies**: Expo Router 6, NativeWind, Zustand, TanStack Query, Axios, Expo SecureStore, Expo Location, React Native Maps, Expo Notifications, Expo Device, existing Expo UI/runtime packages  
**Storage**: Expo SecureStore for auth token only; in-memory Zustand for UI/session state; TanStack Query cache for server state; no client-owned business persistence in the full planned feature  
**Testing**: Expo lint for static checks; focused service/hook tests and screen integration tests to be selected during task generation; manual quickstart verification for feature flows  
**Target Platform**: iOS and Android mobile app through Expo; web remains secondary and must not drive mobile UX choices  
**Project Type**: Mobile app consuming a Laravel 13 REST API  
**Performance Goals**: Primary screens show useful feedback within 1 second, list and radar interactions stay responsive at 60 fps, and users complete core account/room/poll flows within the success criteria from the spec  
**Constraints**: NativeWind only for styling; no manual `StyleSheet`; no API calls from UI components; Bearer token auth through centralized Axios; tokens only in SecureStore; backend owns validation, authorization, moderation, payment, voting, reveal, consent, and proximity rules; Radar uses neighborhood/region-level discovery only and must never show exact location or individual user pins  
**Scale/Scope**: The full planned feature includes P1, P2 and P3. The first shippable MVP increment includes only US1-US3. P2 adds polls, moderation, and payments; P3 adds radar, proximity chat, and notifications across the route set defined by the constitution.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Fixed mobile stack**: PASS. The plan uses Expo, React Native, TypeScript,
  Expo Router, NativeWind, Zustand, TanStack Query, Axios, SecureStore, Expo
  Location, and React Native Maps. Required missing packages are captured in
  research and quickstart setup steps.
- **Layered architecture**: PASS. Source layout assigns routes to `app/`, domain
  logic to `features/`, reusable UI to `components/`, API calls to `services/`,
  reusable logic to `hooks/`, global state to `store/`, models to `types/`, and
  helpers to `utils/`.
- **Backend authority**: PASS. Contracts document REST resources and mark
  Laravel as the authority for validation, auth, moderation, payments, voting,
  sender reveal, consent, and proximity access.
- **Security and privacy**: PASS. Token storage is SecureStore-only; visitor
  restrictions, paid reveal, sensitive data sharing, notification privacy,
  opt-in radar, neighborhood/region-level discovery, and no individual user pins
  are explicit gates.
- **Complete UX states**: PASS. Each primary data surface must implement loading,
  error, empty, and success states using shared UI primitives.

Post-design re-check: PASS. `research.md`, `data-model.md`, `contracts/rest-api.md`,
and `quickstart.md` preserve these decisions without introducing justified
violations.

## Project Structure

### Documentation (this feature)

```text
specs/001-confessabr-social-mvp/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── rest-api.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
app/
├── _layout.tsx
├── index.tsx
├── (auth)/
│   ├── login.tsx
│   └── register.tsx
├── (tabs)/
│   ├── _layout.tsx
│   ├── home.tsx
│   ├── rooms.tsx
│   ├── inbox.tsx
│   ├── profile.tsx
│   └── radar.tsx
├── (modals)/
│   ├── create-room.tsx
│   ├── create-poll.tsx
│   ├── join-room.tsx
│   ├── message-detail.tsx        # P1 inbox detail
│   ├── send-message.tsx          # P1 anonymous direct message
│   ├── payment-checkout.tsx      # P2 payments
│   ├── proximity-chat.tsx        # P3 proximity chat
│   └── notifications.tsx         # P3 notifications
├── rooms/
│   └── [id].tsx
├── polls/
│   └── [id].tsx
└── settings.tsx

components/
├── ui/
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── modal.tsx
│   ├── bottom-sheet.tsx
│   ├── tabs.tsx
│   ├── header.tsx
│   └── state-view.tsx
├── layout/
└── shared/

features/
├── auth/
├── profile/
├── inbox/
├── rooms/
├── polls/
├── moderation/
├── payments/
├── notifications/
└── radar/

services/
├── api.ts
├── auth.service.ts
├── profile.service.ts
├── inbox.service.ts
├── rooms.service.ts
├── polls.service.ts
├── moderation.service.ts
├── payments.service.ts
├── notifications.service.ts
└── radar.service.ts

hooks/
store/
types/
utils/
```

**Structure Decision**: Use the existing Expo Router app as the root mobile app.
Replace starter sample screens incrementally with ConfessaBR routes while adding
feature folders and service boundaries. Keep all API interactions in `services/`
and all reusable orchestration in `features/`, `hooks/`, or `store/`.

## Complexity Tracking

No constitution violations require justification.
