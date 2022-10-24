<template>
  <!-- ======= Router view ======= -->
  <router-view></router-view>
  <!-- End router view -->
</template>

<script>
import axios from "axios";

export default {
  name: "initPage",
  methods: {
    toUrlEncoded(datos) {
      var formBody = [];
      for (var property in datos) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(datos[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      console.log(formBody);
      return formBody;
    },
    jwtDecode(t) {
      let token = {};
      token.raw = t;
      token.header = JSON.parse(window.atob(t.split(".")[0]));
      token.payload = JSON.parse(window.atob(t.split(".")[1]));
      return token;
    },
    requestRefreshToken() {
      axios
        .get("http://localhost:8081/auth/refreshToken", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.RefreshToken,
          },
        })
        .then((response) => {
          let loginInfo = this.jwtDecode(response.data.access_token);
          let userInfo = loginInfo.payload.sub.split(",");
          sessionStorage.setItem("AccessToken", response.data.access_token);
          sessionStorage.setItem("RefreshToken", response.data.refresh_token);
          sessionStorage.setItem("Id", userInfo[1]);
          sessionStorage.setItem("Role", loginInfo.payload.roles[0]);
          sessionStorage.setItem("Username", userInfo[0]);
          return true;
        })
        .catch(() => {
          return false;
        });
    },
  },
};
</script>

<style scope>
@import "~bootstrap/dist/css/bootstrap.css";
/*--------------------------------------------------------------
# General
--------------------------------------------------------------*/
#app {
  font-family: Avenir, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: rgb(255, 255, 255);
}
</style>
