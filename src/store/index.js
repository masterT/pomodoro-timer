import Vue from 'vue'
import Vuex from 'vuex'
import periods from '@/store/modules/periods'
import settings from '@/store/modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  modules: {
    periods,
    settings
  }
})
