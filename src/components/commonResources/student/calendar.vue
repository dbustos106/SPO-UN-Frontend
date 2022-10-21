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
import axios from "axios";

export default {
  name: "CalendarioEstudiante",
  components: { FullCalendar },
  data() {
    return {
      schedule: [],
      unconfirmedSchedule:[],
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
      console.log("Help");
              
      //Get confirmed appointments
      axios.get("http://localhost:8081/student/"+sessionStorage.Id+"/schedule",{
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
             Authorization: "Bearer " + sessionStorage.Token,
          }
      }).then((response) => {
        console.log(response);
        
        let appointments=response.data.message;

        for(var i in appointments){
          console.log(appointments[i]);
          
          var appointmentTime=appointments[i].start_time.replace(" ","T");
          console.log(appointmentTime);
          
          this.$data.schedule.push({
            "nombrePaciente":"Cita 1",
            "date":appointmentTime,
          });
          
          this.calendarOptions.events = [
            ...this.calendarOptions.events,//Adds all the previous events
            {title:"Cita 1", date:appointmentTime, color:"green"}
          ]
        }
        
      })
      .catch((err) => {
          console.log(err);
       });
       
       //Get unconfirmed appointments
      axios.get("http://localhost:8081/student/"+sessionStorage.Id+"/unconfirmedSchedule",{
        headers:{
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
             Authorization: "Bearer " + sessionStorage.Token,
          }
      }).then((response) => {
          console.log(response);
          
          let unconfirmedAppointments=response.data.message;
          for(var i in unconfirmedAppointments){
            console.log(unconfirmedAppointments[i]);
            var unAppointmentTime=unconfirmedAppointments[i].start_time.replace(" ","T")
            console.log(unAppointmentTime);
            this.$data.unconfirmedSchedule.push({
              "nombrePaciente":"Cita "+unconfirmedAppointments[i].appointment_id,
              "date":unAppointmentTime,
            });
          }
          
          //Add events to calendar  
          for(var j in this.$data.unconfirmedSchedule){
            this.calendarOptions.events = [
              ...this.calendarOptions.events,//Adds all the previous events
              {title:this.$data.unconfirmedSchedule[j].nombrePaciente, date:this.$data.unconfirmedSchedule[j].date, color:"yellow"}
            ]
          }  
      }).catch((err) => {
          console.log(err);
       });
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
