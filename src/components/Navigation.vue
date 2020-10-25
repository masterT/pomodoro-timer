<template>
  <nav class="navigation">
    <div class="container">
      <ul class="navigation__list">
        <template v-for="link in links">
          <li class="navigation__item" :key="link.label">
            <router-link class="navigation__link" :to="link.to">
              {{ link.label }}
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    links: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/constants.scss';

.navigation {
  padding: 1rem 0;
  background-color: $color-background-header;
  margin-bottom: 1rem;

  &__list {
    display: flex;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
  }

  &__item {
    list-style-type: none;
  }

  &__link {
    font-weight: bold;
    color: $font-color;
    text-decoration: none;
    margin-right: 1rem;
    &:hover {
      color: $font-color;
      text-decoration: none;
    }

    &.router-link-exact-active {
      border-bottom: 2px solid $font-color;
    }
  }
}
</style>
