import assert from 'assert';
import factorial from './';

// Factorial https://en.wikipedia.org/wiki/Factorial

describe('factorial(n)', () => {

  it('should compute factorial of 5', () => {

    assert.equal(120, factorial(5));
  });
});
