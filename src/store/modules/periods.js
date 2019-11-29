import persistance from '@/persistance'

const initialState = {
  fetchStatus: 'idle', // idle, fetching, succeeded, failed
  saveStatus: 'idle', // idle, saving, succeeded, failed
  periods: []
}

export default {
  namespaced: false,
  state () {
    return initialState
  },
  mutations: {
    periodsSetFetchStatus (state, fetchStatus) {
      state.fetchStatus = fetchStatus
    },
    periodsSetSaveStatus (state, saveStatus) {
      state.saveStatus = saveStatus
    },
    periodsSetError (state, error) {
      state.error = error
    },
    periodsSetPeriods (state, periods) {
      state.periods = [...periods]
    },
    periodsAddPeriod (state, period) {
      state.periods = [...state.periods, period]
    }
  },
  actions: {
    periodsFetch ({ commit }) {
      commit('periodsSetFetchStatus', 'fetching')
      return persistance.getPeriods()
        .then((periods) => {
          if (periods) return periods
          // Set default periods.
          return persistance.setPeriods([])
        })
        .then((periods) => {
          commit('periodsSetPeriods', periods)
          commit('periodsSetFetchStatus', 'succeeded')
          return periods
        })
        .catch((error) => {
          console.error(error)
          commit('periodsSetError', error)
          commit('periodsSetFetchStatus', 'failed')
          return null
        })
    },
    periodsAddPeriod ({ commit }, { name, duration, endAt }) {
      return persistance.addPeriod({ name, duration, endAt })
        .then((period) => {
          commit('periodsAddPeriod', period)
          return period
        })
    }
  },
  getters: {
    periodsHasFetchStatus: (state) => (...statuses) => {
      return statuses.includes(state.fetchStatus)
    },
    periods (state) {
      return state.periods
    },
    periodsByName: (state) => (name) => {
      return state.periods.filter(period => period.name === name)
    }
  }
}
