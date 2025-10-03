// // composables/useFormatDate.ts
// import { format } from 'date-fns'

// /**
//  * Formate une chaîne de date ISO (ou un Date) en "dd/MM/yy"
//  */
// export function useFormatDate() {
//   const formatDate = (dateInput: string | Date): string => {
//     const d = typeof dateInput === 'string'
//       ? new Date(dateInput)
//       : dateInput
//     return format(d, 'dd/MM/yy')
//   }
//   return { formatDate }
// }



// ~/composables/useFormatDate.js
import { useI18n } from 'vue-i18n'

export function useFormatDate() {
  const { locale } = useI18n()

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)

    return new Intl.DateTimeFormat(locale.value, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date).replace(/,/g, '')
  }

  return { formatDate }
}
