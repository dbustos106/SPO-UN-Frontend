<template>
  <section id="login">
    <!-- ======= MarcoLog section ======= -->
    <div id="marcoLog" class="container">
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
            <p class="login-card-description mt-5 mb-5">Iniciar sesión</p>
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
                <label for="user" class="sr-only">Usuario</label>
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
                    v-model="Usuario"
                    required
                  />
                </div>
              </div>
              <div class="col-sm-8 mx-auto mb-3">
                <label for="password" class="sr-only">Password</label>
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
                    v-model="Contraseña"
                    required
                  />
                </div>
              </div>
              <div class="col-sm-8 mx-auto mb-5">
                <button
                  id="acceptButton"
                  class="btn btn-block login-btn"
                  v-on:click="loginFunction"
                >
                  Aceptar
                </button>
              </div>
              <div class="col-sm-8 mx-auto mt-5">
                <a class="forgot-password-link">¿Olvidaste la contraseña?</a>
                <p class="login-card-footer-text">
                  <a v-on:click="openSignUpPage" class="text-reset"
                    >¿No tienes una cuenta? Regístrate</a
                  >
                </p>
                <nav class="login-card-footer-nav">
                  <a href="#!">Terms of use. </a>
                  <a href="#!">Privacy policy</a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End MarcoLog -->
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
    openSignUpPage() {
      this.$router.push("/signUp");
    },
    loginFunction() {
      var user = document.getElementById("user").value;
      var password = document.getElementById("password").value;
      if (user == "" || password == "") {
        this.errorFunction(" No ha ingresado los datos");
      } else {
        this.askLogintoBack(user, password);
      }
    },
    async askLogintoBack(user, password) {
      let datos = {
        username: user,
        password: password,
      };
      let formBody = App.methods.toUrlEncoded(datos);
      console.log(formBody);
      axios
        .post("http://localhost:8081/auth/login", formBody, {
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
        .catch((error) => {
          console.log(error);
          this.errorFunction(" Usuario o contraseña incorrectos");
        });
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
      setTimeout(() => {}, 1000);
    },
  },
};
</script>

<style>
/*--------------------------------------------------------------
# General
--------------------------------------------------------------*/
#login {
  width: 100%;
  height: 100vh;
  background: url("../../assets/img/panoramicaUnal.jpg") top center;
  background-size: cover;
  position: relative;
  border-top: 100px;
}

#login:before {
  content: "";
  background: rgba(45, 53, 69, 0.7);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

/*--------------------------------------------------------------
# MarcoLog
--------------------------------------------------------------*/
#marcoLog {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.login-card {
  position: relative;
  margin-top: 40px;
  width: 100%;
  height: 100%;
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

/*--------------------------------------------------------------
# Form
--------------------------------------------------------------*/
.login-card-description {
  font-size: 25px;
  color: #000;
  font-weight: normal;
  margin-bottom: 23px;
}
.login-card form {
  max-width: 326px;
}
.login-card .form-control {
  border: 1px solid #d5dae2;
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
.login-card .login-btn {
  background-color: #1a1d53;
  border-radius: 4px;
  font-size: 17px;
  font-weight: bold;
  line-height: 20px;
  color: #fff;
  margin-bottom: 24px;
}

.forgot-password-link {
  font-size: 14px;
  color: #47637e;
  text-align: center;
}

.login-card-footer-text {
  font-size: 14px;
  color: #0d2366;
}
@media (max-width: 767px) {
  .login-card-footer-text {
    margin-bottom: 24px;
  }
}
.login-card-footer-nav a {
  font-size: 14px;
  color: #919aa3;
}

#acceptButton {
  margin-block: 20px;
  padding: 5px;
}

#acceptButton:hover {
  border-color: #1a1d53;
  color: #1a1d53;
}

/*--------------------------------------------------------------
# Error
--------------------------------------------------------------*/
section {
  width: 100%;
  overflow: hidden;
  border-bottom: 1px solid #efefef;
}
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
