<template>
  <button class="time-button" @click="click">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'TimerButton',
  methods: {
    click (event) {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
// .time-button {}
</style>
