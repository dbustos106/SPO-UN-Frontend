<template>
    <div class="row">
            <!-- ====== dataTentative ====== -->
        <div id="tentativeRoom" class="col-12 mx-auto" style="text-align: center">
            <h4 class="text mb-3">Horarios</h4>

            <!-- ======= tentativeTable ======= -->
            <div class="row mb-2">
                <div id="tentativeRoomDates">
                <table id="roomNewHours">
                    <thead>
                    <tr>
                        <td>Fecha inicio</td>
                        <td>Fecha final</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr></tr>
                    </tbody>
                </table>
                </div>
            </div>
            <!-- End tentativeTable -->

            <!-- ======= DatePicker ======= -->
            <div class="row mb-2">
                <div class="col-5">
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
                <div class="col-5">
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
                <div class="col-1">
                    <button class="btnGrisTq" v-on:click="addRoomHours()">^</button>
                </div>
            </div>
            <!-- End DatePicker -->
        </div>

        <!-- ====== btnCrear ====== -->
        <div class="row mx-auto">
        <button
            id="createAppointment"
            ref="createAppointment"
            class="btnBlue mx-auto"
            v-on:click="sendNewHours()"
        >
            Agregar Horarios
        </button>
        </div>
        </div>
        
    
</template>

<script>
import { ref } from "vue"
import datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  name: "roomHourEditor",
  components: {
    datepicker,
  },
  data(){
    return{
        startDate: ref(),
        endDate: ref(),
    }
  },
  methods:{
    addRoomHours(){
        if (
            this.$data.startDate != undefined &&
            this.$data.endDate != undefined &&
            new Date(this.$data.startDate).getTime() < new Date(this.$data.endDate).getTime()
        ) {
            var table = document.getElementById("roomNewHours");
            var row = table.insertRow();
            var cell1 = row.insertCell();
            var cell2 = row.insertCell();
            cell1.appendChild(document.createTextNode(this.$data.startDate));
            cell2.appendChild(document.createTextNode(this.$data.endDate));
        }
    },
    sendNewHours(){
        console.log("Sending new hours")
    }
  }
}

</script>

<style>
#hourRoomAppointment {
  align-items: center;
}

#tentativeRoom {
  background-color: #fff;
  padding: 30px;
  border-radius: 50px;
  box-shadow: 0 0 25px -15px rgba(0, 0, 0, 0.3);
  color: #000;
  font-size: 15px;
  font-weight: 400;
  margin: 0 0 50px;
  width: 1000px;
  height: 50%;
  align-items: center;
  text-align: center;
}



table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

#tentativeDates {
  overflow: auto;
  height: 250px;
  width: 470px;
}

</style>