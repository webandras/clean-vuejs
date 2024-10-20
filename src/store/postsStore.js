import {reactive} from "vue";
import axios from "../api/api";
import {REST_URL} from "@/constants/constants";

// Set state object with values that are changed programmatically
export const postsStore = reactive({
    posts: {},
    post: {},
    // status message and color for the alerts
    message: '', color: 'success',

    setNotification(message = 'Post saved successfully!', color = 'success') {
        this.message = message;
        this.color = color;
    },

    resetNotification(message = '', color = 'success') {
        this.message = message;
        this.color = color;
    },

    clearPost() {
        this.post = {}
    },

    // Get all posts
    getPosts() {
        axios.get(REST_URL + 'posts')
            .then(({data: posts}) => {
                this.posts = posts.body.posts;
                console.log(this.posts)
            })
    },

    // Get one post by id
    getPost(id) {
        axios.get(REST_URL + "posts/" + id)
            .then(response => {
                console.log(response)
                this.post = response.data.body.post;
            }).catch(error => console.error(error));
    },

    createPost(post) {
        const request = {
            method: "post", url: REST_URL + "posts", data: post,
        };

        // Save post
        axios(request)
            .then(response => {
                this.setNotification();
                this.getPosts();
                this.clearPost();
                return true;
            })
            .catch(error => {
                console.error(error);
                this.setNotification('Failed to create the post!', 'danger');
                return false;
            });
    },

    updatePost(post, id) {
        if (!id) {
            return false;
        }

        const request = {
            method: "put", url: REST_URL + "posts/" + id, data: post,
        };

        axios(request)
            .then(response => {
                this.setNotification();
                this.getPosts();
                this.clearPost();
            })
            .catch(error => {
                console.error(error);
                this.setNotification('Failed to update the post!', 'danger');
            });
    },


    deletePost() {
        // Confirm that user wants to delete post
        const confirm = window.confirm(`Delete Post: "${this.post?.title}"`);

        if (true === confirm) {
            axios({
                method: "delete", url: REST_URL + "posts/" + this.post.id,
            })
                .then(response => {
                    this.setNotification('Deleted the post!');
                    this.getPosts();
                    this.clearPost();
                })
                .catch(error => {
                    console.error(error);
                    this.setNotification('Failed to delete the post!', 'danger');
                });
        }
    }

});

