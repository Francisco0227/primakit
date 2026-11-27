import { validateRestock } from '@/utils/validateRestock';

const today = { year: 2026, month: 11 };

describe('validateRestock', () => {
  test.each(['08/2027', '08 / 2027', '11/2026'])('accepts expiry %p', (expiry) => {
    expect(validateRestock({ quantity: 3, expiry, today })).toEqual([]);
  });

  test('an expiry before this month is expired', () => {
    expect(validateRestock({ quantity: 3, expiry: '10/2026', today })).toEqual(['expired']);
  });

  test.each(['13/2027', '00/2027', 'hola', '', '2027/08'])('rejects malformed expiry %p', (expiry) => {
    expect(validateRestock({ quantity: 3, expiry, today })).toEqual(['invalid_expiry']);
  });

  test.each([0, -2, 2.5])('rejects quantity %p', (quantity) => {
    expect(validateRestock({ quantity, expiry: '08/2027', today })).toEqual(['invalid_quantity']);
  });

  test('reports several errors at once', () => {
    expect(validateRestock({ quantity: 0, expiry: '10/2026', today })).toEqual(['invalid_quantity', 'expired']);
  });
});