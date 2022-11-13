<template>
  <section class="sectionMarco userInit" :class="{ ing2: sideBarIsOpen == 1 }">
    <StudentBar :usernameContainer="username"></StudentBar>
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
      username: sessionStorage.Username.substring(
        0,
        sessionStorage.Username.indexOf("@")
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
