<template>
  <section class="sectionMarco userInit" :class="{ ing2: sideBarIsOpen == 1 }">
    <AdminBar :userEmail="email"></AdminBar>
    <!-- ======= Router view ======= -->
    <router-view></router-view>
    <!-- End Router view -->
  </section>
</template>

<script>
import AdminBar from "../../admin/AdminBar.vue";

export default {
  name: "AdminPage",

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
    AdminBar,
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
