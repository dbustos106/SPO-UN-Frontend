<template>
  <div class="container marco">
    <div class="card mt-5 mb-3">
      <h2 class="card-description mt-5 mb-5">Registro consultorio</h2>
      <div class="form-group needs-validation" id="form">
        <div class="row mx-auto">
          <div class="ml-auto">
            <select class="form-select mx-auto" required id="slcBuilding">
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
          let buildingInfo = response.data.message;
          this.$data.buildings = {};
          for (var i in buildingInfo) {
            let newOption = document.createElement("option");
            newOption.value =
              buildingInfo[i].buildingDTO.id + " " + buildingInfo[i].buildingDTO.name;
            newOption.innerHTML =
              buildingInfo[i].buildingDTO.id + " " + buildingInfo[i].buildingDTO.name;
              tablaBuilding.append(newOption);
            this.$data.buildings[
              buildingInfo[i].buildingDTO.id + " " + buildingInfo[i].buildingDTO.name
            ] = buildingInfo[i].buildingDTO.id;
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getBuildingOptions();
            } else {
              this.$router.push("/admin");
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
          building: building,
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
            this.successFunction("Registro Exitoso");
          })
          .catch((err) => {
            this.errorFunction("Error");
            if (err.response.status == 403) {
              if (App.methods.requestRefreshToken()) {
                this.register();
              } else {
                this.$router.push("/admin");
              }
            }
          });
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
    mounted() {
      this.getBuildingOptions();
    },
  },
};
</script>
