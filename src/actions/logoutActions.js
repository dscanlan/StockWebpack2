import { browserHistory } from 'react-router'; 
import { UNAUTH_USER } from './loginTypes';
import { clearUserDetails } from './db/dbActions';

export function clearUserDetail() {
    return function (dispatch) {
        dispatch({ type: UNAUTH_USER });
    };
}
