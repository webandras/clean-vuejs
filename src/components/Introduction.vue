<script setup>
defineProps({
    msg: {
        type: String,
        required: true
    }
})
</script>

<template>
    <h1 class="uppercase margin-top-0 margin-bottom-0-5">{{ msg }}</h1>
    <div class="card padding-1 margin-bottom-2">
        <h2 class="margin-top-bottom-0 h4 text-muted">The Vue.js frontend for my REST API written in Rust (using Rocket
            + Diesel + PostgreSQL).</h2>
    </div>
</template>

<style scoped>

</style>
