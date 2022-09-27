<template>
  <div class="container">
    <div class="col-12">
      <div class="row">
        <div class="col-2">
          <button
            for="registryStudent"
            v-on:click="openRegistry"
            id="registryStudentButton"
            class="btn btn-block professor-btn mb-4"
            type="button"
          >
            Registrar Estudiante
          </button>
        </div>
        <div class="col-2">
          <button
            for="closeSession"
            v-on:click="closeSessionProfesor"
            id="closeSession"
            class="btn btn-block professor-btn mb-4"
            type="button"
          >
            Cerrar Sesión
          </button>
        </div>
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
    closeSessionProfesor() {
      console.log("Here");
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
.col-2 .professor-btn {
  padding: 13px 20px 12px;
  background-color: #000;
  border-radius: 4px;
  font-size: 17px;
  font-weight: bold;
  line-height: 20px;
  color: #fff;
  margin-bottom: 24px;
}
</style>
