import React, {Component} from 'react';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
const sizeIcon = 4;
const pad = 10;

export class UserRadio extends Component {
    onChange = (e) =>{
        this.props.choiceEvent(e);
    }
    render() {
        let RadioOptions = this.props.options.map((option) => {
            return <RadioButton iconSize={sizeIcon} iconInnerSize={sizeIcon} padding={pad} key={`Option_${option}`} value={option}>{option}</RadioButton>;
        });
        return (
            <RadioGroup onChange={this.onChange} >
                {RadioOptions.map(name => name)}
            </RadioGroup>
        );
    }
}