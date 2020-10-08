<template>
  <prd-page :fetch="fetchClaims">
    <template v-slot:filters>
      <prd-filter-list>
        <div class="d-flex justify-content-between">
          <div
            style="width: 100%;"
            class="d-flex flex-column justify-content-start mr-4"
          >
            <h3 class="mb-2">Buscar</h3>
            <prd-filter-text
              placeholder="Buscar por nome, nickname ou Nfe"
              :kinds="kindsFilterText"
              @addFilter="addFilter"
            />
          </div>
          <div
            style="width: 100%;"
            class="d-flex flex-column justify-content-end"
          >
            <h3 class="mb-2">Filtrar por status</h3>
            <prd-filter-tag
              placeholder="status"
              :options="claimStatus"
              field="status"
              @addFilter="addFilter"
            />
          </div>
        </div>
      </prd-filter-list>
    </template>
    <div class="row">
      <chatbox
        :data="data"
        :selected="selected"
        @change-selected="selected = $event"
      ></chatbox>
      <actions :data="data" :selected="selected"></actions>
    </div>
  </prd-page>
</template>
<script>
import PrdPage from '~/components/shared/ProvendorPage'
import PrdFilterList from '@/components/shared/filters/FilterList'
import PrdFilterTag from '@/components/shared/filters/FilterTag'
import PrdFilterText from '@/components/shared/filters/FilterText'
import Chatbox from '../../../components/claims/Chatbox'
import Actions from '../../../components/claims/Actions'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Reclamacoes',
  components: {
    Actions,
    Chatbox,
    PrdFilterText,
    PrdPage,
    PrdFilterList,
    PrdFilterTag
  },
  layout: 'SidebarLayout',

  data() {
    return {
      values: { year: 'numeric', month: 'long', day: 'numeric' },
      selected: 0,
      kindsFilterText: {
        number: ['sku'],
        text: ['order.buyerName']
      }
    }
  },
  computed: {
    ...mapState({
      data: state => state.claims.list,
      meta: state => state.claims.meta,
      claimStatus: state => state.selects.claimStatus
    })
  },
  methods: {
    ...mapActions('claims', ['getList', 'addFilter', 'clearFilters']),
    async fetchClaims() {
      try {
        await this.getList()
      } catch (err) {
        console.error(err)
      } finally {
        this.fullscreenLoading = false
      }
    }
  }
}
</script>
<style scoped></style>
