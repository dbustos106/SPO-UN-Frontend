<template>
  <div>
    <button
      for="registryStudent"
      v-on:click="openRegistry"
      id="registryStudentButton"
    >
      Registrar Estudiante
    </button>
    <button for="closeSession" v-on:click="closeSession" id="closeSession">
      Cerrar Sesión
    </button>
    <registroEstudiante ref="registry" v-show="registryStudentShow" />
  </div>
</template>

<script>
import registroEstudiante from "./registroEstudiante.vue";
export default {
  name: "Area_Profesor",
  components: {
    registroEstudiante,
  },
  data() {
    return {
      registryStudentShow: false,
    };
  },
  methods: {
    openRegistry() {
      this.$data.registryStudentShow = true;
    },
    closeSession() {
      sessionStorage.removeItem("Token");
      this.$root.$data.loginShow = true;
      this.$root.$data.profesorAreaShow = false;
      document.getElementById("user").value = "";
      document.getElementById("password").value = "";
    },
  },
};
</script>

<style>
#closeSession {
  margin-left: 500px;
}
</style>
