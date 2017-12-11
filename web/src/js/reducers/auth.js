import axios from "axios"

const initialState = {
    loggedIn: false,
    token: null,
    currentlySending: false,
    id: null,
    email: null,
    name: null,
    imgUrl: null
};

const CHANGE_FORM = 'CHANGE_FORM';
const SET_AUTH = 'SET_AUTH';
const SENDING_REQUEST = 'SENDING_REQUEST';
const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
const SET_CLAIMS = "SET_CLAIMS";
const SET_TOKEN = "SET_TOKEN";
const ACTIVATE_USER = "ACTIVATE_USER";

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_FORM:
            return {...state, email: action.email};
        case SET_AUTH:
            return {...state, loggedIn: action.newState};
        case SENDING_REQUEST:
            return {...state, currentlySending: action.sending};
        case SET_ERROR_MESSAGE:
            //error(action.message);
            return {...state, errorMessage: action.message};
        case SET_CLAIMS:
            const {claims} = action;
            console.log("Claims:", claims);
            const {id, email, name, imgUrl} = claims || {};

            return {...state, id, email, name, imgUrl};
        case SET_TOKEN:
            const {token, rememberMe} = action;
            if (rememberMe) {
                localStorage.wantedlyToken = token;
            }
            return {...state, token};

        default:
            return state
    }
}

export const init = () => (dispatch, getState) => {
    const token = localStorage.wantedlyToken;
    if (token && token.indexOf(".") > 0) {
        const claims = decodeToken(token);
        dispatch(setClaims(claims));
        dispatch(setToken(token));
        dispatch(setAuthState(true));
        //checkAuth(dispatch, getState);
    }
};

/**
 * Logs an userId in
 * @param  {string} email The name of the userId to be logged in
 * @param  {string} password The password of the userId to be logged in
 * @param  {bool}   rememberMe Whether the userId should be remembered in localStorage
 */
export const login = (email, password, rememberMe) => dispatch => {
    // Show the loading indicator, hide the last error
    dispatch(sendingRequest(true));

    postLogin(email, password, (result, err) => {
        if (!err) {
            const {token, claims} = result;
            localStorage.wantedlyToken = token;
            localStorage.wantedlyEmail = email;
            dispatch(setClaims(claims));
            dispatch(setToken(token, rememberMe));
            dispatch(changeForm(email));
        } else console.error(err);
        dispatch(sendingRequest(false));
        dispatch(setAuthState(err === null));
    });
};


const postLogin = (email, password, callback) => {
    axios.post('/login', {email: email, password})
        .then(response => {
            // If the userId was authenticated successfully, save the token to the localStorage
            if (response.data) {
                const token = response.data;
                const claims = decodeToken(token);
                callback({token, claims}, null);
            } else {
                // If there was a problem authenticating the userId, show an error on the form
                callback(false, response.error);
            }
        }).catch(error => callback(false, error));
};

/**
 * Checks if anybody is logged in
 * @return {boolean} True if there is a logged in userId, false if there isn't
 */
const loggedIn = () => !!localStorage.wantedlyToken && localStorage.wantedlyToken !== "undefined";

const decodeToken = (token) => {
    const firstIndex = token.indexOf(".");
    const lastIndex = token.lastIndexOf(".");
    const toDecode = token.substring(firstIndex + 1, lastIndex);
    const decoded = window.atob(toDecode);
    console.log(decoded, token);
    return JSON.parse(decoded)
};

/**
 * Logs the current userId out
 */
export const logout = () => dispatch => {
    delete localStorage.wantedlyToken;
    delete localStorage.wantedlyEmail;
    dispatch(changeForm(''));
    dispatch(setAuthState(false));
    dispatch(setClaims(null, null));
    dispatch({type: "RESET"});
};

/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a userId is logged in, false means no userId is logged in
 */
export const setAuthState = newState => ({type: SET_AUTH, newState});


/**
 * Sets the form state
 * @param  {string} email The new text of the name input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export const changeForm = email => ({type: CHANGE_FORM, email});

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export const sendingRequest = sending => ({type: SENDING_REQUEST, sending});

export const setClaims = claims => ({type: SET_CLAIMS, claims});

export const setToken = (token, rememberMe) => ({type: SET_TOKEN, token, rememberMe});