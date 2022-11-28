<template>
  <div class="container marco">
    <div class="card mt-5 mb-3">
      <h2 class="card-description mt-5 mb-3">Administrar salas</h2>

      <!-- ======= Overlay ======= -->
      <transition name="fade">
        <div class="modal-overlay" v-if="deleteWindowShow"></div>
      </transition>
      <!-- End Overlay -->

      <!-- ======= deleteWindow ======= -->
      <transition name="fade">
        <div class="modal-mask deleteWindow" v-if="deleteWindowShow">
          <h2>Confirmación</h2>
          <span>¿Desea eliminar este edificio?</span>
          <div class="row justify-content-center">
            <button class="btnGris mr-1" @click="deleteWindowShow = false">
              Cerrar
            </button>

            <button class="btnRed ml-1" @click="deleteRoom">Eliminar</button>
          </div>
        </div>
      </transition>
      <!-- End deleteWindow -->

      <div id="roomContainer" class="mx-auto">
        <div class="form-group needs-validation" id="form">
          <div class="ml-auto">
            <select
              ref="place"
              class="form-select mx-auto"
              required
              id="slcBuilding"
              @change="getRooms"
            >
              <option selected value="">Edificio</option>
            </select>
          </div>
        </div>
        <!-- ======= buildingsTable ======= -->
        <div class="TableContainer">
          <table id="tblRooms">
            <thead>
              <tr>
                <td>ID</td>
                <td>Edificio</td>
                <td>Cuarto</td>
                <td>Eliminar</td>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>

        <!-- End buildingsTable -->

        <div class="row">
          <div class="col-4 mx-auto mt-3 mb-1">
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
        </div>

        <div class="row">
          <div class="col-12 mx-auto">
            <input
              class="form-control"
              type="text"
              name="name"
              placeholder="Nombre o número del consultorio"
              id="nptName"
              required
            />
          </div>
          <div class="col-4 mx-auto">
            <button class="btn btn-block mx-auto mb-4" v-on:click="createRoom">
              Crear salón
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import App from "../../App.vue";

export default {
  name: "createRoom",

  data() {
    return {
      buildings: {},
      errorShow: false,
      successShow: false,
      buildingsMounted: false,
      deleteWindowShow: false,
      IDtoDelete: "",
    };
  },
  methods: {
    getBuildingOptions() {
      let slcBuildings = document.getElementById("slcBuilding");
      axios
        .get(App.methods.getBackUrl() + "/building/all", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then((response) => {
          let buildings = response.data.message.content;
          this.$data.buildings = {};
          for (var i in buildings) {
            let newOption = document.createElement("option");
            newOption.value = buildings[i].id;
            newOption.textContent = buildings[i].id + " " + buildings[i].name;
            slcBuildings.append(newOption);
            this.$data.buildings[buildings[i].id + " " + buildings[i].name] =
              buildings[i].id;
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getBuildingOptions();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    putRoomsInTable(rooms, buildingId) {
      let table = document.getElementById("tblRooms");
      while (table.children[1].firstChild != table.children[1].lastChild) {
        var child = table.children[1].lastChild;
        child.remove();
      }

      for (var i in rooms) {
        if (rooms[i].buildingDTO.id == buildingId || buildingId == "") {
          var row = table.insertRow();
          var cell1 = row.insertCell();
          var cell2 = row.insertCell();
          var cell3 = row.insertCell();
          var buttonCell = row.insertCell();
          cell1.appendChild(document.createTextNode(rooms[i].roomDTO.id));
          cell2.appendChild(document.createTextNode(rooms[i].buildingDTO.name));
          cell3.appendChild(document.createTextNode(rooms[i].roomDTO.name));

          // button delete
          let newButtonDelete = document.createElement("button");
          newButtonDelete.textContent = "Eliminar";
          newButtonDelete.addEventListener(
            "click",
            function () {
              this.$data.deleteWindowShow = true;
              this.$data.IDtoDelete =
                newButtonDelete.parentElement.parentElement.children[0].textContent;
            }.bind(this)
          );
          buttonCell.appendChild(newButtonDelete);
        }
      }
    },
    getRooms() {
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
          let buildingId = document.getElementById("slcBuilding").value;
          this.putRoomsInTable(rooms, buildingId);
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getRooms();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    createRoom() {
      var name = document.getElementById("nptName").value;
      var building = document.getElementById("slcBuilding").value;
      if (name == "" || building == "") {
        this.errorFunction("Faltan datos por llenar");
      } else {
        let datos = {
          name: name,
          building_id: building,
        };
        let formBody = JSON.stringify(datos);
        axios
          .post(App.methods.getBackUrl() + "/room/save", formBody, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          })
          .then(() => {
            this.getRooms();
            this.successFunction("Cuarto añadido con exitoso");
          })
          .catch((err) => {
            this.errorFunction("Error");
            if (err.response.status == 403) {
              if (App.methods.requestRefreshToken()) {
                this.createRoom();
              } else {
                this.$router.push("/login");
              }
            }
          });
      }
    },
    deleteRoom() {
      axios
        .delete(
          App.methods.getBackUrl() +
            "/room/" +
            this.$data.IDtoDelete +
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
          let roomsTableChildren =
            document.getElementById("tblRooms").children[1].children;
          for (var i = 1; i < roomsTableChildren.length; i++) {
            if (
              roomsTableChildren[i].children[0].textContent ==
              this.$data.IDtoDelete
            ) {
              roomsTableChildren[i].remove();
              this.$data.deleteWindowShow = false;
              break;
            }
          }
          this.successFunction("El cuarto ha sido eliminado");
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.deleteRoom();
            } else {
              this.$router.push("/login");
            }
          } else if (err.response.status == 400) {
            this.errorFunction(
              "Este cuarto tiene citas reservadas. No se puede eliminar."
            );
            this.$data.deleteWindowShow = false;
          }
        });
    },
    successFunction(messageText) {
      this.$data.errorShow = false;
      this.$data.successShow = true;
      let errorDiv = document.getElementById("successNotification");
      errorDiv.textContent = messageText;
      setTimeout(() => {
        this.$data.successShow = false;
      }, 5000);
    },
    errorFunction(messageText) {
      this.$data.errorShow = true;
      this.$data.successShow = false;
      let errorDiv = document.getElementById("errorNotification");
      errorDiv.textContent = messageText;
      setTimeout(() => {
        this.$data.errorShow = false;
      }, 5000);
    },
  },
  mounted() {
    this.isOpened = this.isMenuOpen;
    this.getBuildingOptions();
    this.getRooms();
  },
};
</script>

<style>
#roomContainer {
  width: 90%;
}
</style>
