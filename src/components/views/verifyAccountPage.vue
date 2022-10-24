<template>
  <section id="verifyAccount">
    <!-- ======= Hero Section ======= -->
    <section id="hero" class="d-flex align-items-center justify-content-center">
      <div class="container position-relative">
        <h1>Bienvenido a Spo-UN</h1>
        <h2>Su cuenta ha sido verificada con exito!</h2>
        <router-link class="btn-login scrollto" to="/login">Login</router-link>
      </div>
    </section>
    <!-- End Hero -->
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "verifyAccountPage",
  data() {
    return {
      typeUser: null,
      code: null,
    };
  },
  mounted() {
    let typeUser = this.$route.params.user;
    let code = this.$route.params.code;
    axios
      .put(
        "http://localhost:8081/register/verifyAccount/" +
          typeUser +
          "?code=" +
          code,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Authorization: "Bearer e",
          },
        }
      )
      .then((response) => {
        console.log("Verification complete");
        console.log(response);
        this.errorFunction("Registro Exitoso");
      })
      .catch((err) => {
        console.log("Falló registro");
        console.log(err);
      });
  },
};
</script>

<style scoped>
/*--------------------------------------------------------------
# General
--------------------------------------------------------------*/
#verifyAccount {
  font-family: "Open Sans", sans-serif;
  color: #d3d35b;
}

/*--------------------------------------------------------------
# Hero Section
--------------------------------------------------------------*/
#hero {
  width: 100%;
  height: 100vh;
  background: url("../../assets/img/panoramicaUnal.jpg") top center;
  background-size: cover;
  position: relative;
}

#hero:before {
  content: "";
  background: rgba(45, 53, 69, 0.7);
  position: absolute;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
}

#hero .container {
  text-align: center;
  padding-top: 50px;
}

@media (max-width: 992px) {
  #hero .container {
    padding-top: 0;
  }
}

#hero h1 {
  margin: 0;
  font-size: 48px;
  font-weight: 700;
  line-height: 56px;
  color: #fff;
}

#hero h2 {
  color: #eee;
  margin: 15px 0 0 0;
  font-size: 22px;
}

#hero .btn-sign-up {
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 9px 35px;
  border-radius: 50px;
  transition: 0.5s;
  margin-top: 40px;
  margin-right: 4px;
  border: 2px solid #ffc107;
  color: #fff;
}

#hero .btn-sign-up:hover {
  background: #ffc107;
}

#hero .btn-login {
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 1px;
  display: inline-block;
  padding: 9px 35px;
  border-radius: 50px;
  transition: 0.5s;
  margin-top: 40px;
  margin-left: 4px;
  border: 2px solid #ffc107;
  color: #fff;
}

#hero .btn-login:hover {
  background: #ffc107;
}

@media (min-width: 1024px) {
  #hero {
    background-attachment: fixed;
  }
}

@media (max-width: 768px) {
  #hero {
    height: 100vh;
  }

  #hero h1 {
    font-size: 28px;
    line-height: 36px;
  }

  #hero h2 {
    font-size: 18px;
    line-height: 24px;
  }
}
</style>
