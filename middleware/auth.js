export default function ({ store, route, redirect }) {
  if (process.client) {
    const user = store.state.user.credentials
    const blockedRoute = /\/admin\/*/g
    const homeRoute = '/'

    if (!user && route.path.match(blockedRoute)) {
      redirect('/')
    }

    if (user && route.path === homeRoute) {
      redirect('/admin')
    }
  }
}
