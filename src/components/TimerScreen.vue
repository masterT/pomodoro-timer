<template>
  <div class="time-screen">
    {{ formatedTime }}
  </div>
</template>

<script>

const UNIT_IN_MILLISECOND = {
  'millisecond': 1,
  'second': 1000,
  'minute': 60000,
  'hour': 3600000,
  'day': 86400000,
  'year': 31536000000
}

export default {
  name: 'TimerScreen',
  props: {
    timeInMilliseconds: {
      type: Number,
      required: true
    }
  },
  methods: {
    padLeft (value, number, char) {
      let text = String(value)
      if (text.length < number) {
        let size = number - text.length
        while (size--) text += char
      }
      return text
    }
  },
  computed: {
    formatedTime () {
      let minutes = Math.floor(this.timeInMilliseconds / UNIT_IN_MILLISECOND.minute)

      let seconds = Math.floor(this.timeInMilliseconds - (minutes * UNIT_IN_MILLISECOND.minute) / UNIT_IN_MILLISECOND.second)

      let milliseconds = this.timeInMilliseconds - (minutes * UNIT_IN_MILLISECOND.minute + seconds * UNIT_IN_MILLISECOND.second)

      console.log({
        minutes,
        seconds,
        milliseconds
      })
      let numbers = [minutes, seconds]
      return numbers.map((number) => this.padLeft(number, 2, '0')).join(':')
    }
  }
}
</script>

<style scoped lang="scss">
// .time-screen {}
</style>
