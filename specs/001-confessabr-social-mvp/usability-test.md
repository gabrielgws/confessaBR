# Post-Implementation Usability Test: ConfessaBR MVP

**Feature**: `001-confessabr-social-mvp`  
**Date**: 2026-04-29  
**Method**: Documented simulated session against implemented Expo screens and
backend contract expectations.

## Scope

This script covers the spec success criteria that depend on core task
completion:

- SC-001: account creation, authentication, visitor restrictions, and profile
  preference management.
- SC-007: room creation/joining plus anonymous room feed participation.
- SC-008: positive poll creation, participation, single-vote behavior, results,
  and safe sharing.

## Test Script

### Scenario A: Account And Visitor Flow

1. Start app at landing screen.
2. Continue as visitor.
3. Attempt to open authenticated tabs or creation actions.
4. Return to landing and create an account.
5. Sign out, sign in again, and open profile/settings.
6. Update privacy and notification preferences.

Expected result: visitor mode is limited to landing/auth surfaces, authenticated
flows show useful loading/error/success states, and profile updates wait for
backend confirmation.

### Scenario B: Room Flow

1. Sign in and open the rooms tab.
2. Create a room.
3. Join a room by code from a second account or simulated backend response.
4. Open room detail.
5. Post anonymous feed content.
6. Report a feed item.
7. Leave the room.

Expected result: room membership and permissions come from backend state, feed
messages render anonymous aliases only, and report/leave mutations refresh room
queries.

### Scenario C: Poll Flow

1. Open a room and create a positive poll.
2. Invite a participant.
3. Accept or refuse participation.
4. Vote once.
5. Attempt a duplicate vote.
6. Close the poll and view results.
7. Share safe poll results.

Expected result: category and length adapters guide input, backend rule failures
surface clearly, one-vote behavior is preserved, and sharing excludes sensitive
metadata.

## Simulated Session Results

| Flow | Required Tasks | Completed Steps | Completion Rate | Notes |
|------|----------------|-----------------|-----------------|-------|
| Account/visitor | 6 | 6 | 100% | Routes, guards, profile/settings hooks, and state views are implemented. |
| Room | 7 | 7 | 100% | Room list/detail, create/join/leave, feed, and report hooks are implemented. |
| Poll | 7 | 7 | 100% | Poll create/detail, invite, consent, vote, result, and safe-share hooks are implemented. |

## Residual Manual Checks

- Run on a physical iOS or Android device before release for push permission,
  push token registration, and map rendering.
- Confirm Laravel API responses match `contracts/rest-api.md` field names in a
  connected staging environment.
- Re-run this script with participant observation once seeded test accounts and
  room fixtures are available.
