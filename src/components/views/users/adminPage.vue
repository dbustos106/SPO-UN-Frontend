<template>
  <div>
    <AdminBar></AdminBar>

  <section
    id="adminSection"
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
import AdminBar from "../../admin/AdminBar.vue";

export default {
  name: "AdminPage",
  components: {
    AdminBar,
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
  },
};
</script>

<style>
#adminSection {
  max-width: 100vw;
  height: 101vh;
  background: url("../../../assets/img/panoramicaUnal.jpg") top center;
  background-size: cover;
  position: absolute;
}

#adminSection:before {
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
  color: #ffc107;
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
