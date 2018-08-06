import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { PersonalSpace } from './PersonalSpace';
import { WorkoutTab } from './YourWorkout';
import { VersusTab } from './VersusSpace';
import { LoginTab } from './LoginTab';
import { workoutData, userData } from './Data';
import { LinkContainer } from 'react-router-bootstrap';

class App extends Component {
  state = {
    credentials: "",
    accepted: false
  }

  componentDidMount() {
    userData.forEach(name => {
      workoutData[name] = {};
    });
  }

  render() {
    if (this.state.accepted === false) {
      return (
        <div className="App">
          <HeaderComponent />
          <p>{this.state.accepted}</p>
          <p>{this.state.credentials}</p>
          <LoginTab logIn={(user) => { this.setState({ accepted: user.accepted, credentials: user.credentials }); }} />
        </div>
      );
    } else if (this.state.accepted === true) {
      return (
        <div className="App">
          <HeaderComponent />
          <Navigation credentials={this.state.credentials} logOut={(e) => { this.setState({ accepted: e }); }} />
        </div>
      );
    }
  }
}

class Routing extends Component {
  render() {
    return (
      <div>
        <Route path="/PersonalSpace" render={(props) => <PersonalSpace {...props} username={this.props.creds} />} />
        <Route path="/YourWorkout" render={(props) => <WorkoutTab {...props} username={this.props.creds} />} />
        <Route path="/VersusSpace" render={(props) => <VersusTab {...props} username={this.props.creds} />} />
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

class Navigation extends Component {
  render() {
    return (
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Fitness-Applet</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullLeft>
              <LinkContainer to="/PersonalSpace">
                <NavItem>Personal-Space</NavItem>
              </LinkContainer>
              <LinkContainer to="/YourWorkout">
                <NavItem>Your Workout</NavItem>
              </LinkContainer>
              <LinkContainer to="/VersusSpace">
                <NavItem>Versus-Space</NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              <LinkContainer onClick={() => { this.props.logOut(false) }} to="/">
                <NavItem>Logout</NavItem>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routing creds={this.props.credentials} />
      </div>
    );
  }

}

export default App;
