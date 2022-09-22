<template>
  <div>
    <button
      for="registryStudent"
      v-on:click="openRegistry"
      id="registryStudentButton"
    >
      Registrar Estudiante
    </button>
    <registroEstudiante ref="registry" v-show="registryStudentShow" />
  </div>
</template>

<script>
import registroEstudiante from "./registroEstudiante.vue";
export default {
  name: "Area_Profesor",
  components: {
    registroEstudiante,
  },
  data() {
    return {
      registryStudentShow: false,
    };
  },
  methods: {
    openRegistry() {
      this.$data.registryStudentShow = true;
    },
  },
};
</script>

<style></style>
