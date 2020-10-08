export default function ({ $axios, store }) {
  $axios.onRequest(config => {
    if (store.state.user.credentials) {
      config.headers.common[
        'Authorization'
      ] = `Bearer ${store.state.user.credentials.token}`
    }
  })
}
