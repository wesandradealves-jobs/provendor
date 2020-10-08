<template>
  <div class="card">
    <div class="border-0 card-header">
      <h3 class="mb-0">
        gerenciar integrações
      </h3>
    </div>
    <div class="d-flex justify-content-end">
      <base-button size="sm" class="mb-3" @click="showAddModal = true">
        adicionar conta
      </base-button>
      <modal :show.sync="showAddModal" modal-classes="modal-secondary">
        <div class="form-group">
          <label class="form-control-label d-block mb-3">qual aplicação?</label>
        </div>
        <template>
          <el-select v-model="selected" placeholder="Select">
            <el-option
              v-for="item in options"
              :key="item.value"
              :src="item.src"
              :value="item.value"
            >
              <span style="float: left;">{{ item.value }}</span>

              <img
                style="float: right;"
                class="avatar avatar-sm rounded-circle"
                alt="selecionar integrador"
                :src="`${item.src}`"
              />
            </el-option>
          </el-select>
        </template>

        <template slot="footer">
          <button
            type="button"
            class="btn btn-link ml-auto"
            @click="addIntegration()"
          >
            adicionar conta
          </button>
          <button
            type="button"
            class="btn btn-link ml-auto"
            @click="showAddModal = false"
          >
            Close
          </button>
        </template>
      </modal>
    </div>
    <el-table
      class="table-responsive table-flush"
      header-row-class-name="thead-light"
      :data="accounts"
    >
      <el-table-column label="Contas" prop="name" sortable>
        <template v-slot="{ row }">
          <div class="media align-items-center">
            <a href="#" class="avatar rounded-circle mr-3">
              <img alt="Image placeholder" :src="row.img" />
            </a>
            <div class="media-body">
              <span class="font-weight-600 name mb-0 text-sm">{{
                row.nickname
              }}</span>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="id" prop="id" sortable />
      <el-table-column label="razão social" prop="company_name" sortable />

      <el-table-column label="Status" prop="status" sortable>
        <template v-slot="{ row }">
          <badge class="badge-dot mr-4" type="">
            <i :class="`bg-${row.statusType}`" />
            <span class="status">{{ row.status }}</span>
          </badge>
        </template>
      </el-table-column>
    </el-table>

    <div class="card-footer py-4 d-flex justify-content-end">
      <base-pagination v-model="currentPage" :total="50" />
    </div>
  </div>
</template>
<script>
import {
  Table,
  TableColumn,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Select,
  Option
} from 'element-ui'
import axios from 'axios'
import { Modal } from '@/components/argon-core'
export default {
  layout: 'SidebarLayout',
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    Modal,
    [Select.name]: Select,
    [Option.name]: Option
  },
  data() {
    return {
      accounts: [],

      options: [
        {
          value: 'mercadolivre',
          src: '/img/brand/mercado-livre-logo.png'
        },
        {
          value: 'b2w',
          src: '/img/brand/b2w.png'
        },
        {
          value: 'amazon',
          src: '/img/brand/amazon.png'
        },
        {
          value: 'magazine luiza',
          src: '/img/brand/magazine-luiza-logo.png'
        },
        {
          value: 'bling',
          src: '/img/brand/mercado-livre-logo.png'
        }
      ],
      selected: '',

      currentPage: 1,
      showAddModal: false
    }
  },
  async created() {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    }
    try {
      const res = await axios.get(
        'http://localhost:3001/saved-accounts',
        config
      )
      this.accounts = res.data
    } catch (err) {
      console.log(err)
    }
  },
  mounted() {
    if (this.$route.query.code) {
      axios
        .post('http://localhost:3001/new-meli-account', {
          code: this.$route.query.code
        })
        .then(response => {
          this.accounts = response.data
        })
    }
  },

  methods: {
    addIntegration() {
      if (this.selected === `mercadolivre`) {
        window.location.href =
          'https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=8723507768118534&edirect_uri=http://localhost:3001/gerenciar-integracoes'
      }
    }
  }
}
</script>
