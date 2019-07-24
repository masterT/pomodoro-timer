export function isSupported () {
  return ('Notification' in window)
}

export function hasPermission () {
  return Notification.permission === 'granted'
}

export function askPermission () {
  return new Promise((resolve) => {
    Notification.requestPermission((permission) => {
      resolve(permission === 'granted')
    })
  })
}

export function send (title, options, duration) {
  if (typeof duration === 'undefined') duration = 3000
  let notification = new Notification(title, options)
  setTimeout(notification.close, duration)
}

export function initialize () {
  return new Promise((resolve) => {
    if (!isSupported()) return resolve(false)
    if (!hasPermission()) {
      resolve(askPermission())
    } else {
      resolve(true)
    }
  })
}

export default {
  isSupported,
  hasPermission,
  askPermission,
  send,
  initialize
}
