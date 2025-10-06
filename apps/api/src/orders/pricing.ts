export const MATERIAL_FACTOR: Record<string, number> = {
  COTTON_A: 1.0,
  COTTON_B: 1.1,
  WOOL_A: 1.25,
};

export const SIZE_FACTOR: Record<string, number> = {
  S: 1.0,
  M: 1.3,
  L: 1.6,
};

export const BACKING_ADD_CTS: Record<string, number> = {
  ADHESIVE: 300, // +3€ pour backing adhésif
  NON_ADHESIVE: 0,
};

/**
 * Calcule le prix unitaire HT d'un produit avec ses options
 */
export function calculateUnitPrice(
  basePriceCents: number,
  material: string,
  size: string,
  backing: string
): number {
  const materialFactor = MATERIAL_FACTOR[material] || 1.0;
  const sizeFactor = SIZE_FACTOR[size] || 1.0;
  const backingAdd = BACKING_ADD_CTS[backing] || 0;
  
  return Math.round(basePriceCents * materialFactor * sizeFactor + backingAdd);
}
