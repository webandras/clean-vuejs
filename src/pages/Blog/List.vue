<template>
    <main>
        <HelloWorld msg="My blog"/>
        <Posts></Posts>
    </main>
</template>

<script>
import Alert from "../../components/clean/Alert.vue";
import HelloWorld from './../../components/HelloWorld.vue'
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
        HelloWorld,
    },
}
</script>


<style scoped lang="sass">

</style>
