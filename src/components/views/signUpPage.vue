<template>
  <section id="signUpSection" class="sectionMarco">
    <div class="container marco align-items-center">
      <div id="signUpCard" class="card mt-5 mb-5">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="../../assets/img/login.jpg" class="card-img" />
          </div>

          <div class="col">
            <p class="card-description mt-5">Registra tus datos</p>
            <div class="form-group needs-validation">
              <div class="row mx-auto">
                <div class="col-sm-5 ml-auto">
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
                <div class="col-sm-5 ml-auto">
                  <select
                    class="form-select mx-auto"
                    required
                    id="slcDocumentType"
                  >
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
                <div class="col-sm-5 ml-auto">
                  <input
                    class="form-control"
                    id="nptPassword"
                    type="password"
                    name="nptPassword"
                    placeholder="Contraseña"
                    required
                  />
                </div>
                <div class="col-sm-5 mr-auto">
                  <input
                    class="form-control"
                    id="nptConfirmPassword"
                    type="password"
                    name="nptConfirmPassword"
                    placeholder="Confirmar Contraseña"
                    required
                  />
                </div>
              </div>

              <div class="row mx-auto mb-3">
                <div class="col-sm-5 ml-auto">
                  <select class="form-select mx-auto" required id="slcGender">
                    <option selected disabled value="">Género</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="noEspecifica">Sin especificar</option>
                  </select>
                </div>
                <div class="col-sm-5 mr-auto">
                  <select
                    class="form-select mx-auto"
                    required
                    id="slcBloodType"
                  >
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
      var name = document.getElementById("nptName").value;
      var lastName = document.getElementById("nptLastName").value;
      var email = document.getElementById("nptEmail").value;
      var password = document.getElementById("nptPassword").value;
      var confirmPassword = document.getElementById("nptConfirmPassword").value;
      var documentType = document.getElementById("slcDocumentType").value;
      var documentNumber = document.getElementById("nptDocumentNumber").value;
      var gender = document.getElementById("slcGender").value;
      var age = document.getElementById("nptAge").value;
      var bloodType = document.getElementById("slcBloodType").value;
      if (
        name == "" ||
        lastName == "" ||
        email == "" ||
        password == "" ||
        confirmPassword == "" ||
        documentNumber == "" ||
        gender == "" ||
        age == "" ||
        bloodType == ""
      ) {
        this.errorFunction("Faltan datos por llenar");
      } else {
          if (this.verifyPasswords(password,confirmPassword)) {
            let datos = {
              password: password,
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
    verifyPasswords(pass, pass2){
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; //eslint-disable-line

      if(pass!=pass2){
        this.errorFunction("Las contraseñas no coinciden");
        return false;
      }

      if(pass.length<8){
        this.errorFunction("La contraseña debe contener al menos 8 caracteres");
        return false;
      }
      
      if(!specialChars.test(pass)){
        this.errorFunction("La contraseña debe contener al menos un caracter especial");
        return false;
      }

      if(!/[A-Z]/.test(pass)){
        this.errorFunction("La contraseña debe contener al menos una mayúscula");
        return false;
      }

      if(!/\d/.test(pass)){
        this.errorFunction("La contraseña debe contener al menos un número");
        return false;
      }

      return true;
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
#signUpCard {
  margin-top: 80px !important;
}
</style>
