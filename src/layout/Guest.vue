<template>
    <section class="spa-container relative" :class="{ dark: this.darkModeOn === true}">
        <Header @darkmodechanged="onDarkModeChange"/>

        <section class="container container-sm">
            <slot></slot>
        </section>

        <button v-if="showScrollToTopButton() === true"
                class="light-gray pointer scroll-to-top-button padding-0-5 round"
                role="button" aria-label="To the top button"
                title="Toggle table of content"
                @click="scrollToTop"
        >
            <font-awesome-icon :icon="['fas', 'chevron-up']"/>
        </button>

        <Footer/>
    </section>
</template>

<script>
import {debounce} from "lodash";
import Header from "./../components/Header.vue";
import Footer from "./../components/Footer.vue";

export default {
    name: "Guest",
    components: {
        Header,
        Footer
    },

    data() {
        return {
            darkModeOn: localStorage.getItem('darkMode') === 'true',
            scrollTop: 0,
            threshold: 800,
        }
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
            this.darkModeOn = val;
        },

        // to the top
        scrollToTop() {
            this.scrollTop = 0;
            window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop = 0;
        },

        // only show the button if scrolled over the threshold
        showScrollToTopButton() {
            return this.scrollTop > this.threshold
        },

        // delay invoking the method (only invokes the last callback after the timeout to have less function calls)
        setScrollToTop: debounce(function () {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        }, 300),

    },
}
</script>

<style scoped>

</style>
