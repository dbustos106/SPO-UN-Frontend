<template>
  <div>
    <img
      src="Logo-unal.png"
      alt="Universidad Nacional de Colombia"
      width="”500″"
      height="”600″"
    />
    <h1>Sistema de Practicas Odontológicas SPO-UN</h1>
  </div>
  <login ref="loginPage" v-show="loginShow" />
  <registro ref="registry" v-show="registryShow" />
</template>

<script>
//import { ref } from "vue";
//import Vue from "vue";
import registro from "./components/registroEstudiante.vue";
import login from "./components/login.vue";

export default {
  name: "SPO-UN",
  components: { registro, login },
  mounted() {
    //this.$refs.loginPage.registerButton;
    console.log(this.$refs.loginPage);
  },
  data() {
    return {
      loginShow: true,
      registryShow: false,
    };
  },
  methods: {},
};
</script>

<style>
.center {
  margin: auto;
  width: 60%;
  border: 3px solid #315203;
  padding: 10px;
}
.input_label {
  margin-left: 50px;
}
.namef {
  margin-left: 0px;
}
#namel {
  margin-left: 0px;
}
.lname {
  margin-left: 0px;
}
#acceptButton {
  margin-left: 110px;
}
.margin-down {
  margin-top: 0px;
}
</style>
