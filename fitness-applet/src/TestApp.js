// import React, { Component } from 'react';
// import { Navbar, NavItem, Nav, Image } from 'react-bootstrap';
// import logo from './logo.svg';
// import './App.css';
// import { Route, Link } from 'react-router-dom';
// import { PersonalSpace } from './PersonalSpace';
// import { WorkoutTab } from './YourWorkout';
// import { VersusTab } from './VersusSpace';
// import { StatisticPage } from './Statistics';
// import { getNames, workoutName } from './Store';
// import { LinkContainer } from 'react-router-bootstrap';
// import { SheetExtractor } from './SheetAccess';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import SwipeableViews from 'react-swipeable-views';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';

// function TabContainer({ children, dir }) {
//   return (
//     <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
//       {children}
//     </Typography>
//   );
// }

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
//   dir: PropTypes.string.isRequired,
// };

// const styles = theme => ({
//   root: {
//     backgroundColor: theme.palette.background.paper,
//     width: 500,
//   },
// });

// class FullWidthTabs extends React.Component {
//   state = {
//     value: 0,
//   };

//   handleChange = (event, value) => {
//     this.setState({ value });
//   };

//   handleChangeIndex = index => {
//     this.setState({ value: index });
//   };

//   render() {
//     const { classes, theme } = this.props;

//     return (
//       <div className={classes.root}>
//         <AppBar position="static" color="default">
//           <Tabs
//             value={this.state.value}
//             onChange={this.handleChange}
//             indicatorColor="primary"
//             textColor="primary"
//             fullWidth
//           >
//             <Tab label="Item One" />
//             <Tab label="Item Two" />
//             <Tab label="Item Three" />
//           </Tabs>
//         </AppBar>
//         <SwipeableViews
//           axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//           index={this.state.value}
//           onChangeIndex={this.handleChangeIndex}
//         >
//           <Navigation/>
//         </SwipeableViews>
//       </div>
//     );
//   }
// }


// class Routing extends Component {
//     render() {
//       return (
//         <div>
//           <Route path="/Statistics" render={(props) => <StatisticPage {...props} username={this.props.creds} />} />
//           <Route path="/PersonalSpace" render={(props) => <PersonalSpace {...props} username={this.props.creds} />} />
//           <Route path="/YourWorkout" render={(props) => <WorkoutTab {...props} username={this.props.creds} />} />
//           <Route path="/VersusSpace" render={(props) => <VersusTab {...props} username={this.props.creds} userNames={getNames()} workoutNames={workoutName} />} />
//         </div>
//       );
//     }
//   }
  

// const Navigation = (props) => {
//     return (
//       <div className="App container">
//                 <TabContainer dir={theme.direction}>
//               <LinkContainer to="/PersonalSpace">
//                 <NavItem>Personal-Space</NavItem>
//               </LinkContainer>
//               </TabContainer>
//               <TabContainer dir={theme.direction}>
//               <LinkContainer to="/YourWorkout">
//                 <NavItem>Your Workout</NavItem>
//               </LinkContainer>
//               </TabContainer>
//               <TabContainer dir={theme.direction}>
//               <LinkContainer to="/VersusSpace">
//                 <NavItem>Versus-Space</NavItem>
//               </LinkContainer>
//               </TabContainer>
//         <Routing creds={props.credentials} />
//       </div>
//     );
//   }



// FullWidthTabs.propTypes = {
//     classes: PropTypes.object.isRequired,
//     theme: PropTypes.object.isRequired,
//   };
  
//   export default withStyles(styles, { withTheme: true })(FullWidthTabs);