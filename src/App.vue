<template>
  <div id="app">
    <notifications position="top"/>
    <Navigation :links="links" />
    <template v-if="initialized">
      <div class="container">
        <keep-alive>
          <router-view />
        </keep-alive>
      </div>
    </template>
    <template v-else>
      Initializing...
    </template>
    <audio v-for="(sources, periodName) in audio" :key="periodName" :ref="`audio-${periodName}`">
      <source v-for="source in sources" :key="source.src" :src="source.src" :type="source.type"/>
    </audio>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import notifications from '@/utils/notifications.js'
import Navigation from '@/components/Navigation.vue'
import { DEFAULT_SESSION, SESSIONS } from '@/constants'
import { formatISO } from 'date-fns'
import { formatTime } from '@/utils/time'

export default {
  components: {
    Navigation
  },
  data () {
    return {
      links: [
        {
          label: 'Timer',
          to: { name: 'timer' }
        },
        {
          label: 'About',
          to: { name: 'about' }
        },
        {
          label: 'Settings',
          to: { name: 'settings' }
        }
      ],
      audio: {
        [SESSIONS.WORK]: [
          { src: 'sounds/break.mp3', type: 'audio/mpeg' }
        ],
        [SESSIONS.SHORT]: [
          { src: 'sounds/work.mp3', type: 'audio/mpeg' }
        ],
        [SESSIONS.LONG]: [
          { src: 'sounds/work.mp3', type: 'audio/mpeg' }
        ]
      }
    }
  },
  computed: {
    ...mapState([
      'initialized',
      'notificationPermission'
    ]),
    ...mapGetters([
      'getTimerCompleted',
      'getTimerSession',
      'settingsTimeByPeriodInMinute',
      'settingsSoundNotificationEnabled',
      'settingsAutoStartEnabled',
      'getPomodoroWithinDay',
      'getTimerRemainingTime'
    ])
  },
  methods: {
    ...mapActions([
      'requestNotificationPermission',
      'start',
      'reset',
      'initialize',
      'changeSession',
      'settingsFetch',
      'periodsFetch',
      'periodsAddPeriod'
    ]),
    playSound (session) {
      if (this.settingsSoundNotificationEnabled) {
        // TODO: Handle error.
        this.$refs[`audio-${session}`][0].play()
      }
    },
    displayBrowserNotification (session) {
      if (this.notificationPermission === notifications.GRANTED) {
        notifications.send(
          'Pomodoro Like Timer',
          { body: `${session} period completed` }
        )
      }
    },
    setNextSession (session) {
      switch (session) {
        case SESSIONS.SHORT:
        case SESSIONS.LONG:
          this.changeSession(SESSIONS.WORK)
          break
        case SESSIONS.WORK:
          if (this.getPomodoroWithinDay(new Date()) % 4 === 0) {
            this.changeSession(SESSIONS.LONG)
          } else {
            this.changeSession(SESSIONS.SHORT)
          }
          break
      }
      this.reset()
      if (this.settingsAutoStartEnabled) {
        this.start()
      }
    },
    addSession (session, duration) {
      if (session === SESSIONS.WORK) {
        this.periodsAddPeriod({
          duration,
          name: session,
          endAt: formatISO(new Date())
        })
      }
    }
  },
  mounted () {
    this.initialize()
      .then(() => {
        // Set default session.
        this.changeSession(DEFAULT_SESSION)
        // Request notification permission.
        if (this.notificationPermission !== notifications.GRANTED) {
          return this.requestNotificationPermission()
        }
      })
  },
  watch: {
    getTimerRemainingTime (newRemainingTime) {
      // TODO: Use config to set the application name after the time.
      const title = `(${formatTime(newRemainingTime)}) Pomodoro Like Timer`
      if (document.title !== title) {
        document.title = title
      }
    },
    getTimerCompleted (newCompleted) {
      if (!newCompleted) return

      const duration = this.getTimerTime
      const session = this.getTimerSession

      this.addSession(session, duration)
      this.playSound(session)
      this.displayBrowserNotification(session)
      this.setNextSession(session)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/constants.scss';

#app {
  background-color: $color-background;
  color: $font-color;
  width: 100vw;
  height: 100vh;
}
</style>
