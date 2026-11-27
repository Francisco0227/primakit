/** Errors that make a restock (M6) invalid. */
export type RestockError = 'invalid_quantity' | 'invalid_expiry' | 'expired';

export interface RestockInput {
  quantity: number;
  /** Typed by the user as "MM/AAAA"; spaces around the slash are allowed. */
  expiry: string;
  /** Injected so the function stays pure. `month` goes from 1 to 12. */
  today: { year: number; month: number };
}

const EXPIRY_PATTERN = /^(\d{2})\s*\/\s*(\d{4})$/;

/** Pure check of a restock. An empty list means the restock is valid. */
export function validateRestock({ quantity, expiry, today }: RestockInput): RestockError[] {
  const errors: RestockError[] = [];
  if (!Number.isInteger(quantity) || quantity < 1) {
    errors.push('invalid_quantity');
  }
  const match = EXPIRY_PATTERN.exec(expiry.trim());
  const month = match ? Number(match[1]) : 0;
  const year = match ? Number(match[2]) : 0;
  if (!match || month < 1 || month > 12) {
    errors.push('invalid_expiry');
  } else if (year < today.year || (year === today.year && month < today.month)) {
    errors.push('expired');
  }
  return errors;
}