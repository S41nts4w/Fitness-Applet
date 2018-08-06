import React, { Component } from 'react';
import { workoutData } from './Data';
import { Button } from 'react-bootstrap';

export class InputComponent extends Component {
  state = {
    name: "UserName",
    workout: "WorkoutName",
    weight: 0
  }
  handleButton() {
    let { name, workout } = this.state;
    this.setState({ weight: this.refs.weightPerformer.value });
    workoutData[name][workout] = [this.refs.weightPerformer.value];
  }
  componentDidMount() {
    this.setState({
      name: this.props.selName,
      workout: this.props.selWorkout
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.selName !== prevProps.selName) {
      this.setState({
        name: this.props.selName
      });
    }
    if (this.props.selWorkout !== prevProps.selWorkout) {
      this.setState({
        workout: this.props.selWorkout
      });
    }
  }
  render() {
    return (
      <div>
        <input ref="weightPerformer" type="number" placeholder="Kg" />
        <Button onClick={(e) => { this.handleButton(); }}>Submit</Button>
      </div>
    )
  }
}