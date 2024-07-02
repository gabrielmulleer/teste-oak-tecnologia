'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { registerProductSchema } from '../(main)/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { Switch } from '@/components/ui/switch'
import { createProduct } from '../(main)/actions'
import { Open_Sans as OpenSans } from 'next/font/google'
const openSans = OpenSans({ subsets: ['latin'], variable: '--font-sans' })

export default function RegistrationForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof registerProductSchema>>({
    resolver: zodResolver(registerProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      available: false,
    },
  })
  const onSubmit = form.handleSubmit(
    async (data: z.infer<typeof registerProductSchema>) => {
      await createProduct(data)
      router.refresh()
      form.reset()
    },
  )
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="w-[40rem] space-y-8 mx-auto">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Cadastrar Produto</CardTitle>
            <CardDescription className={openSans.className}>
              Insira as informações do novo produto. Clique em adicionar ao
              finalizar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      className={openSans.className}
                      placeholder="Escreva o nome do produto"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      className={openSans.className}
                      placeholder="Escreva a descrição do produto"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      className={openSans.className}
                      type="number"
                      placeholder="Escreva o preço do produto"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-6">
                  <FormLabel>Disponível para venda</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <SheetFooter className="mt-6">
              <Button disabled={form.formState.isLoading} type="submit">
                {form.formState.isSubmitting
                  ? 'Adicionando...'
                  : 'Adicionar produto'}
              </Button>
            </SheetFooter>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
