<template>
  <button
    :disabled="disabled"
    :class="{
    'button': true,
    'button_disabled': disabled,
    [`button_type-${type}`]: true
  }">
    <slot />
  </button>
</template>

<script>
export const DEFAULT_TYPE = 'primary'
export const TYPES = ['primary', 'secondary', 'danger', 'link']

export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: DEFAULT_TYPE,
      validator: (value) => TYPES.includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/constants.scss';
@use 'sass:color';

$opacity: 5%;
$disable-opacity: 10%;

.button {
  border-radius: $radius;
  padding: 0.25rem 1rem;

  &_type-primary {
    background-color: $color-primary;
    color: $color-background;
    border-color: darken($color-primary, $opacity);

    &:focus {
      outline: 1px dotted;
      outline: 5px auto lighten($color-primary, $opacity);
    }

    &.button_disabled {
      background-color: lighten($color-primary, $disable-opacity);
      border-color: $color-primary;
    }
  }

  &_type-secondary {
    background-color: $color-secondary;
    color: $color-background;
    border-color: darken($color-secondary, $opacity);

    &:focus {
      outline: 1px dotted;
      outline: 5px auto lighten($color-secondary, $opacity);
    }

    &.button_disabled {
      background-color: lighten($color-secondary, $disable-opacity);
      border-color: $color-secondary;
    }
  }

  &_type-danger {
    background-color: $color-danger;
    color: $color-background;
    border-color: darken($color-danger, $opacity);

    &:focus {
      outline: 1px dotted;
      outline: 5px auto lighten($color-danger, $opacity);
    }

    &.button_disabled {
      background-color: lighten($color-danger, $disable-opacity);
      border-color: $color-danger;
    }
  }

  &_type-link {
    background-color: inherit;
    color: $color-link;
    border: none;

    &:focus {
      outline: none;
    }

    &.button_disabled {
      color: lighten($color-link, $disable-opacity);
    }
  }
}
</style>
