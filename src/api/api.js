import axios from "axios";
import Cookies from "js-cookie";
import {state} from "../state/state";

// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Get the token for an authorized request
    const token = Cookies.get(state.token);

    // set headers for all authenticated requests
    if (token) {
        config.headers.Authorization = "Bearer " + token;
    }

    config.headers['Content-Type'] = 'application/json';
    console.log(config)
    return config;
});

export default axios;
