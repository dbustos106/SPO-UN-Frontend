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

              <div class="row mx-auto">
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
                      <em class="fa fa-exclamation-circle"></em>
                      <span id="errorNotification"></span>
                    </span>
                    <span class="alertBar-dismiss">
                      <a class="cta"></a>
                    </span>
                  </div>
                </section>
                <section v-show="successShow">
                  <div class="success_green mb-2">
                    <span title="success" class="alertBar-message">
                      <em class="fa fa-exclamation-circle"></em>
                      <span id="successNotification"></span>
                    </span>
                    <span class="alertBar-dismiss">
                      <a class="cta"></a>
                    </span>
                  </div>
                </section>
              </div>

              <div class="row mx-auto mb-2 mt-1">
                <div class="col-sm-6 mx-auto">
                  <VueRecaptcha
                    ref="recaptcha"
                    sitekey="6LdkN0kjAAAAAGfe3rhczJhR3t_EvnAgNTxS9Rcm"
                    :load-recaptcha-script="true"
                    @verify="handleSuccess"
                    @error="handleError"
                    @expired="onCaptchaExpired"
                  ></VueRecaptcha>
                </div>
              </div>
              <div class="col-sm-5 mx-auto mt-2">
                <button
                  class="btn btn-block"
                  id="register"
                  disabled
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
  </section>
</template>

<script>
import axios from "axios";
import App from "../../App.vue";
import DOMPurify from "dompurify";
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "signUpPage",

  data() {
    return {
      errorShow: false,
      successShow: false,
    };
  },
  components: {
    VueRecaptcha,
  },

  methods: {
    register() {
      var name = DOMPurify.sanitize(document.getElementById("nptName").value);
      var lastName = DOMPurify.sanitize(
        document.getElementById("nptLastName").value
      );
      var email = DOMPurify.sanitize(document.getElementById("nptEmail").value);
      var password = DOMPurify.sanitize(
        document.getElementById("nptPassword").value
      );
      var confirmPassword = DOMPurify.sanitize(
        document.getElementById("nptConfirmPassword").value
      );
      var documentType = DOMPurify.sanitize(
        document.getElementById("slcDocumentType").value
      );
      var documentNumber = DOMPurify.sanitize(
        document.getElementById("nptDocumentNumber").value
      );
      var gender = DOMPurify.sanitize(
        document.getElementById("slcGender").value
      );
      var age = DOMPurify.sanitize(document.getElementById("nptAge").value);
      var bloodType = DOMPurify.sanitize(
        document.getElementById("slcBloodType").value
      );
      if (
        name == "" ||
        lastName == "" ||
        email == "" ||
        password == "" ||
        documentType == "" ||
        confirmPassword == "" ||
        documentNumber == "" ||
        gender == "" ||
        age == "" ||
        bloodType == ""
      ) {
        this.errorFunction("Faltan datos por llenar");
      } else {
        if (
          this.verifyDocument(documentNumber) &&
          this.verifyEmail(email) &&
          this.verifyPasswords(password, confirmPassword)
        ) {
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
              this.errorFunction("Error! Correo o documento ya registrado");
            });
        }
      }
    },
    verifyDocument(document) {
      if (document.length < 6) {
        this.errorFunction("La cédula es muy corta");
        return false;
      }

      if (document.length > 10) {
        this.errorFunction("La cédula es muy larga");
        return false;
      }

      return true;
    },
    verifyPasswords(pass, pass2) {
      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/; //eslint-disable-line

      if (pass != pass2) {
        this.errorFunction("Las contraseñas no coinciden");
        return false;
      }

      if (pass.length < 8) {
        this.errorFunction("La contraseña debe contener al menos 8 caracteres");
        return false;
      }

      if (!specialChars.test(pass)) {
        this.errorFunction(
          "La contraseña debe contener al menos un caracter especial"
        );
        return false;
      }

      if (!/[A-Z]/.test(pass)) {
        this.errorFunction(
          "La contraseña debe contener al menos una mayúscula"
        );
        return false;
      }

      if (!/\d/.test(pass)) {
        this.errorFunction("La contraseña debe contener al menos un número");
        return false;
      }

      return true;
    },
    verifyEmail(email) {
      var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //eslint-disable-line

      if (email.match(validRegex)) {
        return true;
      } else {
        this.errorFunction("El email ingresado no tiene el formato correcto");
        return false;
      }
    },
    handleSuccess() {
      document.getElementById("register").disabled = false;
    },
    handleError() {
      this.successFunction("Hubo un error al realizar la verficación");
    },
    onCaptchaExpired() {
      document.getElementById("register").disabled = true;
      this.$refs.recaptcha.reset();
    },
    successFunction(messageText) {
      this.$data.errorShow = false;
      this.$data.successShow = true;
      let errorDiv = document.getElementById("successNotification");
      errorDiv.textContent = messageText;
      setTimeout(() => {
        this.$data.successShow = false;
      }, 5000);
    },
    errorFunction(messageText) {
      this.$data.errorShow = true;
      this.$data.successShow = false;
      let errorDiv = document.getElementById("errorNotification");
      errorDiv.textContent = messageText;
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
