<template>
  <div class="row">
    <!-- ====== dataTentative ====== -->
    <div id="tentativeRoom" class="col-12 mx-auto" style="text-align: center">
      <p id="appointmentId">ID Cita: {{ idAppointment }}</p>
      <p id="selectedStartTime">Hora inicial: {{ selectedStartTime }}</p>
      <p id="selectedEndTime">Hora Final: {{ selectedEndTime }}</p>

      <div class="container mx-auto mt-1">
        <!-- ======= DatePicker ======= -->
        <div class="row mb-2">
          <div class="col-5">
            <datepicker
              ref="datepicker1"
              v-model="startDate"
              name="startTime"
              showNowButton
              :minDate="new Date()"
              modelType="yyyy-MM-dd HH:mm:ss"
              placeholder="Fecha de inicio"
            >
            </datepicker>
          </div>
          <div class="col-5">
            <datepicker
              v-model="endDate"
              name="endTime"
              showNowButton
              :minDate="new Date()"
              modelType="yyyy-MM-dd HH:mm:ss"
              placeholder="Fecha de fin"
            >
            </datepicker>
          </div>
          <div class="col-1">
            <button class="btnGrisTq" v-on:click="addRoomHours()">v</button>
          </div>
        </div>
      </div>
      <!-- End DatePicker -->

      <!-- ======= tentativeTable ======= -->
      <div class="row mb-2">
        <div id="tentativeRoomDates">
          <table id="roomNewHours">
            <thead>
              <tr>
                <td>Fecha inicio</td>
                <td>Fecha final</td>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- End tentativeTable -->

      <!-- ====== MessageShow ====== -->
      <div class="row mx-auto">
        <section v-show="errorShow">
          <div class="alertBar error">
            <span title="error" class="alertBar-message">
              <i class="fa fa-exclamation-circle"></i>
              <span id="errorNotification"></span>
            </span>
            <span class="alertBar-dismiss">
              <a class="cta"></a>
            </span>
          </div>
        </section>
        <section v-show="successShow">
          <div class="success_green">
            <span title="success" class="alertBar-message">
              <i class="fa fa-exclamation-circle"></i>
              <span id="successNotification"></span>
            </span>
            <span class="alertBar-dismiss">
              <a class="cta"></a>
            </span>
          </div>
        </section>
      </div>
      <!-- End MessageShow -->
    </div>

    <!-- ====== btnCrear ====== -->
    <div class="row mx-auto">
      <button
        id="createAppointment"
        ref="createAppointment"
        class="btnBlue mx-auto"
        v-on:click="sendNewHours()"
      >
        Cambiar Horario
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
//import { response } from "express";
import axios from "axios";
import App from "../../App.vue";

export default {
  name: "roomHourEditor",
  components: {
    datepicker,
  },
  props: {
    idAppointment: {
      type: String,
      required: true,
      default: "101",
    },
    selectedStartTime: {
      type: String,
      required: true,
    },
    selectedEndTime: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      startDate: ref(),
      endDate: ref(),
      newStartTime: "",
      newEndTime: "",
      errorShow: false,
      successShow: false,
    };
  },
  methods: {
    addRoomHours() {
      if (
        this.$data.startDate != undefined &&
        this.$data.endDate != undefined &&
        new Date(this.$data.startDate).getTime() <
          new Date(this.$data.endDate).getTime()
      ) {
        var table = document.getElementById("roomNewHours");
        if (table.children[1].children.length == 2) {
          table.children[1].lastChild.remove();
        }
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        cell1.appendChild(document.createTextNode(this.$data.startDate));
        cell2.appendChild(document.createTextNode(this.$data.endDate));
      } else if (
        new Date(this.$data.startDate).getTime() >
        new Date(this.$data.endDate).getTime()
      ) {
        this.errorFunction(
          "La hora de inicio es mayor a la hora de finalización"
        );
      }
    },
    sendNewHours() {
      let schedulesTable = document.getElementById("roomNewHours").children[1];
      if (schedulesTable.children.length >= 2) {
        this.newStartTime = schedulesTable.children[1].children[0].innerHTML;
        this.newEndTime = schedulesTable.children[1].children[1].innerHTML;
        let hoursBack = {
          id: this.idAppointment,
          start_time: this.newStartTime,
          end_time: this.newEndTime,
        };
        console.log(hoursBack);

        axios
          .put(App.methods.getBackUrl() + "/schedule/edit", hoursBack, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.RefreshToken,
            },
          })
          .then((response) => {
            console.log(response);
            document.getElementById("selectedStartTime").innerHTML =
              this.newStartTime;
            document.getElementById("selectedEndTime").innerHTML =
              this.newEndTime;
            this.successFunction("El horario se ha actualizado con éxito");
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status == 403) {
              if (App.methods.requestRefreshToken()) {
                this.getRoomOptions();
              } else {
                this.$router.push("/login");
              }
            }
          });
      } else {
        this.errorFunction("No tiene ningún horario seleccionado");
      }
    },
    successFunction(messageText) {
      this.$data.errorShow = false;
      this.$data.successShow = true;
      let errorDiv = document.getElementById("successNotification");
      errorDiv.innerHTML = messageText;
      setTimeout(() => {
        this.$data.successShow = false;
      }, 5000);
    },
    errorFunction(messageText) {
      this.$data.errorShow = true;
      this.$data.successShow = false;
      let errorDiv = document.getElementById("errorNotification");
      errorDiv.innerHTML = messageText;
      setTimeout(() => {
        this.$data.errorShow = false;
      }, 5000);
    },
  },
  mounted() {},
};
</script>

<style>
#hourRoomAppointment {
  align-items: center;
}

#tentativeRoom {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 25px -15px rgba(0, 0, 0, 0.3);
  color: #000;
  font-size: 15px;
  font-weight: 400;
  align-items: center;
  text-align: center;
  min-width: 250px;
  margin-left: 10px;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

#tentativeDates {
  overflow: auto;
  height: 250px;
  width: 470px;
}
</style>
