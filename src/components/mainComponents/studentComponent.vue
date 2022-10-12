<template>
  <div>
    <div class="col-12">
      <StudentBar ref="studentBar"></StudentBar>
    </div>
          <!-- Container de crear cita -->
      <div class="form-container" style="text-align: center">
        <h4>Información de la cita</h4>
        <div class="form-horizontal">
          <litepie-datepicker v-model="dateValue"></litepie-datepicker>
          <div class="form-group">
            <label> P2</label>
          </div>
          <div class="form-group">
            <span>Describa el tipo de procedimiento a realizar:</span>
            <textarea class="textarea" rows="4" cols="40"></textarea>
          </div>
          <div class="form-group">
            <label>Consultorio</label>
            <select class="form-control text-center">
              <option value="101">101</option>
              <option value="102">102</option>
              <option value="103">103</option>
              <option value="104">104</option>
            </select>
          </div>
          <button class="btn signup">Crear cita</button>
        </div>
      </div>
    <div class="row">
      
    </div>
    <div  v-show="calendarStudentShow" class="row">
      <CalendarStudent ref="calendarStudent" />
    </div>
    
  </div>
</template>

<script>
import StudentBar from "../commonResources/StudentBar.vue";
import CalendarStudent from "../commonResources/calendar.vue";

export default {
  name: "Area_Estudiante",
  components: { CalendarStudent,
                StudentBar
              },
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

.container {
  background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  max-width: 100% !important;
  margin: 0;
  padding: 0;
}

.form-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 0 25px -15px rgba(0, 0, 0, 0.3);
  color: #000;
  font-size: 15px;
  font-weight: 400;
  margin: 0 0 25px;
  width: 500px;
  align-items: center;
  position: fixed;
  top: 50px;
  left: 260px;
}

.form-container .form-horizontal {
  font-size: 15px;
}

.textarea {
  resize: none;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 15px;
  padding: 10px;
  margin-left: -25%;
}

.form-container .form-horizontal {
  color: #333;
  width: 50%;
  padding: 0 8px;
  margin: 0 0 15px;
  display: inline-block;
}

.form-container .form-horizontal .form-group:nth-child(4) {
  margin-bottom: 30px;
}

.form-container .form-horizontal .form-group label {
  font-size: 15px;
  font-weight: 400;
}

.form-container .form-horizontal .form-control {
  color: #888;
  background: #fff;
  font-weight: 400;
  letter-spacing: 1px;
  height: 40px;
  width: 70px;
  padding: 6px 12px;
  border-radius: 10px;
  border: 2px solid #e7e7e7;
  box-shadow: none;
  margin: 0px auto;
}

.form-container .form-horizontal .form-control:focus {
  box-shadow: 0 0 5px #dcdcdc;
}

.form-container .signin-link {
  color: #333;
  font-size: 14px;
  width: calc(100% - 190px);
  margin-right: 30px;
  display: inline-block;
  vertical-align: top;
}

.form-container .signin-link a {
  color: #00a9ef;
  font-weight: 600;
  transition: all 0.3s ease 0s;
}

.form-container .signin-link a:hover {
  text-decoration: underline;
}

.form-container .form-horizontal .btn {
  padding: 13px 20px 12px;
  background-color: #1a1d53;
  border-radius: 4px;
  font-size: 17px;
  font-weight: bold;
  line-height: 20px;
  color: #fff;
  margin-bottom: 24px;
}

.form-container .form-horizontal .btn:hover,
.form-container .form-horizontal .btn:focus {
  border-color: #1a1d53;
  color: #1a1d53;
}
</style>
