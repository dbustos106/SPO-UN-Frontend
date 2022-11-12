<template>
  <section class="sectionMarco userInit" :class="{ ing2: sideBarIsOpen == 1 }">
    <ProfessorBar :usernameContainer="username"></ProfessorBar>
    <!-- ======= Router view ======= -->
    <router-view></router-view>
    <!-- End Router view -->
  </section>
</template>

<script>
import ProfessorBar from "../../professor/ProfessorBar.vue";

export default {
  name: "ProfessorPage",

  data() {
    return {
      sideBarIsOpen: 1,
      username: sessionStorage.Username,
    };
  },
  components: {
    ProfessorBar,
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
