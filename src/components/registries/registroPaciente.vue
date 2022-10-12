<template>
  <div>
    <div class="container" id="conRegPaciente">
      <div class="card login-card">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img
              src="../../assets/login.jpg"
              alt="login"
              class="login-card-img"
            />
          </div>
          <div class="col">
            <div class="card-body">
              <p class="login-card-description">Registra tus datos</p>
              <div class="form-group needs-validation" id="form">
                <div class="col-md-12">
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
                <div class="col-md-12">
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
                <div class="col-md-12">
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

                <div class="col-md-12">
                  <select class="form-select mt-3" required id="browsers">
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

                <div class="col-md-12">
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
                <div class="col-md-12">
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
                <div class="col-md-12">
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
                <div class="col-md-12">
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
                <div class="col-md-12 mt-5">
                    <select class="form-select mt-3" required id="genderR">
                      <option selected disabled value="">Género</option>
                      <option value="hombre">Hombre</option>
                      <option value="mujer">Mujer</option>
                      <option value="noEspecifica">Sin especificar</option>
                    </select>
                    <div class="valid-feedback">Válido</div>
                    <div class="invalid-feedback">Elije una opción</div>
                </div>

                <div class="col-md-12">
                    <select class="form-select mt-3" required id="RHR">
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

                <div class="row-md-12 mt-3">
                    <button
                      id="returnButton"
                      type="submit"
                      class="btn btn-secondary"
                      v-on:click="returnToPage"
                    >
                      Regresar
                    </button>
                    <button
                      id="registerButton"
                      type="submit"
                      class="btn btn-primary"
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
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "registro-paciente",
  data() {
    return {
      emptyInput: false,
    };
  },
  methods: {
    returnToPage() {
      console.log("You clicked the button!");
      //console.log(this.$root.$data.registryShow);
      this.$root.$data.loginShow = true;
      this.$root.$data.registryShow = false;
    },
    register() {
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
      console.log(name);
      if (
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
        console.log("No se han puesto datos");
        this.errorFunction("Faltan datos por llenar");
      } else {
        if (password !== confirmPassword) {
          console.log("Constraseñas son diferentes");
          this.errorFunction("Las contraseñas no coinciden");
        } else {
          this.sendData(
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
          console.log("Enviar Datos");
        }
      }
    },
    async sendData(
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
      var user = email.substring(0, email.indexOf("@"));
      let datos = {
        username: user,
        password: password,
        name: name + " " + lastName,
        email: email,
        document_type: "cc",
        document_number: cedula,
        age: parseInt(edad),
        gender: genero,
        blood_type: RH,
      };

      let formBody = JSON.stringify(datos);
      console.log(formBody);

      axios
        .post(
          "http://localhost:8081/register/patient",

          formBody,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer e",
            },
          }
        )
        .then((response) => {
          console.log("Register complete");
          console.log(response);
          this.errorFunction("Registro Exitoso");
        })
        .catch((err) => {
          console.log("Falló registro");
          console.log(err);
        });
    },
    errorFunction(messageText) {
      //set the error div to be visible and message not
      let errorDiv = document.getElementById("errors");
      //errorDiv.css("display", "block");
      //update the content of the error message
      errorDiv.innerHTML = messageText;
      this.$data.emptyInput = true;
      //schedule a deactivation
    },
  },
};
</script>
<style>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

#registerButton {
  margin-left: 130px;
}

#conRegPaciente {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.login-card {
  position: relative;
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

img.login-card-img {
  transition: 0.5s all ease-in-out;
}

img.login-card-img:hover {
  transform: scale(1.5);
}

.login-card .card-body {
  padding: 85px 160px 20px;
}

@media (max-width: 422px) {
  .login-card .card-body {
    padding: 35px 24px;
  }
}

.login-card-description {
  font-size: 25px;
  color: #000;
  font-weight: normal;
  margin-bottom: 23px;
}

#form {
  max-width: 326px;
}

.login-card .form-control {
  border: 1px solid #d5dae2;
  padding: 15px 25px;
  margin-bottom: 20px;
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

</style>