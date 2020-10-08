<template>
  <div>
    <!-- Header -->
    <div class="header bg-brand-color py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-2">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8">
              <h1 class="text-white">
                Seja Bem-Vindo!
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            <div class="card-body px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Entre com seu email e senha:</small>
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <form role="form" @submit.prevent="handleSubmit(onSubmit)">
                  <base-input
                    v-model="account.username"
                    alternative
                    class="mb-3"
                    name="Email"
                    :rules="{ required: true }"
                    prepend-icon="ni ni-email-83"
                    placeholder="Email"
                  />

                  <base-input
                    v-model="account.password"
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true, min: 6 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Password"
                  />

                  <base-checkbox v-model="account.rememberMe">
                    Lembrar me
                  </base-checkbox>
                  <div class="text-center">
                    <base-button
                      type="green-brand"
                      native-type="submit"
                      class="my-4"
                    >
                      Entrar
                    </base-button>
                  </div>
                </form>
              </validation-observer>
            </div>
            <div class="mt-3">
              <transition name="fade">
                <base-alert
                  v-if="hasLoginError"
                  dismissible
                  type="danger"
                  icon="fas fa-exclamation-circle"
                >
                  Usuário ou senha inválidos, verifique e tente novamente.
                </base-alert>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'AuthLayout',
  data() {
    return {
      account: {
        username: '',
        password: ''
      },
      hasLoginError: false
    }
  },
  methods: {
    async onSubmit() {
      this.$store
        .dispatch('user/login', this.account)
        .then(() => {
          this.$router.push('/admin/indicadores')
        })
        .catch(() => {
          this.hasLoginError = true

          setTimeout(() => {
            this.hasLoginError = false
          }, 5000)
        })
    }
  }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
