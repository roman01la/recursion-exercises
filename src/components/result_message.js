import React from 'react';

function getClassName(value) {

  return `result-message ${value === true ? 'success' : 'fail'}`;
}

const ResultMessage = ({ result }) => (

  <div className={getClassName(result)}>
    {result === true ? 'Test passed!' : 'Test failed!'}
  </div>
);

export default ResultMessage;
