<template>
  <el-dialog
    :visible.sync="modals"
    :before-close="closeModal"
    title="Calcular Frete"
  >
    <template slot="header"> </template>
    <div class="row">
      <div class="d-flex flex-column">
        <div class="col mb-4">
          <h3>Dimensões do Pacote</h3>
          <div class="d-flex flex-row">
            <div class="d-flex">
              <div class="mr-2">
                <base-input
                  placeholder="Altura"
                  input-classes="form-control-muted"
                ></base-input>
              </div>
              <div class="mr-2">
                <base-input
                  placeholder="Largura"
                  input-classes="form-control-muted"
                ></base-input>
              </div>
              <div class="mr-2">
                <base-input
                  placeholder="Profundidade"
                  input-classes="form-control-muted"
                ></base-input>
              </div>
              <div class="">
                <base-input
                  placeholder="Peso"
                  input-classes="form-control-muted"
                ></base-input>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-start">
          <div class="col-lg-6">
            <h3>CEP</h3>
            <base-input
              placeholder="CEP"
              input-classes="form-control-muted"
            ></base-input>
          </div>
          <div class="col-lg-6">
            <h3>Unidades</h3>
            <base-input
              placeholder="unidades"
              input-classes="form-control-muted"
            ></base-input>
          </div>
        </div>
      </div>
    </div>
    <template slot="footer">
      <base-button v-if="modals" type="secondary" @click="closeModal">
        Fechar
      </base-button>
      <base-button type="primary">Calcular frete</base-button>
    </template>
  </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui'
export default {
  name: 'ModalFrete',
  components: {
    [Dialog.name]: Dialog
  },
  props: {
    modals: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    closeModal() {
      let close = this.modals
      close = false
      this.$emit('close-modal', close)
    }
  }
}
</script>

<style></style>
