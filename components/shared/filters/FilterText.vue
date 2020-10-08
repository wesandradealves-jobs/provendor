<template>
  <div class="mr-2" style="width: 100%;">
    <base-input
      v-model="value"
      append-icon="fas fa-search"
      success-message="¨true¨"
      :placeholder="placeholder"
      @change="changeData"
    ></base-input>
  </div>
</template>

<script>
import BaseInput from '@/components/argon-core/Inputs/BaseInput'

export default {
  name: 'FilterText',
  components: {
    BaseInput
  },
  props: {
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    kinds: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    value: null
  }),
  methods: {
    changeData() {
      if (this.kinds.number && Number(this.value)) {
        return this.addFilter(this.kinds.number, Number(this.value), '=')
      } else if (this.kinds.text && !Number(this.value) && this.value) {
        return this.addFilter(this.kinds.text, this.value.toString(), 'like')
      }

      this.resetFilters()
    },
    resetFilters() {
      this.addNumberFilter(this.kinds.number, '')
      this.addTextFilter(this.kinds.text, '')
    },
    addFilter(fields, value, operation) {
      if (fields.length === 0) {
        this.$emit('addFilter', {
          operation,
          value: value,
          field: fields[0]
        })
        return
      }

      const values = []
      for (const field of fields) {
        values.push({
          operation,
          value: value,
          field
        })
      }

      this.$emit('addFilter', {
        operation: '$or',
        value: values
      })
    }
  }
}
</script>

<style></style>
