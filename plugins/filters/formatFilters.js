import { formatDistanceToNow } from 'date-fns'
import subMonths from 'date-fns/subMonths'
import { ptBR } from 'date-fns/locale'

export const formatDate = (
  date,
  options = { month: 'long', day: 'numeric' }
) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString('pt-BR', options)
}

export const formatPrice = value => {
  value = Number(value)
  if (!isNaN(value)) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  } else {
    return ''
  }
}

export const lastMonths = value => {
  const date = new Date()
  const dateNow = Date.now(date)
  formatDate(subMonths(new Date(dateNow), value))

  return formatDate(subMonths(new Date(dateNow), value), { month: 'long' })
}

export const formatTime = time => {
  return `há ${formatDistanceToNow(new Date(time), { locale: ptBR })}`
}

export const formatPercentage = (currentMonth, lastMonth, text = '') => {
  currentMonth = Number(currentMonth)
  lastMonth = Number(lastMonth)
  if (!isNaN(currentMonth && !isNaN(lastMonth))) {
    if (currentMonth > lastMonth) {
      return `${(((currentMonth - lastMonth) * 100) / currentMonth).toFixed(
        0
      )}% ${text}`
    } else if (currentMonth < lastMonth) {
      return `${(((currentMonth - lastMonth) * 100) / lastMonth).toFixed(
        0
      )}% ${text}`
    } else {
      return '0%'
    }
  }
}
