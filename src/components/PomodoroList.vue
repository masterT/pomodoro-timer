<template>
  <div class="pomodoro-list">
    <span
      v-for="(item, index) in list"
      :key="index"
      class="pomodoro-list__item"
      :class="item.class" />
  </div>
</template>

<script>
export default {
  name: 'PomodoroList',
  props: {
    pomodoro: {
      type: Number,
      required: true
    },
    goal: {
      type: Number
    }
  },
  computed: {
    hasGoal () {
      return typeof this.goal === 'number' && !isNaN(this.goal)
    },
    numberCompleted () {
      if (this.hasGoal) {
        return Math.min(this.pomodoro, this.goal)
      }
      return this.pomodoro
    },
    numberUnderGoal () {
      if (this.hasGoal) {
        return Math.max(0, this.goal - this.pomodoro)
      }
      return 0
    },
    numberOverGoal () {
      if (this.hasGoal) {
        return Math.max(0, this.pomodoro - this.goal)
      }
      return 0
    },
    list () {
      const list = []
      // Completed.
      for (let index = 0; index < this.numberCompleted; index++) {
        list.push({ class: 'pomodoro-list__item_completed' })
      }
      // Under the goal.
      for (let index = 0; index < this.numberUnderGoal; index++) {
        list.push({ class: 'pomodoro-list__item_under-target' })
      }
      // Over the goal.
      for (let index = 0; index < this.numberOverGoal; index++) {
        list.push({ class: 'pomodoro-list__item_over-target' })
      }
      return list
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/constants.scss';
@use 'sass:color';

$size: 32px;
$margin: ($size / 4);

.pomodoro-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  &__item {
    border-radius: 100%;
    height: $size;
    width: $size;
    margin-right: $margin;
    margin-bottom: $margin;
    display: inline-flex;
    justify-content: center;
    align-items: center;

    &_completed {
      border: 2px solid $color-primary;
      background: lighten($color-primary, 25%);
    }

    &_under-target {
      border: 2px solid $color-secondary;
      background: lighten($color-secondary, 35%);
    }

    &_over-target {
      border: 2px solid $color-accent;
      background: lighten($color-accent, 35%);
    }
  }
}
</style>
