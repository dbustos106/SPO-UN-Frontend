<template>
  <section class="sectionMarco userInit" :class="{ ing2: sideBarIsOpen == 1 }">
    <StudentBar :userEmail="email"></StudentBar>
    <!-- ======= Router view ======= -->
    <router-view></router-view>
    <!-- End Router view -->
  </section>
</template>

<script>
import StudentBar from "../../student/StudentBar.vue";

export default {
  name: "studentPage",

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
    StudentBar,
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
