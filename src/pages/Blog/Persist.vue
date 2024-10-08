<template>
    <Editor :key="postsStore.post.id"></Editor>
</template>

<script>
import {postsStore} from "@/store/postsStore";
import Editor from "@/components/blog/Editor.vue";

export default {
    name: "Persist",
    components: {Editor},
    data() {
        return {
            postsStore
        }
    },
}
</script>

<style scoped lang="sass">

</style>
