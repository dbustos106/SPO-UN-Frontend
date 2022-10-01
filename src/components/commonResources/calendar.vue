<template>
  <div>
    <FullCalendar ref="calendar" :options="calendarOptions" />
  </div>
</template>

<script>
import "@fullcalendar/core/vdom";
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  name: "CalendarioEstudiante",
  components: { FullCalendar },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialView: "dayGridMonth",
        selectable: true,
        height: 650,
        width: 700,
      },
    };
  },
  methods: {},
};
</script>

<style>
#closeSession {
  margin-left: 500px;
}
</style>
