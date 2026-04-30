# Security Specification for LAM-3D Marketplace

## Data Invariants
1. Products: Publicly readable. Only Admins can CUD. Titles must be < 100 chars, descriptions < 5000.
2. Orders: Publicly createable (guest checkout). Read access restricted to the email used during checkout or Admin. Immutable after creation.
3. Stats: Publicly readable. Admin-only update.

## The Dirty Dozen Payloads (Targeting Rejection)

1. **Identity Spoofing**: Guest trying to POST a new product.
   - `collection`: `products`
   - `payload`: `{ "title": "Hacked Asset", "price": 0.01, ... }`
   - `expected`: `PERMISSION_DENIED`

2. **Privilege Escalation**: Non-admin trying to DELETE an asset.
   - `path`: `/products/some-asset-id`
   - `expected`: `PERMISSION_DENIED`

3. **Field Poisoning**: Updating a product with a 10MB string.
   - `collection`: `products`
   - `payload`: `{ "description": "A".repeat(10 * 1024 * 1024) }`
   - `expected`: `PERMISSION_DENIED` (size check)

4. **Schema Violation**: Creating a product with negative price.
   - `collection`: `products`
   - `payload`: `{ "price": -100 }`
   - `expected`: `PERMISSION_DENIED`

5. **Resource Poisoning**: Using a 2KB string as a product ID.
   - `id`: "A".repeat(2000)
   - `expected`: `PERMISSION_DENIED` (id size check)

6. **Order Theft**: Attempting to read an order with a different email.
   - `path`: `/orders/confidential-order-id` (belongs to user A)
   - `reader`: user B
   - `expected`: `PERMISSION_DENIED`

7. **Order Mutation**: Attempting to change the price of a completed order.
   - `path`: `/orders/order-123`
   - `payload`: `{ "total": 0 }`
   - `expected`: `PERMISSION_DENIED`

8. **Stats Tampering**: Guest trying to reset stats.
   - `path`: `/stats/global`
   - `payload`: `{ "buys": 0 }`
   - `expected`: `PERMISSION_DENIED`

9. **Invalid Category**: Creating a product with category "Exploits".
   - `collection`: `products`
   - `payload`: `{ "category": "Exploits" }`
   - `expected`: `PERMISSION_DENIED`

10. **Identity Integrity**: Forging `creator` field in an order.
    - `collection`: `orders`
    - `payload`: `{ "customerEmail": "victim@example.com" }` (but sender is attacker)
    - `expected`: `PERMISSION_DENIED` (if we used auth, but this is guest checkout - so we'll restrict read instead)

11. **Timestamp Forgery**: Manually setting `createdAt` to 2000-01-01.
    - `collection`: `products`
    - `payload`: `{ "createdAt": "2000-01-01T00:00:00Z" }`
    - `expected`: `PERMISSION_DENIED` (must be `request.time`)

12. **Status Shortcutting**: Setting order status to `completed` directly on a pending gate.
    - `path`: `/orders/new-order`
    - `payload`: `{ "status": "completed" }` (when logic expects pending first)
    - `expected`: `PERMISSION_DENIED`
