function noop() {}

export default function fuzzyStrings(options) {

  const stringPattern = options.stringPattern;

  if (!stringPattern) {

    return noop;
  }

  return (actual, expected) => {

    let boundStrings;

    if (actual.type !== 'Literal' || expected.type !== 'Literal') {

      return;
    }

    if (!options.boundStrings) {

      options.boundStrings = {};
    }

    boundStrings = options.boundStrings;

    if (!stringPattern.test(expected.value)) {

      return false;
    }

    const expectedValue = boundStrings[expected.value];

    if (expectedValue) {

      if (expectedValue !== actual.value) {

        return false;
      }
    } else {

      boundStrings[expected.value] = actual.value;
    }

    expected.value = actual.value;

    return true;
  };
}
