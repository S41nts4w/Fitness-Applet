import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { userData, workoutData, data } from './Data';
import { ChartComponent } from './Graphs'
import { SelectionComponent } from './Selector';
import { InputComponent } from './Input';
import { Router, Route } from 'react-router';


class App extends Component {
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
    const weight = null;
    return (
      <div className="App">
        <HeaderComponent />
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

// class Login extends Component{

// }

// class WorkoutTab extends Component{

// }

// class PersonalSpace extends Component{

// }

// class VersusTab extends Component{

// }

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
