<template>
  <div>
    <!-- ======= Meta datos ======= -->
  <div>
    <!-- <meta charset="UTF-8" /> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>SPO UN - Inicia sesión</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
  </div>
  <!-- End Meta datos -->

  <!-- ======= FormContainer ======= -->
  <div id="formContainer" class="container">
    <div class="card login-card">
      <div class="row no-gutters">
        <div class="col">
          <p class="login-card-description mt-3">Datos</p>
          <div class="form-group needs-validation" id="form">
            <div class="row mx-auto">
              <div class="col-sm-10 mx-auto">
                <a>Username</a>
              </div>
            </div>
            <div class="row mx-auto">
              <div class="col-sm-10 mx-auto">
                <input
                  class="form-control"
                  type="text"
                  name="username"
                  placeholder="Username"
                  id="fusernameR"
                  required
                />
                <div class="valid-feedback">Válido</div>
                <div class="invalid-feedback">
                  No puede estar vacía la casilla
                </div>
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-sm-5 ml-auto">
                <a>Nombre</a>
              </div>
              <div class="col-sm-5 mr-auto">
                <a>Apellido</a>
              </div>
            </div>
            <div class="row mx-auto">
              <div class="col-sm-5 ml-auto">
                <input
                  class="form-control"
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  id="fnameR"
                  required
                />
                <div class="valid-feedback">Válido</div>
                <div class="invalid-feedback">
                  No puede estar vacía la casilla
                </div>
              </div>
              <div class="col-sm-5 mr-auto">
                <input
                  class="form-control"
                  type="text"
                  name="lastName"
                  placeholder="Apellido"
                  id="lnameR"
                  required
                />
                <div class="valid-feedback">Válido</div>
                <div class="invalid-feedback">
                  No puede estar vacía la casilla
                </div>
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-md-5 ml-auto">
                <a>Tipo de documento</a>
              </div>
              <div class="col-md-5 mr-auto">
                <a>Número de documento</a>
              </div>
            </div>
            <div class="row mx-auto">
              <div class="col-md-5 ml-auto">
                <select class="form-select mx-auto" required id="browsers">
                  <option selected disabled value="">Tipo de documento</option>
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="TI">Tarjeta de Identidad</option>
                  <option value="CE">Cédula Extranjera</option>
                  <option value="TE">Tarjeta Extranjera</option>
                </select>
                <div class="valid-feedback">Válido</div>
                <div class="invalid-feedback">Elije una opción</div>
              </div>
              <div class="col-md-5 mr-auto">
                <input
                  class="form-control"
                  type="number"
                  id="cedulaR"
                  min="1"
                  pattern="^[0-9]+"
                  onpaste="return false;"
                  onDrop="return false;"
                  autocomplete="off"
                  name="ID"
                  placeholder="Número de documento"
                  required
                />
                <div class="valid-feedback">Válido</div>
                <div class="invalid-feedback">
                  No puede estar vacía la casilla
                </div>
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-sm-5 ml-auto">
                <a>Correo</a>
              </div>
              <div class="col-sm-5 mr-auto">
                <a>Edad</a>
              </div>
            </div>
            <div class="row mx-auto">
              <div class="col-sm-5 ml-auto">
                <input
                  class="form-control"
                  type="email"
                  id="emailR"
                  name="email"
                  placeholder="Correo electrónico"
                  required
                />
                <div class="valid-feedback">Válido</div>
                <div class="invalid-feedback">
                  No puede estar vacía la casilla
                </div>
              </div>
              <div class="col-sm-5 mr-auto">
                <input
                  class="form-control"
                  type="number"
                  id="ageR"
                  min="1"
                  max="200"
                  onpaste="return false;"
                  onDrop="return false;"
                  autocomplete="off"
                  name="age"
                  placeholder="Edad"
                  required
                />
                <div class="valid-feedback">Válido</div>
                <div class="invalid-feedback">
                  No puede estar vacía la casilla
                </div>
              </div>
            </div>

            <div class="row mx-auto">
              <div class="col-md-5 ml-auto">
                <a>Género</a>
              </div>
              <div class="col-md-5 mr-auto">
                <a>Tipo de sangre</a>
              </div>
            </div>
            <div class="row mx-auto">
              <div class="col-md-5 ml-auto">
                <select class="form-select mx-auto" required id="genderR">
                  <option selected disabled value="">Género</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                  <option value="noEspecifica">Sin especificar</option>
                </select>
                <div class="valid-feedback">Válido</div>
                <div class="invalid-feedback">Elije una opción</div>
              </div>
              <div class="col-md-5 mr-auto">
                <select class="form-select mx-auto" required id="RHR">
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
                <div class="valid-feedback">Válido</div>
                <div class="invalid-feedback">Elije una opción</div>
              </div>
            </div>

            <div class="col-sm-8 mx-auto mt-4">
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

            <div class="row mx-auto">
              <button
                id="registerButton"
                type="submit"
                class="btn btn-primary mx-auto mb-2"
                v-on:click="update"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- End FormContainer -->
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
        .get("http://localhost:8081/patient/" + sessionStorage.Id, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then((response) => {
          let patient = response.data.message;
          console.log(patient);
          let name = patient.name.split("-");
          document.getElementById("fusernameR").value = patient.username;
          document.getElementById("fnameR").value = name[0];
          document.getElementById("lnameR").value = name[1];
          document.getElementById("emailR").value = patient.email;
          document.getElementById("browsers").value = patient.document_type;
          document.getElementById("cedulaR").value = patient.document_number;
          document.getElementById("genderR").value = patient.gender;
          document.getElementById("ageR").value = patient.age;
          document.getElementById("RHR").value = patient.blood_type;
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
      var username = document.getElementById("fusernameR").value;
      var name = document.getElementById("fnameR").value;
      var lastName = document.getElementById("lnameR").value;
      var email = document.getElementById("emailR").value;
      var tipoCedula = document.getElementById("browsers").value;
      var cedula = document.getElementById("cedulaR").value;
      var genero = document.getElementById("genderR").value;
      var edad = document.getElementById("ageR").value;
      var RH = document.getElementById("RHR").value;
      if (
        username == "" ||
        name == "" ||
        lastName == "" ||
        email == "" ||
        cedula == "" ||
        genero == "" ||
        edad == "" ||
        RH == ""
      ) {
        this.errorFunction("Faltan datos por llenar");
      } else {
        this.sendData(
          username,
          name,
          lastName,
          email,
          cedula,
          tipoCedula,
          genero,
          edad,
          RH
        );
      }
    },
    async sendData(
      username,
      name,
      lastName,
      email,
      cedula,
      tipoCedula,
      genero,
      edad,
      RH
    ) {
      let datos = {
        id: sessionStorage.Id,
        username: username,
        name: name + "-" + lastName,
        email: email,
        document_type: tipoCedula,
        document_number: cedula,
        age: parseInt(edad),
        gender: genero,
        blood_type: RH,
      };

      let formBody = JSON.stringify(datos);

      axios
        .put("http://localhost:8081/patient/edit", formBody, {
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
          this.errorFunction("Error, correo o documento ya registrado");
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.update();
            } else {
              this.$router.push("/login");
            }
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
      }, 1000);
    },
    errorFunction(messageText) {
      this.$data.errorShow = true;
      this.$data.successShow = false;
      let errorDiv = document.getElementById("errorNotification");
      errorDiv.innerHTML = messageText;
      setTimeout(() => {
        this.$data.errorShow = false;
      }, 1000);
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style>
#formContainer {
  width: 80%;
  margin-top: 10px;
  height: fit-content;
}

.login-card-description {
  font: 300% sans-serif;
  color: rgb(3, 0, 78);
}
a,
h2 {
  color: rgb(3, 0, 78);
  text-decoration: none;
}
</style>
