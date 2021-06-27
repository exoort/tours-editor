<template>
  <v-text-field
    v-bind="$attrs"
    v-on="$listeners"
    dense
    outlined
  />
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false
}
</script>

<style scoped>

</style>
