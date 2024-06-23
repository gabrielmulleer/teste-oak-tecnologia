'use server'
import { z } from 'zod'
import { registerProductSchema } from './schema'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

// Função para criar um produto
export async function createProduct(
  input: z.infer<typeof registerProductSchema>,
) {
  const response = await fetch(`${baseUrl}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })

  const data = await response.json()
  if (response.ok) {
    console.log('Product saved successfully')
  } else {
    console.error('Error saving product: ' + data.error)
  }
}

export async function getProducts() {
  const response = await fetch(`${baseUrl}/api/products`, {
    method: 'GET',
  })
  const data = await response.json()
  return data
}
