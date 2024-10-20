import {reactive} from "vue";
import axios from "../api/api";
import {REST_URL} from "@/constants/constants";

export const authorsStore = reactive({
    authors: [],
    author: {},
    // alert status message, and color
    message: '',
    color: 'success',

    setNotification(message = 'Author saved successfully!', color = 'success') {
        this.message = message;
        this.color = color;
    },

    resetNotification(message = '', color = 'success') {
        this.message = message;
        this.color = color;
    },

    clearAuthor() {
        this.post = {}
    },

    // Get all authors
    getAuthors() {
        axios.get(REST_URL + 'authors')
            .then(({data: authors}) => {
                this.authors = authors.body.authors;
                console.log(this.authors)
            })
    },

    // Get one author by id
    getAuthor(id) {
        axios.get(REST_URL + "authors/" + id)
            .then(response => {
                console.log(response)
                this.author = response.data.body.author;
            }).catch(error => console.error(error));
    },

    createAuthor(author) {
        const request = {
            method: "post",
            url: REST_URL + "authors",
            data: author,
        };

        axios(request)
            .then(response => {
                this.setNotification();
                this.getAuthors();
                this.clearAuthor();
                return true;
            })
            .catch(error => {
                console.error(error);
                this.setNotification('Failed to create the author!', 'danger');
                return false;
            });
    },

    updateAuthor(author, id) {
        if (!id) {
            return false;
        }

        const request = {
            method: "put",
            url: REST_URL + "authors/" + id,
            data: author,
        };

        axios(request)
            .then(response => {
                this.setNotification();
                this.getAuthors();
                this.clearAuthor();
            })
            .catch(error => {
                console.error(error);
                this.setNotification('Failed to update the author!', 'danger');
            });
    },


    deleteAuthor() {
        // Confirm that user wants to delete record
        const confirm = window.confirm(`Delete Author: "${this.author?.title}"`);

        if (true === confirm) {
            axios({
                method: "delete", url: REST_URL + "authors/" + this.author.id,
            })
                .then(response => {
                    this.setNotification('Deleted the author!');
                    this.getAuthors();
                    this.clearAuthor();
                })
                .catch(error => {
                    console.error(error);
                    this.setNotification('Failed to delete the author!', 'danger');
                });
        }
    }

});

