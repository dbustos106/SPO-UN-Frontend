<template>
  <div>
    <div class="form-container" style="text-align: center">
      <h4>Información de la cita</h4>
      <div class="form-horizontal">
        <div class="form-group">
          <span>Describa el tipo de procedimiento a realizar:</span>
          <textarea
            class="textarea"
            rows="4"
            cols="40"
            id="description"
          ></textarea>
        </div>
        <div class="form-group">
          <label>Consultorio</label>
          <select class="form-control text-center" id="roomSelect">
          </select>
        </div>
        <button class="btn signup" v-on:click="crearCita">Crear cita</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "createAppointment",
  mounted() {
    console.log("Component has been created!");
    this.createOptions();
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    /*register() {
      
      var edad = document.getElementById("ageR").value;
      var RH = document.getElementById("RHR").value;
      console.log(name);
      if (
        name == "" ||
        lastName == "" ||
        email == "" ||
        password == "" ||
        confirmPassword == "" ||
        cedula == "" ||
        genero == "" ||
        edad == "" ||
        RH == ""
      ) {
        console.log("No se han puesto datos");
        this.errorFunction("Faltan datos por llenar");
      } else {
        if (password !== confirmPassword) {
          console.log("Constraseñas son diferentes");
          this.errorFunction("Las contraseñas no coinciden");
        } else {
          this.sendData(
            name,
            lastName,
            email,
            password,
            cedula,
            tipoCedula,
            genero,
            edad,
            RH
          );
          console.log("Enviar Datos");
        }
      }
    },
    async sendData(
      name,
      lastName,
      email,
      password,
      cedula,
      tipoCedula,
      genero,
      edad,
      RH
    ) {
      var user = email.substring(0, email.indexOf("@"));
      let datos = {
        username: user,
        password: password,
        name: name + " " + lastName,
        email: email,
        document_type: "cc",
        document_number: cedula,
        age: parseInt(edad),
        gender: genero,
        blood_type: RH,
      };

      let formBody = JSON.stringify(datos);
      console.log(formBody);

      axios
        .post(
          "http://localhost:8081/appointment/save",

          formBody,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              //"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
              "Content-Type": "application/json",
              Authorization: "Bearer e",
            },
          }
        )
        .then((response) => {
          console.log("Cita creada");
          console.log(response);
        })
        .catch((err) => {
          console.log("Fallo creación");
          console.log(err);
        });
    },*/
    createOptions() {
      let tablaRoom = document.getElementById('roomSelect');
      axios
        .get("http://localhost:8081/room/all", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.Token,
          },
        })
        .then((response) => {
          let roomInfo = response.data.message;
          for (var i in roomInfo) {
            let newOption = document.createElement("option");
            newOption.value = roomInfo[i].roomDTO.id;
            newOption.innerHTML = roomInfo[i].buildingDTO.name + " " + roomInfo[i].roomDTO.name;
            tablaRoom.append(newOption);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    closecreateAppointment() {
      this.$root.$refs.EstudianteArea.$data.createAppointmentShow = false;
    },
  },
};
</script>
<style>
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
  width: 160px;
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
