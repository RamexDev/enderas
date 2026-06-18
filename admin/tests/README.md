# Admin CMS — Test Suite

Automated tests for the Enderas Admin CMS using **Vitest** and **React Testing Library**.

## Quick start

```bash
cd admin
npm test              # run all tests once
npm run test:watch    # watch mode during development
npm run test:coverage # generate coverage report
```

## Test layout

```
tests/
├── setup.js                          # Global matchers, storage polyfill, env stubs
├── unit/
│   ├── utils/                          # Pure utility functions
│   │   ├── helpers.test.js             # mediaUrl, slugify, formatDate, …
│   │   ├── errors.test.js              # ApiError, getErrorMessage
│   │   └── cn.test.js                  # Tailwind class merging
│   ├── hooks/
│   │   ├── useFormState.test.js        # recordToForm mapper
│   │   ├── useCrudList.test.jsx        # CRUD modal/save/delete/toggle logic
│   │   └── useAsyncData.test.jsx       # Fetch-on-mount hook
│   ├── constants/
│   │   ├── roles.test.js               # isSuperAdmin helper
│   │   └── navigation.test.js        # Role-based nav filtering
│   ├── services/
│   │   └── api.tokens.test.js          # JWT token storage (local/session)
│   ├── components/
│   │   ├── TableActions.test.jsx       # Row action buttons
│   │   └── StatCard.test.jsx           # Dashboard stat card
│   └── routes/
│       └── ProtectedRoute.test.jsx     # Auth + role guards
└── integration/
    └── LoginPage.test.jsx              # Login form, validation, navigation
```

## What is covered

| Layer | What's tested | Why it matters |
|-------|---------------|----------------|
| **Utils** | Media URL resolution, slugs, dates, errors | Shared logic used everywhere |
| **Hooks** | `useCrudList`, `useAsyncData`, `recordToForm` | Core CMS data patterns |
| **Auth storage** | Remember-me token persistence | Login/session reliability |
| **Navigation** | Editor vs super-admin menu visibility | Role-based access control |
| **Routes** | `ProtectedRoute` redirects | Security boundaries |
| **Components** | Table actions, stat cards | Reusable UI behavior |
| **Integration** | Login page flow | End-user authentication UX |

## Writing new tests

### Unit test (pure function)

```js
// tests/unit/utils/myHelper.test.js
import { describe, expect, it } from 'vitest'
import { myHelper } from '@/utils/myHelper'

describe('myHelper', () => {
  it('does the expected thing', () => {
    expect(myHelper('input')).toBe('output')
  })
})
```

### Hook test

```js
import { renderHook, act } from '@testing-library/react'
import { useMyHook } from '@/hooks/useMyHook'

it('updates state', () => {
  const { result } = renderHook(() => useMyHook())
  act(() => result.current.doSomething())
  expect(result.current.value).toBe(true)
})
```

### Component test

```js
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MyComponent from '@/components/MyComponent'

it('handles click', async () => {
  const user = userEvent.setup()
  const onClick = vi.fn()
  render(<MyComponent onClick={onClick} />)
  await user.click(screen.getByRole('button'))
  expect(onClick).toHaveBeenCalled()
})
```

### Mocking conventions

- **Zustand stores** — `vi.mock('@/store/useAuthStore')` and return selector results
- **Sonner toasts** — `vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))`
- **React Router** — wrap components in `<MemoryRouter>`; mock `useNavigate` when needed
- **API calls** — mock at the `cmsApi` level, not Axios directly

## Coverage

Coverage reports are written to `coverage/` when you run:

```bash
npm run test:coverage
```

Open `coverage/index.html` in a browser for the detailed report.

Priority areas for additional coverage:

- `usePaginatedList` hook
- `useRecordEditor` hook
- Remaining page components (Services, Gallery, Posts)
- Axios interceptor refresh flow (requires `msw` or mock server)

## CI integration

Add to your pipeline:

```yaml
- name: Admin tests
  run: |
    cd admin
    npm ci
    npm test
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `localStorage is not available` | Handled by `tests/setup.js` memory storage polyfill |
| Label not found in component tests | Ensure `FormField` wires `htmlFor` / `id` (already fixed) |
| Zod validation not firing in login test | Form uses `noValidate` so RHF + Zod handle validation |
