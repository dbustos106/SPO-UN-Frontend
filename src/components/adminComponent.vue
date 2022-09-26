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
            Registrar Profesor
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
      </div>
      <div class="row">
        <registroProfesor ref="registryP" v-show="registryProfesorShow" />
      </div>
    </div>
  </div>
</template>

<script>
import registroProfesor from "./registroProfesor.vue";
export default {
  name: "Area_Administrador",
  components: {
    registroProfesor,
  },
  data() {
    return {
      registryProfesorShow: false,
    };
  },
  methods: {
    openRegistry() {
      this.$data.registryProfesorShow = true;
    },
    closeSession() {
      sessionStorage.removeItem("Token");
      this.$root.$data.loginShow = true;
      this.$root.$data.adminAreaShow = false;
      this.$data.registryProfesorShow = false;
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
