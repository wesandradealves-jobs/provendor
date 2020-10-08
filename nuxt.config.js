const packageJson = require('./package.json')

const appData = {
  name: packageJson.name || '?',
  version: packageJson.version || '0'
}

process.env.APP_DATA = encodeURIComponent(JSON.stringify(appData))

module.exports = {
  mode: 'universal',
  router: {
    base: '/',
    linkExactActiveClass: 'active',
    middleware: ['auth']
  },
  /* server: {
  port: 8000, // default: 3000
  host: `localhost` //'0.0.0.0'  default: localhost
},
/*
** Headers of the page
*/
  head: {
    title: 'Provendor',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Provendor Gerenciador de Vendas'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: 'favicon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css',
        integrity:
          'sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/',
        crossorigin: 'anonymous'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: ['assets/css/nucleo/css/nucleo.css', 'assets/sass/argon.scss'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/dashboard/dashboard-plugin',
    '~/plugins/axios',
    // { src: '~/plugins/dashboard/full-calendar', ssr: false },
    // { src: '~/plugins/dashboard/world-map', ssr: false },
    { src: '~/plugins/storage.js', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    host: 'ubuntu@ec2-107-22-18-40.compute-1.amazonaws.com',
    port: 8080
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vee-validate/dist/rules'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    extractCSS: process.env.NODE_ENV === 'production',
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    }
  }
}
