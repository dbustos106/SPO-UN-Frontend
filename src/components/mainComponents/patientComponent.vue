<template>
  <div>
    <button for="scheduleAppointment" id="scheduleAppointment">
      Programar cita
    </button>
    <button for="closeSession" v-on:click="closeSession" id="closeSession">
      Cerrar Sesión
    </button>
  </div>
</template>

<script>
export default {
  name: "Area_Paciente",
  components: {},
  data() {
    return {};
  },
  methods: {
    closeSession() {
      sessionStorage.removeItem("Token");
      this.$root.$data.loginShow = true;
      this.$root.$data.patientAreaShow = false;
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
