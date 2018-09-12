// import React, { Component } from 'react';
// import { DropdownButton, MenuItem } from 'react-bootstrap';

// export class DropDown extends Component {
//   state = {
//     currentSelection: this.props.title,
//   }
//   update = (e) => {
//     this.props.onUpdate(e);
//     this.setState({currentSelection: e});
//   }
//   render() {
//     let options;
//       try {
//         options = this.props.options.map((name) => {
//           return <MenuItem key={`keyItem_${name}`} eventKey={name} >{name}</MenuItem>;
//         });
//       } catch (error) {
//         console.log(error);
//         options = <MenuItem eventKey={`option_date`} >date</MenuItem>;
//       }
//     return (
//       <DropdownButton
//         title={this.state.currentSelection}
//         bsStyle="default"
//         key={`dropdown_${this.props.title}`}
//         id={`dropdown_workout`}
//         onSelect={this.update}
//       >
//         {options}
//       </DropdownButton>
//     )
//   }
// }

import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

export class DropDown extends React.Component {
  state = {
    currentSelection: this.props.title,
    open: false,
  };

  handleChange = event => {
    this.props.onUpdate(event.target.value);
    this.setState({ currentSelection: event.target.value });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { title } = this.props;
    let options;
    try {
      options = this.props.options.map((name) => {
        return <MenuItem key={`keyItem_${name}`} value={name} >{name}</MenuItem>;
      });
    } catch (error) {
      console.log(error);
      options = <MenuItem eventKey={`option_date`} >date</MenuItem>;
    }

    return (
      <form autoComplete="off">
        <FormControl className={`formControl_${title}`}>
          <InputLabel htmlFor="testSelect_materialUI">{title}</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.currentSelection}
            onChange={this.handleChange}
            inputProps={{
              name: title,
              id: 'testSelect_materialUI',
            }}
          >
            {options}
          </Select>
        </FormControl>
      </form>
    );
  }
}