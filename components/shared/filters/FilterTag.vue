<template>
  <div class="d-flex flex-column" style="width: 100%;">
    <el-select
      v-model="value"
      class="select-primary multiple-select"
      :multiple="multiple"
      :placeholder="placeholder"
      clearable
      @change="changeData"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui'

export default {
  name: 'FilterTag',
  components: {
    [Select.name]: Select,
    [Option.name]: Option
  },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    field: {
      type: String,
      required: true
    }
  },
  data: () => ({
    value: null
  }),
  methods: {
    changeData(value) {
      if (!this.multiple) {
        this.$emit('addFilter', {
          field: this.field,
          operation: '=',
          value
        })
        return
      }

      for (const value in this.value) {
        this.$emit('addFilter', {
          field: this.field,
          operation: '=',
          value
        })
      }
    }
  }
}
</script>
