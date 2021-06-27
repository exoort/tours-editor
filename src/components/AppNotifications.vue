<template>
  <div>
    <v-snackbar
      v-for="(notification, index) in showingNotifications"
      :key="`app-notification-${index}`"
      v-model="notification.show"
      :color="notification.color"
      :style="`bottom: ${bottom(index)}px`"
      :timeout="notification.timeout"
    >
      {{ notification.text }}

      <template #action="{ attrs }">
        <v-btn
          v-bind="attrs"
          text
          @click="notification.show = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
  </div>

</template>

<script>
import { SERVICE_TOKENS } from '@/services'

export default {
  name: 'AppNotifications',
  inject: [SERVICE_TOKENS.APP_NOTIFICATIONS],
  data () {
    return {
      notifications: [],
      cleaner: null
    }
  },
  computed: {
    showingNotifications () {
      return this.notifications.filter(notification => notification.show)
    }
  },
  mounted () {
    this[SERVICE_TOKENS.APP_NOTIFICATIONS].subscribeOnAppNotification((notification) => {
      const newNotification = this.createNotification(notification)
      this.notifications.push(newNotification)
    })
    this.startCleaner()
  },

  beforeDestroy () {
    this[SERVICE_TOKENS.APP_NOTIFICATIONS].unsubscribeOnAppNotification()
    if (this.cleaner) {
      clearInterval(this.cleaner)
    }
  },

  methods: {
    startCleaner () {
      this.cleaner = setInterval(() => {
        this.notifications = this.notifications.filter(
          notification => notification.show
        )
      }, 10000)
    },
    bottom (num) {
      return num * 60 + 8
    },
    createNotification (notification) {
      notification.show = true
      notification.id = new Date().getTime()
      return notification
    }
  }
}
</script>

<style scoped>

</style>
