import { $eventBus } from '@/utils/eventBus'

const event = 'show::notification'

export class AppNotificationsService {
  showAppNotification (data) {
    $eventBus.$emit(event, data)
  }

  subscribeOnAppNotification (callback) {
    $eventBus.$on(event, callback)
  }

  unsubscribeOnAppNotification (callback) {
    $eventBus.$off(event, callback)
  }
}
