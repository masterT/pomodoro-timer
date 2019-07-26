import VuexPersistence from 'vuex-persist'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    periods: {
      work: [],
      short: [],
      long: []
    }
  },
  mutations: {
    add_period (state, { name, duration, endAt }) {
      state.periods[name].push({ duration, endAt })
    }
  },
  actions: {
    add_period ({ commit }, { name, duration, endAt }) {
      commit('add_period', { name, duration, endAt })
    }
  },
  getters: {
    periods (state) {
      return Object.values(state.periods).reduce((total, current) => total.concat(current), [])
    },
    periodsByName: (state) => (name) => {
      return state.periods[name]
    }
  },
  plugins: [vuexLocal.plugin]
})
