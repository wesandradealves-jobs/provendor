import { mountQueryString } from '../../util/httpRequest'
export default {
  async getList({ commit, state }) {
    const queryString = mountQueryString(state.sort, state.filters, state.meta)
    const response = await this.$axios.get(`/claims?${queryString}`)
    commit('ADD_LIST_DATA', response.data)
  },
  addFilter({ commit, dispatch }, data) {
    if (data.field && data.value) {
      commit('ADD_FILTER', data)
      dispatch('getList')
      return
    }

    if (data.field && !data.value) {
      commit('REMOVE_FILTER', data)
      dispatch('getList')
    }
  },
  clearFilters({ commit }) {
    commit('CLEAR_FILTERS')
  },
  changeSort({ commit, dispatch }, data) {
    commit('CHANGE_SORT', data)
    dispatch('getList')
  },
  changePage({ commit, dispatch }, page) {
    commit('CHANGE_PAGE', page)
    dispatch('getList')
  },
  changeRowPerPage({ commit, dispatch }, rowsPerPage) {
    commit('CHANGE_ROWS_PER_PAGE', rowsPerPage)
    dispatch('getList')
  }
}
