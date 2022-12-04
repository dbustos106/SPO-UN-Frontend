<template>
  <div class="container marco">
    <div class="card mt-5 mb-3">
      <h2 class="card-description mt-5 mb-5">Administrar edificios</h2>

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

            <button class="btnRed ml-1" @click="deleteBuilding">
              Eliminar
            </button>
          </div>
        </div>
      </transition>
      <!-- End deleteWindow -->

      <div id="buildingContainer" class="mx-auto">
        <!-- ======= buildingsTable ======= -->
        <div class="TableContainer">
          <table id="tblBuildings">
            <thead>
              <tr>
                <td>ID</td>
                <td>Edificio</td>
                <td>Eliminar</td>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <!-- End buildingsTable -->

        <div class="row mt-4">
          <div class="">
            <input
              class="form-control"
              type="text"
              name="name"
              placeholder="Nombre del edificio"
              id="nptName"
              required
            />
          </div>
        </div>

        <div class="row">
          <div class="col-4 mx-auto mt-3 mb-1">
            <section v-show="errorShow">
              <div class="alertBar error">
                <span title="error" class="alertBar-message">
                  <em class="fa fa-exclamation-circle"></em>
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
                  <em class="fa fa-exclamation-circle"></em>
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
          <div class="col-4 mx-auto">
            <button
              class="btn btn-block mx-auto mb-4"
              v-on:click="createBuilding"
            >
              Crear nuevo edificio
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
  name: "createBuilding",

  data() {
    return {
      errorShow: false,
      successShow: false,
      deleteWindowShow: false,
      IDtoDelete: "",
    };
  },
  methods: {
    putBuildingsInTable(buildings) {
      let table = document.getElementById("tblBuildings");
      while (table.children[1].firstChild != table.children[1].lastChild) {
        var child = table.children[1].lastChild;
        child.remove();
      }

      for (var i in buildings) {
        var row = table.insertRow();
        var cell1 = row.insertCell();
        var cell2 = row.insertCell();
        var buttonCell = row.insertCell();
        cell1.appendChild(document.createTextNode(buildings[i].id));
        cell2.appendChild(document.createTextNode(buildings[i].name));

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
    },
    getBuildings() {
      axios
        .get(App.methods.getBackUrl() + "/building/all", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.RefreshToken,
          },
        })
        .then((response) => {
          let buildings = response.data.message.content;
          this.putBuildingsInTable(buildings);
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
    createBuilding() {
      var name = document.getElementById("nptName").value;
      if (name == "") {
        this.errorFunction("Ingrese el nombre del edificio");
      } else {
        let datos = {
          name: name,
        };
        let formBody = JSON.stringify(datos);
        axios
          .post(App.methods.getBackUrl() + "/building/save", formBody, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          })
          .then(() => {
            this.getBuildings();
            this.successFunction("Edificio añadido con éxito");
          })
          .catch((err) => {
            this.errorFunction("Error");
            if (err.response.status == 403) {
              if (App.methods.requestRefreshToken()) {
                this.createBuilding();
              } else {
                this.$router.push("/login");
              }
            }
          });
      }
    },
    deleteBuilding() {
      axios
        .delete(
          App.methods.getBackUrl() +
            "/building/" +
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
          let buildingsTableChildren =
            document.getElementById("tblBuildings").children[1].children;
          for (var i = 1; i < buildingsTableChildren.length; i++) {
            if (
              buildingsTableChildren[i].children[0].textContent ==
              this.$data.IDtoDelete
            ) {
              buildingsTableChildren[i].remove();
              this.$data.deleteWindowShow = false;
              break;
            }
          }
          this.successFunction("El edificio ha sido eliminado");
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.deleteBuilding();
            } else {
              this.$router.push("/login");
            }
          } else if (err.response.status == 400) {
            this.errorFunction(
              "No se pudo eliminar este edificio. Revise si este tiene cuartos asociados."
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
    this.getBuildings();
  },
};
</script>

<style>
#buildingContainer {
  width: 90%;
}
</style>
