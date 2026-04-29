# Data Model: ConfessaBR Anonymous Social MVP

## User

**Fields**: `id`, `username`, `displayName`, `avatarUrl`, `bio`, `accountStatus`,
`privacySettings`, `notificationSettings`, `createdAt`, `updatedAt`.

**Relationships**: Has many room memberships, inbox messages as recipient,
sent anonymous messages, poll invitations, votes, reports, payments, radar
presence records, and proximity chats.

**Validation rules**: Username is unique, non-empty, and backend-validated.
Profile edits require authentication. Private fields must not be included in
shared content or public radar/person summaries.

**State transitions**: `active` -> `blocked` -> `banned`; profile preference
changes update future visibility and notification behavior but do not override
backend-owned historical payment/reveal decisions.

## Visitor Session

**Fields**: `sessionId`, `startedAt`, `allowedSurfaces`, `restrictionReason`.

**Relationships**: Not linked to content creation, votes, payments, reports,
authenticated production views, mutable data, or proximity chat.

**Validation rules**: Visitors may access only landing and authentication
surfaces. Visitors cannot access authenticated production views and cannot
create, vote, pay, report, chat, or mutate data.

## Anonymous Message

**Fields**: `id`, `recipientId`, `senderAlias`, `body`, `canRevealSender`,
`revealStatus`, `archiveStatus`, `moderationStatus`, `createdAt`, `updatedAt`.

**Relationships**: Belongs to recipient; optionally linked to sender internally
on the backend; can have reports and payments.

**Validation rules**: Sender identity is hidden unless backend confirms sender
permission and payment. Shared message payloads omit identity and sensitive
metadata.

**State transitions**: `active` -> `archived`; `visible` -> `hidden` -> `removed`;
`not_revealable` or `revealable_locked` -> `reveal_unlocked`.

## Room

**Fields**: `id`, `name`, `description`, `joinCode`, `visibility`, `regionLabel`,
`regionDiscoveryArea`, `memberCount`, `createdBy`, `createdAt`, `updatedAt`.

**Relationships**: Has many memberships, feed items, polls, reports, and radar
listings.

**Validation rules**: Join code validity and access are backend-owned. Radar uses
neighborhood/region-level discovery only. It must never show exact location or
individual user pins.

**State transitions**: `active` -> `hidden` -> `removed`; membership status is
tracked separately.

## Room Membership

**Fields**: `id`, `roomId`, `userId`, `role`, `status`, `joinedAt`, `leftAt`.

**Relationships**: Belongs to user and room.

**Validation rules**: Only backend-assigned roles grant moderation actions.
Members who leave lose room posting and poll creation access.

**State transitions**: `active` -> `left`; `member` -> `moderator` or `banned`.

## Room Feed Item

**Fields**: `id`, `roomId`, `senderAlias`, `body`, `visibilityStatus`,
`moderationStatus`, `createdAt`, `updatedAt`.

**Relationships**: Belongs to room; can have reports and moderation actions.

**Validation rules**: Only room members may post. Sender identity is anonymous in
the UI. Hidden or removed content is not rendered to affected users.

**State transitions**: `visible` -> `reported` -> `hidden` or `removed`.

## Poll

**Fields**: `id`, `roomId`, `creatorId`, `question`, `options`, `status`,
`resultsVisibility`, `createdAt`, `closesAt`, `closedAt`.

**Relationships**: Belongs to room; has invitations and votes.

**Validation rules**: Polls are positive room interactions. Only eligible room
members can create polls. Results appear after close according to backend rules.

**State transitions**: `draft` -> `open` -> `closed` -> `results_visible`.

## Poll Invitation

**Fields**: `id`, `pollId`, `userId`, `status`, `sentAt`, `respondedAt`.

**Relationships**: Belongs to poll and user.

**Validation rules**: Only accepted participants can vote. Refused participants
are excluded from voting and result participation where applicable.

**State transitions**: `pending` -> `accepted` or `refused`.

## Vote

**Fields**: `id`, `pollId`, `participantId`, `optionId`, `createdAt`.

**Relationships**: Belongs to poll, participant, and option.

**Validation rules**: Exactly one vote per participant per poll; voting requires
accepted participation and an open poll.

## Report

**Fields**: `id`, `targetType`, `targetId`, `reporterId`, `reason`, `status`,
`createdAt`, `reviewedAt`.

**Relationships**: Targets a message, room feed item, poll, or user; may produce
moderation actions.

**Validation rules**: Duplicate reports from the same reporter for the same
target are rejected by the backend.

**State transitions**: `submitted` -> `reviewing` -> `actioned` or `dismissed`.

## Moderation Action

**Fields**: `id`, `targetType`, `targetId`, `moderatorId`, `actionType`,
`reason`, `createdAt`.

**Relationships**: May resolve one or more reports and affect users/content.

**Validation rules**: Requires moderator authority for the target context.

## Payment

**Fields**: `id`, `payerId`, `capability`, `targetType`, `targetId`, `status`,
`checkoutUrl`, `confirmedAt`, `createdAt`.

**Relationships**: Belongs to payer and target capability, such as sender reveal.

**Validation rules**: Paid capability remains locked until backend confirmation.
Confirmed payment unlocks only the intended capability and target item.

**State transitions**: `created` -> `pending` -> `confirmed` or `failed` or
`expired`.

## Notification Preference

**Fields**: `userId`, `newMessagesEnabled`, `pollInvitesEnabled`,
`pollResultsEnabled`, `paymentsEnabled`, `updatedAt`.

**Relationships**: Belongs to user.

**Validation rules**: Notifications must not expose sender identity, exact
location, or sensitive payment/moderation details.

## Radar Presence

**Fields**: `id`, `userId`, `isOptedIn`, `regionDiscoveryArea`, `radiusMeters`,
`lastUpdatedAt`.

**Relationships**: Belongs to user; appears in radar results only while opted in.

**Validation rules**: Radar uses neighborhood/region-level discovery only. It
must never show exact location or individual user pins. Nearby people appear only
as counts or aggregation by region. Radius is between 500m and 10km. Non-opted-in
users never appear.

**State transitions**: `hidden` -> `visible` -> `hidden`.

## Proximity Chat

**Fields**: `id`, `participantIds`, `status`, `startedAt`, `expiresAt`.

**Relationships**: Connects nearby opted-in users temporarily.

**Validation rules**: Participants remain anonymous. MVP chats are temporary and
not durable conversation history.

**State transitions**: `active` -> `expired` or `ended`.
