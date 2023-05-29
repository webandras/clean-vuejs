import {createRouter, createWebHistory} from "vue-router";
import Home from "../pages/public/Home.vue";
import Hello from "../pages/public/Hello.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
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
export default router;
