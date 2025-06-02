import { useI18n } from 'vue-i18n'

export const useFooter = () => {
  const { locale } = useI18n()
  const prismic = usePrismic()
  
  return useAsyncData(
    '$footer',
    () => prismic.client.getSingle('footer')
    
  ).data
}