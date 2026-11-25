import {sumar} from '@/utils/sumar';

describe ('sumar', () => {
  test('2 + 3 da 5', ()=> {
    expect(sumar(2,3)).toBe(5);
  });

  test('funciona con negativos', ()=> {expect(sumar(-2,2)).toBe(0);
  });
})