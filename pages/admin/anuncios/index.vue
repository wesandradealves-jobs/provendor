<template>
  <prd-page :fetch="fetchAnuncios">
    <template v-slot:filters>
      <prd-filter-list>
        <prd-filter-tag
          placeholder="Filtrar por status"
          :options="filterAdsStatus"
          field="status"
          @addFilter="addFilter"
        />
        <prd-filter-text
          placeholder="Buscar por titulo ou sku"
          :kinds="kindsFilterText"
          @addFilter="addFilter"
        />
      </prd-filter-list>
    </template>

    <prd-data-grid
      :data="data"
      :meta="meta"
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
        label="Produto"
        min-width="220px"
        prop="title"
        sortable="custom"
      >
        <template v-slot="{ row }">
          <prd-product-ads :item="row" />
        </template>
      </el-table-column>

      <el-table-column
        label="Marketplace"
        min-width="220px"
        prop="origin"
        sortable="custom"
      >
        <template v-slot="{ row }">
          <prd-market-ads :item="row" />
        </template>
      </el-table-column>

      <el-table-column label="Ações" min-width="220px" prop="origin">
        <template v-slot="{ row }">
          <prd-actions-ads :item="row" />
        </template>
      </el-table-column>
    </prd-data-grid>
  </prd-page>
</template>
<script>
import { Loading, TableColumn } from 'element-ui'
import PrdFilterList from '@/components/shared/filters/FilterList'
import PrdFilterText from '@/components/shared/filters/FilterText'
import PrdFilterTag from '@/components/shared/filters/FilterTag'
import PrdDataGrid from '@/components/shared/grid/DataGrid'
import { mapActions, mapState } from 'vuex'
import PrdProductAds from '~/components/ads/Product'
import PrdMarketAds from '~/components/ads/Market'
import PrdActionsAds from '~/components/ads/Actions'
import PrdPage from '~/components/shared/ProvendorPage'

export default {
  name: 'Anuncios',
  components: {
    [Loading.name]: Loading,
    [TableColumn.name]: TableColumn,
    PrdFilterList,
    PrdFilterText,
    PrdFilterTag,
    PrdDataGrid,
    PrdProductAds,
    PrdMarketAds,
    PrdActionsAds,
    PrdPage
  },
  layout: 'SidebarLayout',
  data: () => ({
    fullscreenLoading: true,
    kindsFilterText: { number: ['sku'], text: ['title'] }
  }),
  computed: {
    ...mapState({
      data: state => state.ads.list,
      meta: state => state.ads.meta,
      filterAdsStatus: state => state.selects.filterAdsStatus
    })
  },
  mounted() {
    this.clearFilters()
    this.fetchAnuncios()
  },
  methods: {
    ...mapActions('ads', [
      'getList',
      'addFilter',
      'changeSort',
      'changePage',
      'changeRowPerPage',
      'clearFilters'
    ]),
    async fetchAnuncios() {
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
