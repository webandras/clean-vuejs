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
import Cookies from 'js-cookie';

import axios from "axios";
import {state, setState, getState} from "../../state/state";

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
        }
    },

    created() {
        this.$emit('update:layout', Guest);
    },


    mounted() {
        this.username = 'h8328tjb8iy9';
        this.password = '$%zq5V@l9UJT^)epGEBP6g1d';
        this.alertColor = '';
        this.alertHeading = '';
    },
    methods: {
        onLoggedIn() {
            this.$emit('onUserLoggedIn', true)
        },


        initLogin() {
            const credentials = {
                username: this.username,
                password: this.password
            };


            axios({
                method: "POST",
                url: state.restUrl + 'jwt-auth/v1/token',
                data: JSON.stringify(credentials),
                headers: {"Content-Type": "application/json"}

            }).then(response => {
                if (200 === response.status) {
                    console.log(response);
                    Cookies.set(state.token, response.data.token, {
                        expires: 1, // 1 day expiration of token
                        secure: true
                    });


                    setState('loggedIn', true);
                    this.onLoggedIn();
                    router.push({name: 'Home'});

                }
            }).catch(error => {
                this.alertMessage = error.message;
                console.error(error.message);
            });
        },

        isShowAlert() {
            return this.alertMessage !== '' || getState('message') !== '';
        },

        setAlert() {
            if (this.alertMessage !== '') {
                this.alertColor = 'danger';
                return this.alertMessage;

            } else if (state.message !== '') {
                this.alertColor = 'info';
                return state.message;

            } else {
                return '';
            }
        }
    }
}
</script>

<style scoped>

</style>
