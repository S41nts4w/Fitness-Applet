import React, { Component } from 'react';
import { DropDown } from './Selector';
import { workoutName, getCell, getDateTable, getCellIndex, getWeightsFor } from './Store';
import { InputComponent } from './Input';
import { WriteSingleCell } from './SheetWriter'

export class WorkoutTab extends Component {
    state = {
        username: "none",
        workout: "none",
        date: ''
    }
    componentDidMount() {
        this.setState({
            username: this.props.username
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.username !== prevProps.username) {
            this.setState({
                username: this.props.username
            })
        }
    }
    render() {
        return (
            <div>
                <div>
                    <DropDown options={workoutName} title='workout' onUpdate={(e) => { this.setState({ workout: e }); }} />
                    <DropDown options={getDateTable(this.state.workout)} title='date' onUpdate={(e) => { this.setState({ date: e }); }} />
                </div>
                <div>
                    <h4>Last completed weights: </h4>
                    {getWeightsFor(this.state.workout, this.state.username)}
                </div>
                <h4>Enter your workout</h4>
                <InputComponent selName={this.state.username} selDate={this.state.date} selWorkout={this.state.workout} submitted={(props) => { props.date = this.state.date; bundleWriter(props) }} />
            </div>
        );
    }
}

const bundleWriter = (props) => {
    let date = props.date;
    date = date.substr(0, (date + " ").indexOf(" "));
    let writeDate = {
        value: date,
        range: `${props.workout}!A${getCellIndex(props.workout, props.date)}`,
    }
    let writeWeight = {
        value: props.weight,
        range: `${props.workout}!${getCell(props.name)}${getCellIndex(props.workout, props.date)}`,
    }
    let writeSet = {
        value: props.set,
        range: `${props.workout}!${String.fromCharCode(getCell(props.name).charCodeAt(0) + 3)}${getCellIndex(props.workout, props.date)}`,
    }
    WriteSingleCell(writeDate);
    WriteSingleCell(writeWeight);
    WriteSingleCell(writeSet);
}