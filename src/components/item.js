import React from 'react';
import Codemirror from './codemirror';
import Test from './test';
import Description from './description';

function saveCode(id, code) {

  localStorage.setItem(`re-${id}`, code);
}

function loadCode(id) {

  return localStorage.getItem(`re-${id}`);
}

const ExerciseItem = React.createClass({

  getInitialState() {

    return { code: loadCode(this.props.id) || this.props.test };
  },
  _setCode(code) {

    this.setState({ code }, () => saveCode(this.props.id, code));
  },
  render() {

    return (

      <section className='exercise-item'>
        <Description {...this.props.description} id={this.props.id} />
        <Codemirror defaultValue={this.state.code} onChange={this._setCode} />
        <Test test={this.state.code} />
      </section>
    );
  }
})

export default ExerciseItem;
