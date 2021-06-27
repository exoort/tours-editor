import { ADD_PRODUCT, REMOVE_PRODUCT, SET_PRODUCTS } from './mutation-types'

export default {

  [SET_PRODUCTS] (state, products) {
    state.products = products
  },

  [ADD_PRODUCT] (state, product) {
    state.products.unshift(product)
  },

  [REMOVE_PRODUCT] (state, productId) {
    const newProducts = state.products.filter((product) => product.id === productId)
    this[SET_PRODUCTS](newProducts)
  }
}
