import { apiEndpoint, repositoryName } from "./slicemachine.config.json";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ["@nuxtjs/prismic", '@nuxtjs/color-mode'],

app: {
        head: {
            title: 'Montreux Media Ventures',
            htmlAttrs: {
                lang: 'en',
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'description', content: 'Where Music Meets Innovation, Shaping the Future.' },
                { name: 'theme-color', content: '#000000' },
                { property: 'og:type', content: 'website' },
                { property: 'og:site_name', content: 'Montreux Media Ventures' },
                { property: 'og:image', content: '/default-og.jpg' }, // fallback OG image
            ],
            link: [
                { rel: 'icon', href: '/favicon.ico' },
            ],
        },

    pageTransition: { name: 'page', mode: 'out-in' }
    },
  
     colorMode: {
    preference: 'light',   // thème par défaut
    fallback: 'light',     // si le navigateur ne supporte pas prefers-color-scheme
    classSuffix: ''        // ajoute .light ou .dark sur <html>
  },

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