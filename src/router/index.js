import {createRouter, createWebHistory} from "vue-router";

import Home from "../pages/Home.vue";
import BlogList from "../pages/Blog/List.vue";
import BlogItem from "../pages/Blog/Item.vue";
import BlogEditor from "@/pages/Blog/Persist.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/blog",
        name: "Blog",
        component: BlogList,
    },
    {
        path: "/post/:id",
        name: "Blogpost",
        component: BlogItem,
    },
    {
        path: "/post/editor",
        name: "Blog Editor",
        component: BlogEditor,
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
