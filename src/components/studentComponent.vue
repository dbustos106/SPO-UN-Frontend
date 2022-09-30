<template>
  <div>
    <div class="row">
      <div class="col-3">
        <button for="programHours" id="programHours">Programar horarios</button>
      </div>
      <div class="col-3">
        <button for="watchHours" v-on:click="openCalendar" id="watchHours">
          Ver horarios
        </button>
      </div>
      <div class="col-3">
        <button for="closeSession" v-on:click="closeSession" id="closeSession">
          Cerrar Sesión
        </button>
      </div>
    </div>
    <div class="row">
      <CalendarStudent ref="calendarStudent" v-show="calendarStudentShow" />
    </div>
  </div>
</template>

<script>
import CalendarStudent from "./calendar.vue";

export default {
  name: "Area_Estudiante",
  components: { CalendarStudent },
  data() {
    return {
      calendarStudentShow: false,
    };
  },
  methods: {
    closeSession() {
      sessionStorage.removeItem("Token");
      this.$root.$data.loginShow = true;
      this.$root.$data.studentAreaShow = false;
      document.getElementById("user").value = "";
      document.getElementById("password").value = "";
    },
    openCalendar() {
      this.$data.calendarStudentShow = true;
    },
  },
};
</script>

<style>
#closeSession {
  margin-left: 500px;
}
</style>
