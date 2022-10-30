<template>
    <div>
        
        <head>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
            <!-- font awesome -->
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous">
        </head>
        <body>
        <section>
            <div id="ProcedureSearchContainer" class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="row">
                                <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                    <input class="form-control search-slt" required id="procedure-type" placeholder="Procedimiento" ref="procedureType"/>
                                </div>
                                <div class="col-lg-3 col-md-3 col-sm-12 p-0">
                                    <button type="button" class="btn btn-danger wrn-btn" v-on:click="this.searchProcedure()">Buscar</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <patientProcedureCalendar v-if="patientProcedureCalendarShow" ref="patientProcedureCalendar" ></patientProcedureCalendar>
                            
                        </div>
                        <span v-if="noAppointmentsShow" title="error" class="noAppointmensMessage" >
                            <i class="fa fa-exclamation-circle"></i>
                            <span id="noAppointmentsMessageSpan">No hay citas disponibles para lo especificado. Intente buscar más tarde</span>
                        </span>
                    </div>
            </div>
        </section>
        
        
        </body>
    </div>

</template>

<script>
    import axios from "axios";
    import patientProcedureCalendar from "./patientProcedureCalendar";
    import App from "../../App.vue";
    //import modalWindow from "./modalWindow.vue";
    //import { ModalSize } from "vue-bs-modal";
    export default{
        components:{
            patientProcedureCalendar
        },
        data() {
            return {
                patientProcedureCalendarShow : false,
                noAppointmentsShow: false,
            }
        },
        methods:{
            searchProcedure() {
                this.$data.patientProcedureCalendarShow = true;
                var procedureTypeSearch =this.$refs.procedureType.value;
                console.log(procedureTypeSearch)
                let datos2 = {
                    page: 0,
                    size: 10,
                };
                console.log(datos2);
                //let formBody2 = JSON.stringify(datos2);
                //let formBody2 = App.methods.toUrlEncoded(datos2);
                
                axios
                    .get("http://localhost:8081/appointment/allAvailable",{
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + sessionStorage.AccessToken,
                    },
                    })
                    .then((response) => {
                        console.log(response);
                        //let dateProve="";
                        let earliestDate="3000-12-31T11:59:59"
                        let appointmentsSearch = response.data.message;
                        let calendarApi = this.$refs.patientProcedureCalendar.$refs.procedureCalendar.getApi();
                        this.$refs.patientProcedureCalendar.calendarOptions.events = [];
                        for (var i in appointmentsSearch) {
                            console.log(appointmentsSearch[i].appointmentDTO.procedure_type)
                            if (App.methods.insensitiveCase(appointmentsSearch[i].appointmentDTO.procedure_type) == App.methods.insensitiveCase(procedureTypeSearch)) {
                                for(var j in appointmentsSearch[i].tentativeSchedules ){
                                    console.log(appointmentsSearch[i].tentativeSchedules[j])
                                    if(new Date(appointmentsSearch[i].tentativeSchedules[j].start_time).getTime()<new Date(earliestDate).getTime()){
                                        earliestDate=appointmentsSearch[i].tentativeSchedules[j].start_time;
                                    }
                                    //dateProve=appointmentsSearch[i].tentativeSchedules[j].start_time;
                                    this.$refs.patientProcedureCalendar.calendarOptions.events = [
                                        ...this.$refs.patientProcedureCalendar.calendarOptions.events, //Adds all the previous events
                                        {
                                            id: appointmentsSearch[i].tentativeSchedules[j].appointment_id,
                                            title: appointmentsSearch[i].tentativeSchedules[j].appointment_id,
                                            start: appointmentsSearch[i].tentativeSchedules[j].start_time.replace(" ","T"),
                                            end: appointmentsSearch[i].tentativeSchedules[j].end_time.replace(" ","T"),
                                            start_time:appointmentsSearch[i].tentativeSchedules[j].start_time.replace(" ","T"),
                                            end_time:appointmentsSearch[i].tentativeSchedules[j].end_time.replace(" ","T"),
                                            color: "#73e600",
                                        },
                                    ]
                                }
                                calendarApi.gotoDate(earliestDate); //Go to min date
                                
                                
                            }
                        }
                        //calendarApi.getEventById(dateProve).remove();
                        if(this.$refs.patientProcedureCalendar.calendarOptions.events.length==0){
                            //No appointments
                            this.$data.patientProcedureCalendarShow = false;
                            this.$data.noAppointmentsShow = true;
                        }else{
                            //There are appoitnments available
                            window.scroll({ //Scroll down to the calendar
                                top: 170,
                                left: 0,
                                behavior: 'smooth'
                            });
                            this.$data.noAppointmentsShow = false;
                            this.$data.patientProcedureCalendarShow = true;
                        }
                    
                }).catch((error) => {
                    console.log(error);
                });
                /*
                this.$vbsModal
                    .open({
                        // pass your component as the whole modal content
                        // you can also use the component's registered name
                        content: modalWindow,
                        size: ModalSize.LARGE,
                        // pass custom data as props to the EditProfileComponent.
                        contentProps: {
                        email: "example@example.com",
                        username: "yellowbean",
                        },
                        // pass event listeners to the EditProfileComponent.
                        contentEmits: {
                        onSubmit: this.onSubmitProfileForm
                        },
                        center: true, // default is false
                        backgroundScrolling: true, // default is false
                        staticBackdrop: true, // will disable backdrop click to close modal if true
                    });*/
            },
        }
    }
</script>

<style>
    #ProcedureSearchContainer {
        width: 70%;
    }
    .searchContainer {
        align-items: center;
        min-height: 100vh;
        margin-left: 100px;
    }
    .search-sec{
        padding: 2rem;
    }
    .search-slt{
        display: block;
        width: 100%;
        font-size: 0.875rem;
        line-height: 1.5;
        background-color: #fff;
        border: 1px solid #ccc;
        height: calc(3rem + 2px) !important;
        border-radius:0;
    }
    .wrn-btn{
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        text-transform: capitalize;
        height: calc(3rem + 2px) !important;
        border-radius:0;
    }
    .noAppointmensMessage{
        background-color: rgb(248, 61, 61);
        z-index: 1000;
    }
</style>