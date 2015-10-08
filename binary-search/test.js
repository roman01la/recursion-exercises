import assert from 'assert';
import binarySearch from './';

// Binary search algorithm https://en.wikipedia.org/wiki/Binary_search_algorithm#Example

describe('binarySearch(target_num, [num1, num2, ...]])', () => {

  it('should find a number in a sorted sequence of numbers', () => {

    assert.equal(4, binarySearch(4, [6, 4, 0, 11, 3, 7, 9].sort((a, b) => a > b)));
  });
});
