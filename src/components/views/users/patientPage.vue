<template>
  <section class="sectionMarco userInit" :class="{ ing2: sideBarIsOpen == 1 }">
    <PatientBar :userEmail="email"></PatientBar>
    <!-- ======= Router view ======= -->
    <router-view></router-view>
    <!-- End Router view -->
  </section>
</template>

<script>
import PatientBar from "../../patient/PatientBar.vue";

export default {
  name: "PatientPage",

  data() {
    return {
      sideBarIsOpen: 1,
      email: sessionStorage.Email.substring(
        0,
        sessionStorage.Email.indexOf("@")
      ),
    };
  },
  components: {
    PatientBar,
  },
  methods: {
    moveContainer() {
      this.sideBarIsOpen = (this.sideBarIsOpen + 1) % 2;
    },
  },
  mounted() {
    var btnMenu = document.getElementById("btn");
    btnMenu.addEventListener("click", this.moveContainer);
  },
};
</script>
