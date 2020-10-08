<template>
  <prd-page>
    <div>
      <!-- Header -->
      <div class="header bg-brand-color py-7 py-lg-8 pt-lg-9">
        <div class="container">
          <div class="header-body text-center mb-2">
            <div class="row justify-content-center">
              <div class="col-xl-5 col-lg-6 col-md-8">
                <h1 class="text-white">
                  REDEFINIÇÃO DE SENHA
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Page content -->
      <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-7">
            <div class="card bg-secondary border-0 mb-0">
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                  <small>Preencha os campos solicitados:</small>
                </div>
                <validation-observer
                  v-slot="{ handleSubmit }"
                  ref="formValidator"
                >
                  <form role="form" @submit.prevent="handleSubmit(onSubmit)">
                    <div class="mb-3">
                      <base-input
                        v-model="account.email"
                        alternative
                        name="Email"
                        :rules="{ required: true, email: true }"
                        prepend-icon="ni ni-email-83"
                        placeholder="Email"
                      />
                    </div>

                    <div class="mb-3">
                      <base-input
                        v-model="account.newpassword"
                        alternative
                        name="Senha"
                        :rules="{ required: true, min: 7 }"
                        prepend-icon="ni ni-lock-circle-open"
                        type="password"
                        placeholder="Senha"
                      />
                      <small
                        v-if="account.newpassword.length > 0"
                        :class="colorMessageStrongPwd()"
                      >
                        {{ feedbackPwd }}
                      </small>
                    </div>

                    <base-input
                      v-model="confirmPassword"
                      alternative
                      name="Confirmar senha"
                      :rules="{ required: true, min: 7 }"
                      prepend-icon="ni ni-lock-circle-open"
                      type="password"
                      placeholder="Confirmar senha"
                    />
                    <small
                      v-if="confirmPassword.length > 0"
                      v-show="account.newpassword !== confirmPassword"
                      style="color: #fb6340;"
                    >
                      A confirmaçao da senha não confere.
                    </small>
                    <div class="text-center">
                      <base-button
                        type="green-brand"
                        native-type="submit"
                        class="my-4"
                      >
                        Redfinir
                      </base-button>
                    </div>
                  </form>
                </validation-observer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </prd-page>
</template>
<script>
const zxcvbn = require('zxcvbn')
import PrdPage from '~/components/shared/ProvendorPage'

export default {
  layout: 'AuthLayout',
  components: {
    PrdPage
  },

  data() {
    return {
      fullscreenLoading: true,
      account: {
        email: '',
        newpassword: ''
      },
      confirmPassword: '',
      feedbackPwd: ''
    }
  },

  watch: {
    ['account.password']: function () {
      const strong = zxcvbn(this.account.password).score
      if (strong === 0) return (this.feedbackPwd = 'Senha muito fraca')
      if (strong === 1) return (this.feedbackPwd = 'Senha fraca')
      if (strong === 2) return (this.feedbackPwd = 'Senha razoável')
      if (strong === 3) return (this.feedbackPwd = 'Senha forte')
      if (strong === 4) return (this.feedbackPwd = 'Senha muito forte')
    }
  },

  methods: {
    async onSubmit() {
      try {
        await this.$axios
          .post('users/sendemailnewpassword', this.account)
          .then(res => {
            if (res.status === 201) {
              this.$router.push('/usuario/mensagem-nova-senha')
            }
          })
      } catch (res) {
        if (res.response.status === 500 || res.response.status === 422) {
          this.notifyError(res.response.data.message)
        }
      }
    },
    colorMessageStrongPwd() {
      if (this.feedbackPwd === 'Senha muito fraca') return 'colorRed'
      if (this.feedbackPwd === 'Senha fraca') return 'colorRed'
      if (this.feedbackPwd === 'Senha razoável') return 'colorYellow'
      else return 'colorGreen'
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

.colorRed {
  color: #fb6340;
}

.colorGreen {
  color: green;
}

.colorYellow {
  color: #ff8c00;
}
</style>
