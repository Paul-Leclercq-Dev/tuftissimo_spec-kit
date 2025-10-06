// apps/api/src/orders/compute-totals.ts
export interface Totals {
  subtotalCents: number;
  taxCents: number;
  shippingCents: number;
  totalCents: number;
  vatRatePercent: number;
}

export function computeTotals(
  unitPriceCents: number,
  quantity: number,
  country: 'ES' | 'FR',
  vatRatePercent = 21
): Totals {
  const subtotalCents = Math.round(unitPriceCents * quantity);
  const taxCents = Math.round((subtotalCents * vatRatePercent) / 100);
  const shippingCents = country === 'ES' ? 500 : 1000;
  const totalCents = subtotalCents + taxCents + shippingCents;

  return { subtotalCents, taxCents, shippingCents, totalCents, vatRatePercent };
}
