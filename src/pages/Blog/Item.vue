<template>
    <article class="card white padding-0-5">
        <h2 class="margin-top-0 fs-24">{{ postsStore.post?.title }}</h2>
        <div v-html="postsStore.post?.body"></div>
    </article>
</template>

<script>
import {postsStore} from "@/store/postsStore";

export default {
    name: "Item",
    data() {
        return {
            postsStore
        }
    },

    mounted() {
        postsStore.getPost(this.$route.params.id)
    },

}
</script>

<style scoped lang="sass">

</style>
