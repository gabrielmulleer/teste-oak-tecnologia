'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { registerProductSchema } from '../(main)/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/components/ui/use-toast'
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
import { createProduct, getProducts } from '../(main)/actions'

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
      console.log(registerProductSchema.parse(data))
      await createProduct(data)
      router.refresh()

      toast({
        title: 'Success',
        description: 'Your profile has been updated successfully',
      })
    },
  )
  const getList = async () => {
    console.log(await getProducts())
  }
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8 w-1/2 ">
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Produto</CardTitle>
            <CardDescription>Descrição header (?)</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Escreva seu nome" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardContent>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Escreva a descrição do produto"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardContent>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Escreva o preço do produto"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
          <CardContent>
            <FormField
              control={form.control}
              name="available"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
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
          </CardContent>
        </Card>
        <SheetFooter className="mt-auto">
          <Button disabled={form.formState.isLoading} type="submit">
            {form.formState.isSubmitting ? 'Salvando...' : 'Salvar produto'}
          </Button>
          <Button type="button" onClick={getList}>
            Obter produtos
          </Button>
        </SheetFooter>
      </form>
    </Form>
  )
}
