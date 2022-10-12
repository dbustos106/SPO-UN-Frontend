<template>
  <div class="container" style="background-image: url(OdontologiaConsultorio.jpg)">
    <ProfessorBar ref="professorBar"></ProfessorBar>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-2">
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
        </div>
        <div class="row">
          <registroEstudiante ref="registryE" v-show="registryStudentShow" />
        </div>
        <div class="row">
          <student-table ref="StudentProfesor" v-show="tableStudentsShow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfessorBar from "../commonResources/ProfessorBar.vue";
import registroEstudiante from "../registries/registroEstudiante.vue";
import studentTable from "../commonResources/studentTable.vue";
export default {
  name: "Area_Profesor",
  components: {
    registroEstudiante,
    studentTable,
    ProfessorBar,
  },
  data() {
    return {
      registryStudentShow: false,
      tableStudentsShow: false,
      studentsLoaded: false,
    };
  },
  methods: {
    openRegistry() {
      this.$data.registryStudentShow = true;
      this.$data.tableStudentsShow = false;
    },
    openStudentTable() {
      this.$data.registryStudentShow = false;
      if (!this.$data.studentsLoaded) {
        this.$refs.StudentProfesor.putStudentsinTable();
        this.$data.studentsLoaded = true;
      }

      this.$data.tableStudentsShow = true;
    },
    closeSessionProfesor() {
      console.log("Here");
      sessionStorage.removeItem("Token");
      this.$root.$data.loginShow = true;
      this.$root.$data.profesorAreaShow = false;
      this.$data.registryStudentShow = false;
      this.$data.tableStudentsShow = false;
      this.$data.studentsLoaded = false;
      this.$refs.StudentProfesor.$data.students=[];
      let tableRows=this.$refs.StudentProfesor.$refs.tableOfStudentsRef;
      for(var i=tableRows.rows.length-1; i>1;i--){
        //console.log(tableRows.rows[i]);
        tableRows.rows[i].remove();
      }
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
</style>
