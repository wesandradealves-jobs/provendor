import JWTDecode from 'jwt-decode'

const state = () => ({
  credentials: null
})

export const mutations = {
  SET_USER: (state, account) => {
    state.credentials = account
  },

  UNSET_USER: () => {
    state.credentials = null
  }
}
//TODO validate account
export const actions = {
  async login({ commit }, account) {
    //Get JWT from backend and set to cookie
    const jwtAuthorization = await this.$axios.$post('/auth/login', account)
    const token = jwtAuthorization.access_token
    const { username, uid } = JWTDecode(token)
    // Set user locally
    commit('SET_USER', { username, uid, token })
  },

  async logout({ commit }) {
    commit('UNSET_USER')
    this.$router.push('/')
  }
}
