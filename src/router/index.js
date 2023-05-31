import {createRouter, createWebHistory} from "vue-router";
import Home from "../pages/public/Home.vue";
import Hello from "../pages/public/Hello.vue";
import Login from "../pages/public/Login.vue";

import {isAuthenticated, setState} from "../state/state";

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
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Auth guard redirects
router.beforeEach(async (to, from) => {
    if (
        // make sure the user is authenticated
        !isAuthenticated() &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Login'
    ) {
        setState('message', 'You need to login to access this page.');
        // redirect the user to the login page
        return {name: 'Login'}
    }

    // when logged in redirect from login page to home
    if (isAuthenticated() && to.name === 'Login') {
        // redirect the logged-in user to the home page
        return {name: 'Home'}
    }
})

export default router;
