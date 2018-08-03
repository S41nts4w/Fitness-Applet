import React, { Component } from 'react';
import { userData, workoutData, data } from './Data';
import { ChartComponent } from './Graphs'
import { SelectionComponent } from './Selector';
import { InputComponent } from './Input';

export class WorkoutTab extends Component {
  state = {
    currentName: "UserName",
    currentWorkout: "WorkoutName",
    dataSet: data.Daniel
  }
  componentDidMount() {
    userData.forEach(name => {
      workoutData[name] = {};
    });
  }

  componentDidUpdate(){
    if (this.props.userName === 'daniel.vondrathen@mesaic.co') {
      this.setState({
        currentName: "Daniel"
      });
    }else if(this.props.userName === 'dennis.test@mesaic.co'){
    this.setState({
      currentName: "Dennis"
    });
  }else if(this.props.userName === 'moritz.test@mesaic.co'){
    this.setState({
      currentName: "Moritz"
    });
  }
  }
  selectName = (name) => {
    this.setState({
      currentName: name,
      dataSet: data[name]
    });
  }
  selectWorkout = (val) => {
    this.setState({ currentWorkout: val });
  }
  render() {
    const { dataSet, currentName, currentWorkout } = this.state;
    return (
      <div>
        <SelectionComponent
          onUpdatedName={this.selectName}
          onUpdatedWorkout={this.selectWorkout}
        />
        <InputComponent selName={currentName} selWorkout={currentWorkout} />
        <ChartComponent data={dataSet} />
      </div>
    );
  }
}