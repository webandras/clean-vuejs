import './assets/sass/main.sass';

import {createApp} from 'vue';
/* import font awesome icon component */
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

import App from './App.vue';
import router from "./router";
import library from "./icons/icons"


const app = createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app');


