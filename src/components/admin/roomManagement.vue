<template>
  <div class="container marco">
    <div class="card mt-5 mb-3">
      <div class="row no-gutters">
        <h2 class="card-description mt-5 mb-5">Citas</h2>

        <!-- ======= Overlay ======= -->
        <transition name="fade">
          <div
            class="modal-overlay"
            v-if="deleteWindowShow || createWindowShow"
          ></div>
        </transition>
        <!-- End Overlay -->

        <!-- ======= deleteWindow ======= -->
        <transition name="fade">
          <div class="modal-mask deleteWindow" v-if="deleteWindowShow">
            <h2>Confirmación</h2>
            <span>¿Desea eliminar el horario?</span>
            <div class="row justify-content-center">
              <button class="btnGris mr-1" @click="deleteWindowShow = false">
                Cerrar
              </button>

              <button class="btnRed ml-1" @click="deleteScheduleById">
                Eliminar
              </button>
            </div>
          </div>
        </transition>
        <!-- End deleteWindow -->

        <!-- ======= createWindow ======= -->
        <transition name="fade">
          <div
            id="appointmentWindow"
            class="modal-mask"
            v-if="createWindowShow"
          >
            <roomHourEditor @close="getSchedulesRoomById" :idRoom="idRoom">
            </roomHourEditor>
          </div>
        </transition>
        <!-- End createWindow -->

        <!-- ======= Error ======= -->
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
        <!-- End Error -->

        <div id="ScheduleContainer" class="mx-auto">
          <span>Seleccione un consultorio</span>
          <!-- ======= RoomSelect ======= -->
          <div class="form-group">
            <div class="row">
              <div class="col-6">
                <select
                  ref="place"
                  class="form-select mx-auto"
                  @change="getSchedulesRoomById"
                  required
                  id="roomSelect"
                >
                  <option selected disabled value="">Consultorio</option>
                </select>
              </div>
            </div>
          </div>
          <!-- End RoomSelect -->

          <!-- ======= TableOfRoomHours ======= -->
          <div class="TableContainer mb-5">
            <table id="tblSchedulesByRoom_id" ref="tblSchedulesByRoom_id">
              <thead>
                <tr>
                  <td>ID Cita</td>
                  <td>Fecha de inicio</td>
                  <td>Fecha de fin</td>
                  <td>Eliminar</td>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
              </tbody>
            </table>
          </div>
          <!-- End TableOfRoomHours -->

          <button class="btnBlue" @click="createSchedule">Crear horario</button>

          <hr width="100%" />
          <hr width="100%" />

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
</template>

<script>
import axios from "axios";
import App from "../../App.vue";
import roomHourEditor from "./roomHourEditor.vue";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  name: "roomManagement",

  data() {
    return {
      rooms: {},
      errorShow: false,
      successShow: false,
      earliestDate: null,
      idSchedule: -1,
      idRoom: -1,
      deleteWindowShow: false,
      createWindowShow: false,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "timeGridWeek",
        locale: "es",
        selectable: true,
        allDaySlot: false,
        slotMinTime: "06:00:00",
        slotMaxTime: "19:00:00",
        eventTextColor: "black",
        height: 650,
        events: [],
      },
    };
  },
  components: {
    FullCalendar,
    roomHourEditor,
  },
  methods: {
    getRoomsInOptions() {
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
          let rooms = response.data.message;
          this.$data.rooms = {};
          for (var i in rooms) {
            let newOption = document.createElement("option");
            newOption.value = rooms[i].roomDTO.id;
            newOption.innerHTML =
              rooms[i].buildingDTO.name + " " + rooms[i].roomDTO.name;
            tablaRoom.append(newOption);
            this.$data.rooms[
              rooms[i].buildingDTO.name + " " + rooms[i].roomDTO.name
            ] = rooms[i].roomDTO.id;
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getRoomsInOptions();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    getSchedulesRoomById() {
      let calendarApi = this.$refs.fullCalendar.getApi();
      let selectedRoom = document.getElementById("roomSelect").value;
      this.$data.earliestDate = "3000-12-31T11:59:59";
      this.$data.createWindowShow = false;
      this.calendarOptions.events = [];

      axios
        .get(
          App.methods.getBackUrl() + "/room/" + selectedRoom + "/schedules",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.RefreshToken,
            },
          }
        )
        .then((response) => {
          let tblSchedulesByRoom_id = document.getElementById(
            "tblSchedulesByRoom_id"
          );

          while (
            tblSchedulesByRoom_id.children[1].firstChild !=
            tblSchedulesByRoom_id.children[1].lastChild
          ) {
            var child = tblSchedulesByRoom_id.children[1].lastChild;
            child.remove();
          }

          let schedulesByRoom_id = response.data.message;
          for (var i in schedulesByRoom_id) {
            let idSchedule = schedulesByRoom_id[i].id;
            let row = tblSchedulesByRoom_id.insertRow();
            let id_cell = row.insertCell();
            let start_timeCell = row.insertCell();
            let end_timeCell = row.insertCell();
            let btnDeleteCell = row.insertCell();

            id_cell.appendChild(
              document.createTextNode(schedulesByRoom_id[i].id)
            );

            start_timeCell.appendChild(
              document.createTextNode(schedulesByRoom_id[i].start_time)
            );
            end_timeCell.appendChild(
              document.createTextNode(schedulesByRoom_id[i].end_time)
            );

            // button delete
            let newButtonDelete = document.createElement("button");
            newButtonDelete.innerHTML = "Eliminar";
            newButtonDelete.addEventListener(
              "click",
              function () {
                this.$data.idSchedule = idSchedule;
                this.$data.deleteWindowShow = true;
              }.bind(this)
            );
            btnDeleteCell.appendChild(newButtonDelete);

            if (
              new Date(schedulesByRoom_id[i].start_time).getTime() <
              new Date(this.$data.earliestDate).getTime()
            ) {
              this.$data.earliestDate = schedulesByRoom_id[i].start_time;
            }

            this.calendarOptions.events = [
              ...this.calendarOptions.events,
              {
                id: schedulesByRoom_id[i].id,
                title: "Salón " + schedulesByRoom_id[i].room_id,
                start: schedulesByRoom_id[i].start_time,
                end: schedulesByRoom_id[i].end_time,
                color: "#73e600",
              },
            ];
          }
          if (this.$data.earliestDate !== "3000-12-31T11:59:59") {
            calendarApi.gotoDate(this.$data.earliestDate); //Go to min date
          }

          if (
            document.getElementById("tblSchedulesByRoom_id").children[1]
              .children.length < 2
          ) {
            this.errorFunction("No hay horarios asignados a esta sala");
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getSchedulesRoomById();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    createSchedule() {
      if (document.getElementById("roomSelect").value != "") {
        this.$data.idRoom = parseInt(
          document.getElementById("roomSelect").value,
          10
        );
        this.$data.createWindowShow = true;
      } else {
        this.errorFunction("seleccione el salón en que desea crear el horario");
      }
    },
    deleteScheduleById() {
      axios
        .delete(
          App.methods.getBackUrl() +
            "/schedule/" +
            this.$data.idSchedule +
            "/delete",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          }
        )
        .then(() => {
          this.$data.deleteWindowShow = false;
          this.getSchedulesRoomById();
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.deleteScheduleById();
            } else {
              this.$router.push("/login");
            }
          }
          if (err.response.status == 400) {
            this.errorFunction(
              "Este horario corresponde a una cita asignada, no puede eliminarse"
            );
          }
        });
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
    this.getRoomsInOptions();
  },
};
</script>
