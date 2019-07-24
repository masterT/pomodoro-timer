<template>
  <div class="timer">
    <div class="timer__screen">
      {{ formatedTime }}
    </div>
    <div class="timer__buttons">
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
import parseMilliseconds from 'parse-ms'

function padLeft (value, number, char) {
  let text = String(value)
  if (text.length < number) {
    let size = number - text.length
    while (size--) text = char + text
  }
  return text
}

export default {
  name: 'Timer',
  components: {
    TimerButton
  },
  props: {
    durationInMilliseconds: {
      type: Number,
      required: true
    },
    tickIntervalInMilliseconds: {
      type: Number,
      required: false,
      default: 250
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
  computed: {
    formatedTime () {
      const duration = parseMilliseconds(this.remainingTimeInMilliseconds)
      const { minutes, seconds } = duration
      return [ minutes, seconds ].map((value) => padLeft(value, 2, '0')).join(':')
    }
  },
  methods: {
    start () {
      this.state = 'TICKING'
      this.lastTickAt = Date.now()
      this.tick()
      this.intervalId = setInterval(this.tick, this.tickIntervalInMilliseconds)
    },
    pause () {
      this.state = 'PAUSED'
      clearInterval(this.intervalId)
      this.intervalId = null
    },
    stop () {
      this.state = 'IDLE'
      clearInterval(this.intervalId)
      this.intervalId = null
      this.remainingTimeInMilliseconds = this.durationInMilliseconds
    },
    tick () {
      let now = Date.now()
      let elapsedMilliseconds = now - this.lastTickAt
      this.remainingTimeInMilliseconds = this.remainingTimeInMilliseconds - elapsedMilliseconds
      this.lastTickAt = now

      if (this.remainingTimeInMilliseconds <= 0) {
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
    },
    formatedTime (formatedTime) {
      this.$emit('change', formatedTime)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

$timeBoxShadowHeigh: 20px;
$color-text: #4a4a4a;

.timer {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__screen {
    margin-bottom: $timeBoxShadowHeigh;
    display: inline-block;
    padding: 10px;
    font-size: 3.5em;
    background-color: #fff;
    border: 3px solid $color-text;
    border-radius: 6px;
    box-shadow: 0 $timeBoxShadowHeigh $color-text;
  }
}
</style>
