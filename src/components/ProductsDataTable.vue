<template>
  <v-data-table
    v-bind="$attrs"
    :items="items"
    :headers="headers"
  >
    <template #item.vendorName="{ item }">
      {{ item.vendor.name }}
    </template>
    <template #item.allowRecharge="{ item }">
      <v-icon v-if="item.allowRecharge" color="green">mdi-check</v-icon>
      <v-icon v-else color="red">mdi-close</v-icon>
    </template>
    <template #item.customerType="{ item }">
      <v-chip small>{{ item.customerType }}</v-chip>
    </template>
    <template #item.type="{ item }">
      <v-chip small>{{ item.type }}</v-chip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'ProductsDataTable',
  inheritAttrs: false,
  props: {
    items: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  computed: {
    headers () {
      return [
        { text: 'Id', value: 'id' },
        { text: 'SKU', value: 'sku' },
        { text: 'Name', value: 'name' },
        { text: 'Type', value: 'type' },
        { text: 'Customer type', value: 'customerType' },
        { text: 'Valid value', value: 'validValue' },
        { text: 'Price', value: 'price' },
        { text: 'Allow recharge', value: 'allowRecharge' },
        { text: 'Recharge price', value: 'rechargePrice' },
        { text: 'Vendor name', value: 'vendorName' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
