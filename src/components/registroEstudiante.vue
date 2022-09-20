<template>
  <div>
    <div id="errors" class="errors" role="alert"></div>
    <div class="input_label">
      <h2>Registro estudiantes</h2>
      <br />
    </div>
    <div class="input_label">
      <label for="namef" id="namef">Nombre </label>
      <label for="namel" id="namel">Apellido </label><br />
      <input type="text" id="fnameR" class="fname" />
      <input type="text" id="lnameR" class="lname" /><br /><br />
    </div>
    <div class="input_label">
      <label for="email">Correo </label><br />
      <input type="text" id="emailR" name="email" />
      <label>@unal.edu.co </label><br />
      <br /><br />
    </div>
    <div class="input_label">
      <label for="pass1">Contraseña </label>
      <label for="pass2" id="confirPassLabel">Confirmar Contraseña </label
      ><br /><br />
      <div class="margin-down">
        <input type="text" id="passwordR" name="password" />
        <input
          type="text"
          id="confirmPasswordR"
          name="confirmPassword"
          class="lname"
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
export default {
  name: "registro-estudiante",
  data() {
    return {};
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
        errorFunction("Faltan datos por llenar");
      } else {
        if (password !== confirmPassword) {
          console.log("Constraseñas son diferentes");
          errorFunction("Las constraseñas no coinciden");
        } else {
          console.log("Enviar Datos");
        }
      }
    },
  },
};

function errorFunction(messageText) {
  //set the error div to be visible and message not
  let errorDiv = document.getElementById("errors");
  //errorDiv.css("display", "block");
  //update the content of the error message
  errorDiv.innerHTML = messageText;
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
</style>
