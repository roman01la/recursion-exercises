export default function isEqual(comparators, actual, expected) {

  const result = comparators.map((comparator) => comparator(actual, expected))
    .reduce((prev, curr) => curr === true ? true : prev || curr, null);

  return result ? true : false;
}
