<template>
  <div class="home">
    <TimerButton @click="selectPeriod('work')">work</TimerButton>
    <TimerButton @click="selectPeriod('short')">short</TimerButton>
    <TimerButton @click="selectPeriod('long')">long</TimerButton>
    <Timer :durationInMilliseconds="durationInMillisec"/>
  </div>
</template>

<script>
// @ is an alias to /src
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
    Timer
  },
  data () {
    return {
      selectedPeriodName: 'work'
    }
  },
  methods: {
    selectPeriod (periodName) {
      console.log('selectPeriod', { periodName })
      this.selectedPeriodName = periodName
    }
  },
  computed: {
    durationInMillisec () {
      return PERIOD_DURATION_IN_MILLISECONDS[this.selectedPeriodName]
    }
  }
}
</script>
