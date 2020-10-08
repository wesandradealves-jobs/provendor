<template>
  <prd-page :fetch="fetchProducts">
    <template v-slot:filters>
      <prd-filter-list>
        <prd-filter-text
          placeholder="Buscar por nome ou Sku"
          :kinds="kindsFilterText"
          @addFilter="addFilter"
        />
      </prd-filter-list>
    </template>
    <collapse class="mt-4">
      <collapse-item name="1">
        <h2 slot="title" class="mb-0">Como estão nossos produtos?</h2>
        <!-- Card stats -->
        <div class="row">
          <div class="col-xl-3 col-md-6">
            <stats-card
              title="estoque zerado ou inativo"
              type="gradient-red"
              sub-title="45"
            >
              <template slot="footer">
                <span class="text-success">
                  <i class="fas fa-info-circle" />
                </span>
              </template>
            </stats-card>
          </div>
          <div class="col-xl-3 col-md-6">
            <stats-card
              title="menos de 7 dias de estoque "
              type="gradient-red"
              sub-title="22"
            >
              <template slot="footer">
                <span class="text-success">
                  <i class="fas fa-info-circle" />
                </span>
              </template>
            </stats-card>
          </div>
          <div class="col-xl-3 col-md-6">
            <stats-card
              title="produto com alto indice de reclamaçoes"
              type="gradient-red"
              sub-title="11"
            >
              <template slot="footer">
                <span class="text-success">
                  <i class="fas fa-info-circle" />
                </span>
              </template>
            </stats-card>
          </div>
          <div class="col-xl-3 col-md-6">
            <stats-card
              title="produtos de giro lento"
              type="gradient-red"
              sub-title="12"
            >
              <template slot="footer">
                <span class="text-success">
                  <i class="fas fa-info-circle" />
                </span>
              </template>
            </stats-card>
          </div>
        </div>
      </collapse-item>
    </collapse>
    <div class="content">
      <div class=""></div>
      <no-ssr>
        <prd-data-grid
          :data="data"
          :meta="meta"
          :selected-rows="selectedRows"
          @change-selected-rows="selectedRows = $event"
          @changePage="changePage"
          @changeSort="changeSort"
          @changeRowsPerPage="changeRowPerPage"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            label="produto"
            min-width="210px"
            prop="name"
            sortable
          >
            <template v-slot="{ row }">
              <div class="d-flex justify-content-start">
                <div>
                  <a href="#">
                    <img
                      class="mr-2 img-fluid product-photo"
                      alt="foto produto"
                      :src="row.main_picture"
                    />
                  </a>
                </div>
                <div class="d-flex align-items-center">
                  <span class="font-weight-600 name mb-0 text-sm">{{
                    row.title
                  }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="estoque" prop="available_quantity" />
          <el-table-column label="indicadores" min-width="160px" prop="metrics">
            <template slot-scope="{ $index, row }">
              <div class="media d-flex flex-column">
                <div d-flex justify-content>
                  <el-tooltip
                    :content="`comparado ao mês anterior`"
                    placement="right"
                  >
                    <badge
                      :type="`${badgeType(
                        row.metrics.total_sells_last_30_days,
                        row.metrics.total_sells_last_month
                      )}`"
                    >
                      <i
                        :class="`fas fa-arrow-${arrowType(
                          row.metrics.total_sells_last_30_days,
                          row.metrics.total_sells_last_month
                        )}`"
                      />
                      <span>
                        {{
                          row.metrics.total_sells_last_30_days
                            | formatPercentage(
                              row.metrics.total_sells_last_month
                            )
                        }}
                        % de crescimento de vendas`
                      </span>
                    </badge>
                  </el-tooltip>
                </div>
                <div d-flex justify-content>
                  <el-tooltip
                    :content="`nos ultimos 30 dias. No ultimo mês ${
                      Math.round(
                        (row.metrics.total_sells_last_month / 30) * 10
                      ) / 10
                    }`"
                    placement="right"
                  >
                    <badge
                      :type="`${badgeType(
                        row.metrics.total_sells_last_30_days,
                        row.metrics.total_sells_last_month
                      )}`"
                    >
                      <i
                        :class="`fas fa-arrow-${arrowType(
                          row.metrics.total_sells_last_30_days,
                          row.metrics.total_sells_last_month
                        )}`"
                      />
                      <span>
                        {{
                          Math.round(
                            (row.metrics.total_sells_last_30_days / 30) * 10
                          ) / 10
                        }}
                        vendas/dia na media
                      </span>
                    </badge>
                  </el-tooltip>
                </div>
                <div d-flex justify-content>
                  <el-tooltip
                    :content="`prazo estimado que esse produto ficará sem estoque, referencia 15 dias`"
                    placement="right"
                  >
                    <badge
                      :type="`${
                        row.metrics.total_sells_last_30_days / 2 >=
                        row.available_quantity
                          ? `warning`
                          : `info`
                      }`"
                    >
                      <i
                        :class="`fas fa-arrow-${
                          row.metrics.total_sells_last_30_days / 2 >=
                          row.available_quantity
                            ? `down`
                            : `up`
                        }`"
                      />
                      <span
                        v-if="
                          row.available_quantity &&
                          row.metrics.total_sells_last_30_days
                        "
                      >
                        {{
                          Math.round(
                            ((row.available_quantity /
                              (row.metrics.total_sells_last_30_days / 30)) *
                              10) /
                              10
                          )
                        }}
                        dias para acabar estoque
                      </span>
                      <span v-else>Sem estoque</span>
                    </badge>
                  </el-tooltip>
                </div>
                <div d-flex justify-content>
                  <el-tooltip
                    :content="`mercado livre aceita até 3% de devoluçào`"
                    placement="right"
                  >
                    <badge
                      :type="`${
                        row.metrics.return_costs >= 3 ? `warning` : `info`
                      }`"
                    >
                      <i
                        :class="`fas fa-arrow-${
                          row.metrics.return_costs >= 3 ? `down` : `up`
                        }`"
                      />
                      <span>
                        {{ row.metrics.return_costs }} % das vendas são
                        devolvidas`
                      </span>
                    </badge>
                  </el-tooltip>
                </div>
                <div d-flex justify-content>
                  <badge type="primary">
                    <span> {{ row.metrics.sells_ranking }}° mais vendido </span>
                  </badge>
                </div>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="sku" prop="sku" sortable />
          <el-table-column label="anuncios">
            <div class="avatar-group">
              <a
                href="#"
                class="avatar avatar-sm rounded-circle"
                data-toggle="tooltip"
                data-original-title="Mercado Livre"
              >
                <img
                  alt="Image placeholder"
                  src="/img/brand/mercado-livre-logo.png"
                />
              </a>
              <a
                href="#"
                class="avatar avatar-sm rounded-circle"
                data-toggle="tooltip"
                data-original-title="b2w"
              >
                <img alt="Image placeholder" src="/img/brand/b2w.png" />
              </a>
              <a
                href="#"
                class="avatar avatar-sm rounded-circle"
                data-toggle="tooltip"
                data-original-title="magazine luiza"
              >
                <img
                  alt="Image placeholder"
                  src="/img/brand/magazine-luiza-logo.png"
                />
              </a>
              <a
                href="#"
                class="avatar avatar-sm rounded-circle"
                data-toggle="tooltip"
                data-original-title="amazon"
              >
                <img alt="Image placeholder" src="/img/brand/amazon.png" />
              </a>
            </div>
          </el-table-column>
          <el-table-column label="preço" prop="price" sortable>
            <template v-slot="{ row }">
              <span class="font-weight-600 name mb-0 text-sm">
                {{ row.price | formatPrice }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="modificar">
            <template>
              <el-dropdown trigger="click" class="dropdown">
                <span class="btn btn-sm btn-icon-only text-light">
                  <i class="fas fa-ellipsis-v mt-2" />
                </span>
                <el-dropdown-menu
                  slot="dropdown"
                  class="dropdown-menu dropdown-menu-arrow show"
                >
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">
                    Something else here
                  </a>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </prd-data-grid>
      </no-ssr>
    </div>
  </prd-page>
</template>
<script>
import {
  Table,
  TableColumn,
  Select,
  Option,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from 'element-ui'
import PrdDataGrid from '@/components/shared/grid/DataGrid'
import PrdFilterList from '@/components/shared/filters/FilterList'
import PrdFilterText from '@/components/shared/filters/FilterText'
import PrdPage from '~/components/shared/ProvendorPage'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    PrdPage,
    PrdFilterList,
    PrdFilterText,
    PrdDataGrid,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu
  },
  layout: 'SidebarLayout',
  data() {
    return {
      kindsFilterText: {
        number: ['sku'],
        text: ['title']
      },
      fullscreenLoading: true,
      selectedRows: []
    }
  },
  computed: {
    ...mapState({
      data: state => state.products.list,
      meta: state => state.products.meta
    })
  },
  mounted() {
    this.clearFilters()
  },

  methods: {
    ...mapActions('products', [
      'getList',
      'addFilter',
      'changeSort',
      'changePage',
      'changeRowPerPage',
      'clearFilters'
    ]),
    async fetchProducts() {
      try {
        await this.getList()
      } catch (err) {
        console.error(err)
      } finally {
        this.fullscreenLoading = false
      }
    },
    selectionChange(selectedRows) {
      this.selectedRows = selectedRows
    },
    arrowType(currentMonth, last30Days) {
      if (currentMonth / last30Days > 1) {
        return `up`
      } else {
        return `down`
      }
    },
    badgeType(currentMonth, last30Days) {
      if (currentMonth / last30Days > 1) {
        return `info`
      } else {
        return `warning`
      }
    },
    percentage(currentMonth, last30Days) {
      return Math.trunc((currentMonth / last30Days - 1) * 100)
    }
  }
}
</script>
<style scoped>
.no-border-card .card-footer {
  border-top: 0;
}
.product-photo {
  width: 4rem;
  height: 6rem;
}
</style>
