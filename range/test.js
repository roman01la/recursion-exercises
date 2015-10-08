import assert from 'assert';
import equal from 'deep-equal';
import range from './';

describe('range(from, to)', () => {

  it('should produce a sequence of numbers from 3 to 9 with exclusive bounds', () => {

    assert.ok(equal([4, 5, 6, 7, 8], range(3, 9)));
  });
});
