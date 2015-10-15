import React from 'react';
import ExerciseItem from './item';

function getItems(exercises) {

  return exercises.map((item) => <ExerciseItem key={item.id} {...item} />);
}

const ExercisesList = ({ exercises }) => <main className='main-content'>{getItems(exercises)}</main>;

export default ExercisesList;
