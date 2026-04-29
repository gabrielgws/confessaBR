# Feature Specification: ConfessaBR Anonymous Social MVP

**Feature Branch**: `001-confessabr-social-mvp`  
**Created**: 2026-04-29  
**Status**: Draft  
**Input**: User description: "Create an anonymous social app called ConfessaBR where users interact in rooms, exchange anonymous messages, join positive polls, use payments for specific unlocks, receive notifications, and discover nearby rooms or opted-in people while preserving anonymity and consent."

## Clarifications

### Session 2026-04-29

- Q: What delivery scope defines the MVP readiness threshold? → A: MVP phaseado: P1 first
- Q: What can visitors access before authentication? → A: Landing and authentication only
- Q: When is sender reveal consent determined? → A: Fixed per message at send time
- Q: How are positive polls constrained? → A: Positive categories plus limited custom text
- Q: What radar discovery precision rule should radar use? → A: Neighborhood/region only; no individual user pin

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Join And Manage Identity (Priority: P1)

A person can create an account, sign in, or enter as a visitor with clear limits.
Registered users can maintain a profile with a unique username plus privacy and
preference controls.

**Why this priority**: Identity and access level determine every later action,
including content creation, voting, payments, notifications, and privacy choices.

**Independent Test**: A tester can complete account creation, sign in, enter as a
visitor, edit profile details, and verify visitor-only restrictions without using
rooms, inbox, polls, payments, or radar.

**Acceptance Scenarios**:

1. **Given** a new person, **When** they create an account with an unused username, **Then** they can access the authenticated home experience.
2. **Given** an existing registered user, **When** they sign in successfully, **Then** their profile, preferences, and privacy settings are available.
3. **Given** a visitor, **When** they browse the app, **Then** they can access only the landing and authentication screens.
4. **Given** a username already in use, **When** a user tries to save it, **Then** the system rejects it and explains that the username must be unique.

---

### User Story 2 - Use Anonymous Inbox And Direct Messages (Priority: P1)

A registered user can receive anonymous messages, inspect them, archive them,
report abusive content, share them without exposing the sender, and reveal a
sender only when the sender allowed reveal and the required payment is confirmed.
Users can send anonymous messages to other users and choose whether their identity
may later be revealed.

**Why this priority**: Anonymous inbox messaging is a core ConfessaBR interaction
and contains high-risk privacy and payment rules.

**Independent Test**: A tester can send a message, receive it in an inbox, open
details, archive it, report it, share it, and verify that sender reveal is blocked
unless consent and payment conditions are satisfied.

**Acceptance Scenarios**:

1. **Given** a registered recipient, **When** another registered user sends an anonymous message, **Then** the recipient sees the message without sender identity.
2. **Given** an inbox message, **When** the recipient archives it, **Then** it no longer appears in the active inbox and remains recoverable through archive history.
3. **Given** an inbox message, **When** the recipient shares it, **Then** the shared content excludes sender identity and sensitive metadata.
4. **Given** a sender who did not allow reveal for a message at send time, **When** the recipient attempts to reveal the sender, **Then** the system refuses the reveal even if the recipient is willing to pay.
5. **Given** a sender who allowed reveal for a message at send time, **When** payment is confirmed, **Then** the recipient can see the sender identity for that message only.

---

### User Story 3 - Participate In Rooms And Room Feeds (Priority: P1)

A registered user can create rooms, join rooms by code, leave rooms, view room
members, read anonymous room feed messages, post messages in rooms, report content,
and use moderation actions when they have permission.

**Why this priority**: Rooms create the shared social spaces where anonymous posts,
polls, and moderation happen.

**Independent Test**: A tester can create a room, join it with another account by
code, post feed messages, inspect members, report a feed item, leave the room, and
verify moderator-only actions are unavailable to normal members.

**Acceptance Scenarios**:

1. **Given** a registered user, **When** they create a room, **Then** the room receives a join code and appears in their room list.
2. **Given** a valid room code, **When** another registered user enters it, **Then** they become a member and can view the room feed.
3. **Given** a room member, **When** they post a room message, **Then** other members see the message without sender identity unless moderation rules require otherwise.
4. **Given** a normal room member, **When** they try to moderate content, **Then** the system blocks the action.
5. **Given** a moderator, **When** they hide or remove reported content, **Then** the content is no longer visible according to the moderation decision.

---

### User Story 4 - Run Positive Polls In Rooms (Priority: P2)

A registered room member can create positive polls from predefined positive
categories with limited custom text, invite participants, allow invitees to accept
or refuse participation, collect one vote per participant, end the poll, show
results, display rankings, and share visual results without exposing sensitive
data without consent.

**Why this priority**: Positive polls are a distinctive engagement mechanic, but
they depend on rooms and authenticated participation.

**Independent Test**: A tester can create a poll in a room, invite participants,
accept or refuse participation from different accounts, vote once, close the poll,
view rankings, and verify repeat voting and sensitive result sharing are blocked.

**Acceptance Scenarios**:

1. **Given** a room member, **When** they create a poll using an allowed positive category and valid limited custom text, **Then** invited participants can respond to the invitation.
2. **Given** a participant invitation, **When** the invitee refuses, **Then** they are excluded from voting and results participation.
3. **Given** an accepted participant, **When** they vote once, **Then** their vote is counted.
4. **Given** a participant who already voted, **When** they attempt another vote in the same poll, **Then** the system rejects the second vote.
5. **Given** a closed poll, **When** a participant views results, **Then** rankings are visible according to privacy and consent rules.

---

### User Story 5 - Report And Moderate Harmful Behavior (Priority: P2)

Users can report messages, polls, or users. The system prevents duplicate reports
for the same target by the same reporter, may hide or remove reported content, and
allows moderators to block or ban users according to their permissions.

**Why this priority**: Anonymous social products need visible safety mechanisms to
protect users and encourage positive interaction.

**Independent Test**: A tester can report content once, verify duplicate reporting
is blocked, and confirm that only moderators can apply block, ban, hide, or remove
actions.

**Acceptance Scenarios**:

1. **Given** reportable content, **When** a user submits a report with a reason, **Then** the report is recorded and the user receives confirmation.
2. **Given** the same user and same target, **When** they submit a duplicate report, **Then** the system prevents the duplicate.
3. **Given** a reported item, **When** moderation policy requires hiding, **Then** affected users no longer see the content.
4. **Given** a moderator, **When** they block or ban a user, **Then** the restricted user loses the affected capabilities.

---

### User Story 6 - Unlock Paid Capabilities (Priority: P2)

A registered user can initiate payment for paid capabilities, such as allowed
sender reveal, and the system unlocks the capability only after payment
confirmation.

**Why this priority**: Payments protect gated functionality and directly affect
privacy-sensitive reveal behavior.

**Independent Test**: A tester can start a payment, abandon it, complete it, and
verify that the paid capability stays locked until confirmed and unlocks only for
the intended user and item.

**Acceptance Scenarios**:

1. **Given** a paid feature, **When** a user starts payment, **Then** the system shows the payment as pending and keeps the feature locked.
2. **Given** a failed or abandoned payment, **When** the user returns to the app, **Then** the feature remains locked.
3. **Given** a confirmed payment for an eligible reveal, **When** the user returns to the message, **Then** the reveal is available for that specific message.

---

### User Story 7 - Discover Nearby Rooms And People (Priority: P3)

A registered user can opt into proximity discovery, see nearby rooms and opted-in
people represented only by neighborhood or region, filter by type and distance,
create region-based rooms, and start anonymous temporary proximity chats.

**Why this priority**: Radar expands discovery, but it carries location privacy
risk and can follow core messaging and rooms.

**Independent Test**: A tester can grant or deny location permission, opt in or
out of visibility, view neighborhood or region-level nearby results within
selected distance, and confirm non-opted-in users, individual user pins, and
exact locations never appear.

**Acceptance Scenarios**:

1. **Given** a user who has not opted in, **When** another user opens radar nearby, **Then** the non-opted-in user does not appear.
2. **Given** an opted-in user, **When** radar displays them, **Then** they are represented only at neighborhood or region level with no individual pin.
3. **Given** a selected distance filter, **When** radar results load, **Then** only rooms and opted-in people within the selected range are shown.
4. **Given** two nearby opted-in users, **When** one starts a proximity chat, **Then** the conversation is anonymous and may expire after the temporary chat window.

---

### User Story 8 - Receive Relevant Notifications (Priority: P3)

A registered user can receive notifications for new messages, poll invitations,
poll results, and payment confirmations, while respecting account preferences and
privacy settings.

**Why this priority**: Notifications improve re-engagement but depend on core
events from inbox, polls, and payments.

**Independent Test**: A tester can enable and disable notification preferences and
verify each supported event produces or suppresses a notification as configured.

**Acceptance Scenarios**:

1. **Given** notifications are enabled, **When** a new anonymous message arrives, **Then** the recipient receives a notification that does not expose sender identity.
2. **Given** a poll invitation, **When** the user is invited, **Then** they receive a notification with enough context to accept or refuse.
3. **Given** a confirmed payment, **When** confirmation is received, **Then** the payer receives a notification about the unlocked capability.
4. **Given** notifications are disabled for an event type, **When** that event occurs, **Then** no notification is sent for that preference.

### Edge Cases

- Visitors attempt to access authenticated areas or perform any authenticated action.
- A username is taken, invalid, reserved, or changed while another user is trying to claim it.
- A message sender changes privacy preferences after sending a message with a fixed reveal-consent decision.
- A payment remains pending, fails, is duplicated, or confirms after the user leaves the app.
- A user tries to vote twice, vote after a poll closes, or vote without accepting participation.
- A user tries to create a poll outside the allowed positive categories or with custom text that violates limits.
- A user submits a duplicate report for the same target.
- A reported item is deleted before moderation review.
- A room code is invalid, expired, or points to a room the user cannot access.
- Location permission is denied, revoked, unavailable, or returns an area outside the supported region.
- A nearby person opts out while another user is viewing radar.
- A radar result would require showing an individual person's exact or near-exact pin.
- Network loss or server rejection occurs after the client showed a draft action as pending.
- Every main flow must expose loading, error, empty, and success states.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-000**: The system MUST treat MVP readiness as a phased delivery: P1 stories define the first shippable increment, while P2 and P3 stories remain planned follow-up increments.
- **FR-001**: The system MUST allow users to create accounts, sign in, sign out, and enter as visitors.
- **FR-002**: The system MUST limit visitors to landing and authentication screens only.
- **FR-003**: The system MUST allow registered users to create and edit a profile with a unique username.
- **FR-004**: The system MUST allow registered users to configure privacy and notification preferences.
- **FR-005**: The system MUST allow registered users to receive, open, archive, report, and share anonymous inbox messages.
- **FR-006**: The system MUST ensure shared inbox messages do not expose sender identity or sensitive metadata.
- **FR-007**: The system MUST allow users to send anonymous messages to other users.
- **FR-008**: The system MUST allow message senders to choose whether their identity may later be revealed.
- **FR-009**: The system MUST reveal sender identity only when the sender allowed reveal for that specific message at send time and the required payment is confirmed.
- **FR-010**: The system MUST allow registered users to create rooms, join by code, leave rooms, and view room members.
- **FR-011**: The system MUST allow room members to view and post anonymous room feed messages.
- **FR-012**: The system MUST allow users to report room messages, inbox messages, polls, and users.
- **FR-013**: The system MUST prevent duplicate reports from the same reporter for the same target.
- **FR-014**: The system MUST allow users with moderation permission to hide, remove, block, or ban according to their assigned authority.
- **FR-015**: The system MUST allow room members to create positive polls inside rooms using predefined positive categories and limited custom text.
- **FR-016**: The system MUST allow poll creators to invite participants.
- **FR-017**: The system MUST allow invited participants to accept or refuse poll participation.
- **FR-018**: The system MUST allow accepted participants to vote once per poll.
- **FR-019**: The system MUST prevent more than one vote by the same participant in the same poll.
- **FR-020**: The system MUST show poll results and rankings after the poll closes.
- **FR-021**: The system MUST allow visual sharing of results without exposing sensitive data without consent.
- **FR-022**: The system MUST allow registered users to initiate payments for paid capabilities.
- **FR-023**: The system MUST keep paid capabilities locked until payment confirmation is received.
- **FR-024**: The system MUST notify users about new messages, poll invitations, poll results, and payment confirmations according to preferences.
- **FR-025**: The system MUST allow users to opt into and out of proximity discovery.
- **FR-026**: The system MUST show nearby rooms and only opted-in nearby people.
- **FR-027**: The system MUST represent people and region-based rooms at neighborhood or region level and MUST NOT show individual user pins or exact user location.
- **FR-028**: The system MUST allow users to filter proximity results by type and distance.
- **FR-029**: The system MUST allow users to create rooms based on their region.
- **FR-030**: The system MUST allow opted-in nearby users to start anonymous temporary proximity chats.
- **FR-031**: The system MUST use the backend as the authoritative source for validation, authorization, moderation, payments, voting, sender reveal, consent, and proximity access decisions.
- **FR-032**: The system MUST expose loading, error, empty, and success states for every user-facing data flow.
- **FR-033**: The system MUST preserve anonymity by default across messages, rooms, polls, sharing, notifications, and proximity interactions.

### Key Entities *(include if feature involves data)*

- **User**: A person with account credentials, unique username, profile details, privacy preferences, notification preferences, and account status.
- **Visitor Session**: Visitors may access only landing and authentication surfaces. Visitors cannot access authenticated production views and cannot create, vote, pay, report, chat, or mutate data.
- **Anonymous Message**: A direct message with content, recipient, anonymous sender reference, reveal permission, moderation status, archive status, and report status.
- **Room**: A shared social space with name, join code, region if applicable, member list, permissions, feed content, and moderation state.
- **Room Membership**: A relationship between a user and a room, including role, join status, and moderation permissions.
- **Room Feed Item**: Anonymous content posted inside a room, including content, author reference, visibility, reports, and moderation state.
- **Poll**: A positive room-based question with options, creator, invitees, participant consent state, votes, close state, and results visibility.
- **Poll Invitation**: An invitation connecting a user to a poll with pending, accepted, or refused state.
- **Vote**: A single participant choice in a poll with uniqueness enforced per participant and poll.
- **Report**: A user-submitted safety signal targeting a message, poll, feed item, or user with reason, reporter, and review state.
- **Moderation Action**: A decision by an authorized moderator to hide, remove, block, or ban.
- **Payment**: A paid unlock attempt with payer, target capability, target item, status, and confirmation result.
- **Notification Preference**: User choices controlling whether event types produce notifications.
- **Radar Presence**: An opt-in proximity visibility record with neighborhood or region-level location, visibility status, and distance eligibility.
- **Proximity Chat**: An anonymous temporary conversation between nearby opted-in users.

### Backend Alignment *(mandatory for ConfessaBR features)*

- **API Contracts**: Planning must map account, profile, inbox, messages, rooms, room feed, polls, reports, moderation, payments, notifications, radar, and proximity chat operations to backend contracts, including authentication requirements, expected success responses, and user-facing error cases.
- **Backend-Owned Rules**: The backend owns unique usernames, visitor limits, permissions, duplicate report prevention, poll category eligibility, custom poll text limits, one-vote enforcement, payment confirmation, sender reveal eligibility, content moderation, opt-in visibility, neighborhood/region-level radar discovery rules, and proximity access decisions.
- **Client Responsibilities**: The client presents flows, stores non-authoritative local UI state, requests backend actions, reflects backend decisions, provides user-friendly validation feedback, and never treats local checks as final authority.

### Privacy And Security *(mandatory for sensitive features)*

- **Authentication**: Registered-only actions require authenticated access. Visitor sessions must remain visibly limited.
- **Sensitive Data**: Sender identity, payment state details, exact location, moderation metadata, and private profile data must not be exposed through shared content, notifications, logs, or navigation state.
- **Anonymity/Consent**: Sender reveal requires message-specific send-time permission and confirmed payment. Later sender preference changes do not change the reveal decision for previously sent messages. Poll sharing requires consent-aware result presentation. Radar requires explicit opt-in and neighborhood or region-level location only, with no individual user pins. Proximity chat remains anonymous and temporary in the full planned feature.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-000**: The first MVP increment is considered ready when all P1 user stories meet their acceptance scenarios and constitution-required UX, privacy, and backend-authority checks.
- **SC-001**: At least 90% of new users can create an account or enter as a visitor in under 2 minutes during usability testing.
- **SC-002**: 100% of visitor attempts to access authenticated areas or perform authenticated actions are blocked with clear feedback.
- **SC-003**: 100% of shared anonymous messages and notifications omit sender identity unless reveal has been explicitly unlocked for the intended recipient.
- **SC-004**: 100% of poll participants are prevented from voting more than once in the same poll.
- **SC-005**: 100% of paid capabilities remain locked until payment confirmation is received.
- **SC-006**: 100% of radar results exclude non-opted-in people and avoid individual user pins or exact user location disclosure.
- **SC-007**: At least 80% of test users can create or join a room, post a room message, and report content without assistance.
- **SC-008**: At least 80% of test users can create a poll, invite participants, vote, and understand final results without assistance.
- **SC-009**: Every primary screen has verifiable loading, error, empty, and success states.
- **SC-010**: Moderation review testing confirms duplicate reports by the same reporter for the same target are prevented every time.

## Assumptions

- The full planned feature targets mobile users who want anonymous, privacy-preserving social interactions in Portuguese-speaking contexts.
- The first shippable MVP increment includes only US1-US3/P1 stories; P2 and P3 stories are planned increments that may be delivered after the first US1-US3 release.
- Account creation uses a standard credential-based flow unless a later authentication specification adds social sign-in.
- Visitors may access only landing and authentication surfaces until they create an account or sign in.
- Payments may unlock multiple future capabilities, but this specification treats sender reveal as the primary paid unlock.
- Proximity discovery uses a user-selected radius from 500m to 10km and displays neighborhood or region-level location only.
- Temporary proximity chats are not retained as durable conversation history in the full planned feature.
- Moderation policies and payment confirmation are controlled by backend rules and reflected by the app.
