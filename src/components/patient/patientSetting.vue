<template>
  <div class="container marco">
    <div class="card mt-5 mb-3">
      <div class="row no-gutters">
        <div class="col">
          <h2 class="card-description mt-3">Datos</h2>
          <div class="form-group needs-validation" id="form">
            <div class="row mx-auto">
              <div class="col-sm-10 mx-auto">
                <span>Nombre de usuario</span>
                <input
                  class="form-control"
                  type="text"
                  name="username"
                  placeholder="Username"
                  id="nptUsername"
                  required
                />
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-sm-5 ml-auto">
                <span>Nombre</span>
                <input
                  class="form-control"
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  id="nptName"
                  required
                />
              </div>
              <div class="col-sm-5 mr-auto">
                <span>Apellido</span>
                <input
                  class="form-control"
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  id="nptLastName"
                  required
                />
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-md-5 ml-auto">
                <span>Tipo de documento</span>
                <select
                  class="form-select mx-auto"
                  required
                  id="slcDocumentType"
                >
                  <option selected disabled value="">Tipo de documento</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="CE">Cédula Extranjera</option>
                  <option value="TE">Tarjeta Extranjera</option>
                </select>
              </div>
              <div class="col-md-5 mr-auto">
                <span>Número de documento</span>
                <input
                  class="form-control"
                  type="number"
                  id="nptDocumentNumber"
                  min="1"
                  pattern="^[0-9]+"
                  onpaste="return false;"
                  onDrop="return false;"
                  autocomplete="off"
                  name="ID"
                  placeholder="Número de documento"
                  required
                />
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-sm-5 ml-auto">
                <span>Correo</span>
                <input
                  class="form-control"
                  type="email"
                  id="nptEmail"
                  name="email"
                  placeholder="Correo electrónico"
                  required
                />
              </div>
              <div class="col-sm-5 mr-auto">
                <span>Edad</span>
                <input
                  class="form-control"
                  type="number"
                  id="nptAge"
                  min="1"
                  max="200"
                  onpaste="return false;"
                  onDrop="return false;"
                  autocomplete="off"
                  name="age"
                  placeholder="Edad"
                  required
                />
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-md-5 ml-auto">
                <span>Género</span>
                <select class="form-select mx-auto" required id="slcGender">
                  <option selected disabled value="">Género</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                  <option value="noEspecifica">Sin especificar</option>
                </select>
              </div>
              <div class="col-md-5 mr-auto">
                <span>Tipo de sangre</span>
                <select class="form-select mx-auto" required id="slcBloodType">
                  <option selected disabled value="">Tipo de sangre</option>
                  <option value="A+">A positivo</option>
                  <option value="A-">A negativo</option>
                  <option value="B+">B positivo</option>
                  <option value="B-">B negativo</option>
                  <option value="AB+">AB positivo</option>
                  <option value="AB-">AB negativo</option>
                  <option value="O+">O positivo</option>
                  <option value="O-">O negativo</option>
                </select>
              </div>
            </div>

            <div class="col-4 mx-auto mb-1">
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

            <div class="col-4 mx-auto mt-3 mb-4">
              <button class="btn btn-block mx-auto" v-on:click="update">
                Guardar
              </button>
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

export default {
  name: "registro-estudiante",
  data() {
    return {
      errorShow: false,
      successShow: false,
    };
  },
  methods: {
    async loadData() {
      axios
        .get(App.methods.getBackUrl() + "/patient/" + sessionStorage.Id, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then((response) => {
          let patient = response.data.message;
          document.getElementById("nptUsername").value = patient.username;
          document.getElementById("nptName").value = patient.name;
          document.getElementById("nptLastName").value = patient.last_name;
          document.getElementById("nptEmail").value = patient.email;
          document.getElementById("slcDocumentType").value =
            patient.document_type;
          document.getElementById("nptDocumentNumber").value =
            patient.document_number;
          document.getElementById("slcGender").value = patient.gender;
          document.getElementById("nptAge").value = patient.age;
          document.getElementById("slcBloodType").value = patient.blood_type;
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.loadData();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    update() {
      var username = document.getElementById("nptUsername").value;
      var name = document.getElementById("nptName").value;
      var lastName = document.getElementById("nptLastName").value;
      var email = document.getElementById("nptEmail").value;
      var documentType = document.getElementById("slcDocumentType").value;
      var documentNumber = document.getElementById("nptDocumentNumber").value;
      var gender = document.getElementById("slcGender").value;
      var age = document.getElementById("nptAge").value;
      var bloodType = document.getElementById("slcBloodType").value;
      if (
        username == "" ||
        name == "" ||
        lastName == "" ||
        email == "" ||
        documentNumber == "" ||
        gender == "" ||
        age == "" ||
        bloodType == ""
      ) {
        this.errorFunction("Faltan datos por llenar");
      } else {
        let datos = {
          id: sessionStorage.Id,
          username: username,
          name: name,
          last_name: lastName,
          email: email,
          document_type: documentType,
          document_number: documentNumber,
          age: parseInt(age),
          gender: gender,
          blood_type: bloodType,
        };
        let formBody = JSON.stringify(datos);

        axios
          .put(App.methods.getBackUrl() + "/patient/edit", formBody, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          })
          .then(() => {
            this.successFunction("Guardado Exitoso");
          })
          .catch((err) => {
            this.errorFunction("Error, correo o documento ya registrado");
            if (err.response.status == 403) {
              if (App.methods.requestRefreshToken()) {
                this.update();
              } else {
                this.$router.push("/login");
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
  mounted() {
    this.loadData();
  },
};
</script>
