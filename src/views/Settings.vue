<template>
  <div class="settings">
    <div class="settings__content">
      <h1>Settings</h1>
      <div>
        <form class="form" @submit.prevent="submit" @reset.prevent="reset">
          <h2>Period</h2>
          <div class="form__description">
            Set the time in minutes for each period.
          </div>
          <div
            v-for="(time, period) in settingsTimeByPeriodInMinute"
            :key="period"
            class="form__group">
            <label class="form__label" :for="period">{{ period }}</label>
            <input
              class="form__input form__input_text"
              type="number"
              min="1"
              :value="time"
              :id="period"
              :name="period"
              @input="updateTimeByPeriodInMinute">
          </div>

          <h2>Auto Start</h2>
          <div class="form__description">
            Automatically start the timer for the next period.
          </div>
          <div class="form__group">
            <label class="form__label" for="settingsAutoStartEnabled">Enabled</label>
            <input
              class="form__input"
              type="checkbox"
              :checked="settingsAutoStartEnabled"
              id="settingsAutoStartEnabled"
              @input="updateAutoStartEnabled">
          </div>

          <h2>Sound notification</h2>
          <div class="form__description">
            Play sound notification when period is completed.
          </div>
          <div class="form__group">
            <label class="form__label" for="settingsSoundNotificationEnabled">Enabled</label>
            <input
              class="form__input"
              type="checkbox"
              :checked="settingsSoundNotificationEnabled"
              id="settingsSoundNotificationEnabled"
              @input="updateSoundNotificationEnabled">
          </div>

          <template v-if="notificationSupported()">
            <h2>Browser notification</h2>
            <template v-if="notificationsGranted">
              Browser notifications enabled.
            </template>
            <template v-else>
              <div class="form__description">
                Receive notification when period is completed through your browser.
              </div>
              <div class="form__group">
                <a href="#" @click.prevent="notificationAsk">Request permission</a>
              </div>
            </template>
          </template>

          <h2>Reset settings</h2>
          <div class="form__description">
            Reset settings with default values.
          </div>
          <div class="form__group">
            <a href="#" @click.prevent="reset">Reset settings</a>
          </div>
        </form>
      </div>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import notifications from '@/utils/notifications.js'
import { mapGetters, mapMutations } from 'vuex'
import AppFooter from '@/components/AppFooter.vue'

export default {
  name: 'settings',
  components: {
    AppFooter
  },
  data () {
    return {
      notificationsGranted: notifications.isGranted()
    }
  },
  computed: {
    ...mapGetters([
      'settingsTimeByPeriodInMinute',
      'settingsAutoStartEnabled',
      'settingsSoundNotificationEnabled'
    ])
  },
  methods: {
    ...mapMutations([
      'settingsSetTimeByPeriodInMinute',
      'settingsSetAutoStartEnabled',
      'settingsSetSoundNotificationEnabled',
      'settingsSave',
      'settingsReset'
    ]),
    updateTimeByPeriodInMinute (event) {
      const { name, value } = event.target
      this.settingsSetTimeByPeriodInMinute({ name, value: parseInt(value) })
    },
    updateAutoStartEnabled (event) {
      const { checked } = event.target
      this.settingsSetAutoStartEnabled({ value: checked })
    },
    updateSoundNotificationEnabled (event) {
      const { checked } = event.target
      this.settingsSetSoundNotificationEnabled({ value: checked })
    },
    reset () {
      this.settingsReset()
    },
    notificationSupported () {
      return notifications.isSupported()
    },
    notificationAsk () {
      return notifications.askPermission()
        .then((granted) => {
          this.notificationsGranted = granted
          if (granted) {
            notifications.send('Pomodoro Like Timer', {
              body: 'Browser notification enabled!'
            })
          }
        })
    }
  },
  mounted () {
    notifications.initialize()
      .then((granted) => {
        this.notificationsGranted = granted
      })
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
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__controls {
    margin: 1rem 0;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  &__label {
    font-size: 18px;
    font-weight: 600;
  }

  &__input {
    &_text {
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
  }

  &__description {
    margin: 0.5rem 0;
  }
}
</style>
