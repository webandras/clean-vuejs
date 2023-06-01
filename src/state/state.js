import Cookies from "js-cookie";

// Set state object with values that are changed programmatically
const state = {
    loggedIn: false,
    baseUrl: "https://www.gulacsiandras.hu/",
    restUrl: "https://www.gulacsiandras.hu/wp-json/",
    token: "wp-token",
    siteName: 'XXXXXXX',
    siteDescription: 'YYYYYY',
    posts: null,
    post: null,
    editorPost: null,
    message: '',
};
/**
 * Handles updating the state
 *
 * @param {string} toSet The property from state to set
 * @param {*} newValue The new value to set
 */
const setState = (toSet, newValue) => {
    state[toSet] = newValue;
};

const getState = (property) => {
    return state[property];
};


const isAuthenticated = () => Cookies.get(state.token) !== undefined;



export {isAuthenticated, state, setState, getState};
