import React, { Component } from 'react';
import { userData, workoutName} from './Data';

export class SelectionComponent extends Component {
    state = {
      name: "UserName",
      workout: "WorkoutName"
    }
    onUpdateName = (val) => {
      this.props.onUpdatedName(val);
      this.setState({
        name: val
      });
    };
    onUpdateWorkout = (val) => {
      this.props.onUpdatedWorkout(val);
      this.setState({
        workout: val
      });
    }
    render() {
      return (
        <p className="Selector">
          <DropDown
            ref="nameSelector"
            options={userData}
            onUpdate={this.onUpdateName}
          />
          <DropDown
            ref="workoutSelector"
            options={workoutName}
            onUpdate={this.onUpdateWorkout}
          />
        </p>)
    }
  }

  class DropDown extends Component {
    state = {
      fieldVal: "Value"
    }
    componentDidMount() {
      this.setState({
        fieldVal: this.refs.selection.value
      });
      this.props.onUpdate(this.refs.selection.value);
    }
    update = (e) => {
      this.props.onUpdate(e.target.value);
      this.setState({ fieldVal: e.target.value });
    }
    render() {
      let options = this.props.options.map((name) => {
        return <option key={`option_${name}`} value={name}>{name}</option>;
      });
      return (
        <select ref="selection" type="number" defaultValue="select" value={this.state.fieldVal} onChange={this.update} >{options}</select>
      )
    }
  }