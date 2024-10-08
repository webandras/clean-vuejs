<template>
    <section class="editor content-600">
        <h3 v-if="id !== null">Edit Post</h3>
        <h3 v-else>Add New Post</h3>

        <Alert v-if="postsStore.message !== ''" :showCloseButton="false" :color="postsStore.color">
            {{ postsStore.message }}
        </Alert>

        <form @submit.prevent="createOrUpdatePost">
            <input type="text" v-model="title" name="title" placeholder="Enter title here" class="margin-bottom-1">

            <QuillEditor :key="id" v-model:content="body" contentType="html" theme="snow"></QuillEditor>

            <div class="button-group margin-top-1">
                <button type="submit" class="primary">Save</button>
                <button @click="clear" type="button" class="primary alt">Clear all</button>
            </div>
        </form>
        <hr>
    </section>
</template>

<script>
import {QuillEditor} from '@vueup/vue-quill'
import {postsStore} from "../../store/postsStore";
import Alert from "../clean/Alert.vue";
import '../../assets/css/vue-quill.snow.css';
import Modal from "@/components/clean/Modal.vue";

export default {
    name: "Editor",
    props: {
        postId: {
            required: false,
        }
    },
    components: {
        Modal,
        Alert,
        QuillEditor
    },

    data() {
        return {
            postsStore,
            id: null,
            title: '',
            body: '',
            genre: "test",
            published: true,
        }
    },

    mounted() {
        this.initialize();
        window.scrollTo(0, 50);
    },

    methods: {
        clear() {
            postsStore.clearPost();
            this.initialize();
        },

        initialize() {
            this.id = postsStore.post?.id || null;
            this.title = postsStore.post?.title || '';
            this.body = postsStore.post?.body || '';
        },

        createOrUpdatePost() {
            if (!this.title || !this.body) {
                postsStore.message = 'All fields are required';
                postsStore.color = 'warning';
                return;
            }

            const post = {
                title: this.title,
                body: this.body,
                genre: "teszt",
                published: true
            };

            // Create or update post
            if (!this.id) {
                postsStore.createPost(post);
                this.initialize();
            } else {
                postsStore.updatePost(post, this.id);
                this.initialize();
            }
        },

    }
}
</script>

<style scoped>

</style>
