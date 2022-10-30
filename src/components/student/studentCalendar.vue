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

        <!-- ======= Overlay ======= -->
        <transition name="fade">
          <div class="modal-overlay" v-if="detailWindow || deleteWindow"></div>
        </transition>
        <!-- End Overlay -->

        <!-- ======= detailWindow ======= -->
        <transition name="fade">
          <div id="detailWindow" class="modal-mask" v-if="detailWindow">
            <h1 class="ml-1">Cita</h1>

            <div class="row mx-auto">
              <div class="col-sm-4">
                <a>Tipo de procedimiento:</a>
              </div>
              <div class="col-sm-7">
                <a id="procedure_type">Tipo de procedimiento:</a>
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-sm-4">
                <a>Cita número:</a>
              </div>
              <div class="col-sm-5">
                <a id="idAppointment">Cita número:</a>
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-sm-4">
                <a>Hora inicio:</a>
              </div>
              <div class="col-sm-5">
                <a id="start_time">Hora inicio:</a>
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-sm-4">
                <a>Hora fin:</a>
              </div>
              <div class="col-sm-5">
                <a id="end_time">Hora fin:</a>
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-sm-4">
                <a>Lugar:</a>
              </div>
              <div class="col-sm-5">
                <a id="idPlace">Lugar:</a>
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-sm-4">
                <a>Estudiantes:</a>
              </div>
              <div class="col-sm-7">
                <a id="students">Estudiantes:</a>
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-sm-4">
                <a>Professor:</a>
              </div>
              <div class="col-sm-5 mb-3">
                <a id="professor">Professor</a>
              </div>
            </div>

            <div class="row mx-auto">
              <button
                class="mx-auto"
                id="closeDetailWindow"
                @click="detailWindow = false"
              >
                Cerrar
              </button>
            </div>
          </div>
        </transition>
        <!-- End detailWindow -->

        <!-- ======= deleteWindow ======= -->
        <transition name="fade">
          <div id="deleteWindow" class="modal-mask" v-if="deleteWindow">
            <h1>Confirmación</h1>

            <p>¿Desea eliminar la cita?</p>
            <button id="closeDeleteWindow" @click="deleteWindow = false">
              Cerrar
            </button>
            <button id="confirmDelete" @click="deleteStudentAppointment">
              Eliminar
            </button>
          </div>
        </transition>
        <!-- End deleteWindow -->

        <!-- ======= Busqueda ======= -->
        <div class="row-sm-6 ml-5 mb-3">
          Búsqueda:
          <input id="query" v-on:keyup="filteredData" />
        </div>
        <!-- End Busqueda -->

        <!-- ======= TableOfAppointments ======= -->
        <div class="row mx-auto">
          <table id="tableOfAppointments" ref="tableOfAppointmentsRef">
            <thead>
              <tr>
                <td>Id</td>
                <td>Fecha de inicio</td>
                <td>Fecha de fin</td>
                <td>Tipo de procedimiento</td>
                <td>Detalle</td>
                <td>Eliminar</td>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <!-- End TableOfAppointments -->

        <!-- ======= Buttons ======= -->
        <div class="row ml-auto">
          <div class="col-1 ml-4">
            <button id="backButton" class="btn btn-block" v-on:click="backPage">
              &lt;
            </button>
          </div>
          <div class="col-1">
            <button id="nextButton" class="btn btn-block" v-on:click="nextPage">
              &gt;
            </button>
          </div>
        </div>
        <!-- End Buttons -->

        <hr width="100%" />
        <hr width="100%" />

        <!-- ======= StudentCalendarContainer section ======= -->
        <div class="col-12 mx-auto">
          <div id="studentCalendarContainer" class="container">
            <FullCalendar
              id="calendar"
              class="mx-auto my-auto"
              ref="fullCalendar"
              :options="calendarOptions"
            />
          </div>
        </div>
        <!-- End StudentCalendarContainer -->
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
  name: "studentCalendar",

  components: { FullCalendar },
  data() {
    return {
      idPage: 0,
      lastPage: 0,
      idAppointment: 0,
      btnSelected: null,
      detailWindow: false,
      deleteWindow: false,
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
    putStudentScheduleInCalendar(schedules, color) {
      //Add events to calendar
      for (var i in schedules) {
        this.calendarOptions.events = [
          ...this.calendarOptions.events, //Adds all the previous events
          {
            id: schedules[i].appointment_id,
            title: "Cita " + schedules[i].appointment_id,
            date: schedules[i].start_time,
            color: color,
          },
        ];
      }
    },
    putStudentAppointmentInTable(appointments) {
      let table = document.getElementById("tableOfAppointments");
      for (var k in appointments) {
        let id = appointments[k].id;
        let row = table.insertRow();
        let idCell = row.insertCell();
        let start_timeCell = row.insertCell();
        let end_timeCell = row.insertCell();
        let procedure_typeCell = row.insertCell();
        let btnDetailCell = row.insertCell();
        let btnDeleteCell = row.insertCell();
        idCell.appendChild(document.createTextNode(appointments[k].id));
        start_timeCell.appendChild(
          document.createTextNode(appointments[k].start_time)
        );
        end_timeCell.appendChild(
          document.createTextNode(appointments[k].end_time)
        );
        procedure_typeCell.appendChild(
          document.createTextNode(appointments[k].procedure_type)
        );

        // button detail
        let newButtonDetail = document.createElement("button");
        newButtonDetail.innerHTML = "Detalle";
        newButtonDetail.addEventListener(
          "click",
          function () {
            this.$data.idAppointment = id;
            this.$data.detailWindow = true;
            this.getStudentAppointmentById();
          }.bind(this)
        );
        btnDetailCell.appendChild(newButtonDetail);

        // button delete
        let newButtonDelete = document.createElement("button");
        newButtonDelete.innerHTML = "Eliminar";
        newButtonDelete.addEventListener(
          "click",
          function () {
            this.$data.idAppointment = id;
            this.$data.btnSelected = newButtonDelete;
            this.$data.deleteWindow = true;
          }.bind(this)
        );
        btnDeleteCell.appendChild(newButtonDelete);
      }
    },
    getStudentAppointmentById() {
      axios
        .get("http://localhost:8081/appointment/" + this.$data.idAppointment, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then((response) => {
          let fullAppointment = response.data.message;
          document.getElementById("idAppointment").textContent =
            fullAppointment.appointmentDTO.id;
          document.getElementById("start_time").textContent =
            fullAppointment.appointmentDTO.start_time;
          document.getElementById("end_time").textContent =
            fullAppointment.appointmentDTO.end_time;
          document.getElementById("procedure_type").textContent =
            fullAppointment.appointmentDTO.procedure_type;
          document.getElementById("idPlace").textContent =
            fullAppointment.building + " - " + fullAppointment.room;
          document.getElementById("professor").textContent =
            fullAppointment.professor;

          let students = "";
          for (var student of fullAppointment.students) {
            students += "(" + student + "@unal.edu.co) ";
          }

          document.getElementById("students").textContent = students;
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getStudentAppointmentById();
            } else {
              this.$router.push("/login");
            }
          }
          if (err.response.status == 400) {
            this.$data.idPage = this.$data.lastPage;
          }
        });
    },
    deleteStudentAppointment() {
      // close modal window
      this.$data.deleteWindow = false;
      // delete row from table
      this.$data.btnSelected.parentElement.parentElement.remove();

      // delete event from calendar
      let calendarApi = this.$refs.fullCalendar.getApi();
      let event = calendarApi.getEventById(this.$data.idAppointment);
      event.remove();

      // send request
      axios
        .put(
          "http://localhost:8081/student/cancelAppointment/" +
            this.$data.idAppointment,
          null,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          }
        )
        .then(() => {
          console.log("eliminada con exito");
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.deleteStudentAppointment();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    getStudentSchedule() {
      axios
        .get(
          "http://localhost:8081/student/" + sessionStorage.Id + "/schedule",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          }
        )
        .then((response) => {
          if (!("error" in response.data)) {
            let schedules = response.data.message;
            this.putStudentScheduleInCalendar(schedules, "green");
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getStudentSchedule();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    getStudentUnconfirmedSchedule() {
      //Get unconfirmed appointments
      axios
        .get(
          "http://localhost:8081/student/" +
            sessionStorage.Id +
            "/unconfirmedSchedule",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          }
        )
        .then((response) => {
          if (!("error" in response.data)) {
            let unconfirmedSchedules = response.data.message;
            this.putStudentScheduleInCalendar(unconfirmedSchedules, "yellow");
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getStudentUnconfirmedSchedule();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    getStudentAppointments(page) {
      axios
        .get(
          "http://localhost:8081/student/" +
            sessionStorage.Id +
            "/appointments/",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
            params: { page: page, size: 10 },
          }
        )
        .then((response) => {
          if (!("error" in response.data)) {
            let appointments = response.data.message.content;

            this.$data.appointments = [];
            for (var j in appointments) {
              this.$data.appointments.push({
                id: appointments[j].id,
                start_time: appointments[j].start_time,
                end_time: appointments[j].end_time,
                procedure_type: appointments[j].procedure_type,
              });
            }
            this.$data.lastPage += 1;
            this.putStudentAppointmentInTable(appointments);
          } else {
            this.$data.idPage = this.$data.lastPage;
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getStudentAppointments(page);
            } else {
              this.$router.push("/login");
            }
          }
          if (err.response.status == 400) {
            this.$data.idPage = this.$data.lastPage;
          }
        });
    },
    backPage() {
      let table = document.getElementById("tableOfAppointments");

      if (this.$data.idPage > 0) {
        this.$data.idPage -= 1;
        this.$data.lastPage -= 1;
        while (table.children[1].firstChild != table.children[1].lastChild) {
          var child = table.children[1].lastChild;
          child.remove();
        }
        this.getStudentAppointments(this.$data.idPage);
      }
    },
    nextPage() {
      let table = document.getElementById("tableOfAppointments");
      this.$data.idPage += 1;

      while (table.children[1].firstChild != table.children[1].lastChild) {
        var child = table.children[1].lastChild;
        child.remove();
      }
      this.getStudentAppointments(this.$data.idPage);
    },
    filteredData() {
      let table = document.getElementById("tableOfAppointments");
      var filterKey = document.getElementById("query").value;
      var filterAppointments = this.$data.appointments;

      filterAppointments = filterAppointments.filter(function (row) {
        return Object.keys(row).some(function (key) {
          return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
        });
      });

      while (table.children[1].firstChild != table.children[1].lastChild) {
        var child = table.children[1].lastChild;
        child.remove();
      }
      this.putStudentAppointmentInTable(filterAppointments);
    },
  },
  mounted() {
    this.getStudentAppointments(0);
    this.getStudentSchedule();
    this.getStudentUnconfirmedSchedule();
  },
};
</script>

<style>
#AppointmentsContainer {
  width: 70%;
}
#studentCalendarContainer {
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
