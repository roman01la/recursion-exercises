import React from 'react';

const Description = ({ title, text, id }) => (

  <div className='description'>
    <h2 id={id}>{title}</h2>
    <p dangerouslySetInnerHTML={{__html: text}}></p>
  </div>
);

export default Description;
