<template>
  <div>
    <div>
      <!--<StudentTemplate ref="bar"/>-->
    </div>
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
    <div  v-show="calendarStudentShow" class="row">
      <CalendarStudent ref="calendarStudent" />
    </div>
    
  </div>
</template>

<script>
//import StudentTemplate from "../commonResources/StudentTemplate.vue";
import CalendarStudent from "../commonResources/calendar.vue";

export default {
  name: "Area_Estudiante",
  components: { CalendarStudent,
              //StudentTemplate 
              },
  data() {
    return {
      calendarStudentShow: true,
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
      this.$refs.calendarStudent.getStudentSchedule();
      this.$refs.calendarStudent.$data.calendarOptions.height = 1000;
      this.$refs.calendarStudent.$data.calendarOptions.width = 1500;
    },
  },
};
</script>

<style>
#closeSession {
  margin-left: 500px;
}
</style>
