import React, { Component } from 'react';

export class DropDown extends Component {
  state = {
    fieldVal: "Value"
  }
  componentDidMount() {
    this.setState({
      fieldVal: this.refs.selection.value
    });
    this.props.onUpdate(this.refs.selection.value);
  }
  update = (e) => {
    this.props.onUpdate(e.target.value);
    this.setState({ fieldVal: e.target.value });
  }
  render() {
    let options
    try {
      options = this.props.options.map((name) => {
        return <option key={`option_${name}`} value={name}>{name}</option>;
      });
    } catch (error) {
      console.log(error);
      options = <option key={`option_date`} value="date">date</option>;
    }
    return (
      <select ref="selection" type="number" value={this.state.fieldVal} onChange={this.update} >{options}</select>
    )
  }
}