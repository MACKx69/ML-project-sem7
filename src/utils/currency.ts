/**
 * Indian currency formatter according to Indian numbering system (Lakh / Crore)
 * e.g. ₹5,56,000, ₹1,05,480, ₹12,50,000, ₹3,95,00,000
 */
export function formatIndianCurrency(amount: number): string {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  const rounded = Math.round(amount);
  const isNegative = rounded < 0;
  const absStr = Math.abs(rounded).toString();

  if (absStr.length <= 3) {
    return (isNegative ? '-₹' : '₹') + absStr;
  }

  // The last 3 digits
  const lastThree = absStr.substring(absStr.length - 3);
  // All remaining digits to the left
  const otherDigits = absStr.substring(0, absStr.length - 3);
  // Group pairs of 2 digits
  const formattedOther = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');

  return (isNegative ? '-₹' : '₹') + formattedOther + ',' + lastThree;
}

/**
 * Format numbers with Indian comma grouping without currency symbol
 */
export function formatIndianNumber(num: number): string {
  if (num === null || num === undefined || isNaN(num)) return '0';
  const rounded = Math.round(num);
  const isNegative = rounded < 0;
  const absStr = Math.abs(rounded).toString();

  if (absStr.length <= 3) {
    return (isNegative ? '-' : '') + absStr;
  }

  const lastThree = absStr.substring(absStr.length - 3);
  const otherDigits = absStr.substring(0, absStr.length - 3);
  const formattedOther = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');

  return (isNegative ? '-' : '') + formattedOther + ',' + lastThree;
}

/**
 * Compact Indian Lakh/Crore representation for badges/subtitles
 */
export function formatLakhCrore(amount: number): string {
  const val = Math.round(amount);
  if (val >= 10000000) {
    return `₹${(val / 10000000).toFixed(2)} Cr`;
  }
  if (val >= 100000) {
    return `₹${(val / 100000).toFixed(2)} Lakh`;
  }
  return formatIndianCurrency(val);
}
