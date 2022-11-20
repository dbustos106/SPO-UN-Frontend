<template>
  <div class="container marco">
    <div class="card mt-5 mb-3">
      <h2 class="card-description mt-5 mb-5">Administrar salas</h2>
      <!-- ======= Overlay ======= -->
      <transition name="fade">
          <div
            class="modal-overlay"
            v-if="deleteWindowShow"
          ></div>
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

              <button class="btnRed ml-1" @click="deleteRoom">
                Eliminar
              </button>
            </div>
          </div>
        </transition>
        <!-- End deleteWindow -->
         <!-- ======= buildingsTable ======= -->
         <div class="row mb-2">
              <div id="buildings">
              <table id="allRooms">
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
          </div>
          <!-- End buildingsTable -->
      <div class="form-group needs-validation" id="form">
        <div class="row mx-auto">
          <div class="ml-auto">
            <select ref="place" class="form-select mx-auto" required id="slcBuilding">
              <option selected disabled value="">Edificio</option>
            </select>
            <input
              class="form-control"
              type="text"
              name="name"
              placeholder="Nombre o número del consultorio"
              id="nptName"
              required
            />
          </div>
        </div>

        <div class="row mx-auto">
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

        <div class="row mx-auto">
          <div class="col-4 mx-auto">
            <button class="btn btn-block mx-auto mb-4" v-on:click="register">
              Registrar
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
      let tablaBuilding = document.getElementById("slcBuilding");
      axios
        .get(App.methods.getBackUrl() + "/building/all", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then((response) => {
          let buildingInfo = response.data.message.content;
          this.$data.buildings = {};
          for (var i in buildingInfo) {
            let newOption = document.createElement("option");
            newOption.value =
              buildingInfo[i].id;
            newOption.innerHTML =
              buildingInfo[i].id + " " + buildingInfo[i].name;
            tablaBuilding.append(newOption);
            this.$data.buildings[
              buildingInfo[i].id + " " + buildingInfo[i].name
            ] = buildingInfo[i].id;
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              //this.getBuildingOptions();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    putRooms(){
      axios
        .get(App.methods.getBackUrl() + "/room/all", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.RefreshToken,
          },
        })
        .then((response) => {
          let roomsTable=document.getElementById("allRooms");
          let allRooms=response.data.message;
          console.log(allRooms);
          for(var i in allRooms){
            var row = roomsTable.insertRow();
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            var cell3 = row.insertCell();
            var buttonCell = row.insertCell();
            cell1.appendChild(document.createTextNode(allRooms[i].roomDTO.id));
            cell2.appendChild(document.createTextNode(allRooms[i].buildingDTO.name));
            cell3.appendChild(document.createTextNode(allRooms[i].roomDTO.name));

            // button delete
            let newButtonDelete = document.createElement("button");
            newButtonDelete.innerHTML = "Eliminar";
            newButtonDelete.addEventListener(
              "click",
              function () {
                this.$data.deleteWindowShow = true;
                this.$data.IDtoDelete = newButtonDelete.parentElement.parentElement.children[0].innerHTML;
              }.bind(this)
            );
            buttonCell.appendChild(newButtonDelete);
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
    register() {
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
            let buildingsTable=document.getElementById("allRooms");
            var row = buildingsTable.insertRow();
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            var cell3 = row.insertCell();
            var buttonCell = row.insertCell();
            cell1.appendChild(document.createTextNode(name));
            cell2.appendChild(document.createTextNode(building));
            cell3.appendChild(document.createTextNode(name));

            // button delete
            let newButtonDelete = document.createElement("button");
            newButtonDelete.innerHTML = "Eliminar";
            newButtonDelete.addEventListener(
              "click",
              function () {
                this.$data.deleteWindowShow = true;
                this.$data.IDtoDelete = newButtonDelete.parentElement.parentElement.children[0].innerHTML;
              }.bind(this)
            );
            buttonCell.appendChild(newButtonDelete);
            this.successFunction("Cuarto añadito con exitoso");
          })
          .catch((err) => {
            this.errorFunction("Error");
            if (err.response.status == 403) {
              if (App.methods.requestRefreshToken()) {
                this.register();
              } else {
                this.$router.push("/login");
              }
            }
          });
      }
    },
    deleteRoom(){
      axios
        .delete(App.methods.getBackUrl() + "/room/" +this.$data.IDtoDelete +"/delete" ,{
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then(() => {
          let roomsTableChildren=document.getElementById("allRooms").children[1].children;
            for(var i=1; i< roomsTableChildren.length;i++){
              if(roomsTableChildren[i].children[0].innerHTML==this.$data.IDtoDelete){
                roomsTableChildren[i].remove();
                this.$data.deleteWindowShow=false;
                break;
              }
            }
          this.successFunction("El cuarto ha sido eliminado");
        })
        .catch((err) => {
          console.log(err);
          this.errorFunction("Error");
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.register();
            } else {
              this.$router.push("/login");
            }
          }else if(err.response.status == 400){
            this.errorFunction("Este cuarto tiene citas reservadas. No se puede eliminar.");
            this.$data.deleteWindowShow = false;
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
    
  },
  mounted() {
    this.isOpened = this.isMenuOpen;
    this.getBuildingOptions();
    this.putRooms();
  }
};
</script>
