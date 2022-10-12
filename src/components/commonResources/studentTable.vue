<template>
  <div class="container">
    <div class="col-12">
      <div class="row">
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
      <div class="row">
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
export default {
  name: "studentTable",
  components: {},
  data() {
    return {
      students: [
        
      ],
    };
  },
  methods: {
    putStudentsinTable() {
      let table = document.getElementById("tableOfStudents");

      //Back petition goes here
      axios
        .get("http://localhost:8081/professor/"+sessionStorage.Id+"/students/", {
          headers:{
            "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.Token,
          }
         
        })
        .then((response) => {
          let studentInfo=response.data.message.content;
          console.log(studentInfo);
          for (var i in studentInfo){
            this.$data.students.push({
              "id":studentInfo[i].id ,
              "name":studentInfo[i].name,
              "email":studentInfo[i].username+"@unal.edu.co",
              "age":22,
              "cedula":studentInfo[i].document_number,
            })
          }
          console.log(this.$data.students);
          for (var j in this.$data.students) {
            console.log(this.$data.students[j].name);
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
          console.log(err);
        });

      
    },
  },
};

//this.putStudentsinTable();
</script>

<style>
.container2{
  background-color: #e0e5eb;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
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
</style>
