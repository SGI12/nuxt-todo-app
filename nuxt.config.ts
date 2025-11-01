export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@pinia/nuxt'],

  components: [
    {
      path: '~/components/ui',
      pathPrefix: false
    },
    {
      path: '~/components/features',
      pathPrefix: false
    },
    {
      path: '~/components',
      pathPrefix: false
    }
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Notes App - Управление заметками',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'SPA приложение для управления заметками с Todo списками' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  ssr: false,

  typescript: {
    strict: true,
    typeCheck: true
  },

  compatibilityDate: '2024-04-03'
})
