<template>
  <div class="container marco">
    <div class="card mt-5 mb-3">
      <h2 class="card-description mt-5 mx-auto mb-4">Citas</h2>

      <!-- ======= Overlay ======= -->
      <transition name="fade">
        <div class="modal-overlay" v-if="detailWindow || deleteWindow"></div>
      </transition>
      <!-- End Overlay -->

      <!-- ======= detailWindow ======= -->
      <transition name="fade">
        <div id="detailWindow" class="modal-mask" v-if="detailWindow">
          <h2 class="ml-1 mb-3">Cita</h2>

          <div class="row mx-auto">
            <div class="col-sm-7 mr-2">
              <div class="row mt-2">
                <div class="col-sm-5">
                  <span>Tipo de procedimiento:</span>
                </div>
                <div class="col-sm-7">
                  <span id="procedure_type">Tipo de procedimiento:</span>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-5">
                  <span>Cita número:</span>
                </div>
                <div class="col-sm-7">
                  <span id="idAppointment">Cita número:</span>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-5">
                  <span>Hora inicio:</span>
                </div>
                <div class="col-sm-7">
                  <span id="start_time">Hora inicio:</span>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-5">
                  <span>Hora fin:</span>
                </div>
                <div class="col-sm-7">
                  <span id="end_time">Hora fin:</span>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-5">
                  <span>Lugar:</span>
                </div>
                <div class="col-sm-7">
                  <span id="idPlace">Lugar:</span>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-5">
                  <span>Estudiantes:</span>
                </div>
                <div class="col-sm-7">
                  <span id="students">Estudiantes:</span>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-5">
                  <span>Professor:</span>
                </div>
                <div class="col-sm-7">
                  <span id="professor">Professor</span>
                </div>
              </div>

              <div class="row mb-4">
                <div class="col-sm-5">
                  <span>Paciente:</span>
                </div>
                <div class="col-sm-7">
                  <span id="patient">Paciente</span>
                </div>
              </div>
            </div>

            <div class="col-sm-4 card">
              <div class="row mt-3">
                <span class="mx-auto">Calificación:</span>
              </div>
              <div class="col mt-3">
                <span id="feedback"> feedback </span>
              </div>
              <div class="col">
                <p class="clasificacion">
                  <input id="radio1" type="radio" name="estrellas" value="5" />
                  <label for="radio1">★</label>
                  <input id="radio2" type="radio" name="estrellas" value="4" />
                  <label for="radio2">★</label>
                  <input id="radio3" type="radio" name="estrellas" value="3" />
                  <label for="radio3">★</label>
                  <input id="radio4" type="radio" name="estrellas" value="2" />
                  <label for="radio4">★</label>
                  <input id="radio5" type="radio" name="estrellas" value="1" />
                  <label for="radio5">★</label>
                </p>
              </div>
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

      <div id="AppointmentContainer" class="mx-auto">
        <div class="TableContainer">
          <table id="AppointmentsTable">
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

        <!-- ======= Buttons ======= -->
        <button class="btnGrisLq mr-1" v-on:click="backPage">&lt;</button>
        <button class="btnGrisLq" v-on:click="nextPage">&gt;</button>
        <!-- End Buttons -->

        <hr width="100%" />
        <hr width="100%" />

        <!-- ======= ProfessorCalendarContainer ======= -->
        <FullCalendar class="mb-4" :options="calendarOptions" />
        <!-- End ProfessorCalendarContainer -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import App from "../../App.vue";

import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

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
      let table = document.getElementById("AppointmentsTable");
      for (var k in appointments) {
        let id = appointments[k].id;
        let row = table.insertRow();
        let idCell = row.insertCell();
        let start_timeCell = row.insertCell();
        let end_timeCell = row.insertCell();
        let procedure_typeCell = row.insertCell();
        let btnDetailCell = row.insertCell();
        idCell.appendChild(document.createTextNode(appointments[k].id));

        // start time and end time
        if (
          appointments[k].start_time !== null &&
          appointments[k].end_time !== null
        ) {
          start_timeCell.appendChild(
            document.createTextNode(appointments[k].start_time)
          );
          end_timeCell.appendChild(
            document.createTextNode(appointments[k].end_time)
          );
        } else {
          start_timeCell.appendChild(document.createTextNode("Sin Confirmar"));
          end_timeCell.appendChild(document.createTextNode("Sin Confirmar"));
        }

        // procedure type
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
        .get(
          App.methods.getBackUrl() + "/appointment/" + this.$data.idAppointment,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          }
        )
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
            "(" + fullAppointment.professor + ")";
          document.getElementById("feedback").textContent =
            fullAppointment.appointmentDTO.patient_feedback;
          document
            .querySelectorAll(`input[name="estrellas"]`)
            .forEach((element) => {
              if (
                element.value == fullAppointment.appointmentDTO.patient_rating
              ) {
                element.checked = true;
              }
              element.disabled = true;
            });

          let students = "";
          for (var student of fullAppointment.students) {
            students += "(" + student + ")";
          }
          document.getElementById("students").textContent = students;

          if (fullAppointment.patientDTO != null) {
            document.getElementById("patient").textContent =
              "(" + fullAppointment.patientDTO.email + ")";
          } else {
            document.getElementById("patient").textContent = "No asignada";
          }
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
          App.methods.getBackUrl() +
            "/professor/" +
            sessionStorage.Id +
            "/schedule/",
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
          App.methods.getBackUrl() +
            "/professor/" +
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
      let table = document.getElementById("AppointmentsTable");

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
      let table = document.getElementById("AppointmentsTable");
      this.$data.idPage += 1;

      while (table.children[1].firstChild != table.children[1].lastChild) {
        var child = table.children[1].lastChild;
        child.remove();
      }
      this.getProfessorAppointments(this.$data.idPage);
    },
    filteredData() {
      let table = document.getElementById("AppointmentsTable");
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
#AppointmentContainer {
  width: 90%;
}
</style>
