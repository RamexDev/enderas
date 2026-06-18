# Backend Test Suite

Single runner (Vitest) with shared environment and database lifecycle.

## Structure

```
tests/
├── setup.js                 # Env vars (runs before every file)
├── globalTeardown.js        # Closes Sequelize once after all tests
├── helpers/
│   ├── db.js                # setupTestDb() — shared in-memory SQLite
│   ├── http.js              # Mock req/res/next + expectServiceError()
│   ├── validation.js        # Run express-validator rules in isolation
│   └── validationApp.js     # Mini Express app for middleware contract tests
├── unit/                    # Pure utility tests (no DB)
├── contract/                # Service ↔ controller ↔ validation contracts
└── integration/             # Full HTTP flows via Supertest
```

## Commands

```bash
npm test           # Run all tests once
npm run test:watch # Watch mode
```

## Test layers

| Layer | Purpose | Examples |
| ----- | ------- | -------- |
| **Unit** | Utils in isolation, edge cases, failure modes | JWT sign/verify, pickFields pollution, password strength |
| **Contract** | Layer boundaries stay aligned | Service throws `{ statusCode }` → controller returns matching HTTP status |
| **Integration** | Real requests through Express + DB | Auth flow, utilities inside service creation, contact form |

## Database lifecycle

- All DB-backed tests share one in-memory SQLite connection.
- `setupTestDb()` calls `sync({ force: true })` to reset schema + data per file.
- Connection closes once in `globalTeardown.js` — never mid-suite.
- `fileParallelism: false` + `singleFork: true` prevent parallel DB access.

## Adding tests

1. **New utility** → add `tests/unit/<name>.test.js` with happy path + failure modes.
2. **New service error** → add contract test asserting `{ message, statusCode }` and controller HTTP mapping.
3. **New endpoint** → add integration test via Supertest.
