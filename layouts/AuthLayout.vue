<template>
  <div :class="layoutClass" class="auth-layout">
    <base-nav
      v-model="showMenu"
      type="light"
      :transparent="true"
      menu-classes="justify-content-end"
      class="navbar-horizontal navbar-main"
      expand="lg"
    >
      <div slot="brand" class="navbar-wrapper">
        <nuxt-link class="navbar-brand" to="/">
          <img :style="img" src="img/brand/logo.png" alt="Provendor" />
        </nuxt-link>
      </div>

      <template>
        <div class="navbar-collapse-header">
          <div class="row">
            <div class="col-6 collapse-brand">
              <nuxt-link to="/">
                <img src="img/brand/logo.png" alt="Logo blue" />
              </nuxt-link>
            </div>
            <div class="col-6 collapse-close">
              <button
                type="button"
                class="navbar-toggler"
                @click="showMenu = false"
              >
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <nuxt-link to="/" class="nav-link">
              <span class="nav-link-inner--text">Login</span>
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/register" class="nav-link">
              <span class="nav-link-inner--text">Register</span>
            </nuxt-link>
          </li>
        </ul>
        <hr class="d-lg-none" />
        <ul class="navbar-nav align-items-lg-center ml-lg-auto">
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://www.facebook.com/creativetim"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook-square" />
              <span class="nav-link-inner--text d-lg-none">Facebook</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://www.instagram.com/creativetimofficial"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram" />
              <span class="nav-link-inner--text d-lg-none">Instagram</span>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://twitter.com/creativetim"
              target="_blank"
              rel="noopener"
              aria-label="Twitter"
            >
              <i class="fab fa-twitter-square" />
              <span class="nav-link-inner--text d-lg-none">Twitter</span>
            </a>
          </li>
        </ul>
      </template>
    </base-nav>

    <div class="main-content bg-brand-color">
      <nuxt />
    </div>

    <!-- <ContentFooter class="bg-blue-brand" /> -->

    <footer id="footer-main" class="py-5 bg-brand-color">
      <div class="container">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-6">
            <div class="copyright text-center text-lg-left text-muted">
              © {{ year }}
              <a
                href="#"
                class="font-weight-bold ml-1"
                target="_blank"
                rel="noopener"
              >
                Provendor integrador de vendas online
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
import BaseNav from '~/components/argon-core/Navbar/BaseNav.vue'

export default {
  components: {
    BaseNav
  },
  props: {
    backgroundColor: {
      type: String,
      default: 'black'
    }
  },
  data() {
    return {
      img: {
        height: '70px',
        paddingTop: '10px'
      },
      showMenu: false,
      menuTransitionDuration: 250,
      year: new Date().getFullYear(),
      pageClass: 'login-page'
    }
  },
  computed: {
    title() {
      return `${this.$route.name} Page`
    },
    layoutClass() {
      let exceptions = ['index', 'home']
      if (!exceptions.includes(this.$route.name)) {
        return 'bg-default'
      } else {
        return ''
      }
    }
  },
  watch: {
    '$route.path'() {
      if (this.showMenu) {
        this.closeMenu()
      }
    }
  },
  methods: {
    closeMenu() {
      document.body.classList.remove('nav-open')
      this.showMenu = false
    }
  }
}
</script>
<style lang="scss">
.auth-layout {
  min-height: 100vh;
}
</style>
