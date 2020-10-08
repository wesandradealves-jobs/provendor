<template>
  <div
    v-show="active"
    :id="id || title"
    class="tab-pane"
    :class="{ active: active }"
    :aria-expanded="active"
  >
    <slot />
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'TabPane',
  props: ['title', 'id'],
  inject: ['addTab', 'removeTab'],
  data() {
    return {
      active: false
    }
  },
  mounted() {
    this.addTab(this)
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    this.removeTab(this)
  }
}
</script>
<style></style>
