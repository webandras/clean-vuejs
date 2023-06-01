<template>
    <div class="dashboard">
        <h1>Dashboard - Posts</h1>

        <div class="dashboard-container">
            <aside>
                <Editor :key="postsStore.post"></Editor>
            </aside>
            <main>
                <Posts></Posts>
            </main>

        </div>
    </div>

</template>

<script>
import Posts from "../../components/private/Posts.vue";
import Editor from "../../components/private/Editor.vue";

import {postsStore} from "../../store/postsStore";

export default {
    name: "Dashboard",
    data() {
        return {
            postsStore,
            postsChanged: false,
        }
    },
    components: {
        Posts,
        Editor
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
