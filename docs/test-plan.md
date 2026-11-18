# Test plan — Demo store checkout

## Objective
Make sure a customer can sign in, build a cart and pay, with correct totals and clear errors.

## Scope
| In scope | Out of scope |
|---|---|
| Login and access control | Payment provider integration (the demo has none) |
| Product list and sorting | Performance and load |
| Cart: add, remove, contents | Visual design review |
| Checkout: form validation, totals, confirmation | |

## Approach
Risk-based. The flows that touch money and access come first:

| Risk | Impact | Covered by |
|---|---|---|
| Wrong item total at checkout | High | `checkout.spec.ts` — total equals sum of prices |
| Anonymous access to private pages | High | `login.spec.ts` — direct URL is blocked |
| Purchase cannot be completed | High | `checkout.spec.ts` — end-to-end purchase |
| Cart shows wrong products | Medium | `cart.spec.ts` |
| Sorting is wrong | Low | `sorting.spec.ts` |

## Environments
Desktop Chrome, desktop Firefox and a mobile viewport (Pixel 7), run in GitHub Actions on every push and pull request.

## Entry and exit criteria
- **Entry:** the demo site is reachable and test users are available.
- **Exit:** all tests green on the three browser projects; any failure has a bug report.
