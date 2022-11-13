<template>
  <div class="container marco">
    <div class="card mt-5 mb-3">
      <h2 class="card-description mx-auto mt-5 mb-3">Estudiantes a cargo</h2>
      <div id="studentContainer" class="mx-auto">
        <!-- ======= Busqueda ======= -->
        <div class="row-sm-6 mb-3">
          <span>Búsqueda: </span>
          <input id="nptQuery" v-on:keyup="filteredData" />
        </div>
        <!-- End Busqueda -->

        <!-- ======= Studentstable ======= -->
        <div class="TableContainer">
          <table id="tblStudents">
            <thead>
              <tr>
                <td>Nombre</td>
                <td>Correo</td>
                <td>Tipo de documento</td>
                <td>Número de documento</td>
              </tr>
            </thead>
            <tbody>
              <tr></tr>
            </tbody>
          </table>
        </div>
        <!-- End StudentsTable -->

        <!-- ======= Buttons ======= -->
        <button class="btnGrisLq mr-1 mb-3" v-on:click="backPage">&lt;</button>
        <button class="btnGrisLq mb-3" v-on:click="nextPage">&gt;</button>
        <!-- End Buttons -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import App from "../../App.vue";

export default {
  name: "studentsProfessorPage",

  components: {},
  data() {
    return {
      idPage: 0,
      lastPage: 0,
      students: [],
    };
  },
  methods: {
    putStudentsInTable(students) {
      let table = document.getElementById("tblStudents");
      for (var j in students) {
        let row = table.insertRow();
        let nameCell = row.insertCell();
        let emailCell = row.insertCell();
        let documentTypeCell = row.insertCell();
        let documentNumberCell = row.insertCell();
        nameCell.appendChild(document.createTextNode(students[j].name));
        emailCell.appendChild(document.createTextNode(students[j].email));
        documentTypeCell.appendChild(
          document.createTextNode(students[j].document_type)
        );
        documentNumberCell.appendChild(
          document.createTextNode(students[j].document_number)
        );
      }
    },
    getStudents(page) {
      axios
        .get(
          App.methods.getBackUrl() +
            "/professor/" +
            sessionStorage.Id +
            "/students/",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
            params: { page: page, size: 10 },
          }
        )
        .then((response) => {
          if (!("error" in response.data)) {
            let students = response.data.message.content;

            this.$data.students = [];
            for (var i in students) {
              this.$data.students.push({
                id: students[i].id,
                name: students[i].name,
                email: students[i].username + "@unal.edu.co",
                document_type: students[i].document_type,
                document_number: students[i].document_number,
              });
            }
            this.$data.lastPage += 1;
            this.putStudentsInTable(students);
          } else {
            this.$data.idPage = this.$data.lastPage;
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.getStudents(page);
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    backPage() {
      let table = document.getElementById("tblStudents");

      if (this.$data.idPage > 0) {
        this.$data.idPage -= 1;
        this.$data.lastPage -= 1;
        while (table.children[1].firstChild != table.children[1].lastChild) {
          var child = table.children[1].lastChild;
          child.remove();
        }
        this.getStudents(this.$data.idPage);
      }
    },
    nextPage() {
      let table = document.getElementById("tblStudents");
      this.$data.idPage += 1;
      while (table.children[1].firstChild != table.children[1].lastChild) {
        var child = table.children[1].lastChild;
        child.remove();
      }
      this.getStudents(this.$data.idPage);
    },
    filteredData() {
      let table = document.getElementById("tblStudents");
      var filterKey = document.getElementById("nptQuery").value;
      var filterStudents = this.$data.students;

      filterStudents = filterStudents.filter(function (row) {
        return Object.keys(row).some(function (key) {
          return String(row[key]).toLowerCase().indexOf(filterKey) > -1;
        });
      });

      while (table.children[1].firstChild != table.children[1].lastChild) {
        var child = table.children[1].lastChild;
        child.remove();
      }
      this.putStudentsInTable(filterStudents);
    },
  },
  mounted() {
    this.getStudents(0);
  },
};
</script>

<style>
#studentContainer {
  width: 90%;
}
</style>
