import React, { Component } from 'react';
import DropDown from './Selector';
import { workoutName, getCell, getDateTable, getCellIndex, getWeightsFor } from './Store';
import InputComponent from './Input';
import { WriteSingleCell } from './SheetWriter';

export class WorkoutTab extends Component {
    state = {
        username: "none",
        workout: "none",
        date: '',
        changed: true,
    }
    DateOptions(){
        let date = getDateTable(this.state.workout);
        if(typeof date !== 'undefined'){
        return date.reverse();
    }
    return [];
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
                    <DropDown options={workoutName} title='workout' onUpdate={(e) => { this.setState({ workout: e, changed: true }); }} />
                    <DropDown options={this.DateOptions()} title='date' onUpdate={(e) => { this.setState({ date: e, changed: true }); }} />

                </div>
                <InputComponent changed={this.state.changed} prevWeight={getWeightsFor(this.state.workout, this.state.username).lastWeight} prevSet={getWeightsFor(this.state.workout, this.state.username).lastSet} selName={this.state.username} selDate={this.state.date} selWorkout={this.state.workout} submitted={(props) => { props.date = this.state.date; bundleWriter(props);this.setState({changed: false}) }} />

            </div>
        );
    }
}

const bundleWriter = (props) => {
    let { date, workout, name, set, weight } = props;
    const cellIndex = getCellIndex(workout, date);
    weight = weight.replace(/[.]/g, ",");
    date = date.substr(0, (date + " ").indexOf(" "));
    let writeDate = {
        value: date,
        range: `${workout}!A${cellIndex}`,
    }
    let writeWeight = {
        value: weight,
        range: `${workout}!${getCell(name)}${cellIndex}`,
    }
    let writeSet = {
        value: set,
        range: `${workout}!${String.fromCharCode(getCell(name).charCodeAt(0) + 3)}${cellIndex}`,
    }
    WriteSingleCell(writeDate);
    WriteSingleCell(writeWeight);
    WriteSingleCell(writeSet);
}