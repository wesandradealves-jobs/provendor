<template>
  <prd-page :fetch="fetchOrders">
    <template v-slot:filters>
      <prd-filter-list>
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-column">
            <h3 class="mb-2">Filtrar por periodos</h3>
            <base-input addon-left-icon="ni ni-calendar-grid-58">
              <flat-picker
                v-model="dates.range"
                slot-scope="{ focus, blur }"
                :config="config"
                class="form-control datepicker"
                style="width: 200px;"
                @on-open="focus"
                @on-close="blur"
              ></flat-picker>
            </base-input>
          </div>
          <div>
            <h3 class="mb-2">Filtrar por status</h3>
            <prd-filter-tag
              placeholder="status"
              :options="filterStatus"
              field="shipping.status"
              @addFilter="addFilter"
            />
          </div>
          <div class="d-flex flex-column align-items-center">
            <h3 class="mb-2">Ações em massa</h3>
            <el-select
              v-model="handleActions"
              :disabled="selectedRows.length === 0"
              class="select-primary"
              style="width: 150px;"
              placeholder="Opções"
              @change="selectAction"
            >
              <el-option
                v-for="item in ordersStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <h3 class="mb-2">Buscar</h3>
          <prd-filter-text
            placeholder="Buscar por nome, nickname ou Nfe"
            :kinds="kindsFilterText"
            @addFilter="addFilter"
          />
        </div>
      </prd-filter-list>
    </template>
    <client-only>
      <prd-data-grid
        :data="data"
        :meta="meta"
        :selected-rows="selectedRows"
        @change-selected-rows="selectedRows = $event"
        @changePage="changePage"
        @changeSort="changeSort"
        @changeRowsPerPage="changeRowPerPage"
      >
        <el-table-column
          align="left"
          type="selection"
          min-width="40"
        ></el-table-column>

        <el-table-column label="Produto" min-width="220px" prop="nome" sortable>
          <template v-slot="{ row }">
            <product :row="row"></product>
          </template>
        </el-table-column>

        <el-table-column
          label="Marketplace"
          min-width="220px"
          prop="pedido"
          sortable
        >
          <template v-slot="{ row }">
            <market :row="row" :format-status="formatStatus"></market>
          </template>
        </el-table-column>

        <el-table-column
          label="Comprador"
          min-width="150px"
          prop="comprador"
          sortable
        >
          <template v-slot="{ row }">
            <buyer :row="row"></buyer>
          </template>
        </el-table-column>
        <el-table-column label min-width="140px" prop="acao">
          <template v-slot="{ row }">
            <action :row="row"></action>
          </template>
        </el-table-column>
      </prd-data-grid>
    </client-only>

    <!-- Modals -->
    <modal-change-status
      :selected-rows="selectedRows"
      :handle-actions="handleActions"
      :filter-status="filterStatus"
      :format-status="formatStatus"
      :modals="modals"
      @change-modal="modals = $event"
    ></modal-change-status>
    <!--  -->
  </prd-page>
</template>
<script>
import { Table, TableColumn, Select, Option } from 'element-ui'
import PrdDataGrid from '@/components/shared/grid/DataGrid'
import PrdFilterList from '@/components/shared/filters/FilterList'
import PrdFilterTag from '@/components/shared/filters/FilterTag'
import PrdFilterText from '@/components/shared/filters/FilterText'
import PrdPage from '@/components/shared/ProvendorPage'
import Action from '@/components/Pedidos/Actions.vue'
import Buyer from '@/components/Pedidos/Buyer.vue'
import Market from '@/components/Pedidos/Market.vue'
import Product from '@/components/Pedidos/Product.vue'
import modalChangeStatus from '@/components/Pedidos/ModalChangeStatus.vue'
import { Portuguese } from 'flatpickr/dist/l10n/pt.js'
import flatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'Pedidos',
  components: {
    PrdPage,
    flatPicker,
    PrdFilterList,
    PrdFilterTag,
    PrdFilterText,
    PrdDataGrid,
    Action,
    Buyer,
    Market,
    Product,
    modalChangeStatus,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  layout: 'SidebarLayout',
  data: () => ({
    modals: false,
    fullscreenLoading: true,
    dates: {
      range: '2019-07-17 até 2019-07-19'
    },
    config: {
      locale: Portuguese,
      allowInput: true,
      mode: 'range'
    },

    kindsFilterText: {
      number: ['sku'],
      text: ['buyer.name']
    },
    ordersStatus: [
      {
        value: 'Alterar status',
        label: 'Alterar status'
      },
      {
        value: 'Nota fiscal',
        label: 'Nota fiscal'
      },
      {
        value: 'Impressões',
        label: 'Impressões'
      }
    ],
    selectedRows: [],
    handleActions: ''
  }),
  computed: {
    ...mapState({
      data: state => state.orders.list,
      meta: state => state.orders.meta,
      filterStatus: state => state.selects.filterStatus
    })
  },

  watch: {
    modals: function () {
      if (this.modals === false) this.handleActions = ''
    }
  },
  mounted() {
    this.clearFilters()
  },
  methods: {
    ...mapActions('orders', [
      'getList',
      'addFilter',
      'changeSort',
      'changePage',
      'changeRowPerPage',
      'clearFilters'
    ]),
    async fetchOrders() {
      try {
        await this.getList()
      } catch (err) {
        console.error(err)
      } finally {
        this.fullscreenLoading = false
      }
    },

    selectAction() {
      if (this.handleActions === 'Alterar status') this.modals = true
    },

    formatStatus(order) {
      if (order === 'posted') return 'Postado'
      if (order === 'authorizated') return 'Autorizado'
      if (order === 'packed') return 'Embalado'
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
.image-produto {
  min-height: 100px;
  min-width: 100px;
}
.pagination-select {
  width: 80px;
}
.multiple-select {
  width: 200px;
}
input {
  width: 120px;
}
.header-table {
  background: red;
}
strong {
  font-weight: 600;
}
.image {
  width: 125px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
hr {
  margin-top: 0px;
  margin-bottom: 10px;
}
.media {
  height: 38vh;
}
button {
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
}
.nome {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
}
.card-body {
  padding-bottom: 0;
}
.buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.badge-green-brand {
  color: #041f25;
  font-size: 0.8em;
}
.badge-danger {
  font-size: 0.8em;
  margin: 0;
}
.card-produto {
  display: flex;
  flex-direction: column;
}

.titulo-container {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.text-md {
  font-size: 0.9rem;
}

.produto-details {
  display: flex;
  border-radius: 50%;
  padding: 10px;
  border: 1px solid #60a99e;
  color: #041f25;
  align-items: center;
  max-width: 62px;
  min-width: 62px;
  max-height: 62px;
  min-height: 62px;
  justify-content: center;
  flex-direction: column;
  margin: 2px;
}
.produto-details p {
  font-size: 0.65rem;
  padding: 0;
  line-height: 1rem;
  font-weight: 600;
}

input {
  outline: 0;
}

.search-input,
.search-input:focus .search-input:active {
  font: inherit;
  color: #041f25;
  width: 100%;
  border: 0;
  height: 1.1876em;
  margin: 0;
  display: block;
  padding: 6px 0 7px;
  min-width: 0;
  background: none;
  box-sizing: content-box;
  border-bottom: 1px solid #041f25;
  outline: o;
  box-shadow: 0 0 0 0;
}
.search-input:hover {
  border-bottom-width: 1.5px;
}

h3 {
  margin: 0;
}
</style>
