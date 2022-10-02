<template>
  <div>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>SPO UN - Inicia sesión</title>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Karla:400,700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </head>
    <main>
      <div></div>
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
                  <img src="../assets/LogoSPOUN.png" alt="logo" class="logo" />
                </div>
                <p class="login-card-description">Iniciar sesión</p>
                <form action="#!">
                  <div class="form-group needs-validation" novalidate>
                    <label for="user" class="sr-only">Usuario</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="inputUser">
                          <i class="fa fa-user-circle" aria-hidden="true"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        name="user"
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
                        name="password"
                        id="password"
                        class="form-control"
                        placeholder="Contraseña"
                        v-model="Contraseña"
                        required
                      />
                    </div>
                  </div>
                  <input
                    name="accept"
                    id="acceptButton"
                    class="btn btn-block login-btn mb-4"
                    value="Ingresar"
                    v-on:click="loginFunction"
                  />
                </form>
                <a href="#!" class="forgot-password-link"
                  >¿Olvidaste la contraseña?</a
                >
                <p class="login-card-footer-text">
                  ¿No tienes una cuenta?
                  <a
                    href="#"
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
    /*
    validate() {
      let valid = true;
      const forms = document.querySelectorAll(".needs-validation");
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "button",
          function (event) {
            if (!form.loginFunction()) {
              valid = false;
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
      return valid;
    },*/
    loginFunction() {
      console.log("Logging in");
      let pass = false;
      var user = document.getElementById("user").value;
      var password = document.getElementById("password").value;
      if (user == "" || password == "") {
        console.log("No hay datos en el login");
        this.errorFunction("No ha ingresado los datos");
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
          let loginInfo = this.$root.jwtDecode(response.data.access_token);
          console.log(loginInfo);
          sessionStorage.setItem("Token", response.data.access_token);
          sessionStorage.setItem("Id", loginInfo.payload.roles[0]);
          sessionStorage.setItem("Role", loginInfo.payload.roles[1]);
          console.log("Logged in");
          this.openUserComponent(sessionStorage.Role);
        })
        .catch((err) => {
          console.log("Falló login");
          console.log(err);
          this.errorFunction("Usuario o contraseña incorrectos");
        });
    },
    openUserComponent(role) {
      this.$root.$data.loginShow = false;
      if (role == "Professor") {
        this.$root.$data.profesorAreaShow = true;
      } else if (role == "Student") {
        this.$root.$data.studentAreaShow = true;
      } else if (role == "Patient") {
        this.$root.$data.patientAreaShow = true;
      } else if (role == "Admin") {
        this.$root.$data.adminAreaShow = true;
      }
    },
    errorFunction(messageText) {
      //set the error div to be visible and message not
      let errorDiv = document.getElementById("loginError");
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
body {
  font-family: "Karla", sans-serif;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
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

#acceptButton:hover {
  border-color: #1a1d53;
  color: #1a1d53;
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

.form-control.is-valid,
.was-validated .form-control:valid {
  border-color: #198754;
  padding-right: calc(1.5em + 0.75rem);
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23198754' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}

.form-control.is-invalid,
.was-validated .form-control:invalid {
  border-color: #dc3545;
  padding-right: calc(1.5em + 0.75rem);
  /*
  background-image: url(
    data:image/svg + xml,
    %3csvgxmlns="http://www.w3.org/2000/svg"viewBox="0 0 12 12"width="12"height="12"fill="none"stroke="%23dc3545"%3e%3ccirclecx="6"cy="6"r="4.5"/%3e%3cpathstroke-linejoin="round"d="M5.8 3.6h.4L6 6.5z"/%3e%3ccirclecx="6"cy="8.2"r=".6"fill="%23dc3545"stroke="none"/%3e%3c/svg%3e
  );*/
  background-repeat: no-repeat;
  background-position: right calc(0.375em + 0.1875rem) center;
  background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
}
</style>
