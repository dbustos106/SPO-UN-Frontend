<template>
  <!-- ======= Header ======= -->
  <header
    id="header"
    class="fixed-top header-transparent"
    :class="{ ing: scrollPosition > 10 }"
  >
    <div
      id="contHeader"
      class="container d-flex align-items-center justify-content-between"
    >
      <h1 id="logo" class="logo">Spo-Un</h1>
      <nav id="navbar" class="navbar">
        <ul>
          <router-link class="btn-sign-up scrollto" to="/home"
            >Inicio</router-link
          >
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>
    </div>
  </header>
  <!-- End Header -->

  <!-- ======= Router view ======= -->
  <router-view></router-view>
  <!-- End router view -->

  <!-- ======= Footer ======= -->
  <footer id="footer">
    <div class="footer-top">
      <div class="container">
        <div class="row">
          <div class="col-lg-6 col-md-2 footer-dir">
            <h3>Ubicación</h3>
            <p>
              Carrera 45 # 26-85 <br />
              Edif. Uriel Gutiérrez<br />
              Bogotá D.C., Colombia <br /><br />
            </p>
          </div>

          <div class="col-lg-5 col-md-2 footer-contact">
            <h3>Contacto</h3>
            <strong>Teléfono:</strong> +57 3195540137<br />
            <strong>Teléfono:</strong> (+57 1) 316 5000<br />
            <strong>Email:</strong> spoun.app@gmail.com<br />
          </div>
        </div>
      </div>
    </div>

    <div class="container d-md-flex py-4">
      <div class="me-md-auto text-center text-md-start">
        <div class="copyright">
          &copy; Copyright <strong><span>Spo-UN</span></strong
          >. All Rights Reserved. Designed by
          <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>
      </div>
    </div>
  </footer>
  <!-- End Footer -->
</template>

<script>
export default {
  name: "initPage",
  data() {
    return {
      scrollPosition: null,
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
};
</script>

<style>
/*--------------------------------------------------------------
# Header
--------------------------------------------------------------*/
#header {
  transition: all 0.5s;
  z-index: 997;
  padding: 20px 0;
  background: transparent;
  max-height: 80px;
}

.ing {
  animation: change_color 0.7s forwards;
  color: #ffc107;
}

@keyframes change_color {
  0% {
    background: transparent;
  }
  100% {
    background: rgba(34, 43, 62, 0.7);
  }
}

#header .logo {
  font-size: 28px;
  margin: 0;
  padding: 0;
  line-height: 1;
  font-weight: 600;
  letter-spacing: 2px;
  font-family: "Poppins", sans-serif;
}

#header .logo a {
  color: #fff;
}

#header .logo img {
  max-height: 40px;
}

#contHeader {
  max-width: 2000px;
  width: 90%;
  padding: 0;
}

/*--------------------------------------------------------------
# Navigation Menu
--------------------------------------------------------------*/
/**
* Desktop Navigation 
*/
.navbar {
  padding: 0;
}

.navbar ul {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  align-items: center;
}

.navbar li {
  position: relative;
}

.navbar a,
.navbar a:focus {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 10px 30px;
  color: #fff;
  font-size: 14px;
  white-space: nowrap;
  transition: 0.3s;
}

.navbar a i,
.navbar a:focus i {
  font-size: 12px;
  line-height: 0;
  margin-left: 5px;
}

.navbar a:hover,
.navbar .active,
.navbar .active:focus,
.navbar li:hover > a {
  color: #ffc107;
}

/**
* Mobile Navigation 
*/
.mobile-nav-toggle {
  color: #fff;
  font-size: 28px;
  cursor: pointer;
  display: none;
  line-height: 0;
  transition: 0.5s;
}

@media (max-width: 991px) {
  .mobile-nav-toggle {
    display: block;
  }

  .navbar ul {
    display: none;
  }
}

.navbar-mobile {
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(45, 53, 69, 0.9);
  transition: 0.3s;
  z-index: 999;
}

.navbar-mobile .mobile-nav-toggle {
  position: absolute;
  top: 15px;
  right: 15px;
}

.navbar-mobile ul {
  display: block;
  position: absolute;
  top: 55px;
  right: 15px;
  bottom: 15px;
  left: 15px;
  padding: 10px 0;
  background-color: #fff;
  overflow-y: auto;
  transition: 0.3s;
}

.navbar-mobile a,
.navbar-mobile a:focus {
  padding: 10px 20px;
  font-size: 15px;
  color: #414c64;
}

.navbar-mobile a:hover,
.navbar-mobile .active,
.navbar-mobile li:hover > a {
  color: #ffc107;
}

/*--------------------------------------------------------------
# Footer
--------------------------------------------------------------*/
#footer {
  color: #414c64;
  font-size: 14px;
  background: #f4f5f8;
}

#footer .footer-top {
  padding: 20px 0 0px 0;
  background: #fafafc;
  text-align: center;
}

#footer .footer-top .footer-dir {
  margin-bottom: 5px;
}

#footer .footer-top .footer-dir h4 {
  font-size: 22px;
  margin: 0 0 10px 0;
  padding: 2px 0 2px 0;
  line-height: 1;
  font-weight: 700;
}

#footer .footer-top .footer-dir p {
  font-size: 14px;
  line-height: 24px;
  margin-bottom: 0;
  font-family: "Raleway", sans-serif;
  color: #777777;
}

#footer .footer-top h4 {
  font-size: 16px;
  font-weight: bold;
  color: #444444;
  position: relative;
  padding-bottom: 12px;
}

#footer.footer-top.footer-contact {
  font-size: 14px;
  line-height: 10px;
  margin-bottom: 0;
  font-family: "Raleway", sans-serif;
  color: #777777;
}

#footer .footer-top .footer-contact h4 {
  font-size: 22px;
  margin: 0 0 10px 0;
  padding: 2px 0 2px 0;
  line-height: 1;
  font-weight: 700;
}
</style>
