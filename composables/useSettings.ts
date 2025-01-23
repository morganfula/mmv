import { useI18n } from 'vue-i18n'

export const useSettings = () => {
  const { locale } = useI18n()
  const prismic = usePrismic()
  
  return useAsyncData(
    '$settings',
    () => prismic.client.getSingle('settings')
    
  ).data
}