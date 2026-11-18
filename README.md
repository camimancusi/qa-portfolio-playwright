# QA portfolio — Playwright end-to-end suite

![e2e](../../actions/workflows/e2e.yml/badge.svg)

An end-to-end test suite I wrote to show how I automate: readable tests, page objects, seeded state instead of repeated logins, and no hard waits. It runs against [Sauce Demo](https://www.saucedemo.com), a public practice store, so anyone can run it.

**Author:** Camila Mancusi — Project Manager & QA · [LinkedIn](https://linkedin.com/in/camilamancusi)

## What it covers

| Area | Tests | What they protect |
|---|---|---|
| Login | 5 | Valid sign-in, wrong password, locked-out user, required fields, blocked anonymous access |
| Cart | 3 | Badge count, removing items, cart contents |
| Checkout | 3 | Full purchase, item total equals sum of prices, required fields |
| Sorting | 3 | Price ascending and descending, name Z to A |

14 tests × 3 browser projects (Chrome, Firefox, mobile) = 42 runs on every push.

## How it is built

```
tests/web/        specs, one behavior per test, named as sentences
pages/            page objects: locators and actions live here, assertions stay in the tests
fixtures/test.ts  custom fixtures, including a signed-in state seeded through the session cookie
docs/             test plan and bug report template
.github/          CI: runs on push, pull request and weekly, uploads the HTML report
```

Conventions I follow:
- **User-facing locators first** (`getByRole`, `getByPlaceholder`), `data-test` ids only when nothing visible is stable.
- **No `waitForTimeout`.** Web-first assertions wait for the condition that matters.
- **Independent tests.** Each one sets up its own state, so they run in parallel and in any order.
- **Tests that can fail.** Every test asserts a user-visible outcome that a real bug would break.

## Run it

```bash
npm ci
npx playwright install
npm test            # all browsers
npm run test:ui     # interactive mode
npm run report      # open the HTML report
```

Copy `.env.example` to `.env` to point the suite at another environment.
