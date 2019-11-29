import packageInfo from '@/../package.json'
import localforage from 'localforage'

localforage.config({
  driver: localforage.LOCALSTORAGE,
  name: packageInfo.name,
  storeName: 'main'
})

export function getSettings () {
  return localforage.getItem('settings')
}

export function setSettings (settings) {
  return localforage.setItem('settings', settings)
}
