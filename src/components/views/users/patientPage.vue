<template>
  <PatientBar></PatientBar>

  <section
    id="patientSection"
    class="container"
    :class="{ ing2: sideBarIsOpen == 1 }"
  >
    <!-- ======= Router view ======= -->
    <router-view></router-view>
    <!-- End Router view -->
  </section>
</template>

<script>
import PatientBar from "../../patient/PatientBar.vue";
import axios from "axios";

export default {
  name: "PatientPage",
  components: {
    PatientBar,
  },
  data() {
    return {
      sideBarIsOpen: 1,
    };
  },
  methods: {
    moveContainer() {
      this.sideBarIsOpen = (this.sideBarIsOpen + 1) % 2;
    },
    searchProcedure() {
      var procedureTypeSearch =
        this.$refs.patientSearch.$refs.procedureType.value;
      axios
        .get("http://localhost:8081/appointment/allAvailable", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.Token,
          },
        })
        .then((response) => {
          let appointmentsSearch = response.data.message.content;
          let searchTable = this.$refs.patientTable.$refs.tableOfProceduresRef;
          console.log(searchTable);
          console.log(response);
          for (var i in appointmentsSearch) {
            if (appointmentsSearch[i].procedure_type == procedureTypeSearch) {
              console.log(appointmentsSearch[i].start_time);
              let row = searchTable.insertRow();
              let procedureCell = row.insertCell();
              let dayCell = row.insertCell();
              let hourCell = row.insertCell();
              procedureCell.appendChild(
                document.createTextNode(procedureTypeSearch)
              );
              dayCell.appendChild(
                document.createTextNode(
                  appointmentsSearch[i].start_time /*.slice(0,9)*/
                )
              );
              hourCell.appendChild(
                document.createTextNode(
                  appointmentsSearch[i].start_time /*.slice(10,17)*/
                )
              );
            }
          }
          this.$data.patientProcedureTableShow = true;
        });
    },
  },
  mounted() {
    var btnMenu = document.getElementById("btn");
    btnMenu.addEventListener("click", this.moveContainer);
  },
};
</script>

<style>
#patientSection {
  max-width: 100vw;
  height: 180vh;
  background: url("../../../assets/img/panoramicaUnal.jpg") top center;
  background-size: cover;
  position: absolute;
}

#patientSection:before {
  content: "";
  background: rgba(45, 53, 69, 0.7);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

.ing2 {
  animation: aumWidth 0.7s forwards;
}

@keyframes aumWidth {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 100px;
  }
}
</style>
