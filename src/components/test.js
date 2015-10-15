import React from 'react';
import ErrorMessage from './error_message';
import ResultMessage from './result_message';
import equal from 'deep-equal';

const initialState = { result: undefined, error: undefined };

function transform(code) {

  return babel.transform(code, { stage: 0 }).code;
}

function execute(test) {

  return new Promise((resolve) => resolve(eval(transform(test))));
}

const Test = React.createClass({

  getInitialState() {

    return initialState;
  },
  _executeTest() {

    this.setState(initialState, () => {

      execute(this.props.test)
        .then((result) => this.setState({ result }))
        .catch((error) => this.setState({ error }));
    });
  },
  _getResult({ result, error }) {

    return result !== undefined ? <ResultMessage result={result} /> :
      (error !== undefined ? <ErrorMessage message={error.message} /> : null);
  },
  render() {

    return (

      <div className='test'>
        <button className='test-btn' onClick={this._executeTest}>Execute test</button>
        <span className='result'>{this._getResult(this.state)}</span>
      </div>
    );
  }
});

export default Test;
