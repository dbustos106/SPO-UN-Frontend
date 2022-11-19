<template>
    <div class="container marco">
      <div class="card mt-5 mb-3">
        <h2 class="card-description mt-5 mb-5">Registro edificio</h2>
        <div class="form-group needs-validation" id="form">
          <div class="row mx-auto">
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
    name: "createBuilding",
  
    data() {
      return {
        errorShow: false,
        successShow: false,
      };
    },
    methods: {
      register() {
        var name = document.getElementById("nptName").value;
        if (
          name == ""
        ) {
          this.errorFunction("Faltan datos por llenar");
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
    },
  };
  </script>
  