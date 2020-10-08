<template>
  <div class="card-pedido mt-3" style="height: 430px;">
    <div
      class="d-flex align-items-center mb-3"
      style="border-bottom: 1px solid #60a99e; text-transform: uppercase;"
    >
      <i class="ni ni-fat-delete"></i>
      <p class="font-weight-600 ml-1 text-sm">
        Dados Comprador
      </p>
    </div>
    <div>
      <p class="d-flex align-items-center">
        <i class="ni ni-bold-down"></i>
        <strong class="pl-1">Nickname:</strong>
      </p>
      <p class="pl-3">{{ row.buyer.nickname }}</p>
      <p class="d-flex align-items-center">
        <i class="ni ni-bold-down"></i>
        <strong class="pl-1">Nome:</strong>
      </p>
      <p class="pl-3">{{ row.buyer.name }}</p>
      <p class="d-flex align-items-center">
        <i class="ni ni-bold-down"></i>
        <strong class="pl-1">Endereço:</strong>
      </p>
      <p class="pl-3">{{ row.buyer.adress_street }}</p>
      <p class="d-flex align-items-center">
        <i class="ni ni-bold-down"></i>
        <strong class="pl-1">CEP:</strong>
      </p>
      <p class="pl-3">{{ row.buyer.adress_cep }}</p>
      <p class="d-flex align-items-center">
        <i class="ni ni-bold-down"></i>
        <strong class="pl-1">Cidade:</strong>
      </p>
      <p class="pl-3">{{ row.buyer.adress_city }}</p>
      <p class="d-flex align-items-center">
        <i class="ni ni-bold-down"></i>
        <strong class="pl-1">Estado:</strong>
      </p>
      <p class="pl-3">{{ row.buyer.adress_state }}</p>
      <p class="d-flex align-items-center">
        <i class="ni ni-bold-down"></i>
        <strong class="pl-1">Recebedor:</strong>
      </p>
      <p class="pl-3">{{ row.buyer.receiver }}</p>
      <p class="d-flex align-items-center">
        <i class="ni ni-bold-down"></i>
        <strong class="pl-1">Telefone:</strong>
      </p>
      <p class="pl-3">{{ row.buyer.phone }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PedidoComprador',
  props: {
    row: {
      type: Object,
      default: null
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
