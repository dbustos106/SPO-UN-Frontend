<template>
  <section id="signUpSection" class="sectionMarco">
    <div class="container marco">
      <div class="card">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="../../assets/img/login.jpg" class="card-img" />
          </div>
          <div class="col">
            <p class="card-description mt-5">Registra tus datos</p>
            <div class="form-group needs-validation">
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
                </div>
              </div>

              <div class="row mx-auto">
                <div class="col-sm-5 ml-auto">
                  <select class="form-select mx-auto" required id="browsers">
                    <option selected disabled value="">
                      Tipo de documento
                    </option>
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="CE">Cédula Extranjera</option>
                    <option value="TE">Tarjeta Extranjera</option>
                  </select>
                </div>
                <div class="col-sm-5 mr-auto">
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
                </div>
              </div>

              <div class="row mx-auto mb-3">
                <div class="col-sm-5 ml-auto">
                  <select class="form-select mx-auto" required id="genderR">
                    <option selected disabled value="">Género</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="noEspecifica">Sin especificar</option>
                  </select>
                </div>
                <div class="col-sm-5 mr-auto">
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
                </div>
              </div>

              <div class="col-sm-10 mx-auto">
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

              <div class="col-sm-5 mx-auto">
                <button class="btn btn-block" v-on:click="register">
                  Registrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import App from "../../App.vue";

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
            .post(App.methods.getBackUrl() + "/register/patient", formBody, {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: "Bearer e",
              },
            })
            .then(() => {
              this.successFunction("Registro Exitoso, revise su correo");
            })
            .catch(() => {
              this.errorFunction("Error, correo o documento ya registrado");
            });
        }
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

<style>
#signUpSection {
  padding-left: 0px;
}
</style>
