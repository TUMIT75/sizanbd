/**
 * Format a number into Bangladeshi currency style with the ৳ symbol.
 * Example: 124999 -> ৳1,24,999
 * Example: 1500 -> ৳1,500
 * Example: 2500000 -> ৳25,00,000
 */
export function formatBDT(amount: number): string {
  if (isNaN(amount)) return '৳0';
  const isNegative = amount < 0;
  const absAmount = Math.abs(Math.round(amount));
  const numStr = absAmount.toString();

  if (numStr.length <= 3) {
    return `${isNegative ? '-' : ''}৳${numStr}`;
  }

  // Last 3 digits
  const lastThree = numStr.substring(numStr.length - 3);
  // Remaining digits grouped by 2 from right to left
  const otherDigits = numStr.substring(0, numStr.length - 3);
  const formattedOthers = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',');

  return `${isNegative ? '-' : ''}৳${formattedOthers},${lastThree}`;
}

/**
 * Calculate estimated monthly EMI (e.g. for 6, 9, 12 months 0% or low-interest)
 */
export function calculateEMI(price: number, months: number = 12): string {
  const monthly = Math.ceil(price / months);
  return formatBDT(monthly);
}

/**
 * Generate human-readable order tracking ID like SZ-2026-48921
 */
export function generateOrderId(): string {
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  return `SZ-2026-${randomSuffix}`;
}

/**
 * Validate 11-digit Bangladeshi mobile number:
 * Must start with 01 and have 11 digits total (e.g. 017xxxxxxxx, 018xxxxxxxx, 019xxxxxxxx, 013xxxxxxxx, 014xxxxxxxx, 015xxxxxxxx, 016xxxxxxxx)
 */
export function isValidBDPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s-]/g, '');
  const bdRegex = /^01[3-9]\d{8}$/;
  return bdRegex.test(cleaned);
}
