<template>
    <section class="editor content-600 margin-left-right-auto">
        <RouterLink :to="{ name: 'Blog' }">&laquo Go back</RouterLink>

        <h3 v-if="id !== null">Edit Post</h3>
        <h3 v-else>Add New Post</h3>

        <Alert v-if="postsStore.message !== ''" :showCloseButton="false" :color="postsStore.color">
            {{ postsStore.message }}
        </Alert>

        <form @submit.prevent="createOrUpdatePost" class="margin-bottom-3">
            <input type="text" v-model="title" name="title" placeholder="Enter title here" class="margin-bottom-1">

            <QuillEditor :key="quillId" v-model:content="body" contentType="html" theme="snow"></QuillEditor>

            <label for="genre">Genre</label>
            <input id="genre" type="text" v-model="genre" name="genre">

            <label for="published" class="margin-bottom-1">
                <input id="published" type="checkbox" v-model="published" name="published">Is it public?
            </label>

            <select v-model="authorId" name="author_id">
                <option :value="null" :selected="authorId === null">Choose the author...</option>
                <option v-for="author in authorsStore.authors" :value="author.id" :selected="author.id === authorId" >{{ author && (author.firstname + ' ' + author.lastname )}}</option>
            </select>

            <hr>

            <div class="button-group margin-top-1">
                <button type="submit" class="primary">Save</button>
                <button @click="back" type="button" class="primary alt">Cancel</button>
            </div>
        </form>

    </section>
</template>

<script>
import {QuillEditor} from '@vueup/vue-quill'
import router from "@/router";
import {postsStore} from "@/store/postsStore";
import {authorsStore} from "@/store/authorsStore";
import Modal from "@/components/clean/Modal.vue";
import Alert from "../clean/Alert.vue";
import '../../assets/css/vue-quill.snow.css';

export default {
    name: "Editor",
    components: {
        Modal,
        Alert,
        QuillEditor
    },

    data() {
        return {
            quillId: 0,
            postsStore,
            authorsStore,
            id: null,
            title: '',
            body: '',
            genre: '',
            published: false,
            authorId: null,
        }
    },

    mounted() {
        this.initialize();
    },

    methods: {
        back() {
            router.push({name: 'Blog'})
        },

        initialize() {
            this.quillId++;
            this.id = postsStore.post?.id || null;
            this.title = postsStore.post?.title || '';
            this.body = postsStore.post?.body || '';
            this.genre = postsStore.post?.genre || '';
            this.published = postsStore.post?.published || false;
            this.authorId = postsStore.post?.author?.id || null;
            this.authorsStore.getAuthors();
            postsStore.resetNotification();
        },

        createOrUpdatePost() {
            if (!this.title || !this.body || !this.genre) {
                postsStore.message = 'All fields are required';
                postsStore.color = 'warning';
                return;
            }

            const post = {
                title: this.title,
                body: this.body,
                genre: this.genre,
                published: this.published,
                author_id: this.authorId
            };

            console.log(post)

            // Create or update post
            !this.id ? postsStore.createPost(post) : postsStore.updatePost(post, this.id);

            this.initialize();
            this.back();
        },

    }
}
</script>

<style scoped>

</style>
