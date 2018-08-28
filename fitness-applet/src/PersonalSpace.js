import React, { Component } from 'react';
import { data, fillData, workoutName } from './Store';
import { ChartComponent } from './Graphs';

export class PersonalSpace extends Component {
  state = {
    dataSet: data
  }
  componentDidMount(){
    fillData(this.props.username);
    this.setState({
      dataSet: data
    })
  }
  
  render() {
    const { dataSet} = this.state;
    const FilterData=()=>{
      return dataSet.filter(row=>{
        if(Object.keys(row).length >1){
          return row;
        }return null;
      }).map(row=>row);
    }
    return (
      <div>
        <ChartComponent workoutNames={workoutName} otherGraph={true} data={FilterData()} />
      </div>
    );
  }
}