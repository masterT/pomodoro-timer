import Vue from 'vue'
import Vuex from 'vuex'
import periods from '@/store/modules/periods'
import settings from '@/store/modules/settings'
import timer from '@/store/modules/timer'
import notifications from '@/utils/notifications'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    initialized: false,
    notificationSupported: false,
    notificationPermission: null
  },
  mutations: {
    setInitialized (state, initialized) {
      state.initialized = initialized
    },
    setNotificationSupported (state, notificationSupported) {
      state.notificationSupported = notificationSupported
    },
    setNotificationPermission (state, notificationPermission) {
      state.notificationPermission = notificationPermission
    }
  },
  actions: {
    async initialize ({ commit, dispatch }) {
      commit('setInitialized', false)
      try {
        await dispatch('settingsFetch')
        await dispatch('periodsFetch')
        await dispatch('initializePermission')
        commit('setInitialized', true)
      } catch (error) {
        commit('setInitialized', true)
      }
    },
    initializePermission ({ commit }) {
      if (notifications.isSupported()) {
        commit('setNotificationSupported', true)
        commit('setNotificationPermission', notifications.permission())
      } else {
        commit('setNotificationSupported', false)
      }
    },
    requestNotificationPermission ({ state, commit }) {
      if (state.notificationSupported && notifications.permission() !== notifications.GRANTED) {
        return notifications.requestPermission()
          .then((permission) => {
            commit('setNotificationPermission', notifications.permission())
            if (permission === notifications.GRANTED) {
              notifications.send(
                'Pomodoro Like Timer', {
                  body: 'Browser notification enabled!'
                }
              )
            }
            return permission
          })
      } else {
        return Promise.resolve(null)
      }
    }
  },
  getters: {
    isNotificationPermissionGranted (state) {
      return state.notificationPermission === notifications.GRANTED
    },
    isNotificationPermissionDenied (state) {
      return state.notificationPermission === notifications.DENIED
    },
    isNotificationPermissionDefault (state) {
      return state.notificationPermission === notifications.DEFAULT
    }
  },
  modules: {
    periods,
    settings,
    timer
  }
})
