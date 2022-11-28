import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vueDOMPurifyHTML from 'vue-dompurify-html';
import vue3GoogleLogin from "vue3-google-login";
import "vue-sidebar-menu-akahon";

createApp(App)
    .use(vue3GoogleLogin, {clientId: "818868005104-qvheup05vc4mm8jd06au8q96b4b6nfrh.apps.googleusercontent.com"})
    .use(vueDOMPurifyHTML)
    .use(router)
    .mount('#app');