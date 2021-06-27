<template>
  <div>
    <search-input
      :value="search"
      dense
      outlined
      placeholder="Search by name or sku"
      @searchUpdate="onSearchUpdate"
      clearable
    />
    <v-row>
      <v-col>
        <template v-if="toRight">
          <v-btn
            block
            color="primary"
            small
            @click="transferAll"
          >
            <v-icon>
              mdi-chevron-right
            </v-icon>
            <v-icon>
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn
            block
            color="primary"
            outlined
            small
            @click="transferSelected"
          >
            <v-icon>
              mdi-chevron-left
            </v-icon>
          </v-btn>
        </template>
      </v-col>
      <v-col>
        <template v-if="toRight">
          <v-btn
            block
            color="primary"
            outlined
            small
            @click="transferSelected"
          >
            <v-icon>
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn
            block
            color="primary"
            small
            @click="transferAll"
          >
            <v-icon>
              mdi-chevron-left
            </v-icon>
            <v-icon>
              mdi-chevron-left
            </v-icon>
          </v-btn>
        </template>
      </v-col>
    </v-row>
    <base-selectable-list
      :items="filteredProducts"
      :selected-keys="selectedProducts"
      @selected="onSelectedChange"
    >
      <template #listItem="product">
        {{ product.name }} ({{ product.sku }})
      </template>
    </base-selectable-list>
  </div>
</template>

<script>
import BaseSelectableList from '@/components/common/BaseSelectableList'
import SearchInput from '@/components/SearchInput'

export default {
  name: 'TransferProducts',
  components: {
    SearchInput,
    BaseSelectableList
  },
  props: {
    toRight: {
      required: false,
      type: Boolean,
      default: true
    },
    products: {
      required: true,
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      selectedProducts: [],
      search: ''
    }
  },
  computed: {
    filteredProducts () {
      if (!this.search) {
        return this.products
      }
      const value = this.search.toLowerCase()
      return this.products.filter((product) => {
        return product.name.toLowerCase().includes(value) || product.sku.toLowerCase().includes(value)
      })
    }
  },
  methods: {
    onSearchUpdate (value) {
      this.search = value
    },
    onSelectedChange (keys) {
      if (!keys || !keys.length) {
        this.selectedProducts = []
      }
      this.selectedProducts = keys
    },
    createTransfer (products) {
      this.$emit('transferCreated', products)
      this.selectedProducts = []
    },
    transferAll () {
      this.createTransfer(this.products.map((product) => product.id))
    },
    transferSelected () {
      this.createTransfer(this.selectedProducts)
    }
  }
}
</script>

<style scoped>

</style>
