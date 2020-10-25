export const GRANTED = 'granted'
export const DENIED = 'denied'
export const DEFAULT = 'default'

export function isSupported () {
  return ('Notification' in window)
}

export function isGranted () {
  return Notification.permission === GRANTED
}

export function isDenied () {
  return Notification.permission === DENIED
}

export function permission () {
  return Notification.permission
}

export async function requestPermission () {
  const callback = (permission) => {
    // Whatever the user answers, we make sure Chrome stores the information.
    if (!('permission' in Notification)) {
      Notification.permission = permission
    }
    return permission
  }
  // Support non-Promise version.
  try {
    const permission = await Notification.requestPermission()
    return callback(permission)
  } catch {
    return new Promise((resolve) => {
      Notification.requestPermission((permission) => {
        resolve(callback(permission))
      })
    })
  }
}

export function send (title, options, duration) {
  if (typeof duration === 'undefined') duration = 3000
  const notification = new Notification(title, options)
  setTimeout(() => notification.close(), duration)
}

// export function requestPermission () {
//   return new Promise((resolve) => {
//     if (!isSupported()) return resolve(false)
//     if (!isGranted()) {
//       resolve(askPermission())
//     } else {
//       resolve(true)
//     }
//   })
// }

export default {
  GRANTED,
  DENIED,
  DEFAULT,
  isSupported,
  isGranted,
  // askPermission,
  permission,
  send,
  requestPermission
}
