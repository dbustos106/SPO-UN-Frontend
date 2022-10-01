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
      <label for="namef" id="namef" class="label1">Nombre </label>
      <label for="namel" id="namelR" class="label2">Apellido </label><br />
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
      <label for="email" class="label1">Correo </label><br />
      <input
        type="text"
        id="emailR"
        name="email"
        class="fname"
        v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
      />
      <br /><br />
    </div>
    <div class="input_label">
      <label for="Cedula" class="label1">Cédula </label><br />
      <input list="browsers" class="fname" />
      <datalist id="browsers">
        <option value="CC"></option>
        <option value="CE"></option>
      </datalist>

      <input
        type="text"
        id="cedulaR"
        name="cedula"
        class="lname"
        v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
      />
      <br /><br />
    </div>
    <div class="input_label">
      <label for="pass1" class="label1">Contraseña </label>
      <label for="pass2" id="confirPassLabel" class="label2"
        >Confirmar Contraseña </label
      ><br /><br />
      <div class="margin-down">
        <input
          type="password"
          id="passwordR"
          name="password"
          class="fname"
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
      <br />
    </div>

    <div class="input_label">
      <label for="edad" class="label1">Edad </label>
      <label for="genero" id="labelGender" class="label2">Género </label>
      <label for="RH" id="RHLabel">RH </label><br /><br />
      <div class="margin-down">
        <input
          type="number"
          id="ageR"
          name="age"
          class="lname"
          v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
        />
        <input
          type="text"
          id="genderR"
          name="gender"
          class="fname"
          v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
        />
        <input
          type="text"
          id="RHR"
          name="RH"
          class="fname"
          v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
        />
      </div>
      <div class="row">
        <div class="col-3">
          <button for="Regresar" v-on:click="returnToPage" id="returnButton">
            Regresar</button
          ><br />
        </div>
        <div class="col-3"></div>
        <div class="col-3">
          <button for="accept" v-on:click="register" id="acceptButton">
            Aceptar</button
          ><br />
        </div>
        <div class="col-3"></div>
      </div>
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
      var genero = document.getElementById("genderR").value;
      var edad = document.getElementById("ageR").value;
      var RH = document.getElementById("RHR").value;
      console.log(name);
      if (
        name == "" ||
        lastName == "" ||
        email == "" ||
        password == "" ||
        confirmPassword == "" ||
        cedula == "" ||
        genero == "" ||
        edad == "" ||
        RH == ""
      ) {
        console.log("No se han puesto datos");
        this.errorFunction("Faltan datos por llenar");
      } else {
        if (password !== confirmPassword) {
          console.log("Constraseñas son diferentes");
          this.errorFunction("Las contraseñas no coinciden");
        } else {
          this.sendData(
            name,
            lastName,
            email,
            password,
            cedula,
            tipoCedula,
            genero,
            edad,
            RH
          );
          console.log("Enviar Datos");
        }
      }
    },
    async sendData(
      name,
      lastName,
      email,
      password,
      cedula,
      tipoCedula,
      genero,
      edad,
      RH
    ) {
      var user = email.substring(0, email.indexOf("@"));
      let datos = {
        username: user,
        password: password,
        name: name + " " + lastName,
        email: email,
        document_type: "cc",
        document_number: cedula,
        age: parseInt(edad),
        gender: genero,
        blood_type: RH,
      };

      let formBody = JSON.stringify(datos);
      console.log(formBody);

      axios
        .post(
          "http://localhost:8081/register/patient",

          formBody,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              //"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
              "Content-Type": "application/json",
              Authorization: "Bearer e",
            },
          }
        )
        .then((response) => {
          console.log("Register complete");
          console.log(response);
          this.errorFunction("Registro Exitoso");
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
  margin-left: 120px;
}
.margin-down {
  margin-top: 0px;
}
#labelGender {
  margin-left: 170px;
}
#RHLabel {
  margin-left: 165px;
}
</style>
