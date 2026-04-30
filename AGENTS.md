<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read
specs/001-confessabr-social-mvp/plan.md
<!-- SPECKIT END -->

## ConfessaBR Implementation Notes

- Current feature: `specs/001-confessabr-social-mvp`.
- Task list and phase status: `specs/001-confessabr-social-mvp/tasks.md`.
- Manual verification and constitution checks:
  `specs/001-confessabr-social-mvp/quickstart.md`.
- Post-implementation usability script/results:
  `specs/001-confessabr-social-mvp/usability-test.md`.

## Commands

```bash
npm install
npx tsc --noEmit
npm run lint
npm run start
```

## Guardrails

- Keep API calls inside `services/`; screens and reusable components consume
  hooks or feature modules.
- Use NativeWind classes for UI styling and avoid manual `StyleSheet`.
- Store auth tokens only via `utils/secure-token.ts`.
- Keep radar privacy at neighborhood/region granularity only.
- Keep notifications and shared payloads free of sender identity, exact
  location, payment internals, and private moderation metadata.
