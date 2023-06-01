<template>
    <div class="dashboard">
        <h1>Dashboard - Posts</h1>

        <div class="dashboard-container">
            <aside>
                <Editor @onCreateOrUpdatePost="postCreatedOrUpdated($event)" :post-id="postIdForTheEditor"></Editor>
            </aside>
            <main>
                <Posts :reload="postsChanged" @onPostEdit="getPostForEditor($event)"></Posts>
            </main>

        </div>
    </div>

</template>

<script>
import Posts from "../../components/private/Posts.vue";
import Editor from "../../components/private/Editor.vue";
import {isEmpty} from "lodash";

export default {
    name: "Dashboard",
    data() {
        return {
            postIdForTheEditor: null,
            postsChanged: false,
        }
    },
    components: {
        Posts,
        Editor
    },
    methods: {
        getPostForEditor($event) {
            this.postIdForTheEditor = $event;
        },

        postCreatedOrUpdated($event) {
            this.postsChanged = $event;
        }
    },

    watch: {
        postIdForTheEditor: function (newPostId) {
            this.postIdForTheEditor = !isEmpty(newPostId) ? newPostId : this.postIdForTheEditor;

        }
    },
}
</script>

<style scoped lang="sass">

.dashboard
    .dashboard-container
        display: flex
        flex-direction: row
        flex-wrap: wrap
        gap: 2em

        aside
            width: 400px
            @media screen and (max-width: 700px)
                width: 100%

        main
            width: calc(100% - 432px)
            @media screen and (max-width: 900px)
                width: 100%

</style>
