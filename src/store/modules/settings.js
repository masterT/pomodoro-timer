// import { SESSIONS } from '@/constants'
import persistance from '@/persistance'

const defaultSettings = {
  work: 25,
  short: 5,
  long: 20,
  autoStartEnabled: false,
  soundNotificationEnabled: true
}

const initialState = {
  fetchStatus: 'idle', // idle, fetching, succeeded, failed
  saveStatus: 'idle', // idle, saving, succeeded, failed
  error: null,
  settings: {}
}

export default {
  namespaced: false,
  state () {
    return initialState
  },
  mutations: {
    settingsSetFetchStatus (state, fetchStatus) {
      state.fetchStatus = fetchStatus
    },
    settingsSetSaveStatus (state, saveStatus) {
      state.saveStatus = saveStatus
    },
    settingsSetError (state, error) {
      state.error = error
    },
    settingsSetSettings (state, settings) {
      state.settings = { ...settings }
    }
  },
  actions: {
    settingsFetch ({ commit }) {
      commit('settingsSetFetchStatus', 'fetching')
      return persistance.getSettings()
        .then((settings) => {
          if (settings) return settings
          // Set default settings.
          return persistance.setSettings(defaultSettings)
        })
        .then((settings) => {
          commit('settingsSetSettings', settings)
          commit('settingsSetFetchStatus', 'succeeded')
          return settings
        })
        .catch((error) => {
          console.error(error)
          commit('settingsSetError', error)
          commit('settingsSetFetchStatus', 'failed')
          return null
        })
    },
    settingsSaveDefaultSettings ({ dispatch }) {
      return dispatch('settingsSave', { ...defaultSettings })
    },
    settingsSave ({ state, commit }, settings) {
      commit('settingsSetSaveStatus', 'saving')
      return persistance.setSettings(settings)
        .then((settings) => {
          commit('settingsSetSettings', settings)
          commit('settingsSetSaveStatus', 'succeeded')
          return settings
        })
        .catch((error) => {
          console.error(error)
          commit('settingsSetError', error)
          commit('settingsSetSaveStatus', 'failed')
          return null
        })
    }
  },
  getters: {
    settingsHasFetchStatus: (state) => (...statuses) => {
      return statuses.includes(state.fetchStatus)
    },
    settingsCurrent: (state) => {
      return state.settings
    },
    settingsAutoStartEnabled (state) {
      return state.settings.autoStartEnabled
    },
    settingsSoundNotificationEnabled (state) {
      return state.settings.soundNotificationEnabled
    },
    settingsTimeByPeriodInMinute: (state) => {
      return {
        work: state.settings.work,
        short: state.settings.short,
        long: state.settings.long
      }
    },
    getSettingsTimeForSession: (state) => (session) => {
      return state.settings[session]
    }
  }
}
