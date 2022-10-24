<template>
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

  <!-- ======= TableContainer ======= -->
  <div id="tableContainer" class="container">
    <div class="card login-card">
      <div class="row no-gutters">
        <p class="login-card-description mt-5 mb-5">Estudiantes a cargo</p>
        <div class="col-12 mx-auto">
          <div class="row mx-auto">
            <table id="tableOfStudents" ref="tableOfStudentsRef">
              <thead>
                <tr>
                  <td>Nombre</td>
                  <td>Correo</td>
                  <td>Edad</td>
                  <td>Cedula</td>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
              </tbody>
            </table>
          </div>
          <div class="row"></div>
        </div>
      </div>
    </div>
  </div>
  <!-- End TablaContainer -->
</template>

<script>
import axios from "axios";
import App from "../../App.vue";

export default {
  name: "studentTable",
  components: {},
  data() {
    return {
      students: [],
    };
  },
  methods: {
    putStudentsInTable() {
      let table = document.getElementById("tableOfStudents");
      axios
        .get(
          "http://localhost:8081/professor/" + sessionStorage.Id + "/students/",
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          }
        )
        .then((response) => {
          let studentInfo = response.data.message.content;

          for (var i in studentInfo) {
            this.$data.students.push({
              id: studentInfo[i].id,
              name: studentInfo[i].name,
              email: studentInfo[i].username + "@unal.edu.co",
              age: 22,
              cedula: studentInfo[i].document_number,
            });
          }

          for (var j in this.$data.students) {
            let row = table.insertRow();
            let nameCell = row.insertCell();
            let emailCell = row.insertCell();
            let ageCell = row.insertCell();
            let cedulaCell = row.insertCell();
            nameCell.appendChild(
              document.createTextNode(this.$data.students[j].name)
            );
            emailCell.appendChild(
              document.createTextNode(this.$data.students[j].email)
            );
            ageCell.appendChild(
              document.createTextNode(this.$data.students[j].age)
            );
            cedulaCell.appendChild(
              document.createTextNode(this.$data.students[j].cedula)
            );
          }
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.putStudentsInTable();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
  },
  mounted() {
    this.putStudentsInTable();
  },
};
</script>

<style>
#tableContainer {
  width: 80%;
  margin-top: 40px;
  height: fit-content;
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
.col-3 .professor-btn {
  padding: 13px 20px 12px;
  background-color: rgb(70, 67, 67);
  border-radius: 4px;
  font-size: 17px;
  font-weight: bold;
  line-height: 20px;
  color: #fff;
  margin-bottom: 24px;
}
#tableOfStudents {
  width: 80%;
  margin-left: 120px;
  margin-bottom: 50px;
  align-items: center;
  position: center;
}
</style>
