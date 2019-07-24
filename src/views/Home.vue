<template>
  <div class="home">
    <h1>Pomodoro <i>like</i> timer</h1>
    <div class="home__buttons">
      <TimerButton :selected="selectedPeriodName === 'work'" @click="selectPeriod('work')">work</TimerButton>
      <TimerButton :selected="selectedPeriodName === 'short'" @click="selectPeriod('short')">short</TimerButton>
      <TimerButton :selected="selectedPeriodName === 'long'" @click="selectPeriod('long')">long</TimerButton>
    </div>
    <Timer ref="timer" @change="updateDocumentTitle" :durationInMilliseconds="durationInMillisec"/>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import AppFooter from '@/components/AppFooter.vue'
import TimerButton from '@/components/TimerButton.vue'
import Timer from '@/components/Timer.vue'

const MINUTE_TO_MILLISECOND = 60000
const PERIOD_DURATION_IN_MILLISECONDS = {
  work: 25 * MINUTE_TO_MILLISECOND,
  short: 5 * MINUTE_TO_MILLISECOND,
  long: 20 * MINUTE_TO_MILLISECOND
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
      console.log('selectPeriod', { periodName })
      this.selectedPeriodName = periodName
    },
    updateDocumentTitle (remainingTime) {
      document.title = `(${remainingTime}) Pomodoro Like Timer`
    }
  },
  computed: {
    durationInMillisec () {
      return PERIOD_DURATION_IN_MILLISECONDS[this.selectedPeriodName]
    }
  },
  mounted () {
    this.updateDocumentTitle(this.$refs.timer.formatedTime)
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
