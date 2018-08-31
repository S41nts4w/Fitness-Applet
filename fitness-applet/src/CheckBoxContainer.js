import React, { Component } from 'react';
import { Checkbox } from './Checkbox';

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
    componentDidUpdate(prevProps, prevState) {
        if (this.state !== prevState) {
            let returnArray = [];
            this.state.checkedItems.forEach((value, key) => {
                if (value === true) {
                    if (returnArray.length === 0) {
                        returnArray[0] = key;
                    } else {
                        returnArray.push(key);
                    }

                }
            })
            this.props.choiceEvent(returnArray);
        }
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
                {CheckBoxOptions.map(option => option)}
            </React.Fragment>
        );
    }
}