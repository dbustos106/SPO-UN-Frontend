<template>
  <!-- ======= CalendarContainer section ======= -->
  <div id="calendarContainer" class="container">
    <FullCalendar
      id="calendar"
      class="mx-auto my-auto"
      :options="calendarOptions"
    />
  </div>
  <!-- End CalendarContainer -->
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
#calendarContainer {
  width: 80%;
  color: rgb(17, 0, 50);
  height: fit-content;
}

a,
h2 {
  color: rgb(17, 0, 50);
  text-decoration: none;
}
.fc-daygrid-body {
  width: 100%;
}
</style>
