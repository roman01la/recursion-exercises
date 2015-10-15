import assert from 'assert';
import binarySearch from './';

// Binary search algorithm https://en.wikipedia.org/wiki/Binary_search_algorithm#Example

describe('binarySearch(target_num, [num1, num2, ...]])', () => {

  it('should find position of the number in a sorted sequence of numbers', () => {

    assert.equal(2, binarySearch(4, [0, 3, 4, 6, 7, 9, 11]));
  });
});
