import { z } from 'zod'

export const registerProductSchema = z.object({
  id: z.number().optional(), // Adicionado id como opcional
  name: z.string().min(2, {
    message: 'O nome deve ter pelo menos 2 caracteres.',
  }),
  description: z.string().min(2, {
    message: 'A descrição deve ter pelo menos 2 caracteres.',
  }),
  price: z.coerce.number().min(1, {
    message: 'O preço deve ser maior que zero.',
  }),
  available: z.boolean().default(false),
  createdAt: z.string().optional(),
})
