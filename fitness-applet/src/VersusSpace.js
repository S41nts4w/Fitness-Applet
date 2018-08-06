import React, { Component } from 'react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { data } from './Data';
import { ChartComponent } from './Graphs';

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
        username: "default",
        versusData: data[this.username]
    }
    componentDidMount() {
        this.setState({
            username: this.props.username,
            versusData: data[this.props.username]
        })
    }
    onChange() {

    }
    render() {
        return (
            <div>
                <div>
                    <UserRadio />
                </div>
                <ColoredLine color="black" />
                <div>
                    <WorkoutRadio />
                </div>
                <ChartComponent data={this.state.versusData} />
            </div>
        );
    }
}
const sizeIcon = 4;
const pad = 10;
class UserRadio extends Component {
    render() {
        return (
            <RadioGroup onChange={this.onChange} >
                    <RadioButton iconSize={sizeIcon} iconInnerSize={sizeIcon} padding={pad} value="Daniel">Daniel</RadioButton>
                    <RadioButton iconSize={sizeIcon} iconInnerSize={sizeIcon} padding={pad} value="Dennis">Dennis</RadioButton>
                    <RadioButton iconSize={sizeIcon} iconInnerSize={sizeIcon} padding={pad} value="Moritz">Moritz</RadioButton>
            </RadioGroup>
        );
    }
}
class WorkoutRadio extends Component {
    render() {
        return (
            <RadioGroup onChange={this.onChange} horizontal>
                    <RadioButton iconSize={sizeIcon} iconInnerSize={sizeIcon} padding={pad} value="Squat">Squat</RadioButton>
                    <RadioButton iconSize={sizeIcon} iconInnerSize={sizeIcon} padding={pad} value="Press">Press</RadioButton>
                    <RadioButton iconSize={sizeIcon} iconInnerSize={sizeIcon} padding={pad} value="Bench">Bench Press</RadioButton>
                    <RadioButton iconSize={sizeIcon} iconInnerSize={sizeIcon} padding={pad} value="Deadlift">Deadlift</RadioButton>
                    <RadioButton iconSize={sizeIcon} iconInnerSize={sizeIcon} padding={pad} value="Barbell-Row">Barbell-Row</RadioButton>
                    <RadioButton iconSize={sizeIcon} iconInnerSize={sizeIcon} padding={pad} value="Chin-ups">Chin-ups</RadioButton>
            </RadioGroup>
        );
    }
}

