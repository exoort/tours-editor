<template>
  <v-card flat>
    <v-card-title>
      Products list
      <v-spacer />
      <create-product-dialog>
        <template #activator="{on, attrs}">
          <v-btn
            v-on="on"
            v-bind="attrs"
            color="primary"
          >
            Create a Product
          </v-btn>
        </template>
      </create-product-dialog>

    </v-card-title>
    <v-card-text>
      <v-sheet max-width="500">
        <search-input
          :value="search"
          @searchUpdate="onSearchUpdate"
          placeholder="Search by name or sku"
          outlined
          dense
          prepend-icon="mdi-magnify"
          clearable
        />
      </v-sheet>

      <products-data-table
        :items="filteredProducts"
        :loading="loading"
      />
    </v-card-text>

  </v-card>
</template>

<script>
import ProductsDataTable from '@/components/ProductsDataTable'
import { mapActions } from 'vuex'
import CreateProductDialog from '@/components/CreateProductDialog'
import SearchInput from '@/components/SearchInput'

export default {
  name: 'Products',
  components: { SearchInput, CreateProductDialog, ProductsDataTable },
  data () {
    return {
      loading: false,
      search: ''
    }
  },
  computed: {
    products () {
      return this.$store.state.products.products
    },
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
    ...mapActions({
      getProducts: 'products/getProducts'
    }),
    onSearchUpdate (value) {
      this.search = value
    }
  },
  async created () {
    try {
      this.loading = true
      await this.getProducts()
      this.loading = false
    } catch (e) {
      this.loading = false
    }
  }

}
</script>

<style scoped>

</style>
