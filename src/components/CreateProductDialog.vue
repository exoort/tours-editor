<template>
  <v-dialog
    v-model="showed"
    max-width="800"
    scrollable
  >
    <template #activator="activator">
      <slot
        v-bind="activator"
        name="activator"
      />
    </template>
    <v-card>
      <v-card-title class="mb-5">
        Create new product
        <v-spacer/>
        <v-btn icon @click="showed = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <create-product-form
          :products="products"
          @success="onSuccess"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import CreateProductForm from '@/components/CreateProductForm'
import { SERVICE_TOKENS } from '@/services'

export default {
  name: 'CreateProductDialog',
  components: { CreateProductForm },
  inject: [SERVICE_TOKENS.APP_NOTIFICATIONS, SERVICE_TOKENS.FILE_MANAGER],
  data () {
    return {
      showed: false
    }
  },
  computed: {
    products () {
      return this.$store.state.products.products
    }
  },
  methods: {
    onSuccess (product) {
      this.createJsonFile(product)
      this[SERVICE_TOKENS.APP_NOTIFICATIONS].showAppNotification({
        text: 'Successfully created',
        color: 'success'
      })
      console.log('here')
      this.$nextTick(() => {
        this.showed = false
      })
    },
    createJsonFile (product) {
      const json = JSON.stringify(product)
      this[SERVICE_TOKENS.FILE_MANAGER].createJsonFile(product.name, json)
    }
  }
}
</script>

<style scoped>

</style>
