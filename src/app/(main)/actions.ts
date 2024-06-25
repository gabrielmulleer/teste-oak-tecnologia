'use server'
import { z } from 'zod'
import { registerProductSchema } from './schema'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

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
    revalidatePath('/products')
    redirect('/products')
  } else {
    console.error('Error saving product: ' + data.error)
  }
}
