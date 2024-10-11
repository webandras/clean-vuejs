import './assets/sass/main.sass';

import {createApp} from 'vue';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from "./router";
import filters from "@/filters";
import library from "./icons/icons"

const app = createApp(App);

app.config.globalProperties.$filters = {
    date(value, formatType = 'long') {
        return filters.date(value, formatType);
    },
    excerpt(value, length = 120) {
        return filters.excerpt(value, length);
    }
}

app.component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app');
