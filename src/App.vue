<template>
  <div class="spa-container relative" :class="{ dark: this.darkModeOn === true}">
    <Header @darkmodechanged="onDarkModeChange" />

    <router-view/>

    <span v-if="showScrollToTopButton() === true"
          class="light-gray pointer scroll-to-top-button padding-0-5 round"
          role="button" aria-label="To the top button"
          title="Toggle table of content"
          @click="scrollToTop"
    >
        <i class="fa fa-chevron-up" aria-hidden="true"></i>
    </span>
  </div>
</template>


<script>
import {debounce} from "lodash";
import Header from "./components/public/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },

  data() {
    return {
      darkModeOn: false,
      scrollTop: 0,
      threshold: 800,
    }
  },

  mounted() {
    window.addEventListener("wheel",
        this.setScrollToTop);
  },
  beforeMount() {
    window.removeEventListener("wheel", this.setScrollToTop);
  },


  methods: {
    onDarkModeChange(val) {
      console.log(val);
      this.darkModeOn = val;
    },

    scrollToTop() {
      this.scrollTop = 0;
      document.body.scrollTop = 0;
    },

    showScrollToTopButton() {
      return this.scrollTop > this.threshold
    },

    setScrollToTop: debounce(function () {
      this.scrollTop = document.body.scrollTop;
      console.log(document.body.scrollTop);
    }, 300),

  },


}
</script>


<style scoped lang="sass">

</style>
