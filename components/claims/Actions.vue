<template>
  <div class="col-xl-3">
    <card class="d-flex no-border-card" body-classes="p-0">
      <el-collapse v-model="activeNames" accordion>
        <el-collapse-item name="1">
          <template slot="title">
            <h3 class="ml-3">Ações</h3>
          </template>
          <div v-if="data[selected]">
            <ul
              v-for="(action, index) in data[selected].actions"
              :key="index"
              class="list-group"
            >
              <li
                class="list-group-item button d-flex align-items-center justify-content-between"
                @click="actions(data[selected]._id, action)"
              >
                {{ nameActions(action) }}
              </li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <h3 class="ml-3">Pedido</h3>
          </template>
          <div v-if="data[selected]" class="px-3">
            <div
              v-for="(order, index) in data[selected].order.orderItems"
              :key="index"
              class="pb-3"
            >
              <div>
                <div class="d-flex justify-content-center">
                  <img
                    class="avatar rounded-circle mb-2"
                    style="width: 80px; height: 80px;"
                    :src="order.picture"
                    alt=""
                  />
                </div>
                <p>
                  <strong>{{ order.title }}</strong>
                </p>
              </div>
              <p>Quantidade: {{ order.quantityOrdered }}</p>
              <el-divider class="mt-2"></el-divider>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <h3 class="ml-3">Envio</h3>
          </template>
          <div v-if="data[selected]" class="px-3">
            <div class="d-flex align-items-center">
              <i class="far fa-address-card mr-2"></i>
              <p>
                <strong>Status:</strong>
                {{ formatStatus(data[selected].shipping.status) }}
              </p>
            </div>
            <div class="d-flex align-items-center">
              <i class="far fa-sticky-note mr-2"></i>
              <p><strong>Nfe:</strong>{{ data[selected].shipping.nfe }}</p>
            </div>
            <div class="d-flex align-items-center">
              <i class="far fa-paper-plane mr-2"></i>
              <p>
                <strong>Enviado:</strong>
                {{ data[selected].shipping.deadline | formatDate }}
              </p>
            </div>
            <div class="d-flex align-items-center mt-2">
              <i class="fas fa-shipping-fast mr-2"></i>
              <p>
                <strong>
                  {{ data[selected].shipping.track }}
                </strong>
              </p>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </card>

    <!-- Modal Alerts -->
    <modal-alerts
      :title-action="titleAction"
      :dialog-alert="dialogAlert"
      @change-dialog-alert="dialogAlert = $event"
    ></modal-alerts>

    <!-- Modal Actions -->
    <modal-actions
      :options="options"
      :title-action="titleAction"
      :dialog-actions="dialogActions"
      :data="data"
      :selected="selected"
      :get-action="getAction"
      :notification-error="notificationError"
      :notification-success="notificationSuccess"
      :notification-message="notificationMessage"
      @change-dialog-actions="dialogActions = $event"
      @change-notification-message="notificationMessage = $event"
    ></modal-actions>
  </div>
</template>

<script>
import { CollapseItem, Collapse, Divider, Notification } from 'element-ui'
import ModalActions from './ModalActions'
import ModalAlerts from './ModalAlterts'
export default {
  name: 'Actions',
  components: {
    ModalAlerts,
    ModalActions,
    [Notification.name]: Notification,
    [Divider.name]: Divider,
    [CollapseItem.name]: CollapseItem,
    [Collapse.name]: Collapse
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    selected: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      notificationMessage: '',
      getAction: '',
      titleAction: '',
      activeNames: ['1'],
      dialogActions: false,
      dialogAlert: false,

      options: {
        id: '',
        shipping_method: '',
        shipping_company_name: '',
        tracking_number: '',
        receiver_email: '',
        destination_agency: '',
        receiver_name: '',
        receiver_id: '',
        date_shipped: '2018-07-17',
        date_delivered: '2018-07-17',
        handling_date: '2018-07-17'
      }
    }
  },

  watch: {
    dialogActions: function () {
      if (this.dialogActions === false) {
        this.validationError.date_shipped = ''
        this.validationError.shipping_company_name = ''
        this.validationError.shipping_method = ''
      }
    }
  },

  methods: {
    formatStatus(status) {
      if (status === 'posted') return 'Postado'
      if (status === 'not posted') return 'Não Postado'
      if (status === 'packed') return 'Embalado'
    },

    nameActions(action) {
      if (action === 'recontact') return 'Recontato'
      if (action === 'refund') return 'Restituição'
      if (action === 'openDispute') return 'Disputa aberta'
      if (action === 'allowReturnLabel') return 'Permitir etiqueta de retorno'
      if (action === 'SendTrackingNumber')
        return 'Enviar numero de rastreamento'
      if (action === 'addShippingEvidence')
        return 'Adicionar evidência de envio'
      if (action === 'sendPotential_shipping') return 'Enviar Envio potencial'
    },

    actions(id, action) {
      if (action === 'recontact') return (this.dialogAlert = true)
      if (action === 'refund') return (this.dialogAlert = true)
      if (action === 'addShippingEvidence') return (this.dialogAlert = true)

      if (action === 'sendPotential_shipping') {
        this.titleAction = this.nameActions('sendPotential_shipping')
        this.getAction = 'sendPotential_shipping'
        this.options.id = id
        return (this.dialogActions = true)
      }
      if (action === 'openDispute') return this.openDispute(id)
      if (action === 'allowReturnLabel') return this.allowReturnLabel(id)
      if (action === 'SendTrackingNumber')
        this.titleAction = this.nameActions('SendTrackingNumber')
      this.getAction = 'SendTrackingNumber'
      this.options.id = id
      return (this.dialogActions = true)
    },

    notificationSuccess() {
      Notification.success({
        message: this.notificationMessage,
        type: 'info'
      })
    },

    notificationError() {
      Notification.error({
        message: this.notificationMessage,
        type: 'info'
      })
    },

    async openDispute(id) {
      try {
        const response = await this.$axios.$post(`/claims/open-dispute`, {
          id: id
        })
        console.log(response.data)
        this.notificationMessage = 'Disputa carregada com sucesso'
        this.notificationSuccess(this.notificationMessage)
      } catch (err) {
        if (err.response.status === 404) {
          this.notificationMessage = 'Rota não encontrada'
          this.notificationError(this.notificationMessage)
        }
      }
    },

    allowReturnLabel(id) {
      this.$axios
        .$post(`/claims/allow-return-label`, { id: id })
        .then(res => {
          console.log(res.data)

          this.notificationMessage =
            'Etiqueta de retorno com aceita com sucesso'
          this.notificationSuccess(this.notificationMessage)
        })
        .catch(err => {
          console.log(err)

          this.notificationMessage = 'Falha ao enviar etiqueta de retorno'
          this.notificationError(this.notificationMessage)
        })
    }
  }
}
</script>

<style scoped>
li {
  cursor: pointer;
}
.button {
  font-size: 1rem;
  border-radius: 0;
}
.button:hover {
  background: #60a99e;
  color: #fff;
}

.collapse {
  padding-bottom: 1px;
}
</style>
