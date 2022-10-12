<template>
        <!-- Container de crear cita -->
        <div class="form-container" style="text-align: center">
        <h4>Información de la cita</h4>
        <div class="form-horizontal">
          <litepie-datepicker v-model="dateValue"></litepie-datepicker>
          <div class="form-group">
            <label> P2</label>
          </div>
          <div class="form-group">
            <span>Describa el tipo de procedimiento a realizar:</span>
            <textarea class="textarea" rows="4" cols="40"></textarea>
          </div>
          <div class="form-group">
            <label>Consultorio</label>
            <select class="form-control text-center">
              <option value="101">101</option>
              <option value="102">102</option>
              <option value="103">103</option>
              <option value="104">104</option>
            </select>
          </div>
          <button class="btn signup">Crear cita</button>
        </div>
      </div>
</template>