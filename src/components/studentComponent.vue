<template>
  <div>
    <button for="programHours" id="programHours">Programar horarios</button>
    <button for="closeSession" v-on:click="closeSession" id="closeSession">
      Cerrar Sesión
    </button>
  </div>
</template>

<script>
export default {
  name: "Area_Estudiante",
  components: {},
  data() {
    return {};
  },
  methods: {
    closeSession() {
      sessionStorage.removeItem("Token");
      this.$root.$data.loginShow = true;
      this.$root.$data.studentAreaShow = false;
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
