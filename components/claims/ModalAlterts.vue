<template>
  <el-dialog
    title="Alerta"
    :before-close="closeModal"
    :visible.sync="dialogAlert"
    width="40%"
  >
    <p>Essa ação so pode ser feita na pagina do Mercado Livre!</p>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closeModal">
        Fechar
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
import { Dialog, Button } from 'element-ui'
export default {
  name: 'ModalAlerts',
  components: {
    [Dialog.name]: Dialog,
    [Button.name]: Button
  },
  props: {
    titleAction: {
      type: String,
      default: null
    },
    dialogAlert: {
      type: Boolean,
      default: null
    }
  },
  methods: {
    closeModal() {
      let dialogAlert = this.dialogAlert
      dialogAlert = false
      this.$emit('change-dialog-alert', dialogAlert)
    }
  }
}
</script>

<style></style>
