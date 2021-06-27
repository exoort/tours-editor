<template>
  <v-select
    v-bind="$attrs"
    v-on="$listeners"
    outlined
    dense
  />
</template>

<script>
export default {
  name: 'BaseDropdown',
  inheritAttrs: false
}
</script>

<style scoped>

</style>
