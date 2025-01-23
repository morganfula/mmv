import { apiEndpoint, repositoryName } from "./slicemachine.config.json";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ["@nuxtjs/prismic"],

  prismic: {
    endpoint: apiEndpoint || repositoryName
  },

  css: [
    '@/assets/scss/default.scss'
  ],

  imports: {
    dirs: ['utils', 'store']
  },
})