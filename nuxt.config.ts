import { repositoryName } from "./slicemachine.config.json";

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
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
        { property: 'og:image', content: '/default-og.jpg' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  

  prismic: {
    endpoint: repositoryName
  },

  css: [
    '@/assets/scss/default.scss'
  
  ],



  nitro: {
    compressPublicAssets: true,
  },

  experimental: {
    payloadExtraction: false,
  },

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
    },
    logLevel: 'error',
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            gsap: ['gsap'],
            lenis: ['@studio-freight/lenis', 'lenis']
          }
        }
      }
    }
  },


  imports: {
    dirs: ['utils', 'store', 'animations']
  },
})