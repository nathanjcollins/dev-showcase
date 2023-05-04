export default defineNuxtConfig({
  modules: ['@sidebase/nuxt-auth', '@nuxtjs/tailwindcss'],
  build: {
    transpile: ['trpc-nuxt']
  },
  typescript: {
    shim: false
  },
  tailwindcss: {
    config: {
      plugins: [require('@tailwindcss/typography'), require('daisyui')],
      content: ['./src/**/*.{html,ts,vue}']
    }
  }
})
