import {reactive} from "vue";

import axios from "../api/api";

import {REST_URL} from "../constants/constants";

// Set state object with values that are changed programmatically
export const postsStore = reactive({
    posts: {},
    post: null,

    // status message and color for the alerts
    message: '',
    color: 'success',


    setNotification(message = 'Post saved successfully!', color = 'success') {
        this.message = message;
        this.color = color;
    },


    // Get latest 10 posts from the WP REST API
    getPosts() {
        axios.get(REST_URL + 'wp/v2/posts', {
            params: {
                per_page: 10
            }
        }).then( ({data: posts}) => {
            console.log(posts);
            this.posts = posts;
        })
    },


    // Get one post by id
    loadPost(id) {
        axios.get(REST_URL + "wp/v2/posts/" + id, {
                params: {
                    context: 'edit'
                },
            }
        ).then(response => {
            this.post = response.data;
        }).catch(
            error => console.error(error)
        );
    },


    // Save new post
    savePost(post) {

        const request = {
            // Setup method
            method: "post",
            // Setup rest url
            url: REST_URL + "wp/v2/posts",
            // Setup the post object to send
            data: post,
            //  Headers are setup up in the interceptor of axios
        };

        // Save post
        axios(request)
            .then(response => {
                this.setNotification();
                this.getPosts();
                return true;
            })
            .catch(error => {
                console.error(error);
                this.setNotification('Failed to save the post!', 'danger');
                return false;
            });
    },


    // Update existing post
    updatePost(post, id) {

        if (!id) {
            return false;
        }

        const request = {
            // Setup method
            method: "put",
            // Setup rest url
            url: REST_URL + "wp/v2/posts/" + id,
            // Setup the post object to send
            data: post,
            //  Headers are setup up in the interceptor of axios
        };


        // Update existing post
        axios(request)
            .then(response => {
                this.setNotification();
                this.getPosts();
                this.post = null;
                return true;
            })
            .catch(error => {
                console.error(error);
                this.setNotification('Failed to save the post!', 'danger');
                return false;
            });
    },


    // Deletes one post
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
                url: REST_URL + "wp/v2/posts/" + this.post.id,
            })
                .then(response => {
                    this.setNotification('Deleted the post!');
                    this.getPosts();
                    this.post = null;
                    return true;

                })
                .catch(error => {
                    console.error(error);
                    this.setNotification('Failed to delete the post!', 'danger');
                    return false;
                });
        }
    }

});

