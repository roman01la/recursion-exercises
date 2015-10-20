import React from 'react';
import ErrorMessage from './error_message';
import ResultMessage from './result_message';
import SelectAnswer from './select_answer';
import equal from '../lib/ast-equal';
import { execute } from '../worker';
import * as db from '../db';

const initialState = {
  result: undefined,
  error: undefined,
  msg: 'Submit answer',
  answers: new Map()
};

export function getResult({ result, error }) {

  return result !== undefined ? <ResultMessage result={result} /> :
    (error !== undefined ? <ErrorMessage message={error} /> : null);
}

export function compareCode(answers, code) {

  const codeAST = babel.transform(code, { stage: 0 }).ast.program.body;

  return answers.some((answer) => {

    return equal(
      codeAST,
      babel.transform(answer, { stage: 0 }).ast.program.body,
      { ignore: ['start', 'end', 'column', 'line', 'loc', 'raw', 'rawValue'] })
  });
}

const Test = React.createClass({

  getInitialState() {

    return initialState;
  },
  componentDidMount() {

    db.onEntries(this.props.id, (err, answers) => {

      if (err || answers === null) { return this.setState({ answers: initialState.answers }); }
      else { this.setState({ answers: new Map(Object.entries(answers)) }) }
    });
  },
  _executeTest() {

    this.setState({...initialState, answers: this.state.answers}, () => {

      execute(this.props.test)
        .then((result) => this.setState({ result }))
        .catch((error) => this.setState({ error }));
    });
  },
  _submitResult(id, code) {

    return () => {

      if (!compareCode([...this.state.answers.values()], code)) {

        db.createEntry(id, code);
      }

      this.setState({ msg: 'Thanks!' },
        () => setTimeout(() => this.setState({ msg: initialState.msg }), 2000));
    };
  },
  _onAnswerSelect(event) {

    this.props.onAnswerSelect &&
      this.props.onAnswerSelect(this.state.answers.get(event.target.value));
  },
  render() {

    return (

      <div className='test'>
        <button className='btn test-btn' onClick={this._executeTest}>Execute test</button>
        {this.state.answers.size > 0 ?
          <SelectAnswer options={this.state.answers} defaultValue='default' id={this.props.id} onSelect={this._onAnswerSelect} /> :
          null}
        {this.state.result !== undefined && this.state.result !== false ?
          <button className='btn' onClick={this._submitResult(this.props.id, this.props.test)}>{this.state.msg}</button> :
          null}
        <div className='result'>{getResult(this.state)}</div>
      </div>
    );
  }
});

export default Test;
