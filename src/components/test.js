import React from 'react';
import ErrorMessage from './error_message';
import ResultMessage from './result_message';
import { execute } from '../worker';
import * as db from '../db';

const initialState = {
  result: undefined,
  error: undefined,
  msg: 'Submit answer'
};

export function getResult({ result, error }) {

    return result !== undefined ? <ResultMessage result={result} /> :
      (error !== undefined ? <ErrorMessage message={error} /> : null);
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
  _submitResult(id, code) {

    return () => {

      db.createEntry(id, code);

      this.setState({ msg: 'Thanks!' },
        () => setTimeout(() => this.setState({ msg: initialState.msg }), 2000));
    };
  },
  render() {

    return (

      <div className='test'>
        <button className='btn test-btn' onClick={this._executeTest}>Execute test</button>
        {this.state.result !== undefined ?
          <button className='btn' onClick={this._submitResult(this.props.id, this.props.test)}>{this.state.msg}</button> :
          null}
        <span className='result'>{getResult(this.state)}</span>
      </div>
    );
  }
});

export default Test;
