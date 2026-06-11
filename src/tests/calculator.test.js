const { add, sub, mul, div } = require('../calculator');

describe('Calculator basic operations', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(sub(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(mul(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(div(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => div(10, 0)).toThrow('division by zero');
  });

  test('floating point operations', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3, 5);
    expect(div(1, 3)).toBeCloseTo(0.3333333, 5);
  });

  test('negative numbers', () => {
    expect(sub(-5, -3)).toBe(-2);
    expect(mul(-4, 2)).toBe(-8);
  });
});
