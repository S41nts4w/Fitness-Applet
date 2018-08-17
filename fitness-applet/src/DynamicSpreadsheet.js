
import React, {Component} from 'react';
import { GoogleSheet } from '@lourd/react-google-sheet';
import apiKey from './apiKey.json';
import {fillOfflineSheet} from './Data';

const MyData = ({ data, content }) => {
  fillOfflineSheet(data, content);
  return null;
}

// Wraps the GoogleSheet component to provide some basic components
// for display loading & error states
const SimpleGSheet = props => (
  <GoogleSheet id={props.id} range={props.range}>
    {({ error, data, loading }) =>
      loading ? (
        'Getting data...'
      ) : error ? (
        JSON.stringify(error, null, 2)
      ) : data ? (
        <MyData data={data} content={props.content}/>
      ) : null
    }
  </GoogleSheet>
)

class DataFetcher extends Component {
  state = {
    id: JSON.parse(JSON.stringify(apiKey.SheetID)),
    range: '',
    submitted: null,
  }

  componentDidMount(){
    this.setState({
        submitted: {
          id: this.props.sheetId,
          range: this.props.sheetRange
        },
      })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.setState({
      submitted: {
        id: this.state.id,
        range: this.state.range,
      },
    })
  }

  handleChange = (key, value) => this.setState({ [key]: value })

  render() {
    return (
      <div>
        {this.state.submitted && (
          <SimpleGSheet
            id={this.state.submitted.id}
            range={this.state.submitted.range}
            content={this.props.content}
          />
        )}
      </div>
    )
  }
}

export default DataFetcher