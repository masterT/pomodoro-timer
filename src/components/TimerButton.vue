<template>
  <div class="timer-button" :class="classes" @click="click">
    <div class="timer-button__top">
      <slot></slot>
    </div>
    <div class="timer-button__side"/>
  </div>
</template>

<script>
export default {
  name: 'TimerButton',
  props: {
    selected: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      const classes = []
      if (this.selected) classes.push('timer-button_selected')
      return classes
    }
  },
  methods: {
    click (event) {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss">

$color-text: #4a4a4a;
$width: 5em;
$heightSide: ($width / 4);
$extraMarginSelected: 0.3em;
$extraMarginActive: 0.1em;
$containerMargin: 1.5em;

.timer-button {
  text-transform: uppercase;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-weight: 200;
  margin: $containerMargin;
  display: inline-block;

  &__top {
    text-align: center;
    font-weight: 600;
    width: $width;
    height: 3em;
    padding-top: 2em;
    cursor: pointer;
    background-color: #e8e8e8;
    border-radius: 100%;
    border: 1px solid #e8e8e8;
    box-shadow: 0 $heightSide $color-text;
    z-index: 2;
    border-width: 0;
    transform: rotateX(25deg);
    transition: background-color 0.3s;

    &:hover {
      background-color: #d4d4d4;
    }

    &:active {
      box-shadow: 0 ($heightSide - $extraMarginActive) $color-text;
    }
  }

  &__side {
    width: inherit;
    background-color: $color-text;
    position: relative;
    top: -($width / 2);
    height: $heightSide;
    z-index: -1;

    &:active {
      height: $heightSide - $extraMarginActive;
    }
  }

  &:active {
    margin-top: $containerMargin + $extraMarginActive;
    margin-bottom: $containerMargin - $extraMarginActive;
  }

  &_selected {
    margin-top: $containerMargin + $extraMarginSelected;
    margin-bottom: $containerMargin - $extraMarginSelected;

    .timer-button__top {
      background-color: #bbbbbb;
      box-shadow: 0 ($heightSide - $extraMarginSelected) $color-text;
    }

    .timer-button__side {
      height: $heightSide - $extraMarginSelected;
    }
  }
}
</style>
