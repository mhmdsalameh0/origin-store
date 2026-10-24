export const CHECKOUT_TAX_RATE_LABEL = "14.975%";
const CHECKOUT_TAX_RATE_PARTS_PER_100_000 = 14_975;
export const CHECKOUT_SHIPPING_CENTS = 499;

export function checkoutTaxCents(subtotalCents: number) {
  return Math.floor((subtotalCents * CHECKOUT_TAX_RATE_PARTS_PER_100_000 + 50_000) / 100_000);
}

export function checkoutTotalCents(subtotalCents: number) {
  return subtotalCents + checkoutTaxCents(subtotalCents) + CHECKOUT_SHIPPING_CENTS;
}
