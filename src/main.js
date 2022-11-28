import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "vue-sidebar-menu-akahon";
import vue3GoogleLogin from "vue3-google-login";

createApp(App)
    .use(vue3GoogleLogin, {clientId: "818868005104-qvheup05vc4mm8jd06au8q96b4b6nfrh.apps.googleusercontent.com"})
    .use(router)
    .mount('#app');