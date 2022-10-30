<template>
  <div>
    <PatientBar ref="PatientBar"></PatientBar>

    <section
      id="patientSection"
      class="container"
      :class="{ ing2: sideBarIsOpen == 1 }"
    >
      <!-- ======= Router view ======= -->
      <router-view></router-view>
      <!-- End Router view -->
    </section>
  </div>
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

<style>
#patientSection {
  max-width: 100vw;
  height: 180vh;
  background: url("../../../assets/img/panoramicaUnal.jpg") top center;
  background-size: cover;
  position: absolute;
}

#patientSection:before {
  content: "";
  background: rgba(45, 53, 69, 0.7);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

.ing2 {
  animation: aumWidth 0.7s forwards;
}

@keyframes aumWidth {
  0% {
    margin-left: 0px;
  }
  100% {
    margin-left: 100px;
  }
}
</style>
