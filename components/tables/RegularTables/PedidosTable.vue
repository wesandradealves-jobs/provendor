<template>
  <div class="card">
    <div class="border-0 card-header">
      <h3 class="mb-0">
        Mercado Livre
      </h3>
    </div>

    <el-table
      class="table-responsive table-flush"
      header-row-class-name="thead-light"
      :data="queriedData"
    >
      <el-table-column
        label="Produtos"
        min-width="310px"
        prop="produto"
        sortable
      >
        <template v-slot="{ row }">
          <div class="media align-items-center">
            <a href="#" class="avatar rounded-circle mr-3">
              <img alt="Image placeholder" :src="row.image" />
            </a>
            <div class="media-body">
              <p class="font-weight-600 name mb-0 text-sm">
                {{ row.nome }}
              </p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Status" min-width="170px" prop="status" sortable>
        <template v-slot="{ row }">
          <badge class="badge-dot mr-4" type>
            <i v-if="row.tem_estoque" class="bg-success" />
            <i v-else class="bg-danger" />
            <span class="status">Estoque</span>
          </badge>
        </template>
      </el-table-column>
      <el-table-column label="Info" min-width="170px" prop="info" sortable>
        <template v-slot="{ row }">
          <a href="#" class="badge badge-green-brand" @click.prevent>
            Codigo: {{ row.cod }}
          </a>
          <a href="#" class="badge badge-green-brand" @click.prevent>
            Criado: {{ row.criacao }}
          </a>
          <a href="#" class="badge badge-green-brand" @click.prevent>
            Atualizado: {{ row.atualizacao }}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        label="% Devolução"
        min-width="170px"
        prop="PercentageDevolucao"
        sortable
      >
        <template v-slot="{ row }">
          <a href="#" class="badge badge-green-brand" @click.prevent>
            Tarifa de venda: {{ row.tarifa_venda }}
          </a>
          <a href="#" class="badge badge-green-brand" @click.prevent>
            Custo de envio: {{ row.custo_envio }}
          </a>
          <a href="#" class="badge badge-green-brand" @click.prevent>
            Outros custos: {{ row.outros_custos }}
          </a>
          <a href="#" class="badge badge-green-brand" @click.prevent>
            Custo do produto: {{ row.custo_produto }}
          </a>
          <a href="#" class="badge badge-green-brand" @click.prevent>
            A recebar: {{ row.recebera }}
          </a>
        </template>
      </el-table-column>
      <el-table-column label="Preço" min-width="170px" prop="status" sortable>
        <template v-slot="{ row }">
          <badge class="badge-dot mr-4" type>
            <span class="font-weight-600 name mb-0 text-sm">{{
              row.preco
            }}</span>
          </badge>
        </template>
      </el-table-column>

      <!-- <el-table-column label="Users" min-width="190px">
        <div class="avatar-group">
          <a
            href="#"
            class="avatar avatar-sm rounded-circle"
            data-toggle="tooltip"
            data-original-title="Ryan Tompson"
          >
            <img alt="Image placeholder" src="img/theme/team-1.jpg" />
          </a>
          <a
            href="#"
            class="avatar avatar-sm rounded-circle"
            data-toggle="tooltip"
            data-original-title="Romina Hadid"
          >
            <img alt="Image placeholder" src="img/theme/team-2.jpg" />
          </a>
          <a
            href="#"
            class="avatar avatar-sm rounded-circle"
            data-toggle="tooltip"
            data-original-title="Alexander Smith"
          >
            <img alt="Image placeholder" src="img/theme/team-3.jpg" />
          </a>
          <a
            href="#"
            class="avatar avatar-sm rounded-circle"
            data-toggle="tooltip"
            data-original-title="Jessica Doe"
          >
            <img alt="Image placeholder" src="img/theme/team-4.jpg" />
          </a>
        </div>
      </el-table-column>-->
      <!--
      <el-table-column label="Completion" prop="completion" min-width="240px" sortable>
        <template v-slot="{row}">
          <div class="d-flex align-items-center">
            <span class="completion mr-2">{{row.completion}}%</span>
            <div>
              <base-progress :type="row.statusType" :value="row.completion" />
            </div>
          </div>
        </template>
      </el-table-column>-->
      <!-- <el-table-column min-width="180px">
        <template v-slot="{}">
          <el-dropdown trigger="click" class="dropdown">
            <span class="btn btn-sm btn-icon-only text-light">
              <i class="fas fa-ellipsis-v mt-2"></i>
            </span>
            <el-dropdown-menu class="dropdown-menu dropdown-menu-arrow show" slot="dropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>-->
    </el-table>

    <div class="card-footer py-4 d-flex justify-content-end">
      <base-pagination v-model="currentPage" :total="30" />
    </div>
  </div>
</template>
<script>
import api from '~/components/tables/pedidos'
import users from '~/components/tables/users2'
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from 'element-ui'
export default {
  name: 'PedidosTable',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu
  },
  data() {
    return {
      // projects,
      currentPage: 1,
      // pedidos: []
      tableData: users,
      selectedRows: []
    }
  },
  created() {
    this.fetchPedidos()
  },
  methods: {
    fetchPedidos() {
      api.get('/pedidos').then(res => {
        this.tableData = res.data
      })
    }
  }
}
</script>
