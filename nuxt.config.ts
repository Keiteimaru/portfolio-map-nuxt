export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,

  runtimeConfig: {
    public: {
      mapboxAccessToken: String(process.env.MAPBOX_ACCESS_TOKEN || '')
    }
  },

  devServer: {
    port: Number(process.env.NUXT_PORT || 3000),
    host: String(process.env.NUXT_HOST || 'localhost')
  },

  app: {
    head: {
      title: '川西案内センター',
      htmlAttrs: {
        lang: 'ja',
      },
      meta: [
        { charset: 'UTF-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { name: 'description', content: '現在鋭意製作中です。しばらくお待ちください。' },
        { name: 'robots', content: 'noindex, nofollow' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
      ]
    },
  },

  css: [
    '~/assets/styles/main.scss',
    '@fontsource/noto-sans-jp/400.css',
    '@fontsource/noto-sans-jp/700.css',
    '@fontsource/poppins/400.css',
    '@fontsource/poppins/700.css',
    'material-symbols/rounded.css',
    'mapbox-gl/dist/mapbox-gl.css',
    'swiper/css',
    'swiper/css/pagination'
  ]
})