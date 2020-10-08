<template>
  <label class="custom-toggle" :class="switchClass">
    <input v-model="model" type="checkbox" />
    <span
      class="custom-toggle-slider rounded-circle"
      :data-label-off="offText"
      :data-label-on="onText"
    />
  </label>
</template>
<script>
export default {
  name: 'BaseSwitch',
  props: {
    value: {
      default: null,
      type: [Array, Boolean]
    },
    type: {
      default: null,
      type: String
    },
    onText: {
      type: String,
      default: 'ON'
    },
    offText: {
      type: String,
      default: 'OFF'
    }
  },
  computed: {
    switchClass() {
      let baseClass = 'custom-toggle-'
      if (this.type) {
        return baseClass + this.type
      }
      return ''
    },
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    triggerToggle() {
      this.model = !this.model
    }
  }
}
</script>
<style></style>
