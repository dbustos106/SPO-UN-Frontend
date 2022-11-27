<template>
  <section id="loginSection" class="sectionMarco">
    <div class="container marco align-items-center">
      <div class="card mt-5">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="../../assets/img/login.jpg" class="card-img" />
          </div>

          <div class="col" v-show="passShow">
            <p class="card-description mt-5 mb-3">Cambiar Contraseña</p>
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
          <div class="col" v-show="messageShow">
            <p class="card-description mt-5 mb-3" >Contraseña cambiada </p>
            <button class="btn btn-block" v-on:click="goToLogin()">Ir a login</button>
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
      passShow: true,
      messageShow: false,
      role: "",
      code: "",
    };
  },
  methods: {
    changePassword() {
      var password = document.getElementById("nptPassword").value;
      var passwordConfirmation =
        document.getElementById("nptPasswordConfirm").value;
      console.log(password);
      if (this.verifyPasswords(password,passwordConfirmation)) {
        let datos = {
          password: password,
        };
        let formBody = App.methods.toUrlEncoded(datos);
        console.log(formBody);
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
            this.$data.passShow=false;
            this.$data.messageShow=true;
          })
          .catch((err) => {
            if (err.response.status == 400) {
              this.errorFunction(err.response.data.message);
            }
          });
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
    goToLogin(){
      this.$router.push("/login");
    },
    errorFunction(messageText) {
      this.$data.errorShow = true;
      this.$data.successShow = false;
      let errorNotification = document.getElementById("errorNotification");
      errorNotification.innerHTML = messageText;
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
