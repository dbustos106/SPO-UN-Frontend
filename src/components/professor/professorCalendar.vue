<template>
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
              <button class="btnGris mx-auto" @click="detailWindow = false">
                Cerrar
              </button>
            </div>
          </div>
        </transition>
        <!-- End detailWindow -->

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
                <td>Detalles</td>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <!-- End TableOfAppointments -->

        <!-- ======= Buttons ======= -->
        <div class="row ml-5 mb-3">
          <button class="btnGrisLq mr-1" v-on:click="backPage">&lt;</button>
          <button class="btnGrisLq" v-on:click="nextPage">&gt;</button>
        </div>
        <!-- End Buttons -->

        <hr width="100%" />
        <hr width="100%" />

        <!-- ======= ProfessorCalendarContainer section ======= -->
        <div class="row mx-auto">
          <!-- ======= ProfessorCalendarContainer section ======= -->
          <div id="calendarContainer" class="container">
            <FullCalendar
              id="calendar"
              class="mx-auto my-auto"
              :options="calendarOptions"
            />
          </div>
          <!-- End ProfessorCalendarContainer -->
        </div>
        <!-- End ProfessorCalendarContainer -->
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
    putProfessorScheduleInCalendar(schedules) {
      //Add events to calendar
      for (var i in schedules) {
        this.calendarOptions.events = [
          ...this.calendarOptions.events, //Adds all the previous events
          {
            id: schedules[i].appointment_id,
            title: "Cita " + schedules[i].appointment_id,
            date: schedules[i].start_time,
            color: "green",
          },
        ];
      }
    },
    putProfessorAppointmentInTable(appointments) {
      let table = document.getElementById("tableOfAppointments");
      for (var k in appointments) {
        let id = appointments[k].id;
        let row = table.insertRow();
        let idCell = row.insertCell();
        let start_timeCell = row.insertCell();
        let end_timeCell = row.insertCell();
        let procedure_typeCell = row.insertCell();
        let btnDetailCell = row.insertCell();
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
        newButtonDetail.innerHTML = "Detalles";
        newButtonDetail.addEventListener(
          "click",
          function () {
            this.$data.idAppointment = id;
            this.$data.detailWindow = true;
            this.getProfessorAppointmentById();
          }.bind(this)
        );
        btnDetailCell.appendChild(newButtonDetail);
      }
    },
    getProfessorAppointmentById() {
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
            students += "(" + student + "@unal.edu.co)";
          }

          document.getElementById("students").textContent = students;
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getProfessorAppointmentById();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    getProfessorSchedule() {
      axios
        .get(
          "http://localhost:8081/professor/" + sessionStorage.Id + "/schedule/",
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
            this.putProfessorScheduleInCalendar(schedules);
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
    getProfessorAppointments(page) {
      axios
        .get(
          "http://localhost:8081/professor/" +
            sessionStorage.Id +
            "/appointments/",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
            params: { page: page, size: 6 },
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
            this.putProfessorAppointmentInTable(appointments);
          } else {
            this.$data.idPage = this.$data.lastPage;
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getProfessorAppointments(page);
            } else {
              this.$router.push("/login");
            }
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
        this.getProfessorAppointments(this.$data.idPage);
      }
    },
    nextPage() {
      let table = document.getElementById("tableOfAppointments");
      this.$data.idPage += 1;

      while (table.children[1].firstChild != table.children[1].lastChild) {
        var child = table.children[1].lastChild;
        child.remove();
      }
      this.getProfessorAppointments(this.$data.idPage);
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
      this.putProfessorAppointmentInTable(filterAppointments);
    },
  },
  mounted() {
    this.getProfessorAppointments(0);
    this.getProfessorSchedule();
  },
};
</script>

<style>
#AppointmentsContainer {
  width: 70%;
}
</style>
