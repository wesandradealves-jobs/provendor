<template>
  <card class="no-border-card mt-4">
    <div class="d-flex flex-column">
      <div
        class="d-flex flex-row pb-3"
        style="border-bottom: 1px solid #60a99e;"
      >
        <div class="d-flex justify-content-center align-items-center">
          <div href="#!" class="avatar avatar-xl rounded-circle mr-4">
            <img alt="Image placeholder" :src="question.ad.picture" />
          </div>
        </div>
        <div class="d-flex flex-column" style="width: 100%;">
          <div
            class="d-flex justify-content-between align-items-center"
            style="border-bottom: 1px solid #60a99e;"
          >
            <div>
              <h3>{{ question.ad.title }}</h3>
            </div>
            <div class="d-flex mb-1">
              <div class="mr-4">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Código do marketplace"
                  placement="top"
                >
                  <p v-if="question.ad.marketplace_code">
                    {{ question.ad.marketplace_code }}
                  </p>
                </el-tooltip>
              </div>
              <div>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Nome da conta do marketplace"
                  placement="top"
                >
                  <p v-if="question.ad.marketplace_account_name">
                    {{ question.ad.marketplace_account_name }}
                  </p>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div>
            <div class="d-flex justify-content-between mt-2">
              <div class="mr-4">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Valor do produto"
                  placement="top"
                >
                  <p>
                    {{ question.ad.price | formatPrice }}
                  </p>
                </el-tooltip>
              </div>
              <div class="d-flex mr-4 align-items-center">
                <i class="far fa-user mr-2"></i>

                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Tipo de usuário"
                  placement="top"
                >
                  <p v-if="question.ad.listing_type">
                    {{ question.ad.listing_type }}
                  </p>
                </el-tooltip>
              </div>
              <div class="d-flex mr-4 align-items-center">
                <i class="fas fa-shipping-fast mr-2"></i>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Entrega"
                  placement="top"
                >
                  <p>
                    {{ question.ad.shipping_option }}
                  </p>
                </el-tooltip>
              </div>
              <div class="d-flex mr-4 align-items-center">
                <i class="fas fa-users mr-2"></i>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Visitas"
                  placement="top"
                >
                  <p>{{ question.ad.visits }}</p>
                </el-tooltip>
              </div>
              <div class="d-flex mr-4 align-items-center">
                <i class="fas fa-shopping-cart mr-2"></i>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="Quantidade de compras"
                  placement="top"
                >
                  <p>{{ question.ad.sells }}</p>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-column mt-3">
        <div class="d-flex justify-content-between align-items-center">
          <div
            class="d-flex justify-content-between p-0 col"
            style="width: 100%;"
          >
            <div class="d-flex mr-4 align-items-center">
              <i class="fas fa-mail-bulk mr-2"></i>
              <el-tooltip
                class="item"
                effect="dark"
                content="CEP"
                placement="top"
              >
                <p>
                  {{ formatCep(question.buyer.cep) }}
                </p>
              </el-tooltip>
            </div>
            <div class="d-flex mr-4 align-items-center">
              <i class="far fa-address-card mr-2"></i>
              <el-tooltip
                class="item"
                effect="dark"
                content="Data de criação da conta"
                placement="top"
              >
                <p>
                  {{ question.buyer.meli_acount_since | formatDate }}
                </p>
              </el-tooltip>
            </div>
            <div class="d-flex align-items-center">
              <i class="fas fa-map-marker mr-2"></i>
              <el-tooltip
                class="item"
                effect="dark"
                content="Cidade"
                placement="top"
              >
                <p>{{ question.buyer.city }}</p>
              </el-tooltip>
            </div>
          </div>
        </div>
        <div class="mt-5">
          <h3>
            {{ question.buyer.nickname }} <span>perguntou</span>
            <span question.question.received>{{
              question.question.received | formatTime
            }}</span>
          </h3>
        </div>
        <div class="">
          <ul class="list-group">
            <li class="list-group-item question">
              {{ question.question.text }}
            </li>
          </ul>
        </div>
        <div class="mt-4">
          <h3>Selecione uma saudação</h3>
          <el-select
            v-model="selects.salutation"
            class="select-danger"
            style="width: 100%;"
            placeholder="Escolha uma saudação"
          >
            <el-option
              v-for="option in selects.selectSalutation"
              :key="option.label"
              class="select-danger"
              :value="option.value"
              :label="option.label"
            >
              <template slot="prefix">X</template>
            </el-option>
          </el-select>
        </div>
        <div class="mt-3">
          <h3>Resposta automática</h3>
          <base-input
            v-show="show"
            v-if="question.question.auto_response"
            v-model="question.question.auto_response"
            :v-model="getAutomaticAnswer(question.question.auto_response)"
            disabled
          >
            <template slot="append">
              <base-switch v-model="switches"></base-switch>
            </template>
          </base-input>
          <base-input v-else disabled>
            <template slot="append">
              <base-switch v-model="switches"></base-switch>
            </template>
          </base-input>
        </div>
        <div class="mt-3">
          <h3>Resposta complementar</h3>
          <base-input>
            <textarea
              id="inputAnswer"
              v-model="complementaryAnswer"
              class="form-control form-control-muted"
              rows="3"
              placeholder="Inclua aqui a sua resposta complementar."
              :disabled="switches"
            ></textarea>
          </base-input>
        </div>
        <div class="mt-3 mb-3">
          <h3>Selecione uma despedida</h3>
          <el-select
            v-model="selects.farewell"
            class="select-danger"
            style="width: 100%;"
            placeholder="Escolha uma resposta"
          >
            <el-option
              v-for="option in selects.selectFarewell"
              :key="option.label"
              class="select-danger"
              :value="option.value"
              :label="option.label"
            ></el-option>
          </el-select>
        </div>
        <div class="d-flex justify-content-between mt-6">
          <div>
            <base-button
              v-if="currentQuestion"
              type="danger"
              @click="questionDelete(currentQuestion)"
            >
              Excluir
            </base-button>
          </div>
          <div class="d-flex">
            <base-button
              v-if="currentQuestion"
              :disabled="currentQuestion === 1"
              type="default"
              @click="comeBack"
            >
              Voltar
            </base-button>
            <base-button
              v-if="currentQuestion && data"
              :disabled="currentQuestion === data.length"
              type="default"
              @click="jump"
            >
              Pular
            </base-button>
            <base-button type="default" @click="sendAnwer">
              Responder
            </base-button>
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<script>
import baseSwitch from '@/components/argon-core/BaseSwitch'
import { Select, Option, Tooltip, Notification } from 'element-ui'

export default {
  name: 'Questions',
  components: {
    baseSwitch,
    [Notification.name]: Notification,
    [Tooltip.name]: Tooltip,
    [Select.name]: Select,
    [Option.name]: Option
  },
  props: {
    question: {
      type: Object,
      default: null
    },
    data: {
      type: Array,
      default: null
    },
    currentQuestion: {
      type: Number,
      default: null
    },
    selects: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      automaticAnswer: '',
      show: true,
      switches: true,
      complementaryAnswer: ''
    }
  },
  watch: {
    switches: function () {
      if (this.switches === false) return (this.show = false)
      else return (this.show = true)
    }
  },
  methods: {
    formatCep(cep) {
      return String(cep).replace(/(\d{5})?(\d{3})/, '$1-$2')
    },

    getAutomaticAnswer(text) {
      this.automaticAnswer = text
    },
    sendAnwer() {
      if (this.switches) {
        console.log(
          `${this.selects.salutation} ${this.automaticAnswer} ${this.selects.farewell}`
        )

        Notification.success({
          message: 'Resposta enviada com sucesso',
          type: 'info'
        })
      } else {
        console.log(
          `${this.selects.salutation} ${this.complementaryAnswer} ${this.selects.farewell}`
        )

        Notification.error({
          message: 'Falha ao  enviar resposta',
          type: 'info'
        })
      }
    },
    jump() {
      let updatecurrentQuestion = this.currentQuestion
      updatecurrentQuestion += 1
      this.$emit('change-current-question', updatecurrentQuestion)
    },
    comeBack() {
      let updatecurrentQuestion = this.currentQuestion
      updatecurrentQuestion -= 1
      this.$emit('change-current-question', updatecurrentQuestion)
    },
    questionDelete(idx) {
      const newList = [...this.data]
      newList.splice(idx - 1, 1)
      this.$emit('removeItem', newList)

      Notification.success({
        message: 'Pergunta excluida com sucesso',
        type: 'info'
      })
    }
  }
}
</script>

<style scoped>
p {
  font-size: 0.9rem;
  margin: 0;
}

.question {
  background: #60a99e;
  color: #fff;
}

span {
  font-size: 0.9rem;
  font-weight: 100;
}
</style>
