<template>
  <div>
    <button
      for="registryStudent"
      v-on:click="openRegistry"
      id="registryStudentButton"
    >
      Registrar Profesor
    </button>
    <button for="closeSession" v-on:click="closeSession" id="closeSession">
      Cerrar Sesión
    </button>
    <registroProfesor ref="registryP" v-show="registryProfesorShow" />
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
