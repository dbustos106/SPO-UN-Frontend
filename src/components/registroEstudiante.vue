<template>
  <div>
    <div
      id="errors"
      class="errors"
      role="alert"
      v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
    ></div>
    <div class="input_label">
      <h2>Registro estudiantes</h2>
      <br />
    </div>
    <div class="input_label">
      <label for="namef" id="namef">Nombre </label>
      <label for="namel" id="namelR">Apellido </label><br />
      <input
        type="text"
        id="fnameR"
        class="fname"
        v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
      />
      <input
        type="text"
        id="lnameR"
        class="lname"
        v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
      /><br /><br />
    </div>
    <div class="input_label">
      <label for="email">Correo </label><br />
      <input
        type="text"
        id="emailR"
        name="email"
        v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
      />
      <label>@unal.edu.co </label><br />
      <br /><br />
    </div>
    <div class="input_label">
      <label for="pass1">Contraseña </label>
      <label for="pass2" id="confirPassLabel">Confirmar Contraseña </label
      ><br /><br />
      <div class="margin-down">
        <input
          type="password"
          id="passwordR"
          name="password"
          v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
        />
        <input
          type="password"
          id="confirmPasswordR"
          name="confirmPassword"
          class="lname"
          v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
        /><br /><br />
      </div>
      <button for="Regresar" v-on:click="returnToPage" id="returnButton">
        Regresar</button
      ><br />
      <button for="accept" v-on:click="register" id="acceptButton">
        Aceptar</button
      ><br />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "registro-estudiante",
  data() {
    return {
      emptyInput: false,
    };
  },
  methods: {
    returnToPage() {
      console.log("You clicked the button!");
      //console.log(this.$root.$data.registryShow);
      this.$root.$data.loginShow = true;
      this.$root.$data.registryShow = false;
    },
    register() {
      var name = document.getElementById("fnameR").value;
      var lastName = document.getElementById("lnameR").value;
      var email = document.getElementById("emailR").value;
      var password = document.getElementById("passwordR").value;
      var confirmPassword = document.getElementById("confirmPasswordR").value;
      console.log(name);
      if (
        name == "" ||
        lastName == "" ||
        email == "" ||
        password == "" ||
        confirmPassword == ""
      ) {
        console.log("No se han puesto datos");
        this.errorFunction("Faltan datos por llenar");
      } else {
        if (password !== confirmPassword) {
          console.log("Constraseñas son diferentes");
          this.errorFunction("Las contraseñas no coinciden");
        } else {
          this.errorFunction("Registro Exitoso");
          this.sendData(name, lastName, email, password);
          console.log("Enviar Datos");
        }
      }
    },
    async sendData(name, lastName, email, password) {
      let datos = {};
      datos.name = name;
      datos.lastName = lastName;
      datos.email = email;
      datos.password = password;
      datos = JSON.stringify(datos);
      axios
        .post(
          "http://localhost:8081/student",

          datos,
          { useCredentials: true }
        )
        .then((response) => {
          localStorage.setItem("Token", response.token);
        })
        .catch((err) => {
          console.log("Falló login");
          console.log(err);
        });
    },
    errorFunction(messageText) {
      //set the error div to be visible and message not
      let errorDiv = document.getElementById("errors");
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
#namelR {
  margin-left: 120px;
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
</style>
