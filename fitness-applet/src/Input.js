import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


export class InputComponent extends Component {
  state = {
    name: this.props.selName,
    workout: "WorkoutName",
    set: "",
    rep: 0,
    weight: 0,
    date: this.props.selDate,
  }
  handleButton() {
    let { name, workout } = this.state;
    this.props.submitted({
      name: name,
      workout: workout,
      weight: this.state.weight,
      set: this.state.set,
      date: this.state.date
    });
  }
  handleButtonAddSet() {
    if (this.state.set.length) {
      this.setState({
        set: `${this.state.set}-${this.state.rep}`
      })
    } else {
      this.setState({
        set: `${this.state.rep}`
      })
    }
  }
  handleButtonDeleteSet() {
    this.setState({
      set: ""
    })
  }
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
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
          <TextField
            id="ID_Weight"
            label="Weight"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Kg"
            margin="normal"
            type='number'
            // value={this.state.weight}
            onChange={this.handleChange('weight')}
            helperText={`Last weight was: ${this.props.prevWeight}`}
          />
          <TextField
            id="ID_Rep"
            label="rep"
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Reps"
            margin="normal"
            type='number'
            onChange={this.handleChange('rep')}
            helperText={`Last set was: ${this.props.prevSet}`}
          />
          <IconButton mini="true" color="primary" onClick={(e) => { this.handleButtonAddSet(); }}><AddIcon /></IconButton>
          <IconButton mini="true" color="secondary" onClick={(e) => { this.handleButtonDeleteSet(); }}><DeleteIcon /></IconButton>
          <p>{`Your current Weight: ${this.state.weight} Set: ${this.state.set}`}</p>
        </div>
        <Button size="large" variant="raised" color="primary" onClick={(e) => { this.handleButton(); }}>Submit</Button>
      </div>
    )
  }
}
