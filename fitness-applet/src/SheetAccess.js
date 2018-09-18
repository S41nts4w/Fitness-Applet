import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleSheetsApi } from '@lourd/react-google-sheet';
import DataFetcher from './DynamicSpreadsheet';
import ApiForm from './ApiForm';
import apiKey from './apiKey.json';
import { profileChecker, workoutName } from './Store';
import Button from '@material-ui/core/Button'
import MenuAppBar from './Avatar';

// import { Button } from 'react-bootstrap';

const range = "!A:Q";

let fetchOptions = workoutName.map((option, i) => {
    return <DataFetcher key={`Option_${option}`} sheetRange={`${option}${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content={option} />;
});

const SheetsDemo = props => (
    <GoogleSheetsApi clientId={props.clientId} apiKey={props.apiKey} scopes={["https://www.googleapis.com/auth/spreadsheets"]}>
        {({ authorize, loading: apiLoading, signout, signedIn, error }) => (
            <div>
                {apiLoading ? (
                    <div>loading...</div>
                ) : error ? (
                    JSON.stringify(error, null, 2)
                ) : signedIn ? (
                    (<div>
                        {props.getAuth(window.gapi.auth2.getAuthInstance())}
                        <Button size="large" variant="raised" color="default" onClick={signout}>logOut</Button>
                    </div>)
                ) : (
                                <Button size="large" variant="raised" color="default" onClick={authorize}>Authorize</Button>
                            )
                }
                {signedIn && <DataFetcher sheetRange={`changedFlag!A1`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="changedFlag" />}
                {/* {signedIn && props.signin(true, getProfile())} */}
                {props.loadSheets && signedIn && (
                    <div>
                        <DataFetcher sheetRange={`UserRegister`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="UserRegister" />
                        <DataFetcher sheetRange={`PowerClean${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="PowerClean" />
                        <DataFetcher sheetRange={`Squat${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="Squat" />
                        <DataFetcher sheetRange={`Press${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="Press" />
                        <DataFetcher sheetRange={`BenchPress${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="BenchPress" />
                        <DataFetcher sheetRange={`Deadlift${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="Deadlift" />
                        <DataFetcher sheetRange={`Bent-Over Barbell Row${range}`} sheetId={JSON.parse(JSON.stringify(apiKey.SheetID))} content="Bent-Over Barbell Row" />
                    </div>
                )}
            </div>
        )}
    </GoogleSheetsApi >

)
SheetsDemo.propTypes = {
    clientId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
}

const auth = (auth, login) => {
    login.signin(true, { username: "none", image: "none" });
}

const getProfile = () => {
    let auth = window.gapi.auth2.getAuthInstance();
    let profile = auth.currentUser.get().getBasicProfile();
    profileChecker(profile);
    return { username: profile.getName(), image: profile.getImageUrl() };
}

const getMeta = () => {
    for (let i = 0; i < 1000; i++) {
        var request = {
            // The ID of the spreadsheet to retrieve metadata from.
            spreadsheetId: apiKey.SheetID,  // TODO: Update placeholder value.

            // The ID of the developer metadata to retrieve.
            metadataId: 0,  // TODO: Update placeholder value.

            auth: window.gapi.auth2.getAuthInstance(),
        };

        window.gapi.client.sheets.spreadsheets.developerMetadata.get(request, function (err, response) {
            if (err) {
                console.error(err);
                return;
            }

            // TODO: Change code below to process the `response` object:
            console.log(JSON.stringify(response, null, 2));
        });
    }

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
                        loadSheets={this.props.loadSheets}
                        signin={(accepted, profile) => { this.props.signedin(accepted, profile) }}
                        getAuth={(auth)=>this.props.getAuth(auth)}
                    />
                ) : (
                        <ApiForm onSubmit={this.handleSubmit} init={this.state} />
                    )}
            </div>
        )
    }
}