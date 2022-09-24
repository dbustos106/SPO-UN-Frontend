<template>
  <div>
    <div
      id="errorsE"
      class="errors"
      role="alert"
      v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
    ></div>
    <div class="input_label">
      <h2>Registro estudiantes</h2>
      <br />
    </div>
    <div class="input_label">
      <label for="namef" id="nameEf">Nombre </label>
      <label for="namel" id="namelER">Apellido </label><br />
      <input
        type="text"
        id="fnameER"
        class="fname"
        v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
      />
      <input
        type="text"
        id="lnameER"
        class="lname"
        v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
      /><br /><br />
    </div>
    <div class="input_label">
      <label for="email">Correo </label><br />
      <input
        type="text"
        id="emailER"
        name="email"
        v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
      />
      <label>@unal.edu.co </label><br />
      <br /><br />
    </div>
    <div class="input_label">
      <label for="Cedula">Cédula </label><br />
      <input list="browsersE" />
      <datalist id="browsersE">
        <option value="CC">CC</option>
        <option value="CE">CE</option>
      </datalist>

      <input
        type="text"
        id="cedulaER"
        name="cedula"
        v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
      />
      <br /><br />
    </div>
    <div class="input_label">
      <label for="pass1">Contraseña </label>
      <label for="pass2" id="confirPassLabelE">Confirmar Contraseña </label
      ><br /><br />
      <div class="margin-down">
        <input
          type="password"
          id="passwordER"
          name="password"
          v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
        />
        <input
          type="password"
          id="confirmPasswordER"
          name="confirmPassword"
          class="lname"
          v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
        /><br /><br />
      </div>
      <button for="Regresar" v-on:click="returnToPage" id="returnButtonE">
        Regresar</button
      ><br />
      <button for="accept" v-on:click="register" id="acceptButtonE">
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
      //this.$root.$data.loginShow = true;
      this.$parent.$data.registryStudentShow = false;
    },
    register() {
      var name = document.getElementById("fnameER").value;
      var lastName = document.getElementById("lnameER").value;
      var email = document.getElementById("emailER").value;
      var password = document.getElementById("passwordER").value;
      var confirmPassword = document.getElementById("confirmPasswordER").value;
      var cedula = document.getElementById("cedulaER").value;
      var tipoCedula = "cc";
      /*
      var tipoCedula = document.getElementById("browsersE").value;
      tipoCedula = document.querySelector(
        "#tipoCedula" + " option[value='" + tipoCedula + "']"
      ).dataset.value;*/
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
          this.sendData(name, lastName, email, password, cedula, tipoCedula);
          console.log("Enviar Datos");
        }
      }
    },
    async sendData(name, lastName, email, password, cedula, tipoCedula) {
      let datos = {
        username: email,
        password: password,
        name: name + " " + lastName,
        document_type: tipoCedula,
        document_number: cedula,
        professor_id: 1,
      };

      console.log(datos);

      let formBody = JSON.stringify(datos);
      console.log(formBody);

      axios
        .post(
          "http://localhost:8081/register/student",

          formBody,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.Token,
            },
          }
        )
        .then((response) => {
          this.errorFunction("Registro Exitoso");
          console.log("Register complete");
          console.log(response);
          //localStorage.setItem("Token", response.token);
        })
        .catch((err) => {
          console.log("Falló registro");
          console.log(err);
        });
    },
    errorFunction(messageText) {
      //set the error div to be visible and message not
      let errorDiv = document.getElementById("errorsE");
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
