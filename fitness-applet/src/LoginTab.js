import React, { Component } from 'react';
import { Button} from 'react-bootstrap';

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
                <Button onClick={() => { this.props.logIn(this.state.user) }}>Login</Button>
            </div>
        );
    }
}