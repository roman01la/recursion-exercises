import React from 'react';
import Codemirror from './codemirror';
import Test from './test';
import Description from './description';

const ExerciseItem = React.createClass({

  getInitialState() {

    return { code: this.props.test };
  },
  _setCode(code) {

    this.setState({ code });
  },
  render() {

    return (

      <section className='exercise-item'>
        <Description {...this.props.description} id={this.props.id} />
        <Codemirror value={this.props.test} onChange={this._setCode} />
        <Test test={this.state.code} />
      </section>
    );
  }
})

export default ExerciseItem;
