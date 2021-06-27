<template>
  <v-app>
    <v-main>
      <products/>
      <app-notifications />
    </v-main>
  </v-app>
</template>

<script>
import Products from '@/components/Products'
import services from '@/services'
import AppNotifications from '@/components/AppNotifications'

export default {
  name: 'App',
  components: { AppNotifications, Products },
  provide: services
}
</script>
