import { MINUTE_TO_MILLISECOND } from '@/constants'

const INTERVAL = 200
const initialState = {
  session: null,
  active: false,
  elapsedTime: 0,
  time: 0,
  intervalId: null
}

export default {
  namespaced: false,
  state () {
    return initialState
  },
  mutations: {
    timerSetSession (state, session) {
      state.session = session
    },
    timerSetTime (state, time) {
      state.time = time * MINUTE_TO_MILLISECOND
    },
    timerSetActive (state, active) {
      state.active = active
    },
    timerAddElapsedTime (state, elapsedTime) {
      state.elapsedTime = state.elapsedTime + elapsedTime
    },
    timerSetElapsedTime (state, elapsedTime) {
      state.elapsedTime = elapsedTime
    },
    timerSetIntervalId (state, intervalId) {
      state.intervalId = intervalId
    }
  },
  actions: {
    // TODO: Move this in the root state?
    async changeSession ({ dispatch, rootGetters, commit }, session) {
      await dispatch('reset')
      commit('timerSetTime', rootGetters.getSettingsTimeForSession(session))
      commit('timerSetSession', session)
    },
    start ({ state, commit }) {
      if (state.active) return

      const tick = function (initialTick) {
        const now = Date.now()
        const elapsedTime = now - (tick.lastTick || initialTick)
        commit('timerSetElapsedTime', state.elapsedTime + elapsedTime)
        tick.lastTick = now
      }

      commit('timerSetElapsedTime', 1)
      commit('timerSetActive', true)
      commit('timerSetIntervalId', setInterval(tick, INTERVAL, Date.now()))
    },
    pause ({ state, commit }) {
      if (!state.active) return

      clearInterval(state.intervalId)
      commit('timerSetActive', false)
    },
    reset ({ state, commit }) {
      if (state.elapsedTime === 0) return

      clearInterval(state.intervalId)
      commit('timerSetActive', false)
      commit('timerSetElapsedTime', 0)
    }
  },
  getters: {
    getTimerCompleted (state) {
      return state.elapsedTime >= state.time
    },
    getTimerActive (state) {
      return state.active
    },
    getTimerTime (state) {
      return state.time
    },
    getTimerElapsedTime (state) {
      return state.elapsedTime
    },
    getTimerSession (state) {
      return state.session
    },
    getTimerRemainingTime (state) {
      return Math.max(state.time - state.elapsedTime, 0)
    }
  }
}
