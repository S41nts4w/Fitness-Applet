import React, { Component } from 'react';
import { data } from './Data';
import { ChartComponent } from './Graphs';
import { UserRadio } from './UserRadio';

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
        versusname: "none",
        versusData: data.Daniel,
    }
    componentDidMount() {
        this.setState({
            username: this.props.username,
            versusname: this.props.username,
            versusworkout: this.props.workoutNames[0],
        })
    }
    handleNameChoice(e){
        this.setState({
            versusname: e
        });
    }
    handleWorkoutChoice(e){
        this.setState({
            versusworkout: e
        });
    }
    render() {
        const FilterData=()=>{
            let thisData= this.state.versusData.filter(row=>{
              if(Object.keys(row).length >1){
                return row;
              }return null;
            }).map(row=>row);
            return thisData;
          }
        return (
            <div>
                <div>
                    <UserRadio choiceEvent={(e)=>{this.handleNameChoice(e)}} options={this.props.userNames} />
                </div>
                <ColoredLine color="Grey" />
                <div>
                    <UserRadio choiceEvent={(e)=>{this.handleWorkoutChoice(e)}} options={this.props.workoutNames} />
                </div>
                <ChartComponent barGraph={true} data={FilterData()} />
            </div>
        );
    }
}

