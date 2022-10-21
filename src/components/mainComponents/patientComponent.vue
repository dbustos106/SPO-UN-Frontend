<template>
  <div class="container">
    <div class="col-12">
    <patientBar ref="patientBar"></patientBar>
  </div>
  <div></div><!--Component for calendar-->
  <div></div><!--Component for procedures search-->
  </div>
</template>

<script>
import patientBar from "../commonResources/patient/patientBar.vue";
import axios from "axios";
export default {
  name: "Area_Paciente",
  components: {patientBar},
  data() {
    return {
      patientCalendarShow: false,
      patientProcedureSearchShow:false,
    };
  },
  methods: {
    openSearch(){
      console.log("Open procedure search");
      axios.get("http://localhost:8081/appointment/all")
      .then(response => {
          console.log(response);
      })
    },
    openPatientCalendar(){
      console.log("Open patient calendar");
    },
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
