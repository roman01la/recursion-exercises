import Errors from '../match_errors';

export default function isEqual(comparators, actual, expected) {

  const result = comparators.map((comparator) => comparator(actual, expected))
    .reduce((prev, curr) => curr === true ? true : prev || curr, null);

  if (result instanceof Errors) {

    throw result;
  }

  if (result === true) {

    return true;
  }
}
