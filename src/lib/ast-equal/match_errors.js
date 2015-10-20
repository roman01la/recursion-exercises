class CompareAstError {

  constructor(actual, expected) {

    this.actual = actual;
    this.expected = expected;
  }
}

class ParseError extends CompareAstError {

  code = 1;

  message = 'Parse error';

  constructor(...args) {

    super(...args);
  }
}

class BindingError extends CompareAstError {

  code = 2;

  message = 'Re-bound variable';

  constructor(...args) {

    super(...args);
  }
}

class MatchError extends CompareAstError {

  code = 3;

  message = 'Unmatched ASTs';

  constructor(...args) {

    super(...args);

    this.showDiff = true;
  }
}

CompareAstError.ParseError = ParseError;
CompareAstError.BindingError = BindingError;
CompareAstError.MatchError = MatchError;

export default CompareAstError;
