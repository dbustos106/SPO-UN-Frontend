<template>
  <section id="loginSection" class="sectionMarco">
    <div class="container marco align-items-center">
      <div class="card mt-5">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="../../assets/img/login.jpg" class="card-img" />
          </div>
          <div class="col">
            <p class="card-description mt-5 mb-5">Iniciar sesión</p>
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
              </div>

              <div class="col-sm-8 mx-auto mb-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputUser">
                      <i class="fa fa-user-circle" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    id="user"
                    class="form-control"
                    placeholder="Usuario"
                    required
                  />
                </div>
              </div>

              <div class="col-sm-8 mx-auto mb-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputPassword">
                      <i class="fa fa-key" aria-hidden="true"></i>
                    </span>
                  </div>
                  <input
                    type="password"
                    id="password"
                    class="form-control"
                    placeholder="Contraseña"
                    required
                  />
                </div>
              </div>

              <div class="col-sm-8 mx-auto mb-5">
                <button class="btn btn-block" v-on:click="sendLogin">
                  Aceptar
                </button>
              </div>

              <div class="col-sm-8 mx-auto mb-4">
                <a href="#!">¿Olvidaste la contraseña?</a>
                <br />
                <span>¿No tienes una cuenta? </span>
                <a href="#!" v-on:click="openSignUpPage">Regístrate</a>

                <nav class="card-footer-nav mt-3">
                  <a href="#!">Terms of use. </a>
                  <a href="#!">Privacy policy</a>
                </nav>
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
  name: "loginPage",

  data() {
    return {
      errorShow: false,
    };
  },
  methods: {
    sendLogin() {
      var user = document.getElementById("user").value;
      var password = document.getElementById("password").value;
      if (user == "" || password == "") {
        this.errorFunction(" No ha ingresado los datos");
      } else {
        let datos = {
          username: user,
          password: password,
        };
        let formBody = App.methods.toUrlEncoded(datos);

        axios
          .post(App.methods.getBackUrl() + "/auth/login", formBody, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
          })
          .then((response) => {
            this.$data.errorShow = false;
            let loginInfo = App.methods.jwtDecode(response.data.access_token);
            let userInfo = loginInfo.payload.sub.split(",");
            sessionStorage.setItem("AccessToken", response.data.access_token);
            sessionStorage.setItem("RefreshToken", response.data.refresh_token);
            sessionStorage.setItem("Id", userInfo[1]);
            sessionStorage.setItem("Role", loginInfo.payload.roles[0]);
            sessionStorage.setItem("Username", userInfo[0]);
            this.openUserPage(sessionStorage.Role);
          })
          .catch(() => {
            this.errorFunction(" Usuario o contraseña incorrectos");
          });
      }
    },
    openSignUpPage() {
      this.$router.push("/signUp");
    },
    openUserPage(role) {
      if (role == "Professor") {
        this.$router.push("/professor");
      } else if (role == "Student") {
        this.$router.push("/student");
      } else if (role == "Patient") {
        this.$router.push("/patient");
      } else if (role == "Admin") {
        this.$router.push("/admin");
      }
    },
    errorFunction(messageText) {
      let errorDiv = document.getElementById("errorNotification");
      errorDiv.innerHTML = messageText;
      this.$data.errorShow = true;
      setTimeout(() => {
        this.$data.errorShow = false;
      }, 5000);
    },
  },
};
</script>

<style>
#loginSection {
  padding-left: 0px;
}
</style>
