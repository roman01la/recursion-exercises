import assert from 'assert';
import gcd from './';

describe('gcd(num1, num2, ...)', () => {

  it('should compute greatest common divisor of 20, 155 and 30', () => {

    assert.equal(5, gcd(20, 155, 30));
  });
});
