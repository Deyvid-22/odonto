/**
 *
 * @param {string} amount  - valor em reais (BRL) para ser convertido em centavos
 * @returns {number} priceInCents - valor convertido em centavos
 * @example
 * convertRealToCents('1.300,50'): // 1000 Retorna: 123456
 */

export function convertRealToCents(amount: string) {
  const numericPrice = parseFloat(amount.replace(/\./g, "").replace(",", "."));
  const priceInCents = Math.round(numericPrice * 100);
  return priceInCents;
}
