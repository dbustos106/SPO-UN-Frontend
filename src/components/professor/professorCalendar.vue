<template>
  <div>
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

  <!-- ======= TableContainer ======= -->
  <div id="AppointmentsContainer" class="container">
    <div class="card login-card">
      <div class="row no-gutters">
        <p class="login-card-description mt-5 mx-auto mb-4">Citas</p>
        <div class="col-12 mx-auto">
          <!-- ======= ProfessorCalendarContainer section ======= -->
          <div id="professorCalendarContainer" class="container">
            <FullCalendar
              id="calendar"
              class="mx-auto my-auto"
              :options="calendarOptions"
            />
          </div>
          <!-- End ProfessorCalendarContainer -->
        </div>
      </div>
    </div>
  </div>
  </div>
  
</template>

<script>
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";
import App from "../../App.vue";

export default {
  name: "professorCalendar",
  components: { FullCalendar },
  data() {
    return {
      schedule: [],
      unconfirmedSchedule: [],
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "dayGridMonth",
        locale: "es",
        selectable: true,
        height: 650,
        events: [],
      },
    };
  },
  methods: {
    getProfessorSchedule() {
      axios
        .get(
          "http://localhost:8081/professor/" + sessionStorage.Id + "/schedule",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          }
        )
        .then((response) => {
          let appointments = response.data.message;

          for (var i in appointments) {
            var appointmentTime = appointments[i].start_time.replace(" ", "T");
            this.$data.schedule.push({
              idAppointment: "Cita " + appointments[i].appointment_id,
              date: appointmentTime,
            });
          }

          //Add events to calendar
          for (var j in this.$data.schedule) {
            this.calendarOptions.events = [
              ...this.calendarOptions.events, //Adds all the previous events
              {
                title: this.$data.schedule[j].idAppointment,
                date: this.$data.schedule[j].date,
                color: "green",
              },
            ];
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getProfessorSchedule();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
  },
  mounted() {
    this.getProfessorSchedule();
  },
};
</script>

<style>
#AppointmentsContainer {
  width: 70%;
}
#professorCalendarContainer {
  width: 90%;
  height: 100%;
  color: rgb(17, 0, 50);
  height: fit-content;
  position: relative;
  padding: 20px 20px;
}
#calendar {
  height: 40%;
  max-height: 500px;
  position: relative;
}

a,
h2 {
  color: rgb(17, 0, 50);
  text-decoration: none;
}
.fc-daygrid-body {
  width: 100%;
}
.fc .fc-col-header-cell-cushion {
  display: inline-block;
  padding: 2px 4px;
}
</style>
