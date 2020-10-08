<template>
  <div class="card-pedido" style="height: 430px;">
    <base-button
      class="btn btn-outline-green-brand btn-block mt-3 justify-content-start"
    >
      <div>
        <span>
          <i class="ni ni-ungroup"></i>
        </span>
        <span class="ml-1">Alterar status</span>
      </div>
    </base-button>

    <base-button
      class="btn btn-block mt-1 btn-outline-green-brand"
      :disabled="!row.has_nfe"
    >
      <div class="buttons">
        <div class="d-flex align-items-center">
          <span>
            <i class="ni ni-single-copy-04"></i>
          </span>
          <span class="ml-1">Notas fiscais</span>
        </div>
      </div>
      <div>
        <span v-if="row.has_nfe" class="badge-circle badge-green-brand"></span>
        <span v-else class="badge-circle badge-danger"></span>
      </div>
    </base-button>

    <base-button
      class="btn btn-block mt-1 btn-outline-green-brand"
      :disabled="!row.has_extra_costs"
    >
      <div class="buttons">
        <div class="d-flex align-items-center">
          <span>
            <i class="ni ni-fat-add"></i>
          </span>
          <span class="ml-1">Custos extras</span>
        </div>
      </div>
      <div>
        <span
          v-if="row.has_extra_costs"
          class="badge-circle badge-green-brand"
        ></span>
        <span v-else class="badge-circle badge-danger"></span>
      </div>
    </base-button>
    <base-button
      class="btn btn-block mt-1 btn-outline-green-brand"
      :disabled="!row.delivery_label"
    >
      <div class="buttons">
        <div class="d-flex align-items-center">
          <span class="el-icon-search"></span>
          <span class="ml-1">Rastreio</span>
        </div>
        <div>
          <span
            v-if="row.delivery_label"
            class="badge-circle badge-green-brand"
          ></span>
          <span v-else class="badge-circle badge-danger"></span>
        </div>
      </div>
    </base-button>
    <base-button
      class="btn btn-block mt-1 btn-outline-green-brand"
      :disabled="!row.has_message"
    >
      <div class="buttons">
        <div class="d-flex align-items-center">
          <span>
            <i class="el-icon-message"></i>
          </span>
          <span class="ml-1">Mensagem</span>
        </div>
        <div>
          <span v-if="row.has_message" class="badge-circle badge-green-brand">
            3
          </span>
          <span v-else class="badge-circle badge-danger"></span>
        </div>
      </div>
    </base-button>
    <base-button
      class="btn btn-block mt-1 btn-outline-green-brand"
      :disabled="!row.has_questions"
    >
      <div class="buttons">
        <div class="d-flex align-items-center">
          <span>
            <i class="ni ni-bell-55"></i>
          </span>
          <span class="ml-1">Perguntas</span>
        </div>
        <div>
          <span v-if="row.has_questions" class="badge-circle badge-green-brand">
            3
          </span>
          <span v-else class="badge-circle badge-danger"></span>
        </div>
      </div>
    </base-button>
    <base-button
      class="btn btn-block mt-1 btn-outline-green-brand"
      :disabled="!row.has_coments"
    >
      <div class="buttons">
        <div class="d-flex align-items-center">
          <span>
            <i class="el-icon-chat-line-square"></i>
          </span>
          <span class="ml-1">Comentários</span>
        </div>
        <div>
          <span v-if="row.has_coments" class="badge-circle badge-green-brand">
            3
          </span>
          <span v-else class="badge-circle badge-danger"></span>
        </div>
      </div>
    </base-button>
    <base-button
      type="button"
      class="btn btn-block mt-1 btn-outline-danger"
      :disabled="!row.has_claim"
    >
      <div class="buttons">
        <div class="d-flex align-items-center">
          <span>
            <i class="ni ni-notification-70 m-0"></i>
            <span>Reclamações</span>
          </span>
        </div>
        <div>
          <span v-if="row.has_claim" class="badge-circle badge-danger">
            3
          </span>
          <span v-else class="badge-circle badge-danger"></span>
        </div>
      </div>
    </base-button>
  </div>
</template>

<script>
export default {
  name: 'PedidoAcao',
  props: {
    row: {
      type: Object,
      default: null
    }
  },
  methods: {
    handleStatus(status) {
      if (status) {
        return 'btn-green-brand'
      } else {
        return 'btn-outline-default'
      }
    },

    handleClaim(status) {
      if (status) {
        return 'btn-danger'
      } else {
        return 'btn-outline-default'
      }
    }
  }
}
</script>

<style scoped>
button {
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}

.buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
