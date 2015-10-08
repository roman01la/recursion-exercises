import assert from 'assert';
import factorial from './';

describe('factorial(n)', () => {

  it('should compute factorial of 5', () => {

    assert.equal(120, factorial(5));
  });
});
