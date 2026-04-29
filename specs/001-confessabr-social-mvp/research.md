# Research: ConfessaBR Anonymous Social MVP

## Decision: Keep Expo Router as the navigation foundation

**Rationale**: The existing project already uses `expo-router/entry`, the Expo
Router plugin, typed routes, and an `app/` directory. Expo documentation positions
Expo Router as the file-based navigation framework for Expo CLI projects, so the
MVP should extend the current route structure instead of migrating navigation.

**Alternatives considered**:
- React Navigation-only setup: rejected because it would duplicate or replace the
  current Expo Router foundation.
- Custom navigation state: rejected because route files map naturally to the
  required app surfaces.

## Decision: Install missing required app dependencies with Expo-aware commands

**Rationale**: The project has Expo, React Native, TypeScript, and Expo Router,
but still needs NativeWind, Zustand, TanStack Query, Axios, Expo SecureStore,
Expo Location, and React Native Maps. Expo package installation should use Expo's
version-aware installer for Expo modules and React Native packages where
available.

**Alternatives considered**:
- Manual package version pinning: rejected until implementation because Expo SDK
  compatibility should drive native package versions.
- Recreating the app with a NativeWind starter: rejected because the repository
  already contains an Expo Router app and Spec Kit artifacts.

## Decision: NativeWind is the only styling system

**Rationale**: The constitution forbids manual `StyleSheet`. NativeWind supports
`className` styling for React Native components and requires Metro/global CSS
setup. The implementation must add `global.css`, NativeWind Metro integration,
Tailwind config/content paths, and type declarations before building screens.

**Alternatives considered**:
- Existing themed starter components with inline style props: rejected for new
  ConfessaBR UI because it conflicts with the constitution.
- Component-specific `StyleSheet`: rejected by project rule.

## Decision: TanStack Query owns server state

**Rationale**: ConfessaBR has many server-owned resources: inbox messages, rooms,
feeds, polls, reports, payments, radar results, and notifications. TanStack Query
provides `QueryClientProvider`, query keys, mutations, cache invalidation, and
standard pending/error/success state flags that map directly to required UX
states.

**Alternatives considered**:
- Store all fetched data in Zustand: rejected because it would mix server cache
  with client/session state.
- Ad hoc component fetch state: rejected because components must not own API
  calls and every flow needs consistent loading/error/empty/success handling.

## Decision: Zustand is limited to client/session state

**Rationale**: Global state is needed for auth session, visitor mode,
non-sensitive user preferences, UI filters, and ephemeral app state. Server data
must remain in TanStack Query so that backend authority and cache invalidation
are consistent.

**Alternatives considered**:
- Context-only state: rejected because auth/radar/preferences state spans many
  routes.
- Persisting sensitive state in local storage: rejected because auth tokens must
  use SecureStore only.

## Decision: Axios service layer is the only REST access path

**Rationale**: The Laravel API is authoritative. A centralized Axios client can
attach Bearer tokens, normalize errors, handle 401 transitions, and keep route
components free of direct API calls. Feature service files define the client-side
contract for each backend domain.

**Alternatives considered**:
- Calling `fetch` directly from hooks or screens: rejected because it fragments
  auth and error handling.
- Embedding business rules in services: rejected; services only request backend
  decisions and adapt responses.

## Decision: SecureStore holds the auth token and nothing else sensitive

**Rationale**: The constitution requires Expo SecureStore for tokens and forbids
AsyncStorage for authentication. The auth store should read/write tokens through
an auth storage helper and keep sensitive identity/reveal/payment details out of
logs, shared content, notifications, and navigation params.

**Alternatives considered**:
- AsyncStorage token persistence: rejected by constitution.
- Passing tokens through route params: rejected as sensitive data exposure.

## Decision: Radar uses opt-in approximate proximity only

**Rationale**: The product requires nearby rooms and opted-in people while never
showing exact user location. Expo Location provides permission and current
position access; React Native Maps renders the radar UI. The app should send
location to the backend only for proximity decisions and render rounded or
backend-approximated coordinates.

**Alternatives considered**:
- Client-side discovery from exact coordinates: rejected because backend owns
  proximity access and privacy rules.
- Showing exact user/person pins: rejected by privacy requirements.

## Decision: Contract documentation is REST resource oriented

**Rationale**: The mobile app consumes a Laravel REST API and does not expose an
API itself. A markdown REST contract captures endpoint families, authentication,
request/response expectations, state changes, and backend-owned rules without
pretending final backend schemas are already fixed.

**Alternatives considered**:
- Full OpenAPI now: deferred because backend endpoint shapes are not present in
  the repository.
- No contracts: rejected because planning must align frontend behavior with
  Laravel authority before implementation.
