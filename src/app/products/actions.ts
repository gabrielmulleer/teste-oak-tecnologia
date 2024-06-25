'use server'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export async function getProducts() {
  try {
    const response = await fetch(`${baseUrl}/api/products`)
    if (!response.ok) {
      throw new Error(`Failed to fetch products, status: ${response.status}`)
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}
