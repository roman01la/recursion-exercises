function noop() {}

export default function fuzzyIdentifiers(options) {

  let boundVars = {};
  const varPattern = options.varPattern;

  if (!varPattern) { return noop; }

  return (actual, expected) => {

    let unboundName;

    if (actual.type !== 'Identifier' || expected.type !== 'Identifier') {

      return;
    }

    if (varPattern.test(expected.name)) {

      unboundName = expected.name;

      if (!(unboundName in boundVars)) {

        boundVars[unboundName] = actual.name;
      }

      expected.name = boundVars[unboundName];

      // This inequality would be caught by the next recursion, but it is
      // asserted here to provide a more specific error--the ASTs do not
      // match because a variable was re-bound.
      if (expected.name !== actual.name) {

        return false;
      } else {

        return true;
      }
    }
  };
}
