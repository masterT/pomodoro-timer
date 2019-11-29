<template>
  <div id="app">
    <div class="menu">
      <router-link class="menu__item" to="/">Home</router-link>
      <router-link class="menu__item" to="/about">About</router-link>
      <router-link class="menu__item" to="/settings">Settings</router-link>
    </div>
    <transition name="fade">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'settingsFetch'
    ])
  },
  mounted () {
    this.settingsFetch()
  }
}
</script>

<style lang="scss">
$color-background: tomato;
$color-text: #4a4a4a;

// Global style.
body {
  background-color: $color-background;
  color: $color-text;
  font-family: 'Source Sans Pro', sans-serif;
  width: 100%;
  margin: 0;
}

h1, h2, h3, h4, h5, h6 {
  text-transform: uppercase;
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5rem;
}

// Menu.
.menu {
  display: flex;
  justify-content: center;
  padding: 1rem;

  &__item {
    font-weight: bold;
    color: $color-text;
    text-decoration: none;
    margin: 0 1rem;

    &.router-link-exact-active {
      border-bottom: 2px solid $color-text;
    }
  }
}

// Transition.
.fade-enter-active {
  transition: opacity 0.2s;
}

.fade-leave-active {
  opacity: 0;
}

.fade-enter {
  opacity: 0;
}

</style>
