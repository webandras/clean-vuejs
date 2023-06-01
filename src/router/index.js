import {createRouter, createWebHistory} from "vue-router";

import Home from "../pages/private/Home.vue";
import Hello from "../pages/private/Hello.vue";
import Login from "../pages/public/Login.vue";
import Dashboard from "../pages/private/Dashboard.vue";

import {authStore} from "../store/authStore";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/hello",
        name: "Hello",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: Hello,
    },

    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Auth guard redirects
router.beforeEach(async (to, from) => {
    if (
        // make sure the user is authenticated
        !authStore.isAuthenticated() &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Login'
    ) {
        authStore.message = 'You need to login to access this page.'
        // redirect the user to the login page
        return {name: 'Login'}
    }

    // when logged in redirect from login page to home
    if (authStore.isAuthenticated() && to.name === 'Login') {
        // redirect the logged-in user to the home page
        return {name: 'Dashboard'}
    }
})

export default router;
