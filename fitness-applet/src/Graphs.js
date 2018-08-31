import React, { Component } from 'react';
import { Brush, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, LineChart } from 'recharts/lib';

const styles = {
  outer: {
    paddingTop: '10%',
    paddingBottom: '40%',
    position: 'relative',
    height: 150
  },
  inner: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%'
  }
}
const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"];
const colorChanger = (i) => {
  return colors[i % colors.length];
}


export const ChartComponent = (props) => {
  let data = props.data;
  return (
    <div style={styles.outer} >
      <div style={styles.inner}>
        <ResponsiveContainer>
          {props.barGraph ? <BarGraph workoutNames={props.workoutNames} data={data} /> : props.otherGraph ? <LineGraph workoutNames={props.workoutNames} data={data} /> : <p>Please define a graph type</p>}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

class BarGraph extends Component {
  render() {
    let graphOption = this.props.workoutNames.map((option, i) => {
      return <Bar key={`Option_${option}`} label={{ position: 'top', fontSize: 11 }} dataKey={option} fill={colorChanger(i)} />;
    });
    return (
      <ResponsiveContainer>
        <BarChart data={this.props.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={{ bottom: 0 }} />
          {graphOption.map(element => element)}
          <Brush />
        </BarChart>
      </ResponsiveContainer>
    )
  }
}


class LineGraph extends Component {
  render() {
    let graphOption = this.props.workoutNames.map((option, i) => {
      return <Line key={`Option_${option}`} connectNulls={true} label={{ position: 'top', fontSize: 11 }} type="monotone" dataKey={option} stroke={colorChanger(i)} />
    });
    return (
      <ResponsiveContainer>
        <LineChart data={this.props.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend wrapperStyle={{ bottom: 0 }} />
          {graphOption.map(element => element)}
          <Brush />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}