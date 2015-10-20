import normalizeMemberExpr from './utils/normalize_member_expr';
import isEqual from './utils/is_equal';
import fuzzyIdentifiers from './comparators/fuzzy_identifiers';
import fuzzyStrings from './comparators/fuzzy_strings';

function equal(actualAST, expectedAST, options = {}) {

  const comparators = [fuzzyIdentifiers(options), fuzzyStrings(options)].concat(options.comparators || []);
  const ignore = options.ignore || [];

  function compare(actual, expected) {

    // Literal values
    if (Object(actual) !== actual) {
      if (actual !== expected) {
        return false;
      }
      return true;
    }

    // Arrays
    if (Array.isArray(actual)) {
      if (actual.length !== expected.length) {
        return false;
      }
      return actual.every((_, i) => compare(actual[i], expected[i]));
    }

    // Nodes
    normalizeMemberExpr(actual);
    normalizeMemberExpr(expected);

    if (actual.computed && expected.property) { ignoreProps(ignore, expected); }
    if (expected.computed && actual.property) { ignoreProps(ignore, actual); }

    if (isEqual(comparators, actual, expected)) {

      return true;
    }

    return Object.keys(actual)
      .every((key) => {

        if (ignore.includes(key)) {

          return true;
        } else {

          if (expected && key in expected) {

            return compare(actual[key], expected[key]);
          } else {

            return false;
          }
        }
      });
  }

  return compare(actualAST, expectedAST);
}

function ignoreProps(ignoreList, node) {

  ignoreList.forEach((x) => Reflect.deleteProperty(node.property, x));
}

export default equal;
