import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";

createApp(App).use(router).mount('#app');
App.component('vue-sidebar-menu-akahon', VueSidebarMenuAkahon);