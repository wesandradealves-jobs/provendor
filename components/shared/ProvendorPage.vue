<template>
  <div
    v-loading.fullscreen.lock="fullscreenLoading"
    class="content"
    element-loading-text="Carregando..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.7)"
  >
    <base-header class="pb-6"></base-header>
    <div class="container-fluid mt--6">
      <nav
        v-if="
          $store.$router.history.current.name !==
          ('admin-usuario' && 'admin-usuario-trocar-senha')
        "
        aria-label="breadcrumb"
        class="d-none d-md-inline-block mt-4"
      >
        <route-breadcrumb></route-breadcrumb>
      </nav>
      <slot name="filters"></slot>
    </div>

    <div class="container-fluid">
      <slot></slot>
    </div>
  </div>
</template>
<script>
// import { Loading } from 'element-ui'

export default {
  name: 'ProvendorPageBase',
  components: {
    // [Loading.name]: Loading
  },
  props: {
    fetch: {
      type: Function,
      required: false,
      default: null
    }
  },
  data: () => ({
    fullscreenLoading: false
  }),
  async mounted() {
    if (this.fetch) {
      this.fullscreenLoading = true

      try {
        await this.fetch()
      } catch (e) {
        console.error(e)
      } finally {
        this.fullscreenLoading = false
      }
    }
  },
  methods: {
    notifySuccess(title, message) {
      Notification.success({
        title: title,
        message: message,
        type: 'success'
      })
    }
  }
}
</script>
<style scoped></style>
