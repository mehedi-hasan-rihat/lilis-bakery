export const DELIVERY_FEE = 1400;

export function formatPrice(amount: number): string {
  return `৳${Math.round(amount).toLocaleString("en-US")}`;
}
