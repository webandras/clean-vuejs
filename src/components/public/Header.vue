<template>
  <header class="page-header">
    <div class="header-content">
      <div class="logo">
        <a href="/" class="brand">
          <img alt="Vue logo" class="logo" src="/src/assets/images/logo.png"/>
          Clean Vue
        </a>
      </div>

      <div class="main-navigation">

        <nav ref="mainMenu" id="main-menu">
          <router-link class="nav-link" :to="{ name: 'Home' }"><i class="fa fa-home" aria-hidden="true"></i>Home</router-link>
          <router-link class="nav-link" :to="{ name: 'Hello' }"><i class="fa fa-home" aria-hidden="true"></i>Hello</router-link>
          <a href="#" class="">Log in</a>
          <a href="#" class="">Register</a>
        </nav>

        <span v-if="isDarkModeOn() === true"
              class="pointer darkmode-toggle"
              rel="button"
              @click="toggleDarkMode"
              :title="isDarkModeOn() ? 'light' : 'dark'"
        >🔆</span>

        <span v-else
              class="pointer darkmode-toggle"
              rel="button"
              @click="toggleDarkMode"
              :title="isDarkModeOn() ? 'light' : 'dark'"
        >🌒</span>

        <div>
          <button @click="toggleOffcanvasMenu"
                  id="hamburger-menu-button"
                  class="primary alt margin-top-0 margin-left-0-5"
                  data-collapse-toggle="navbar-default"
                  type="button"
                  aria-controls="navbar-default"
                  aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <i :class="{ 'fa fa-times' : sidenav, 'fa fa-bars': !sidenav }" aria-hidden="true"></i>
          </button>
          <div class="sidenav relative"
               tabindex="-1"
               ref="offcanvas"
               id="main-menu-offcanvas"
               v-click-outside="closeOnOutsideClick"
          >
            <a href="javascript:void(0)"
               @click="closeOffcanvasMenu"
               class="close-btn fs-18 absolute topright padding-0-5"
            >
              <i class="fa fa-times" aria-hidden="true"></i>
            </a>

            <div ref="mobileMenu" id="mobile-menu"></div>

          </div>

        </div>

      </div>

    </div>
  </header>


</template>

<script>
import clickOutside from "./../../directives/clickOutside";

export default {
  name: "Header",
  directives: {
    clickOutside,
  },
  data() {
    return {
      sidenav: false,
      clickedOutside: false,
      darkMode: localStorage.getItem('darkMode') === 'true',
    };
  },

  watch: {
    darkMode: function ($val) {
      console.log('Setting dark/light mode')
      localStorage.setItem('darkMode', $val);
    },
  },

  methods: {

    /* Offcanvas menu toggle */
    toggleOffcanvasMenu() {
      console.log('toggled menu...')
      if (this.sidenav === true) {
        this.closeOffcanvasMenu();
      } else {
        this.openOffcanvasMenu();
      }
    },


    openOffcanvasMenu() {
      const defaultNavbar = this.$refs.mainMenu;
      const defaultNavbarClone = defaultNavbar.cloneNode(true);

      // delete previous cloned content
      const mobileNav = this.$refs.mobileMenu;
      mobileNav.innerText = '';
      mobileNav.appendChild(defaultNavbarClone);
      this.$refs.offcanvas.style.width = "300px";

      this.sidenav = true;
      this.clickedOutside = false;
    },

    closeOffcanvasMenu() {
      this.$refs.offcanvas.style.width = "0";
      this.$refs.mobileMenu.innerText = '';

      this.sidenav = false;
      this.clickedOutside = false;
    },

    closeOnOutsideClick() {
      // do not close on initial outside (of the sidebar div) click on the hamburger btn
      if (this.sidenav === true && this.clickedOutside === true) {
        this.closeOffcanvasMenu();
      } else {
        this.clickedOutside = true;
      }

    },

    /* Dark mode toggle */
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      this.$emit('darkmodechanged', this.darkMode);
    },
    /* Check if dark mode is on */
    isDarkModeOn() {
      return this.darkMode === true;
    },

    onToggleDarkMode (value) {
      this.$emit('darkmodechanged', value)
    }

  },
}
</script>

<style scoped>

</style>
