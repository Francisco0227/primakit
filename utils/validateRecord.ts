import { DEFAULT_MAX_COUNT } from '@/utils/evaluateKitCheck';

/** Reasons a record coming from a phone's sync batch is rejected (R4). */
export type RecordError =
  | 'not_an_object'
  | 'unknown_field'
  | 'invalid_id'
  | 'invalid_type'
  | 'invalid_kit'
  | 'unknown_item'
  | 'invalid_quantity'
  | 'invalid_date'
  | 'future_date'
  | 'invalid_note'
  | 'duplicate_id';

export interface RecordContext {
  /** Supply names that exist in the catalog. */
  knownItems: string[];
  /** Current time in milliseconds, injected so the function stays pure. */
  now: number;
}

const ALLOWED_FIELDS = ['id', 'type', 'kitId', 'itemName', 'quantity', 'createdAt', 'note'];
export const MAX_NOTE_LENGTH = 500;
/** Phone clocks drift; allow a few minutes before calling a date "future". */
const CLOCK_SKEW_MS = 5 * 60 * 1000;

/** Pure check of one untrusted record. An empty list means the record is valid. */
export function validateRecord(raw: unknown, { knownItems, now }: RecordContext): RecordError[] {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
    return ['not_an_object'];
  }
  const record = raw as Record<string, unknown>;
  const errors: RecordError[] = [];
  if (Object.keys(record).some((key) => !ALLOWED_FIELDS.includes(key))) {
    errors.push('unknown_field');
  }
  if (typeof record.id !== 'string' || record.id.trim() === '') {
    errors.push('invalid_id');
  }
  if (record.type !== 'uso' && record.type !== 'reposicion') {
    errors.push('invalid_type');
  }
  if (typeof record.kitId !== 'string' || record.kitId.trim() === '') {
    errors.push('invalid_kit');
  }
  if (typeof record.itemName !== 'string' || !knownItems.includes(record.itemName)) {
    errors.push('unknown_item');
  }
  const { quantity } = record;
  if (typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 1 || quantity > DEFAULT_MAX_COUNT) {
    errors.push('invalid_quantity');
  }
  const time = typeof record.createdAt === 'string' ? Date.parse(record.createdAt) : NaN;
  if (Number.isNaN(time)) {
    errors.push('invalid_date');
  } else if (time > now + CLOCK_SKEW_MS) {
    errors.push('future_date');
  }
  if (record.note !== undefined && (typeof record.note !== 'string' || record.note.length > MAX_NOTE_LENGTH)) {
    errors.push('invalid_note');
  }
  return errors;
}

/** Validates a sync batch. A repeated id is rejected so a retry can never apply the same record twice. */
export function validateBatch(records: unknown[], context: RecordContext): RecordError[][] {
  const seen = new Set<string>();
  return records.map((raw) => {
    const errors = validateRecord(raw, context);
    const id = (raw as { id?: unknown } | null)?.id;
    if (typeof id === 'string') {
      if (seen.has(id)) {
        errors.push('duplicate_id');
      }
      seen.add(id);
    }
    return errors;
  });
}