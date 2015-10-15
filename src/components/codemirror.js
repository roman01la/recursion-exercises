import React from 'react';
import CM from 'codemirror';

require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/edit/matchbrackets');
require('codemirror/addon/selection/active-line');
require('codemirror/mode/javascript/javascript');

const Codemirror = React.createClass({

  componentDidMount() {

    this.cm = CM(this.refs.input, {
      value: this.props.defaultValue,
      mode: 'javascript',
      theme: 'neo',
      lineNumbers: true,
      autoCloseBrackets: true,
      matchBrackets: true,
      styleActiveLine: true
    });

    this.cm.on('change', (cm) => {

      this.props.onChange && this.props.onChange(cm.getValue());
    });
  },
  componentWillUnmount() {

    Reflect.deleteProperty(this, 'cm');
  },
  render() {

    return <div ref='input' className='editor' />
  }
})

export default Codemirror;
