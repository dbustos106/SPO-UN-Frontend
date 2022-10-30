<template>
  
  <div>
    <head>
    
  </head>
  <body>
    <div>
      <!--
      <transition name="fade">
        <div class="modal-overlay" v-if="showModal"></div>
      </transition>
      <transition name="fade">
        <div class="modal" v-if="showModal">
          <label>
            ¿Desea reservar esta cita?
          </label>
          <button class="modalButton">
            Si
          </button>
          <button class="modalButton">
            No
          </button>
        </div>
      </transition>-->
    </div>
    
    <div id="ProcedureSearchCalendarContainer" class="container">
      <div class="card login-card">
        <div class="row no-gutters">
          <p class="login-card-description mt-5 mx-auto mb-4">Citas</p>
          <div class="row">
            <label class="login-card-description" id="labelUp1">Citas disponibles en </label>
            <label class="login-card-description" id="labelUp3">verde</label>
          </div>
          
          <label class="login-card-description" id="labelUp2">Haga click sobre el horario deseado para reservar la cita</label>
          <div class="col-12 mx-auto">
            <div class="tableContainer">
              <div>
               <!--<modal id="modalAppontmentReserveWindow" ref="modalAppontmentReserveWindow" v-show="false"></modal>-->
              </div>
              <div class="col-12">
                <div class="row">
                  
                  <FullCalendar ref="procedureCalendar" id="patientProcedureCalendar" :options="calendarOptions" />
                </div>
                <div class="row" v-if="showModal">
                  <div class="row">
                    <label>
                      ¿Desea reservar esta cita?
                    </label>
                  </div>
                  <div class="row">
                    <div class="col-6">
                    <button id="makeReservation" class="modalButton" v-on:click="reserveAppointment()">
                      Si
                    </button>
                  </div>
                  <div class="col-6">
                    <button id="return" class="modalButton" v-on:click="showModal=false">
                      No
                    </button>
                  </div>
                  </div>
                </div>
                <div class="row">
                  <span class="col-12" id="AppointmetReserveSuccessMessage" v-if="showConfirmMessage">
                    <label>Cita reservada con éxito. Revise su cronograma</label>
                  </span>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
  </div>
  
  
</template>

<script>

import axios from "axios";
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


export default {
  name: "CalendarioEstudiante",
  components: { FullCalendar},
  data() {
    return {
      showModal:false,
      showConfirmMessage:false,
      selectedInitialDate: "",
      selectedEndDate:"",
      selectedAppointmentId:"",
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "timeGridWeek",
        allDaySlot: false,
        selectable: false,
        height: 650,
        slotMinTime: "06:00:00",
        slotMaxTime: "19:00:00",
        locale: 'es',
        eventTextColor: "black",
        //width: 700,
        events: [
          {title:"Cita 1", date: "2022-11-02T10:00:00", color:"green"}
        ],
        eventClick: function(info) {
          console.log("Click evento")
          console.log(info.event.title);
          this.$data.selectedInitialDate=info.event.start;
          this.$data.selectedEndDate=info.event.end;
          this.$data.selectedAppointmentId=info.event.title;
          console.log(this.$data.selectedAppointmentId);
          this.$data.showModal=true;
          //App.data.showModal=true;
          /*
          this.$FModal.show(
            { 
              component: FullCalendar 
            }, 
            { 
              msg: "Welcome to Your Vue.js App" 
            }
          )*/
          
          //this.$refs.modalAppontmentReserveWindow.$refs.modalAppointmentStartTime.innerHTML=info.event.start;
        }.bind(this)
      },
    };
  },
  methods: {
    reserveAppointment(){
      let reserveData = {
            start_time: this.$data.selectedInitialDate.toISOString().slice(0,19).replace("T"," "),
            end_time: this.$data.selectedEndDate.toISOString().slice(0,19).replace("T"," "),
        };
      let reserveDataBody = JSON.stringify(reserveData);
      console.log(reserveData);
      //console.log(sess)
      axios
        .put("http://localhost:8081/appointment/"+this.$data.selectedAppointmentId+"/confirmPatient/"+sessionStorage.Id, reserveDataBody ,{
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.AccessToken,
        },
      }).then((response) => {
        console.log(response);
        this.$data.showModal=false;
        this.$data.showConfirmMessage=true;
      });
    },

  }
};

//this.putStudentsinTable();
</script>

<style>
  #ProcedureSearchCalendarContainer {
    width: 100%;
    z-index: 19997;
  }

  #AppointmetReserveSuccessMessage {
    background-color: #73e600;
  }

  #labelUp1 {
    font-size: 1.3em;
    float: left;
  }

  #labelUp2 {
    font-size: 1.3em;
    float: left;
  }

  #labelUp3 {
    font-size: 1.3em;
    float: left;
    color: rgb(98, 228, 65);
  }

  .modal{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #FFF;
    padding: 20px;
    border-radius: 15px; 
    box-shadow: 3px 3px rgba(0, 0, 0, 0.4); 
    z-index: 19999;
  }

  .modal-overlay{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 19998;
    background: rgba(0, 0, 0, 0.4);
  }

  .modalButton{
    border:none;
    background: none;
    cursor: pointer;
    border-radius: 15px;

    display: block;
    padding: 10px 25px;
    font-size: 18px;
    font-weight: bold;
    z-index: 20000;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  }

  #makeReservation{
    background: rgb(147, 247, 80)
  }

  #return{
    background: rgb(255, 19, 19)
  }

  /*
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h3 {
    margin-top: 0;
    color: #42b983;
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
  }

  /*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }*/
</style>
