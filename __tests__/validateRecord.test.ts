import { PRIMAKIT_INVENTORY } from '@/constants/inventory';
import { validateBatch, validateRecord } from '@/utils/validateRecord';

const context = {
  knownItems: PRIMAKIT_INVENTORY.map((item) => item.name),
  now: Date.parse('2026-11-27T12:00:00Z'),
};

function record(overrides: Record<string, unknown> = {}) {
  return { id: 'rec-1', type: 'uso', kitId: 'B01', itemName: 'Gasa', quantity: 2, createdAt: '2026-11-27T10:00:00Z', ...overrides };
}

describe('validateRecord', () => {
  test('a well-formed record has no errors', () => {
    expect(validateRecord(record(), context)).toEqual([]);
  });

  test('a note with quotes and SQL is kept as plain text, not rejected', () => {
    expect(validateRecord(record({ note: `'; DROP TABLE kits; -- "hola"` }), context)).toEqual([]);
  });

  test.each([
    ['a negative quantity', { quantity: -3 }, 'invalid_quantity'],
    ['text where a number goes', { quantity: '5' }, 'invalid_quantity'],
    ['a quantity above the maximum', { quantity: 101 }, 'invalid_quantity'],
    ['a supply that is not in the catalog', { itemName: 'Bisturí' }, 'unknown_item'],
    ['an unknown record type', { type: 'borrar' }, 'invalid_type'],
    ['an empty id', { id: '' }, 'invalid_id'],
    ['an empty kit', { kitId: '' }, 'invalid_kit'],
    ['a date that cannot be read', { createdAt: 'ayer' }, 'invalid_date'],
    ['a date in the future', { createdAt: '2026-12-01T00:00:00Z' }, 'future_date'],
    ['a note that is too long', { note: 'a'.repeat(501) }, 'invalid_note'],
    ['an extra field such as a role', { role: 'administrador' }, 'unknown_field'],
  ])('rejects %s', (_label, overrides, error) => {
    expect(validateRecord(record(overrides), context)).toEqual([error]);
  });

  test.each([null, 'texto', 42, [record()]])('rejects %p because it is not a record object', (raw) => {
    expect(validateRecord(raw, context)).toEqual(['not_an_object']);
  });
});

describe('validateBatch', () => {
  test('the same record sent twice is flagged as a duplicate', () => {
    expect(validateBatch([record(), record()], context)).toEqual([[], ['duplicate_id']]);
  });

  test('each record keeps its own errors', () => {
    expect(validateBatch([record(), record({ id: 'rec-2', quantity: 0 })], context)).toEqual([[], ['invalid_quantity']]);
  });
});