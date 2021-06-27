<template>
  <v-text-field
    :value="value"
    v-bind="$attrs"
    v-on="$listeners"
    @input="onSearchInput"
  />
</template>

<script>
export default {
  name: 'SearchInput',
  inheritAttrs: false,
  props: {
    value: {
      required: true,
      type: String,
      default: ''
    }
  },
  data () {
    return {
      searchDebounce: null
    }
  },
  methods: {
    onSearchInput (value) {
      if (this.searchDebounce) {
        clearTimeout(this.searchDebounce)
      }
      this.searchDebounce = setTimeout(() => {
        this.$emit('searchUpdate', value)
      }, 250)
    }
  }
}
</script>

<style scoped>

</style>
