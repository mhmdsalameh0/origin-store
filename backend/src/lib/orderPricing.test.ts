import assert from "node:assert/strict";
import test from "node:test";
import { calculateOrderTotals, calculateTaxCents, priceOrderItem, SHIPPING_CENTS } from "./orderPricing.js";

test("prices a known item from the server catalog", () => {
  const item = priceOrderItem({
    productId: "fallback-tb",
    slug: "tb-500",
    dosage: "5 MG",
    quantity: 2,
    clientPriceCents: 4_999
  });

  assert.ok(item);
  assert.equal(item.name, "TB-500 5MG");
  assert.equal(item.lineTotalCents, 9_998);
});

test("rejects client price tampering", () => {
  assert.equal(
    priceOrderItem({
      productId: "fallback-tb",
      slug: "tb-500",
      dosage: "5 MG",
      quantity: 1,
      clientPriceCents: 1
    }),
    null
  );
});

test("accepts the new Retatrutide price and rejects the former price", () => {
  const updatedItem = priceOrderItem({
    productId: "fallback-reta",
    slug: "retatrutide",
    dosage: "10 MG",
    quantity: 1,
    clientPriceCents: 11_999
  });

  assert.ok(updatedItem);
  assert.equal(updatedItem.unitPriceCents, 11_999);
  assert.equal(
    priceOrderItem({
      productId: "fallback-reta",
      slug: "retatrutide",
      dosage: "10 MG",
      quantity: 1,
      clientPriceCents: 11_900
    }),
    null
  );
});

test("calculates the grand total entirely in integer cents", () => {
  const item = priceOrderItem({
    productId: "fallback-reta",
    slug: "retatrutide",
    dosage: "10 MG",
    quantity: 1,
    clientPriceCents: 11_999
  });

  assert.ok(item);
  assert.deepEqual(calculateOrderTotals([item]), {
    subtotalCents: 11_999,
    taxCents: 1_797,
    shippingCents: SHIPPING_CENTS,
    totalCents: 14_295
  });
});

test("rounds 14.975% tax to the nearest cent", () => {
  assert.equal(calculateTaxCents(4_999), 749);
  assert.equal(calculateTaxCents(9_998), 1_497);
});
