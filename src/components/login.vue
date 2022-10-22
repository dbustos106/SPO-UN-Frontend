<template>
  <body id="loginbody">
    <div>
      <head>
        <meta charset="UTF-8" />
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
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
      </head>

      <main>
        <section v-show="errorShow">
          <div class="alertBar error">
                <span title="error"  class="alertBar-message">
                  <i class="fa fa-exclamation-circle"></i> 
                  <span id="errorNotification"></span>
                </span>
            <span class="alertBar-dismiss">
            <a class="cta" ></a>
            </span>
          </div>
        </section>
        <div class="container">
          <div class="card login-card">
            <div class="row no-gutters">
              <div class="col-md-5">
                <img
                  src="../assets/login.jpg"
                  alt="login"
                  class="login-card-img"
                />
              </div>
              <div class="col-md-7">
                <div class="card-body">
                  <div class="brand-wrapper">
                    <img
                      src="../assets/LogoSPOUN.png"
                      alt="logo"
                      class="logo"
                    />
                  </div>
                  <p class="login-card-description">Iniciar sesión</p>
                  <div>
                    <div class="form-group needs-validation" >
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
                    <div class="form-group mb-4">
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
                    <button
                      id="acceptButton"
                      class="btn btn-block login-btn mb-4"
                      v-on:click="loginFunction"
                    >Aceptar</button>
                  </div>
                  <a  class="forgot-password-link"
                    >¿Olvidaste la contraseña?</a
                  >
                  <p class="login-card-footer-text">
                    ¿No tienes una cuenta?
                    <a
                      v-on:click="clickRegisterButton"
                      class="text-reset"
                      >Regístrate</a
                    >
                  </p>
                  <nav class="login-card-footer-nav">
                    <a href="#!">Terms of use.</a>
                    <a href="#!">Privacy policy</a>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <b-list-group>
            <b-list-group-item v-for="item in items" v-bind:key="item.id">
              {{ item.nombre }}
            </b-list-group-item>
          </b-list-group>
        </div>
      </main>
    </div>
  </body>
</template>
<!---<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.3.5"></script>--->
<script>
//import { vShow } from "vue";
import axios from "axios";

export default {
  name: "login-page",
  data() {
    return {
      emptyInput: false,
      errorShow: false
    };
  },
  //functions for the inputs
  //
  methods: {
    //functions
    clickRegisterButton() {
      //console.log(this.$root.$data.registryShow);
      
      this.$root.$data.loginShow = false;
      this.$root.$data.registryShow = true;
    },

    loginFunction() {
      console.log("Logging in");
      let pass = false;
      var user = document.getElementById("user").value;
      var password = document.getElementById("password").value;
      if (user == "" || password == "") {
        console.log("No hay datos en el login");
        this.errorFunction(" No ha ingresado los datos");
      } else {
        this.askLogintoBack(user, password);
        pass != pass;
      }
      return pass;
    },
    async askLogintoBack(user, password) {
      let datos = {
        username: user,
        password: password,
      };
      let formBody = this.$root.toUrlEncoded(datos);
      axios
        .post("http://localhost:8081/auth/login", formBody, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
        })
        .then((response) => {
          this.$data.errorShow = false;
          console.log(response);
          let loginInfo = this.$root.jwtDecode(response.data.access_token);
          console.log(loginInfo);
          sessionStorage.setItem("Token", response.data.access_token);
          sessionStorage.setItem("Id", loginInfo.payload.roles[0]);
          sessionStorage.setItem("Role", loginInfo.payload.roles[1]);
          sessionStorage.setItem("Username", loginInfo.payload.sub);
          
          console.log("Logged in");
          this.openUserComponent(sessionStorage.Role);
        })
        .catch((err) => {
          console.log("Falló login");
          console.log(err);
          this.errorFunction(" Usuario o contraseña incorrectos");
        });
    },
    openUserComponent(role) {
      console.log(role);
      this.$root.$data.loginShow = false;
      if (role == "Professor") {
        this.$root.$data.profesorAreaShow = true;
        document.getElementById("professorUsername").innerHTML=sessionStorage.Username;
      } else if (role == "Student") {
        this.$root.$data.studentAreaShow = true;
        document.getElementById("studentUsername").innerHTML=sessionStorage.Username;
      } else if (role == "Patient") {
        this.$root.$data.patientAreaShow = true;
        document.getElementById("patientUsername").innerHTML=sessionStorage.Username;
      } else if (role == "Admin") {
        this.$root.$data.adminAreaShow = true;
      }
    },
    errorFunction(messageText) {
      //set the error div to be visible and message not
      let errorDiv = document.getElementById("errorNotification");
      //errorDiv.css("display", "block");
      //update the content of the error message
      errorDiv.innerHTML = messageText;

      this.$data.errorShow = true;

      setTimeout(() => {
        //Close the message
      }, 1000);
    },
  },
};
</script>
<style>
#loginbody {
  animation: color-change-2x 2s linear infinite alternate both;
}

@keyframes color-change-2x {
  0% {
    background: #84fab0;
  }
  100% {
    background: #8fd3f4;
  }
}

#acceptButton:hover {
  border-color: #1a1d53;
  color: #1a1d53;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.brand-wrapper {
  margin-bottom: 19px;
}

.brand-wrapper .logo {
  height: 50px;
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

.login-card form {
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

.login-card .login-btn {
  padding: 13px 20px 12px;
  background-color: #1a1d53;
  border-radius: 4px;
  font-size: 17px;
  font-weight: bold;
  line-height: 20px;
  color: #fff;
  margin-bottom: 24px;
}



.login-card .forgot-password-link {
  font-size: 14px;
  color: #47637e;
  margin-bottom: 12px;
}

.login-card-footer-text {
  font-size: 14px;
  color: #0d2366;
  margin-bottom: 60px;
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

section {
  width: 95vw;
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
  border: 1px solid rgba(32, 32, 32, .15);
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
    color: #007ACC !important;
  }
  .alert-message {
    padding-right: 1em;
    text-overflow: ellipsis;
    color: inherit;
    overflow: hidden;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
    /***************HACK*******************/
    max-width: 900px;
    /*************************************/
    a {
      color: #007ACC;
      &:hover {
        color: #007ACC;
        strong {
          font-weight: 400;
          color: inherit;
        }
      }
      strong {
        font-weight: 400;
        color: inherit;
      }
    }
  }
  .alert-dismiss {
    float: right;
    line-height: 15px;
    a {
      color: #000000;
      display: inline-block;
      padding: 14px;
      &:hover {
        color: inherit;
        text-decoration: none;
      }
    }
  }
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
  color: #1BA1E2;
}

.success_green {
  color: #339933;
}

.warning_col {
  color: #F8A800;
}

.error_col {
  color: #BA141A;
}

.success {
  background: #F5F5F5;
  color:#222;
  border : 1px solid #E6E6E6;
  
}

.success_confirm {
  background: #EFF8FD;
  color:#222;
  border : 1px solid #D8EFFA;
  
}

.warning {
  background: #FFF9EE;
  color:#222;
  border : 1px solid #FEF0D4;
}

.error {
  background: #fc9494;
  color:#222;
  border : 1px solid #F9D5D3;
}

.form-section>p:first-child {
  padding: 0 0 8px 0;
}

</style>
