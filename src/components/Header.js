import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Header extends Component {
    renderLinks() {
        if (this.props.authenticated) {
            return (<li className="nav-item">
                <Link className="nav-link" to="/Logout">Log Out</Link>
            </li>);
        } 
        return [
            <li className="nav-item" key={1}>
                <Link className="nav-link" to="/Login">Login In</Link>
            </li>
        ];     
    }

    render() {
        return (
            <nav className="navbar navbar-light">
                <Link to="/" className="navbar-brand">Redux Auth</Link>
                <ul className="nav navbar-nav">
                    {this.renderLinks()}
                </ul>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.loginReducer.authenticated
    };
}

export default connect(mapStateToProps)(Header);
