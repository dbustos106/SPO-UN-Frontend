<template>
  <div>
    <!-- ======= Overlay ======= -->
    <transition name="fade">
      <div class="modal-overlay" v-show="showModal"></div>
    </transition>
    <!-- End Overlay -->

    <!-- ======= confirmWindow ======= -->
    <transition name="fade">
      <div class="modal-mask" v-show="showModal">
        <div class="row">
          <label id="modalAppointmentTitle">Hola</label>
          <label> ¿Desea reservar esta cita? </label>
        </div>
        <div class="row">
          <div class="col-6">
            <button
              id="makeReservation"
              class="modalButton"
              v-on:click="reserveAppointment()"
            >
              Si
            </button>
          </div>
          <div class="col-6">
            <button
              id="return"
              class="modalButton"
              v-on:click="showModal = false"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </transition>
    <!-- End confirmWindow -->
  </div>

  <!-- ======= ProcedureSearchCalendarContainer ======= -->
  <div id="ProcedureSearchCalendarContainer" class="container">
    <div class="card login-card">
      <div class="row no-gutters">
        <p class="login-card-description mt-5 mx-auto mb-4">Citas</p>
        <span
          class="col-12"
          id="AppointmetReserveSuccessMessage"
          v-if="showConfirmMessage"
        >
          <label>Cita reservada con éxito. Revise su cronograma</label>
        </span>

        <label class="login-card-description mx-auto" id="labelUp1"
          >Citas disponibles en
        </label>
        <label class="login-card-description mx-auto" id="labelUp3"
          >verde</label
        >

        <label class="login-card-description" id="labelUp2"
          >Haga click sobre el horario deseado para reservar la cita</label
        >
        <div class="col-11 mx-auto">
          <FullCalendar
            ref="procedureCalendar"
            id="patientProcedureCalendar"
            :options="calendarOptions"
          />
        </div>
      </div>
    </div>
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
  name: "CalendarioEstudiante",
  components: { FullCalendar },
  data() {
    return {
      showModal: false,
      showConfirmMessage: false,
      selectedInitialDate: "",
      selectedEndDate: "",
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
          console.log("Click evento");
          console.log(info.event.id);
          this.$data.selectedInitialDate = info.event.start;
          this.$data.selectedEndDate = info.event.end;
          this.$data.selectedAppointmentId = info.event.id;
          this.$data.selectedAppointmentType = info.event.title;
          console.log(this.$data.selectedAppointmentId);
          this.$data.showModal = true;
          document.getElementById("modalAppointmentTitle").innerHTML =
            "Cita para el día " +
            this.formatDate(this.$data.selectedInitialDate) +
            " para " +
            this.$data.selectedAppointmentType.toLowerCase();

          //this.$refs.modalAppontmentReserveWindow.$refs.modalAppointmentStartTime.innerHTML=info.event.start;
        }.bind(this),
      },
    };
  },
  methods: {
    reserveAppointment() {
      let reserveData = {
        start_time: this.$data.selectedInitialDate
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
        end_time: this.$data.selectedEndDate
          .toISOString()
          .slice(0, 19)
          .replace("T", " "),
      };
      let reserveDataBody = JSON.stringify(reserveData);
      console.log(reserveData);
      //console.log(sess)
      axios
        .put(
          "http://localhost:8081/appointment/" +
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

      return `${date}/${month}/${year} a las ${hour}`;
    },
  },
};
</script>

<style>
#ProcedureSearchCalendarContainer {
  width: 100%;
  height: 100%;
  z-index: 50;
}

#AppointmetReserveSuccessMessage {
  background-color: #73e600;
}

#labelUp1 {
  font-size: 1.3em;
}

#labelUp2 {
  font-size: 1.3em;
}

#labelUp3 {
  font-size: 1.3em;
  color: rgb(98, 228, 65);
}

.modalButton {
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 15px;

  display: block;
  padding: 10px 25px;
  font-size: 18px;
  font-weight: bold;
  z-index: 20000;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
}

#makeReservation {
  background: rgb(147, 247, 80);
}

#return {
  background: rgb(255, 19, 19);
}
</style>
