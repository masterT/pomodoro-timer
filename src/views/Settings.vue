<template>
  <div class="settings">
    <div class="settings__content">
      <h1>Settings</h1>
      <template v-if="settingsHasFetchStatus('idle', 'fetching')">
        Loading...
      </template>
      <template v-if="settingsHasFetchStatus('failed')">
        An error occured while retrieving your settings.
      </template>
      <template v-if="settingsHasFetchStatus('succeeded') && settings">
        <div>
          <form class="form" @submit.prevent="submit" @reset.prevent="reset">
            <h2>Period</h2>
            <div class="form__description">
              Set the time in minutes for each period.
            </div>
            <div
              v-for="(name) in periodNames"
              :key="name"
              class="form__group">
              <label class="form__label" :for="name">{{ name }}</label>
              <input
                class="form__input form__input_text"
                type="number"
                min="1"
                v-model.number="settings[name]"
                :id="name"
                :name="name">
            </div>

            <h2>Auto Start</h2>
            <div class="form__description">
              Automatically start the timer for the next period.
            </div>
            <div class="form__group">
              <label class="form__label" for="autoStartEnabled">Enabled</label>
              <input
                class="form__input"
                type="checkbox"
                id="autoStartEnabled"
                v-model="settings.autoStartEnabled">
            </div>

            <h2>Sound notification</h2>
            <div class="form__description">
              Play sound notification when period is completed.
            </div>
            <div class="form__group">
              <label class="form__label" for="soundNotificationEnabled">Enabled</label>
              <input
                class="form__input"
                type="checkbox"
                id="soundNotificationEnabled"
                v-model="settings.soundNotificationEnabled">
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

            <h2>Reset to default settings</h2>
            <div class="form__description">
              Reset settings with default values.
            </div>
            <div class="form__group">
              <a href="#" @click.prevent="useDefaultSettings">Use default settings</a>
            </div>

            <div class="form__actions">
              <TimerButton @click="submit">
                Save
              </TimerButton>
              <TimerButton @click="reset">
                Reset
              </TimerButton>
            </div>
          </form>
        </div>
      </template>
    </div>
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import notifications from '@/utils/notifications.js'
import { mapGetters, mapActions } from 'vuex'
import AppFooter from '@/components/AppFooter.vue'
import TimerButton from '@/components/TimerButton.vue'

export default {
  name: 'settings',
  components: {
    AppFooter,
    TimerButton
  },
  data () {
    return {
      settings: null,
      notificationsGranted: notifications.isGranted(),
      periodNames: ['work', 'short', 'long']
    }
  },
  computed: {
    ...mapGetters([
      'settingsCurrent',
      'settingsHasFetchStatus'
    ])
  },
  methods: {
    ...mapActions([
      'settingsSave',
      'settingsSaveDefaultSettings'
    ]),
    submit () {
      this.settingsSave(this.settings)
        .then((settings) => {
          // TODO: Notify user.
          this.settings = settings
        })
    },
    reset () {
      this.settings = { ...this.settingsCurrent }
    },
    useDefaultSettings () {
      this.settingsSaveDefaultSettings()
        .then((settings) => {
          // TODO: Notify user.
          this.settings = settings
        })
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
    this.settings = { ...this.settingsCurrent }
    notifications.initialize()
      .then((granted) => {
        this.notificationsGranted = granted
      })
  },
  watch: {
    settingsCurrent (settings) {
      this.settings = { ...settings }
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
    margin: 0.5rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__actions {
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
