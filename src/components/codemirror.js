import React from 'react';
import CM from 'codemirror';

const Codemirror = React.createClass({

  componentDidMount() {

    this.cm = CM(this.refs.input, {
      value: this.props.value,
      mode: 'javascript',
      lineNumbers: true
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
