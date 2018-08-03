import React, { Component } from 'react';
import { DropDown } from './Selector';
import { workoutName } from './Data';
import { InputComponent } from './Input';

export class PersonalTab extends Component {
    state = {
        userName: "none",
        workout: "none"
    }
    componentDidMount(){
        this.setState({
            userName: this.props.userName
        })
    }
    render() {
        return (
            <div>
                    <DropDown options={workoutName} onUpdate={(e)=>{this.setState({workout: e});}} />
                    <InputComponent selName={this.state.username} selWorkout={this.state.workout}/>
            </div>
        );
    }
}