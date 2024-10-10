<script setup>
defineProps({
    msg: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="card padding-1 margin-bottom-2">
        <h1 class="margin-top-bottom-0 h3 text-muted">The Vue.js frontend for my REST API written in Rust (using Rocket + Diesel + PostgreSQL).</h1>
    </div>

    <h3 class="uppercase">{{ msg }}</h3>
</template>

<style scoped>

</style>
