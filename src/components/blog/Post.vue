<template>
    <article class="post card white padding-0-5">
        <h2 class="margin-top-0 fs-24">
            <RouterLink :to="{ name: 'Blogpost', params: { id: post.id }}">{{ post.title }}</RouterLink>
        </h2>
        <div v-html="post.body"></div>
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
import {BASE_URL} from "../../constants/constants";
import {postsStore} from "../../store/postsStore";
import router from "@/router";

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

    computed: {
        BASE_URL() {
            return BASE_URL
        },
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
