# REST API Contract: ConfessaBR Mobile MVP

The mobile app consumes a Laravel 13 REST API under `/api`. All authenticated
requests include `Authorization: Bearer {token}`. The backend is authoritative
for validation, permissions, moderation, payment confirmation, sender reveal,
poll voting, consent, and proximity access.

## Shared Response Expectations

- Success responses return the requested resource or action result plus any
  user-facing status needed by the app.
- Validation failures return field-level errors when applicable.
- Authorization failures return a clear forbidden/unauthenticated state that the
  app can map to sign-in, visitor restriction, or permission feedback.
- Business-rule failures return a stable reason code such as `VISITOR_LIMITED`,
  `DUPLICATE_REPORT`, `POLL_ALREADY_VOTED`, `PAYMENT_REQUIRED`,
  `REVEAL_NOT_ALLOWED`, or `RADAR_OPT_IN_REQUIRED`.
- Responses must not expose sender identity, exact user location, individual
  user pins, private
  moderation metadata, or sensitive payment details unless explicitly allowed for
  the current authenticated user and action.

## Authentication And Profile

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/auth/register` | No | Create account and return session token |
| POST | `/api/auth/login` | No | Authenticate and return session token |
| POST | `/api/auth/logout` | Yes | Revoke current session |
| GET | `/api/me` | Yes | Load current user profile and preferences |
| PATCH | `/api/me/profile` | Yes | Update display profile and unique username |
| PATCH | `/api/me/privacy` | Yes | Update privacy settings |
| PATCH | `/api/me/notifications` | Yes | Update notification preferences |

**Backend-owned rules**: unique usernames, account status, token validity,
visitor limitations, private profile visibility.

## Anonymous Inbox And Messages

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/inbox/messages` | Yes | List active inbox messages |
| GET | `/api/inbox/messages/{messageId}` | Yes | Open message detail |
| POST | `/api/inbox/messages/{messageId}/archive` | Yes | Archive a message |
| POST | `/api/inbox/messages/{messageId}/report` | Yes | Report a message |
| GET | `/api/inbox/messages/{messageId}/share` | Yes | Get safe share payload |
| POST | `/api/messages` | Yes | Send anonymous direct message |
| POST | `/api/inbox/messages/{messageId}/reveal` | Yes | Request sender reveal after eligibility and payment checks |

**Backend-owned rules**: sender anonymity, reveal consent, reveal payment status,
safe share payload, report duplication, moderation state.

## Rooms And Room Feed

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/rooms` | Yes | List rooms available to the user |
| POST | `/api/rooms` | Yes | Create a room |
| POST | `/api/rooms/join` | Yes | Join a room by code |
| POST | `/api/rooms/{roomId}/leave` | Yes | Leave a room |
| GET | `/api/rooms/{roomId}/members` | Yes | View room members |
| GET | `/api/rooms/{roomId}/feed` | Yes | List room feed messages |
| POST | `/api/rooms/{roomId}/feed` | Yes | Post anonymous room feed message |
| POST | `/api/rooms/{roomId}/feed/{feedItemId}/report` | Yes | Report a feed item |

**Backend-owned rules**: room access, join code validity, membership status,
anonymous feed identity, moderation visibility, member permissions.

## Polls

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/rooms/{roomId}/polls` | Yes | Create a positive poll |
| GET | `/api/polls/{pollId}` | Yes | Load poll detail |
| POST | `/api/polls/{pollId}/invitations` | Yes | Invite participants |
| POST | `/api/polls/{pollId}/invitations/{invitationId}/accept` | Yes | Accept participation |
| POST | `/api/polls/{pollId}/invitations/{invitationId}/refuse` | Yes | Refuse participation |
| POST | `/api/polls/{pollId}/votes` | Yes | Vote once |
| GET | `/api/polls/{pollId}/results` | Yes | View closed poll results |
| GET | `/api/polls/{pollId}/share` | Yes | Get safe visual-share payload |

**Backend-owned rules**: poll positivity policy, invite eligibility, consent,
one-vote enforcement, close state, result visibility, safe sharing.

## Reports And Moderation

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/reports` | Yes | Report message, feed item, poll, or user |
| GET | `/api/moderation/queue` | Yes, moderator | View moderation queue |
| POST | `/api/moderation/actions` | Yes, moderator | Hide, remove, block, or ban target |

**Backend-owned rules**: duplicate report prevention, moderator authority,
content hiding/removal, user blocking/banning.

## Payments

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/payments` | Yes | Create checkout for a paid capability |
| GET | `/api/payments/{paymentId}` | Yes | Check payment status |
| GET | `/api/payments/capabilities/{capability}/{targetId}` | Yes | Check whether a capability is unlocked |

**Backend-owned rules**: checkout validity, payment confirmation, capability
unlock, reveal eligibility, webhook processing.

## Notifications

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| POST | `/api/notifications/devices` | Yes | Register push token/device |
| DELETE | `/api/notifications/devices/{deviceId}` | Yes | Remove push token/device |
| GET | `/api/notifications` | Yes | List in-app notification history |
| POST | `/api/notifications/{notificationId}/read` | Yes | Mark notification as read |

**Backend-owned rules**: event eligibility, preference enforcement, notification
payload privacy.

## Radar And Proximity Chat

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| PATCH | `/api/radar/presence` | Yes | Opt in/out and update neighborhood/region-level proximity settings |
| GET | `/api/radar` | Yes | List nearby rooms plus opted-in people counts/aggregations by neighborhood or region, type, and distance |
| POST | `/api/radar/rooms` | Yes | Create region-based room |
| POST | `/api/proximity-chats` | Yes | Start anonymous temporary nearby chat |
| GET | `/api/proximity-chats/{chatId}` | Yes | Load active temporary chat metadata |
| POST | `/api/proximity-chats/{chatId}/messages` | Yes | Send anonymous temporary chat message |

**Backend-owned rules**: Radar uses neighborhood/region-level discovery only. It
must never show exact location or individual user pins. Nearby people appear only
as counts or aggregation by region. Backend also owns opt-in visibility, radius
from 500m to 10km, nearby eligibility, temporary chat expiry, and anonymity.
