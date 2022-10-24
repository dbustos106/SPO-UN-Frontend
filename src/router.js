import { createRouter, createWebHistory } from 'vue-router'

import Init from './components/views/initPage.vue'
import Home from './components/views/homePage.vue'
import Login from './components/views/loginPage.vue'
import RegisterPatient from './components/views/signUpPage.vue'
import VerifyAccount from './components/views/verifyAccountPage.vue'

import ProfessorPage from './components/views/users/professorPage.vue'
import RegisterStudent from "./components/professor/registerStudent.vue";
import StudentTable from "./components/professor/studentTable.vue";
import ProfessorCalendar from './components/professor/professorCalendar.vue'
import ProfessorSetting from './components/professor/professorSetting.vue'

import StudentPage from './components/views/users/studentPage.vue'
import CreateAppointment from './components/student/createAppointment.vue'
import StudentCalendar from './components/student/studentCalendar.vue'
import StudentSetting from './components/student/studentSetting.vue'

import PatientPage from './components/views/users/patientPage.vue'
import PatientCalendar from './components/patient/patientCalendar.vue'
import PatientSetting from './components/patient/patientSetting.vue'
import PatientSearch from './components/patient/patientProcedureSearch.vue'

import AdminPage from './components/views/users/adminPage.vue'
import RegisterProfessor from './components/admin/registerProfessor.vue'

// definir rutas
const routes = [

  {
    path: '/', 
    name: 'Init',
    component: Init,
    children:[
      {
        path: 'home', 
        name: 'Home',
        component: Home
      },
      {
        path: 'login', 
        name: 'Login',
        component: Login
      },
      {
        path: 'signUp', 
        name: 'SignUp',
        component: RegisterPatient
      },
      {
        path: 'verifyAccount/:user/:code', 
        name: 'VerifyAccount',
        component: VerifyAccount
      },
    ]
  },
  {
    path: "/professor",
    name: "Professor",
    component: ProfessorPage,
    children: [
      {
        path: 'registerStudent',
        name: 'RegisterStudent',
        component: RegisterStudent
      },
      {
        path: 'studentTable',
        name: 'StudentTable',
        component: StudentTable
      },
      {
        path: 'professorCalendar',
        name: 'ProfessorCalendar',
        component: ProfessorCalendar
      },
      {
        path: 'professorSetting',
        name: 'ProfessorSetting',
        component: ProfessorSetting
      },
    ]
  },
  {
    path: "/student",
    name: "Student",
    component: StudentPage,
    children: [
      {
        path: 'createAppointment',
        name: 'CreateAppointment',
        component: CreateAppointment
      },
      {
        path: 'studentCalendar',
        name: 'StudentCalendar',
        component: StudentCalendar
      },
      {
        path: 'studentSetting',
        name: 'StudentSetting',
        component: StudentSetting
      },
    ]
  },
  {
    path: "/patient",
    name: "Patient",
    component: PatientPage,
    children: [
      {
        path: 'patientCalendar',
        name: 'PatientCalendar',
        component: PatientCalendar
      },
      {
        path: 'patientSetting',
        name: 'PatientSetting',
        component: PatientSetting
      },
      {
        path: 'searchAppointment',
        name: 'PatientSearch',
        component: PatientSearch
      },
    ]
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminPage,
    children:[
      {
        path: 'registerProfessor',
        name: 'RegisterProfessor',
        component: RegisterProfessor
      },
    ]
  }
]

// crear objeto rutas de vue router
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;