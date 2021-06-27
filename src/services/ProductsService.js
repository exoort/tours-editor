export class ProductsService {
  async getProducts () {
    const response = await fetch('https://raw.githubusercontent.com/makedonmax/test_data/master/data.txt')
    return await response.json()
  }
}
