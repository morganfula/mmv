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
    resolve: {
      alias: {
        Lenis: '@studio-freight/lenis'
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
         
          additionalData: '@import "@/assets/scss/utils.scss";',
  
          includePaths: ['node_modules']
        }
      }
    }
    ,logLevel: 'error'
  },


  imports: {
    dirs: ['utils', 'store', 'animations']
  },
})