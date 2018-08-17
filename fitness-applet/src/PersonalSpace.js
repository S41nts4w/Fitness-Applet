import React, { Component } from 'react';
import { data } from './Data';
import { ChartComponent } from './Graphs';

export class PersonalSpace extends Component {
  state = {
    dataSet: data[this.props.username],
    
  }
  
  render() {
    const { dataSet} = this.state;
    const FilterData=()=>{
      let thisData= dataSet.filter(row=>{
        if(Object.keys(row).length >1){
          return row;
        }return null;
      }).map(row=>row);
      return thisData;
    }
    return (
      <div>
        <ChartComponent otherGraph={true} data={FilterData()} />
      </div>
    );
  }
}