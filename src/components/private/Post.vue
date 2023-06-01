<template>

    <article class="post card white padding-0-5">
        <h2 class="margin-top-0 fs-24">
            <a :href="BASE_URL + post.slug" target="_blank">{{ post.title.rendered }}</a>
        </h2>
        <div v-html="post.excerpt.rendered"></div>

        <div class="button-group">
            <button @click="loadPost" class="primary fs-12">
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
        BASE_URL() { return BASE_URL },
    },

    methods: {
        loadPost() {
            postsStore.loadPost(this.$props.post.id);
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
