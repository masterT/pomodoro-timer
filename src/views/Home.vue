<template>
  <div class="home">
    <h1>Pomodoro like timer</h1>
    <div class="home__buttons">
      <TimerButton :selected="selectedPeriodName === 'work'" @click="selectPeriod('work')">work</TimerButton>
      <TimerButton :selected="selectedPeriodName === 'short'" @click="selectPeriod('short')">short</TimerButton>
      <TimerButton :selected="selectedPeriodName === 'long'" @click="selectPeriod('long')">long</TimerButton>
    </div>
    <Timer
      ref="timer"
      @change="updateDocumentTitle"
      @completed="completed"
      :durationInMilliseconds="durationInMillisec"/>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import notifications from '@/utils/notifications.js'
import AppFooter from '@/components/AppFooter.vue'
import TimerButton from '@/components/TimerButton.vue'
import Timer from '@/components/Timer.vue'

const MINUTE_TO_MILLISECOND = 60000
const PERIOD_DURATION_IN_MINUTES = {
  work: 25,
  short: 5,
  long: 20
}

export default {
  name: 'home',
  components: {
    TimerButton,
    Timer,
    AppFooter
  },
  data () {
    return {
      selectedPeriodName: 'work',
      documentTitle: ''
    }
  },
  methods: {
    selectPeriod (periodName) {
      this.selectedPeriodName = periodName
    },
    updateDocumentTitle (remainingTime) {
      document.title = `(${remainingTime}) Pomodoro Like Timer`
    },
    completed () {
      notifications.initialize()
        .then((granted) => {
          if (!granted) return

          notifications.send('Pomodoro Like Timer', {
            body: `${this.selectedPeriodName} period completed`
          })
        })
    }
  },
  computed: {
    durationInMillisec () {
      return PERIOD_DURATION_IN_MINUTES[this.selectedPeriodName] * MINUTE_TO_MILLISECOND
    }
  },
  mounted () {
    this.updateDocumentTitle(this.$refs.timer.formatedTime)
    notifications.initialize()
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
