<template>
  <section id="signUp">
    <!-- ======= MarcoReg section ======= -->
    <div id="marcoReg" class="container">
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img
              src="../../assets/img/login.jpg"
              alt="login"
              class="login-card-img"
            />
          </div>
          <div class="col">
            <p class="login-card-description mt-5">Registra tus datos</p>
            <div class="form-group needs-validation" id="form">
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
                  <select class="form-select mx-auto" required id="browsers">
                    <option selected disabled value="">
                      Tipo de documento
                    </option>
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
                <div class="col-sm-5 ml-auto">
                  <input
                    class="form-control"
                    id="passwordR"
                    type="password"
                    name="password"
                    placeholder="Contraseña"
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
                    id="confirmPasswordR"
                    type="password"
                    name="confirmPasswordR"
                    placeholder="Confirmar Contraseña"
                    required
                  />
                  <div class="valid-feedback">Válido</div>
                  <div class="invalid-feedback">
                    No puede estar vacía la casilla
                  </div>
                </div>
              </div>

              <div class="row mx-auto mb-3">
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

              <div class="col-sm-8 mx-auto">
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
                  class="btn btn-primary mx-auto mb-3"
                  v-on:click="register"
                >
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End MarcoReg -->
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "signUpPage",
  data() {
    return {
      errorShow: false,
      successShow: false,
    };
  },
  methods: {
    register() {
      var username = document.getElementById("fusernameR").value;
      var name = document.getElementById("fnameR").value;
      var lastName = document.getElementById("lnameR").value;
      var email = document.getElementById("emailR").value;
      var password = document.getElementById("passwordR").value;
      var confirmPassword = document.getElementById("confirmPasswordR").value;
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
        password == "" ||
        confirmPassword == "" ||
        cedula == "" ||
        genero == "" ||
        edad == "" ||
        RH == ""
      ) {
        this.errorFunction("Faltan datos por llenar");
      } else {
        if (password !== confirmPassword) {
          this.errorFunction("Las contraseñas no coinciden");
        } else {
          this.sendData(
            username,
            name,
            lastName,
            email,
            password,
            cedula,
            tipoCedula,
            genero,
            edad,
            RH
          );
        }
      }
    },
    async sendData(
      username,
      name,
      lastName,
      email,
      password,
      cedula,
      tipoCedula,
      genero,
      edad,
      RH
    ) {
      let datos = {
        username: username,
        password: password,
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
        .post("http://localhost:8081/register/patient", formBody, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer e",
          },
        })
        .then(() => {
          this.successFunction("Registro Exitoso");
        })
        .catch(() => {
          this.errorFunction("Error, correo o documento ya registrado");
        });
    },
    successFunction(messageText) {
      this.$data.errorShow = false;
      this.$data.successShow = true;
      let errorDiv = document.getElementById("successNotification");
      errorDiv.innerHTML = messageText;
      setTimeout(() => {
        this.$data.successShow = false;
      }, 3000);
    },
    errorFunction(messageText) {
      this.$data.errorShow = true;
      this.$data.successShow = false;
      let errorDiv = document.getElementById("errorNotification");
      errorDiv.innerHTML = messageText;
      setTimeout(() => {
        this.$data.errorShow = false;
      }, 3000);
    },
  },
};
</script>

<style>
/*--------------------------------------------------------------
# General
--------------------------------------------------------------*/
#signUp {
  width: 100%;
  height: 100vh;
  background: url("../../assets/img/panoramicaUnal.jpg") top center;
  background-size: cover;
  position: relative;
  border-top: 100px;
}

#signUp:before {
  content: "";
  background: rgba(45, 53, 69, 0.7);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

/*--------------------------------------------------------------
# MarcoReg
--------------------------------------------------------------*/

#marcoReg {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.login-card {
  position: relative;
  margin-top: 40px;
  width: 100%;
  border: 0;
  border-radius: 27.5px;
  box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);
  overflow: hidden;
}

.login-card-img {
  border-radius: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}

img .login-card-img {
  transition: 0.5s all ease-in-out;
}

img .login-card-img:hover {
  transform: scale(1.5);
}

.login-card-description {
  font-size: 25px;
  color: #000;
  font-weight: normal;
  text-align: center;
  margin-bottom: 23px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

.login-card .form-control {
  border: 1px solid #d5dae2;
  min-height: 45px;
  font-size: 13px;
  line-height: 15;
  font-weight: normal;
}

.login-card .form-control::-webkit-input-placeholder {
  color: #919aa3;
}

.login-card .form-control::-moz-placeholder {
  color: #919aa3;
}

.login-card .form-control:-ms-input-placeholder {
  color: #919aa3;
}

.login-card .form-control::-ms-input-placeholder {
  color: #919aa3;
}

.login-card .form-control::placeholder {
  color: #919aa3;
}

#registerButton {
  margin-top: 20px;
  position: center;
  max-width: 100px;
}

/*--------------------------------------------------------------
# Error
--------------------------------------------------------------*/

.large {
  font-size: 18px !important;
}
.alertBar {
  color: rgb(245, 140, 140);
  margin-bottom: 5px;
  line-height: 30px;
  animation: reveal 1 1s;
  border: 1px solid rgba(32, 32, 32, 0.15);
}

.alert-info {
  display: inline-block;
  padding: 5px 2.5em 5px 10px;
  color: red;
  vertical-align: middle;
}
.alert-details {
  display: none;
}
.more,
.cta {
  color: #007acc !important;
}
.alert-message {
  padding-right: 1em;
  text-overflow: ellipsis;
  color: inherit;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  vertical-align: middle;
  max-width: 900px;
}
a {
  color: #007acc;
}

:hover {
  color: #007acc;
}
strong {
  font-weight: 400;
  color: inherit;
}

.alert-dismiss {
  float: right;
  line-height: 15px;
}
.a {
  color: #000000;
  display: inline-block;
  padding: 14px;
}
.hover {
  color: inherit;
  text-decoration: none;
}

@keyframes reveal {
  0% {
    transform: translate(0px, -50px);
  }
  50% {
    transform: translate(0px, -50px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
@keyframes collapse {
  0% {
    transform: translate(0px, 0px);
  }
  50% {
    transform: translate(0px, -50px);
  }
  100% {
    transform: translate(0px, -50px);
  }
}
pre {
  margin: 0px 10px 10px;
  line-height: 18px;
  font-family: monospace;
}
i {
  display: inline-block;
  min-width: 20px;
  text-align: center;
  font-size: 14px;
  -webkit-font-smoothing: none;
}
.largeBut {
  font-size: 20px;
}
.success_blue {
  color: #1ba1e2;
}
.success_green {
  color: #339933;
}
.warning_col {
  color: #f8a800;
}
.error_col {
  color: #ba141a;
}
.success {
  background: #f5f5f5;
  color: #222;
  border: 1px solid #e6e6e6;
}
.success_confirm {
  background: #eff8fd;
  color: #222;
  border: 1px solid #d8effa;
}
.warning {
  background: #fff9ee;
  color: #222;
  border: 1px solid #fef0d4;
}
.error {
  background: #fc9494;
  color: #222;
  border: 1px solid #f9d5d3;
}
.form-section > p:first-child {
  padding: 0 0 8px 0;
}
</style>
