<script setup>
defineProps({
    msg: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="panel success white">
        <h1>{{ msg }}</h1>
        <h3>The Vue.js frontend for my REST API written in Rust (using Rocket + Diesel).</h3>
    </div>
</template>

<style scoped>

</style>
