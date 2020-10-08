<template>
  <div class="card-pedido" style="height: 430px;">
    <base-button
      class="btn btn-outline-green-brand btn-block mt-3 justify-content-start"
    >
      <div>
        <span>
          <i class="ni ni-ungroup"></i>
        </span>
        <span class="ml-1">Multiplicar anúncios</span>
      </div>
    </base-button>

    <base-button
      class="btn btn-outline-green-brand btn-block mt-3 justify-content-start"
    >
      <div>
        <span>
          <i class="ni ni-ungroup"></i>
        </span>
        <span class="ml-1">Devoluções</span>
      </div>
    </base-button>

    <base-button
      class="btn btn-outline-green-brand btn-block mt-3 justify-content-start"
    >
      <div>
        <span>
          <i class="ni ni-ungroup"></i>
        </span>
        <span class="ml-1">Anunciar um igual</span>
      </div>
    </base-button>

    <base-button
      class="btn btn-outline-green-brand btn-block mt-3 justify-content-start"
    >
      <div>
        <span>
          <i class="ni ni-ungroup"></i>
        </span>
        <span class="ml-1">Ver alterações</span>
      </div>
    </base-button>

    <base-button
      class="btn btn-outline-green-brand btn-block mt-3 justify-content-start"
    >
      <div>
        <span>
          <i class="ni ni-ungroup"></i>
        </span>
        <span class="ml-1">Atualizar status</span>
      </div>
    </base-button>

    <base-button
      class="btn btn-outline-green-brand btn-block mt-3 justify-content-start"
    >
      <div>
        <span>
          <i class="ni ni-ungroup"></i>
        </span>
        <span class="ml-1">Info. Fiscais</span>
      </div>
    </base-button>

    <base-button
      class="btn btn-outline-green-brand btn-block mt-3 justify-content-start"
    >
      <div>
        <span>
          <i class="ni ni-ungroup"></i>
        </span>
        <span class="ml-1">Editar dimensões</span>
      </div>
    </base-button>

    <base-button
      class="btn btn-outline-green-brand btn-block mt-3 justify-content-start"
    >
      <div>
        <span>
          <i class="ni ni-ungroup"></i>
        </span>
        <span class="ml-1">Mudar preço pelo concorrente</span>
      </div>
    </base-button>

    <base-button
      class="btn btn-outline-green-brand btn-block mt-3 justify-content-start"
    >
      <div>
        <span>
          <i class="ni ni-ungroup"></i>
        </span>
        <span class="ml-1">Catálogo</span>
      </div>
    </base-button>

    <base-button
      class="btn btn-outline-green-brand btn-block mt-3 justify-content-start"
    >
      <div>
        <span>
          <i class="ni ni-ungroup"></i>
        </span>
        <span class="ml-1">Análise de anúncio</span>
      </div>
    </base-button>
  </div>
</template>

<script>
export default {
  name: 'PrdActionsAds',
  props: {
    item: {
      type: Object,
      default: null
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
