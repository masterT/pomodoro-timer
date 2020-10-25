<template>
  <div class="home">
    <div class="home__header">
      <h1>Timer</h1>
    </div>
    <div class="pomodoro-timer">
      <div class="pomodoro-timer__header">
        <label for="period">Type</label>
        <select id="period" name="period" @change="handleChangeSession" :value="getTimerSession">
          <option
            v-for="name in sessions"
            :key="name"
            :selected="getTimerSession === name"
            :value="name">
            {{ name }}
          </option>
        </select>
      </div>
      <TimerTime
        class="pomodoro-timer__time"
        :size="225"
        :stroke="4"
        :time="getTimerTime"
        :timeElapsed="getTimerElapsedTime" />
      <div class="pomodoro-timer__buttons">
        <Button
          class="pomodoro-timer__button"
          v-show="!getTimerActive && getTimerElapsedTime === 0"
          @click.native="start">
          start
        </Button>
        <Button
          class="pomodoro-timer__button"
          v-show="!getTimerActive && getTimerElapsedTime !== 0"
          @click.native="start">
          resume
        </Button>
        <Button
          class="pomodoro-timer__button"
          v-show="getTimerActive && getTimerElapsedTime !== 0"
          @click.native="pause">
          pause
        </Button>
        <Button
          class="pomodoro-timer__button"
          v-show="getTimerElapsedTime !== 0"
          @click.native="reset">
          reset
        </Button>
      </div>
    </div>
    <div class="home__separator" />
    <div class="home__pomodoro">
      <h2 class="home__pomodoro__title">Pomodoros</h2>
      <PomodoroList
        class="home__pomodoro__list"
        :pomodoro="currentPomodoros.length" />
      <div class="home__pomodoro-summary">
        <div class="home__pomodoro-summary__pomodoro">
          {{ currentPomodoros.length }}
        </div>
        <div class="home__pomodoro-summary__time">
          {{ currentPomodoros.length * settingsTimeByPeriodInMinute.work }} min
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import PomodoroList from '@/components/PomodoroList.vue'
import Button from '@/components/Button.vue'
import TimerTime from '@/components/TimerTime.vue'
import { SESSIONS } from '@/constants'

export default {
  name: 'Timer',
  components: {
    PomodoroList,
    Button,
    TimerTime
  },
  data () {
    return {
      sessions: Object.values(SESSIONS),
      currentPomodoros: []
    }
  },
  computed: {
    ...mapGetters([
      'getTimerActive',
      'getTimerTime',
      'getTimerElapsedTime',
      'getPomodoroWithinDay',
      'getTimerSession',
      'periods',
      'settingsTimeByPeriodInMinute',
      'getSettingsTimeForSession'
    ])
  },
  methods: {
    ...mapActions([
      'start',
      'pause',
      'reset',
      'changeSession'
    ]),
    ...mapMutations([
      'timerSetTime'
    ]),
    handleChangeSession (event) {
      const session = event.target.value
      this.changeSession(session)
    },
    updateCurrentPomodoros () {
      this.currentPomodoros = this.getPomodoroWithinDay(new Date())
    }
  },
  watch: {
    periods (newPeriods) {
      this.updateCurrentPomodoros()
    },
    settingsTimeByPeriodInMinute (newSettingsTimeByPeriodInMinute, oldSettingsTimeByPeriodInMinute) {
      // Current session duration change and timer has not be activated.
      const session = this.getTimerSession
      const newTime = newSettingsTimeByPeriodInMinute[session]
      const oldTime = oldSettingsTimeByPeriodInMinute[session]
      if (newTime !== oldTime && this.getTimerElapsedTime === 0) {
        // Update timer time.
        this.timerSetTime(newTime)
      }
    }
  },
  mounted () {
    this.updateCurrentPomodoros()
  }
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/constants.scss';

#period {
  margin-left: 1rem;
  flex: 1;
}

.pomodoro-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  &__header {
    display: flex;
    align-items: baseline;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 1rem;
  }

  &__button {
    margin: 0 1rem;
    flex: 1;
  }

  &__time {
    margin-bottom: 1rem;
    font-size: 3rem;
  }
}

// -------------

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;

  &__header {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__separator {
    margin: 1rem 0;
  }

  &__pomodoro {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    &__title {
      margin-bottom: 1rem;
    }

    &__list {
      margin-bottom: 0.75rem;
    }
  }

  &__pomodoro-summary {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;

    &__pomodoro {
      color: $font-color-primary;
    }
    &__time {
      color: $font-color-secondary;
    }
  }
}
</style>
