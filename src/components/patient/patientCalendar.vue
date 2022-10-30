<template>
  <!-- ======= AppointmentsContainer ======= -->
  <div id="AppointmentsContainer" class="container">
    <div class="card login-card">
      <div class="row no-gutters">
        <p class="login-card-description mt-5 mx-auto mb-5">Citas</p>

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

            <p>¿Desea cancelar la cita?</p>
            <button id="closeDeleteWindow" @click="deleteWindow = false">
              Cerrar
            </button>
            <button id="confirmDelete" @click="deletePatientAppointment">
              Cancelar
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
                <td>Cancelar</td>
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

        <!-- ======= PatientCalendarContainer section ======= -->
        <div class="row mx-auto">
          <div id="patientCalendarContainer" class="container">
            <FullCalendar
              id="calendar"
              class="mx-auto"
              ref="fullCalendar"
              :options="calendarOptions"
            />
          </div>
        </div>
        <!-- End PatientCalendarContainer -->
      </div>
    </div>
  </div>
  <!-- End AppointmentsContainer -->
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
    putPatientScheduleInCalendar(schedules) {
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
    putPatientAppointmentInTable(appointments) {
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
            this.$data.deleteWindow = true;
          }.bind(this)
        );
        btnDeleteCell.appendChild(newButtonDelete);
      }
    },
    getPatientAppointmentById() {
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
              this.getPatientAppointmentById();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    deletePatientAppointment() {
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
          "http://localhost:8081/patient/cancelAppointment/" +
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
              this.deletePatientAppointment();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    getPatientSchedule() {
      axios
        .get(
          "http://localhost:8081/patient/" + sessionStorage.Id + "/schedule/",
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
            this.putPatientScheduleInCalendar(schedules);
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
    getPatientAppointments(page) {
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
            this.putPatientAppointmentInTable(appointments);
          } else {
            this.$data.idPage = this.$data.lastPage;
          }
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
      let table = document.getElementById("tableOfAppointments");

      if (this.$data.idPage > 0) {
        this.$data.idPage -= 1;
        this.$data.lastPage -= 1;
        while (table.children[1].firstChild != table.children[1].lastChild) {
          var child = table.children[1].lastChild;
          child.remove();
        }
        this.getPatientAppointments(this.$data.idPage);
      }
    },
    nextPage() {
      let table = document.getElementById("tableOfAppointments");
      this.$data.idPage += 1;

      while (table.children[1].firstChild != table.children[1].lastChild) {
        var child = table.children[1].lastChild;
        child.remove();
      }
      this.getPatientAppointments(this.$data.idPage);
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
#AppointmentsContainer {
  width: 70%;
}

#tableOfAppointments {
  width: 90%;
  height: fit-content;
  position: center;
  margin-left: 50px;
  padding: 20px 20px;
}
#patientCalendarContainer {
  width: 90%;
  margin-top: 10px;
  color: rgb(17, 0, 50);
  height: fit-content;
  position: relative;
  padding: 20px 20px;
}

#backButton {
  width: 100%;
  margin-top: 10px;
  background-color: rgba(87, 89, 94, 0.7);
  border-radius: 4px;
  font-size: 13px;
  color: #fff;
  margin-bottom: 15px;
}

#nextButton {
  width: 100%;
  margin-top: 10px;
  background-color: rgba(87, 89, 94, 0.7);
  border-radius: 4px;
  font-size: 13px;
  line-height: 20px;
  color: #fff;
  margin-bottom: 15px;
}

a,
h2 {
  color: rgb(0, 11, 44);
  text-decoration: none;
}
.fc-daygrid-body {
  width: 100%;
}

.fc .fc-col-header-cell-cushion {
  display: inline-block;
  padding: 2px 4px;
}

#deleteWindow {
  text-align: center;
}

#closeDetailWindow {
  background: rgb(200, 197, 197);
  border-color: rgb(0, 0, 0);
  border-radius: 5px;
  width: 100px;
  color: #fff;
}

#closeDeleteWindow {
  background: rgb(200, 197, 197);
  border-color: rgb(0, 0, 0);
  border-radius: 5px;
  color: #fff;
  padding: 5px;
  margin-right: 20px;
}

#confirmDelete {
  background: rgb(148, 1, 1);
  border-color: rgb(61, 0, 0);
  border-radius: 5px;
  color: #fff;
  padding: 5px;
  margin-left: 20px;
}
</style>
