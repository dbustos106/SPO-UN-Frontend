<template>
  <div class="row">
    <!-- ====== DataAppointment ====== -->
    <div id="dataAppointment" class="col-5 mx-auto" style="text-align: center">
      <h4 ref="id" class="text mb-3">Información de la cita</h4>
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
              <option selected disabled value="Lugar de atención">
                Lugar de atención
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!-- End DataAppointment -->

    <!-- ====== dataTentative ====== -->
    <div id="dataTentative" class="col-6 mx-auto" style="text-align: center">
      <h4 class="text mb-3">Fechas tentativas</h4>

      <!-- ======= tentativeTable ======= -->
      <div class="row mb-2">
        <div id="tentativeDates">
          <table id="fechas-tentativas">
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
          <button class="btnGrisTq" @click="addDate">^</button>
        </div>
      </div>
      <!-- End DatePicker -->

      <button class="btnBlue mx-auto mt-3" v-on:click="deleteDate">
        Eliminar
      </button>
    </div>
    <!-- End DataTentative -->

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
import App from "../../App.vue";
import axios from "axios";

import { ref } from "vue";
import datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "createAppointment",
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
  },
  methods: {
    getRoomOptions() {
      let tablaRoom = document.getElementById("roomSelect");
      axios
        .get("http://localhost:8081/room/all", {
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
      if (this.startDate != undefined && this.endDate != undefined && new Date(this.startDate).getTime() < new Date(this.endDate).getTime()) {
        var table = document.getElementById("fechas-tentativas");
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        cell1.appendChild(document.createTextNode(this.startDate));
        cell2.appendChild(document.createTextNode(this.endDate));
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
      if (selectedRoom != "Lugar de atención" && procedureType != "") {
        
        let schedulesTable = document.getElementById("fechas-tentativas").children[1].children;
        let tentativeSchedules = [];
        if(schedulesTable.length>1){
          for (var i = 1; i < schedulesTable.length; i++) {
            let startTime = schedulesTable[i].children[0].innerHTML;
            let endTime = schedulesTable[i].children[1].innerHTML;
            tentativeSchedules.push({
              start_time: startTime.replace("T", " "),
              end_time: endTime.replace("T", " "),
            });

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
                .post("http://localhost:8081/appointment/save", formAppointmentBody, {
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.AccessToken,
                  },
                })
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
          }
        }else{
        this.errorFunction("No hay fechas tentativas seleccionadas");
      }
        
      } else {
        this.errorFunction("Faltan datos por llenar");
      }
    
    },
    updateAppointment() {
      let selectedRoom = document.getElementById("roomSelect").value;
      let procedureType = document.getElementById("description").value;
      if (selectedRoom != "Lugar de atención" && procedureType != "") {
        let schedulesTable =
          document.getElementById("fechas-tentativas").children[1];

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
          .put("http://localhost:8081/appointment/edit", formAppointmentBody, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          })
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
        .get("http://localhost:8081/appointment/" + this.id, {
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
      let table = document.getElementById("fechas-tentativas");
      if (table.children[1].firstChild != table.children[1].lastChild) {
        table.children[1].lastChild.remove();
      }
    },
    successFunction(messageText) {
      this.$data.errorShow = false;
      this.$data.successShow = true;
      let errorDiv = document.getElementById("successNotification");
      errorDiv.innerHTML = messageText;
      setTimeout(() => {}, 1000);
    },
    errorFunction(messageText) {
      this.$data.errorShow = true;
      this.$data.successShow = false;
      let errorDiv = document.getElementById("errorNotification");
      errorDiv.innerHTML = messageText;
      setTimeout(() => {}, 1000);
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
  },
};
</script>
<style>
#dataAppointment {
  background-color: #fff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 0 25px -15px rgba(0, 0, 0, 0.3);
  color: #000;
  font-size: 15px;
  font-weight: 400;
  margin: 0 0 25px;
  width: 500px;
  align-items: center;
}
#dataTentative {
  background-color: #fff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 0 25px -15px rgba(0, 0, 0, 0.3);
  color: #000;
  font-size: 15px;
  font-weight: 400;
  margin: 0 0 25px;
  width: 500px;
  height: 50%;
  align-items: center;
  text-align: center;
}

#btnAddDate {
  width: 70px;
  height: 34px;
  margin-right: 50px;
  margin-top: 0px;
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

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.textarea {
  width: 100%;
  background-color: #f8f8f8;
  font-size: 15px;
}
</style>
