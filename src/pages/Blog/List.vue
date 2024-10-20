<template>
    <main class="content-800 margin-left-right-auto">
        <Alert v-if="postsStore.message !== ''" :showCloseButton="false" :color="postsStore.color" :heading="postsStore.message">
            {{ postsStore.message }}
        </Alert>

        <Introduction msg="My blog"></Introduction>

        <Posts></Posts>
    </main>
</template>

<script>
import Alert from "../../components/clean/Alert.vue";
import Introduction from './../../components/Introduction.vue'
import Posts from "./../../components/blog/Posts.vue";
import Editor from "./../../components/blog/Editor.vue";
import {postsStore} from "@/store/postsStore";

export default {
    name: "List",
    computed: {
        postsStore() {
            return postsStore
        }
    },
    components: {
        Editor,
        Posts,
        Alert,
        Introduction,
    },
}
</script>


<style scoped lang="sass">

</style>
