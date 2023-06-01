<template>
    <div class="spa-container relative" :class="{ dark: this.darkModeOn === true}">
        <Header :userLoggedIn="userLoggedIn" @darkmodechanged="onDarkModeChange" @onLogout="logout"/>

        <component :is="layout">
            <router-view :layout.sync="layout" @onUserLoggedIn="onUserLoggedIn"/>
        </component>

        <span v-if="showScrollToTopButton() === true"
              class="light-gray pointer scroll-to-top-button padding-0-5 round"
              role="button" aria-label="To the top button"
              title="Toggle table of content"
              @click="scrollToTop"
        >
        <font-awesome-icon :icon="['fas', 'chevron-up']" />
    </span>

        <Footer/>
    </div>
</template>


<script>
import {debounce} from "lodash";
import Cookies from "js-cookie";

import {isAuthenticated, setState, state} from "./state/state";
import router from "./router";

import Guest from "./layout/Guest.vue";
import Header from "./components/public/Header.vue";
import Footer from "./components/public/Footer.vue";
import {markRaw} from "vue";


export default {
    name: "App",
    components: {
        Footer,
        Header,
    },

    data() {
        return {
            layout: markRaw(Guest),
            darkModeOn: localStorage.getItem('darkMode') === 'true',
            userLoggedIn: isAuthenticated(),
            scrollTop: 0,
            threshold: 800,
        }
    },


    created() {
        this.$emit('update:layout', Guest);
    },


    beforeMount() {
        // remove previous
        window.removeEventListener("wheel", this.setScrollToTop);
    },

    mounted() {
        // listen to scroll event
        window.addEventListener("wheel",
            this.setScrollToTop);
    },


    methods: {
        // change in dark/light mode (event emitted from Header -> observed here)
        onDarkModeChange(val) {
            console.log(val);
            this.darkModeOn = val;
        },

        onUserLoggedIn(val) {
            this.userLoggedIn = val;
        },

        // to the top
        scrollToTop() {
            this.scrollTop = 0;
            document.body.scrollTop = 0;
        },

        // only show the button if scrolled over the threshold
        showScrollToTopButton() {
            return this.scrollTop > this.threshold
        },

        // delay invoking the method (only invokes the last callback after the timeout to have less function calls)
        setScrollToTop: debounce(function () {
            this.scrollTop = document.body.scrollTop;
            console.log(document.body.scrollTop);
        }, 300),


        // Logout user (event emitted from Logout -> Header -> observed here)
        logout(logoutUser) {
            console.log(logoutUser);
            if (logoutUser === true) {

                // delete JWT token, set state
                Cookies.remove(state.token, {secure: true});
                setState('loggedIn', false);
                setState('message', 'Successful logout.')
                this.userLoggedIn = false;

                // redirect to login page
                router.push({name: 'Login'});
            }

        }

    },


}
</script>


<style scoped lang="sass">

</style>
