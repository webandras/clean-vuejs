<template>
    <article class="card white padding-1">
        <h2 class="margin-top-bottom-0 fs-24">{{ postsStore.post?.title }}</h2>
        <small class="badge text-muted border margin-top-0-5">{{ postsStore.post?.genre }}</small>
        <p class="fs-14 italic">{{ $filters.date(postsStore.post?.created_at) }}</p>
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
