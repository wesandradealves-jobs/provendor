<template>
  <div class="card-produto mt-3" style="height: 430px;">
    <div
      class="d-flex align-items-center mt-4 mb-3"
      style="border-bottom: 1px solid #60a99e; text-transform: uppercase;"
    >
      <i class="ni ni-fat-delete"></i>
      <p class="font-weight-600 ml-1 text-sm">{{ origin }}</p>
    </div>
    <div class="d-flex">
      <div>
        <p>
          <strong>Tarifa de venda:</strong>
        </p>
        <p>
          <strong>Custo de envio:</strong>
        </p>
        <p>
          <strong>Custo do produto:</strong>
        </p>
        <p>
          <strong>Você receberá:</strong>
        </p>
        <p>
          <strong>Percentage de devoluções:</strong>
        </p>
        <p>
          <strong>Visitas:</strong>
        </p>
        <p>
          <strong>Vendas:</strong>
        </p>
        <p>
          <strong>Estoque:</strong>
        </p>
        <p>
          <strong>Estoque virtual:</strong>
        </p>
      </div>
      <div class="ml-2">
        <p>
          <!-- <span class="badge badge-green-brand">
            {{ deadlineFormated }}
          </span> -->
        </p>
        <p>
          <!-- <span class="badge badge-green-brand">{{ track }}</span> -->
        </p>
        <p>
          <!-- <span class="badge badge-green-brand">{{ nfe }}</span> -->
        </p>
        <p>
          <!-- <span class="badge badge-green-brand">{{ nfe }}</span> -->
        </p>
        <p>
          <!-- <span class="badge badge-green-brand">{{ nfe }}</span> -->
        </p>
        <p>
          <!-- <span class="badge badge-green-brand">{{ nfe }}</span> -->
        </p>
        <p>
          <!-- <span class="badge badge-green-brand">{{ nfe }}</span> -->
        </p>
        <p>
          <!-- <span class="badge badge-green-brand">{{ nfe }}</span> -->
        </p>
        <p>
          <!-- <span class="badge badge-green-brand">{{ nfe }}</span> -->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrdAdsMarket',
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  computed: {
    origin() {
      if (this.item.origin === 'meli') {
        return 'Mercado Livre'
      }

      return ''
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
