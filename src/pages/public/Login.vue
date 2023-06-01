<template>

    <div class="login">
        <h3>Login</h3>

        <Alert v-if="isShowAlert() === true" :color="alertColor" :heading="''">
            {{ setAlert() }}
        </Alert>

        <form @submit.prevent="initLogin">
            <label for="username">Username</label>
            <input id="username" type="text" name="username" v-model="username">

            <label for="password">Password</label>
            <input id="password" type="password" name="password" v-model="password">

            <button id="login-button" type="submit" class="primary submit">Login</button>
        </form>
    </div>

</template>

<script>
import axios from "axios";
import {authStore} from "../../store/authStore";

import Guest from "../../layout/Guest.vue";
import Alert from "../../components/clean/Alert.vue";
import router from "../../router";

export default {
    name: "Login",
    components: {
        Alert
    },
    data() {
        return {
            authStore,
            password: '',
            username: '',
            alertMessage: '',
            alertColor: 'danger',
            alertHeading: '',

        }
    },

    props: {
        message: {
            type: String,
            required: false,
        }
    },

    created() {
        this.$emit('update:layout', Guest);
    },


    mounted() {
        this.username = import.meta.env.VITE_USERNAME;
        this.password = import.meta.env.VITE_PASSWORD;
        this.alertColor = '';
        this.alertHeading = '';
    },
    methods: {
        initLogin() {
            const credentials = {
                username: this.username,
                password: this.password
            };


            axios({
                method: "POST",
                url: authStore.restUrl + 'jwt-auth/v1/token',
                data: JSON.stringify(credentials),
                headers: {"Content-Type": "application/json"}

            }).then(response => {
                if (200 === response.status) {
                    console.log(response);

                    // log in the user
                    authStore.login(response.data.token)
                    // redirect to homepage
                    router.push({name: 'Home'});
                }
            }).catch(error => {
                this.alertMessage = error.message;
                console.error(error.message);
            });
        },

        isShowAlert() {
            return this.alertMessage !== '' || authStore.message !== '';
        },

        setAlert() {
            if (this.alertMessage !== '') {
                this.alertColor = 'danger';
                return this.alertMessage;

            } else if (authStore.message !== '') {
                this.alertColor = 'info';
                return authStore.message;

            } else {
                return '';
            }
        }
    }
}
</script>

<style scoped>

</style>
