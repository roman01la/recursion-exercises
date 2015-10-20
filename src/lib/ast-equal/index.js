import normalizeMemberExpr from './utils/normalize_member_expr';
import isEqual from './utils/is_equal';
import Errors from './match_errors';
import fuzzyIdentifiers from './comparators/fuzzy_identifiers';
import fuzzyStrings from './comparators/fuzzy_strings';

function equal(actualAST, expectedAST, options = {}) {

  const comparators = [fuzzyIdentifiers(options), fuzzyStrings(options)].concat(options.comparators || []);
  const ignore = options.ignore || [];

  compare(actualAST, expectedAST);

  function compare(actual, expected) {

    // Literal values
    if (Object(actual) !== actual) {
      if (actual !== expected) {
        throw new Errors.MatchError(actual, expected);
      }
      return;
    }

    // Arrays
    if (Array.isArray(actual)) {
      if (actual.length !== expected.length) {
        throw new Errors.MatchError(actual, expected);
      }
      actual.forEach((_, i) => compare(actual[i], expected[i]));
      return;
    }

    // Nodes
    normalizeMemberExpr(actual);
    normalizeMemberExpr(expected);

    if (actual.computed && expected.property) { ignoreProps(ignore, expected); }
    if (expected.computed && actual.property) { ignoreProps(ignore, actual); }

    if (isEqual(comparators, actual, expected)) {

      return;
    }

    Object.keys(actual)
      .forEach((key) => {

        if (!ignore.includes(key)) {

          if (expected && key in expected) {

            compare(actual[key], expected[key]);
          } else {

            throw new Errors.MatchError(actual, expected);
          }
        }
      });
  }
}

function ignoreProps(ignoreList, node) {

  ignoreList.forEach((x) => Reflect.deleteProperty(node.property, x));
}

equal.Error = Errors;

export default equal;
