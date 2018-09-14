import React, { Component } from 'react';
import { versusData, fillVersusData, workoutName } from './Store';
import { ChartComponent } from './Graphs';
import { UserRadio } from './UserRadio';
import { CheckBoxContainer } from './CheckBoxContainer';

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 0.5
        }}
    />
);

export class VersusTab extends Component {
    state = {
        props: {
            username: this.props.username,
            versusname: this.props.username,
            versusworkout: [],
        },
        versusData: versusData,
        otherGraph: false,
        barGraph: true,
    }
    componentDidMount() {

        this.setState({
            props: {
                username: this.props.username,
                versusname: this.props.username,
                versusworkout: [],
            },
            versusData: fillVersusData(this.state.props),
        });
    }
    handleNameChoice(e) {
        this.setState({
            props: {
                ...this.state.props,
                versusname: e,
            },
            versusData: fillVersusData(this.state.props),
        });
    }
    handleWorkoutChoice(e) {
        this.setState({
            props: {
                ...this.state.props,
                versusworkout: e,
            },
            versusData: fillVersusData(this.state.props),
        });
    }
    handleGraphChoice(e) {
        switch (e) {
            case 'Bar Graph':
                this.setState({
                    barGraph: true,
                    otherGraph: false,
                });
                break;
            case 'Other Graph':
                this.setState({
                    barGraph: false,
                    otherGraph: true,
                });
                break;

            default:
                break;
        }
        this.setState({
            graphStyle: e
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.props !== prevState.props) {
            this.setState({
                versusData: fillVersusData(this.state.props),
            });
        }
    }
    render() {
            const FilterNameOptions = () => {
                try {
                    return this.props.userNames.filter(name => { if (name !== this.props.username) { return true; } return false; }).map(name => name);
                } catch (e) {
                    return [];
                }
                
            }

        const FilterData = () => {
            return this.state.versusData.filter(row => {
                if (Object.keys(row).length > 1) {
                    return row;
                } return null;
            }).map(row => {
                return row;
            });
        }
        const GetOptionNames = () => {
            let returnVal = [];
            workoutName.filter(name => {
                if ((this.state.props.versusworkout).includes(name)) {
                    return true;
                } return false;
            }).map(option => {
                returnVal.push(`Your ${option}`);
                returnVal.push(`${this.state.props.versusname}'s ${option}`);
                return null;
            });
            return returnVal;
        }
        return (
            <div>
                <div>
                    <UserRadio choiceEvent={(e) => { this.handleNameChoice(e) }} options={FilterNameOptions()} />
                </div>
                <ColoredLine color="Grey" />
                <div>
                    <CheckBoxContainer choiceEvent={(e) => { this.handleWorkoutChoice(e) }} options={this.props.workoutNames} />
                </div>
                <ChartComponent workoutNames={GetOptionNames()} otherGraph={this.state.otherGraph} barGraph={this.state.barGraph} data={FilterData()} />
                <UserRadio choiceEvent={(e) => { this.handleGraphChoice(e) }} options={['Bar Graph', 'Other Graph']} />
            </div>
        );
    }
}

