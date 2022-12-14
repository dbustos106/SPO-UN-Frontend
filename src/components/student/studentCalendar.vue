<template>
  <div class="container marco">
    <div class="card mt-5 mb-3">
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
            :idAppointment="idAppointment"
            :title="titleAppointmentWindow"
            @close="updateData"
          >
          </appointmentWindow>
        </div>
      </transition>
      <!-- End appointmentWindow -->

      <!-- ======= deleteWindow ======= -->
      <transition name="fade">
        <div class="modal-mask deleteWindow" v-if="deleteWindowShow">
          <h2>Confirmación</h2>
          <span>¿Desea cancelar la cita?</span>
          <div class="row justify-content-center">
            <button class="btnGris mr-1" @click="deleteWindowShow = false">
              Cerrar
            </button>

            <button class="btnRed ml-1" @click="cancelStudentAppointment">
              Cancelar
            </button>
          </div>
        </div>
      </transition>
      <!-- End deleteWindow -->

      <div id="AppointmentContainer" class="mx-auto">
        <!-- ======= AppointmentsTable ======= -->
        <div class="TableContainer">
          <table id="tblAppointments">
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
        <button class="btnGrisLq mr-1" v-on:click="nextPage">&gt;</button>
        <button class="btnBlue" @click="createAppointment">Crear cita</button>
        <!-- End Buttons -->

        <hr width="100%" />
        <hr width="100%" />

        <!-- ======= StudentCalendarContainer ======= -->
        <FullCalendar
          class="mb-4"
          ref="fullCalendar"
          :options="calendarOptions"
        />
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
  components: {
    FullCalendar,
    appointmentWindow,
  },
  methods: {
    putStudentScheduleInCalendar(schedules, color) {
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
      let table = document.getElementById("tblAppointments");

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
        newButtonDetail.textContent = "Detalles";
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
        newButtonDelete.textContent = "Cancelar";
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
    cancelStudentAppointment() {
      // close modal window
      this.$data.deleteWindowShow = false;
      // delete row from table
      this.$data.btnSelected.parentElement.parentElement.remove();

      // delete event from calendar
      let calendarApi = this.$refs.fullCalendar.getApi();

      var event = calendarApi.getEventById(this.$data.idAppointment);
      while (event != null) {
        event.remove();
        event = calendarApi.getEventById(this.$data.idAppointment);
      }

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
              this.cancelStudentAppointment();
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
          let schedules = response.data.message;
          this.putStudentScheduleInCalendar(schedules, "green");
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
          let unconfirmedSchedules = response.data.message;
          this.putStudentScheduleInCalendar(unconfirmedSchedules, "yellow");
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

          this.putStudentAppointmentsInTable(appointments);
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
      this.calendarOptions.events = [];
      this.$data.appointmentWindowShow = false;
      this.getStudentAppointments(0);
      this.getStudentSchedule();
      this.getStudentUnconfirmedSchedule();
    },
    backPage() {
      if (this.$data.idPage > 0) {
        this.$data.idPage -= 1;
        this.$data.lastPage -= 1;
        this.getStudentAppointments(this.$data.idPage);
      }
    },
    nextPage() {
      this.$data.idPage += 1;
      this.getStudentAppointments(this.$data.idPage);
    },
  },
  mounted() {
    this.calendarOptions.events = [];
    this.getStudentAppointments(0);
    this.getStudentSchedule();
    this.getStudentUnconfirmedSchedule();
  },
};
</script>

<style>
#AppointmentContainer {
  width: 90%;
}
#appointmentWindow {
  top: 10%;
  left: 27%;
  width: 65%;
  max-height: 83%;
}
@media (max-width: 767px) {
  #appointmentWindow {
    left: 25%;
  }
}
</style>
