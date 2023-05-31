<template>

    <div class="logout">
        <form @submit.prevent="onLogout">
            <button type="submit" class="logout-button button submit">
                <font-awesome-icon :icon="['fas', 'sign-in-alt']" />
                Logout
            </button>
        </form>
    </div>

</template>

<script>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
export default {
    name: "Logout",
    components: {FontAwesomeIcon},
    methods: {
        onLogout() {
            this.$emit('onLogout', true)
        },
    },


}


</script>

<style scoped lang="sass">
.logout
    position: relative
    top: -2px

    button[type="submit"]
        margin-top: 0
</style>
