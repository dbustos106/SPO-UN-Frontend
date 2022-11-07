<template>
  <!-- ======= Meta datos ======= -->
  <div>
    <!-- <meta charset="UTF-8" /> -->
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
  </div>
  <!-- End Meta datos -->

  <!-- ======= Router view ======= -->
  <router-view></router-view>
  <!-- End router view -->
</template>

<script>
import axios from "axios";

export default {
  name: "initPage",
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    //VueSidebarMenuAkahon,
  },
  methods: {
    toUrlEncoded(datos) {
      var formBody = [];
      for (var property in datos) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(datos[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
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
        .get(this.getBackUrl() + "/auth/refreshToken", {
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
    insensitiveCase(str) {
      str = str.toLowerCase();
      str = str.replaceAll("á", "a");
      str = str.replaceAll("é", "e");
      str = str.replaceAll("í", "i");
      str = str.replaceAll("ó", "o");
      str = str.replaceAll("ú", "u");
      return str;
    },
    getBackUrl() {
      //return "http://Spoun-env.eba-iykbrjzb.us-east-1.elasticbeanstalk.com";
      return "http://localhost:5000";
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
  z-index: 19980;
}

#calendarContainer {
  width: 90%;
  margin-top: 10px;
  color: rgb(17, 0, 50);
  height: fit-content;
  position: relative;
  padding: 20px 20px;
  overflow-y: hidden;
}

#calendar {
  height: 40%;
  max-height: 500px;
  position: relative;
}

#formContainer {
  width: 80%;
  margin-top: 10px;
  height: fit-content;
}

.fname {
  margin-left: 8px;
  border: 1px solid #070707;
  padding: 10px 25px;
  margin-bottom: 20px;
  font-size: 13px;
  font-weight: normal;
}

.lname {
  margin-left: 10px;
  border: 1px solid #070707;
  padding: 10px 25px;
  margin-bottom: 20px;
  font-size: 13px;
  font-weight: normal;
}

.margin-down {
  margin-top: 0px;
}

.form-control {
  border: 1px solid #d5dae2;
  padding: 15px 25px;
  margin-bottom: 20px;
  min-height: 45px;
  font-size: 13px;
  line-height: 15;
  font-weight: normal;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
}

.modal-mask {
  width: 50%;
  position: fixed;
  top: 30%;
  left: 33%;
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  z-index: 101;
}

table {
  border-collapse: collapse;
  font-family: Tahoma, Geneva, sans-serif;
}

table td {
  padding: 15px;
}

table thead td {
  background-color: #54585d;
  color: #ffffff;
  font-weight: bold;
  font-size: 13px;
  border: 1px solid #54585d;
}

table tbody td {
  color: #636363;
  border: 1px solid #dddfe1;
}

table tbody tr {
  background-color: #f9fafb;
}

table tbody tr:nth-child(odd) {
  background-color: #ffffff;
}

.btnBlue {
  width: 20%;
  background: rgba(0, 3, 37, 0.8);
  border-radius: 4px;
  border: none;
  color: #fff;
  margin-top: 10px;
}

.btnBlue:hover {
  background: rgba(0, 5, 65, 0.8);
  color: #fff;
}

.btnRed {
  width: 20%;
  background: rgba(125, 0, 0, 0.8);
  border-radius: 4px;
  border: none;
  color: #fff;
  margin-top: 10px;
}

.btnRed:hover {
  background: rgba(149, 25, 0, 0.8);
  color: #fff;
}

.btnGreen {
  width: 20%;
  background: rgba(44, 125, 0, 0.8);
  border-radius: 4px;
  border: none;
  color: #fff;
  margin-top: 10px;
}

.btnGreen:hover {
  background: rgba(56, 161, 0, 0.8);
  color: #fff;
}

.btnGris {
  width: 20%;
  background: rgba(87, 89, 94, 0.7);
  border-radius: 4px;
  border: none;
  color: #fff;
  margin-top: 10px;
}

.btnGris:hover {
  background: rgba(122, 124, 128, 0.7);
  color: #fff;
}

.btnGrisLq {
  width: 5%;
  background: rgba(87, 89, 94, 0.7);
  border-radius: 4px;
  border: none;
  color: #fff;
  margin-top: 10px;
}

.btnGrisLq:hover {
  background: rgba(122, 124, 128, 0.7);
  color: #fff;
}

.btnGrisTq {
  height: 35px;
  background: rgba(133, 133, 135, 0.8);
  border-radius: 4px;
  padding: 10px 10px;
  border: none;
  color: #fff;
}

.btnGrisTq:hover {
  background: rgba(82, 82, 85, 0.8);
  color: #fff;
}
</style>
