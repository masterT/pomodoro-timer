<template>
  <div class="status" :class="{ [`status_type-${type}`]: true }" />
</template>

<script>
export const DEFAULT_TYPE = 'empty'
export const TYPES = ['empty', 'primary', 'secondary', 'accent', 'danger', 'success', 'warning', 'info']

export default {
  name: 'status',
  props: {
    type: {
      type: String,
      default: DEFAULT_TYPE,
      validator: (value) => TYPES.includes(value)
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/constants.scss';
@use 'sass:color';

$opacity: 25%;

.status {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
  border-width: 1px;
  border-style: solid;

  &_type-empty {
    background: $color-background;
    border-color: $font-color;
  }
  &_type-primary {
    background: $color-primary;
    border-color: darken($color-primary, $opacity);
  }
  &_type-secondary {
    background: $color-secondary;
    border-color: darken($color-secondary, $opacity);
  }
  &_type-accent {
    background: $color-accent;
    border-color: darken($color-accent, $opacity);
  }
  &_type-danger {
    background: $color-danger;
    border-color: darken($color-danger, $opacity);
  }
  &_type-success {
    background: $color-success;
    border-color: darken($color-success, $opacity);
  }
  &_type-warning {
    background: $color-warning;
    border-color: darken($color-warning, $opacity);
  }
  &_type-info {
    background: $color-info;
    border-color: darken($color-info, $opacity);
  }

}
</style>
