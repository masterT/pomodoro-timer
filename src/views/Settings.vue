<template>
  <div class="settings">
    <div class="settings__content">
      <h1>Settings</h1>
      <div>
        <form class="form" @submit.prevent="submit" @reset.prevent="reset">
          <h2>Timer</h2>
          <div class="form__description">
            Set the time in minutes for each period.
          </div>
          <div
            v-for="(time, period) in settingsTimeByPeriodInMinute"
            :key="period"
            class="form__group">
            <label class="form__label" :for="period">{{ period }}</label>
            <input
              class="form__input"
              type="number"
              min="1"
              :value="time"
              :id="period"
              :name="period"
              @input="updateTimeByPeriodInMinute">
          </div>
          <div class="form__controls">
            <TimerButton @click="submit">Save</TimerButton>
            <TimerButton @click="reset">Reset</TimerButton>
          </div>
        </form>
      </div>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import TimerButton from '@/components/TimerButton.vue'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'settings',
  components: {
    TimerButton,
    AppFooter
  },
  data () {
    return {
      timeByPeriodInMinute: {

      }
    }
  },
  computed: {
    ...mapGetters([
      'settingsTimeByPeriodInMinute'
    ])
  },
  methods: {
    ...mapMutations([
      'settingsSetTimeByPeriodInMinute',
      'settingsSave'
    ]),
    updateTimeByPeriodInMinute (event) {
      const { name, value } = event.target
      this.settingsSetTimeByPeriodInMinute({ name, value })
    },
    submit () {
      this.settingsSave()
    },
    reset () {
      // TODO
      this.foo = ''
    }
  }
}
</script>

<style lang="scss">
.settings {
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


$input-margin: 10px;

.form {
  &__group {
    margin: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__controls {
    margin: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  &__label {
    font-size: 18px;
  }

  &__input {
    margin: $input-margin;
    height: 42px;
    box-sizing: border-box;
    font-size: 15px;
    background-color: #e8e8e8;
    border: 2px solid #4a4a4a;
    border-radius: 5px;
    -webkit-appearance: none;
    padding: 0 0.5rem;
    box-shadow: 0 $input-margin #4a4a4a;
    position: relative;
  }

  &__description {
    margin: 0.5rem;
  }
}
</style>
