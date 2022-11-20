<template>
    <div class="container marco">
      <div class="card mt-5 mb-3">

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

              <button class="btnRed ml-1" @click="deleteBuilding">
                Eliminar
              </button>
            </div>
          </div>
        </transition>
        <!-- End deleteWindow -->
        <h2 class="card-description mt-5 mb-5">Registro edificio</h2>
         <!-- ======= buildingsTable ======= -->
         <div class="row mb-2">
              <div id="buildings">
              <table id="allBuildings">
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
          </div>
          <!-- End buildingsTable -->
        
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
        deleteWindowShow: false,
        IDtoDelete: "",
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
                let buildingsTable=document.getElementById("allBuildings");
                var row = buildingsTable.insertRow();
                var cell1 = row.insertCell();
                var cell2 = row.insertCell();
                var buttonCell = row.insertCell();
                cell1.appendChild(document.createTextNode("ID"));
                cell2.appendChild(document.createTextNode(name));

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
                this.successFunction("Edificio añadido con éxito");
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
      putBuildings(){
      //let tablaRoom = document.getElementById("roomSelect");
      axios
        .get(App.methods.getBackUrl() + "/building/all", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.RefreshToken,
          },
        })
        .then((response) => {
          let buildingsTable=document.getElementById("allBuildings");
          let allBuildings=response.data.message.content;
          console.log(allBuildings);
          for(var i in allBuildings){
            var row = buildingsTable.insertRow();
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            var buttonCell = row.insertCell();
            cell1.appendChild(document.createTextNode(allBuildings[i].id));
            cell2.appendChild(document.createTextNode(allBuildings[i].name));

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
      deleteBuilding(){
        console.log(this.$data.IDtoDelete);
        axios
          .delete(App.methods.getBackUrl() + "/building/" +this.$data.IDtoDelete +"/delete" ,{
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          })
          .then(() => {
            this.successFunction("El edificio ha eliminado");
          })
          .catch((err) => {
            console.log(err);
            this.errorFunction("Error");
            if (err.response.status == 403) {
              if (App.methods.requestRefreshToken()) {
                this.register();
              } else {
                this.$router.push("/admin");
              }
            }else if(err.response.status == 400){
              this.errorFunction("No se pudo eliminar este edificio. Revise si este tiene cuartos asociados");
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
    mounted(){
      this.putBuildings();
    }
  };
  </script>
  