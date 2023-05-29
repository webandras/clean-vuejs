<template>
  <footer class="page-footer">
    <div class="footer-content">

      <nav>

        <a href="/" class="">Home</a>
        <a href="/login" class="">Log in</a>
        <a href="/register" class="">Register</a>

      </nav>

      <small>&copy; 2023 Gulácsi András. All rights reserved!</small>
    </div>
  </footer>

</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      scrollTop: 0,
    }
  },
  methods: {
    setScrollToTop() {
      this.scrollTop = document.body.scrollTop;
    },

    scrollToTop() {
      document.body.scrollTop = 0;

    },

  },
}
</script>

<style scoped>

</style>
