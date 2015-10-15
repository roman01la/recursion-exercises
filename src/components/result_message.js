import React from 'react';

function getClassName(value) {

  return `result-message ${value === true ? 'success' : 'fail'}`;
}

const ResultMessage = ({ result }) => (

  <span className={getClassName(result)}>
    {result === true ? 'Test passed!' : 'Test failed!'}
  </span>
);

export default ResultMessage;
