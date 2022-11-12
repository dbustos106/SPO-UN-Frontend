<template>
  <div class="container marco">
    <div class="card">
      <div class="row no-gutters">
        <h2 class="card-description mx-auto mt-5 mb-4">Citas disponibles</h2>
        <span class="login-card-description ml-2"
          >Citas disponibles en Verde</span
        >

        <span class="login-card-description ml-2"
          >Haga click sobre el horario deseado para reservar la cita</span
        >

        <!-- ======= Busqueda ======= -->
        <div class="row-sm-6 mt-4 ml-2 mb-2">
          <span>Búsqueda: </span>
          <input id="query" v-on:keyup="filteredData" />
        </div>
        <!-- End Busqueda -->

        <!-- ======= NoAppointmensMessage ======= -->
        <div class="row mx-auto" v-if="noAppointmentsShow">
          <span title="error" class="noAppointmensMessage">
            <i class="fa fa-exclamation-circle"></i>
            <span
              >No hay citas disponibles para lo especificado. Intente buscar más
              tarde</span
            >
          </span>
        </div>
        <!-- End NoAppointmensMessage -->

        <!-- ======= PatientProcedureCalendar ======= -->
        <div class="row mx-auto mb-5">
          <patientProcedureCalendar
            @confirm="getAllAvailableAppointments"
            ref="patientProcedureCalendar"
          ></patientProcedureCalendar>
        </div>
        <!-- End patientProcedureCalendar -->
      </div>
    </div>
  </div>
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
            color: "#73e600",
          },
        ];
      }

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
      this.$data.schedules = [];
      axios
        .get(App.methods.getBackUrl() + "/appointment/allAvailable", {
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
.noAppointmensMessage {
  background-color: rgba(242, 0, 0, 0.7);
  z-index: 1000;
}
</style>
