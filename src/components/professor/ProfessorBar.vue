<template>
  <div class="sidebar" :class="isOpened ? 'open' : ''" :style="cssVars">
    <div class="logo-details" style="margin: 6px 14px 0 14px">
      <img
        v-if="menuLogo"
        :src="menuLogo"
        alt="menu-logo"
        class="menu-logo icon"
      />
      <i v-else class="bx icon" :class="menuIcon" />
      <div class="logo_name">
        {{ menuTitle }}
      </div>
      <i
        class="bx"
        :class="isOpened ? 'bx-menu-alt-right' : 'bx-menu'"
        id="btn"
        @click="isOpened = !isOpened"
      />
    </div>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
        max-height: calc(100% - 60px);
      "
    >
      <div id="my-scroll" style="margin: 6px 14px 0 14px">
        <ul class="nav-list" id="list" style="overflow: visible">
          <span>
            <li>
              <a
                class="box-hover"
                id="listItem1"
                v-on:click="openRegisterStudent()"
              >
                <i class="bx" :class="'bx-grid-alt' || 'bx-square-rounded'" />
                <span class="links_name">Registrar Estudiantes</span>
              </a>
              <span class="tooltip">
                menuItem.tooltip || Registrar Estudiantes
              </span>
              <a
                class="box-hover"
                id="listItem2"
                v-on:click="openStudentTable()"
              >
                <i class="bx" :class="'bx-task' || 'bx-square-rounded'" />
                <span class="links_name">Ver Estudiantes</span>
              </a>
              <span class="tooltip"> menuItem.tooltip || Ver Estudiantes </span>
              <a
                class="box-hover"
                id="listItem2"
                v-on:click="openProfessorCalendar()"
              >
                <i class="bx" :class="'bx-task' || 'bx-square-rounded'" />
                <span class="links_name">Ver Cronograma</span>
              </a>
              <span class="tooltip"> menuItem.tooltip || Ver Cronograma </span>
              <a
                class="box-hover"
                id="listItem2"
                v-on:click="openProfessorSetting()"
              >
                <i class="bx" :class="'bx-cog' || 'bx-square-rounded'" />
                <span class="links_name">Ajustes</span>
              </a>
              <span class="tooltip"> menuItem.tooltip || Ajustes </span>
            </li>
          </span>
        </ul>
        <div class="profile" id="profile">
          <div class="profile-details">
            <i class="bx bx-user-circle"></i>
            <div class="name">
              <div
                class="name"
                id="professorUsername"
                ref="professorUsername"
              ></div>
            </div>
          </div>
          <i
            id="log_out"
            class="bx bx-log-out"
            v-on:click="closeSessionProfesor()"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfessorBar",
  props: {
    usernameContainer: {
      type: String,
      required: true,
      default: "",
    },
    isMenuOpen: {
      type: Boolean,
      default: true,
    },
    menuTitle: {
      type: String,
      default: "SPO UN",
    },
    menuLogo: {
      type: String,
      default: require("../../assets/img/login.jpg"),
    },
    menuIcon: {
      type: String,
      default: require("../../assets/img/login.jpg"),
    },
    isPaddingLeft: {
      type: Boolean,
      default: true,
    },
    menuOpenedPaddingLeftBody: {
      type: String,
      default: "250px",
    },
    menuClosedPaddingLeftBody: {
      type: String,
      default: "78px",
    },
    //! Menu items
    menuItems: {
      type: Array,
      default: () => [
        {
          link: "/RegistroEstudiantes",
          name: "Registrar Esudiantes",
          tooltip: "Registro Estudiantes",
          icon: "bx-grid-alt",
          onClick: function () {
            this.$refs.ProfesorArea.open();
          },
        },
        {
          link: "/VerEstudiantes",
          name: "Ver Estudiantes",
          tooltip: "Ver Estudiantes",
          icon: "bx-task",
        },
        {
          link: "/Ajustes",
          name: "Ajustes",
          tooltip: "Ajustes",
          icon: "bx-cog",
        },
      ],
    },
    //! Profile detailes
    profileImg: {
      type: String,
      default: require("../../assets/img/login.jpg"),
    },
    profileName: {
      type: String,
      default: "Fayzullo Saidakbarov",
    },
    profileRole: {
      type: String,
      default: "Frontend vue developer",
    },
    isExitButton: {
      type: Boolean,
      default: true,
    },
    //! Styles
    bgColor: {
      type: String,
      default: "#11101d",
    },
    secondaryColor: {
      type: String,
      default: "#11101d",
    },
    homeSectionColor: {
      type: String,
      default: "#e4e9f7",
    },
    logoTitleColor: {
      type: String,
      default: "#fff",
    },
    iconsColor: {
      type: String,
      default: "#fff",
    },
    itemsTooltipColor: {
      type: String,
      default: "#e4e9f7",
    },
    searchInputTextColor: {
      type: String,
      default: "#fff",
    },
    menuItemsHoverColor: {
      type: String,
      default: "#fff",
    },
    menuItemsTextColor: {
      type: String,
      default: "#fff",
    },
    menuFooterTextColor: {
      type: String,
      default: "#fff",
    },
  },
  data() {
    return {
      isOpened: false,
    };
  },
  methods: {
    openRegisterStudent() {
      this.$router.push("/professor/registerStudent");
    },
    openStudentTable() {
      this.$router.push("/professor/studentTable");
    },
    openProfessorCalendar() {
      this.$router.push("/professor/professorCalendar");
    },
    openProfessorSetting() {
      this.$router.push("/professor/professorSetting");
    },
    closeSessionProfesor() {
      sessionStorage.removeItem("AccessToken");
      sessionStorage.removeItem("RefreshToken");
      this.$router.push("/home");
    },
  },
  computed: {
    cssVars() {
      return {
        "--bg-color": this.bgColor,
        "--secondary-color": this.secondaryColor,
        "--home-section-color": this.homeSectionColor,
        "--logo-title-color": this.logoTitleColor,
        "--icons-color": this.iconsColor,
        "--items-tooltip-color": this.itemsTooltipColor,
        "--serach-input-text-color": this.searchInputTextColor,
        "--menu-items-hover-color": this.menuItemsHoverColor,
        "--menu-items-text-color": this.menuItemsTextColor,
        "--menu-footer-text-color": this.menuFooterTextColor,
      };
    },
  },
  mounted() {
    this.isOpened = this.isMenuOpen;
    this.$refs.professorUsername.innerHTML = this.usernameContainer;
  },
};
</script>

<style scoped>
#list {
  padding-left: 0px;
}
</style>
