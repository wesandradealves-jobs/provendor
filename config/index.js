const appData = JSON.parse(decodeURIComponent(process.env.APP_DATA || '%7B%7D'))
export const isProduction = process.env.NODE_ENV === 'production'
export const name = appData.name || 'Provendor'
export const version = appData.version || '0'

export default {
  isProduction,
  name,
  version,
  app: {
    url: `${process.env.VUE_APP_BASE_URL || 'https://provendor.com.br'}`
  }
}
