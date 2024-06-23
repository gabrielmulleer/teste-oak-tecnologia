import { z } from 'zod'

export const registerProductSchema = z.object({
  id: z.number().optional(), // Adicionado id como opcional
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  available: z.boolean().default(false),
  createdAt: z.string().optional(), // Adicionado createdAt como opcional
})
