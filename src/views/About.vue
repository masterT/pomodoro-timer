<template>
  <div class="about">
    <div class="about__content">
     <h1>Pomodoro Technique</h1>
     <p>The <a href="http://pomodorotechnique.com/">Pomodoro Technique</a> is a time management method developed by <i>Francesco Cirillo</i> in the late 1980s.</p>
     <p>The technique uses a timer to break down work into intervals, separated by short breaks.</p>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'about',
  components: {
    AppFooter
  }
}
</script>

<style lang="scss">
.about {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__content {
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
