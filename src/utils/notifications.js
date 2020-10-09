export function isSupported () {
  return ('Notification' in window)
}

export function isGranted () {
  return Notification.permission === 'granted'
}

export function isDenied () {
  return Notification.permission === 'denied'
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
  const notification = new Notification(title, options)
  setTimeout(() => notification.close(), duration)
}

export function initialize () {
  return new Promise((resolve) => {
    if (!isSupported()) return resolve(false)
    if (!isGranted()) {
      resolve(askPermission())
    } else {
      resolve(true)
    }
  })
}

export default {
  isSupported,
  isGranted,
  askPermission,
  send,
  initialize
}
