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
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'description', hid: 'description', content: 'みんなの63は、スクリーンショットから自動解析できるポケモンの選出投稿サイトです。プレイログに、型の調査に、クイズによる選出の訓練に、幅広くご利用いただけます。' },
      { name: 'viewport', hid: 'viewport', content: 'width=device-width' },
      { name: 'viewport', content: 'width=1024' },
      { property: 'og:locale', hid: 'og:locale', content: 'ja_JP' },
      { property: 'og:type', hid: 'og:type', content: 'website' },
      { property: 'og:title', hid: 'og:title', content: 'みんなの63 - スクリーンショットから自動解析できるポケモンの選出投稿サイト' },
      { property: 'og:description', hid: 'og:description', content: 'みんなの63は、スクリーンショットから自動解析できるポケモンの選出投稿サイトです。プレイログに、型の調査に、クイズによる選出の訓練に、幅広くご利用いただけます。' },
      { property: 'og:site_name', hid: 'og:site_name', content: 'みんなの63 - スクリーンショットから自動解析できるポケモンの選出投稿サイト' },
      { name: 'twitter:card', hid: 'twitter:card', content: 'summary_large_image' },
      { property: 'og:url', hid: 'og:url', content: 'https://pokedri.com/pokemon63/' },
      { property: 'og:image', hid: 'og:image', content: 'https://pokedri.com/pokemon63/static/images/opengraph.png' },
      { property: 'og:image:secure_url', hid: 'og:image:secure_url', content: 'https://pokedri.com/pokemon63/static/images/opengraph.png' },
      { name: 'twitter:description', hid: 'twitter:description', content: 'みんなの63は、スクリーンショットから自動解析できるポケモンの選出投稿サイトです。プレイログに、型の調査に、クイズによる選出の訓練に、幅広くご利用いただけます。' },
      { name: 'twitter:title', hid: 'twitter:title', content: 'みんなの63 - スクリーンショットから自動解析できるポケモンの選出投稿サイト' },
      { name: 'twitter:image', hid: 'twitter:image', content: 'https://pokedri.com/pokemon63/static/images/opengraph.png' },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap' },
      { rel: 'icon', type: 'image/png', href: '/pokemon63/static/favicon.png' }
    ],
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
  plugins: ['~/plugins/firebase.ts', '~/plugins/register.ts', '~/plugins/userRecord.ts'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // 'nuxt-purgecss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'portal-vue/nuxt',
    'nuxt-basic-auth-module'
  ],
  /*
   ** Build configuration
   */
  purgeCSS: {
    enabled: true,
    mode: 'postcss',
    paths: [
      'components/**/*.vue',
      'components/**/*.tsx',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.ts'
    ],
    whitelist: ['body', 'html', 'nuxt-progress', 'nuxt-link-active'],
    whitelistPatterns: [/mb-.+/],
    extractors: [
      {
        extractor: (content: string) => content.match(/[A-z0-9-:\\/]+/g) || [],
        extensions: ['vue', 'js', 'tsx', 'ts']
      }
    ]
  },
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
