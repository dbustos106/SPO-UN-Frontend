<template>
  <head>
    
  </head>
  <body>
    <div class="tableContainer">
      <div>
        <!--<modalWindow></modalWindow>-->
      </div>
    <div class="col-12">
      <div class="row">
        <FullCalendar ref="patientProcedureCalendar" id="patientProcedureCalendar" :options="calendarOptions" />
        
      </div>
    </div>
  </div>
  </body>
  
</template>

<script>

import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

//import modalWindow from "./modalWindow.vue";
export default {
  name: "CalendarioEstudiante",
  components: { FullCalendar},
  data() {
    return {
      showModal: false,
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "timeGridWeek",
        allDaySlot: false,
        selectable: false,
        height: 650,
        slotMinTime: "06:00:00",
        slotMaxTime: "19:00:00",
        locale: 'es',
        //width: 700,
        events: [
        {title:"Cita 1", date: "2022-11-02T10:00:00", color:"green"}
        ],
        eventClick: function(info) {
          console.log("Click evento")
          console.log(info.event.start);
          console.log(info.event.end);
          this.showModal = true;
          console.log(this);
        }
      },
    };
  },
  methods: {
  },
};

//this.putStudentsinTable();
</script>

<style>
.tableContainer{
  min-height: 100vh;
  margin-left: 100px;
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
 */

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
}
</style>
