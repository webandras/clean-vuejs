<template>

    <div class="logout">
        <form @submit.prevent="onLogout">
            <button type="submit" class="logout-button button submit">
                <i class="fa fa-sign-out" aria-hidden="true"></i>
                Logout
            </button>
        </form>
    </div>

</template>

<script>

export default {
    name: "Logout",
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
