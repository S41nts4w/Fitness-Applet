import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export class DropDown extends Component {
  state = {
    currentSelection: this.props.title,
  }
  update = (e) => {
    this.props.onUpdate(e);
    this.setState({currentSelection: e});
  }
  render() {
    let options;
      try {
        options = this.props.options.map((name) => {
          return <MenuItem key={`keyItem_${name}`} eventKey={name} >{name}</MenuItem>;
        });
      } catch (error) {
        console.log(error);
        options = <MenuItem eventKey={`option_date`} >date</MenuItem>;
      }
    return (
      <DropdownButton
        title={this.state.currentSelection}
        bsStyle="default"
        key={`dropdown_${this.props.title}`}
        id={`dropdown_workout`}
        onSelect={this.update}
      >
        {options}
      </DropdownButton>
    )
  }
}