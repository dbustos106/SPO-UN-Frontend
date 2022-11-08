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

/*--------------------------------------------------------------
# login-card
--------------------------------------------------------------*/
.card {
  position: relative;
  margin-top: 40px;
  width: 100%;
  height: 100%;
  border: 0;
  border-radius: 27.5px;
  box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);
  overflow: hidden;
}

.card-description {
  font-size: 25px;
  color: #000;
  font-weight: normal;
  text-align: center;
  margin-bottom: 23px;
}

.card-img {
  border-radius: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}
img .card-img {
  transition: 0.5s all ease-in-out;
}
img .card-img:hover {
  transform: scale(1.5);
}

.card form {
  max-width: 326px;
}
.card .form-control {
  border: 1px solid #d5dae2;
  margin-bottom: 20px;
  min-height: 45px;
  font-size: 13px;
  line-height: 15;
  font-weight: normal;
}
.card .form-control::-webkit-input-placeholder {
  color: #919aa3;
}
.card .form-control::-moz-placeholder {
  color: #919aa3;
}
.card .form-control:-ms-input-placeholder {
  color: #919aa3;
}
.card .form-control::-ms-input-placeholder {
  color: #919aa3;
}
.card .form-control::placeholder {
  color: #919aa3;
}
.card .btn {
  background-color: #1a1d53;
  border-radius: 4px;
  font-size: 17px;
  font-weight: bold;
  line-height: 20px;
  color: #fff;
  margin-bottom: 24px;
  padding: 5px;
}

.card .btn:hover {
  border-color: #1a1d53;
  color: #1a1d53;
}

.forgot-password-link {
  font-size: 14px;
  color: #47637e;
  text-align: center;
}

.card-footer-text {
  font-size: 14px;
  color: #0d2366;
}
.card-footer-text:hover {
  font-size: 14px;
  color: #060912;
}
@media (max-width: 767px) {
  .card-footer-text {
    margin-bottom: 24px;
  }
}
.card-footer-nav a {
  font-size: 14px;
  color: #919aa3;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

.form-select {
  height: 45px;
  margin-bottom: 20px;
}

/*--------------------------------------------------------------
# SectionMarco
--------------------------------------------------------------*/

.sectionMarco {
  width: 100%;
  height: auto;
  background: url("./assets/img/panoramicaUnal.jpg") top center;
  background-size: cover;
  position: relative;
}

.sectionMarco:before {
  content: "";
  background: rgba(45, 53, 69, 0.7);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

.sectionMarco.userInit {
  min-height: 100vh;
  position: absolute;
  padding-bottom: 40px;
}

.marco {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.marco .container {
  text-align: center;
  padding-top: 50px;
}

.marco h1 {
  margin: 0;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  color: #fff;
}

.marco h2 {
  color: #eee;
  margin: 15px 0 0 0;
  font-size: 22px;
}

.marco .btn-sign-up {
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 9px 35px;
  border-radius: 50px;
  transition: 0.5s;
  margin-top: 40px;
  margin-right: 4px;
  border: 2px solid #ffc107;
  color: #fff;
}

.marco .btn-sign-up:hover {
  background: #ffc107;
}

.marco .btn-login {
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 9px 35px;
  border-radius: 50px;
  transition: 0.5s;
  margin-top: 40px;
  margin-left: 4px;
  border: 2px solid #ffc107;
  color: #fff;
}

.marco .btn-login:hover {
  background: #ffc107;
}

.ing2 {
  animation: aumWidth 0.7s forwards;
}

@keyframes aumWidth {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 100px;
  }
}

/*.

*/

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

/*--------------------------------------------------------------
# Buttons
--------------------------------------------------------------*/

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

/*--------------------------------------------------------------
# Errors
--------------------------------------------------------------*/

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

@keyframes reveal {
  0% {
    transform: translate(0px, -20px);
  }
  50% {
    transform: translate(0px, -20px);
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
