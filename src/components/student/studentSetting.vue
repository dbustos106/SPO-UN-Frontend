<template>
  <div class="container marco">
    <div class="card mt-5 mb-3">
      <h2 class="card-description mt-5 mb-3">Datos</h2>
      <div class="form-group needs-validation">
        <div class="row mx-auto">
          <div class="col-sm-5 ml-auto">
            <span>Nombre</span>
            <input
              class="form-control"
              type="text"
              name="name"
              placeholder="Nombre"
              id="nptName"
              required
            />
          </div>
          <div class="col-sm-5 mr-auto">
            <span>Apellido</span>
            <input
              class="form-control"
              type="text"
              name="lastName"
              placeholder="Apellido"
              id="nptLastName"
              required
            />
          </div>
        </div>

        <div class="row mx-auto">
          <div class="col-md-5 ml-auto">
            <span>Tipo de documento</span>
            <select class="form-select mx-auto" required id="sclDocumentType">
              <option selected disabled value="">Tipo de documento</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="TI">Tarjeta de Identidad</option>
              <option value="CE">Cédula Extranjera</option>
              <option value="TE">Tarjeta Extranjera</option>
            </select>
          </div>
          <div class="col-md-5 mr-auto">
            <span>Número de documento</span>
            <input
              class="form-control"
              type="number"
              id="nptDocumentNumber"
              min="1"
              pattern="^[0-9]+"
              onpaste="return false;"
              onDrop="return false;"
              autocomplete="off"
              name="ID"
              placeholder="Número de documento"
              required
            />
          </div>
        </div>

        <div class="row mx-auto">
          <div class="col-sm-10 mx-auto">
            <span>Correo</span>
            <input
              class="form-control"
              type="email"
              id="nptEmail"
              name="email"
              placeholder="Correo electrónico"
              required
            />
          </div>
        </div>

        <div class="row mx-auto">
          <div class="col-4 mx-auto mb-2 mt-2">
            <section v-show="errorShow">
              <div class="alertBar error">
                <span title="error" class="alertBar-message">
                  <em class="fa fa-exclamation-circle"></em>
                  <span id="errorNotification"></span>
                </span>
                <span class="alertBar-dismiss">
                  <a class="cta"></a>
                </span>
              </div>
            </section>
            <section v-show="successShow">
              <div class="success_green">
                <span title="success" class="alertBar-message">
                  <em class="fa fa-exclamation-circle"></em>
                  <span id="successNotification"></span>
                </span>
                <span class="alertBar-dismiss">
                  <a class="cta"></a>
                </span>
              </div>
            </section>
          </div>
        </div>

        <div class="row mx-auto">
          <div class="col-4 mx-auto mb-4">
            <button class="btn btn-block mx-auto mb-3" v-on:click="update">
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import App from "../../App.vue";

export default {
  name: "studentSettingPage",

  data() {
    return {
      errorShow: false,
      successShow: false,
    };
  },
  methods: {
    loadData() {
      axios
        .get(App.methods.getBackUrl() + "/student/" + sessionStorage.Id, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
          },
        })
        .then((response) => {
          let student = response.data.message;
          document.getElementById("nptName").value = student.name;
          document.getElementById("nptLastName").value = student.last_name;
          document.getElementById("nptEmail").value = student.email;
          document.getElementById("sclDocumentType").value =
            student.document_type;
          document.getElementById("nptDocumentNumber").value =
            student.document_number;
        })
        .catch((err) => {
          if (err.response.status == 403) {
            if (App.methods.requestRefreshToken()) {
              this.loadData();
            } else {
              this.$router.push("/login");
            }
          }
        });
    },
    update() {
      var name = document.getElementById("nptName").value;
      var lastName = document.getElementById("nptLastName").value;
      var email = document.getElementById("nptEmail").value;
      var documentType = document.getElementById("sclDocumentType").value;
      var documentNumber = document.getElementById("nptDocumentNumber").value;
      if (name == "" || lastName == "" || email == "" || documentNumber == "") {
        this.errorFunction("Faltan datos por llenar");
      } else {
        let datos = {
          id: sessionStorage.Id,
          email: email,
          name: name,
          last_name: lastName,
          document_type: documentType,
          document_number: documentNumber,
          professor_id: parseInt(sessionStorage.Id),
        };
        let formBody = JSON.stringify(datos);

        axios
          .put(App.methods.getBackUrl() + "/student/edit", formBody, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          })
          .then(() => {
            this.successFunction("Guardado Exitoso");
          })
          .catch((err) => {
            this.errorFunction("Error, correo o documento ya registrado");
            if (err.response.status == 403) {
              if (App.methods.requestRefreshToken()) {
                this.update();
              } else {
                this.$router.push("/login");
              }
            }
          });
      }
    },
    successFunction(messageText) {
      this.$data.errorShow = false;
      this.$data.successShow = true;
      let errorDiv = document.getElementById("successNotification");
      errorDiv.textContent = messageText;
      setTimeout(() => {
        this.$data.successShow = false;
      }, 5000);
    },
    errorFunction(messageText) {
      this.$data.errorShow = true;
      this.$data.successShow = false;
      let errorDiv = document.getElementById("errorNotification");
      errorDiv.textContent = messageText;
      setTimeout(() => {
        this.$data.errorShow = false;
      }, 5000);
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
