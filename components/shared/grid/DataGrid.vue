<template>
  <section class="prd-data-grid-component">
    <div>
      <card
        class="no-border-card mt-4"
        body-classes="px-0 pb-0"
        footer-classes="pb-2"
      >
        <div
          class="d-flex justify-content-between align-items-center px-3 pb-3"
        >
          <div class="d-flex flex-column">
            <div class="d-flex">
              <p>
                Mostrando de {{ initialRegister }} até {{ toRegister }} produtos
                de um total de {{ total }} produtos
              </p>
            </div>
            <div v-if="selectedRows">
              <p class="">{{ selectedRows.length }} produtos selecionados</p>
            </div>
          </div>
          <div>
            <label>Items por página</label>
            <el-select
              :value="meta.pagination.perPage"
              class="select-primary pagination-select"
              placeholder="Per page"
              size="small"
              style="width: 80px;"
              @change="changeItensPerPage"
            >
              <el-option
                v-for="item in [50, 100, 200]"
                :key="item"
                class="select-primary"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </div>
        </div>

        <template slot="header"></template>
        <div>
          <el-table
            class="table-responsive table-flush"
            align="left"
            :data="data"
            row-key="id"
            header-row-class-name="thead-light"
            @sort-change="changeSort"
            @selection-change="selectRows"
          >
            <slot></slot>
          </el-table>
        </div>
        <div slot="footer" class="d-flex justify-content-end">
          <base-pagination
            :value="page"
            class="pagination-no-border"
            :per-page="rowsPerPage"
            :total="total"
            @change="handleCurrentChange"
          ></base-pagination>
        </div>
      </card>
    </div>
  </section>
</template>

<script>
import { Table, TableColumn, Select, Option, Loading } from 'element-ui'
import { BasePagination } from '@/components/argon-core'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'PrdDataGrid',
  components: {
    BasePagination,
    [Select.name]: Select,
    // [Pagination.name]: Pagination,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Loading.name]: Loading
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    meta: {
      type: Object,
      required: true
    },
    selectedRows: {
      type: Array,
      required: true
    }
  },
  computed: {
    total() {
      return this.meta.pagination.total
    },
    rowsPerPage() {
      return this.meta.pagination.perPage
    },
    page() {
      return this.meta.pagination.currentPage
    },
    initialRegister() {
      const initialRegister = this.rowsPerPage * (this.page - 1)
      return initialRegister + 1
    },
    toRegister() {
      return this.initialRegister + this.rowsPerPage - 1
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit('changePage', val)
    },
    changeSort(e) {
      if (!e.order) {
        this.$emit('changeSort', {
          field: 'createdAt',
          direction: 'desc'
        })
        return
      }

      this.$emit('changeSort', {
        field: e.prop,
        direction: e.order === 'ascending' ? 'asc' : 'desc'
      })
    },
    changeItensPerPage(e) {
      this.$emit('changeRowsPerPage', e)
    },
    async fetchPedidos() {
      try {
        // const res = await this.$axios.$get('ads')
        this.tableData = []
        this.fullscreenLoading = false
      } catch (err) {
        console.error(err)
      }
    },

    selectAction() {
      if (this.handleActions === 'Alterar status') this.modals = true
    },

    addTypedQuery() {
      this.searchFilter.searchString = this.busca
    },

    formatDate(date) {
      const newDate = new Date(date)
      return newDate.toLocaleDateString()
    },

    selectRows(selectedRows) {
      let changeSelectedRows = this.selectedRows
      changeSelectedRows = selectedRows.map(pedido => pedido)
      this.$emit('change-selected-rows', changeSelectedRows)
    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
}
</style>
