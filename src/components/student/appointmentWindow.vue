<template>
  <div class="container marco-modal">
    <h2 id="titleAppointmentWindow" class="card-description mx-auto mb-3"></h2>
    <!-- ====== Appointment ====== -->
    <div class="row mx-auto mb-3">
      <div id="dataAppointment" class="col mr-1" style="text-align: center">
        <h3 ref="id" class="text mb-3">Información de la cita</h3>
        <div class="form-horizontal">
          <div class="form-group">
            <div class="col-12">
              <label>Tipo de procedimiento:</label>
            </div>
            <div class="col-12">
              <textarea
                class="textarea"
                ref="procedure_type"
                rows="5"
                cols="40"
                id="description"
              ></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="col-12">
              <label>Consultorio</label>
            </div>
            <div class="col-12">
              <select
                ref="place"
                class="form-select mx-auto"
                required
                id="roomSelect"
              >
                <option selected disabled value="">Lugar de atención</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div id="dataTentative" class="col ml-1" style="text-align: center">
        <h3 class="text mb-3">Fechas tentativas</h3>

        <!-- ======= tentativeTable ======= -->
        <!--<div class="row mb-2">-->
        <div id="tentativeDates" class="container mx-auto mb-1">
          <table id="tentativeDatesTable">
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
        <!--</div>-->
        <!-- End tentativeTable -->

        <div class="container mx-auto mt-1">
          <!-- ======= DatePicker ======= -->
          <div class="row mb-2">
            <div class="col-5">
              <datepicker
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
              <button class="btnGrisTq" @click="addDate">^</button>
            </div>
          </div>
          <!-- End DatePicker -->

          <button class="btnBlue mx-auto mt-3 mb-3" v-on:click="deleteDate">
            Eliminar
          </button>
        </div>
      </div>
    </div>
    <!-- End Appointment -->

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

    <!-- ====== btnCrear ====== -->
    <div class="row mx-auto">
      <button
        id="createAppointment"
        ref="createAppointment"
        class="btnBlue mx-auto"
        v-on:click="sendAppointment"
      >
        Crear cita
      </button>
    </div>
    <!-- End btnCrear -->
  </div>
</template>

<script>
import axios from "axios";
import App from "../../App.vue";

import { ref } from "vue";
import datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "AppointmentWindow",

  components: {
    datepicker,
  },
  data() {
    return {
      rooms: {},
      errorShow: false,
      successShow: false,
      startDate: ref(),
      endDate: ref(),
    };
  },
  props: {
    id: {
      type: Number,
      required: false,
      default: -1,
    },
    title: {
      type: String,
      required: true,
      default: "Cita",
    },
  },
  methods: {
    getRoomOptions() {
      let tablaRoom = document.getElementById("roomSelect");
      axios
        .get(App.methods.getBackUrl() + "/room/all", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then((response) => {
          let roomInfo = response.data.message;
          this.$data.rooms = {};
          for (var i in roomInfo) {
            let newOption = document.createElement("option");
            newOption.value =
              roomInfo[i].buildingDTO.name + " " + roomInfo[i].roomDTO.name;
            newOption.innerHTML =
              roomInfo[i].buildingDTO.name + " " + roomInfo[i].roomDTO.name;
            tablaRoom.append(newOption);
            this.$data.rooms[
              roomInfo[i].buildingDTO.name + " " + roomInfo[i].roomDTO.name
            ] = roomInfo[i].roomDTO.id;
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getRoomOptions();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    addDate() {
      if (
        this.startDate != undefined &&
        this.endDate != undefined &&
        new Date(this.startDate).getTime() < new Date(this.endDate).getTime()
      ) {
        var schedulesTable = document.getElementById("tentativeDatesTable");
        var row = schedulesTable.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        cell1.appendChild(document.createTextNode(this.startDate));
        cell2.appendChild(document.createTextNode(this.endDate));
      } else if (
        new Date(this.startDate).getTime() > new Date(this.endDate).getTime()
      ) {
        this.errorFunction(
          "Fecha inicial seleccionada es mayor a la fecha final seleccionada"
        );
      }
    },
    sendAppointment() {
      if (this.id != -1) {
        this.updateAppointment();
      } else {
        this.createAppointment();
      }
    },
    createAppointment() {
      let selectedRoom = document.getElementById("roomSelect").value;
      let procedureType = document.getElementById("description").value;
      let schedulesTable = document.getElementById("tentativeDatesTable")
        .children[1];

      if (
        selectedRoom != "" &&
        procedureType != "" &&
        schedulesTable.firstChild != schedulesTable.lastChild
      ) {
        let tentativeSchedules = [];
        for (var element of schedulesTable.childNodes) {
          if (schedulesTable.firstChild != element) {
            let startTime = element.firstChild.innerHTML;
            let endTime = element.lastChild.innerHTML;
            tentativeSchedules.push({
              start_time: startTime.replace("T", " "),
              end_time: endTime.replace("T", " "),
            });
          }
        }

        let newAppointment = {
          appointmentDTO: {
            procedure_type: procedureType,
            room_id: parseInt(this.$data.rooms[selectedRoom]),
          },
          tentativeSchedules: tentativeSchedules,
          students: [sessionStorage.Username],
        };
        let formAppointmentBody = JSON.stringify(newAppointment);

        axios
          .post(
            App.methods.getBackUrl() + "/appointment/save",
            formAppointmentBody,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.AccessToken,
              },
            }
          )
          .then(() => {
            this.successFunction("Cita creada con éxito");
          })
          .catch((err) => {
            if (err.response.status == 403) {
              if (App.methods.requestRefreshToken()) {
                this.createAppointment();
              } else {
                this.$router.push("/login");
              }
            }
          });
      } else {
        this.errorFunction("Faltan datos por llenar");
      }
    },
    updateAppointment() {
      let selectedRoom = document.getElementById("roomSelect").value;
      let procedureType = document.getElementById("description").value;
      if (selectedRoom != "Lugar de atención" && procedureType != "") {
        let schedulesTable = document.getElementById("tentativeDatesTable")
          .children[1];

        let tentativeSchedules = [];
        for (var element of schedulesTable.childNodes) {
          if (schedulesTable.firstChild != element) {
            let startTime = element.firstChild.innerHTML;
            let endTime = element.lastChild.innerHTML;
            tentativeSchedules.push({
              start_time: startTime.replace("T", " "),
              end_time: endTime.replace("T", " "),
            });
          }
        }

        let newAppointment = {
          appointmentDTO: {
            id: this.id,
            procedure_type: procedureType,
            room_id: parseInt(this.$data.rooms[selectedRoom]),
          },
          tentativeSchedules: tentativeSchedules,
          students: [sessionStorage.Username],
        };
        let formAppointmentBody = JSON.stringify(newAppointment);

        axios
          .put(
            App.methods.getBackUrl() + "/appointment/edit",
            formAppointmentBody,
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.AccessToken,
              },
            }
          )
          .then(() => {
            this.successFunction("Cita creada con éxito");
          })
          .catch((err) => {
            if (err.response.status == 403) {
              if (App.methods.requestRefreshToken()) {
                this.createAppointment();
              } else {
                this.$router.push("/login");
              }
            }
          });
      } else {
        this.errorFunction("Faltan datos por llenar");
      }
    },
    getStudentAppointmentById() {
      axios
        .get(App.methods.getBackUrl() + "/appointment/" + this.id, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then((response) => {
          let fullAppointment = response.data.message;

          document.getElementById("roomSelect").value =
            fullAppointment.building + " " + fullAppointment.room;
          document.getElementById("description").value =
            fullAppointment.appointmentDTO.procedure_type;

          for (var schedule of fullAppointment.tentativeSchedules) {
            this.startDate = schedule.start_time;
            this.endDate = schedule.end_time;
            this.addDate();
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getStudentAppointmentById();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    deleteDate() {
      let schedulesTable = document.getElementById("tentativeDatesTable");
      if (
        schedulesTable.children[1].firstChild !=
        schedulesTable.children[1].lastChild
      ) {
        schedulesTable.children[1].lastChild.remove();
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
  mounted() {
    this.getRoomOptions();
    if (this.id != -1) {
      this.getStudentAppointmentById(this.id);
      document.getElementById("createAppointment").innerHTML = "Guardar";
    } else {
      document.getElementById("createAppointment").innerHTML = "Crear cita";
    }
    document.getElementById("titleAppointmentWindow").innerHTML = this.title;
  },
};
</script>

<style>
#dataAppointment {
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 25px -15px rgba(0, 0, 0, 0.3);
  color: #000;
  font-size: 15px;
  font-weight: 400;
  align-items: center;
  min-width: 250px;
  margin-right: 10px;
}
#dataTentative {
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

#btnAddDate {
  width: 70px;
  height: 34px;
  margin-right: 50px;
  margin-top: 0px;
}

#tentativeDates {
  overflow: auto;
  height: 210px;
  width: 98%;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.textarea {
  width: 100%;
  background-color: #f8f8f8;
  font-size: 15px;
}
</style>
