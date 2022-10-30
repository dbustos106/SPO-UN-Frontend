import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import FullpageModal from 'vue-fullpage-modal'
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap-icons/font/bootstrap-icons.css";

createApp(App).use(router).mount('#app');
App.component('vue-sidebar-menu-akahon', VueSidebarMenuAkahon);