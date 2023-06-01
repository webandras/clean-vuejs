import {reactive} from "vue";
import Cookies from "js-cookie";
import router from "../router";

// Set state object with values that are changed programmatically
export const authStore = reactive({
    loggedIn: false,
    baseUrl: "https://www.gulacsiandras.hu/",
    restUrl: "https://www.gulacsiandras.hu/wp-json/",
    token: "wp-token",
    siteName: '',
    siteDescription: '',
    message: '',


    // logs in the user
    login(token) {
        Cookies.set(this.token, token, {
            expires: 1, // 1 day expiration of token
            secure: true
        });
        this.loggedIn = true;
    },

    // logs out the user
    logout() {
        // delete JWT token
        Cookies.remove(this.token, {secure: true});
        this.loggedIn = false;
        this.message = 'Successful logout.';

        // redirect to login page
        return router.push({name: 'Login'});
    },

    // checks if user is authenticated
    isAuthenticated() {
        return Cookies.get(this.token) !== undefined;
    }


});

