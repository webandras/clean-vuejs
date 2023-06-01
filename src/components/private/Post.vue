<template>

    <article class="post card white padding-0-5">
        <h2 class="margin-top-0 fs-24">
            <a :href="url + post.slug" target="_blank">{{ post.title.rendered }}</a>
        </h2>
        <div v-html="post.excerpt.rendered"></div>

        <div class="button-group">
            <button @click="loadPostToEditor" class="primary fs-12">
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
import {setState, state} from "../../state/state";
import axios from "../../api/api";

export default {
    name: "Post",
    data() {
        return {
            url: state.baseUrl,
        }
    },
    props: {
        post: {
            required: true,
        }
    },
    methods: {
        loadPostToEditor() {
            this.$emit('onClickPostEdit', this.$props.post.id);
            setState('editorPost', this.$props.post.id);
        },

        deletePost() {
            // Confirm that user wants to delete post
            const confirm = window.confirm(`Delete Post: "${this.post?.title?.rendered}"`);

            // If user confirms delete then proceed
            if (true === confirm) {
                // Setup the API request
                axios({
                    // Set method to delete
                    method: "delete",
                    // Setup the URL for the post to delete
                    url: state.restUrl + "wp/v2/posts/" + this.post.id,
                })
                    .then(response => {
                        this.$emit('onDeletePost', true);

                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }


    }
}
</script>

<style scoped>

</style>
