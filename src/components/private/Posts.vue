<template>
    <div class="posts">
        <div class="grid">
            <Post @onDeletePost="getPosts" @onClickPostEdit="getSelectedPost($event)" v-for="post in posts" :key="post.id" :post="post"></Post>
        </div>
    </div>
</template>

<script>
import Post from "./Post.vue";
import axios from "../../api/api";
import {state} from "../../state/state";

export default {
    name: "Posts",
    props: {
        reload: {
            required: false
        }
    },
    data() {
        return {
            posts: {},
            params: [],
        }
    },
    components: {
        Post,
    },

    mounted() {
        this.getPosts();
    },

    watch: {
        reload: function() {
            this.getPosts();
        }
    },

    methods: {

        getSelectedPost($event) {
            this.$emit('onPostEdit', $event);
        },

        // fetch latest 10 posts from WP REST API
        getPosts() {
            axios.get(state.restUrl + 'wp/v2/posts', {
                params: {
                    per_page: 10
                }
            }).then(({data: posts}) => {
                console.log(posts);
                this.posts = posts;
            })
        }

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
