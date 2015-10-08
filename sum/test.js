import assert from 'assert';
import sum from './';

describe('sum(a, b, ...)', () => {

  it('should compute a sum of multiple values', () => {

    assert.equal(99, sum(10, 89));
  });
});
