<template>
  <div class="container">
    <div class="col-12">
      <div class="row">
        <table id="tableOfStudents">
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
      <div class="row">
        <div class="col-3">
          <button
            for="closeTable"
            v-on:click="closeStudentTable"
            id="closeStudentTable"
            class="btn btn-block professor-btn mb-4"
            type="button"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "studentTable",
  components: {},
  data() {
    return {
      students: {
        1: {
          id: 1,
          name: "Gustavo Escobar",
          email: "gescobar@unal.edu.co",
          age: 22,
          cedula: 4294,
        },
        2: {
          id: 2,
          name: "Daniel Santiago Delgadillo",
          email: "dsdelgadillo@unal.edu.co",
          age: 23,
          cedula: 9045,
        },
        3: {
          id: 3,
          name: "Jose Luis Pulido",
          email: "jlpulido@unal.edu.co",
          age: 22,
          cedula: 10469,
        },
        4: {
          id: 4,
          name: "Laura Espinosa Botero",
          email: "laespinosabo@unal.edu.co",
          age: 25,
          cedula: 102489,
        },
      },
    };
  },
  methods: {
    putStudentsinTable() {
      let table = document.getElementById("tableOfStudents");

      //Back petition goes here

      for (var i in this.$data.students) {
        console.log(this.$data.students[i].name);
        let row = table.insertRow();
        let nameCell = row.insertCell();
        let emailCell = row.insertCell();
        let ageCell = row.insertCell();
        let cedulaCell = row.insertCell();
        nameCell.appendChild(
          document.createTextNode(this.$data.students[i].name)
        );
        emailCell.appendChild(
          document.createTextNode(this.$data.students[i].email)
        );
        ageCell.appendChild(
          document.createTextNode(this.$data.students[i].age)
        );
        cedulaCell.appendChild(
          document.createTextNode(this.$data.students[i].cedula)
        );
      }
    },
    closeStudentTable() {
      this.$root.$refs.ProfesorArea.$data.tableStudentsShow = false;
    },
  },
};

//this.putStudentsinTable();
</script>

<style>
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
</style>
