Practice recursion in JavaScript

What is recursion? When a function calls itself.

Take a look at this `repeat` function which yields a string of strings repeated specified number of times.
Recursive function definition has a base or terminating case (without recurring) and recursive case.
```javascript
function repeat(num, char) {

  // recursive case
  if (num - 1 > 0) {
    return char + repeat(num - 1, char);
  }
  // base case
  else {
    return char;
  }
}

repeat(3, 'Hey'); // 'HeyHeyHey'
```

Take a look at the `test.js` file in each directory to see what needs to be implemented, write an `index.js` as the solution file.

- Run all tests from the root: `npm test`
- Run a single test from the directory: `npm test`
- Run a single test in TDD mode from the directory: `npm run tdd`
