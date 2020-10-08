<template>
  <el-dialog
    :title="titleAction"
    :before-close="closeModal"
    :visible.sync="dialogActions"
    width="60%"
  >
    <div class="row">
      <div class="col-6">
        <label>Nome da transportadora</label>
        <base-input
          v-model="options.shipping_company_name"
          placeholder="Nome da transportadora"
        ></base-input>
        <div v-show="hasError">
          <p class="colorRed">{{ validationError.shipping_company_name }}</p>
        </div>

        <label class="mt-4" for="">Código de rastreio:</label>
        <base-input
          v-model="options.tracking_number"
          placeholder="Codigo de rastreio"
        ></base-input>
        <label class="mt-4" for="">Data de envio:</label>
        <base-input addon-left-icon="ni ni-calendar-grid-58">
          <flat-picker
            v-model="options.date_shipped"
            slot-scope="{ focus, blur }"
            :config="config"
            class="form-control datepicker"
            @on-open="focus"
            @on-close="blur"
          >
          </flat-picker>
        </base-input>
        <div v-show="hasError">
          <p class="colorRed">{{ validationError.date_shipped }}</p>
        </div>
        <label class="mt-4" for="">
          E-mail de quem recebeu a encomenda digital:
        </label>
        <base-input
          v-model="options.receiver_email"
          placeholder="E=mail de quem recebeu a encomenda digital"
        ></base-input>
        <div class="d-flex flex-column">
          <label class="mt-4">Método de envio:</label>
          <el-select
            v-model="options.shipping_method"
            placeholder="Selecione um metodo de envio"
          >
            <el-option
              v-for="item in optionsDelivery"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div v-show="hasError">
          <p class="colorRed">{{ validationError.shipping_method }}</p>
        </div>
      </div>
      <div class="col-6">
        <label for="">Data de entrega:</label>
        <base-input addon-left-icon="ni ni-calendar-grid-58">
          <flat-picker
            v-model="options.date_delivered"
            slot-scope="{ focus, blur }"
            :config="config"
            class="form-control datepicker"
            @on-open="focus"
            @on-close="blur"
          >
          </flat-picker>
        </base-input>
        <label class="mt-4" for="">Agência de destino:</label>
        <base-input
          v-model="options.destination_agency"
          placeholder="Agencia de destino"
        ></base-input>
        <label class="mt-4" for="">Nome de quem recebeu a mercadoria:</label>
        <base-input
          v-model="options.receiver_name"
          placeholder="Nome de quem recebeu a mercadoria"
        ></base-input>
        <label class="mt-4" for="">
          Documento de quem recebeu o produto:
        </label>
        <base-input
          v-model="options.receiver_id"
          placeholder="Documento de quem recebeu o produto"
        ></base-input>
        <label class="mt-4" for="">Data da postagem:</label>
        <base-input addon-left-icon="ni ni-calendar-grid-58">
          <flat-picker
            v-model="options.handling_date"
            slot-scope="{ focus, blur }"
            :config="config"
            class="form-control datepicker"
            @on-open="focus"
            @on-close="blur"
          >
          </flat-picker>
        </base-input>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="validationSendForm(data[selected]._id)">
        Confirmar
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Dialog, Button, Select, Option, Notification } from 'element-ui'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
import flatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
export default {
  name: 'ModalActions',
  components: {
    flatPicker,
    [Select.name]: Select,
    [Option.name]: Option,
    [Dialog.name]: Dialog,
    [Button.name]: Button,
    [Notification.name]: Notification
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    selected: {
      type: Number,
      default: null
    },
    notificationError: {
      type: Function,
      default: null
    },
    notificationMessage: {
      type: String,
      default: null
    },
    notificationSuccess: {
      type: Function,
      default: null
    },
    getAction: {
      type: String,
      default: null
    },
    options: {
      type: Object,
      default: null
    },
    titleAction: {
      type: String,
      default: null
    },
    dialogActions: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      hasError: false,
      config: {
        locale: Portuguese,
        allowInput: true
      },
      validationError: {
        date_shipped: 'Esse campo é requerido',
        shipping_company_name: 'Esse campo é requerido',
        shipping_method: 'Esse campo é requerido'
      },
      optionsDelivery: [
        {
          value: 'mail',
          label: 'Correios'
        },
        {
          value: 'entruted',
          label: 'Transportadora'
        },
        {
          value: 'personal_delivery',
          label: 'Entrega em maos'
        },
        {
          value: 'email',
          label: 'envio por e-mail'
        }
      ]
    }
  },
  methods: {
    closeModal() {
      let dialogActions = this.dialogActions
      dialogActions = false
      this.$emit('change-dialog-actions', dialogActions)
    },
    clearInputs() {
      this.options.id = ''
      this.options.shipping_method = ''
      this.options.shipping_company_name = ''
      this.options.tracking_number = ''
      this.options.receiver_email = ''
      this.options.destination_agency = ''
      this.options.receiver_name = ''
      this.options.receiver_id = ''
    },

    validationSendForm(id) {
      if (
        this.options.date_shipped &&
        this.options.shipping_company_name &&
        this.options.shipping_method !== ''
      )
        return this.sendForm(id)
      else this.hasError = true
    },

    async sendForm(id) {
      let notificationMessage = this.notificationMessage

      const url =
        this.getAction === 'sendPotential_shipping'
          ? 'shipping-info'
          : 'shipping-evidence'

      try {
        this.options.id = id

        const response = await this.$axios.$post(`/claims/${url}`, this.options)
        notificationMessage = `${this.titleAction} enviada com sucesso`
        this.$emit('change-notification-message', notificationMessage)
        this.notificationSuccess(this.notificationMessage)

        return console.log(response.data)
      } catch (err) {
        if (err.response.status === 404) {
          notificationMessage = 'Rota não encontrada!'
          this.notificationSuccess(this.notificationMessage)
        } else if (err.request) {
          notificationMessage = 'Operação invalida'
          this.notificationSuccess(this.notificationMessage)
        } else {
          console.log('Error', err.message)
        }
      } finally {
        this.clearInputs()
        this.closeModal()
      }
    }
  }
}
</script>

<style scoped>
.colorRed {
  color: #fb6340;
}
</style>
