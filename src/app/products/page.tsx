import { ProductsDataTable } from './_components/product-data-table'
import { getProducts } from './actions'

export default async function Page() {
  const products = await getProducts()

  return <ProductsDataTable data={products} />
}
