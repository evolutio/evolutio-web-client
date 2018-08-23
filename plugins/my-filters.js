import Vue from 'vue'
import moment from 'moment'

moment.locale('pt-br')

Vue.filter('fromnow', value => {
  if (!value) return
  return moment(value).fromNow()
})

Vue.filter('fromnowshort', value => {
  if (!value) return
  const date = moment(value)
  const now = moment()
  const secondsago = Math.round(now.diff(date, 'seconds'))
  if (secondsago < 45) {
    return `${secondsago}s`
  }
  const minutesago = Math.round(secondsago / 60.0)
  if (minutesago < 45) {
    return `${minutesago}m`
  }
  const hoursago = Math.round(minutesago / 60.0)
  if (hoursago < 22) {
    return `${hoursago}h`
  }
  const daysago = Math.round(hoursago / 24.0)
  if (daysago < 26) {
    return `${daysago}d`
  }
  const monthsago = Math.round(daysago / 24.0)
  if (monthsago < 12) {
    return `${monthsago} ${monthsago === 1 ? 'mês' : 'meses'}`
  }
  return moment(value).format('MMM YYYY')
})

Vue.filter('datetime', value => {
  if (!value) return
  return moment(value).format('DD/MM/YYYY HH:mm')
})

Vue.filter('time', totalseconds => {
  if (!totalseconds) return ''
  const seconds = parseInt(totalseconds % 60)
  let timestr = `${seconds}s`
  if (totalseconds > 60) {
    const totalminutes = totalseconds / 60.0
    const minutes = parseInt(totalminutes % 60)
    timestr = `${minutes}min ${timestr}`
    if (totalminutes > 60) {
      const totalhours = parseInt(totalminutes / 60.0)
      timestr = `${totalhours}h ${timestr}`
    }
  }

  return timestr
})

Vue.filter('trim', (text, size, breakWord = false) => {
  if (!text) {
    return ''
  }
  let shortText = ''
  if (breakWord) {
    shortText = text.substring(0, size)
  } else {
    const words = text.split(/\s+/g)
    shortText = words.splice(0, 1)
    if (shortText > size) {
      shortText = text.substring(0, size)
    } else {
      words.forEach(word => {
        if (word.length + shortText.length < size) {
          shortText += ' ' + word
        }
      })
    }
  }
  if (text.length > size) {
    shortText += '...'
  }
  return shortText
})

Vue.filter('reais', value => {
  if (value === undefined || value === null) return
  const signal = value < 0 ? '- ' : ''
  const currency = 'R$'
  let values = Number(Math.abs(value)).toFixed(2).split('.')
  const currencyValue = [values[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'), values[1]].filter(Boolean).join()
  return `${signal}${currency} ${currencyValue}`
})