import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleSheetsApi } from '@lourd/react-google-sheet';
import DataFetcher from './DynamicSpreadsheet';
import ApiForm from './ApiForm';
import apiKey from './apiKey.json';
import { profileChecker } from './Store';
import Button from '@material-ui/core/Button'
// import { Button } from 'react-bootstrap';

const range = "!A:Q";


const SheetsDemo = props => (
    <GoogleSheetsApi clientId={props.clientId} apiKey={props.apiKey} scopes={["https://www.googleapis.com/auth/spreadsheets"]}>
        {({ authorize, loading: apiLoading, signout, signedIn, error }) => (
            <div>
                {apiLoading ? (
                    <div>Loading...</div>
                ) : error ? (
                    JSON.stringify(error, null, 2)
                ) : signedIn ? (
                    props.loggedIn ? <Button size="large" variant="raised" color="secondary" onClick={signout}>Sign Out</Button> : <Button size="large" variant="raised" color="primary" onClick={() => { props.signin(true, getProfile()) }}>Sign In</Button>
                ) : (
                                <Button size="large" variant="raised" color="default" onClick={authorize}>Authorize</Button>
                            )}
                {signedIn && <DataFetcher sheetRange={`UserRegister`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="UserRegister" />}
                {signedIn && <DataFetcher sheetRange={`PowerClean${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="PowerClean" />}
                {signedIn && <DataFetcher sheetRange={`Squat${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="Squat" />}
                {signedIn && <DataFetcher sheetRange={`Press${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="Press" />}
                {signedIn && <DataFetcher sheetRange={`BenchPress${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="BenchPress" />}
                {signedIn && <DataFetcher sheetRange={`Deadlift${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="Deadlift" />}
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

const getProfile = () => {
    let auth = window.gapi.auth2.getAuthInstance();
    let profile = auth.currentUser.get().getBasicProfile();
    profileChecker(profile);
    return profile;
}

export class SheetExtractor extends Component {
    state = {
        apiKey: apiKey.key,
        clientId:
            apiKey['Client-ID'],
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
                        signin={(accepted, profile) => { this.props.signedin(accepted, profile) }}
                    />
                ) : (
                        <ApiForm onSubmit={this.handleSubmit} init={this.state} />
                    )}
            </div>
        )
    }
}