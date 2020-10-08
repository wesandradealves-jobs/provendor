<template>
  <collapse class="mt-4">
    <collapse-item name="1">
      <h3 slot="title" class="mb-0">Opções</h3>
      <div class="d-flex flex-column">
        <slot></slot>
      </div>
    </collapse-item>
  </collapse>
</template>

<script>
export default {
  name: 'PrdFilterList',
  data: () => ({
    value: ''
  })
}
</script>

<style></style>
