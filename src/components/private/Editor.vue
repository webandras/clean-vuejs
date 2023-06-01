<template>
    <div class="editor">

        <h3 v-if="id !== null">Edit Post</h3>
        <h3 v-else>Add New Post</h3>

        <Alert v-if="postsStore.message !== ''" :showCloseButton="false" :color="postsStore.color">
            {{ postsStore.message }}
        </Alert>


        <form @submit.prevent="createOrUpdatePost">
            <h4>
                <input type="text" v-model="title" name="title" placeholder="Enter title here">
            </h4>
            <QuillEditor :key="id" v-model:content="content" contentType="html" theme="snow"></QuillEditor>

            <div class="button-group margin-top-1">
                <button type="submit" class="primary">Save</button>
                <button @click="initialize" type="button" class="primary alt">Clear all</button>
            </div>
        </form>
        <hr>

    </div>
</template>

<script>
import {QuillEditor} from '@vueup/vue-quill'

import '@vueup/vue-quill/dist/vue-quill.snow.css';

import {postsStore} from "../../store/postsStore";

import Alert from "../clean/Alert.vue";


export default {
    name: "Editor",
    props: {
        postId: {
            required: false,
        }
    },
    components: {
        Alert,
        QuillEditor
    },

    data() {
        return {
            postsStore,
            // Get the post id
            id: null,
            // Get the editor title
            title: '',
            // Get the editor content
            content: '',
            // Set the status to publish
            status: "publish",
        }
    },

    mounted() {
        this.initialize();
            this.id = postsStore.post?.id || null;
            this.title = postsStore.post?.title?.raw || '';
            this.content = postsStore.post?.content?.raw || '';

            window.scrollTo(0, 50);
    },


    methods: {
        initialize() {
            this.id = null;
            this.title = '';
            this.content = '';
            this.alertMessage = '';
            this.alertColor = 'success';
        },


        createOrUpdatePost() {

            // Quick and dirty validation
            if (!this.title || !this.content) {
                postsStore.message = 'All fields are required';
                postsStore.color = 'warning';
                return;
            }

            const post = {
                // Get the editor title
                title: this.title,
                // Get the editor content
                content: this.content,
                // Set the status to publish
                status: "publish"
            };


            // Create new post
            if (this.id === null) {
                postsStore.savePost(post);

                // Clear the editor
                this.initialize();

            } else {
                // Update existing post
                postsStore.updatePost(post, this.id);

                // Clear the editor
                this.initialize();
            }

        },


    }
}
</script>

<style scoped>

</style>
