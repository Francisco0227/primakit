import { validateUse } from '@/utils/validateUse';

describe('validateUse', () => {
  test('una toma válida no tiene errores', () => {
    const errors = validateUse({ quantity: 2, available: 5, reason: 'Caducado', frap: '' });
    expect(errors).toEqual([]);
  });

  test('en un accidente sin folio FRAP marca frap_missing', () => {
    const errors = validateUse({ quantity: 1, available: 5, reason: 'Accidente', frap: '   ' });
    expect(errors).toEqual(['frap_missing']);
  });

  test('pedir más de lo disponible marca too_many', () => {
    const errors = validateUse({ quantity: 6, available: 5, reason: 'Caducado', frap: '' });
    expect(errors).toEqual(['too_many']);
  });

  test('pedir exactamente lo disponible es válido', () => {
    const errors = validateUse({ quantity: 5, available: 5, reason: 'Caducado', frap: '' });
    expect(errors).toEqual([]);
  });

  test.each([0, -1, 1.5])('la cantidad %p marca invalid_quantity', (quantity) => {
    const errors = validateUse({ quantity, available: 5, reason: 'Caducado', frap: '' });
    expect(errors).toEqual(['invalid_quantity']);
  });

  test('reporta cantidad inválida y FRAP faltante al mismo tiempo', () => {
    const errors = validateUse({ quantity: 0, available: 5, reason: 'Accidente', frap: '' });
    expect(errors).toEqual(['invalid_quantity', 'frap_missing']);
  });
});