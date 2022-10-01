<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-2">
            <button
              for="registryStudent"
              v-on:click="openRegistry"
              id="registryStudentButton"
              class="btn btn-block professor-btn mb-4"
              type="button"
            >
              Registrar Estudiante
            </button>
          </div>
          <div class="col-2">
            <button
              for="closeSession"
              v-on:click="closeSessionProfesor"
              id="closeSession"
              class="btn btn-block professor-btn mb-4"
              type="button"
            >
              Cerrar Sesión
            </button>
          </div>
          <div class="col-3"></div>
        </div>
        <div class="row">
          <registroEstudiante ref="registryE" v-show="registryStudentShow" />
        </div>
      </div>
    </div>

    <!--
    <div class="row">
      <table>
        <thead>
          <tr>
            <td>Nombre</td>
            <td>Correo</td>
            <td>Edad</td>
          </tr>
        </thead>
      </table>
    </div>
    -->
  </div>
</template>

<script>
import registroEstudiante from "./registroEstudiante.vue";
export default {
  name: "Area_Profesor",
  components: {
    registroEstudiante,
  },
  data() {
    return {
      registryStudentShow: false,
    };
  },
  methods: {
    openRegistry() {
      this.$data.registryStudentShow = true;
    },
    closeSessionProfesor() {
      console.log("Here");
      sessionStorage.removeItem("Token");
      this.$root.$data.loginShow = true;
      this.$root.$data.profesorAreaShow = false;
      this.$data.registryStudentShow = false;
      document.getElementById("user").value = "";
      document.getElementById("password").value = "";
    },
  },
};
</script>

<style>
#closeSession {
  margin-left: 500px;
}
.col-2 .professor-btn {
  padding: 13px 20px 12px;
  background-color: #000;
  border-radius: 4px;
  font-size: 17px;
  font-weight: bold;
  line-height: 20px;
  color: #fff;
  margin-bottom: 24px;
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
</style>
