import React from 'react';
import ExerciseItem from './item';
import Chart from './chart/index';

function getItems(exercises) {

  return exercises.map((item) => <ExerciseItem key={item.id} {...item} />);
}

const ExercisesList = ({ exercises }) => (

  <main className='main-content'>
    {getItems(exercises)}
    <Chart />
  </main>
);

export default ExercisesList;
