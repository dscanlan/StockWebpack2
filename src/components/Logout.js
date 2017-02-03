import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Logout extends Component {
    runLogOut() {
        this.props.logout();
    }
    render() {
        return (
            <div>
                logging out
                {this.runLogOut()}
            </div>
        );
    }
}

export default connect(null, actions)(Logout);
