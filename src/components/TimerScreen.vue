<template>
  <div class="time-screen">
    {{ formatedTime }}
  </div>
</template>

<script>

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
  name: 'TimerScreen',
  props: {
    timeInMilliseconds: {
      type: Number,
      required: true
    }
  },
  computed: {
    formatedTime () {
      const duration = parseMilliseconds(this.timeInMilliseconds)
      const { minutes, seconds } = duration
      return [ minutes, seconds ].map((value) => padLeft(value, 2, '0')).join(':')
    }
  }
}
</script>

<style scoped lang="scss">
// .time-screen {}
</style>
