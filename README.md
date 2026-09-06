
# Food Delivery Web App — Backend & Stripe Payment API

A full-stack food ordering application with a customer storefront, an admin panel and a Node/Express
API, extended with an AI chatbot. This repository is the continuation of an earlier coursework
project, rebuilt for a deployable demo.

> **My role:** I implemented the **payment side of the backend** — order placement, the Stripe
> Checkout integration and payment verification — and the **admin panel**, and I tested the payment
> endpoints manually with **Thunder Client**. The rest of the API is documented below for context.
> The AI chatbot is the feature I am adding next.

---

## Stack

| Layer      | Technology                                |
| ---------- | ----------------------------------------- |
| Runtime    | Node.js, Express 5 (ES modules)           |
| Database   | MongoDB via Mongoose 8                    |
| Auth       | JSON Web Tokens + bcrypt password hashing |
| Payments   | Stripe Checkout (`stripe` v18)          |
| Uploads    | Multer, served statically from`/images` |
| Validation | `validator`                             |
| Dev        | nodemon, dotenv, CORS                     |

Frontend and admin are separate applications in `frontend/` and `admin/`.

## API surface

The server listens on port **4000** and mounts four routers:

| Base path      | Responsibility                                             |
| -------------- | ---------------------------------------------------------- |
| `/api/food`  | Food catalogue — list, create (with image upload), remove |
| `/api/user`  | Registration, login, token issue                           |
| `/api/cart`  | Add / remove / fetch cart contents                         |
| `/api/order` | Order placement and payment verification                   |

`GET /` returns `API Working` as a health check. Uploaded images are served from `/images`.

### Order and payment endpoints — the part I implemented

| Method   | Path                  | Auth         | Handler         |
| -------- | --------------------- | ------------ | --------------- |
| `POST` | `/api/order/place`  | JWT required | `placeOrder`  |
| `POST` | `/api/order/verify` | none         | `verifyOrder` |

**Payment flow**

1. `placeOrder` persists the order, builds Stripe line items from the cart, appends a delivery
   charge, and creates a Stripe Checkout session in `payment` mode.
2. The API returns the hosted `session_url`; the client redirects the user to Stripe.
3. Stripe redirects back to a success or cancel URL carrying the order ID.
4. `verifyOrder` reads the `success` flag: on success the order is updated with `payment: true`;
   otherwise the order document is removed.

## Running locally

```bash
cd backend
npm install
npm run server          # nodemon server.js → http://localhost:4000
```

`.env` requires:

```
MONGO_URI=<mongodb connection string>
JWT_SECRET=<secret>
STRIPE_SECRET_KEY=<sk_test_...>
```

Use Stripe **test mode** keys only. Card `4242 4242 4242 4242` with any future expiry clears; the
Stripe docs list the numbers that force specific decline reasons.

---

## API testing — Stripe payment flow

The payment endpoints were exercised manually in **Thunder Client** against a local server and a
Stripe test account, rather than only through the UI, so that error paths could be triggered
directly.

<!-- VERIFY: keep only the rows you actually executed, and fill in the real observed results.
     Delete any row you did not run. A reviewer may ask you to walk through any line here. -->

| # | Case                           | Request                                                                    | Expected                                           |
| - | ------------------------------ | -------------------------------------------------------------------------- | -------------------------------------------------- |
| 1 | Place order, happy path        | `POST /api/order/place` with valid token and a non-empty cart            | `200`, response carries a Stripe `session_url` |
| 2 | Place order without token      | same body,`token` header omitted                                         | `401` / "Not authorized", no order created       |
| 3 | Place order with invalid token | `token` set to a malformed string                                        | rejected, no order created                         |
| 4 | Place order with empty cart    | valid token,`items: []`                                                  | rejected, no Stripe session created                |
| 5 | Verify — payment succeeded    | `POST /api/order/verify` with a real `orderId` and `success: "true"` | order updated to`payment: true`                  |
| 6 | Verify — payment cancelled    | same`orderId`, `success: "false"`                                      | order removed                                      |
| 7 | Verify — unknown order ID     | a well-formed but non-existent ID                                          | handled without a 500                              |
| 8 | Verify — malformed order ID   | a string that is not a valid ObjectId                                      | handled without a 500                              |
| 9 | Card declined at Stripe        | Stripe test card`4000 0000 0000 0002`                                    | order not marked paid                              |

Each case was checked at three levels: the HTTP status and body returned, the state of the order
document in MongoDB afterwards, and the session status in the Stripe test dashboard — a `200`
response alone does not prove the order reached the right state.

## Known issues

<!-- VERIFY EACH ONE IN THUNDER CLIENT BEFORE PUBLISHING. These are code-reading observations,
     not confirmed test results. Reproduce a point yourself, then keep it; delete what you have
     not reproduced. Do not present anything here as a finding you made until you have made it. -->

- `POST /api/order/verify` carries no `authMiddleware`, while `/place` does. If the endpoint can be
  called directly with an order ID, payment state can be changed without an authenticated session.
- On a cancelled payment, `verifyOrder` deletes the order document. A failed payment leaves no
  record, so there is no audit trail of attempted orders.
- Payment confirmation is driven by the browser redirect rather than by the Stripe
  `checkout.session.completed` webhook. If the customer closes the tab after paying, the redirect
  never fires and the order stays unpaid despite a successful charge.
- Currency handling in `placeOrder` is inconsistent between the cart line items and the delivery
  charge line item.
- `.DS_Store` is committed, and `package-lock.json` sits at the repository root with no
  corresponding root `package.json`.

## Status and roadmap

Active development. Planned next:

- **AI chatbot** for menu search and order assistance.
- **Structural refactor** — revisiting the layering between routes, controllers and models, and
  closing the payment-flow issues listed above.
- **Committed API test collection** — exporting the Thunder Client requests into `thunder-tests/`
  so the payment cases in this README can be re-run by anyone who clones the repository.
- Deployment configuration for a public demo.
