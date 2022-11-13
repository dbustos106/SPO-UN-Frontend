<template>
  <div class="container marco-modal">
    <h2 id="titleAppointmentWindow"></h2>
    <div class="row mx-auto mb-1 mt-2" style="text-align: center">
      <!-- ====== DataAppointment ====== -->
      <div id="dataAppointment" class="col mr-1">
        <h3 ref="id" class="text mb-3">Información de la cita</h3>
        <div class="form-horizontal">
          <div class="form-group">
            <div class="col-12">
              <span>Tipo de procedimiento:</span>
            </div>
            <div class="col-12">
              <textarea
                class="textarea"
                ref="procedure_type"
                rows="5"
                cols="40"
                id="procedure_type"
              ></textarea>
            </div>
          </div>
          <div class="form-group">
            <div class="col-12">
              <span>Consultorio</span>
            </div>
            <div class="col-12">
              <select
                ref="place"
                class="form-select mx-auto"
                required
                id="slcRoom"
              >
                <option selected disabled value="">Lugar de atención</option>
              </select>
            </div>
          </div>
          <div class="form-group" v-if="patientShow">
            <div class="col-12">
              <span>Hora inicio: </span>
              <span>{{ appointmentStartTime }}</span>
            </div>
            <div class="col-12">
              <span>Hora fin: </span>
              <span>{{ appointmentEndTime }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- End DataAppointment -->

      <!-- ====== TentativeDates ====== -->
      <div id="dataTentative" class="col ml-1" v-if="tentativeShow">
        <h3 class="text mb-3">Fechas tentativas</h3>
        <div id="tentativeDatesContainer" class="container mx-auto mb-1">
          <table id="tblTentativeDates">
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

        <div class="container mx-auto mt-1">
          <div class="row mb-2">
            <datepicker
              v-model="startDate"
              name="startTime"
              class="datePicker"
              showNowButton
              :minDate="new Date()"
              modelType="yyyy-MM-dd HH:mm:ss"
              placeholder="Fecha de inicio"
            >
            </datepicker>
            <datepicker
              v-model="endDate"
              name="endTime"
              class="datePicker"
              showNowButton
              :minDate="new Date()"
              modelType="yyyy-MM-dd HH:mm:ss"
              placeholder="Fecha de fin"
            >
            </datepicker>
            <button class="btnGrisTq" @click="addDate">^</button>
          </div>
          <button class="btnBlue mx-auto mt-3 mb-3" v-on:click="deleteDate">
            Eliminar
          </button>
        </div>
      </div>
      <!-- End TentativeDates -->

      <!-- ====== Patient ====== -->
      <div id="dataPatient" class="col ml-1" v-if="patientShow">
        <h3 class="text mb-3">Paciente</h3>
        <div class="form-horizontal">
          <div class="col">
            <span> Nombre: </span>
            <span>{{ patientName }}</span>
            <span> Apellido: </span>
            <span>{{ patientLasName }}</span>
          </div>
          <div class="col">
            <span class=""> Correo: </span>
            <span>{{ patientEmail }}</span>
          </div>
          <div class="col">
            <span class="mr-1">{{ patientDocumentType }}</span>
            <span>{{ patientDocumentNumber }}</span>
            <span> Edad: </span>
            <span>{{ patientDocumentAge }}</span>
            <span> Tipo de sangre: </span>
            <span>{{ patientBloodType }}</span>
          </div>
        </div>
        <div class="form-horizontal">
          <h3 class="text mb-3">Calificación</h3>
          <span id="feedback"> feedback </span>
          <div class="form-group">
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
    </div>
    <!-- End Patient -->

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

    <!-- ====== buttons ====== -->
    <div class="row mx-auto">
      <button
        id="btnCreateAppointment"
        class="btnBlue mx-auto"
        v-on:click="sendAppointment"
      >
        Crear cita
      </button>
    </div>
    <div class="row mx-auto">
      <button class="btnGris mx-auto" @click="closeWindow">Cerrar</button>
    </div>
    <!-- End buttons -->
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

  data() {
    return {
      rooms: {},
      errorShow: false,
      successShow: false,
      tentativeShow: true,
      patientShow: true,
      startDate: ref(),
      endDate: ref(),
      patientName: "",
      patientLasName: "",
      patientEmail: "",
      patientDocumentType: "",
      patientDocumentNumber: "",
      patientDocumentAge: "",
      patientBloodType: "",
      appointmentStartTime: "",
      appointmentEndTime: "",
    };
  },
  components: {
    datepicker,
  },
  emits: {
    close: null,
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
    addDate() {
      if (
        this.startDate != undefined &&
        this.endDate != undefined &&
        new Date(this.startDate).getTime() < new Date(this.endDate).getTime()
      ) {
        var schedulesTable = document.getElementById("tblTentativeDates");
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
    deleteDate() {
      let schedulesTable = document.getElementById("tblTentativeDates");
      if (
        schedulesTable.children[1].firstChild !=
        schedulesTable.children[1].lastChild
      ) {
        schedulesTable.children[1].lastChild.remove();
      }
    },
    getRoomOptions() {
      let tablaRoom = document.getElementById("slcRoom");
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
    sendAppointment() {
      if (this.id != -1) {
        this.updateAppointment();
      } else {
        this.createAppointment();
      }
    },
    createAppointment() {
      let selectedRoom = document.getElementById("slcRoom").value;
      let procedureType = document.getElementById("procedure_type").value;
      let schedulesTable =
        document.getElementById("tblTentativeDates").children[1];

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
          tentativeScheduleDTOS: tentativeSchedules,
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
      let selectedRoom = document.getElementById("slcRoom").value;
      let procedureType = document.getElementById("procedure_type").value;
      if (selectedRoom != "Lugar de atención" && procedureType != "") {
        let schedulesTable =
          document.getElementById("tblTentativeDates").children[1];

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
          tentativeScheduleDTOS: tentativeSchedules,
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
            this.successFunction("Cita guardada con éxito");
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

          document.getElementById("slcRoom").value =
            fullAppointment.building + " " + fullAppointment.room;
          document.getElementById("procedure_type").value =
            fullAppointment.appointmentDTO.procedure_type;

          if (fullAppointment.appointmentDTO.patient_id != null) {
            this.$data.tentativeShow = false;
            this.$data.patientName = fullAppointment.patientDTO.name;
            this.$data.patientLasName = fullAppointment.patientDTO.last_name;
            this.$data.patientEmail = fullAppointment.patientDTO.email;
            this.$data.patientDocumentType =
              fullAppointment.patientDTO.document_type;
            this.$data.patientDocumentNumber =
              fullAppointment.patientDTO.document_number;
            this.$data.patientDocumentAge = fullAppointment.patientDTO.age;
            this.$data.patientBloodType = fullAppointment.patientDTO.blood_type;
            this.$data.appointmentStartTime =
              fullAppointment.appointmentDTO.start_time;
            this.$data.appointmentEndTime =
              fullAppointment.appointmentDTO.end_time;

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
          } else {
            this.$data.patientShow = false;
          }

          for (var schedule of fullAppointment.tentativeScheduleDTOS) {
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
    closeWindow() {
      this.$emit("close");
    },
  },
  mounted() {
    this.getRoomOptions();
    if (this.id != -1) {
      this.getStudentAppointmentById(this.id);
      document.getElementById("btnCreateAppointment").innerHTML = "Guardar";
    } else {
      this.$data.patientShow = false;
      document.getElementById("btnCreateAppointment").innerHTML = "Crear cita";
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
#dataPatient {
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

#tentativeDatesContainer {
  overflow: auto;
  height: 210px;
  width: 98%;
}

#btnAddDate {
  width: 70px;
  height: 34px;
  margin-right: 50px;
  margin-top: 0px;
}
</style>
