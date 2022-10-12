<template>
  <login ref="loginPage" v-show="loginShow" />
  <registroPaciente ref="registryPatient" v-show="registryShow" />
  <profesorComponent ref="ProfesorArea" id="ProfesorArea" v-show="profesorAreaShow" />
  <studentComponent ref="StudentArea" v-show="studentAreaShow" />
  <patientComponent ref="PatientArea" v-show="patientAreaShow" />
  <adminComponent ref="AdminArea" v-show="adminAreaShow" />
</template>

<script>
//import bootstrap from "bootstrap";
//import { ref } from "vue";
//import Vue from "vue";
import registroPaciente from "./components/registries/registroPaciente.vue";
import login from "./components/login.vue";
import profesorComponent from "./components/mainComponents/profesorComponent.vue";
import patientComponent from "./components/mainComponents/patientComponent.vue";
import studentComponent from "./components/mainComponents/studentComponent.vue";
import adminComponent from "./components/mainComponents/adminComponent.vue";

export default {
  name: "SPO-UN",
  components: {
    registroPaciente,
    login,
    profesorComponent,
    patientComponent,
    studentComponent,
    adminComponent,
  },
  mounted() {
    //this.$refs.loginPage.registerButton;
    console.log(this.$refs.loginPage);
  },
  data() {
    return {
      loginShow: false,
      //StudentTemplateShow: true,
      registryShow: false,
      profesorAreaShow: true,
      studentAreaShow: false,
      patientAreaShow: false,
      adminAreaShow: false,
    };
  },
  methods: {
    toUrlEncoded(datos) {
      var formBody = [];
      for (var property in datos) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(datos[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      console.log(formBody);
      return formBody;
    },
    jwtDecode(t) {
      let token = {};
      token.raw = t;
      token.header = JSON.parse(window.atob(t.split(".")[0]));
      token.payload = JSON.parse(window.atob(t.split(".")[1]));
      return token;
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>
