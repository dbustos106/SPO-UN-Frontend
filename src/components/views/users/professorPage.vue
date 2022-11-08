<template>
  <section class="sectionMarco userInit" :class="{ ing2: sideBarIsOpen == 1 }">
    <ProfessorBar ref="ProfessorBar"></ProfessorBar>
    <!-- ======= Router view ======= -->
    <router-view></router-view>
    <!-- End Router view -->
  </section>
</template>

<script>
import ProfessorBar from "../../professor/ProfessorBar.vue";

export default {
  name: "ProfessorPage",
  components: {
    ProfessorBar,
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
    this.$refs.ProfessorBar.$refs.professorUsername.innerHTML =
      sessionStorage.Username;
  },
};
</script>
