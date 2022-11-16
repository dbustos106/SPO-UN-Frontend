<template>
<div id="roomManagContainer" class="container">
    <div class="card login-card">
      <div class="row no-gutters">
        <section v-show="errorShow">
          <div class="alertBar error">
            <span title="error" class="alertBar-message">
              <i class="fa fa-exclamation-circle"></i>
              <span id="adminErrorNotification"></span>
            </span>
            <span class="alertBar-dismiss">
              <a class="cta"></a>
            </span>
          </div>
        </section>
        <p class="login-card-description mt-5 mx-auto mb-4">Citas</p>

          <!-- ======= Overlay ======= -->
          <transition name="fade">
            <div
              class="modal-overlay"
              v-if="addRoomHoursShow"
            ></div>
          </transition>
          <!-- End Overlay -->

          <transition name="fade">
            <div
              id="appointmentWindow"
              class="modal-mask"
              v-if="addRoomHoursShow"
            >
              <h1>Editar Horarios</h1>
              <roomHourEditor>

              </roomHourEditor>
              <div class="row">
              <button class="btnGris mx-auto" v-on:click="closeRoomModal()">
                Cerrar
              </button>
            </div>
            </div>
          </transition>

          <div class="form-group">
            <div class="col-12">
              <label>Consultorio</label>
            </div>
            <div class="row">
              <div class="col-6">
              <select
                ref="place"
                class="form-select mx-auto"
                required
                id="roomSelect"
              >
                <option selected disabled value="Consultorio">
                  Consultorio
                </option>
              </select>
              
            </div>
            <div class="col-6">
              <button v-on:click="getRoomById()" >Ver horarios</button>
            </div>

            <!-- ======= TableOfRoomHours ======= -->
            <div class="row mx-auto">
              <table id="tableOfRoomHours" ref="tableOfRoomHours">
                <thead>
                  <tr>
                    <td>Fecha de inicio</td>
                    <td>Fecha de fin</td>
                    <td>Eliminar</td>
                  </tr>
                </thead>
                <tbody>
                  <tr></tr>
                </tbody>
              </table>
              <button v-on:click="openRoomModal()">Agregar Horarios</button>
            </div>
            <!-- End TableOfRoomHours -->

            <div class="row">
              <div id="calendarContainer" class="container">
                <FullCalendar
                  id="calendar"
                  class="mx-auto"
                  ref="fullCalendar"
                  :options="calendarOptions"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import App from "../../App.vue";
import roomHourEditor from "./roomHourEditor.vue"
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


export default{
  name: "roomManagement",

  components: {
    FullCalendar,roomHourEditor
  },
  data() {
    return {
      rooms: {},
      errorShow: false,
      successShow: false,
      earliestDate: null,
      deleteWindowShow: false,
      addRoomHoursShow: false,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "timeGridWeek",
        locale: "es",
        selectable: true,
        allDaySlot:false,
        height: 650,
        events: [],
      },
    };
  },
  mounted() {
    this.isOpened = this.isMenuOpen;
    this.putRooms();
  },
  methods: {
    
    putRooms(){
      let tablaRoom = document.getElementById("roomSelect");
      axios
        .get(App.methods.getBackUrl() + "/room/all", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.RefreshToken,
          },
        })
        .then((response) => {
          let rooms=response.data.message;
          console.log(rooms);
          this.$data.rooms = {}
          for(var i in rooms){
            let newOption = document.createElement("option");
            newOption.value = rooms[i].roomDTO.id;
            newOption.innerHTML = rooms[i].buildingDTO.name + " " + rooms[i].roomDTO.name;
            tablaRoom.append(newOption);
            this.$data.rooms[
              rooms[i].buildingDTO.name + " " + rooms[i].roomDTO.name
            ] = rooms[i].roomDTO.id;
            console.log(this.$data.rooms);
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
    getRoomById(){
      let calendarApi = this.$refs.fullCalendar.getApi();
      let selectedRoom=document.getElementById("roomSelect").value;
      this.$data.earliestDate = "3000-12-31T11:59:59";
      axios
        .get(App.methods.getBackUrl() + "/room/"+selectedRoom + "/schedules", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.RefreshToken,
          },
        })
        .then((response) => {
          let tableOfRoomHours=document.getElementById("tableOfRoomHours");

          while (tableOfRoomHours.children[1].firstChild != tableOfRoomHours.children[1].lastChild) {
            var child = tableOfRoomHours.children[1].lastChild;
            child.remove();
          }

          let roomHours=response.data.message;
          console.log(response)
          for(var i in roomHours){

            let row = tableOfRoomHours.insertRow();
            let start_timeCell = row.insertCell();
            let end_timeCell = row.insertCell();
            let btnDeleteCell = row.insertCell();

            start_timeCell.appendChild(
              document.createTextNode(roomHours[i].start_time)
            );
            end_timeCell.appendChild(
              document.createTextNode(roomHours[i].end_time)
            );

            // button delete
            let newButtonDelete = document.createElement("button");
            newButtonDelete.innerHTML = "Eliminar Horario";
            newButtonDelete.addEventListener(
              "click",
              function () {
                this.$data.idAppointment = roomHours[i].id;
                console.log(this.$data.idAppointment);
                //this.$data.deleteWindowShow = true;
              }.bind(this)
            );
            btnDeleteCell.appendChild(newButtonDelete);

            if (new Date(roomHours[i].start_time).getTime() < new Date(this.$data.earliestDate).getTime()) {
              this.$data.earliestDate = roomHours[i].start_time;
            }

            this.calendarOptions.events = [
              ...this.calendarOptions.events,
              {
                id: roomHours[i].id,
                title: roomHours[i].room_id,
                start: roomHours[i].start_time,
                end: roomHours[i].end_time,
                color: "green",
              },
            ];
          }

          calendarApi.gotoDate(this.$data.earliestDate); //Go to min date
          
        })
        .catch((err)=>{
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getRoomOptions();
            } else {
              this.$router.push("/login");
            }
          }
        })
    },
    openRoomModal(){
      let selectedRoomVer=document.getElementById("roomSelect").value;
      if(selectedRoomVer != "Consultorio"){
        this.$data.addRoomHoursShow=true;
      }else{
        this.errorFunction("Por favor seleccione un cuarto");
      }
    },
    closeRoomModal(){
      this.$data.addRoomHoursShow=false;
    },
    errorFunction(messageText) {
      this.$data.errorShow = true;
      this.$data.successShow = false;
      let errorDiv = document.getElementById("adminErrorNotification");
      errorDiv.innerHTML = messageText;
      setTimeout(() => {
        this.$data.errorShow = false;
      }, 5000);
    },
  }
}
</script>

<style>
#RoomManagContainer {
  width: 70%;
}


#appointmentWindow {
  top: 2%;
  left: 24%;
  width: 65%;
  height: 95%;
}
</style>