import React from 'react';

const SelectAnswer = ({ id, options, onSelect, defaultValue }) => (

  <select className='select' defaultValue={defaultValue} onChange={onSelect}>
    {[<option key='default' value='default' disabled={true}>See other answers</option>,
      ...Object.entries(options).map(([id, value]) => <option key={id} value={id}>{value.slice(0, 20)}</option>)
    ]}
  </select>
);

export default SelectAnswer;
