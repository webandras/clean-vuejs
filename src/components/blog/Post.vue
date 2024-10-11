<template>
    <article class="post card white padding-1">
        <h2 class="margin-top-0 fs-24">
            <RouterLink :to="{ name: 'Blogpost', params: { id: post.id }}">{{ post.title }}</RouterLink>
        </h2>
        <p>{{ $filters.excerpt(post.body, 120) }}</p>
        <hr>
        <div class="button-group">
            <button @click="() => loadPost(post.id)" class="primary fs-12">
                <font-awesome-icon :icon="['fas', 'pencil-alt']"/>
                Edit
            </button>
            <button @click="deletePost" class="danger fs-12">
                <font-awesome-icon :icon="['fas', 'trash']"/>
                Delete
            </button>
        </div>
    </article>
</template>

<script>
import router from "@/router";
import {postsStore} from "@/store/postsStore";

export default {
    name: "Post",
    props: {
        post: {
            required: true,
        }
    },

    data() {
        return {
            postsStore
        }
    },

    methods: {
        loadPost() {
            postsStore.getPost(this.$props.post.id);
            router.push({path: `/post/editor`});
        },

        deletePost() {
            postsStore.post = this.$props.post
            postsStore.deletePost();
        }
    }
}
</script>

<style scoped>

</style>
