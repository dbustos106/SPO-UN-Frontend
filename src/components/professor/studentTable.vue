<template>
  <div>
    <!-- ======= Meta datos ======= -->
  <div>
    <!-- <meta charset="UTF-8" /> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>SPO UN - Inicia sesión</title>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
  </div>
  <!-- End Meta datos -->

  <!-- ======= studentsContainer ======= -->
  <div id="studentsContainer" class="container">
    <div class="card login-card">
      <div class="row no-gutters">
        <p class="login-card-description mt-5 mb-5">Estudiantes a cargo</p>
        <div class="col-12 mx-auto">
          <!-- ======= Busqueda ======= -->
          <div class="row-sm-6 ml-5 mb-3">
            Búsqueda:
            <input id="query" v-on:keyup="filteredData" />
          </div>
          <!-- End Busqueda -->

          <!-- ======= TableOfStudents ======= -->
          <div class="row mx-auto">
            <table id="tableOfStudents" ref="tableOfStudentsRef">
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
          <!-- End TableOfStudents -->

          <!-- ======= Buttons ======= -->
          <div class="row ml-auto">
            <div class="col-1 ml-5">
              <button
                id="backButton"
                class="btn btn-block"
                v-on:click="backPage"
              >
                &lt;
              </button>
            </div>
            <div class="col-1">
              <button
                id="nextButton"
                class="btn btn-block"
                v-on:click="nextPage"
              >
                &gt;
              </button>
            </div>
          </div>
          <!-- End Buttons -->
        </div>
      </div>
    </div>
  </div>
  <!-- End studentsContainer -->
</template>

<script>
import axios from "axios";
import App from "../../App.vue";

export default {
  name: "studentTable",
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
      let table = document.getElementById("tableOfStudents");
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
          "http://localhost:8081/professor/" + sessionStorage.Id + "/students/",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
            params: { page: page, size: 20 },
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
      let table = document.getElementById("tableOfStudents");

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
      let table = document.getElementById("tableOfStudents");
      this.$data.idPage += 1;
      while (table.children[1].firstChild != table.children[1].lastChild) {
        var child = table.children[1].lastChild;
        child.remove();
      }
      this.getStudents(this.$data.idPage);
    },
    filteredData() {
      let table = document.getElementById("tableOfStudents");
      var filterKey = document.getElementById("query").value;
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
#studentsContainer {
  width: 70%;
}

#tableOfStudents {
  width: 90%;
  margin-left: 50px;
  height: fit-content;
  position: center;
  padding: 20px 20px;
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
