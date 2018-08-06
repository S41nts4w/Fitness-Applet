import React, { Component } from 'react';
import { data } from './Data';
import { ChartComponent } from './Graphs';

export class PersonalSpace extends Component {
  state = {
    dataSet: data["daniel.test@mesaic.co"]
  }
  componentDidMount(){
    this.setState({
      dataSet: data[this.props.username]
    })
  }
  render() {
    const { dataSet} = this.state;
    return (
      <div>
        <ChartComponent data={dataSet} />
      </div>
    );
  }
}