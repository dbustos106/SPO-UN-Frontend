<template>
  <div class="container marco">
    <div class="card mt-5 mb-3">
      <h2 class="card-description mt-5 mb-5">Registro profesores</h2>
      <div class="form-group needs-validation" id="form">
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
          <div class="col-md-5 ml-auto">
            <select class="form-select mx-auto" required id="slcDocumentType">
              <option selected disabled value="">Tipo de documento</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula Extranjera</option>
              <option value="TE">Tarjeta Extranjera</option>
            </select>
          </div>

          <div class="col-md-5 mr-auto">
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
          <div class="col-sm-10 mx-auto">
            <input
              class="form-control"
              type="email"
              id="nptEmail"
              name="email"
              placeholder="Correo electrónico"
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
              name="password"
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
  name: "registerProfessor",

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
      if (
        name == "" ||
        lastName == "" ||
        email == "" ||
        password == "" ||
        confirmPassword == "" ||
        documentNumber == ""
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
          };
          let formBody = JSON.stringify(datos);
          axios
            .post(App.methods.getBackUrl() + "/register/professor", formBody, {
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
                  this.register();
                } else {
                  this.$router.push("/login");
                }
              }
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
