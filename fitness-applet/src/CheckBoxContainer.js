import React, { Component } from 'react';
import {Checkbox} from './Checkbox';
import { relativeTimeRounding } from '../node_modules/moment';

export class CheckBoxContainer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          checkedItems: new Map(),
        }
    
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    }
    componentDidUpdate(prevProps, prevState){
        let returnArray = [];
        this.state.checkedItems.forEach((entry, i)=>{
            if(entry){
                let key = this.state.checkedItems.keys().Entries;
                returnArray.push(key[i]);
            }
        })
        return returnArray;
    }

    render() {
        const CheckBoxOptions = this.props.options.map(option => {
            return <label key={`checkBoxOption_${option}`}>
                {option}
                <Checkbox name={option} checked={this.state.checkedItems.get(option)} onChange={this.handleChange} />
            </label>
        })
        return (
            <React.Fragment>
                {CheckBoxOptions.map(option=>option)}
            </React.Fragment>
                );
            }
}