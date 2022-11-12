<template>
  <!-- ======= Overlay ======= -->
  <transition name="fade">
    <div class="modal-overlay" v-show="showModal"></div>
  </transition>
  <!-- End Overlay -->

  <!-- ======= confirmWindow ======= -->
  <transition name="fade">
    <div class="modal-mask confirmWindow" v-show="showModal">
      <div class="row">
        <label id="modalAppointmentTitle">Hola</label>
        <label> ¿Desea reservar esta cita? </label>
      </div>
      <div class="row-10 mx-auto">
        <button class="btnGreen mr-3" v-on:click="reserveAppointment()">
          Si
        </button>
        <button class="btnRed" v-on:click="showModal = false">No</button>
      </div>
    </div>
  </transition>
  <!-- End confirmWindow -->

  <!-- ======= ProcedureSearchCalendarContainer ======= -->
  <div class="row-sm-12 mb-5">
    <span id="AppointmetReserveSuccessMessage" v-if="showConfirmMessage">
      Cita reservada con éxito. Revise su cronograma
    </span>
  </div>

  <div class="row mb-5">
    <FullCalendar ref="procedureCalendar" :options="calendarOptions" />
  </div>
  <!-- End ProcedureSearchCalendarContainer -->
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
  name: "patientProcedureCalendar",

  components: { FullCalendar },
  emits: {
    confirm: null,
  },
  data() {
    return {
      eventSelected: null,
      showModal: false,
      showConfirmMessage: false,
      selectedInitialDate: "",
      selectedInitialDate2: "",
      selectedEndDate: "",
      selectedEndDate2: "",
      selectedAppointmentId: "",
      selectedAppointmentType: "",
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "timeGridWeek",
        allDaySlot: false,
        selectable: false,
        height: 650,
        slotMinTime: "06:00:00",
        slotMaxTime: "19:00:00",
        locale: "es",
        eventTextColor: "black",
        events: [],
        eventClick: function (info) {
          this.$data.eventSelected = info.event;
          this.$data.showModal = true;
          this.$data.selectedInitialDate = info.event.start;
          this.$data.selectedEndDate = info.event.end;
          this.$data.selectedAppointmentId = info.event.id;
          this.$data.selectedAppointmentType = info.event.title;

          document.getElementById("modalAppointmentTitle").innerHTML =
            "Cita para el día " +
            this.formatDate(
              this.$data.selectedInitialDate,
              this.$data.selectedEndDate
            ) +
            " para " +
            this.$data.selectedAppointmentType.toLowerCase();
        }.bind(this),
      },
    };
  },
  methods: {
    reserveAppointment() {
      let reserveData = {
        start_time: this.formatDate(this.$data.selectedInitialDate2)
          .replace(" a las ", " ")
          .replaceAll("/", "-")
          .replace("AM", ":00")
          .replace("PM", ":00"),
        end_time: this.formatDate(this.$data.selectedEndDate2)
          .replace(" a las ", " ")
          .replaceAll("/", "-")
          .replace("AM", ":00")
          .replace("PM", ":00"),
      };
      let reserveDataBody = JSON.stringify(reserveData);

      axios
        .put(
          App.methods.getBackUrl() +
            "/appointment/" +
            this.$data.selectedAppointmentId +
            "/confirmPatient/" +
            sessionStorage.Id,
          reserveDataBody,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          }
        )
        .then(() => {
          this.$data.showModal = false;
          this.$data.showConfirmMessage = true;
          this.$data.eventSelected.remove();
          this.$emit("confirm");
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
    formatDate(inputDate) {
      this.$data.selectedInitialDate2 = inputDate;
      this.$data.selectedEndDate2 = inputDate;
      let date, month, year, hour, minutes;

      date = inputDate.getDate();
      month = inputDate.getMonth() + 1;
      year = inputDate.getFullYear();
      hour = inputDate.getHours();
      minutes = inputDate.getMinutes();

      date = date.toString().padStart(2, "0");

      month = month.toString().padStart(2, "0");

      if (hour >= 13) {
        hour = hour - 12;
        hour =
          hour.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          "PM";
      } else {
        hour =
          hour.toString().padStart(2, "0") +
          ":" +
          minutes.toString().padStart(2, "0") +
          "AM";
      }

      return `${year}/${month}/${date} a las ${hour}`;
    },
  },
};
</script>

<style>
#AppointmetReserveSuccessMessage {
  background-color: #a1e45e;
}
</style>
