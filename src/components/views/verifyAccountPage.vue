<template>
  <section class="sectionMarco">
    <div class="container marco">
      <div class="container position-relative">
        <h1>Bienvenido a Spo-UN</h1>
        <h2>Su cuenta ha sido verificada con exito!</h2>
        <router-link class="btn-login scrollto" to="/login">Login</router-link>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import App from "../../App.vue";

export default {
  name: "verifyAccountPage",

  data() {
    return {
      typeUser: null,
      code: null,
    };
  },
  methods: {
    sendVerification(typeUser, code) {
      axios
        .put(
          App.methods.getBackUrl() +
            "/register/verifyAccount/" +
            typeUser +
            "?code=" +
            code,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer e",
            },
          }
        )
        .then((message) => {
          console.log(message);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    let typeUser = this.$route.params.user;
    let code = this.$route.params.code;
    this.sendVerification(typeUser, code);
  },
};
</script>
