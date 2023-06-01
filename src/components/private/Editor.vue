<template>
    <div class="editor">

        <h3 v-if="id !== null">Edit Post</h3>
        <h3 v-else>Add New Post</h3>

        <Alert v-if="alertMessage !== ''" :showCloseButton="false" :color="alertColor">
            {{ alertMessage }}
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
import {isEmpty} from "lodash"
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

import axios from "../../api/api";
import {state} from "../../state/state";

import Alert from "../clean/Alert.vue";


export default {
    name: "Editor",
    props: {
        postId: {
            required: true,
        }
    },
    components: {
        Alert,
        QuillEditor
    },

    data() {
        return {
            post: {},
            // Get the post id
            id: null,
            // Get the editor title
            title: '',
            // Get the editor content
            content: '',
            // Set the status to publish
            status: "publish",
            // status message
            alertMessage: '',
            alertColor: 'success',
        }
    },

    watch: {
        postId: function (newPost) {
            if (newPost > 0) {
                this.initialize();
                this.loadPost();
            }
        },
    },

    mounted() {
        this.initialize();

        if (this.isPostIdSet()) {
            this.loadPost();
        }

    },


    methods: {

        initialize() {
            this.post = {};
            this.id = null;
            this.title = '';
            this.content = '';
            this.alertMessage = '';
            this.alertColor = 'success';
        },


        isPostIdSet() {
            return !isEmpty(this.$props.postId)
        },

        createOrUpdatePost() {
            console.table([this.id, this.title, this.content])

            // Quick and dirty validation
            if (!this.title || !this.content) {
                this.alertMessage = 'All fields are required';
                this.alertColor = 'warning';
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

            const request = {
                // Setup method
                method: "post",
                // Setup rest url
                url: state.restUrl + "wp/v2/posts",
                // Setup the post object to send
                data: post,
                //  Headers are setup up in the interceptor of axios
            };


            // Create new post
            if (this.id === null) {
                // Save post
                axios(request)
                    .then(response => {
                        // Clear the editor
                        this.initialize();

                        this.alertMessage = 'Post saved successfully!';
                        this.alertColor = 'success';

                        this.$emit('onCreateOrUpdatePost', true);

                    })
                    .catch(error => {
                        console.error(error);
                    });
            } else {

                // Update existing post
                request.method = 'put';
                request.id = this.id
                request.url = state.restUrl + "wp/v2/posts/" + this.id;

                // Update existing post
                axios(request)
                    .then(response => {
                        // Clear the editor
                        this.initialize();

                        this.alertMessage = 'Post saved successfully!';
                        this.alertColor = 'success';

                        this.$emit('onCreateOrUpdatePost', true);
                    })
                    .catch(error => {
                        console.error(error);
                    });

            }

        },

        loadPost() {
            axios.get(
                state.restUrl + "wp/v2/posts/" + state.editorPost, {
                    params: {
                        context: 'edit'
                    },
                }
            ).then(response => {
                window.scrollTo(0, 50);

                const post = response.data;

                this.id = post?.id || null;
                this.title = post?.title?.raw || '';
                this.content = post?.content?.raw || '';

            }).catch(error => console.error(error));
        }
    }
}
</script>

<style scoped>

</style>
