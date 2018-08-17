import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleSheetsApi } from '@lourd/react-google-sheet';
import DataFetcher from './DynamicSpreadsheet';
import ApiForm from './ApiForm';
import apiKey from './apiKey.json';

const range = "!A:Q"

const SheetsDemo = props => (
    <GoogleSheetsApi clientId={props.clientId} apiKey={props.apiKey} scopes={["https://www.googleapis.com/auth/spreadsheets"]}>
        {({ authorize, loading: apiLoading, signout, signedIn, error }) => (
            <div>
                {apiLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    JSON.stringify(error, null, 2)
                ) : signedIn ? (
                    props.loggedIn ? <button onClick={() => { props.signin(false) }&& signout}>Sign Out</button>: <button onClick={() => { props.signin(true) }}>Sign In</button>
        ) : (
                                <button onClick={authorize}>Authorize</button>
        )}
        {signedIn && <DataFetcher sheetRange={`Squat${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="Squat" />}
        {signedIn && <DataFetcher sheetRange={`Press${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="Press" />}
        {signedIn && <DataFetcher sheetRange={`BenchPress${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="BenchPress" />}
        {signedIn && <DataFetcher sheetRange={`Deadlift${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="Deadlift" />}
        {signedIn && <DataFetcher sheetRange={`ChinUp${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="ChinUp" />}
        {signedIn && <DataFetcher sheetRange={`Bent-Over Barbell Row${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="Bent-Over Barbell Row" />}
            </div>
)}
    </GoogleSheetsApi >
)
SheetsDemo.propTypes = {
    clientId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
    loggedIn: PropTypes.bool.isRequired,
}

export class SheetExtractor extends Component {
    state = {
        apiKey: JSON.parse(JSON.stringify(apiKey.key)),
        clientId:
            JSON.parse(JSON.stringify(apiKey['Client-ID'])),
        range: "",
    }
    componentDidMount() {
        this.setState({
            range: this.props.range
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.range !== this.props.range) {
            this.setState({
                range: this.props.range
            })
            return true;
        } return false;
    }

    handleSubmit = state => this.setState(state)
    render() {
        return (
            <div>
                {this.state.apiKey ? (
                    <SheetsDemo
                        apiKey={this.state.apiKey}
                        clientId={this.state.clientId}
                        loggedIn={this.props.loggedIn}
                        signin={(e) => { this.props.signedin(e) }}
                    />
                ) : (
                        <ApiForm onSubmit={this.handleSubmit} init={this.state} />
                    )}
            </div>
        )
    }
}