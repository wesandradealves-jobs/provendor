<template>
  <el-dialog
    :visible.sync="modals"
    :before-close="closeModal"
    :title="handleActions"
  >
    <div v-for="(pedido, index) in selectedRows" :key="index">
      <p>
        <strong>Número do pedido: {{ pedido.seller_id }}</strong>
      </p>
      <ul class="list-group mb-2">
        <li class="list-group-item">
          <h4>
            Status do pedido:
            <span class="badge badge-green-brand">{{
              formatStatus(pedido.shipping.status)
            }}</span>
          </h4>
        </li>
      </ul>
    </div>
    <div class="d-flex align-items-center mt-5">
      <div>
        <h4 class="mr-3">Alterar status para:</h4>
      </div>
      <div class="d-flex flex-column">
        <el-select
          v-model="changeStatus"
          class="select-primary multiple-select"
          placeholder="Status do pedido"
        >
          <el-option
            v-for="item in filterStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <template slot="footer">
      <base-button type="secondary" @click="closeModal">
        Fechar
      </base-button>
      <base-button type="primary" @click="saveChanges">
        Salvar alterações
      </base-button>
    </template>
  </el-dialog>
</template>

<script>
import { Select, Option, Dialog } from 'element-ui'
export default {
  name: 'ModalPedido',
  components: {
    [Dialog.name]: Dialog,
    [Select.name]: Select,
    [Option.name]: Option
  },
  props: {
    selectedRows: {
      type: Array,
      default: null
    },
    handleActions: {
      type: String,
      default: null
    },
    filterStatus: {
      type: Array,
      default: null
    },
    formatStatus: {
      type: Function,
      default: null
    },
    modals: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      changeStatus: []
    }
  },

  methods: {
    closeModal() {
      let updateModal = this.modals
      updateModal = false
      this.$emit('change-modal', updateModal)
    },
    saveChanges() {
      const pedidos = this.selectedRows.map(pedido => pedido._id)
      // this.$axios.$put(
      //   `${this.url}/update?${pedidos}=""&shipping.status=${this.changeStatus}`
      // );

      console.log(pedidos, this.changeStatus)
    }
  }
}
</script>

<style></style>
