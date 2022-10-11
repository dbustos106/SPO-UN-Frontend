<template>
  <div>
    <FullCalendar ref="calendar" id="calendar" :options="calendarOptions" />
  </div>
</template>

<script>
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
//import axios from "axios";

export default {
  name: "CalendarioEstudiante",
  components: { FullCalendar },
  data() {
    return {
      schedule: {
        1: {
          id: 1,
          nombrePaciente: "Viserys Targaryen",
          date: "2022-10-01T15:00:00",
        },
        2: {
          id: 2,
          nombrePaciente: "Walter White",
          date: "2022-10-17T08:00:00",
        },
        3: {
          id: 3,
          nombrePaciente: "James McGill",
          date: "2022-10-31T14:30:00",
        },
        4: {
          id: 4,
          nombrePaciente: "Tony Stark",
          date: "2022-11-11T17:30:00",
        },
        5: {
          id: 5,
          nombrePaciente: "Tony Stark",
          date: "2022-10-31T16:30:00",
        },
      },
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "dayGridMonth",
        selectable: true,
        height: 650,
        //width: 700,
        events: [
        ]
      },
      
    };
  },
  methods: {
    getStudentSchedule(){
      /*
      axios.get("http://localhost:8081/student/1/schedule",{
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
             Authorization: "Bearer " + sessionStorage.Token,
          }
      }).then((response) => {
        console.log(response);
      })
      .catch((err) => {
          console.log(err);
       });*/
       
      //Add events to calendar  
      for(var j in this.$data.schedule){
        this.calendarOptions.events = [
          ...this.calendarOptions.events,//Adds all the previous events
          {title:this.$data.schedule[j].nombrePaciente, date:this.$data.schedule[j].date}
        ]
      }  
    },
  },
};
</script>

<style>
  .calendar{
    width: 100%;
    height: 100%;
  }
</style>
