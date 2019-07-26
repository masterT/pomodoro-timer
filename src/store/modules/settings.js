const initialState = {
  timer: {
    timeByPeriodInMinute: {
      work: 25,
      short: 5,
      long: 20
    },
    autoStartEnabled: false,
    soundNotificationEnabled: true
  }
}

export default {
  namespaced: false,
  state () {
    return initialState
  },
  mutations: {
    settingsReset (state) {
      Object.keys(initialState).forEach((key) => {
        state[key] = initialState[key]
      })
    },
    settingsSetTimeByPeriodInMinute (state, { name, value }) {
      state.timer.timeByPeriodInMinute[name] = value
    },
    settingsSetAutoStartEnabled (state, { value }) {
      state.timer.autoStartEnabled = value
    },
    settingsSetSoundNotificationEnabled (state, { value }) {
      state.timer.soundNotificationEnabled = value
    },
    settingsSave (state) {
      state = { ...state }
    }
  },
  getters: {
    settingsTimeForPeriodInMinute: (state) => (periodName) => {
      return state.timer.timeByPeriodInMinute[periodName]
    },
    settingsTimeByPeriodInMinute (state) {
      return state.timer.timeByPeriodInMinute
    },
    settingsAutoStartEnabled (state) {
      return state.timer.autoStartEnabled
    },
    settingsSoundNotificationEnabled (state) {
      return state.timer.soundNotificationEnabled
    }
  }
}
