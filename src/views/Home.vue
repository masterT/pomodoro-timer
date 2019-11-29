<template>
  <div class="home">
    <template v-if="settingsHasFetchStatus('idle', 'fetching') || periodsHasFetchStatus('idle', 'fetching')">
      Loading...
    </template>
    <template v-if="settingsHasFetchStatus('failed')">
      An error occured while retrieving your settings.
    </template>
    <template v-if="periodsHasFetchStatus('failed')">
      An error occured while retrieving your periods.
    </template>
    <template v-if="settingsHasFetchStatus('succeeded') && periodsHasFetchStatus('succeeded')">
      <h1>Pomodoro like timer</h1>
      <p>Number work period today: {{ numberWorkPeriodToday }}</p>
      <PomodoroTimer
        :timeByPeriodInMinute="settingsTimeByPeriodInMinute"
        :autoStartEnabled="settingsAutoStartEnabled"
        :initialNumberWorkPeriodCompleted="numberWorkPeriodToday"
        @change="updateDocumentTitle"
        @completed="completed"/>
    </template>
    <AppFooter></AppFooter>
    <audio v-for="(sources, periodName) in audio" :key="periodName" :ref="`audio-${periodName}`">
      <source v-for="source in sources" :key="source.src" :src="source.src" :type="source.type"/>
    </audio>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from 'vuex'
import { isSameDay } from 'date-fns'
import notifications from '@/utils/notifications.js'
import AppFooter from '@/components/AppFooter.vue'
import PomodoroTimer from '@/components/PomodoroTimer.vue'

export default {
  name: 'home',
  components: {
    PomodoroTimer,
    AppFooter
  },
  data () {
    return {
      documentTitle: '',
      audio: {
        work: [
          { src: 'sounds/break.mp3', type: 'audio/mpeg' }
        ],
        short: [
          { src: 'sounds/work.mp3', type: 'audio/mpeg' }
        ],
        long: [
          { src: 'sounds/work.mp3', type: 'audio/mpeg' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'periodsByName',
      'periodsHasFetchStatus',
      'settingsTimeByPeriodInMinute',
      'settingsAutoStartEnabled',
      'settingsSoundNotificationEnabled',
      'settingsHasFetchStatus'
    ]),
    numberWorkPeriodToday () {
      const now = new Date()
      return this.periodsByName('work').filter((period) => isSameDay(period.endAt, now)).length
    }
  },
  methods: {
    ...mapActions([
      'periodsAddPeriod'
    ]),
    updateDocumentTitle (remainingTime, _durationInMilliseconds) {
      document.title = `(${remainingTime}) Pomodoro Like Timer`
    },
    completed (name, duration) {
      // Add period.
      this.periodsAddPeriod({
        name: name,
        duration,
        endAt: new Date()
      })
      // Play sound.
      if (this.settingsSoundNotificationEnabled) {
        // TODO: Handle error.
        this.$refs[`audio-${name}`][0].play()
      }
      // Display notification.
      if (notifications.isGranted()) {
        notifications.send('Pomodoro Like Timer', {
          body: `${name} period completed`
        })
      }
    }
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
