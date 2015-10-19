import React from 'react';
import { PieChart } from 'react-d3';
import * as db from '../../db';

const initialState = { data: [] }

const Chart = React.createClass({

  getInitialState() {

    return initialState;
  },
  componentDidMount() {

    db.onEntries((err, data) => {

      if (!err) {

        this._setData(data);
      }
    });
  },
  _setData(data) {

    const one = 100 / Object.values(data)
      .reduce((sum, answers) => sum + Object.values(answers).length, 0);

    this.setState({
      data: Object.entries(data)
              .map(([id, answers]) => ({
                label: id,
                value: Math.round(Object.values(answers).length * one)
              }))
    });
  },
  render() {

    if (this.state.data.length === 0) { return null; }

    return <PieChart data={this.state.data} width={400} height={400}
                     radius={100} innerRadius={60} sectorBorderColor={'#fff'}
                     title={'Exercises stats'}
                     yAxisLabel={'answers'} xAxisLabel={'exercises'} />
  }
});

export default Chart;
