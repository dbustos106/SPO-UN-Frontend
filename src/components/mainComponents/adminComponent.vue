<template>
  <div class="container">
    <div class="col-12">
      <div class="row">
        <div class="col-3">
          <button
            for="registryStudent"
            v-on:click="openRegistry"
            id="registryStudentButton"
            class="btn btn-block admin-btn mb-4"
            type="button"
          >
            Registrar Profesor
          </button>
        </div>
        <div class="col-3">
          <button
            for="closeSession"
            v-on:click="closeSession"
            id="closeSession"
            class="btn btn-block admin-btn mb-4"
            type="button"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
      <div class="row">
        <registroProfesor ref="registryP" v-show="registryProfesorShow" />
      </div>
    </div>
  </div>
</template>

<script>
import registroProfesor from "../registries/registroProfesor.vue";
export default {
  name: "Area_Administrador",
  components: {
    registroProfesor,
  },
  data() {
    return {
      registryProfesorShow: false,
    };
  },
  methods: {
    openRegistry() {
      this.$data.registryProfesorShow = true;
    },
    closeSession() {
      sessionStorage.removeItem("Token");
      this.$root.$data.loginShow = true;
      this.$root.$data.adminAreaShow = false;
      this.$data.registryProfesorShow = false;
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
.col-3 .admin-btn {
  padding: 13px 20px 12px;
  background-color: #000;
  border-radius: 4px;
  font-size: 17px;
  font-weight: bold;
  line-height: 20px;
  color: #fff;
  margin-bottom: 24px;
}
</style>
