import React from 'react';
import { render } from 'react-dom';
import ExercisesList from './components/list';
import exercises from './config/exercises';

window.assert = { equal: require('deep-equal') };

const App = ({ exercises }) => (

  <div>
    <aside className="side-bar">
      <h1>Recursion exercises</h1>
      <ul className='list'>
        <li className='list-item'><a href='#sum'>Sum</a></li>
        <li className='list-item'><a href='#exp'>Exponentiation</a></li>
        <li className='list-item'><a href='#fact'>Factorial</a></li>
        <li className='list-item'><a href='#fib'>Fibonacci sequence</a></li>
        <li className='list-item'><a href='#range'>Range sequence</a></li>
        <li className='list-item'><a href='#gcd'>Greatest common divisor</a></li>
        <li className='list-item'><a href='#bs'>Binary search</a></li>
      </ul>
    </aside>
    <ExercisesList exercises={exercises} />
  </div>
);

render(<App exercises={exercises} />, document.getElementById('exercises'));
