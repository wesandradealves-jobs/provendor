<template>
  <prd-page :fetch="fetchPubliciy">
    <template v-slot:filters>
      <prd-filter-list>
        <div>
          <h3 class="mb-2">Buscar</h3>
          <prd-filter-text
            placeholder="Buscar por Titulo do produto"
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
        <el-table-column
          label="Titulo do anúncio"
          min-width="200px"
          prop="Title"
          sortable
        >
          <template v-slot="{ row }">
            <div class="d-flex mt-1" style="height: 310px;">
              <div class="d-flex flex-column">
                <div class="d-flex justify-content-center" style="width: 100%;">
                  <img
                    class="avatar avatar-xl rounded-circle"
                    alt="Image placeholder"
                    :src="row.ad.mainImages"
                  />
                </div>
                <div>
                  <h2 class="mt-3">{{ row.ad.title }}</h2>
                </div>
                <div>
                  <p>Valor: {{ row.ad.price | formatPrice }}</p>
                </div>
                <div>
                  <p>
                    Link: <a :href="row.ad.link">{{ row.ad.link }}</a>
                  </p>
                </div>
                <div class="d-flex align-items-center">
                  <p class="mr-2">Anúncio:</p>
                  <base-switch
                    v-if="row.status"
                    :v-model="(switches = row.status)"
                    :value="showStatus(row.status)"
                  ></base-switch>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="Descrição"
          min-width="230px"
          prop="description"
          sortable
        >
          <template>
            <div style="height: 310px;">
              <ul class="list-group">
                <li
                  class="list-group-item button d-flex justify-content-between"
                >
                  Clicks:
                </li>
                <li
                  class="list-group-item button d-flex justify-content-between"
                >
                  Vendas por publicidade:
                </li>
                <li
                  class="list-group-item button d-flex justify-content-between"
                >
                  Total de vendas:
                </li>
                <li
                  class="list-group-item button d-flex justify-content-between"
                >
                  Custo por click:
                </li>
                <li
                  class="list-group-item button d-flex justify-content-between"
                >
                  Taxa de publicidade:
                </li>
                <li
                  class="list-group-item button d-flex justify-content-between"
                >
                  Custo:
                </li>
              </ul>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          :label="0 | lastMonths"
          min-width="250px"
          prop="currentMonth"
          sortable
        >
          <template v-slot="{ row }">
            <month
              :current-month="row.currentMonth"
              :last-month="row.lastMonth"
              :badge-type="badgeType"
              :arrow-type="arrowType"
            ></month>
          </template>
        </el-table-column>
        <el-table-column
          :label="1 | lastMonths"
          min-width="250px"
          prop="lastMonth"
          sortable
        >
          <template v-slot="{ row }">
            <month
              :current-month="row.lastMonth"
              :last-month="row.beforeLastMonth"
              :badge-type="badgeType"
              :arrow-type="arrowType"
            ></month>
          </template>
        </el-table-column>
        <el-table-column
          :label="2 | lastMonths"
          min-width="130px"
          prop="beforeLastMonth"
          sortable
        >
          <template v-slot="{ row }">
            <month
              :current-month="row.beforeLastMonth"
              :last-month="row.before"
              :badge-type="badgeType"
              :arrow-type="arrowType"
            ></month>
          </template>
        </el-table-column>
      </prd-data-grid>
    </client-only>
  </prd-page>
</template>

<script>
import { Table, TableColumn, Switch } from 'element-ui'
import PrdPage from '@/components/shared/ProvendorPage'
import PrdDataGrid from '@/components/shared/grid/DataGrid'
import PrdFilterList from '@/components/shared/filters/FilterList'
import PrdFilterText from '@/components/shared/filters/FilterText'
import Month from '@/components/publicity/Month.vue'

import { mapState, mapActions } from 'vuex'
export default {
  name: 'Publicidade',
  components: {
    Month,
    PrdFilterText,
    PrdFilterList,
    PrdDataGrid,
    PrdPage,
    [Switch.name]: Switch,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  layout: 'SidebarLayout',
  data() {
    return {
      selectedRows: [],
      switches: false,
      result: '',
      kindsFilterText: {
        number: [''],
        text: ['ad.title']
      }
    }
  },
  computed: {
    ...mapState({
      data: state => state.publicity.list,
      meta: state => state.publicity.meta
    })
  },

  mounted() {
    this.clearFilters()
  },

  methods: {
    ...mapActions('publicity', [
      'getList',
      'addFilter',
      'changeSort',
      'changePage',
      'changeRowPerPage',
      'clearFilters'
    ]),
    async fetchPubliciy() {
      try {
        await this.getList()
      } catch (err) {
        console.error(err)
      } finally {
        this.fullscreenLoading = false
      }
    },
    showStatus(status) {
      if (status === 'true') {
        return (this.switches = true)
      }
      if (status === 'false') return (this.switches = false)
    },

    arrowType(currentMonth, lastMonth) {
      if (currentMonth === lastMonth) return ''
      if (currentMonth / lastMonth > 1) return `up`
      else return `down`
    },
    badgeType(currentMonth, lastMonth) {
      if (currentMonth === lastMonth) return 'info'
      if (currentMonth / lastMonth > 1) return `info`
      else return `warning`
    }
  }
}
</script>

<style scoped>
.avatar {
  height: 120px;
  width: 120px;
  display: block;
}

p {
  margin: 0;
}

.button {
  font-size: 1rem;
}
.button:hover {
  background: #60a99e;
  color: #fff;
  font-size: 1rem;
}

.list-group-item {
  border-radius: 0;
  padding: 0.8rem;
}
</style>
