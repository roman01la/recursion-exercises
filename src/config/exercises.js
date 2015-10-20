export default [

  {
    description: {
      title: 'Sum',
      text: 'Find the sum of a sequence of numbers recursively.'
    },
    test: 'assert.equal(sum(10, 89, 4), 103);',
    id: 'sum'
  },
  {
    description: {
      title: 'Exponentiation',
      text: 'Find the result of 8<sup>2</sup> recursively.'
    },
    test: 'assert.equal(exponent(2, 8), 64);',
    id: 'exponent'
  },
  {
    description: {
      title: 'Factorial',
      text: 'The factorial of a non-negative integer n is the product of all positive integers less than or equal to n. Find 5! recursively.'
    },
    test: 'assert.equal(factorial(5), 120);',
    id: 'factorial'
  },
  {
    description: {
      title: 'Fibonacci sequence',
      text: 'The first two numbers in the Fibonacci sequence are 0 and 1 and each subsequent number is the sum of the previous two. Produce the sequence recursively.'
    },
    test: 'assert.equal(fibonacci(5), [0, 1, 1, 2, 3]);',
    id: 'fibonacci'
  },
  {
    description: {
      title: 'Range sequence',
      text: 'Recursively produce a sequence of numbers from 3 to 9 with exclusive bounds.'
    },
    test: 'assert.equal(range(3, 9), [4, 5, 6, 7, 8]);',
    id: 'range'
  },
  {
    description: {
      title: 'Greatest common divisor',
      text: 'The greatest common divisor (gcd) of two or more integers, when at least one of them is not zero, is the largest positive integer that divides the numbers without a remainder. Recursively find the greatest common divisor of a sequnce of values.'
    },
    test: 'assert.equal(gcd(20, 155, 30), 5);',
    id: 'gcd'
  },
  {
    description: {
      title: 'Binary search',
      text: 'A binary search search algorithm finds the position of a target value within a sorted array. Here\'s the algorithm:\n<pre><code>Sorted array: L = [1, 3, 4, 6, 8, 9, 11]\nTarget value: X = 4\nCompare X to 6. X is smaller. Repeat with L = [1, 3, 4].\nCompare X to 3. X is larger. Repeat with L = [4].\nCompare X to 4. X equals 4, so the position is returned.</code></pre>'
    },
    test: 'assert.equal(binarySearch(4, [0, 3, 4, 6, 7, 9, 11]), 2);',
    id: 'binarySearch'
  }
];
