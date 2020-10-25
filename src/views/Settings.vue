<template>
  <div class="settings">
    <h1>Settings</h1>
    <form class="form" @submit.prevent="submit">
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

      <h2>Browser notification</h2>
      <div class="form__description">
        Receive notification when period is completed through your browser.
      </div>

      <template v-if="notificationSupported">
        <template v-if="isNotificationPermissionGranted">
          <div class="form__description form__status-container">
            <strong>Status</strong><Status class="form__status" type="success" />
          </div>
          <div class="form__description">
            Notifications are enabled.
          </div>
        </template>
        <template v-if="isNotificationPermissionDenied">
          <div class="form__description form__status-container">
            <strong>Status</strong><Status class="form__status" type="danger" />
          </div>
          <div class="form__description">
            Notification permission is denied. You need to enable the notification in your browser's settings.
          </div>
        </template>
        <template v-if="isNotificationPermissionDefault">
          <div class="form__description form__status-container">
            <strong>Status</strong><Status class="form__status" type="warning" />
          </div>
          <div class="form__description">
            This application needs your permission to enable desktop notifications.
          </div>
          <div class="form__group">
            <a href="#" @click.prevent="requestNotificationPermission">Request permission</a>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="form__description form__status-container">
          <strong>Status</strong><Status class="form__status" type="danger" />
        </div>
        <div class="form__description">
          Your browser does not support notification.
        </div>
      </template>

      <div class="form__actions">
        <Button @click="submit">
          Save
        </Button>
      </div>
    </form>
  </div>
</template>

<script>
import notifications from '@/utils/notifications.js'
import { mapState, mapGetters, mapActions } from 'vuex'
import Button from '@/components/Button.vue'
import Status from '@/components/Status.vue'
import { SESSIONS } from '@/constants'

export default {
  name: 'settings',
  components: {
    Button,
    Status
  },
  data () {
    return {
      settings: null,
      notificationsGranted: notifications.isGranted(),
      periodNames: Object.values(SESSIONS)
    }
  },
  computed: {
    ...mapState([
      'notificationSupported'
    ]),
    ...mapGetters([
      'settingsCurrent',
      'settingsHasFetchStatus',
      'isNotificationPermissionGranted',
      'isNotificationPermissionDenied',
      'isNotificationPermissionDefault'
    ])
  },
  methods: {
    ...mapActions([
      'settingsSave',
      'settingsSaveDefaultSettings',
      'requestNotificationPermission'
    ]),
    submit () {
      this.settingsSave(this.settings)
        .then((settings) => {
          this.settings = settings
          this.$notify({
            title: 'Settings succesfully updated!',
            type: 'success'
          })
        })
    }
  },
  created () {
    this.settings = { ...this.settingsCurrent }
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
    margin: 2rem 0;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
  }

  &__label {
    font-size: 18px;
    font-weight: 600;
  }

  &__description {
    margin: 0.5rem 0;
  }

  &__status-container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  &__status {
    margin-left: 0.5rem;
  }
}
</style>
