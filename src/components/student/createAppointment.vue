<template>
  <div>
    <div class="form-container" style="text-align: center">
      <h4>Información de la cita</h4>
      <Datepicker
        id="datePicker"
        v-model="date"
        placeholder="Selecciona el rango de las fechas y hora de la cita"
        range
        showNowButton
        modelType="yyyy-MM-dd HH:mm:ss"
        :minDate="new Date()"
        @update:modelValue="addDate"
      >
      </Datepicker>
      <div class="form-horizontal">
        <div class="form-group">
          <span>Describa el tipo de procedimiento a realizar:</span>
          <textarea
            class="textarea"
            rows="4"
            cols="40"
            id="description"
          ></textarea>
        </div>
        <div class="form-group">
          <label>Consultorio</label>
          <select class="form-control text-center" id="roomSelect"></select>
        </div>
        <button class="btn signup" v-on:click="crearCita">Crear cita</button>
      </div>
    </div>
    <div class="table-container" style="text-align: center">
      <h4>Fechas tentativas</h4>
      <div style="overflow-x: auto">
        <table id="fechas-tentativas">
          <tr>
            <th>Fecha inicio</th>
            <th>Fecha final</th>
          </tr>
        </table>
      </div>
      <button class="btn signup" v-on:click="deleteDate">Eliminar fecha</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
const date = ref();
</script>
<script>
import axios from "axios";
export default {
  name: "createAppointment",
  mounted() {
    this.createOptions();
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    createOptions() {
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
          console.log(roomInfo);
          for (var i in roomInfo) {
            let newOption = document.createElement("option");
            console.log(roomInfo[i].roomDTO.id);
            newOption.value = roomInfo[i].roomDTO.id;
            newOption.innerHTML =
              roomInfo[i].buildingDTO.name + " " + roomInfo[i].roomDTO.name;
            tablaRoom.append(newOption);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addDate() {
      console.log(this.date[1] != null);
      if (this.date[1] != null) {
        var table = document.getElementById("fechas-tentativas");
        var row = table.insertRow(-1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        console.log("agregando!");
        //2022-11-1T10:00:00;
        cell1.innerHTML = this.date[0].replace(" ", "T");
        cell2.innerHTML = this.date[1].replace(" ", "T");
      }
    },
    crearCita() {
      let selectedRoom = document.getElementById("roomSelect").value;
      let procedureType = document.getElementById("description").value;
      let tentativeSchedules = [];
      let schedulesTable =
        document.getElementById("fechas-tentativas").children;
      for (var i = 1; i < schedulesTable.length; i++) {
        let startTime = schedulesTable[i].children[0].innerHTML;
        let endTime = schedulesTable[i].children[1].innerHTML;
        tentativeSchedules.push({
          start_time: startTime.replace("T", " "),
          end_time: endTime.replace("T", " "),
        });
      }
      console.log(tentativeSchedules);
      let appointments = {
        appointmentDTO: {
          procedure_type: procedureType,
          room_id: parseInt(selectedRoom),
        },
        tentativeSchedules: tentativeSchedules,
        students: [sessionStorage.Username],
      };
      let formAppointmentsBody = JSON.stringify(appointments);
      console.log(formAppointmentsBody);

      axios
        .post("http://localhost:8081/appointment/save", formAppointmentsBody, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteDate() {
      document.getElementById("fechas-tentativas").deleteRow(1);
    },
    closecreateAppointment() {
      this.$root.$refs.EstudianteArea.$data.createAppointmentShow = false;
    },
  },
};
</script>
<style>
.form-container {
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
  position: fixed;
  top: 50px;
  left: 260px;
}
.table-container {
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
  text-align: center;
  position: absolute;
  top: 18px;
  left: 785px;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}
th,
td {
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
.form-container .form-horizontal {
  font-size: 15px;
}
.textarea {
  resize: none;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 15px;
  padding: 10px;
  margin-left: -25%;
}
.form-container .form-horizontal {
  color: #333;
  width: 50%;
  padding: 0 8px;
  margin: 0 0 15px;
  display: inline-block;
}
.form-container .form-horizontal .form-group:nth-child(4) {
  margin-bottom: 30px;
}
.form-container .form-horizontal .form-group label {
  font-size: 15px;
  font-weight: 400;
}
.form-container .form-horizontal .form-control {
  color: #888;
  background: #fff;
  font-weight: 400;
  letter-spacing: 1px;
  height: 40px;
  width: 160px;
  padding: 6px 12px;
  border-radius: 10px;
  border: 2px solid #e7e7e7;
  box-shadow: none;
  margin: 0px auto;
}
.form-container .form-horizontal .form-control:focus {
  box-shadow: 0 0 5px #dcdcdc;
}
.form-container .signin-link {
  color: #333;
  font-size: 14px;
  width: calc(100% - 190px);
  margin-right: 30px;
  display: inline-block;
  vertical-align: top;
}
.form-container .signin-link a {
  color: #00a9ef;
  font-weight: 600;
  transition: all 0.3s ease 0s;
}
.form-container .signin-link a:hover {
  text-decoration: underline;
}
.form-container .form-horizontal .btn,
.table-container .btn {
  padding: 13px 20px 12px;
  background-color: #1a1d53;
  border-radius: 4px;
  font-size: 17px;
  font-weight: bold;
  line-height: 20px;
  color: #fff;
  margin-bottom: 24px;
  margin-top: 24px;
}
.form-container .form-horizontal .btn:hover,
.table-container .btn:hover {
  border-color: #1a1d53 !important;
  color: #1a1d53 !important;
}
</style>
