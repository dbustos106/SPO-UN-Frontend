<template>
  <div>
    <div
      id="loginError"
      class="loginError"
      role="alert"
      v-bind:style="{ color: emptyInput ? 'black' : 'red' }"
    ></div>
    <div class="center">
      <div class="input_label">
        <h2>Inicio de Sesión</h2>
        <label for="namef" id="namef">Usuario </label><br />
        <input type="text" id="user" class="fname" /><br />
        <label for="namel" id="namel">Contraseña </label><br />
        <input type="password" id="password" class="lname" /><br /><br />
      </div>
      <div class="input_label">
        <button for="accept" id="acceptButton" v-on:click="loginFunction">
          Aceptar</button
        ><br />
        <label>¿Sin Usuario?</label>
        <button
          v-on:click="clickRegisterButton"
          ref="registerButton"
          id="registerButton"
        >
          Registrarse
        </button>
        <br /><br />
      </div>
    </div>
    <div>
      <b-list-group>
        <b-list-group-item v-for="item in items" v-bind:key="item.id">
          {{ item.nombre }}
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
//import { vShow } from "vue";

export default {
  name: "login-page",
  data() {
    return {
      emptyInput: false,
    };
  },
  //functions for the inputs
  methods: {
    //functions
    clickRegisterButton() {
      console.log("You clicked the button!");
      //console.log(this.$root.$data.registryShow);
      this.$root.$data.loginShow = false;
      this.$root.$data.registryShow = true;
    },
    loginFunction() {
      console.log("Logging in");
      var user = document.getElementById("user").value;
      var password = document.getElementById("password").value;

      if (user == "" || password == "") {
        console.log("No hay datos en el login");
        errorFunction("No ha ingresado los datos");
      } else {
        console.log("Logged in");
      }
    },
  },
};

function errorFunction(messageText) {
  //set the error div to be visible and message not
  let errorDiv = document.getElementById("loginError");
  //errorDiv.css("display", "block");
  //update the content of the error message
  errorDiv.innerHTML = messageText;
  this.emptyInput = true;
  //schedule a deactivation
}
</script>

<style>
.center {
  margin: auto;
  width: 60%;
  border: 3px solid #315203;
  padding: 10px;
}
.input_label {
  margin-left: 50px;
}
.namef {
  margin-left: 50px;
}
#namel {
  margin-left: 130px;
}
.lname {
  margin-left: 10px;
}
#confirPassLabel {
  margin-left: 110px;
}
.margin-down {
  margin-top: 0px;
}
button.link {
  background: none;
  border: none;
}
</style>
