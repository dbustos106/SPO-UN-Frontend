<template>
  <section class="sectionMarco userInit" :class="{ ing2: sideBarIsOpen == 1 }">
    <PatientBar ref="PatientBar"></PatientBar>
    <!-- ======= Router view ======= -->
    <router-view></router-view>
    <!-- End Router view -->
  </section>
</template>

<script>
import PatientBar from "../../patient/PatientBar.vue";

export default {
  name: "PatientPage",
  components: {
    PatientBar,
  },
  data() {
    return {
      sideBarIsOpen: 1,
    };
  },
  methods: {
    moveContainer() {
      this.sideBarIsOpen = (this.sideBarIsOpen + 1) % 2;
    },
  },
  mounted() {
    var btnMenu = document.getElementById("btn");
    btnMenu.addEventListener("click", this.moveContainer);
    this.$refs.PatientBar.$refs.patientUsername.innerHTML =
      sessionStorage.Username;
  },
};
</script>
