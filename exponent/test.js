import assert from 'assert';
import exponent from './';

describe('exponent(power, num)', () => {

  it('should compute an exponent of a value', () => {

    assert.equal(64, exponent(2, 8));
  });
});
