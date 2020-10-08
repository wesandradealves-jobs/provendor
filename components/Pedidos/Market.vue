<template>
  <div class="card-produto mt-3" style="height: 430px;">
    <div class="mb-3">
      <div
        class="d-flex align-items-center mb-3"
        style="border-bottom: 1px solid #60a99e; text-transform: uppercase;"
      >
        <i class="ni ni-fat-delete"></i>
        <p class="font-weight-600 text-sm ml-1">
          Mercado Livre
        </p>
      </div>
      <strong>Status:</strong>
      <span v-if="row.status === 'ativo'" class="badge badge-green-brand">
        {{ row.status }}
      </span>
      <span v-else class="badge badge-danger">{{ row.status }}</span>
    </div>

    <div class="d-flex align-items-center">
      <div class="d-flex pr-2">
        <img
          class="avatar image-produto"
          alt="Mercado Livre"
          src="https://imagens.canaltech.com.br/empresas/2812.400.jpg"
        />
      </div>
      <div>
        <p>
          <strong>Pedido:</strong>
          {{ row.pedido }}
        </p>
        <p>
          <strong>Nosso pedido:</strong>
          {{ row.nosso_pedido }}
        </p>
        <p>
          <strong>ID da compra:</strong>
          {{ row.seller_id }}
        </p>
      </div>
    </div>
    <div
      class="d-flex align-items-center mt-4 mb-3"
      style="border-bottom: 1px solid #60a99e; text-transform: uppercase;"
    >
      <i class="ni ni-fat-delete"></i>
      <p class="font-weight-600 ml-1 text-sm">Rastreio</p>
    </div>
    <div class="d-flex">
      <div>
        <p>
          <strong>Pedido:</strong>
        </p>
        <p>
          <strong>Número:</strong>
        </p>
        <p>
          <strong>Última atualização:</strong>
        </p>
        <p>
          <strong>Nfe:</strong>
        </p>
      </div>
      <div class="ml-2">
        <span class="badge badge-green-brand">
          {{ statusFormated }}
        </span>
        <p>
          <span
            v-if="row.shipping && row.shipping.deadline"
            class="badge badge-green-brand"
          >
            {{ row.shipping.deadline | formatDate }}
          </span>
        </p>
        <p>
          <span class="badge badge-green-brand">{{ track }}</span>
        </p>
        <p>
          <span class="badge badge-green-brand">{{ nfe }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PedidoMarket',
  props: {
    row: {
      type: Object,
      default: null
    },
    formatStatus: {
      type: Function,
      default: null
    }
  },
  computed: {
    statusFormated() {
      if (this.row.shipping && this.row.shipping.status) {
        return this.formatStatus(this.row.shipping.status)
      }
      return ''
    },
    track() {
      const row = this.row
      return row.shipping && row.shipping.track ? row.shipping.track : ''
    },
    nfe() {
      const row = this.row
      return row.shipping && row.shipping.nfe ? row.shipping.nfe : ''
    }
  }
}
</script>

<style scoped>
p {
  font-size: 0.8rem;
  margin: 0;
  padding: 0;
  line-height: 1.5rem;
}

strong {
  font-weight: 600;
}

.badge-green-brand {
  color: #041f25;
  font-size: 0.8em;
  /* text-transform: lowercase; */
}
</style>
