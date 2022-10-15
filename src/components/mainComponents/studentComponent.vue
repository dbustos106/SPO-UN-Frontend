<template>
  <div>
    <div class="col-12">
      <StudentBar ref="studentBar"></StudentBar>
    </div>
    <div v-show="createAppointmentShow" class="row">
      <createAppointment ref="createAppointment" />
    </div>
    <div  v-show="calendarStudentShow" class="row">
      <CalendarStudent ref="calendarStudent" />
    </div>
  </div>
</template>

<script>
import StudentBar from "../commonResources/student/StudentBar.vue";
import CalendarStudent from "../commonResources/student/calendar.vue";
import createAppointment from "../commonResources/student/createAppointment.vue";
export default {
  name: "Area_Estudiante",
  components: { 
                CalendarStudent,
                StudentBar,
                createAppointment
              },
  data() {
    return {
      calendarStudentShow: false,
      createAppointmentShow: false,
      calendarInfoShown: false,
    };
  },
  methods: {
    crearCita() {
      this.$data.createAppointmentShow = true;
      this.$data.calendarStudentShow = false;
    },
    closeSession() {
      sessionStorage.removeItem("Token");
      this.$root.$data.loginShow = true;
      this.$root.$data.studentAreaShow = false;
      this.$data.createAppointmentShow = false;
      this.$data.calendarInfoShown = false;
      this.$refs.calendarStudent.$data.calendarOptions.events=[];
      document.getElementById("user").value = "";
      document.getElementById("password").value = "";
    },
    openCalendar() {
      this.$data.calendarStudentShow = true;
      this.$data.createAppointmentShow = false;
      if(!this.$data.calendarInfoShown){
        this.$refs.calendarStudent.getStudentSchedule();
        this.$data.calendarInfoShown=true;
      }
      this.$refs.calendarStudent.$data.calendarOptions.height = 1000;
      this.$refs.calendarStudent.$data.calendarOptions.width = 1500;
    },
  },
};
</script>
<style>
</style>
