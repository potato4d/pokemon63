import { Configuration } from '@nuxt/types'
require('dotenv').config()

const config: Configuration = {
  srcDir: 'src',
  mode: 'universal',
  server: {
    host: '0.0.0.0',
    port: ~~(process.env.PORT) || 3000,
    timing: false
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'みんなの63 - スクリーンショットから自動解析できるポケモンの選出投稿サイト',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'みんなの63は、スクリーンショットから自動解析できるポケモンの選出投稿サイトです。',
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
  css: ['~/assets/css/common.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/firebase.ts', '~/plugins/register.ts', '~/plugins/userRecord.ts'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'portal-vue/nuxt',
    'nuxt-basic-auth-module'
  ],
  basic: {
    name: 'admin',
    pass: '1234',
    enabled: process.env.NODE_ENV === 'production' // require boolean value(nullable)
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    terser: {
      extractComments: false
    },
    extend: ({ module, output }, { isClient }) => {
      output.globalObject = 'this'

      module.rules.unshift({
        test: /\.worker\.ts$/,
        loader: 'worker-loader',
      })
      module.rules.unshift({
        test: /\.worker\.js$/,
        loader: 'worker-loader',
      })
    },
    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve('@nuxt/babel-preset-app'),
            {
              buildTarget: isServer ? 'server' : 'client',
              corejs: { version: 3 },
            },
          ],
        ]
      },
    },
  },
  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY!,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN!,
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL!,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID!,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET!,
    FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID!,
    FIREBASE_APP_ID: process.env.FIREBASE_APP_ID!,
    FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID || ''
  },
  router: {
    base: '/pokemon63/'
  }
}

export default config
