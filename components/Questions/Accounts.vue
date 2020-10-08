<template>
  <card class="no-border-card mt-4">
    <h3>Selecionar conta</h3>
    <div class="d-flex">
      <el-select
        v-if="selects.accounts"
        v-model="selects.accounts"
        class="select-danger"
        placeholder="Selecione uma ou mais contas"
        style="width: 100%;"
        multiple
      >
        <el-option
          v-for="option in selects.selectAccount"
          :key="option.label"
          class="select-danger"
          :value="option.value"
          :label="option.label"
        >
          <template slot="prefix">X</template>
        </el-option>
      </el-select>
    </div>
  </card>
</template>

<script>
import { Select, Option } from 'element-ui'
export default {
  name: 'Accounts',
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  props: {
    selects: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped></style>
