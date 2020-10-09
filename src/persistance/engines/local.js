import { v1 as uuid } from 'uuid'
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

export function getPeriods () {
  return localforage.getItem('periods')
}

export function setPeriods (periods) {
  return localforage.setItem('periods', periods)
}

export function addPeriod (attributes) {
  // Generate unique id.
  attributes.id = uuid()
  return getPeriods()
    .then((periods) => {
      periods.push(attributes)
      return setPeriods(periods).then(() => attributes)
    })
}
