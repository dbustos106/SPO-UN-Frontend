<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <img src="" width="150" height="150">
           <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Usuario"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Contraseña"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">Ingresar</button>
        </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.auth-page {
    height: 100vh;
    padding: 0;
    margin: 0;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: center;
  	margin-bottom: 30px
}
</style>