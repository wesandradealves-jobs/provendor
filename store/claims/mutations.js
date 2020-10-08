export default {
  ADD_LIST_DATA(state, payload) {
    state.list = payload.data
    state.meta = payload.meta
  },
  CHANGE_SORT(state, payload) {
    state.sort = payload
  },
  CHANGE_PAGE(state, payload) {
    state.meta.pagination.currentPage = payload
  },
  CHANGE_ROWS_PER_PAGE(state, payload) {
    state.meta.pagination.perPage = payload
  },
  ADD_FILTER(state, payload) {
    if (state.filters && state.filters.length > 0) {
      const index = state.filters.findIndex(i => i.field === payload.field)
      if (state.filters[index]) {
        state.filters[index] = payload
        return
      }
    }
    state.filters.push(payload)
  },
  REMOVE_FILTER(state, payload) {
    const index = state.filters.findIndex(
      filter => filter.field === payload.field
    )
    if (index >= 0) {
      state.filters.splice(index, 1)
    }
  },
  CLEAR_FILTERS(state) {
    state.filters = []
  }
}
