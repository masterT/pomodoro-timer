<template>
  <div class="timer">
    <TimerScreen :timeInMilliseconds="remainingTimeInMilliseconds"></TimerScreen>
    <div>
      <TimerButton
        v-if="state === 'IDLE'"
        @click="start">
        start
      </TimerButton>
      <TimerButton
        v-if="state === 'TICKING'"
        @click="pause">
        pause
      </TimerButton>
      <TimerButton
        v-if="state === 'PAUSED'"
        @click="start">
        resume
      </TimerButton>
      <TimerButton @click="stop">
        stop
      </TimerButton>
    </div>
  </div>
</template>

<script>
import TimerButton from '@/components/TimerButton.vue'
import TimerScreen from '@/components/TimerScreen.vue'

export default {
  name: 'Timer',
  components: {
    TimerButton,
    TimerScreen
  },
  props: {
    durationInMilliseconds: {
      type: Number,
      required: true
    },
    tickIntervalInMilliseconds: {
      type: Number,
      required: false,
      default: 1000
    }
  },
  data () {
    return {
      state: 'IDLE',
      intervalId: null,
      remainingTimeInMilliseconds: this.durationInMilliseconds,
      lastTickAt: null
    }
  },
  methods: {
    start () {
      console.log('start')
      this.state = 'TICKING'
      this.lastTickAt = Date.now()
      this.intervalId = setInterval(this.tick, this.tickIntervalInMilliseconds)
    },
    pause () {
      console.log('pause')
      this.state = 'PAUSED'
      clearInterval(this.intervalId)
      this.intervalId = null
    },
    stop () {
      console.log('stop')
      this.state = 'IDLE'
      clearInterval(this.intervalId)
      this.intervalId = null
      this.remainingTimeInMilliseconds = this.durationInMilliseconds
    },
    tick () {
      console.log('tick')
      let now = Date.now()
      let elapsedMilliseconds = now - this.lastTickAt
      this.remainingTimeInMilliseconds = this.remainingTimeInMilliseconds - elapsedMilliseconds
      this.lastTickAt = now

      if (this.remainingTimeInMilliseconds <= 0) {
        console.log('completed')
        clearInterval(this.intervalId)
        this.intervalId = null
        this.remainingTimeInMilliseconds = 0

        this.$emit('completed', this.durationInMilliseconds)
      }
    }
  },
  watch: {
      durationInMilliseconds () {
        this.stop()
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// .timer {}
</style>
