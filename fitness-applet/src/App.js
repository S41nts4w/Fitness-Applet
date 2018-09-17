import React from 'react';
import { Image } from 'react-bootstrap';
import './App.css';
import { PersonalSpace } from './PersonalSpace';
import { WorkoutTab } from './YourWorkout';
import { VersusTab } from './VersusSpace';
import { StatisticPage } from './Statistics';
import { getNames, workoutName } from './Store';
import { SheetExtractor } from './SheetAccess';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer({ children, dir }) {
    return (
        <Typography align='center' component="div" dir={dir}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        // width: 500,
    },
    form: {
        width: '100%', // Fix IE11 issue.
        marginTop: theme.spacing.unit*7,
    },
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
});

class FullWidthTabs extends React.Component {
    state = {
        value: 0,
        credentials: "User",
        accepted: false,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { classes, theme } = this.props;
        const Sheet = (props) => {
            return <SheetExtractor loggedIn={props.loggedIn} signedin={(accepted, user) => { this.setState({ accepted: accepted, credentials: user.getName(), image: user.getImageUrl() }); }} />
        }
        if (this.state.accepted === false) {
            return (
                <div className="App">
                    {/* <SignIn /> */}
                    <Sheet loggedIn={false} />
                </div>
            );
        } else if (this.state.accepted === true) {
            return (
                <div className={classes.root}>
                    <AppBar color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth
                            tabItemContainerStyle={classes.form}
                        >
                            <Tab label="Statistics" />
                            <Tab label="Personal-Space" />
                            <Tab label="Your Workout" />
                            <Tab label="Versus-Space" />
                        </Tabs>
                    </AppBar>
                                    <SwipeableViews
                                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                        index={this.state.value}
                                        onChangeIndex={this.handleChangeIndex}
                                        className={classes.form}
                                    >
                                        <TabContainer dir={theme.direction}>
                                            <StatisticPage username={this.state.credentials} />
                                        </TabContainer>
                                        <TabContainer dir={theme.direction}>
                                            <PersonalSpace username={this.state.credentials} />
                                        </TabContainer>
                                        <TabContainer dir={theme.direction}>
                                            <WorkoutTab username={this.state.credentials} />
                                        </TabContainer>
                                        <TabContainer dir={theme.direction}>
                                            <VersusTab username={this.state.credentials} userNames={getNames()} workoutNames={workoutName} />
                                        </TabContainer>

                                    </SwipeableViews>
                                    <Sheet loggedIn={true} />
                </div>
            );
        }
    }
}

FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);