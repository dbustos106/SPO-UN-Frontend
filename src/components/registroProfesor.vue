<template>
  <div>
    <div
      id="errorsP"
      class="errors"
      role="alert"
      v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
    ></div>
    <div class="input_label">
      <h2>Registro profesores</h2>
      <br />
    </div>
    <div class="input_label">
      <label for="namef" id="namePf" class="label1">Nombre </label>
      <label for="namel" id="namelPR" class="label2">Apellido </label><br />
      <input
        type="text"
        id="fnamePR"
        class="fname"
        v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
      />
      <input
        type="text"
        id="lnamePR"
        class="lname"
        v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
      /><br /><br />
    </div>
    <div class="input_label">
      <label for="email" class="label1">Correo </label><br />
      <input
        type="text"
        id="emailPR"
        name="email"
        class="fname"
        v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
      />
      <label>@unal.edu.co </label><br />
      <br /><br />
    </div>
    <div class="input_label">
      <label for="Cedula" class="label1">Cédula </label><br />
      <input list="browsersP" class="fname" />
      <datalist id="browsersP">
        <option value="CC">CC</option>
        <option value="CE">CE</option>
      </datalist>

      <input type="text" id="cedulaPR" name="cedula" class="lname" />
      <br /><br />
    </div>
    <div class="input_label">
      <label for="pass1" class="label1">Contraseña </label>
      <label for="pass2" id="confirPassLabelP" class="label2"
        >Confirmar Contraseña </label
      ><br /><br />
      <div class="margin-down">
        <input
          type="password"
          id="passwordPR"
          name="password"
          class="fname"
          v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
        />
        <input
          type="password"
          id="confirmPasswordPR"
          name="confirmPassword"
          class="lname"
          v-bind:style="{ color: emptyInput ? 'red' : 'black' }"
        /><br /><br />
      </div>
      <div class="row">
        <div class="col-3">
          <button for="Regresar" v-on:click="returnToPage" id="returnButtonP">
            Regresar</button
          ><br />
        </div>
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-3">
          <button for="accept" v-on:click="register" id="acceptButtonP">
            Aceptar</button
          ><br />
        </div>
      </div>
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
      this.$parent.$data.registryProfesorShow = false;
    },
    register() {
      var name = document.getElementById("fnamePR").value;
      var lastName = document.getElementById("lnamePR").value;
      var email = document.getElementById("emailPR").value;
      var password = document.getElementById("passwordPR").value;
      var confirmPassword = document.getElementById("confirmPasswordPR").value;
      var cedula = document.getElementById("cedulaPR").value;
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
      };

      console.log(sessionStorage.Token);

      let formBody = JSON.stringify(datos);
      console.log(formBody);

      axios
        .post(
          "http://localhost:8081/register/professor",

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
      let errorDiv = document.getElementById("errorsP");
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
.label1 {
  margin-left: 10px;
}
.label2 {
  margin-left: 150px;
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
#confirPassLabelP {
  margin-left: 135px;
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
</style>
