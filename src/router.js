import { createRouter, createWebHistory } from 'vue-router'

import Home from './components/views/initPage.vue'
import Login from './components/views/login.vue'
import registerPatient from './components/views/registerPatient.vue'
import VerifyAccount from './components/views/verifyAccount.vue'

// definir rutas
const routes = [

  {
    path: '/home', 
    name: 'Home',
    component: Home
  },
  {
    path: '/verifyAccount/:user/:code', 
    name: 'VerifyAccount',
    component: VerifyAccount
  },
  {
    path: '/login', 
    name: 'Login',
    component: Login
  },
  {
    path: '/signUp', 
    name: 'SignUp',
    component: registerPatient
  }
]

// crear objeto rutas de vue router
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;