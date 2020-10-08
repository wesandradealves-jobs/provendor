<template>
  <card class="no-border-card mt-4" body-classes="p-0">
    <!-- Modal Frete -->
    <modal-frete :modals="modals" @close-modal="modals = $event"></modal-frete>
    <!--  -->

    <ul class="list-group">
      <li
        class="list-group-item button d-flex align-items-center justify-content-between"
      >
        <div>
          <i class="ni ni-ruler-pencil mr-3"></i>
          Anotações
        </div>
        <div>
          <span
            v-if="question"
            :class="`badge-circle ${statusActions(question.ad.anotations)}`"
          ></span>
        </div>
      </li>
      <li
        class="list-group-item button button d-flex align-items-center justify-content-between"
      >
        <div>
          <i class="fas fa-running mr-3"></i>
          Respostas Rápidas
        </div>
        <div>
          <span :class="`badge-circle ${statusActions()}`"></span>
        </div>
      </li>
      <li
        class="list-group-item button button d-flex align-items-center justify-content-between"
      >
        <div>
          <i class="fas fa-robot mr-3"></i>
          Respostas Automáticas
        </div>
        <div>
          <span :class="`badge-circle ${statusActions()}`"></span>
        </div>
      </li>
      <li
        class="list-group-item button button d-flex align-items-center justify-content-between"
        @click="modals = true"
      >
        <div>
          <i class="fas fa-shipping-fast mr-3"></i>
          Frete
        </div>
        <div>
          <span :class="`badge-circle ${statusActions()}`"></span>
        </div>
      </li>
      <li
        class="list-group-item button button d-flex align-items-center justify-content-between"
      >
        <div>
          <i class="fas fa-bars mr-3"></i>
          Meus Anúncios
        </div>
        <div>
          <span :class="`badge-circle ${statusActions()}`"></span>
        </div>
      </li>
      <li
        class="list-group-item button button d-flex align-items-center justify-content-between"
      >
        <div>
          <i class="fas fa-swatchbook mr-3"></i>
          Variações
        </div>
        <div>
          <span :class="`badge-circle ${statusActions()}`"></span>
        </div>
      </li>
      <li
        class="list-group-item button button d-flex align-items-center justify-content-between"
      >
        <div>
          <i class="fas fa-undo mr-3"></i>
          Perguntas Anteriores
        </div>
        <div>
          <span :class="`badge-circle ${statusActions()}`"></span>
        </div>
      </li>
    </ul>
  </card>
</template>

<script>
import modalFrete from '../../components/Questions/modalFrete'
export default {
  name: 'Actions',
  components: {
    modalFrete
  },
  props: {
    question: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      modals: false
    }
  },
  methods: {
    statusActions(action) {
      if (action) return 'badge-green-brand'
    }
  }
}
</script>

<style scoped>
.button:hover {
  background: #60a99e;
  color: #fff;
}
</style>
