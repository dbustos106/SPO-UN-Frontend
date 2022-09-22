<template>
  <div>
    <div
      id="errors"
      class="errors"
      role="alert"
      v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
    ></div>
    <div class="input_label">
      <h2>Registro paciente</h2>
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
      <br /><br />
    </div>
    <div class="input_label">
      <label for="Cedula">Cédula </label><br />
      <input list="browsers" />
      <datalist id="browsers">
        <option value="CC"></option>
        <option value="CE"></option>
      </datalist>

      <input
        type="text"
        id="cedulaR"
        name="cedula"
        v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
      />
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
  name: "registro-paciente",
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
      var tipoCedula = document.getElementById("browsers").value;
      var cedula = document.getElementById("cedulaR").value;
      console.log(name);
      if (
        name == "" ||
        lastName == "" ||
        email == "" ||
        password == "" ||
        confirmPassword == "" ||
        cedula == ""
      ) {
        console.log("No se han puesto datos");
        this.errorFunction("Faltan datos por llenar");
      } else {
        if (password !== confirmPassword) {
          console.log("Constraseñas son diferentes");
          this.errorFunction("Las contraseñas no coinciden");
        } else {
          this.errorFunction("Registro Exitoso");
          this.sendData(name, lastName, email, password, cedula, tipoCedula);
          console.log("Enviar Datos");
        }
      }
    },
    async sendData(name, lastName, email, password, cedula, tipoCedula) {
      let datos = {
        username: email,
        password: password,
        name: name + lastName,
        document_type: tipoCedula,
        document_number: cedula,
      };

      let formBody = this.$root.toUrlEncoded(datos);

      axios
        .post(
          "http://localhost:8081/student/save",

          formBody,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
          }
        )
        .then((response) => {
          console.log("Register complete");
          console.log(response);
          //localStorage.setItem("Token", response.token);
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
