import React, { Component } from 'react';

export class LoginTab extends Component {
    state = {
        user: {
            credentials: "dennis.test@mesaic.co",
            accepted: true
        }
    }
    render() {
        return (
            <div>
                <button onClick={() => { this.props.logIn(this.state.user) }}>Login</button>
            </div>
        );
    }
}