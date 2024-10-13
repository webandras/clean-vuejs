import {createRouter, createWebHistory} from "vue-router";

import Guest from "@/layout/Guest.vue";
import Home from "../pages/Home.vue";
import BlogList from "../pages/Blog/List.vue";
import BlogItem from "../pages/Blog/Item.vue";
import BlogEditor from "@/pages/Blog/Persist.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        meta: {layout: Guest}
    },
    {
        path: "/blog",
        name: "Blog",
        component: BlogList,
        meta: {layout: Guest}
    },
    {
        path: "/post/:id",
        name: "Blogpost",
        component: BlogItem,
        meta: {layout: Guest}
    },
    {
        path: "/post/editor",
        name: "BlogEditor",
        component: BlogEditor,
        // See https://dev.to/lampewebdev/vuejs-pages-with-dynamic-layouts-problems-and-a-solution-4460
        meta: {layout: Guest}
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
