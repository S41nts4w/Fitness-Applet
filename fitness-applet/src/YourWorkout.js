import React, { Component } from 'react';
import { DropDown } from './Selector';
import { workoutName } from './Data';
import { InputComponent } from './Input';

export class WorkoutTab extends Component {
    state={
        username: "none",
        workout: "none"
    }
    componentDidMount(){
        this.setState({
            username: this.props.username
        })
    }
    componentDidUpdate(prevProps){
        if(this.props.username !== prevProps.username){
            this.setState({
                username: this.props.username
            })
        }
    }
    getUsername(){
        return this.state.username;
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