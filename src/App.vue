<template>
  <div>
    <img
      src="./assets/Logo-unal.png"
      alt="Universidad Nacional de Colombia"
      width="175"
      height="150"
    />
    <h1>Sistema de Practicas Odontológicas SPO-UN</h1>
  </div>
  <login ref="loginPage" v-show="loginShow" />
  <!--<registroEstudiante ref="registry" v-show="registryStudentShow" />-->
  <registroPaciente ref="registryPatient" v-show="registryShow" />
  <profesorComponent ref="ProfesorArea" v-show="profesorAreaShow" />
</template>

<script>
//import { ref } from "vue";
//import Vue from "vue";
//import registroEstudiante from "./components/registroEstudiante.vue";
import registroPaciente from "./components/registroPaciente.vue";
import login from "./components/login.vue";
import profesorComponent from "./components/profesorComponent.vue";

export default {
  name: "SPO-UN",
  components: {
    //registroEstudiante,
    registroPaciente,
    login,
    profesorComponent,
  },
  mounted() {
    //this.$refs.loginPage.registerButton;
    console.log(this.$refs.loginPage);
  },
  data() {
    return {
      loginShow: true,
      registryShow: false,
      profesorAreaShow: false,
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
  },
};
</script>

<style>
.center {
  margin: auto;
  width: 60%;
  border: 3px solid #315203;
  padding: 10px;
}
.input_label {
  margin-left: 50px;
}
.namef {
  margin-left: 0px;
}
#namel {
  margin-left: 0px;
}
.lname {
  margin-left: 0px;
}
#acceptButton {
  margin-left: 110px;
}
.margin-down {
  margin-top: 0px;
}
</style>
