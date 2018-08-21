import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import logo from './logo.svg';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { PersonalSpace } from './PersonalSpace';
import { WorkoutTab } from './YourWorkout';
import { VersusTab } from './VersusSpace';
import { getNames, workoutName } from './Data';
import { LinkContainer } from 'react-router-bootstrap';
import { SheetExtractor } from './TestSheetAccess';

class App extends Component {
  state = {
    credentials: "User",
    accepted: false,
  }

  render() {
    const Sheet = (props) => {
      return <SheetExtractor loggedIn={props.loggedIn} signedin={(user) => { this.setState({ accepted: user, credentials: "Dennis" }); }} />
    }
    if (this.state.accepted === false) {
      return (
        <div className="App">
          <HeaderComponent />
          <Sheet loggedIn={false} />
        </div>
      );
    } else if (this.state.accepted === true) {
      return (
        <div className="App">
          <HeaderComponent />
          <Navigation credentials={this.state.credentials} logOut={(e) => { this.setState({ accepted: e }); }} />
          <Sheet loggedIn={true} />
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
        <Route path="/VersusSpace" render={(props) => <VersusTab {...props} username={this.props.creds} userNames={getNames()} workoutNames={workoutName} />} />
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
            <Navbar.Collapse>
              <Navbar.Text pullRight>
                Signed in as: <Navbar.Link href="#">{this.props.credentials}</Navbar.Link>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Navbar>
        <Routing creds={this.props.credentials} />
      </div>
    );
  }

}

export default App;
