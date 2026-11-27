/** Errors that make a "Tomar insumos" (M5) record invalid. */
export type UseError = 'invalid_quantity' | 'too_many' | 'frap_missing';

export interface UseInput {
  quantity: number;
  available: number;
  reason: string;
  frap: string;
}

/** Pure check of a supply withdrawal. An empty list means the withdrawal is valid. */
export function validateUse(input: UseInput): UseError[] {
  const errors: UseError[] = [];
  if (!Number.isInteger(input.quantity) || input.quantity < 1) {
    errors.push('invalid_quantity');
  } else if (input.quantity > input.available) {
    errors.push('too_many');
  }
  if (input.reason === 'Accidente' && input.frap.trim() === '') {
    errors.push('frap_missing');
  }
  return errors;
}