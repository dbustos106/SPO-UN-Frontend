<template>
  <section id="loginSection" class="sectionMarco">
    <div class="container marco align-items-center">
      <div class="card mt-5">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="../../assets/img/login.jpg" class="card-img" />
          </div>

          <div class="col">
            <p class="card-description mt-5 mb-4">Cambiar Contraseña</p>
            <div class="form-group needs-validation">
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
                  <div class="success_green mb-3">
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

              <div class="col-sm-8 mx-auto mb-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-user-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    id="nptPassword"
                    class="form-control"
                    placeholder="Contraseña"
                    required
                  />
                </div>
              </div>

              <div class="col-sm-8 mx-auto mb-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <i class="fa fa-user-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    id="nptPasswordConfirm"
                    class="form-control"
                    placeholder="Confirmar Contraseña"
                    required
                  />
                </div>
              </div>

              <div class="col-sm-8 mx-auto mb-5">
                <button class="btn btn-block" v-on:click="changePassword">
                  Cambiar Contraseña
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
  name: "ChangePassword",

  data() {
    return {
      errorShow: false,
      successShow: false,
      role: "",
      code: "",
    };
  },
  methods: {
    changePassword() {
      var password = document.getElementById("nptPassword").value;
      var passwordConfirmation =
        document.getElementById("nptPasswordConfirm").value;

      if (this.verifyPasswords(password, passwordConfirmation)) {
        let datos = {
          password: password,
        };
        let formBody = App.methods.toUrlEncoded(datos);

        axios
          .put(
            App.methods.getBackUrl() +
              "/changePassword/" +
              this.$data.role +
              "?code=" +
              this.$data.code,
            formBody,
            {
              headers: {
                "Content-Type":
                  "application/x-www-form-urlencoded;charset=UTF-8",
              },
            }
          )
          .then(() => {
            document.getElementById("nptPassword").value = "";
            document.getElementById("nptPasswordConfirm").value = "";
            this.successFunction("Contraseña cambiada");
            setTimeout(() => {
              this.$router.push("/login");
            }, 1000);
          })
          .catch((err) => {
            if (err.response.status == 400) {
              this.errorFunction(err.response.data.message);
            }
          });
      }
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
      let errorNotification = document.getElementById("errorNotification");
      errorNotification.textContent = messageText;
      this.$data.errorShow = true;
      setTimeout(() => {
        this.$data.errorShow = false;
      }, 5000);
    },
  },
  mounted() {
    this.$data.role = this.$route.params.role;
    this.$data.code = this.$route.params.code;
  },
};
</script>
