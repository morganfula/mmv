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

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Automatically include utils.scss in every component
          additionalData: '@use "@/assets/scss/utils.scss" as *;',
          // Allow SCSS to resolve imports from node_modules
          includePaths: ['node_modules']
        }
      }
    }
    ,logLevel: 'error'
  },


  imports: {
    dirs: ['utils', 'store']
  },
})