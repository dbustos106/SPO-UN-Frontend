<template>
  <div class="container">
    <div class="col-12 bg-success">
      <div class="row">
        <div class="col-3">
          <button
            for="registryStudent"
            v-on:click="openRegistry"
            id="registryStudentButton"
          >
            Registrar Estudiante
          </button>
        </div>
        <div class="col-3">
          <button
            for="closeSession"
            v-on:click="closeSession"
            id="closeSession"
          >
            Cerrar Sesión
          </button>
        </div>
        <div class="col-3"></div>
        <div class="col-3"></div>
      </div>
      <div class="row">
        <registroEstudiante ref="registryE" v-show="registryStudentShow" />
      </div>
    </div>
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
      this.$data.registryStudentShow = false;
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
