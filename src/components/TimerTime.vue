<template>
  <div class="timer-time" :style="style">
    <svg
      class="timer-time__svg"
      :height="size"
      :width="size">
      <circle
        class="timer-time__svg__circle-inactive"
        fill="transparent"
        :stroke-width="stroke"
        :r="computedRadius"
        :cx="radius"
        :cy="radius"/>
      <circle
        class="timer-time__svg__circle-active"
        fill="transparent"
        :stroke-dasharray="circumference + ' ' + circumference"
        :style="{ strokeDashoffset }"
        :stroke-width="stroke"
        :r="computedRadius"
        :cx="radius"
        :cy="radius"/>
      <text
        :x="radius"
        :y="radius"
        class="timer-time__svg__text"
        alignment-baseline="middle"
        text-anchor="middle">
        {{ formatedTime }}
      </text>
    </svg>
  </div>
</template>

<script>
import { formatTime } from '@/utils/time'

export default {
  name: 'TimerTime',
  props: {
    time: {
      type: Number,
      required: true
    },
    timeElapsed: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      default: 120
    },
    stroke: {
      type: Number,
      default: 2
    }
  },
  computed: {
    radius () {
      return this.size / 2
    },
    computedRadius () {
      return this.radius - this.stroke * 2
    },
    circumference () {
      return this.computedRadius * 2 * Math.PI
    },
    progress () {
      return 100 * this.timeElapsed / this.time
    },
    strokeDashoffset () {
      return this.circumference - this.progress / 100 * this.circumference
    },
    style () {
      return { height: `${this.size}px`, width: `${this.size}px` }
    },
    timeRemaining () {
      return this.time - this.timeElapsed
    },
    formatedTime () {
      return formatTime(this.timeRemaining)
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/stylesheets/constants.scss';

  $text-width: 60px;
  $text-height: 2rem;

  .timer-time {
    position: relative;

    &__svg {
      &__circle-active {
        stroke: $color-primary;
        transition: stroke-dashoffset 0.35s;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
      }

      &__circle-inactive {
        stroke: rgba($font-color-secondary, .5);
      }

      &__text {
        font-family: $font-family;
        fill: $font-color;
        font-size: 2.25rem;
      }
    }
  }
</style>
