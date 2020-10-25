<template>
  <div class="about">
    <h1>About</h1>
    <p>The <a href="http://pomodorotechnique.com/">Pomodoro Technique</a> is a time management method developed by <i>Francesco Cirillo</i> in the late 1980s.</p>
    <p>The technique uses a timer to break down work into intervals, separated by short breaks.</p>
    <div class="footer">
      <div class="footer__item">
        Made with love by <a href="http://simonthiboutot.com/">Simon Thiboutôt</a>
      </div>
      <div class="footer__item">
        <a href="https://github.com/masterT/pomodoro-timer">Source code</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about'
}
</script>

<style lang="scss">
.about {
  display: flex;
  flex-direction: column;
}

.footer {
  margin: 2rem;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__item {
    padding: 0.1rem;
  }
}
</style>
