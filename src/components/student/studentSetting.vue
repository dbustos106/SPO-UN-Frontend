<template>
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
          <p class="login-card-description mt-5 mb-5">Datos</p>
          <div class="form-group needs-validation" id="form">
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
              <div class="col-sm-10 mx-auto">
                <a>Correo</a>
              </div>
            </div>
            <div class="row mx-auto">
              <div class="col-sm-10 mx-auto">
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
                class="btn btn-primary mx-auto mb-5"
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
        .get("http://localhost:8081/student/" + sessionStorage.Id, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then((response) => {
          let student = response.data.message;
          let name = student.name.split("-");
          document.getElementById("fnameR").value = name[0];
          document.getElementById("lnameR").value = name[1];
          document.getElementById("emailR").value = student.email;
          document.getElementById("browsers").value = student.document_type;
          document.getElementById("cedulaR").value = student.document_number;
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
      var name = document.getElementById("fnameR").value;
      var lastName = document.getElementById("lnameR").value;
      var email = document.getElementById("emailR").value;
      var tipoCedula = document.getElementById("browsers").value;
      var cedula = document.getElementById("cedulaR").value;
      if (name == "" || lastName == "" || email == "" || cedula == "") {
        this.errorFunction("Faltan datos por llenar");
      } else {
        this.sendData(name, lastName, email, cedula, tipoCedula);
      }
    },
    async sendData(name, lastName, email, cedula, tipoCedula) {
      let datos = {
        id: sessionStorage.Id,
        username: email.substring(0, email.indexOf("@")),
        name: name + "-" + lastName,
        email: email,
        document_type: tipoCedula,
        document_number: cedula,
        professor_id: parseInt(sessionStorage.Id),
      };
      let formBody = JSON.stringify(datos);

      axios
        .put("http://localhost:8081/student/edit", formBody, {
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
          console.log(err);
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
      }, 2000);
    },
    errorFunction(messageText) {
      this.$data.errorShow = true;
      this.$data.successShow = false;
      let errorDiv = document.getElementById("errorNotification");
      errorDiv.innerHTML = messageText;
      setTimeout(() => {
        this.$data.errorShow = false;
      }, 2000);
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
  margin-top: 40px;
  height: fit-content;
}
.login-card-description {
  font: 300% sans-serif;
  color: rgb(3, 0, 78);
}

.form-select {
  height: 44px;
}
</style>
