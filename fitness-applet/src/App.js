import React from 'react';
import './App.css';
import { PersonalSpace } from './PersonalSpace';
import { WorkoutTab } from './YourWorkout';
import { VersusTab } from './VersusSpace';
import { StatisticPage } from './Statistics';
import { getNames, workoutName, changeFlag } from './Store';
import { SheetExtractor } from './SheetAccess';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import MenuAppBar from './Avatar';

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
        marginTop: theme.spacing.unit * 7,
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
        auth: null,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };
    handleLogout = () => {
        this.setState({
            accepted: false,
        })
    }
    authHandler = (auth) =>{
        let receivedID = auth.currentUser.Ab.El;
        if(this.state.auth !== null){
        let oldID = this.state.auth.currentUser.Ab.El;
        if(receivedID !== oldID){
            this.setState({
                auth: auth,
                accepted: auth.isSignedIn.Ab,
            })
        }}else{
            this.setState({
                auth: auth,
                accepted: auth.isSignedIn.Ab,
            })
        }
    }
    render() {
        const { classes, theme } = this.props;
        return (
            <div>
                {this.state.accepted && <div className={classes.root}>
                    <AppBar color="default">
                        <Tabs
                            value={this.state.value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            fullWidth
                        >
                            <Tab label="Statistics" />
                            <Tab label="Personal-Space" />
                            <Tab label="Your Workout" />
                            <Tab label="Versus-Space" />
                            <MenuAppBar loggedOut={this.handleLogout} image={this.state.image} />
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
                </div>}
                <SheetExtractor getAuth={(e)=>{this.authHandler(e)}} loadSheets={changeFlag} signedin={(accepted, user) => { this.setState({ accepted: accepted, credentials: user.username, image: user.image }); }} />
            </div>
        );
    }
}

FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);