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

  <!-- ======= TableContainer ======= -->
  <div id="AppointmentsContainer" class="container">
    <div class="card login-card">
      <div class="row no-gutters">
        <p class="login-card-description mt-5 mx-auto mb-5">Citas</p>
        <div class="col-12 mx-auto">
          <div class="row mx-auto">
            <table id="tableOfAppointments" ref="tableOfAppointmentsRef">
              <thead>
                <tr>
                  <td>Id</td>
                  <td>Fecha de inicio</td>
                  <td>Fecha de fin</td>
                  <td>Tipo de procedimiento</td>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
              </tbody>
            </table>
          </div>
          <div class="row"></div>
        </div>
        <hr width="100%" />
        <div class="col-12 mx-auto">
          <!-- ======= CalendarContainer section ======= -->
          <div id="calendarContainer" class="container">
            <FullCalendar
              id="calendar"
              class="mx-auto"
              :options="calendarOptions"
            />
          </div>
          <!-- End CalendarContainer -->
        </div>
      </div>
    </div>
  </div>
  <!-- End TablaContainer -->
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
  name: "patientCalendar",
  components: { FullCalendar },
  data() {
    return {
      schedule: [],
      unconfirmedSchedule: [],
      appointments: [],
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
    getPatientSchedule() {
      axios
        .get(
          "http://localhost:8081/patient/" + sessionStorage.Id + "/schedule",
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
              this.getPatientSchedule();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    putAppointmentsInTable() {
      let table = document.getElementById("tableOfAppointments");
      axios
        .get(
          "http://localhost:8081/patient/" +
            sessionStorage.Id +
            "/appointments/",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          }
        )
        .then((response) => {
          let appointmentInfo = response.data.message.content;

          for (var i in appointmentInfo) {
            this.$data.appointments.push({
              id: appointmentInfo[i].id,
              start_time: appointmentInfo[i].start_time,
              end_time: appointmentInfo[i].end_time,
              procedure_type: appointmentInfo[i].procedure_type,
            });
          }

          for (var j in this.$data.appointments) {
            let row = table.insertRow();
            let idCell = row.insertCell();
            let start_timeCell = row.insertCell();
            let end_timeCell = row.insertCell();
            let procedure_typeCell = row.insertCell();
            idCell.appendChild(
              document.createTextNode(this.$data.appointments[j].id)
            );
            start_timeCell.appendChild(
              document.createTextNode(this.$data.appointments[j].start_time)
            );
            end_timeCell.appendChild(
              document.createTextNode(this.$data.appointments[j].end_time)
            );
            procedure_typeCell.appendChild(
              document.createTextNode(this.$data.appointments[j].procedure_type)
            );
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.putAppointmentsInTable();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
  },
  mounted() {
    this.getPatientSchedule();
    this.putAppointmentsInTable();
  },
};
</script>

<style>
#calendarContainer {
  width: 100%;
  margin-top: 40px;
  color: rgb(17, 0, 50);
  background: rgb(131, 130, 132);
  height: fit-content;
  position: relative;
}

a,
h2 {
  color: rgb(232, 232, 232);
  text-decoration: none;
}
.fc-daygrid-body {
  width: 100%;
}

#AppointmentsContainer {
  width: 70%;
}

#tableOfAppointments {
  width: 90%;
  margin-left: 50px;
  margin-bottom: 50px;
}
</style>
