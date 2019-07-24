<template>
  <div class="home">
    <h1>Pomodoro like timer</h1>
    <PomodoroTimer @change="updateDocumentTitle" @completed="completed"/>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import notifications from '@/utils/notifications.js'
import AppFooter from '@/components/AppFooter.vue'
import PomodoroTimer from '@/components/PomodoroTimer.vue'

export default {
  name: 'home',
  components: {
    PomodoroTimer,
    AppFooter
  },
  data () {
    return {
      documentTitle: ''
    }
  },
  methods: {
    updateDocumentTitle (remainingTime, _durationInMilliseconds) {
      document.title = `(${remainingTime}) Pomodoro Like Timer`
    },
    completed (selectedPeriodName) {
      notifications.initialize()
        .then((granted) => {
          if (!granted) return

          notifications.send('Pomodoro Like Timer', {
            body: `${selectedPeriodName} period completed`
          })
        })
    }
  },
  mounted () {
    notifications.initialize()
  }
}
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
