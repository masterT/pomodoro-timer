const initialState = {
  timer: {
    timeByPeriodInMinute: {
      work: 25,
      short: 5,
      long: 20
    }
  }
}

export default {
  namespaced: false,
  state () {
    return initialState
  },
  mutations: {
    settingsReset (state) {
      state = { ...initialState }
    },
    settingsSetTimeByPeriodInMinute (state, { name, value }) {
      state.timer.timeByPeriodInMinute[name] = value
    },
    settingsSave (state) {
      state = { ...state }
    }
  },
  actions: {

  },
  getters: {
    settingsTimeForPeriodInMinute: (state) => (periodName) => {
      return state.timer.timeByPeriodInMinute[periodName]
    },
    settingsTimeByPeriodInMinute (state) {
      return state.timer.timeByPeriodInMinute
    }
  }
}
