<template>
  <div class="container marco">
    <div class="card mt-5 mb-3">
      <h2 class="card-description mt-5 mx-auto mb-4">Citas</h2>

      <!-- ======= Overlay ======= -->
      <transition name="fade">
        <div
          class="modal-overlay"
          v-if="detailWindowShow || deleteWindowShow"
        ></div>
      </transition>
      <!-- End Overlay -->

      <!-- ======= detailWindow ======= -->
      <transition name="fade">
        <div id="detailWindow" class="modal-mask" v-if="detailWindowShow">
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
              <span class="mb-2">Calificación: </span>
              <div class="row">
                <label id="spnClasificacion" v-if="checkClasifiacion"
                  >✔ calificación exitosa</label
                >
              </div>
              <div class="mx-auto mt-1">
                <textarea
                  class="textarea"
                  ref="feedback"
                  rows="4"
                  cols="25"
                  id="feedback"
                ></textarea>
              </div>
              <div class="row mx-auto">
                <span class="clasificacion">
                  <input id="radio1" type="radio" name="estrellas" value="5" />
                  <label class="star" for="radio1">★</label>
                  <input id="radio2" type="radio" name="estrellas" value="4" />
                  <label class="star" for="radio2">★</label>
                  <input id="radio3" type="radio" name="estrellas" value="3" />
                  <label class="star" for="radio3">★</label>
                  <input id="radio4" type="radio" name="estrellas" value="2" />
                  <label class="star" for="radio4">★</label>
                  <input id="radio5" type="radio" name="estrellas" value="1" />
                  <label class="star" for="radio5">★</label>
                </span>
              </div>
              <div class="row mx-auto mb-2">
                <button class="btnBlue" v-on:click="qualifyAppointment">
                  Enviar
                </button>
              </div>
            </div>
          </div>

          <div class="row mx-auto mt-3">
            <button class="btnGris mx-auto" @click="detailWindowShow = false">
              Cerrar
            </button>
          </div>
        </div>
      </transition>
      <!-- End detailWindow -->

      <!-- ======= deleteWindow ======= -->
      <transition name="fade">
        <div class="modal-mask deleteWindow" v-if="deleteWindowShow">
          <h2>Confirmación</h2>

          <span>¿Desea cancelar la cita?</span>
          <div class="row justify-content-center">
            <button class="btnGris mr-1" @click="deleteWindowShow = false">
              Cerrar
            </button>
            <button class="btnRed ml-1" @click="cancelPatientAppointment">
              Cancelar
            </button>
          </div>
        </div>
      </transition>
      <!-- End deleteWindow -->

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
                <td>Cancelar</td>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <!-- End AppointmentsTable -->

        <!-- ======= Buttons ======= -->
        <button class="btnGrisLq mr-1" v-on:click="backPage">&lt;</button>
        <button class="btnGrisLq" v-on:click="nextPage">&gt;</button>
        <!-- End Buttons -->

        <hr width="100%" />
        <hr width="100%" />

        <!-- ======= PatientCalendarContainer ======= -->
        <FullCalendar
          class="mb-4"
          ref="fullCalendar"
          :options="calendarOptions"
        />
        <!-- End PatientCalendarContainer -->
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
  name: "patientCalendar",
  components: { FullCalendar },
  data() {
    return {
      idPage: 0,
      lastPage: 0,
      idAppointment: 0,
      btnSelected: null,
      detailWindowShow: false,
      deleteWindowShow: false,
      checkClasifiacion: false,
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
    putPatientScheduleInCalendar(schedules) {
      for (var i in schedules) {
        this.calendarOptions.events = [
          ...this.calendarOptions.events,
          {
            id: schedules[i].appointment_id,
            title: "Cita " + schedules[i].appointment_id,
            date: schedules[i].start_time,
            color: "green",
          },
        ];
      }
    },
    putPatientAppointmentInTable(appointments) {
      let table = document.getElementById("AppointmentsTable");
      while (table.children[1].firstChild != table.children[1].lastChild) {
        var child = table.children[1].lastChild;
        child.remove();
      }

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
        newButtonDetail.innerHTML = "Detalles";
        newButtonDetail.addEventListener(
          "click",
          function () {
            this.$data.idAppointment = id;
            this.$data.detailWindowShow = true;
            this.getPatientAppointmentById();
          }.bind(this)
        );
        btnDetailCell.appendChild(newButtonDetail);

        // button delete
        let newButtonDelete = document.createElement("button");
        newButtonDelete.innerHTML = "Cancelar";
        newButtonDelete.addEventListener(
          "click",
          function () {
            this.$data.idAppointment = id;
            this.$data.btnSelected = newButtonDelete;
            this.$data.deleteWindowShow = true;
          }.bind(this)
        );
        btnDeleteCell.appendChild(newButtonDelete);
      }
    },
    getPatientAppointmentById() {
      this.$data.checkClasifiacion = false;

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
          document.getElementById("patient").textContent =
            fullAppointment.patient;
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
            });

          let students = "";
          for (var student of fullAppointment.students) {
            students += "(" + student + ") ";
          }

          document.getElementById("students").textContent = students;
          document.getElementById("patient").textContent =
            "(" + fullAppointment.patientDTO.email + ")";
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getPatientAppointmentById();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    cancelPatientAppointment() {
      // close modal window
      this.$data.deleteWindowShow = false;
      //ToDo: Borrar SSI la respuesta del back fue positiva.
      // delete row from table
      this.$data.btnSelected.parentElement.parentElement.remove();

      // delete event from calendar
      let calendarApi = this.$refs.fullCalendar.getApi();
      let event = calendarApi.getEventById(this.$data.idAppointment);
      event.remove();

      // send request
      axios
        .put(
          App.methods.getBackUrl() +
            "/patient/cancelAppointment/" +
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
              this.cancelPatientAppointment();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    qualifyAppointment() {
      var patient_feedback = document.getElementById("feedback").value;
      var patient_rating = 0;
      document
        .querySelectorAll(`input[name="estrellas"]`)
        .forEach((element) => {
          if (element.checked) {
            patient_rating = element.value;
          }
        });
      let datos = {
        patient_feedback: patient_feedback,
        patient_rating: patient_rating,
      };
      let formBody = JSON.stringify(datos);

      axios
        .put(
          App.methods.getBackUrl() +
            "/appointment/" +
            this.$data.idAppointment +
            "/qualify/",
          formBody,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          }
        )
        .then(() => {
          this.$data.checkClasifiacion = true;
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.cancelStudentAppointment();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    getPatientSchedule() {
      axios
        .get(
          App.methods.getBackUrl() +
            "/patient/" +
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
          let schedules = response.data.message;
          this.putPatientScheduleInCalendar(schedules);
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
    getPatientAppointments(page) {
      axios
        .get(
          App.methods.getBackUrl() +
            "/patient/" +
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

          if (appointments.length == 0) {
            this.$data.idPage = this.$data.lastPage;
          } else {
            this.$data.lastPage += 1;
          }

          this.putPatientAppointmentInTable(appointments);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getPatientAppointments(page);
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    backPage() {
      if (this.$data.idPage > 0) {
        this.$data.idPage -= 1;
        this.$data.lastPage -= 1;
        this.getPatientAppointments(this.$data.idPage);
      }
    },
    nextPage() {
      this.$data.idPage += 1;
      this.getPatientAppointments(this.$data.idPage);
    },
    filteredData() {
      var filterKey = document.getElementById("query").value;
      var filterAppointments = this.$data.appointments;

      filterAppointments = filterAppointments.filter(function (row) {
        return Object.keys(row).some(function (key) {
          return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
        });
      });

      this.putPatientAppointmentInTable(filterAppointments);
    },
  },
  mounted() {
    this.getPatientAppointments(0);
    this.getPatientSchedule();
  },
};
</script>

<style>
#spnClasificacion {
  width: 90%;
  color: rgb(0, 80, 21);
}
</style>
