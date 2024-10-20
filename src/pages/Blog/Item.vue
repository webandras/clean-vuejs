<template>
    <article class="card white padding-1">
        <h2 class="margin-top-bottom-0 fs-24">{{ postsStore.post?.title }}</h2>
        <p class="fs-14 text-muted margin-top-0">
            Written by {{ postsStore.post?.author?.firstname + ' ' + postsStore.post?.author?.lastname }},
            at {{ $filters.date(postsStore.post?.created_at) }}
        </p>
        <div v-html="postsStore.post?.body"></div>
        <hr class="text-muted">
        <small class="badge text-muted border margin-top-0-5">{{ postsStore.post?.genre }}</small>
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
