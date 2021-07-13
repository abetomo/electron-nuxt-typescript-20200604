const baseDir = process.env.BASE_DIR || '/'

module.exports = { // eslint-disable-line
  ssr: false,
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      // Doc: https://buefy.github.io/#/documentation
      'nuxt-buefy',
      {
        materialDesignIconsHRef:
          'https://cdn.materialdesignicons.com/5.0.45/css/materialdesignicons.min.css',
      },
    ],
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {} // eslint-disable-line
  },
  // dev mode
  dev: process.env.NODE_ENV === 'dev',
  router: {
    base: baseDir,
    mode: 'hash',
  },
  // nuxt/telemetry#opting-out
  telemetry: false,
}
