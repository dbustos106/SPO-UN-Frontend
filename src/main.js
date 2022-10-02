import { createApp } from 'vue'
import App from './App.vue'
import VueSidebarMenuAkahon from "vue-sidebar-menu-akahon";
//import bootstrap from 'bootstrap'

createApp(App).mount('#app')
App.component('vue-sidebar-menu-akahon', VueSidebarMenuAkahon);