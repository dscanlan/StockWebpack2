import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from '../actions/loginTypes';

const initialState = {
    authenticated: false, 
    error: ''
};

export default function (state = initialState, action) {
    switch (action.type) {

        case AUTH_USER: 
            return { ...state, authenticated: true, userdetails: action.userDetails, error: '' };

        case UNAUTH_USER:
            return { ...state, authenticated: false, error: '' };
        
        case AUTH_ERROR:
            return { ...state, authenticated: false, error: action.error };
        
        case FETCH_MESSAGE:
            return { ...state, message: action.payload };

        default: 
            return { ...state };
    }
}
