<template>
    <div class="posts">
        <RouterLink :to="{ name: 'BlogEditor' }" class="button primary">Add new</RouterLink>
        <hr>

        <div class="grid">
            <Post v-for="post in postsStore.posts" :key="post.id" :post="post"></Post>
        </div>
    </div>
</template>

<script>
import {postsStore} from "@/store/postsStore";
import Post from "./Post.vue";
import Alert from "@/components/clean/Alert.vue";

export default {
    name: "Posts",
    components: {
        Alert,
        Post,
    },
    data() {
        return {
            postsStore,
            params: [],
        }
    },

    mounted() {
        postsStore.getPosts();
        postsStore.clearPost();
    },
}
</script>

<style scoped lang="sass">
.posts
    .grid
        display: grid
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr))
        row-gap: 2em
        column-gap: 1em
</style>
