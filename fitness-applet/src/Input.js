import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export class InputComponent extends Component {
  state = {
    name: this.props.selName,
    workout: "WorkoutName",
    set: " ",
    weight: 0,
    date: this.props.selDate,
  }
  handleButton() {
    let { name, workout } = this.state;
    this.setState({ weight: this.refs.maxWeight.value });
    this.props.submitted({
      name: name,
      workout: workout,
      weight: this.state.weight,
      set: this.state.set,
      date: this.state.date
    });
  }
  handleButtonAddSet() {
    if (parseFloat(this.refs.maxWeight.value) !== this.state.weight) {
      this.setState({
        weight: parseFloat(this.refs.maxWeight.value),
        set: `${this.refs.reps.value}`
      })
    }else {
      this.setState({
        set: `${this.state.set}-${this.refs.reps.value}`
      })
    }
  }
  componentDidMount() {
    this.setState({
      name: this.props.selName,
      workout: this.props.selWorkout,
      date: this.props.selDate,
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
        <div>
          <input ref="maxWeight" type="number" placeholder="Kg" />
          <input ref="reps" type="number" placeholder="Amount" />
          <Button bsStyle="primary" onClick={(e) => { this.handleButtonAddSet(); }}>Add Set</Button>
          <p>{`Your current Weight: ${this.state.weight} Set: ${this.state.set}`}</p>
        </div>
        <Button bsStyle="primary" onClick={(e) => { this.handleButton(); }}>Submit</Button>
      </div>
    )
  }
}
