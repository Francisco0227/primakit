import { PRIMAKIT_INVENTORY } from '@/constants/inventory';
import { type CountedItem, evaluateKitCheck } from '@/utils/evaluateKitCheck';

//Stage 3, Ken, tests
const expected = PRIMAKIT_INVENTORY;

function countAll(overrides: Record<string, number> = {}, expired: string[] = []): CountedItem[] {
  return expected.map((item) => ({
    name: item.name,
    foundQty: overrides[item.name] ?? item.expectedQty,
    expiredOrDamaged: expired.includes(item.name),
  }));
}

describe('Kit check (acceptance criteria 4 and 5, TC-02)', () => {
  test('1: a complete kit has no differences and no alert', () => {
    const result = evaluateKitCheck(expected, countAll());
    expect(result.differences).toEqual([]);
    expect(result.status).toBe('COMPLETE');
    expect(result.alertRequired).toBe(false);
  });

  test('2: counting 12 Gasa where 20 are expected records a difference of -8 and an alert', () => {
    const result = evaluateKitCheck(expected, countAll({ Gasa: 12 }));
    expect(result.differences).toEqual([{ itemName: 'Gasa', expected: 20, found: 12, delta: -8 }]);
    expect(result.status).toBe('LOW_STOCK');
    expect(result.alertRequired).toBe(true);
  });

  test('3: all differences are detected in a 17-item check', () => {
    const wrong = { 'Venda del 10': 2, Guantes: 4, Agua: 1 };
    const result = evaluateKitCheck(expected, countAll(wrong));
    expect(result.differences.map((d) => d.itemName).sort()).toEqual(Object.keys(wrong).sort());
    expect(result.differences).toHaveLength(3);
    expect(expected).toHaveLength(17);
  });

  test('4: an expired item that is tracked makes the kit status Caducado', () => {
    const result = evaluateKitCheck(expected, countAll({}, ['Desinfectante']));
    expect(result.expiredItems).toEqual(['Desinfectante']);
    expect(result.status).toBe('EXPIRED');
    expect(result.alertRequired).toBe(true);
  });

  test('5: a negative count is rejected', () => {
    expect(() => evaluateKitCheck(expected, countAll({ Gasa: -1 }))).toThrow('negative');
  });
});