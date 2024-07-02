'use client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { registerProductSchema } from '@/app/(main)/schema'
import { createProduct } from '@/app/(main)/actions'
import { Open_Sans as OpenSans } from 'next/font/google'
import { Textarea } from '@/components/ui/textarea'
const openSans = OpenSans({ subsets: ['latin'], variable: '--font-sans' })

export function ProductDialog() {
  const ref = useRef<HTMLDivElement>(null)
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
      form.reset()
      router.refresh()
      ref.current?.click()
    },
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Cadastrar Produto</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar produto</DialogTitle>
          <DialogDescription className={openSans.className}>
            Insira as informações do novo produto. Clique em adicionar ao
            finalizar.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Nome</FormLabel>
                    <FormControl>
                      <Input
                        className={`col-span-3 ${openSans.className}`}
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
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Descrição</FormLabel>
                    <FormControl>
                      <Textarea
                        className={`col-span-3 ${openSans.className}`}
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
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Preço</FormLabel>
                    <FormControl>
                      <Input
                        className={`col-span-3 ${openSans.className}`}
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
                  <FormItem className="grid grid-cols-4 items-center gap-4 ">
                    <FormLabel className="text-right">
                      Disponível para venda
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-auto">
              <Button disabled={form.formState.isLoading} type="submit">
                {form.formState.isSubmitting
                  ? 'Adicionando...'
                  : 'Adicionar produto'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
