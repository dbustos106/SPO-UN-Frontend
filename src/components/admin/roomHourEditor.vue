<template>
  <div class="container marco-modal">
    <h2 class="mb-4">Crear Horario</h2>

    <!-- ======= DatePicker ======= -->
    <div class="container mx-auto mt-1 mb-3">
      <div class="col-sm-5">
        <datepicker
          ref="datepicker1"
          v-model="startDate"
          name="startTime"
          showNowButton
          :minDate="new Date()"
          modelType="yyyy-MM-dd HH:mm:ss"
          placeholder="Fecha de inicio"
        >
        </datepicker>
      </div>
      <div class="col-sm-5">
        <datepicker
          v-model="endDate"
          name="endTime"
          showNowButton
          :minDate="new Date()"
          modelType="yyyy-MM-dd HH:mm:ss"
          placeholder="Fecha de fin"
        >
        </datepicker>
      </div>
    </div>
    <!-- End DatePicker -->

    <!-- ====== MessageShow ====== -->
    <div class="row mx-auto">
      <section v-show="errorShow">
        <div class="alertBar error">
          <span title="error" class="alertBar-message">
            <i class="fa fa-exclamation-circle"></i>
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
            <i class="fa fa-exclamation-circle"></i>
            <span id="successNotification"></span>
          </span>
          <span class="alertBar-dismiss">
            <a class="cta"></a>
          </span>
        </div>
      </section>
    </div>
    <!-- End MessageShow -->

    <!-- ====== btnCrear ====== -->
    <div class="row mx-auto">
      <button class="btnBlue mx-auto" v-on:click="sendSchedule">Crear</button>
    </div>
    <div class="row mx-auto">
      <button class="btnGris mx-auto" v-on:click="closeWindow">Cerrar</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import axios from "axios";
import App from "../../App.vue";

export default {
  name: "roomHourEditor",

  data() {
    return {
      startDate: ref(),
      endDate: ref(),
      errorShow: false,
      successShow: false,
    };
  },
  components: {
    datepicker,
  },
  props: {
    idRoom: {
      type: Number,
      required: true,
      default: -1,
    },
  },
  emits: {
    close: null,
  },
  methods: {
    sendSchedule() {
      if (
        this.startDate != undefined &&
        this.endDate != undefined &&
        new Date(this.startDate).getTime() < new Date(this.endDate).getTime()
      ) {
        let newSchedule = {
          start_time: this.startDate,
          end_time: this.endDate,
          room_id: this.idRoom,
        };
        let formScheduleBody = JSON.stringify(newSchedule);

        axios
          .post(App.methods.getBackUrl() + "/schedule/save", formScheduleBody, {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
              Authorization: "Bearer " + sessionStorage.AccessToken,
            },
          })
          .then(() => {
            this.successFunction("Horario creado con éxito");
          })
          .catch((err) => {
            if (err.response.status == 403) {
              if (App.methods.requestRefreshToken()) {
                this.sendSchedule();
              } else {
                this.$router.push("/login");
              }
            }
          });
      } else if (
        new Date(this.startDate).getTime() > new Date(this.endDate).getTime()
      ) {
        this.errorFunction(
          "Fecha inicial seleccionada es mayor a la fecha final seleccionada"
        );
      } else {
        this.errorFunction("Seleccione el horario de inicio y horario de fin");
      }
    },
    closeWindow() {
      this.$emit("close");
    },
    successFunction(messageText) {
      this.$data.errorShow = false;
      this.$data.successShow = true;
      let errorDiv = document.getElementById("successNotification");
      errorDiv.innerHTML = messageText;
      setTimeout(() => {
        this.$data.successShow = false;
      }, 5000);
    },
    errorFunction(messageText) {
      this.$data.errorShow = true;
      this.$data.successShow = false;
      let errorDiv = document.getElementById("errorNotification");
      errorDiv.innerHTML = messageText;
      setTimeout(() => {
        this.$data.errorShow = false;
      }, 5000);
    },
  },
};
</script>
