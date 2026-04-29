<!--
Sync Impact Report
Version change: template -> 1.0.0
Modified principles:
- Template principle 1 -> I. Mobile Stack Is Fixed
- Template principle 2 -> II. Layered Feature Architecture
- Template principle 3 -> III. Backend Rules Are Authoritative
- Template principle 4 -> IV. Security And Privacy By Default
- Template principle 5 -> V. Complete UX States
Added sections:
- Product Scope And Required Capabilities
- Development Workflow And Quality Gates
Removed sections:
- None
Templates requiring updates:
- updated: .specify/templates/plan-template.md
- updated: .specify/templates/spec-template.md
- updated: .specify/templates/tasks-template.md
- not applicable: .specify/templates/commands/*.md (directory not present)
Follow-up TODOs:
- None
-->
# ConfessaBR Mobile Constitution

## Core Principles

### I. Mobile Stack Is Fixed
ConfessaBR mobile MUST be built with Expo, React Native, TypeScript, Expo Router,
NativeWind, Zustand, TanStack Query, Axios, Expo SecureStore, Expo Location, and
React Native Maps where the feature requires those capabilities. Styling MUST use
NativeWind classes and MUST NOT use manual `StyleSheet` definitions. All source
code MUST be TypeScript with descriptive names such as `isLoading`, `hasError`,
and `selectedRoomId`.

Rationale: a fixed stack keeps the mobile codebase predictable, reviewable, and
compatible with the rest of the planned application.

### II. Layered Feature Architecture
Features MUST be organized by domain under `features/`, shared UI under
`components/`, reusable hooks under `hooks/`, global state under `store/`, API
clients under `services/`, shared types under `types/`, and helpers under
`utils/`. Components MUST remain presentational whenever possible and MUST NOT
perform direct API calls. Business logic MUST live in services, hooks, stores, or
feature modules instead of screen components.

Rationale: anonymous social, payments, moderation, inbox, rooms, polls, and radar
flows are complex enough that UI and business rules must stay separated.

### III. Backend Rules Are Authoritative
The frontend MUST reflect the Laravel API behavior exactly and MUST NOT create
business rules that exist only on the client. Client validation MAY improve user
feedback, but server validation, authorization, moderation, payment status, vote
eligibility, sender reveal, and proximity access remain authoritative. API access
MUST use centralized Axios services with `Authorization: Bearer {token}` when
authenticated.

Rationale: anonymous interactions, payments, voting, and moderation require a
single source of truth to avoid security and product inconsistencies.

### IV. Security And Privacy By Default
Authentication tokens MUST be stored only in Expo SecureStore and MUST NOT be
stored in AsyncStorage. Sensitive data MUST NOT be exposed in logs, UI state, or
navigation params. Sender reveal MUST never occur without the approved backend
payment flow. Radar and proximity features MUST use approximate location, MUST
show only opted-in users, and MUST respect the configured radius from 500m to
10km.

Rationale: the product depends on anonymity, consent, and payment-gated access;
privacy failures are core product failures.

### V. Complete UX States
Every user-facing flow MUST provide loading, error, empty, and success states.
Data fetching MUST use TanStack Query for server state, caching, refetching, and
loading/error control. Reusable UI primitives such as Button, Input, Card, Avatar,
Badge, Modal, BottomSheet, Tabs, and Header MUST be preferred over one-off UI.
Animations, loaders, and visual feedback SHOULD be smooth and purposeful.

Rationale: anonymous social workflows need clear feedback so users understand
what happened without exposing unnecessary information.

## Product Scope And Required Capabilities

The mobile app MUST support the required ConfessaBR surfaces: Landing, Login,
Cadastro, Home, Salas, Criar sala, Feed da sala, Criar enquete, Votacao,
Resultado, Inbox, Perfil, Configuracoes, and Entrar por codigo.

Inbox features MUST include listing messages, opening details, archiving,
reporting, sharing, and paid sender reveal. Rooms MUST include listing, creating,
joining by code, leaving, and viewing members. Polls MUST include creation,
participant invitation, consent, one-vote voting, and results. Payments MUST
initiate checkout and wait for backend webhook confirmation. Radar MUST use
Expo Location and React Native Maps to show approximate nearby rooms and opted-in
people with type and distance filters. Proximity chat for the MVP MUST be
anonymous, temporary, and non-persistent.

## Development Workflow And Quality Gates

Plans and specs MUST document the real mobile structure, API service boundaries,
state ownership, privacy implications, and required UX states before
implementation. Tasks MUST be grouped by independently testable user story and
include service, hook/store, UI component, and state-handling work where relevant.

Implementation MUST use Expo Router paths for navigation, including `/`, `/login`,
`/register`, `/home`, `/rooms`, `/rooms/:id`, `/polls/:id`, `/inbox`,
`/profile`, `/settings`, and `/radar` as applicable. Context7 SHOULD be used when
consulting external documentation for the selected libraries. Changes that touch
authentication, payments, moderation, sender reveal, voting, or location MUST
include explicit verification steps for security and backend alignment.

## Governance

This constitution supersedes conflicting implementation guidance for the
ConfessaBR mobile app. Amendments MUST update this file, include a Sync Impact
Report, and propagate required changes to Spec Kit templates and runtime guidance
documents.

Versioning follows semantic versioning. MAJOR changes remove or redefine core
principles or compatibility expectations. MINOR changes add principles, required
sections, or materially expand governance. PATCH changes clarify wording without
changing obligations.

Every feature plan, specification, and task list MUST pass the Constitution Check
before implementation starts. Reviews MUST verify stack compliance, layered
architecture, backend authority, SecureStore usage, privacy constraints, and full
UX states.

**Version**: 1.0.0 | **Ratified**: 2026-04-29 | **Last Amended**: 2026-04-29
