import { SET_PRODUCTS } from './mutation-types'
import { ProductsService } from '@/services/ProductsService'

export async function getProducts ({ commit }) {
  const products = await new ProductsService().getProducts()
  commit(SET_PRODUCTS, products)
}
