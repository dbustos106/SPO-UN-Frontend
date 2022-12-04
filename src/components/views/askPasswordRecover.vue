<template>
  <section id="loginSection" class="sectionMarco">
    <div class="container marco align-items-center">
      <div class="card mt-5">
        <div class="row no-gutters">
          <div class="col-md-5">
            <img src="../../assets/img/login.jpg" class="card-img" />
          </div>

          <div class="col">
            <p class="card-description mt-5 mb-4">Recuperar Contraseña</p>
            <div class="form-group needs-validation">
              <div class="col-sm-8 mx-auto">
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
                  <div class="success_green">
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
              <div class="col-sm-8 mx-auto mb-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <em class="fa fa-user-circle" aria-hidden="true"></em>
                    </span>
                  </div>
                  <input
                    type="text"
                    id="nptEmail"
                    class="form-control"
                    placeholder="Correo"
                    required
                  />
                </div>
              </div>

              <div class="col-sm-8 mx-auto mb-3">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">
                      <em class="fa fa-user-circle" aria-hidden="true"></em>
                    </span>
                  </div>
                  <input
                    type="text"
                    id="nptEmailConfirm"
                    class="form-control"
                    placeholder="Confirmar Correo"
                    required
                  />
                </div>
              </div>

              <div class="col-sm-8 mx-auto mb-5">
                <button class="btn btn-block mb-5" v-on:click="sendEmail">
                  Enviar Correo
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
  name: "askPasswordRecover",

  data() {
    return {
      errorShow: false,
      successShow: false,
    };
  },
  methods: {
    async sendEmail() {
      var email = document.getElementById("nptEmail").value;
      var emailConfirmation = document.getElementById("nptEmailConfirm").value;
      if (email == emailConfirmation) {
        this.successFunction("Revise su correo");
        axios
          .get(
            App.methods.getBackUrl() + "/changePassword/email?email=" + email
          )
          .catch((err) => {
            if (err.response.status == 400) {
              this.errorFunction(err.response.data.message);
            }
          });
      } else {
        this.errorFunction("Los correos son distintos");
      }
    },
    successFunction(messageText) {
      this.$data.errorShow = false;
      this.$data.successShow = true;
      let errorNotification = document.getElementById("successNotification");
      errorNotification.textContent = messageText;
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
};
</script>

<style>
.success_green {
  color: #339933;
}
</style>
