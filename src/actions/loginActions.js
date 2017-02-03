import { browserHistory } from 'react-router'; 
import { UNAUTH_USER, AUTH_USER } from './loginTypes';

export function login({ email, password }) {
    return function (dispatch) {
        dispatch({ type: AUTH_USER, authenticated: true, message: 'Logged In Successfully!!' });
        browserHistory.push('/feature');
    };
}


export function logout() {
    return function (dispatch) {
        dispatch({ type: UNAUTH_USER });
        browserHistory.push('/');
    };
}
