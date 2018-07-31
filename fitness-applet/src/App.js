import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { userData, workoutData, data } from './Data';
import { ChartComponent } from './Graphs'
import { SelectionComponent } from './Selector';


class App extends Component {
  state = {
    currentName: "UserName",
    currentWorkout: "WorkoutName",
    currentWeight: 0,
    dataSet: data.Daniel
  }
  componentDidMount() {
    userData.forEach(name => {
      workoutData[name] = {};
    });
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
  handleButton() {
    this.setState({ currentWeight: this.refs.weightPerformer.value });
    let name = this.state.currentName;
    let curWork = this.state.currentWorkout;
    workoutData[name][curWork] = [this.refs.weightPerformer.value];
  }
  render() {
    return (
      <div className="App">
        <HeaderComponent />
        <SelectionComponent
          onUpdatedName={this.selectName}
          onUpdatedWorkout={this.selectWorkout}
        />
        <input ref="weightPerformer" type="number" placeholder="Kg" value={this.state.performedWeight} />
        <button onClick={(e) => { this.handleButton(); }}>Submit</button>
        <ChartComponent data={this.state.dataSet}/>
      </div>
    );
  }
}

class HeaderComponent extends Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Fitness Applet</h1>
      </header>
    );
  }
}

export default App;
