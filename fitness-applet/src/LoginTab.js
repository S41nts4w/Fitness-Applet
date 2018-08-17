import React, { Component } from 'react';
import { Button} from 'react-bootstrap';

export class LoginTab extends Component {
    state = {
        user: {
            credentials: "Daniel",
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