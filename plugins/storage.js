import createPersistedState from 'vuex-persistedstate'
import config from './../config'

const storeKey = `${config.name}-v${config.version}`

export default ({ store }) => {
  createPersistedState({
    key: storeKey,
    storage: window.sessionStorage
  })(store)
}
