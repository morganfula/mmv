// composables/useFormatDate.ts
import { format } from 'date-fns'

/**
 * Formate une chaîne de date ISO (ou un Date) en "dd/MM/yy"
 */
export function useFormatDate() {
  const formatDate = (dateInput: string | Date): string => {
    const d = typeof dateInput === 'string'
      ? new Date(dateInput)
      : dateInput
    return format(d, 'dd/MM/yy')
  }
  return { formatDate }
}
