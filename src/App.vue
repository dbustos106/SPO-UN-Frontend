<template>
  <div>
    <img
      src="LogoOdontología.jpg"
      alt="Universidad Nacional de Colombia"
      width="”500″"
      height="”600″"
    />
    <h1>Sistema de Practicas Odontológicas SPO-UN</h1>
  </div>
  <div class="center">
    <div class="input_label">
      <h2>Inicio de Sesión</h2>
      <label for="namef" id="namef">Usuario </label><br />
      <input type="text" id="user" class="fname" /><br />
      <label for="namel" id="namel">Contraseña </label><br />
      <input type="text" id="password" class="lname" /><br /><br />
    </div>
    <div class="input_label">
      <button for="accept" id="acceptButton">Aceptar</button><br />
      <label>¿Sin Usuario? Registrarse</label>
      <br /><br />
    </div>
  </div>
</template>

<script>
export default {};
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
  margin-left: 0px;
}
#namel {
  margin-left: 0px;
}
.lname {
  margin-left: 0px;
}
#acceptButton {
  margin-left: 110px;
}
.margin-down {
  margin-top: 0px;
}
</style>
