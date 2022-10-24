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
          <p class="login-card-description mt-5 mb-5">Registro profesores</p>
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
                Registrar
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
  name: "registerProfessor",
  data() {
    return {
      errorShow: false,
      successShow: false,
    };
  },
  methods: {
    async loadData() {
      axios
        .get("http://localhost:8081/professor/" + sessionStorage.Id, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then((response) => {
          let professor = response.data.message;
          console.log(professor);
          let name = professor.name.split("-");
          document.getElementById("fnameR").value = name[0];
          document.getElementById("lnameR").value = name[1];
          document.getElementById("emailR").value = professor.email;
          document.getElementById("browsers").value = professor.document_type;
          document.getElementById("cedulaR").value = professor.document_number;
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
      };
      let formBody = JSON.stringify(datos);
      console.log(formBody);

      axios
        .put("http://localhost:8081/professor/edit", formBody, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then((message) => {
          console.log(message);
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
.container3 {
  background-color: #e0e5eb;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.center {
  margin: auto;
  width: 60%;
  border: 3px solid #315203;
  padding: 10px;
}
.input_label {
  margin-left: 50px;
}
.namef {
  margin-left: 50px;
}
.label1 {
  margin-left: 10px;
}
.label2 {
  margin-left: 150px;
}
.fname {
  margin-left: 8px;
  border: 1px solid #070707;
  padding: 10px 25px;
  margin-bottom: 20px;
  font-size: 13px;
  font-weight: normal;
}
.lname {
  margin-left: 10px;
  border: 1px solid #070707;
  padding: 10px 25px;
  margin-bottom: 20px;
  font-size: 13px;
  font-weight: normal;
}
#confirPassLabelP {
  margin-left: 135px;
}
.margin-down {
  margin-top: 0px;
}
.form-control {
  border: 1px solid #d5dae2;
  padding: 15px 25px;
  margin-bottom: 20px;
  min-height: 45px;
  font-size: 13px;
  line-height: 15;
  font-weight: normal;
}
</style>
