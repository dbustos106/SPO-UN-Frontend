import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import "vue-sidebar-menu-akahon";

createApp(App).use(router).use(VueDOMPurifyHTML).mount('#app');

