import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { WorkoutTab } from './WorkOutTab';
import { PersonalTab } from './PersonalSpace';
import { VersusTab } from './VersusSpace';
import { LoginTab } from './LoginTab';


class App extends Component {
  state = {
    credentials: "None",
    accepted: false
  }

  render() {
    if (this.state.accepted === false) {
      return (
        <div className="App">
          <HeaderComponent />
          <LoginTab logIn={(user)=>{this.setState({accepted: user.accepted, credentials: user.credentials});}} />
        </div>
      );
    } else if(this.state.accepted === true) {
      return (
        <div className="App">
          <HeaderComponent />
            <div>
              <button>
              <Link to='/YourWorkout' username={this.state.credentials}>Your Workout</Link>
              </button>
              <button>
              <Link to='/PersonalSpace' username={this.state.credentials}>Personalspace</Link>
              </button>
              <button>
              <Link to='/VersusSpace'>Versusspace</Link>
              </button>
              <button onClick={(e)=>{this.setState({accepted: false});}}>Logout</button>
              <Route path="/YourWorkout" component={WorkoutTab} />
              <Route path="/PersonalSpace" component={PersonalTab} />
              <Route path="/VersusSpace" component={VersusTab} />
            </div>
        </div>
      );
    }
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
