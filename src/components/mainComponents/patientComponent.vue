<template>
  <div>
    <div class="col-12">
      <patientBar ref="patientBar"></patientBar>
    </div>
  <div class="patientContainer">
    <div class="row">
        <div><PatientProcedureSearch ref="patientSearch" v-show="patientProcedureSearchShow"></PatientProcedureSearch></div>
        <div><PatientProcedureCalendar ref="patientCalendar" v-show="patientProcedureCalendarShow"></PatientProcedureCalendar></div>
    </div>
    <div></div><!--Component for calendar-->
  </div>
  </div>
  
</template>

<script>
import patientBar from "../commonResources/patient/patientBar.vue";
import axios from "axios";
import PatientProcedureSearch from "../commonResources/patient/patientProcedureSearch.vue";
import PatientProcedureCalendar from "../commonResources/patient/patientProcedureCalendar.vue";
export default {
  name: "Area_Paciente",
  components: { patientBar,  PatientProcedureSearch, PatientProcedureCalendar },
  data() {
    return {
      patientCalendarShow: false,
      patientProcedureSearchShow: false,
      patientProcedureCalendarShow: false,
    };
  },
  methods: {
    openSearch(){
      this.$data.patientProcedureSearchShow=true;
      console.log("Open procedure search");
      
    },
    searchProcedure(){
      var procedureTypeSearch=this.$refs.patientSearch.$refs.procedureType.value;
      this.$data.patientProcedureCalendarShow=true;
      axios.get("http://localhost:8081/appointment/allAvailable",{
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
             Authorization: "Bearer " + sessionStorage.Token,
          }
      })
      .then(response => {
        let appointmentsSearch=response.data.message.content;
        let searchTable= this.$refs.patientTable.$refs.tableOfProceduresRef;
        console.log(searchTable);
          console.log(response);
          for(var i in appointmentsSearch){
            if(appointmentsSearch[i].procedure_type==procedureTypeSearch){
              console.log(appointmentsSearch[i].start_time);
              let row = searchTable.insertRow();
              let procedureCell = row.insertCell();
              let dayCell = row.insertCell();
              let hourCell = row.insertCell();
              procedureCell.appendChild(
                document.createTextNode(procedureTypeSearch)
              );
              dayCell.appendChild(
                document.createTextNode(appointmentsSearch[i].start_time/*.slice(0,9)*/)
              );
              hourCell.appendChild(
                document.createTextNode(appointmentsSearch[i].start_time/*.slice(10,17)*/)
              );
            }
          }
          
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
  .patientContainer{
    min-height: 100vh;
  }
</style>
