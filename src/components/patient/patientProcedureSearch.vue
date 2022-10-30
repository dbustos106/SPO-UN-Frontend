<template>
  <!-- ======= Meta datos ======= -->
  <div>
    <!-- <meta charset="UTF-8" /> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>SPO UN - Inicia sesión</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
  </div>
  <!-- End Meta datos -->

  <!-- ======= ProcedureSearchContainer ======= -->
  <div id="ProcedureSearchContainer" class="container">
    <div class="card login-card">
      <div class="row no-gutters">
        <!-- ======= Busqueda ======= -->
        <div class="row-sm-6 ml-5 mt-4">
          Búsqueda:
          <input id="query" v-on:keyup="filteredData" />
        </div>
        <!-- End Busqueda -->

        <!-- ======= NoAppointmensMessage ======= -->
        <div class="row mx-auto" v-if="noAppointmentsShow">
          <span title="error" class="noAppointmensMessage">
            <i class="fa fa-exclamation-circle"></i>
            <span id="noAppointmentsMessageSpan"
              >No hay citas disponibles para lo especificado. Intente buscar más
              tarde</span
            >
          </span>
        </div>
        <!-- End NoAppointmensMessage -->

        <!-- ======= PatientProcedureCalendar ======= -->
        <div class="row mx-auto mb-5">
          <patientProcedureCalendar
            ref="patientProcedureCalendar"
          ></patientProcedureCalendar>
        </div>
        <!-- End patientProcedureCalendar -->
      </div>
    </div>
  </div>

  <!-- End ProcedureSearchContainer -->
</template>

<script>
import axios from "axios";
import App from "../../App.vue";
import patientProcedureCalendar from "./patientProcedureCalendar";

export default {
  components: {
    patientProcedureCalendar,
  },
  data() {
    return {
      schedules: [],
      earliestDate: null,
      noAppointmentsShow: false,
    };
  },
  methods: {
    putAppointmentInCalendar(schedules) {
      let calendarApi =
        this.$refs.patientProcedureCalendar.$refs.procedureCalendar.getApi();
      this.$refs.patientProcedureCalendar.calendarOptions.events = [];
      this.$data.earliestDate = "3000-12-31T11:59:59";

      for (var i in schedules) {
        if (
          new Date(schedules[i].start_time).getTime() <
          new Date(this.$data.earliestDate).getTime()
        ) {
          this.$data.earliestDate = schedules[i].start_time;
        }

        this.$refs.patientProcedureCalendar.calendarOptions.events = [
          ...this.$refs.patientProcedureCalendar.calendarOptions.events, //Adds all the previous events
          {
            id: schedules[i].appointment_id,
            title: schedules[i].procedure_type,
            start: schedules[i].start_time.replace(" ", "T"),
            end: schedules[i].end_time.replace(" ", "T"),
            start_time: schedules[i].start_time.replace(" ", "T"),
            end_time: schedules[i].end_time.replace(" ", "T"),
            color: "#73e600",
          },
        ];
      }

      console.log("temp", this.$data.earliestDate);
      calendarApi.gotoDate(this.$data.earliestDate); //Go to min date

      if (
        this.$refs.patientProcedureCalendar.calendarOptions.events.length == 0
      ) {
        this.$data.noAppointmentsShow = true;
      } else {
        this.$data.noAppointmentsShow = false;
      }
    },
    getAllAvailableAppointments() {
      axios
        .get("http://localhost:8081/appointment/allAvailable", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then((response) => {
          let appointmentsSearch = response.data.message;
          for (var i in appointmentsSearch) {
            for (var j in appointmentsSearch[i].tentativeSchedules) {
              this.$data.schedules.push({
                appointment_id:
                  appointmentsSearch[i].tentativeSchedules[j].appointment_id,
                start_time:
                  appointmentsSearch[i].tentativeSchedules[j].start_time,
                end_time: appointmentsSearch[i].tentativeSchedules[j].end_time,
                procedure_type:
                  appointmentsSearch[i].appointmentDTO.procedure_type,
              });
            }
          }

          this.putAppointmentInCalendar(this.$data.schedules);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getPatientSchedule();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    filteredData() {
      var filterKey = document.getElementById("query").value;
      var filterSchedules = this.$data.schedules;

      filterSchedules = filterSchedules.filter(function (row) {
        return Object.keys(row).some(function (key) {
          return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
        });
      });

      this.putAppointmentInCalendar(filterSchedules);
    },
  },
  mounted() {
    this.getAllAvailableAppointments();
  },
};
</script>

<style>
#ProcedureSearchContainer {
  width: 70%;
  height: 90%;
}

.noAppointmensMessage {
  background-color: rgb(248, 61, 61);
  z-index: 1000;
}
</style>
