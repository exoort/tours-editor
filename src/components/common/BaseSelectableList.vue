<template>
  <v-list
    v-bind="$attrs"
    v-on="$listeners"
    dense
    style="max-height: 300px"
    class="overflow-y-auto"
  >
    <v-list-item-group
      v-if="items.length"
      :value="selectedKeys"
      @change="onSelectChange"
      multiple
      color="primary"
    >
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :value="item.id"
      >
        <slot
          v-bind="item"
          name="listItem"
        />
      </v-list-item>
    </v-list-item-group>
    <v-list-item v-else>
      No data
    </v-list-item>
  </v-list>
</template>

<script>

export default {
  name: 'BaseSelectableList',
  inheritAttrs: false,
  props: {
    items: {
      required: true,
      type: Array,
      default: () => []
    },
    selectedKeys: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  methods: {
    onSelectChange (keys) {
      this.$emit('selected', keys)
    }
  }
}
</script>

<style scoped>

</style>
