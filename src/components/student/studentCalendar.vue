<template>
  <div class="container marco">
    <div class="card">
      <div class="row no-gutters">
        <h2 class="card-description mx-auto mt-5 mb-4">Citas</h2>

        <!-- ======= Overlay ======= -->
        <transition name="fade">
          <div
            class="modal-overlay"
            v-if="deleteWindowShow || appointmentWindowShow"
          ></div>
        </transition>
        <!-- End Overlay -->

        <!-- ======= appointmentWindow ======= -->
        <transition name="fade">
          <div
            id="appointmentWindow"
            class="modal-mask"
            v-if="appointmentWindowShow"
          >
            <appointmentWindow
              ref="appointmentWindow"
              :id="idAppointment"
              :title="titleAppointmentWindow"
            >
            </appointmentWindow>
            <div class="row">
              <button class="btnGris mx-auto" @click="updateData">
                Cerrar
              </button>
            </div>
          </div>
        </transition>
        <!-- End appointmentWindow -->

        <!-- ======= deleteWindow ======= -->
        <transition name="fade">
          <div id="deleteWindow" class="modal-mask" v-if="deleteWindowShow">
            <h2>Confirmación</h2>
            <p>¿Desea cancelar la cita?</p>
            <button class="btnGris mr-4" @click="deleteWindowShow = false">
              Cerrar
            </button>

            <button class="btnRed" @click="deleteStudentAppointment">
              Cancelar
            </button>
          </div>
        </transition>
        <!-- End deleteWindow -->

        <!-- ======= AppointmentsTable ======= -->
        <div id="AppointmentContainer" class="row mx-auto">
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
          <!-- ======= Buttons ======= -->
          <div class="row">
            <button class="btnGrisLq mr-1" v-on:click="backPage">&lt;</button>
            <button class="btnGrisLq" v-on:click="nextPage">&gt;</button>
            <div class="col-5">
              <button class="btnBlue" @click="createAppointment">
                Crear cita
              </button>
            </div>
          </div>
          <!-- End Buttons -->
        </div>
        <!-- End AppointmentsTable -->

        <hr width="100%" />
        <hr width="100%" />

        <!-- ======= StudentCalendarContainer section ======= -->
        <div class="row mx-auto">
          <div id="calendarContainer" class="container">
            <FullCalendar
              id="calendar"
              class="mx-auto"
              ref="fullCalendar"
              :options="calendarOptions"
            />
          </div>
        </div>
        <!-- End StudentCalendarContainer -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import App from "../../App.vue";

import "@fullcalendar/core/vdom";
import appointmentWindow from "./appointmentWindow.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  name: "studentCalendar",

  components: {
    FullCalendar,
    appointmentWindow,
  },
  data() {
    return {
      idPage: 0,
      lastPage: 0,
      idAppointment: -1,
      titleAppointmentWindow: "",
      appointmentWindowShow: false,
      deleteWindowShow: false,
      btnSelected: null,
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
      this.calendarOptions.events = [];
      for (var i in schedules) {
        this.calendarOptions.events = [
          ...this.calendarOptions.events,
          {
            id: schedules[i].appointment_id,
            title: "Cita " + schedules[i].appointment_id,
            date: schedules[i].start_time,
            color: color,
          },
        ];
      }
    },
    putStudentAppointmentsInTable(appointments) {
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
            this.$data.titleAppointmentWindow = "Cita seleccionada";
            this.$data.appointmentWindowShow = true;
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
    deleteStudentAppointment() {
      // close modal window
      this.$data.deleteWindowShow = false;
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
            "/student/cancelAppointment/" +
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
          App.methods.getBackUrl() +
            "/student/" +
            sessionStorage.Id +
            "/schedule",
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
      axios
        .get(
          App.methods.getBackUrl() +
            "/student/" +
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
    getStudentAppointments(idPage) {
      axios
        .get(
          App.methods.getBackUrl() +
            "/student/" +
            sessionStorage.Id +
            "/appointments/",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
            params: { page: idPage, size: 6 },
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
            this.putStudentAppointmentsInTable(appointments);
          } else {
            this.$data.idPage = this.$data.lastPage;
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getStudentAppointments(idPage);
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    createAppointment() {
      this.$data.idAppointment = -1;
      this.$data.appointmentWindowShow = true;
      this.$data.titleAppointmentWindow = "Crear cita";
    },
    updateData() {
      this.$data.appointmentWindowShow = false;
      this.getStudentAppointments(0);
      this.getStudentSchedule();
      this.getStudentUnconfirmedSchedule();
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
        this.getStudentAppointments(this.$data.idPage);
      }
    },
    nextPage() {
      let table = document.getElementById("AppointmentsTable");
      this.$data.idPage += 1;

      while (table.children[1].firstChild != table.children[1].lastChild) {
        var child = table.children[1].lastChild;
        child.remove();
      }
      this.getStudentAppointments(this.$data.idPage);
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
#appointmentWindow {
  top: 2%;
  left: 24%;
  width: 65%;
  height: 95%;
}
@media (max-width: 767px) {
  #appointmentWindow {
    left: 10%;
  }
}
#AppointmentContainer {
  width: 90%;
  overflow-x: auto;
}
</style>
